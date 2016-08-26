A big callback
===========

i callback, seems to be composed of an array of functions that are arranged like this
!function(){}(),function(){}(),function(){}(),function(){}(),function(){}()
Each function may do it's own thing, the first functions seem to do some set-up, they're all anonymous functions.

Trying to figure out what it does
----------------------------------------
This anonymous function seems to set @@global-helpers object to the GlobalModules variable that is looked up by the SystemJS moduels .get method. This @@global-helpers object contains a prepareGlobal method, that is called by the "4" and many other modules.

After some googling I've found it's definition it's [here](https://github.com/systemjs/systemjs/blob/master/lib/global-helpers.js) I consider it an excellent source in order to read many functions that here appear to be minified. 
![so much setup](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/1346x517/99c1584997afb779d3c21287afd39415/am_13.8.2016_um_21_09_44_hochladen.png)

when you call prepareGlobal method, it will save all the properties of the global context into a variable, then returns a callback.
When you call this callback back, it will return any property that has changed after 

this another one sets amdDefine and amdRequire to SystemJS methods they're basiically a wrapper though.
![amdDefine](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/1364x510/34488510120d20b6cd5177253b7b7257/am_13.8.2016_um_21_11_54_hochladen.png)

t.amdDefine
-----------------
![amdDefine](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/1021x461/edef53fa92512791a02d3e73d7fd394a/am_15.8.2016_um_10_51_45_hochladen.png)
As you can see in amdDefines calls t.registerDynamic (in screenshot, o.registerDynamic), however it's execute behaves a bit differently.
it will call the arguments of the callback of the amdDefine, will be what the dependencies return. In the order we requested our dependencies.
Also, it allows us to requests things outside just modules, like the "exports" object it is passed to all registerDynamics, the "module" object, or even a "require" function, which allows us to call an amdRequire wrapper.
Module 2
------------
This one does a bunch of idiot checks to call amdDefine on module 2, which is a wrapper of the usual way of creating modules
![idiot checks!](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/967x313/f292e005264eee6106a468c26e22f147/am_13.8.2016_um_21_16_07_hochladen.png)

Module 3
-------------
Well, this one does less retarded checks but calls amdDefine for module 3.
![module 3](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/525x96/07e589ba8b09f9ed23d58b012b4053ac/am_13.8.2016_um_21_20_57_hochladen.png)

Module 4,5,6,7, ...20,... 50 ...a0... etc.
---------------------------------------------------
![t,registerDynamic](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/1365x252/d5d3980a1d5f56cd313c04ea1090bf03/am_13.8.2016_um_21_22_55_hochladen.png)

And here we see the popular t.registerDynamic this is how we define modules, first parameter is the module name, second parameter is an array of the dependencies modules names, third parameter is the execute callback

"@@global-helpers"
--------------------------
some modules are started by calling prepareGlobal and retrieve global
retrieveGlobal will return the changes made by the 'main module'
as seen by [this](https://github.com/systemjs/babel-plugin-transform-global-system-wrapper)

So it's shouldn't be a surprise when you see it.

t.registerDynamic
==============
.So what exactly does it do?
Nothing much, it just defines a module object, and adds it to m={}
which is the map where all modules are stored.
![registerding modules](https://trello-attachments.s3.amazonaws.com/57afd2d222982f8d275097f3/1364x519/7e9a830a118bcd921cbbbdf9d84698d7/am_13.8.2016_um_21_29_54_hochladen.png)