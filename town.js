const express=require('express'),//the HTTP server
    app=express(),
    apiexpress=express(),
    wss=require('express-ws')(app),// the ws server
    uuid = require('node-uuid'),
    session = require('express-session'),
    path = require('path');

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home'),
    PonyTownApp = require('./controllers/PonyTownApp.js');
//setting variables
//server "factory"
//Question should different servers be hosted on different pages, if so how that should be even handled?
//How to 'communicate from other servers?' should each server be a different node process?
var games=[{id:"main",name:"best server",desc:"The one and only server"}].map(function(server){return new PonyTownApp(server.id,server.name,server.desc)})
var utils=PonyTownApp.prototype.utils,getRandomInt=utils.getRandomInt,version=PonyTownApp.prototype.version;
//Express bullshit.
app.set('port', process.env.PORT || 3000);
app.use(session({secret:' ', cookie:{maxAge:30*60*1000, httpOnly:false}}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use("/api",apiexpress);
//directories and routes
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.get('/', homeController.index);
app.get('/character', homeController.index);
app.get('/about', homeController.index);


app.ws("/ws",function(ws,req){
   webSocketConnect(ws,req);
});
app.get("/ws",function(req,res){
    res.send("Does this even work.")
});

var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
//miscelaneous variables
var mapGenerators = [function() {
    return 2
}, function(x) {
    return (x % 2) + 1
}, function(x, y) {
    return (y % 2) + 1
}, function(x, y) {
    return ((x % 2) ^ (y % 2)) + 1
}, utils.imageToFill(utils.mapValuesWithInstructions(
    [0,1,0,0,0,1,0,0
        ,1,1,1,0,1,1,1,0
        ,1,1,1,1,1,1,1,0
        ,1,1,1,1,1,1,1,0
        ,0,1,1,1,1,1,0,0
        ,0,0,1,1,1,0,0,0
        ,0,0,0,1,0,0,0,0],[0,1],[1,2])
    ,8,7),utils.imageToFill(utils.mapValuesWithInstructions(
    [1,0,1,1,1,0,
        1,0,1,0,0,0,
        1,1,1,1,1,0,
        0,0,1,0,1,0,
        1,1,1,0,1,0,
        0,0,0,0,0,0],[0,1],[1,2])
    ,7,7)];

var mapGenerator = (function(flip) {
    var s = utils.stretchTileFunction(mapGenerators[getRandomInt(0, mapGenerators.length - 1)], getRandomInt(1, 4), getRandomInt(1, 4));
    return function(x, y) {
        return utils.mapValueWithInstructions(s(x, y), [1, 2], flip);
    }
})([
    [1, 2],
    [2, 1]
][getRandomInt(0, 1)]);
//Connection Logic
//How to get session data?
function webSocketConnect(ws,req){
    var websocketContext={query:req.query,sessionID:req.sessionID,session:req.session};
    console.log("this is run")
    ws.on("message",function(message){
        webSocketMessage(ws,message,websocketContext);
    });
    ws.on("error",function(error){
        console.log("ERROR!")
        webSocketError(ws,error,websocketContext);
    });
    ws.on("close",function(){
        console.log("CLOSED!")
        webSocketClose(ws,websocketContext);
    });

}
//now we can focus on these two functions
function webSocketMessage(ws,message,context){
//sendWS(ws,"Your id is:"+context.sessionID+", and query is "+JSON.stringify(context.query))
}

function webSocketError(ws,error,context){

}
function webSocketClose(ws,context){

}
function sendWS(ws,message){
    try{
        ws.send(message);
    }catch(x){
        //console.log("seems ws closed connection!")
        ws.close();
    }
}



//Api logic

/**
 * Api functions should be here
 * @type {{game-status, pony-save: api.'pony-save', pony: api.'pony', game-join: api.'game-join'}}
 */
var api = {
    'game/status': stringifyFunction(gameStatus),
   'pony/save': stringifyFunction(ponySave),
   'pony': stringifyFunction(getPony),
   'game-join':stringifyFunction(joinGame)
};
/**
 * Implementing the api.
 * This doesn't look like true separation of the network, we'll see that later, or not.
 */

apiexpress.all("/:api",function (request, response, next) {
    var queryData;
    if (request.method == "POST") {
        request.on('data', function (data) {
            queryData += data;
            //maximum upload data of 2GB.
            if (queryData.length > 2e9) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });
    }


    console.log("anyone here",request.method,request.params.api);
    request.on('end', function () {
        console.log("this was exectued")
            var apifunction = api[request.params.api];
            if (typeof apifunction == "function") {
                response.send(apifunction(request, response, queryData));
            } else {
                response.send("Not implemented.",404)


            }
        });
    request.resume();
});


//Gamy Logic
games.forEach(function(game){
var map=game.createMap(5,5,"main map");
map.fill(mapGenerator([
    [1, 2],
    [2, 1]
][getRandomInt(0, 1)]));
game.addMap(map);
game.defaultMap="main map";

});
//Bind logic everything here should be about the game, players and everything game related, the rest is network related.
/**
 * Gets the status of the game
 */
 function gameStatus() {
     return Object.assign({version:version,servers:games.map(function(game){
         return Object.assign(makeObject(["id","name","desc","offline"], game),{"online":game.players.length});
     })});
 }
/**
 * Saves a pony
 */
function ponySave(req,req,data) {
    var player=getPlayer(cookies.play),character=JSON.parse(data);
    if(player.characters&&character){
        player.characters.push(character);
        return
    }else{
        return "fail!";
    }
}

/**
 * Aggie identifies a player by cookie, so either we have to implement a cookie or identify a player by something else.
 */
function getPony(req) {
    var player=getPlayer(cookies.player);
    if(player.characters){
        return player.characters;
    }else{
        return "fail!";
    }
}
/**
 * attempts to identify a player by a cookie.
 * @param {string} cookie
 */
//who knows what to put here depending if we use sessions or cookies/player, bind each session to a player?
//we might not even need to use this function maybe!
function getPlayer(cookie){

}
/**
 * doesnt actually join game but provides data to client for it to join
 * @param cookies
 * @param data
 */
function joinGame(req,res) {
    var player=getPlayer(req.cookies.player);

}




//Miscelaneous functions and Objects.
function readMemberExpression(p, value) {
    var pParts = p.split('.');
    while (pParts.length)
        value = value[pParts.shift()];
    return value;
}

function makeObject(arr, p) {
    var t = {};
    arr.forEach(function(val) {
        t[val] = readMemberExpression(val,p);
    });
    return t;
}

function stringifyFunction(func) {
    return function () {
        var ret = func.apply(this, arguments);
        return typeof ret == "string" ? ret : JSON.stringify(ret);
    }
}
