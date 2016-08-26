Phew as you can see we already understand how the wrapper function works, now we know how it calls modules, and how the modules "require" the other modules!

I made a very very nice graphic of how the modules depend on each other, what modules depends on what, some modules are very needy oders are very needed

[here](https://trello.com/c/Dy7bImAd) you can find a node graph of the modules dependencies.

In this case we should start with module "main"

So, here I'll try to explain how modules communicate with each other.

Module "main"
========
Alright however we can't just start with module "main", it has dependencies. 
![lol](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1299x429/dc955e69f381264e2e7c1cfc04aa0617/am_13.8.2016_um_22_35_24_hochladen.png)
So, 

Module "es6-shims"
------------
Ok, this was a very hard read, but apparently everything this module is about, is ES6 Shims for es5 and older browsers Yay! 

It seems to return Window.

Module "amd es6-shims passthrough"
------------
![damn](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1243x430/2d492de01c22ef6d481a8e525e0eb714/am_13.8.2016_um_22_37_38_hochladen.png)
![mod3](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/593x85/738533e86af74820ec1bb72af3e843b6/am_13.8.2016_um_23_24_18_hochladen.png)
???????
So, literally nothing? it returns the first parameter. Which is window.
I guess this is an identity function right?

Module "main"?
-------------
![finally](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/978x281/afe0c0d79aabbebf79c50f8404d36a7f/am_15.8.2016_um_11_37_56_hochladen.png)
And so t('3') should return Window, with es6 shims enabled.
There's a problem though and that is Module 1 doesn't care an discards the result.
We can however see that we will do the same with module 4, 5 and be, oh well

Module "toBlobShim"
-----------
![4module](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1920x782/6f6355000172c2fff73711343328844c/am_15.8.2016_um_18_54_40_hochladen.png)

It is a global system wrapper as explained [here](https://trello.com/c/7yQECegR/13-callback-i)
So what this module seems to do is a shim of HTMLCanvasElement.prototype trying to add toBlob property.
Since it doesn't modify window it returns undefined.

Module "CanvasContext2DEllipseShim"
----------
![nothing to se here](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/377x313/e3b83b67b2d8b6b085d4bce1249bced0/am_15.8.2016_um_19_04_01_hochladen.png)
adds ellipses to canvases. Is a global system wrapper.

    CanvasRenderingContext2D.prototype.ellipse = function(t, e, n, r, i, o, a, s) {
        this.save(),
        this.translate(t, e),
        this.rotate(i),
        this.scale(n, r),
        this.arc(0, 0, 1, o, a, s),
        this.restore()
    }
doesn't edit window, thus returns undefined

Module "ponytown init"
==========
![Weeeeeee](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1671x930/861350e8bc1ccd6bc86c921db9eaa1d4/am_15.8.2016_um_19_12_43_hochladen.png)
Seems we won't see Module "main" for a while
![Hm interdasting](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1920x834/71810fa144cfb2077e2592fddd0ec77d/am_15.8.2016_um_19_17_42_hochladen.png)
From a glance seems it is the setup for the game's code, we did it guis!
Now we can read this piece of code with a lot of confidence, understanding it's methods, callback, and closure variables.

If you look carefully it seems to be the init code of pony-town app

Module "<angular route passthrough>"
-------------
![returns and sets module 6](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/853x73/26b14e472ec9d7161edf361c8266d191/am_15.8.2016_um_20_16_08_hochladen.png)

it returns and sets the value exports from module "angular route".

Module "<angular passthrough>"
---------------
Module "angular route" requires it's dependencies to be evaluated first.
![very similar](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/872x60/7a80fc91cfdbee0dddd898caba140e28/am_15.8.2016_um_20_23_50_hochladen.png)
This is the same as module "<angular route passthrough>", it seems it's just a passthrough function.

Module "angular"
---------------
red arrows mark passthoughs
![c0](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1129x476/f8181d93582ff27301f7b5c00ac63aee/am_15.8.2016_um_20_37_53_hochladen.png)
This code seems to be angular code, is long and terse, Since this code is a global-system wrapper It returns the angular object. (37495-47367)

Module "angular route"
--------------
![angular-route.js](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1920x833/ab3e845793fcb7f3ce120416d7422eca/am_15.8.2016_um_21_42_50_hochladen.png)
Ok I confess, I can't read all of this code at once, I just googled a part of the code and it seems to be angular-route.js angular plugin. See https://docs.angularjs.org/api/ngRoute
however this returns undefined.

Module "<angular animate passthrough>"
--------------
![oasssing through](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1395x194/9b96bf6ec0820b23aa2bac0f28397726/am_15.8.2016_um_21_51_36_hochladen.png)
There seems to be many passthroughs, also, from the looks of the dependency tree, it looks like another angular plugin.

Module "angular animate"
--------------
![animate](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/719x474/01301488fe55457c1a38e459da83d397/am_15.8.2016_um_21_54_52_hochladen.png)
It's just [angular animate](https://docs.angularjs.org/api/ngAnimate) 

Module "Angular UI bootstrap"
--------------
![like jumping around heh](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1860x234/7f20205cba0f4836684e0a5d20afb99f/am_15.8.2016_um_22_00_32_hochladen.png)

WELL, despit it being an angular plugin it doesn't seem to depend on angular directly, how strange and weird! And it is said to be created by angular UI team, they are not related are they?
["bootrstap.ui"](,https://angular-ui.github.io/bootstrap/)
*Ohhh... so that's why buttons look like that*

Module "ponytown app"
==========
![dem dependencies](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1315x350/1014c8ae9e5dd0dc3b1e1fc086e2d9c3/am_15.8.2016_um_22_40_15_hochladen.png)
Just take a second to look at how many dependencies there are here, a lot!
Seems we truly won't see module "ponytown init" in a long while.
However I can already tell this might be pony-town app definition!
![approx](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1366x125/14b5219b67edc508560279957e3f6389/am_15.8.2016_um_22_45_44_hochladen.png)
This is how close we are to understanding ponytown, don't despair, from what I've seen most modules are very short.

Module "bluebird js"
--------------
![not clear at all](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/911x369/44895119677facb44b0c1426f30e5130/am_15.8.2016_um_23_17_29_hochladen.png)
Even though not clear this code seems to be from bluebirdjs it returns a function, probably the promise constructor.

Module "momentjs"
---------------
This one is defined by amdDefine
![moment](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/712x472/a2cb97ad7855d9d1d4e1916eab00b7ca/am_16.8.2016_um_00_21_36_hochladen.png)
This is momentjs code

Module "amd momentjs passthrough"
----------------
![choices](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/691x78/cbe857171cdc899a838d0bb8be61edd1/am_16.8.2016_um_07_51_37_hochladen.png)
Is this either  the identity function or an amd passthrough?

Module "rollbar config"
---------------
![delet dis](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/690x247/4c6d40c939fe2613a088bf2a1a5e1303/am_16.8.2016_um_07_58_26_hochladen.png)
This is just setting some rollbar custom functions as export methods, then returns the exports object

Module "ponytownapp settings"
----------------
![gets settings](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/689x181/589b7ffa57d506a2fdec8478fa09cf8f/am_16.8.2016_um_08_05_07_hochladen.png)

Module "game service"
-----------------
![gs](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1040x774/236a9b77908c137713c68464b0f473ec/am_16.8.2016_um_12_51_31_hochladen.png)
I don't know what this does just yet, but from the looks of it, it's called GameService, guess that's what it is!
This seems to get the settings from the ponytown app from the HTML

Module "1e" and "1d"
---------------------------
![pass](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/911x244/f141eeeeb47e9572f6c2dbfb57362c5b/am_18.8.2016_um_12_28_46_hochladen.png)
"1e" was just the passthrough.
this module seems to copy some methods.
like "ClientSocket".ClientSocket and "Socket Metadata handler".Method. and all properties of module "possible socket methods?"

Module "possible socket methods?"
---------------
![not really sure how to describe this module](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/913x367/347b908b91674f804cf862fe08fe6006/am_18.8.2016_um_12_36_04_hochladen.png)
So what this function does is define the following methods: `getName`,`getIgnore`,and `getBinary`
Hmmmmmmm
Perhaps this is about sockets?
we can't tell from this point

Module "ClientSocket"
----------------
![a big module](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/927x534/cb1a83cb7d55594821fa1e4390c7ee3e/am_18.8.2016_um_12_41_25_hochladen.png)
This is the PonyTown socket function, it is the part that handles all the packets and crap. It's called "ClientSocket".
It connnects to the websocket.

Module "<buffer from node attempt passthrough>","buffer from node attempt","<buffer for the browser passthrough>"
--------------------------
![huh](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/896x176/65a5d31e9bfe1ef0adeb8acebd76814a/am_18.8.2016_um_12_53_04_hochladen.png)
which is a passthrough of "buffer from node attempt" which is.. an attempt to require module "buffer" which we dont have so it calls "<buffer for the browser passthrough>" which is a passthrough of the "buffer for the browser" module, presumably the buffer module

Module "buffer for the browser"
-----------------
![so many hops](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/880x770/2272dda81445a74906e9d4f7c520d0d9/am_18.8.2016_um_12_54_30_hochladen.png)

WELL, it does seem like something buffer related, also we can already see we're calling 3 more modules, which I think They'll just be passthroughs.
![buffer](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/931x559/8ad7d3da251d96896742e35502834334/am_18.8.2016_um_12_58_29_hochladen.png)
Edit: it's [this](https://github.com/feross/buffer/blob/master/index.js) code.

Module "base64 to byte array"
-----------------
![base64](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/906x447/269766ba18dc15a2f5bc260131f7ecbf/am_19.8.2016_um_12_17_58_hochladen.png)
This seems to convert from and to base64 to bytes.

Module "IEEE754"
------------------
![wtf](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/912x469/85cb0134024a8e476a1a6fcd9998619c/am_19.8.2016_um_12_21_45_hochladen.png)
Well, according to some research this is actually [ieee754](https://www.npmjs.com/package/ieee754) node module.
In another words, binary to floating point and viceversa

Module "isArray"
------------------
![well that one was easy](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/906x170/dd7801294556f37b54a0cd9f81edd9f9/am_19.8.2016_um_12_29_08_hochladen.png)
Just an `isArray` function, that was easy


Module "key-valued arrays functions"
------------------
![wewled](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1145x364/320bbd42b7514873c301e674036ca261/am_19.8.2016_um_21_32_52_hochladen.png)
From what I can read, it provides set, read, and remove methods for a data structure like this: [["key","value"],["key2","value2"]]. a naive implementation of a map.

Module "random string&rate limiter"
-------------------
![toorandom](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1118x314/b5209c979340bb50504b2e6c805893d6/am_19.8.2016_um_21_42_46_hochladen.png)
As the code says, a random string generator!
..and a rate limiter. Of a certain type of data structure

Module "binary parser generator"
-----------------
![really](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1405x811/4d0f3ba2c407ba4816119bd6e894491c/am_19.8.2016_um_22_05_18_hochladen.png)
For some reason they decided to eval functions to parse the binary data.

Module "PacketHandler"
-------------------
![exactly what it says on the tin](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1397x794/6a783260185262cec3071b75337b966a/am_19.8.2016_um_22_09_57_hochladen.png)
This is the packerHandler function, module 12 is the same but with debug options.

Module "PacketWriter"
------------------
![baseacketwriter](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1410x775/991b93b0f07eb2bb1b8ae78f1f263313/am_19.8.2016_um_22_32_10_hochladen.png)
This seems like a writer for packets, that handles types, interestingly this one sets `__esModule` to true
Since `__esModule` is true, the `createEsModule` will never be called but esModule will be set to the return value.
This sets the .default value of the exports as the function, since this doesn't set `__useDefault` to true, the whole `__esModule` will be passed to the parent module, to call it you need to use `.default`.

Module "utf8"
-----------------
![utf8](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1410x713/5ab854af7d211cc1aef9f4a4dbcec096/am_19.8.2016_um_22_54_22_hochladen.png)
This looks like a utf8 encoder/decoder

Module "BasePacketWriter"
--------------
![very basic](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1405x752/e169e5d2aeaf3ceb5a316b205bfab6c6/am_19.8.2016_um_22_58_59_hochladen.png)
This looks like a basic packet writer.

Module "PacketReader"
----------------------
![hm](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1401x738/9b4c3009a1227bfb4bdc23477a8614fb/am_19.8.2016_um_23_06_19_hochladen.png)
the reverse packet writer, or packet reader. "BasePacketReader" is a basePackerReader, base as in basic.

Module "Socket Metadata handler"
------------------
![metadata](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1173x671/d9433151778b208af5079ba3217ff255/am_20.8.2016_um_08_43_26_hochladen.png)
This looks like a socket Metadata handler.

Module "lodash core"
----------------------
![lodash](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1179x691/072d386a4a98794d69e97e8f04ead8a5/am_20.8.2016_um_08_56_31_hochladen.png) Well, it does seem they are using this library called lodash, that's what this module is. At least, lodash-core. 25712:30204

Module "@empty"
----------------------
![totally empty](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1264x766/4f1325779a3579e173f21c36747f9477/am_20.8.2016_um_09_04_12_hochladen.png)
It just returns an empty object, huh. I think you can use this object to store variables on other modules.

Module "game constants"
-------------------
![constants](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1387x331/1e3a8e08051852704e13947da9090e74/am_20.8.2016_um_10_14_30_hochladen.png)
Well, these are the popular game constants.

Module "gameDraw Methods"
------------------
![lots of lots](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1389x704/a019f5c1e181a2f72c4f589f49ca06ea/am_20.8.2016_um_10_20_31_hochladen.png)
These are the methods this module provide. You might just as well guess what it does.

Module "game retriever"
----------------
![more __esDefaults sheanigans](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1391x178/13cd26b03badf10b06391cbe6ceb8e75/am_20.8.2016_um_10_26_05_hochladen.png)
The `.default.game` will return a new module "game", if it hasn't been created already otherwise return the already created one.

Module "game"
=============
![very interesting](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1397x741/70e2bda2ab7fac0a98d0d5ec11071361/am_20.8.2016_um_10_30_53_hochladen.png)
Well, this module provides the function to get the canvas, the emotes like `:apple:`, the mouse and keyboard event listeners. and the draw functions.
This looks like the `GameService.game` code.
![a8 module](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1906x970/4363c9076cc79414188f72313181796d/am_20.8.2016_um_10_40_18_hochladen.png)
It seems this module calls the rest mess of modules, so, we're kinda close then?

Module "gl-matrix"
----------
![a5](https://trello-attachments.s3.amazonaws.com/57afd84139c50a07b5b2abd2/1414x228/b38998f6cac767b98f7a8a72a9a8db00/am_20.8.2016_um_10_45_32_hochladen.png)
Thanks to the naming of these module propierties we will now know what the other modules are!
Oh, apparently, it's [this](https://github.com/toji/gl-matrix) library, what do you know?
 If you don't mind I'll quote this piece of code that appears [here](https://github.com/toji/gl-matrix/blob/master/src/gl-matrix.js)

```
exports.glMatrix = require("./gl-matrix/common.js");
exports.mat2 = require("./gl-matrix/mat2.js");
exports.mat2d = require("./gl-matrix/mat2d.js");
exports.mat3 = require("./gl-matrix/mat3.js");
exports.mat4 = require("./gl-matrix/mat4.js");
exports.quat = require("./gl-matrix/quat.js");
exports.vec2 = require("./gl-matrix/vec2.js");
exports.vec3 = require("./gl-matrix/vec3.js");
exports.vec4 = require("./gl-matrix/vec4.js");
```
So, we can with confidence know what these modules do, without the ardous work of trying to read the minified code, we can just read the source code.

Module "game retriever"
-------------------
![pony](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1394x718/c7885e217e7f1decca2bd26eb6430cac/am_20.8.2016_um_14_06_49_hochladen.png)
This module is the constructor for the pony character

Module "draw pony"
------------------
![draaww](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1387x707/e157bda4d0bc02902b989cf185c5d9d5/am_20.8.2016_um_14_12_08_hochladen.png)
This is the pony draw module, this is how they draw their ponies.

Module "colors for game"
--------------------
![colour and color](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1384x262/79302a2f72ae2d94fc8ebd4be8e82285/am_20.8.2016_um_14_18_03_hochladen.png)
These are the game colours definitions.

Module "colors"
-------------------
![colors](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1364x662/48e18c9550f91e0294922172e9f0f702/am_20.8.2016_um_14_25_20_hochladen.png)
This is a color library, didn't found it over the internet, yay!

Module "sprite URLs"
----------------
gr8 b8 m8, i r8 8/8
This stores the links for the sprite images.
![b8](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1389x739/125a2fb9eb224aa7b771cc985b7b6160/am_20.8.2016_um_14_34_12_hochladen.png)

Module "sprites"
---------------
This stores the location of the sprites for the game, the coordinates. of the sprite images. Also stores movement, and sprites, a very interesting database to look at.
![20](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1734x683/6f6e414262d8528369c2732b90a1d78a/am_20.8.2016_um_14_40_59_hochladen.png)
Module 20 is one of the most required modules.

Module "load&draw sprites"
------------
![sprites](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1389x732/5033a78dce61e33b3c0e5a79f652cd91/am_20.8.2016_um_14_49_52_hochladen.png)
loadSprites and drawSprites methods, presumably, for sprites.

Module "pony animations"
-------------
![animations](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1388x479/c47ad88b21aed31fafe1a06abd3c0019/am_20.8.2016_um_14_52_58_hochladen.png)
How pony animations are defined.

Module "draw pony"
-----------------
![drawing ponies](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1335x737/ebd116122f9ec56f1be379e8d5827729/am_20.8.2016_um_14_58_25_hochladen.png)
The pony draw modulde, for webgl, and 2d.

Module "pony methods"
-------------------------
![ponymethods](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1393x729/40292de93277d774349b76866c85d05d/am_20.8.2016_um_15_35_46_hochladen.png)
Here the default pony is defined, it also provides, a randomize pony, compress and decompress pony methods and much more.

Module "darken colour"
------------------
![fill](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1374x317/2bbc1119dcfd873af429c8ca920ba869/am_20.8.2016_um_15_43_01_hochladen.png)
fillToOutline and darkenColour

Module "Map"
---------------------
![map](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1388x735/cfafeace6942ec5586bbae2e5da505e4/am_20.8.2016_um_16_22_52_hochladen.png)
This is the map module, defines the map methods.

Module "tiles"
-----------------
![tiles](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1399x424/d8eaae46aef8678f202cbaa66738ae9b/am_20.8.2016_um_16_27_20_hochladen.png)
This module defines the tiles, and properties.
They generate some tile arrays, but I don't know their meaning atm.

Module "camera"
---------------
![camera](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1397x683/021dea087d082e58da76af9c36c56501/am_20.8.2016_um_17_02_29_hochladen.png)
This is the camera module

Module "SpriteBatch"
----------------
![sprite operations](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1388x668/51febc61b87012617428e16d9e765ac3/am_20.8.2016_um_17_13_18_hochladen.png)
This is the spritebach module, it does things like drawing sprites.

Module "NumberUtil"
------------------
![conversions](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1374x596/c98644b86401954c8de754d04838dd7a/am_20.8.2016_um_17_46_16_hochladen.png)
Methods like ColorToFloat and BitToFloat become available.
It's [this](https://github.com/mattdesl/number-util) library.

Module "typedarray-pool"
------------------
![4b too](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1391x716/535ca3830d7dbc79c6625ff040e1ba88/am_21.8.2016_um_09_27_32_hochladen.png)
This module makes a pool of typed arrays so you can malloc memory, huh. It's [this](https://github.com/mikolalysenko/typedarray-pool) library.

Module "stackgl gl-buffer"
----------------------
![gl](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1385x707/bb8e4fef62cfeb7e43a2131432a8e1fc/am_21.8.2016_um_00_04_28_hochladen.png)
This code seems to code from [here](https://github.com/stackgl/glsl-specular-cook-torrance/blob/master/index.html).
What is Cook Torrance? I have no idea.
EDIT: Actually despite the code being very similar even to having the same error messages, it's actually very different, and uses very different dependencies, looking on the parent dependency tree for typedarrays pools, I found that the real source was [this](https://github.com/stackgl/gl-buffer/blob/c8c86a6ef32f55081e087152d83ab375d3e8bcbf/buffer.js)
It's called "gl-buffer".
Further more lemme cite this piece of code.

```
var pool = require("typedarray-pool")
var ops = require("ndarray-ops")
var ndarray = require("ndarray")
```
The minified code seems to match, so we can conclude with certainty, that this dependency tree can be very easily associated.
![25 nodes](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1920x899/4ab48ca8cb0965068a27d24b09a225e1/am_21.8.2016_um_10_04_48_hochladen.png)
So, the 4a modules seem to have about 25 nodes, so this will make our job very much easier!
Since we figured this one out, I'll not put the dependency explanations here, since they're easily available anywhere else, like [here](https://www.npmjs.com/package/gl-buffer), I might make a list tho, for clarifying.

* Module "65" [Bit-Twiddle](https://github.com/mikolalysenko/bit-twiddle)
* Module "67" [Dup](https://github.com/scijs/dup)
* Module "64" [ndarray-ops](https://github.com/scijs/ndarray-ops)
* Module "62" [cwise-compiler](https://github.com/scijs/cwise-compiler)
* Module "5d' [uniq](https://github.com/mikolalysenko/uniq)
* Module "5c" [ndarray](https://github.com/mikolalysenko/ndarray)
* Module "5a" [is-buffer](https://github.com/feross/is-buffer)
* Module "58" [iota-array](https://github.com/mikolalysenko/iota-array)

Module "75"
-------
![process](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/929x422/af2ca3681fe6372aa828a10a6c832ebb/am_21.8.2016_um_13_06_44_hochladen.png)
Since this code seems to have been made with browserify this is the fake. process module from node. It is triggered by cwise-compiler
Code for it can be found [here](https://github.com/defunctzombie/node-process)

Module "73"
-----------------
![glsomething](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1387x699/5cab517a959b00ce4c349a938142a1b2/am_21.8.2016_um_17_17_07_hochladen.png)
This is another library tightly shared by glbuffer.
This is the gl-texture2d library, it's [here](https://github.com/stackgl/gl-texture2d) 

Module "4f" ,"52" & "51"
--------------------
![see them methods?](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1393x669/aa60e284ff264cf0a2b6bfde4c4e0ef7/am_21.8.2016_um_18_29_06_hochladen.png)
I don't know why, but this particular module was hard to look for it's called gl-vao, comes from the gl stack. can be found [here](https://github.com/stackgl/gl-vao)

Module "56"
-----------------
![spritebutton](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1388x743/e4fa8e029060d8e5c816b664bd8ec7f7/am_21.8.2016_um_18_44_03_hochladen.png)
I'm not really sure what this module does, but it's called SpriteButton, we can only guess.

Module "57"
---------------
![FuckingFont](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1389x736/5398b77b127937fb5bd8540292ec71a0/am_21.8.2016_um_18_45_43_hochladen.png)
This is the spriteFont module.

Module "74"
--------------------
![textures](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1388x295/7a0ab8a07b4649cf58946fdf8e05dde6/am_21.8.2016_um_18_50_57_hochladen.png)
These are the textures for the sprites.

Module "a6"
-------------------
![wow so this was actually writen by Agmentzar](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/1391x522/eb7668b94b3846679bf7359c1bb3e12e/am_21.8.2016_um_21_35_00_hochladen.png)
This is a module that creates the shader, and gets the webgl context.
This was very head-acheful for me.

Module "9a"
--------------
![tree](https://trello-attachments.s3.amazonaws.com/57b87b94098efb7c804c44ae/687x916/a2c931404d15529a02dabdef56b54b36/am_21.8.2016_um_21_40_08_hochladen.png)
Okay, this is the gl-shader module and as you can see, it loads many other nodes too.  Since the gl-shader code is [here](https://github.com/stackgl/gl-shader), I won't explain the dependencies in detail.
These are some 35 nodes, so we're way more than half now.
I'll list the main dependency modules.

* Module "92" [gl-format-compiler-error](https://github.com/wwwtyro/gl-format-compiler-error)
* Module "" [sprintf-js](https://github.com/alexei/sprintf.js)
* Module "" [glsl-shader-name](https://github.com/stackgl/glsl-shader-name)
* Module "" [gl-constants]()
* Module "" [add-line-numbers]()
* Module "" [glsl-tokenizer](https://github.com/gl-modules/glsl-tokenizer)
* Module "" [atob-lite](https://github.com/hughsk/atob-lite)
* Module "" [through2](https://github.com/rvagg/through2)
* Module "" [xtend](https://github.com/Raynos/xtend)
* Module "" [readable-stream](https://github.com/nodejs/readable-stream)

CODE UPDATED
============
Pony.town was updated while writing this tutorial.