Implementation specifics
====================
So, we've finally managed to get to the good stuff, the specifics, how everything works on the network.

So we have something like.

    var express=require('express'),//the HTTP server
        app=express(),
        apiexpress=express(),
        wss=require('ws').server,// the ws server
        uuid = require('node-uuid'),
        game=new PonyTownApp(),//ponytown game.
        getRandomInt=game.utils.getRandomInt;
    
    //Connection Logic
    //How to get session data?
    function webSocketConnect(ws){
        var websocketContext={};
        ws.on("message",function(message){
            webSocketMessage(ws,message,websocketContext);
        });
        ws.on("error",function(error){
            webSocketError(ws,error,websocketContext);
        });
        ws.on("close",function(){
            webSocketClose(ws,websocketContext);
        });
    
    }
    //now we can focus on these two functions
    function webSocketMessage(ws,message,context){
    
    }
    
    function webSocketError(ws,error,context){
    
    }
    function webSocketClose(ws,context){
    
    }
    
    wss.on("connection",webSokcetConnect);
    
    
    //Api logic
    
    /**
     * Api functions should be here
     * @type {{game-status, pony-save: api.'pony-save', pony: api.'pony', game-join: api.'game-join'}}
     */
    var api = {
        'game-status': stringifyFunction(gameStatus),
        'pony-save': stringifyFunction(ponySave),
        'pony': stringifyFunction(getPony),
        'game-join':stringifyFunction(joinGame)
    };
    /**
     * Implementing the api.
     * This doesn't look like true separation of the network, we'll see that later, or not.
     */
    app.use("/api",apiexpress);
    //parsing cookies :/
    apiexpress.use(require('cookie-parser'));
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
        request.on('end', function () {
            var apifunction=api[request.params.api];
            if(typeof apifunction=="function") {
                response.send(apifunction(request,response,queryData));
            }else{
                response.writeHead(404);
                response.send("Not implemented.")
            }
        }
    });
    
    //Gamy Logic
    var map=game.createMap(5,5,"main map");
    map.fill(mapGenerator([
        [1, 2],
        [2, 1]
    ][getRandomInt(0, 1)]));
    game.addMap(map);
    game.defaultMap="main map";
    
    //Bind logic everything here should be about the game, players and everything game related, the rest is network related.
    /**
     * Gets the status of the game
     */
    function gameStatus() {
        return Object.assign(makeObject(["version", "offline"], app));
    }
    /**
     * Saves a pony
     */
    function ponySave(req,req,data) {
        var player=getPlayer(cookies.play),character=JSON.parse(data);
        if(player.characters&&character){
            player.characters.push(character)
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
            t[val] = readMemberExpression(p, val);
        });
        return t;
    }
    
    function stringifyFunction(func) {
        return function() {
            var ret = func.apply(this, arguments);
            return typeof ret == "string" ? ret : JSON.stringify(ret);
        }
    }
    var mapGenerators = [function(x, y) {
        return 2
    }, function(x, y) {
        return (x % 2) + 1
    }, function(x, y) {
        return (y % 2) + 1
    }, function(x, y) {
        return ((x % 2) ^ (y % 2)) + 1
    }, map.imageToFill(game.utils.mapValuesWithInstructions(
            [0,1,0,0,0,1,0,0
                ,1,1,1,0,1,1,1,0
                ,1,1,1,1,1,1,1,0
                ,1,1,1,1,1,1,1,0
                ,0,1,1,1,1,1,0,0
                ,0,0,1,1,1,0,0,0
                ,0,0,0,1,0,0,0,0],[0,1],[1,2])
        ,8,7),map.imageToFill(game.utils.mapValuesWithInstructions(
        1,0,1,1,1,0,
        1,0,1,0,0,0,
        1,1,1,1,1,0,
        0,0,1,0,1,0,
        1,1,1,0,1,0,
        0,0,0,0,0,0],[0,1],[1,2])
    ,7,7)];
    
    var mapGenerator = (function(flip) {
        var s = map.stretchFill(mapGenerators[getRandomInt(0, mapGenerators.length - 1)], getRandomInt(1, 4), getRandomInt(1, 4));
        return function(x, y) {
            return game.utils.mapValueWithInstructions(s(x, y), [1, 2], flip);
        }
    });
    