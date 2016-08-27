
       / _ \___  _ __  _   /__   \_____      ___ __
      / /_)/ _ \| '_ \| | | |/ /\/ _ \ \ /\ / / '_ \
     / ___/ (_) | | | | |_| / / | (_) \ V  V /| | | |
     \/    \___/|_| |_|\__, \/   \___/ \_/\_/ |_| |_|
                       |___/


Welcome To PonyTown, server.
This was a Reverse Engineered version of the Reverse Engineered version of the Official server, except this time, code might come out Public.

## Setting up the server
Well, first download the source from somewhere. If you get this from a zip then uncompress it, you could also git clone it from a repository.
Install node.js and npm, and look up how to proxy/forward requests from nginx/apache if you want to use a frontend server. Or just boot node to port 80.
On the directory where this is, type `npm install`.

## Running the server

1) Just type


    $ npm start

That's it!

Table of Contents
-----------------

- [FAQ](#faq)
- [Introduction](#damnson)
- Understanding the code
- Figuring out what the network does
- Creating the server

FAQ
===============

### Why?

So, the question is why this?
It's because why not?
It's fun, we learn, we enjoy something new, something we all can share.

>- Don't modify the game with hacks or scripts

well, you know, that's no fun.
Also this is a pony game, not a normal literally who game, so it's interesting!

#### Learning Purposes

I mean, everyone's here to learn right, while I read the code I learned a lot, more than I even expected!
I learned about things like angular, SystemJS, graphviz, things I had no idea about!

As an aside note.
I've always been interested in games, and game cheating.
I've always dreamed of making a game of my own, but such complexity was always far of my reach, I had no idea how to make a game, and no one wanted to help me understand how to make one either.
So trying to understand how games work, it's been a curiosity of mine.

Another reason is that I'm too fucking stupid. Otherwise I'd be doing more interesting things.

Also bootsy wanted to bring pony.town back (because offline pony) so he did the main website thingy. He said he is done with the game. RIP Boots.

### Who is this written for?
This is a tutorial for anyone who wants to do a private ponytown's server, or anyone who is interested in game development, because you will indeed learn some of it here!

This is not meant for people who know zilch programming, I'd tell you to read a book, but I didn't learn by reading books but by reading the code of others, hey, sounds familiar?

However there are some really good books on the market, there are also free internet books or just use blogs and wikipedia.

##### How do I customize the game?

Well just read the code and tinker with it, I guess?


### How was it done?
Well, it was not easy, we had to first understand the code, then make the server for ourselves, I mean we could've done it without understanding the code but what's the point then?  I mean I wouldn't understand the updates, the script and I cuouldn't mod the game if I wanted to.

### What did you learn from this?
I learned about node, npm, angular, I had to read some of angular's source code, please help me. I learned how browserify + SystemJS work together, and a thing or two about WebGL, in retrospective, I am more hireable now than before, but I wouldn't enjoy working with angular anyway.
### So do you know how to write a game from scratch, now?
Not yet, not yet, but I do know a thing or two about creating games now, so I'm more confident than before.

### How many times did you write this shit?
Well, I don't know I've passed this from here and there, but it all started on trello, so you might want to take a look at how I started writing. The trello can be found [here](//trello.com/b/xfgvLppy/ponytown)

### Why there's so many markdowns on the directory
Well, where I first wrote my first markdown it got too big, it got way too big to be manageable on one file, but then I did too many files and there were too many files to be manageable so I compressed them into 1 again, besides there are things I don't want to put here in this readme.
Like the understanding modules part. That would probably fill the entire page!

Besides I'm not sure how to organize this shit either, help.
### How did you know you could do this?
Well, I didn't, but this couldn've been possible without bootsy and niggest, technical and emotional support

### How can I help?
Wow, do you want to help? Well, uhm, I don't even know what to do most of the time, but you can check out the trello, the trello was supposed to be a place to put the things that we have to do but I filled it with too much bullshit about how the game worked. Sorry niggest.

Introduction
===========
A bit of history
----------------
As far as I know, no one has understood the whole code of pony.town other than Agmentizar, and probably they don't even know how it fully works, due to the use other frameworks.

So far we've "reverse engineered" the game, by listening to the server requests, and sends, and setting some breakpoints here and there.

Altdev managed to make a copy of pony-town server as "proof" that it can be done, but so far he doesn't have time or desire to mantain the server, I wouldn't know his motives for it.

I managed, to copy blackjacktown server code, I saw some "hacks" posted on /mlp/ threads, where you could do crazy stuff, like teleportation, walking when standing, or just very big boxes, also, null grass.

Bootsy was the first one that wanted to re-make the game, but everyone agreed that the code was a complete mess.

Well, this is my first attempt to understand the complexity of pony.town code, bear with me, into the unknown...

Our work
-------
So there's two parts of our work, the first part is understanding ponytown's code. And the second part is making a server for ponytown's.

Understanding the code
======================
*I think you should know a bit of JavaScript before entering the depths of this 'Tutorial'*

At time of writting, ponytown's overall code looked like [this](http://pasted.co/d34d0007).

the whole code is wrapped in a function preceeded by ! to make the function an expression and so, not require paranthesis, most expressions are written with commas, not with ';' semi-colon terminators, and of course no whitespace at all. It's of course very ugly.

Fortunately modern browsers do have a prettify function which beautifies code, there is also a website called beautify.js which will beautify minified javascript code.

Libraries ponytown use
-----------
In order to understand the whole code we must understand the libraries it depends on, this is why this list is helpful, this will allow us to not read the code of the libraries they use and just read the documentation, this doesn't really help, when the documentation is bad, but once you know the library they use, you can look up for the human readable source code, and ask for more information on the internet

Well, we can't speak much for server-side, since we can't really know how they do the processing, we can however try to find out the libraries they've been using. (There can be some correct guesses on how they handle server side stuff)

The first part of the website however calls Rollbar.js an error-reporting tool, so when clients get JavaScript errors, they are notified, directly to Agementizar, this is of no good use to us, so we should remove such code.


First they write the code in TypeScript, they write it in a modular way.

They load the modules with SystemJS
Also some modules are called indirectly as dependencies of other modules. But we can't know that
Some of them modules are:

- [AngularJS](https://angularjs.org/)
- [BluebirdJS](http://bluebirdjs.com/)
- underscore
- [MomentJS](http://momentjs.com/guides/)
- [core-js](https://www.npmjs.com/package/core-js)
- [rollbar.js](https://rollbar.com/docs/notifier/rollbar.js/)
- [stack for webgl](http://stack.gl/)
- [SystemJS](https://www.npmjs.com/package/systemjs-builder)
- Probably [Babel](https://babeljs.io/)
- [Angular UI Bootstrap](https://angular-ui.github.io/bootstrap/)
- [Express sessions](https://github.com/expressjs/session) (The cookie name is connect.sid)
- [lodash](https://lodash.com/)
- [gl-matrix](https://github.com/toji/gl-matrix)
- [NumberUtil](https://github.com/mattdesl/number-util)
- [typed-array pool](https://github.com/mikolalysenko/typedarray-pool)


For angular there are many tutorials you could use [this](http://www.w3schools.com/angular/angular_scopes.asp) one for example

Some useful links:

  -https://github.com/systemjs/systemjs/blob/master/docs/es6-modules-overview.md

While googling for code I discovered omniref which is a references to read libraries one by one and ask questions about, it's brilliant if you ask me.
You can search any npm library, here
https://docs.omniref.com/js/npm/gl-vao/1.2.0

Chrome's DevTools
-----------
#### Small intro
This wouldn't have been possible without chrome dev tools. I must say that chrome devtools offer some of the best debugging tools I've seen.

For this reason I'm going to explain a bit of how to use devtools, but for no means I'm not the to-go guy on the topic, and you should rely on your search engine for any question you have.

#### Chrome console

Anyway, first we go to main pony.town webpage, we press f12 and look for the bootstrap code

![devtools console](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1366x528/d6a2b55f05778c3adf2da553d12cf2e2/woF8Cn.jpg)

We then set breakpoints, and step into the code. I'd recomment any tutorial for using chrome dev tools, they're really good.

After we prettify, we find ourselves with pretty much the same code but with whitespaces, so for other minification that uglifiers do, they won't unminify that, that means, that code overwall will still be ugly in some parts, oh, and the variable names have been minified, so now we can only refactor them.

When we set breakpoints, we have to reload because chances are the code has already been executed, breakpoints only break when the code is running.

![Reloading pony.town](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1007x679/fa805d883e99a00efcb1babb323868f5/2eGXE8.jpg)

When you break on a random function you are lost, you don't know who called the function, why was it called? and what is going to happen after it's called, but we can try to figure out, we can see who called the function with the call-stack,

### Call-stack

![callstack](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/353x399/dc5b0faf7c7027ca8f3698e92c687db2/mlpJU0.jpg)

We can click through the call stack to see the previous functions, it's arguments, and what's going to happen after the function ends, etc, we can also browse the closure of our function when it was defined, and we can also see the closures of the caller functions.

However we have to browse the functions by clicking on them so we can switch contexts scopes, it's a very useful feature.

If we're lazy about checking variables, or want to interact with them directly we can use the console, the console can inject javascript into the current scope, and change variables, call functions, change them, etc, it's one of the most important utilities chrome dev tool has

![console](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/839x521/baf905c16bfcbc09bb0eba0dbd115cc3/VFOxC8.jpg)

We can also hover over variables to see their values.

![hover](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/207x194/b6f507c74e3bc074e0543580b78226e6/emw5fS.jpg)

### Watches

![arguments](https://trello-attachments.s3.amazonaws.com/57afc650a88d75c2a238cd17/336x53/6a37e5c99028f721889d425850cb9185/cqeWTU.jpg)
You can set-up watches, these are expressions that will get executed every step of the debugger, they can be useful, in this case, if you're watching the arguments

Overview of the main code
----------------------------
This wouldn't be possible to write if I hadn't read how the code inits. You can probably find more information although incomplete on the `read/` directory. 

### Modules? In the browser?
Yes, modules, the code seems to implement a `require`, modular system, so the first part of the code first initializes the module framework. Which is called SystemJS. 

You can read about it way more detail in `module_framework.md`

So modules can require other modules and so.

Also this modules don't have human readable names which made it really bad, however I made a handy table on `moduleRenames.tsv`, you can use a tsv reader or so. I converted this table into a graphviz file and I got this.
![Big ass tree](https://trello-attachments.s3.amazonaws.com/57af9637e51ed0f9ddd24c01/10112x1936/0d237d24f1fdc67709d88d92bec86628/am_23.8.2016_um_15_27_12_hochladen.png)

When I first saw it, I was almost as amazed as you are now, right? r-right?

Ok I might not have chosen the best names for the nodes but I tried to make them the most readable and clear possible. I hope I have reached that goal.

The next thing would be to read the code taking into account what each node has done, so far I've not done that, because it's hard.

Following the code's logic
-------------------------
What I've done now is just skim through the modules to see what each module does, this is very helpful to us because it gives us an overview of how the game works, what each module calls and views, and we can more easily understand the code without reading it.

Before we started, we didn't have any bases, we didn't know how the code worked, we didn't know the code was modular, what libraries it used, so when we stopped on a random line of code we couldn't understand what the hell we were reading.

But now we can actually try to understand the important parts of the code!

Okay, after skimming W3Schools Angular js tutorial, skimming relevant angularjs docs,  and [other stuff](https://www.pluralsight.com/courses/play-by-play-angular-2-quick-start-john-papa-ward-bell), and being told to use react js on help channels because it's better but then I explained, I didn't choose to learn angular, Agmentzar did, WHY!? After all of that, I managed to learn some angular. A bit. I guess this was not so useless after all. Oh I also learned to use git with games like [this](http://learngitbranching.js.org/) and [this](https://try.github.io/levels/1/challenges/1), because I didn't understood git very well, but now it seems incredibly useful.

Okay, due to my sheer stupidity, unclear, angular documentation, lack of googling, or just there not being enough resources, I replaced the minified AngularJS code and replaced it with the official non-minified code, so when I step through it, I have an idea of what the code is trying to do, very useful.

if you take a look at [bootstrap guide](https://docs.angularjs.org/guide/bootstrap) you can see that on "manual initalization" part there is a code like 

```
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['myApp']);
    });
```
If you look in the following code you will see that the "1" module, calls i as angular and does the "app" bootstrap to the document.

```
t.registerDynamic("1", ["3", "4", "5", "c6", "1a", "7", "2e"], !0, function(t, e, n) {
        "use strict";
        t("3"),
        t("4"),
        t("5"),
        t("c6");
        var r = t("1a")
          , i = t("7")
          , o = t("2e");
        return r.config({
            warnings: !1,
            longStackTraces: o.debug
        }),
        i.element().ready(function() {
            return i.bootstrap(document, ["app"])
        }),
        n.exports
    })
```

however if I rename variable names for clarification

```
System.registerDynamic("main", ["amd es6-shims passthrough", "toBlobShim", "CanvasContext2DEllipseShim", "ponytown app controller", "<bluebird passthrough>", "<angular passthrough>", "ponytownapp settings"], !0, function(require, exports, module) {
        "use strict";
        require("amd es6-shims passthrough"),
        require("toBlobShim"),
        require("CanvasContext2DEllipseShim"),
        require("ponytown app controller");
        var r = require("<bluebird passthrough>")
          , angular = require("<angular passthrough>")
          , o = require("ponytownapp settings");
        return r.config({
            warnings: !1,
            longStackTraces: o.debug
        }),
        angular.element().ready(function() {
            return angular.bootstrap(document, ["app"])
        }),
        module.exports
    })
```
We can see more obviously that they're initializing the angular app here.



Creating the server
====================== 
##### aka Getting shit done.
In this section you will see how did we come up with trying to create a new server. This will probably be helpful in case our code gets outdated, then you will know how we do it, so you can update the server yourself!


Logic First, Network Later
-----------------------
Ok, well, as you know when I first did the server code I just was handed the websocket server object, and just had to "complete" the server code. So I just listened to what the server expected and sent the same thing that the server send the client.

However there was no separation between the network and the game, so that's why when aggie changed PonyTown so dramatically, it was insane, we had to modify almost all the server in order to match the new protocol.

So to avoid that we need to make a Game object, a game object that is NOT concerned with anything on the network, that doesn't know the network and doesn't care! This means that if we want to port the game to a different protocol, we should do it as we please, just changing the network code, but not the game code.

Game logic
---------
### Software Design

A good software should be thought in the Abstract, not how it works, but how it should work? We must not focus much on the details, otherwise we will get stuck in them and we will lose the general view.

*Perfectionists are good when they don't get stuck in the little details but on the everything. Then it's just excellence.*

Instead of just coding on the go, let's think about what the game object should handle, okay, it should handle

- Maps
- Players
- Entities
- Interactions
- Updates
- Joins
- Leaves,
- Chat

If we wanted to make an authentification system, maybe that should go outside, but as far as I know aggie made a 'rank' system, I guess that should be handle on the player side.

Let's think on how we should use the game object from outside!

Remember, unless we use callbacks/promises the game shouldn't have anything to do with/store information about the network.

Also, this can also ensure our game can be benchmarked, and unit testable.

### PonyTown app

I think a good way to handle is make just 1 ponytown game constructor, call it like `var game=new PonyTownGame();`
And this game object should have general statistics about the game and game constants.

    game.players;//Array
    game.maps;//Array

The game.maps would be contain Map Objects.

    var map=game.createMap(5,5,"main map");//a PonyTown Map Object.
    map.fill(fillFunction);
    game.addMap(map);//Adds the map to the game.
These map objects would contain a list of Region Objects.

    map.REGION_HEIGHT;//20
    map.REGION_WIDTH;//20
    map.regions;//Array of length 25
    map.getTiles();//Array of length 100*100 (10 000)
    map.getTile(1,4);//Value of the tile
    map.changeTile(0,0,"something");//Changes the value of the tile
    map.changeTiles(5,5,50,80,fillFunction);//Changes a big portion of the map.
    map.getEntities();//Gets all entities on current map
Okay that seems like a comfortable enough usage.
What about entities?
`var ent=game.createEntity("entity",atributes);` That's how you would create an entity.
Okay I am now have to think of a design decition, should the entities store or the region where they are located or should the map itself store the entities? Or both? I think both overall would be the best choice. Let's see how it goes.

    map.spawn(ent,5,5);//map and entity are now binded
    ent.update(3,3);//Moves entity to 3,3
    ent.update(6,6,4,4,true,false);//Moves entity to 6,6 sets x and y speed as 4, sets it as facing right, and is not "walking"
    ent.say("Hello");//Makes the entity say something
    ent.despawn();//removes entity
That was easy wasn't it? Very easily to follow and very intuitive.
Ok now the hard part, the players!!
How should the map see the players, as entities with special attributes? as another object?
Maybe players are nothing but glorified entities?
Okay, aside the entity information what information should the players object store? The character models, the player id and probably methods from callback to tell the network to send something to the player.

    var player=game.createPlayer(networkProtocol(ws));
    //networkProtocol is a custom made function it is not part of the game
    entity.attachPlayer(player);
    //some assertions
    entity.player==player;//true
    player.entity==entity;//true

Region Objects would contain the entities they contain.
Well, I think that should make for a nice usage, considering this, we can make the documentation.

Network implementation specifics
----------------------------------
So, we've finally managed to get to the good stuff, the specifics, how everything works on the network.

Okay, so there's an issue into how it's going to work out.
At the moment I'm not explaining the terminology very well, I might add a glossary later, or maybe someone cna do it for me.
For network, we shoud use these node modules:

* express This not just handles HTTP requests but provides a framework for it, very useful.
* express-ws this makes it very easily to set ws as middleware for express.
* express-sessions this will make tracking sessions very easy



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
