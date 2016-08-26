// on connection to websocket
//WHEN IT FIRST CONNECT TO THE SERVER
//Create funny list of all connections for spying purposes, I mean management
var game={}
game.TOWNMESSAGE="Welcome to FreedomTown!"
var fs = require('fs');
var logStream = fs.createWriteStream('log.txt', {
  'flags': 'a'
});
var uuid = require('node-uuid')
var LoggedInConnections = [],
  wss;

function loggedBroadcast(data, callback) {
  wss.broadcast(data, function(client) {
    return (!callback || callback(client)) && game.currentUsers.find(function(us) {
      return us.ws == client
    })
  })
};
exports.init = function(t) {
  wss = t;
  t.broadcast = function broadcast(data, callbak) {
    t.clients.forEach(function each(client) {
      if (client.readyState == 1 && callbak)
        if (!callbak(client)) {
          return;
        }
      try {
        client.send(data);
      } catch (x) {
        console.log(x, "socket not oppened, IF YOU SEE THIS MESSAGE SOMETHING WENT WRONG")
        logStream.write('Socket not opened, ');
        var u
        if (u = game.currentUsers.find(function(us) {
            return us.ws == client
          })) {
          logStream.write("from " + u.toString())
        } else {
          logStream.write('Socket not found in currentUsers\n')
        }
      }
    });
  };
};
//This is one of the best ideas I've had
//this swaps array values, and you can specify what matches what. and you don't even have to swap them anymore but execute random instructions
//findValues is an array, it is either the element for comparison or a findFunction
//usage:
//mapValueWithInstructions(1,[1,2],[2,1]);-> 2
//mapValueWithInstructions(2,[1,2],[2,1]);-> 1
//mapValueWithInstructions("findThisElement",['in this list','findThisElement'],['and replace it or execute a function ','with the index it found']);
//(doens't) swaps {object:"rock"} with {object:"cloud"}
//it doesn't swap it, but it renames .object for the desired element;
//mapValueWithInstructions({object:"rock"},[function(a){return a.object=="rock"},function(a){return a.object=="cloud"}],[function(a){a.object='cloud';return a},function(a){a.object='rock';return a}])
//as you guessed it it's to flip values, like the map in the function generator
function mapValueWithInstructions(value, findValues, sortOrder) {
  var x = sortOrder[findValues.findIndex(function(arg) {
    return (typeof arg === "function") ? arg(value) : arg === value;
  })];
  if (x) {
    if (typeof x == "function") return x(value);
    return x;
  } else return value;
}

function mapValuesWithInstructions(values, findValues, sortOrder) {
  return values.map(function(value) {
    return mapValueWithInstructions(value, findValues, sortOrder)
  });
}

function coordinatesToIndex(x, y, width) {
  return x + y * width;
}

function indexToCoordinates(index, width) {
  return [index % width, Math.floor(index / width)]
}

function getReversedIndex(i, length, reversed) { //reversed 0 for no reverse and 1 for reverse
  return (i * (-2 * reversed + 1)) + reversed * (length - 1)
}
//Fills shapes with infinite outlines
function surroundMap(map, width) {
  var height = map.length / width
  if ((height) % 1) {
    throw new Error("Invalid map")
  }
  var surroundedMap = map.slice(0),
    value, nextRight, nextDown, edgeRight, nextDownLeft, nextRightUp, edgeDown,
    co, reverse = 2;
  while (reverse--) //while using reversed index, only use them until read/write, do not use them on intermediate operations
    for (var i = 0, l = surroundedMap.length, index; i < l; i++) {
    index = getReversedIndex(i, l, reverse)
    co = indexToCoordinates(i, width)
    edgeRight = (width - 1) == co[0], edgeDown = (height - 1) == co[1];
    value = surroundedMap[index], nextRight = getReversedIndex(coordinatesToIndex(co[0] + 1, co[1], width), l, reverse), nextDown = getReversedIndex(coordinatesToIndex(co[0], 1 + co[1], width), l, reverse), nextDownLeft = getReversedIndex(coordinatesToIndex(co[0] - 1, co[1] + 1, width), l, reverse), nextRightUp = getReversedIndex(coordinatesToIndex(co[0] + 1, co[1], width - 1), l, reverse)
    if (value !== null) {
      if (!edgeRight && (surroundedMap[nextRight] === null || (map[index] && (map[nextRight] == null))) /*&&(co[1]===0||surroundedMap[nextRightUp]==null)*/ ) surroundedMap[nextRight] = value ^ 1;
      if (!edgeDown && surroundedMap[nextDown] === null /*&&(co[0]===0||map[nextDownLeft]==null)*/ ) surroundedMap[nextDown] = value ^ 1; //Hello sleepyhead
    }
  }
  return surroundedMap;
}

function crop(map, width, newWidth, newHeight) {
  var newMap = map.slice(0);
  var height = map.length / width,
    wid;
  if (newHeight) {
    newMap.splice(coordinatesToIndex(0, newHeight, width));
    height = newHeight < height ? newHeight : height;
  }
  if (newWidth && (wid = width - newWidth) > 0) {
    for (var i = height - 1; i >= 0; i--) {
      newMap.splice(coordinatesToIndex(newWidth, i, width), wid)
    }
  }
  return newMap;
}

function putMap(x, y, map1, width1, map2, width2) {
  var newMap = map1.slice(0),
    index, height1 = map1.length / width1,
    height2;
  map2 = crop(map2, width2, width1 - x, height1 - y);
  width2 = (width1 - x) < width2 ? width1 - x : width2;
  height2 = map2.length / width2;
  for (var i = 0; i < height2 && i < (height1 - y); i++) {
    index = coordinatesToIndex(x, y + i, width1);
    Array.prototype.splice.apply(newMap, [index, width2].concat(map2.slice(i * width2, (i + 1) * width2)))
  }
  return newMap
}
//We will have to continuously send the players all the information that is concurrently happening otherwise rape.
//>I seriously hope no one reads my comments, they give cancer.
var extend = require('util')._extend
  //courtesy of StackOverflow and copy-paste programming.
function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function Polygon() {
  this.points = Array.prototype.slice.call(arguments, 0)
}

function Point(x, y) {
  this.x = x
  this.y = y
}
function Segment(P1,P2){
this.points=[P1,P2]
}

//function createRandomLine(){var a=getRandomInt(0,game.map.MapWidth*20),b=getRandomInt(0,game.map.MapHeight*20),c=Math.random()*Math.PI;}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnMovingEntity(name, info) { //returns an Entity, and sets a timeout
  info = info || null;
  var points=[],ranPoints=[],angle;
  //create a random point between the edges of the map
  while(points.length!==2){
  //console.log("infinite loop 6 game.MapWidth:"+game.MapWidth+" game.MapHeight:"+game.MapHeight,points,cp,game.map.boundingBox)
  var cp = new Segment(new Point(Math.random() * game.MapWidth*20, Math.random() * game.MapHeight*20),new Point(Math.random() * game.MapWidth*20, Math.random() * game.MapHeight*20));

  points = findLineAndPolygonIntersection(cp, game.map.boundingBox);
  }
  var length = findLengthOfTwoPoints.apply(this, points);
  //speed will variate
  var speed = Math.random() * 8;
  //if speed=distance/time then time=distance/speed
  var time = length/speed;
  //randomize starting point
  shuffleArray(points);
  //get angle of points
  angle = Math.atan2(points[1].x - points[0].x, points[1].y - points[0].y);
  var speedx = Math.sin(angle) * speed,
    speedy = Math.cos(angle) * speed;
  var entity = new Entity(name, points[0].x, points[0].y, speedx, speedy, info);
  entity.broadcast();
  setTimeout(function(){entity.remove()},time*1e3);
  return entity;
}

function findLineAndPolygonIntersection(segment, polygon) {
  //It should return 2 intersections of mode [Point,Point]
var segmentOf=null,intersection=null,intersections=[];
  for(var i=0;i<polygon.points.length;i++){
segmentOf=new Segment(polygon.points[i],polygon.points[(i+1)%polygon.points.length]);
intersection=findLineAndLineIntersection(segment,segmentOf);
if(isFinite(intersection.x)&&isFinite(intersection.y)&&isNumberbetween(intersection.x,segmentOf.points[0].x,segmentOf.points[1].x)&&isNumberbetween(intersection.y,segmentOf.points[0].y,segmentOf.points[1].y)){
intersections.push(intersection)
}
}
  return intersections;
}
function findLineAndLineIntersection(Segment1,Segment2){
var P1x=Segment1.points[0].x,P1y=Segment1.points[0].y,P2x=Segment1.points[1].x,P2y=Segment1.points[1].y,P3x=Segment2.points[0].x,P3y=Segment2.points[0].y,P4x=Segment2.points[1].x,P4y=Segment2.points[1].y
var t=-(P2y *P3x - P2x *P3y - P2y *P4x + P3y *P4x + P2x *P4y - P3x *P4y)/(
P1y *P3x - P2y *P3x - P1x *P3y + P2x *P3y - P1y *P4x + P2y* P4x + P1x* P4y -
 P2x *P4y)
return new Point((P1x - P2x) *t + P2x, (P1y - P2y) *t + P2y)
}
function isNumberbetween (number,a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return number >= min && number <= max;
};
function findLengthOfTwoPoints(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}
game.map = {}

//code copypasted with love from stackoverflow
function shuffleArray(arr) {
  var i = arr.length,
    j, temp;
  if (i == 0) return arr;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
game.client = {}
game.server = {}
game.server["*version"] = 255; //The version of ponytown? How am I supposed to know? (Now I know)
game.version = 1467495155218; //Version is calculated with a hash, when you edit the client, the hash changes, and you'll have to edit the server version too.
//You don't need to send the version packet in order for it to work, top fucking kek
//But you should send it anyway, because it actually does expect it and stores it in memory until you reply
game.server["*reject:"] = 253; //we reject people who are faggots. Yes that means you.
game.server["*resolve:"] = 254; //resolve/reply to client requets.
game.server.serverNames = ["left", "map", "subscribeRegion", "unsubscribeRegion", "updateTile", "myEntityId", "addEntity", "removeEntity", "updateEntity", "updateEntityExtended", "updateEntityOptions", "says"]
game.client.readNames = ["init", "signUp", "signIn", "signOut", "updateAccount", "requestPasswordReset", "resetPassword", "getCharacters", "saveCharacter", "removeCharacter", "join", "leave", "say", "interact", "update", "changeTile"]
extend(game.server, swap(game.server.serverNames))
extend(game.client, swap(game.client.readNames))
game.players = {} //unfortunately for us, server stores characters, fortunately for us, they are just JavaScript objects
game.currentUsers = []
  //CHARACTERS WILL ONLY LIVE AS LONG AS THE SERVER IS RUNNING, IF SERVER DIES, YOUR CHARACTER DIES FOREVER, FAGGOT.
game.MapWidth = 10; //i mean this'll probably work so sure
game.MapHeight = 10; //be extreme ,lets do it
game.map.boundingBox=new Polygon(new Point(0,0),new Point(game.MapWidth*20,0),new Point(game.MapWidth*20,game.MapHeight*20),new Point(0,game.MapHeight*20));
game.map.entities = []

function ImageToCoordinates(img, width, height) {
  return (function(x, y) {
    return img[coordinatesToIndex(x % width, y % height, width)];
  })
}
var mapGenerators = [function(x, y) {
  return 2
}, function(x, y) {
  return (x % 2) + 1
}, function(x, y) {
  return (y % 2) + 1
}, function(x, y) {
  return ((x % 2) ^ (y % 2)) + 1
},  ImageToCoordinates(mapValuesWithInstructions(
         [0,1,0,0,0,1,0,0
         ,1,1,1,0,1,1,1,0
         ,1,1,1,1,1,1,1,0
         ,1,1,1,1,1,1,1,0
         ,0,1,1,1,1,1,0,0
         ,0,0,1,1,1,0,0,0
         ,0,0,0,1,0,0,0,0],[0,1],[1,2])
         ,8,7),function(x,y){
var til=[1,0,1,1,1,0,
         1,0,1,0,0,0,
         1,1,1,1,1,0,
         0,0,1,0,1,0,
         1,1,1,0,1,0,
         0,0,0,0,0,0];
         return til[coordinatesToIndex(x%6,y%6,6)]+1;
}]

function stretchTileFunction(callback, sx, sy) {
  return function(x, y) {
    return callback(Math.floor(x / sx), Math.floor(y / sy))
  }
}

function tee(x) {
  console.log.apply(console, arguments);
  return x
}
var mapGenerator = (function(flip) {
  var s = stretchTileFunction(mapGenerators[tee(getRandomInt(0, mapGenerators.length - 1), "mapRandomInt")], getRandomInt(1, 4), getRandomInt(1, 4));
  return function(x, y) {
    return mapValueWithInstructions(s(x, y), [1, 2], flip);
  }
})([
  [1, 2],
  [2, 1]
][getRandomInt(0, 1)])
game.map.regions = Array.apply(null, Array(game.MapWidth * game.MapHeight)).map(function(b, e) {
  var coO = indexToCoordinates(e, game.MapWidth),
    bigX = coO[0],
    bigY = coO[1];
  return {
    x: bigX,
    y: bigY,
    tiles: Array.apply(null, Array(20 * 20)).map(function(c, d) {
      var co = indexToCoordinates(d, 20);
      return mapGenerator(co[0] + (bigX * 20), co[1] + (bigY * 20))
    })
  };
}); //MAP IS LITERALLY 1 or 2
//console.log("well, this was executed",game.map.regions)
//Function courtesy of ponytown hacks. Made by me.
game.map.entityObjects = 0

function Entity(type, x, y, vx, vy, character, player) {
  this.id = game.map.entityObjects++;
  this.character = character ? {
    name: character.name,
    info: character
  } : null;
  this.type = type
  this.x = x
  this.y = y;
  this.vx = vx
  this.vy = vy;
  this.player = player;
  game.map.entities.push(this);
}
Entity.prototype.broadcast = function() {
  loggedBroadcast(JSON.stringify([+game.server.addEntity, this.id, this.type,
    this.character, this.x, this.y, this.vx, this.vy, this.walking,
    this.direction
  ]))
  return this;
}
Entity.prototype.send = function(ws) {
  ws.send(JSON.stringify([+game.server.addEntity, this.id, this.type, this.character,
    this.x, this.y, this.vx, this.vy, this.walking, this.direction
  ]));
  return this;
}
Entity.prototype.remove=function(){
game.map.entities.splice(game.map.entities.indexOf(this), 1);
loggedBroadcast(JSON.stringify([+game.server.removeEntity, this.id]));
return this;
}
var entspawnamount = 5 * game.MapHeight * game.MapWidth;
var signNames = ['Horse teeth never stop growing', "Beware of the everfree forest", "Ayy lmao", "Don't eat apples they might be poisoned", "If you press ctrl+w you will unlock secret rooms", "And to say that you thought this was a virus? What were you thinking?", "MISSING MISSY\nNO REWARD", "Random drops are just a technique to get ponies into playing more and more", "If your password is shorter than 8 characters, you literally don't know anything about copsec", "\"I like rocks, I just think they rock.\" -Bootsy", "Have you ever thought about it really hard, and realized that mathematicians are a bit weird?", "Down with nullgrass!", "So I just got banned on RuneScape for botting,\n but I totally wasn't, I swear!", "Why don't you try drawing ponies sometime?\nIt is relaxing", '\u2665', "Oy Vey", "Come inside they gay bathouse", "So, does everyone REALLY want to cum inside Rainbow Dash now?", "   /mlp/\nWe know Drama", "There is no autism like mlp autism", "I've never cringed so hard in my life when you start talking about bronies", ">rape", "Ever notice this is just a collection of tiles and a chat?", "I really don't see that previous generations were that wrong,\nI think peeople tend to exagerate but they're OK", "There's a ripoff of Miner disturbance with ponies on it, isn't that amazing?", "So great and so powerful..", "I dindu muffin", "I never understood the purpose of horse puns on the fandom,\nthey're so popular now that they stopped being puns,\n and now they're the new normal", "I wonder now how hard you can try to turn MLP into an action series", "Math is not about the solutions, but about the problems.", "Are you really reading all of the signs on this game? what kind of freak are you?", 'obligatory xkcd meme', "Wtf I hate ponies now", ">aside from generals", "Sent ;)", ":^)", "Damn, I hate frogposters.", "Ever played the original Cookie clicker", "Bootsy wanted to make a Terminal client to this game, do you think that's possible?", "What do you mean, the jews didn't do it?", "How can this game be real if ponies aren't real?", "What Do You Mean, It's Not For Little Girls?", "Isn't that a little girls show?", "WTF is wrong with the autists calling Faust, mom,\n that's creepy as hell dude.", "I can't watch anime, I don't speak Japanese", "Beware what you say on this game, next time it could be showcased here.", "What would MOOT think about this?", "When you read a meme archive, and you post it and no one understands it.", ">tfw no gf", "Remember kids, /pol/ is satire.", ">mfw I have no face", "I think RD Presents is obsessed with monkeys.", "Into the rainbow factory.", "SGaP is underrated", "No matter how many times you tell people to don't believe in 4chan\nThey believe it", ">using halfchan\nISHIGDDT", "You come from leddit, don't you?", "That's bullshit, but I believe it.", "My Little Pony trascends all limits of space, time, social conventions, prudence and autism", "I bet you still listen to the intro song of MLP", "Ever watched MLP in other languages? Not so bad as you think.", "So, how do you pronounce ayy lmao?", "A beautiful heart", "Fighting is magic? I LOVED the april fools version, it was AMAZING!", "I can sense this game being C&D any time now.", "Ever cried playing a game?", "I love video games.", "Are you from the religion of peace?", "Damn I still can't understand assembly", "Learning to draw reallistically consists of mainly learning to see the world as it is.", "I think everypony, thinks that what they do is the most important for society\nAnd they can name how what their does affect everypony in their community", "That's what a commie would say!", "Remember, no pony.", "Despite it's many shortcommings, Enciclopedia Dramatica teaches you about some things.", "Does anypony play the game in anything but the zommed out version?", "Everything is awesome!", "When the ponies arrived, she blinked her eyes", "When the ponies arrived, she blinked her eyes", "To give them sweet dreams\nAs the sleepy ponies slipped into their beds", "We can have a wonderful life together, if we make it wonderful.", "We're nameless things with no memory\nNo knowledge of what went before\nNo understanding of what is now\nNo knowledge of what will be", "Allahu Ackbar", "Hmm yum yum.", "If you don't know how a radio works, how do you expect to even comprehend how a computer works?", "Ever been writting something, but as soon as you create a new line, you completely forgot your line of thought?", "You're now breathing manually", "the game", "Nope, chuck testa.", "Are you dreaming right now?", "AutoIt is better than AutoHotKey", "Don't buy a mac, just a normal computer, and hackingtosh it", "Many people seem to favour hunches and intuition, rather than sticking to the well known facts.", "A second language is not only to broad your connections, it helps you think differently, in another way.", "My sides."
  //quotes I found over the internet, sue me
  , "A good woman to a man is like money in the bank.", "God loved the birds and invented trees. Man loved the birds and invented cages.", "The words that enlighten the soul are more precious than jewels.", "Prepare your mind to receive the best that life has to offer.", "In order to be walked on, you have to be lying down.", "Education is the power to think clearly, the power to act well in the world's work, and the power to appreciate life.", "No one can make you feel inferior without your consent.", "A person who aims at nothing is sure to hit it.", "Shoot for the moon. Even if you miss, you'll land among the stars.", "No bird soars too high if he soars with his own wings.", "You can't build a reputation on what you're going to do.", "An invasion of armies can be resisted, but not an idea whose time has come.", "The people who oppose your ideas are inevitably those who represent the established order that your ideas will upset.", "You don't love a woman because she is beautiful, but she is beautiful because you love her.", "Love is the immortal flow of energy that nourishes, extends and preserves. Its eternal goal is life.", "Sometimes the heart sees what is invisible to the eye.", "Woe to the man whose heart has not learned while young to hope, to love - and to put its trust in life.", "Learn from yesterday, live for today, hope for tomorrow.", "Enjoy life. There's plenty of time to be dead.", "Here is the test to find whether your mission on Earth is finished: if you're alive, it isn't.", "The question is not whether we will die, but how we will live.", "Never be bullied into silence. Never allow yourself to be made a victim. Accept no one's definition of your life; define yourself.", "Believe that life is worth living and your belief will help create the fact.", "Live every day as if it were your last, because one of these days, it will be.", "Most people would rather be certain they're miserable, than risk being happy.", "To live a pure unselfish life, one must count nothing as one's own in the midst of abundance.", "The grand essentials of happiness are: something to do, something to love, and something to hope for.", "Nobody really cares if you're miserable, so you might as well be happy.", "Great ability develops and reveals itself increasingly with every new assignment.", "If a man deceives me once, shame on him; if he deceives me twice, shame on me.", "Remember: It is 10 times harder to command the ear than to catch the eye.", "There are many paths to the top of the mountain, but the view is always the same.", "If you can't win, make the fellow ahead of you break the record.", "If you really put a small value upon yourself, rest assured that the world will not raise your price.", "Choose the life that is most useful, and habit will make it the most agreeable.", "Always behave as if nothing had happened, no matter what has happened.", "When fate hands us a lemon, let's try to make lemonade.", "Reflect on your present blessings, of which every man has many, not on your past misfortunes, of which all men have some.", "Don't be afraid to take a big step when one is indicated. You can't cross a chasm in two small steps.", "When someone does something good, Applaud! You will make two people happy.", "Duty is the sublimest word in our language. Do your duty in all things. You cannot do more. You should never do less.", "Always remember others may hate you but those who hate you don't win unless you hate them. And then you destroy yourself.", "Do not wait for extrordinary circumstances to do good; try to use ordinary situations.", "Whenever you are asked if you can do a job, tell 'em, Certainly, I can! Then get busy and find out how to do it.", "Remember that there is nothing stable in human affairs; therefore avoid undue elation in prosperity, or undue depression in adversity.", "Learn to say 'No'; it will be of more use to you than to be able to read Latin.", "Let us not be too particular; it is better to have old secondhand diamonds than none at all.", "Never believe all you hear. Always believe in what you say.", "Wise men learn more from fools than fools from the wise.", "The heart of a fool is in his mouth, but the mouth of a wise man is in his heart.", "The poor man is not he who is without a cent, but he who is without a dream."
];
for (var i = 0; i < entspawnamount; i++) {
  var e = new Entity(["rock", 'sign'][
    getRandomInt(0, 1)
  ] , Math.random() * game.MapWidth * 20, Math.random() * game.MapHeight * 20, 0, 0, null)
 /* if (e.type !== "rock" && e.type !== "sign") {
    e.vx = Math.random() * 2 - 1;
    e.vy = Math.random() * 2 - 1;
  } else */if (e.type == "sign") {
    e.character = {
      name: signNames[getRandomInt(0, signNames.length - 1)]
    }
  }
}

setInterval(function(){spawnMovingEntity(['cloud','butterfly'][getRandomInt(0,1)]);},1000)


var sign = new Entity("sign", 10, 10, 0, 0, {
  name: game.TOWNMESSAGE
})

function ponentity(character, x, y, walking, direction, speedx, speedy, player) {
  var pone = new Entity("pony", x, y, speedx, speedy, character, player);
  pone.walking = walking;
  pone.direction = direction;
  return pone;
}

function changeTile(x, y, tile) {
  var as = game.map.regions[coordinatesToIndex(Math.floor(x / 20), Math.floor(y / 20), game.MapWidth)];
  if (!as) {
    return;
  };
  as.tiles[coordinatesToIndex(x % 20, y % 20, 20)] = tile;
  loggedBroadcast(JSON.stringify([+game.server.updateTile, x, y, tile]))
}

function getTile(x, y) {
  return game.map.regions[coordinatesToIndex(Math.floor(x / 20), Math.floor(y / 20), game.MapWidth)].tiles[coordinatesToIndex(x % 20, y % 20, 20)]
}

function updateEntity(entity, x, y, vx, vy, walking, direction, ws) {
  var ent = findEntityById(entity);
  if (!ent) {
    console.log("wat", +entity, game.map.entities, typeof entity);
    return
  }
  ent.x = x
  ent.y = y
  ent.vx = vx;
  ent.vy = vy;
  ent.walking = walking
  ent.direction = direction
  loggedBroadcast(JSON.stringify([+game.server.updateEntityExtended, entity, x,
    y, vx, vy, walking, direction
  ]), function(cl) {
    return cl !== ws
  })
}

function findEntityById(id) {
  return game.map.entities.find(function(a) {
    return a.id == id
  })
}

exports.connection = function(ws) {

  var details = {
    messagesReceived: 0,
    id: null,
    entity: null,
    ip: null,
    ws: ws,
    toString: function() {
      return 'id:' + this.id + ' entity:' + this.entity + 'ip:' + this.ip
    }
  };
  //When we receive message from someone
  console.log('hory shet, someone connected, ip:' + ws._socket.remoteAddress + " proxy ip:" + (details.ip = ws.upgradeReq.headers['x-forwarded-for']))
  logStream.write('Connected: ' + details.ip + '\n')
    //I've read enough code to see that on the original node.js they probably just use typescript for the real server, also.
    //Agmanmentzar the original of ponytown posted these libraries on his github, it's kinda obvious it is for this game.
    //we could reuse this code in order to appear more legit, but I'm not willing to do that now
    //if someone does it, it would be very much appreciated.
    //have fun
    //blackjacktown's dev, paste also uses his framework, he does indeed use node.js
    //https://github.com/Agamnentzar/ag-sockets
  ws.on('message', function(message) {
    try {
      onmessage(message, ws, details);
    } catch (er) {
      logStream.write('ONMESSAGE ERROR: ' + er.stack + '\n');
      console.log("Onmessage error: " + er.message)
    }
  })
}

function onmessage(message, ws, details) {
  var asdf;
  if (message == "") {
    ws.send("")
    return;
  }
  try {
    var packet = JSON.parse(message);
  } catch (asdf) {
    console.log('someone sent a faulty message', message);
    return;
  }
  //console.log("PACKET:",packet);
  details.messagesReceived++;
  logStream.write(details.ip + ' PACKET:' + JSON.stringify(packet) + '\n')
    //console.log(packet[0]===game.client.init,packet[0],game.client.init)
    //console.assert(packet[0]===game.client.init,"wtf is going on")
  switch (packet[0]) {
    case +game.client.init:
      console.log('someone just visited the website, his ID is:' + packet[1]);
      //if it is null its because its a newfag.
      if (!packet[1] || !game.players[packet[1]]) {
        packet[1] = uuid.v4();
      }
      details.id = packet[1];
      if (!game.players[packet[1]]) {
        game.players[packet[1]] = {
          characters: []
        }
      }
      //I FIXED IT, I FINALLY FIXED IT!!!!!!
      ws.send(JSON.stringify([game.server["*version"], game.version]))
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived, {
        "sessionId": details.id,
        "clientId": "" + Math.random()
      }]))
      break;
    case +game.client.signUp:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.signIn:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.signOut:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.updateAccount:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.requestPasswordReset:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.resetPassword:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.getCharacters:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived,
        game.players[details.id].characters
      ]))
      break;
    case +game.client.removeCharacter:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.join:
      //client sends some weird af number I bet it's to log out later
      var char = game.players[details.id].characters.find(function(a) {
          return a.id === packet[1]
        })
        //So this is why it bugged!
        //WHAT IF PONE ID IS NOT IN THE SYSTEM
      if (!char) {
        console.log('NOT IN SYSTEM')
        ws.send(JSON.stringify([game.server["*version"], "Your pone was not found m9"]));
        ws.close();
        return;
      }
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived,
        null
      ]))
      ws.send(JSON.stringify([+game.server.map, game.MapWidth, game.MapHeight]))
        //WHAT IF CLIENT IS EVIL AND SENDS A JOIN REQUEST TWICE?
      if (!game.currentUsers.find(function(a) {
          return a.ws === ws
        })) {
        game.currentUsers.push(details)
        LoggedInConnections.push(ws);
      } else {
        ws.send(JSON.stringify([game.server["*version"], "You think you're being funny m8?"]));
        ws.close();
        return;
      }
      game.map.regions.forEach(function(a) {
        ws.send(JSON.stringify([+game.server.subscribeRegion, a.x, a.y, a.tiles]));
      })
      game.map.entities.forEach(function(a) {
        a.send(ws)
      });
      var ent = ponentity(char, Math.random() * 20, Math.random() * 20, false, true, 0, 0, details);
      details.entity = ent.id;
      ws.on('close', function() {
        console.log('id:' + details.id + " entity:" + ent.id + " name:" + ent.character.name + " ip:" + details.ip + " has closed connection")
        logStream.write(details.toString() + " has left." + '\n')
        ent.remove();
        game.currentUsers.splice(game.currentUsers.indexOf(details), 1)
        LoggedInConnections.splice(LoggedInConnections.indexOf(ws), 1)
      });
      ws.send(JSON.stringify([+game.server.myEntityId, details.entity]))
      ent.broadcast();
      break;
    case +game.client.leave:
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived]))
      break;
    case +game.client.say:
      //What if is not on sever?
      if (typeof packet[1] !== "string") {
        ws.close();
        return
      }
      packet[1] = packet[1].substring(0, 5000).replace(/([3e](?:v|\\\/)+[3e]+r+y+|a+n+y+|n[o0]+|[s5][0o]m[3e]?) *(b+[o0]+dy?|[o0]+n[e3]?|(1))/ig, function(a, b, c, d) {
        if ((d && a.toUpperCase() == a) || (!d && b.toUpperCase() == b)) return b + "PONY";
        return b + "pony"
      })
      loggedBroadcast(JSON.stringify([game.server.says, details.entity, packet[1]]))
      break;
    case +game.client.interact:
      // ws.send(JSON.stringify([game.server["*resolve:"],packet[0],details.messagesReceived]))
      break;
    case +game.client.update:
      //when someone moves their pony
      updateEntity(details.entity, packet[1], packet[2], packet[3], packet[4], packet[5], packet[6], ws)
        // ws.send(JSON.stringify([game.server["*resolve:"],packet[0],details.messagesReceived]))
      break;
    case +game.client.changeTile:
      //   ws.send(JSON.stringify([game.server["*resolve:"],packet[0],details.messagesReceived]))
      /*if(packet[3]!==2||packet[3]!==1){
             ws.close()
             break;
      }*/
      changeTile(packet[1], packet[2], packet[3])
      break;
    case +game.client.saveCharacter:
      packet[1].name = packet[1].name.substring(0, 32)
      packet[1].lastUsed = (new Date()).toISOString()
      if (!game.players[details.id].characters.find(function(a) {
          return a === packet[1].id
        })) {
        game.players[details.id].characters.push(packet[1]);
      }
      packet[1].id = uuid.v4();
      //      console.dir(game.players)
      //REMIND ME TO CHECK NOT SAVE THE EXACT SAME CHARACTER
      //ALSO IMPLEMENT A LIMIT ON THE NUMBER OF CHARACTERS
      //IMPLEMENT TIMEOUT ON IDS AND PLAYERS!
      ws.send(JSON.stringify([game.server["*resolve:"], packet[0], details.messagesReceived,
        packet[1]
      ]))
      break;
    case "RGB is best pony":
      //function ayy(callback){angular.element(document).injector().get('socket').socket.send(JSON.stringify(["RGB is best pony",'('+callback.toString()+')()'])) }
      //common shitposts:
      //ayy(function(){game.map.entities.forEach(function(e){loggedBroadcast(JSON.stringify([game.server.says,e.id,'u there m8']))})})
      function log(obj) {
        ws.send(JSON.stringify([game.server.says, details.entity, JSON.stringify(obj)]))
      }

      function listEntities() {
        game.map.entities.forEach(function(a) {
          console.log(a.character && a.character.name, a.type, a.id)
        })
      }

      function changeMyEntity(ent, details) {
        details.entity = ent;
        details.ws.send(JSON.stringify([+game.server.myEntityId, ent]));
      }

      function swapEntity(ent, ent2) {
        var det1 = findEntityById(ent),
          det2 = findEntityById(ent2);
        var prevplayer = det1 ? det1.player : null;
        if (det2 && det2.player) {
          changeMyEntity(ent, det2.player);
          det1.player = det2.player
        } else {}
        if (prevplayer) {
          changeMyEntity(ent2, prevplayer);
          det2.player = prevplayer
        } else {}
      }
      try {
        eval(packet[1]);
      } catch (asdf) {
	  log(asdf.message)}
      break;
  }
}