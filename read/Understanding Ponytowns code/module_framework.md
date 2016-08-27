Main code
========
In many cases, code will be of this type.

    if(condition&&condition&&(assigment),condition){
     code;
    }
It's not the code one is used to see daily, of course when there's actual code, it's even less clear what it is trying to do, and of course, misleading.

Line 1
-------
![first line](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1354x518/fe7cab75576824ae19d53864916e1829/4TlBeA.jpg)

As you can see we already begin, with a function that is being called from the main window.

After prettifying it, we can step in, we can view how the variables are called if we switch context on devtools

![See!](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1363x531/d818c3c6f8b3056324cb80fe9023587a/3v8hWF.jpg)

Basically what this function does, is set some variables, functions and returns a callback. we step out and we find ourselves calling the returned function!

![some parameters](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1366x483/c004e820c76d74d82ef6421a61a14e82/am_13.8.2016_um_20_35_48_hochladen.png)

After we call this function we get another function..

Callback Hell
============
This callback returns a callback that takes a function as argument.
We then call this callback with a function as parameter.
The callback call the callback we passed with a callback as parameter.
But our callback is defined as calling the callback we are passed.

For the sake of clarification I'll try naming the callbacks
The function returns a function called greendow, we call greendow with mingle, a function that takes a parameter, and calls it.
Greendow then proceeds to call mingle with the main callback
Did you understand it now?
![wew](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/859x328/94f4f35a1017f564faabf7010aa1af18/am_13.8.2016_um_20_53_51_hochladen.png)(here (function(t){t()} is 'mingle')

If you are confused by this, then imagine how confused I was while trying to figure the fuck the code is doing.
 (I suppose there is a reason for making it so complicated like customizeability somewhere?)

![Why so fucking many callbacks of callbacsk on nested callbacks that call callbacks from callbacks?](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1327x394/80a7747c0e543ebd83553ec19f581c4a/am_13.8.2016_um_20_46_26_hochladen.png)(here 'o' callback is 'mingle' the caller is greendow)

Anywayys... we see the inside of this callback and it makes the SystemJS methods, calls the i callback with the systemjs methods and calls d on ["1"][0] (basically, the main module)

[Defining Modules](https://trello.com/c/7yQECegR)
==============
aka callback i
![longest code](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1018x348/b57a803a7f3e6b42d20d599ed4a81100/am_13.8.2016_um_20_59_32_hochladen.png)

Ok I bet you're wondering what does the i callback does.
I'll just save myself time and tell you it does a bunch of useless setups, but that it defines every module in game, and a wrapper for making modules (amdDefinemodule) that gets called only twice.
![911kb](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1365x526/0002087391a15aa68b8a0c4cf86b14d0/am_13.8.2016_um_21_05_46_hochladen.png)

Also if you view how many bytes the function has it has 911kb, that's almost 1MB of code, lol, so yeah, it's a fucking big function.

Since i callback its so large we can call this "defineModules" function
more detail about it is seen [here](https://trello.com/c/7yQECegR)

function d(t) previously function o() :renameTo->executeFirstModule
-----------------

![o function](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1124x289/d8127dd66ae27752b07014ee92e00244/IkGi6j.jpg)

what this does is basically take the name of the first node, the first module, call a function that will loop around the modules and it's dependencies recursively and organize them if they're executable or declared, this is part of SystemJS code.

After organizing the modules, they will be looped again, and each one will be called by function l, (since there are not any declared functions, otherwise they'd be called by anohter function, namely s)

function l(s) >previously u :renameTo->executeModule
======================

    /****
     *  Creates module's .module property
     *  Executes module's .exec method.
     *  Before it sets .evaluated property to true
     *  @param module
     *  @return undefined
     */
if module's .module property is already defined, executeModule, will do nothing.
![it was u(s) now it is l(), damn](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/776x260/82246040665b7e00adec46315b5305be/5RCkMl.jpg)

As we can see Agmentizar updates the code all the time so sometimes the function names change that's why we should figure out what the functions want to do and rename them according to that.

![l calling execute](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1021x345/b3d378cae786f9082e30eeeed11a2f79/EtToz5.jpg)

executeModule will call the execute method of the module given as argument, with self as this, and a callback as first argument, n (the exports object) as second, and r (module's .module object) as third.
*this will call the "1" module, see below*

Whatever our module returns is stored in our module's module.export.

Then checks if the thing that module.export is an esModule by veryfying the .__esModule property is truthy, otherwise it sets .esModule property as to what is returned by createEsModule(module.export)



"1" Module!
----------------
![Oh wow really!](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1353x241/553cbbb2adab015721b9274c64dadbf5/RHYc1Z.jpg)

And, so, we've reached the main module of the program!

Now we need to see what does the callback t does

![Iwonder](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/798x94/6095cb92691931fb014a5ff196ea306d/DAaRPx.jpg)


As you can see it checks if the module you're calling is in the dependencies otherwise it throws error, you could modify the code, such that you can call any module from anywhere whithout specifying it as a dependency.
It calls function u on the new module, what does u do?

function u():renameTo->getEvaluatedModule
--------------
![damn son](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/980x158/3405a142f0c49c09703798c22349e34c/Wo4hy7.jpg)


    /****
     *  Calls executeModule of module if it hasn't been evaluated
     *  @param moduleName (string) the name of the module
     *  @return moduleResult , either an esModule of the result or the result itself
     */
Well, long story short u verifies the module exists, verifies if it has been executed before, and if it doesn't it calls l on it, then returns the module's .module.export

*this is just a very very hasty way of explaining what the code does, I'm omitting a lots of checks and variables, in order to truly see what the code does, one should read the code itself*

function c() :renameTo->createEsModule
--------------
![really, more?](https://trello-attachments.s3.amazonaws.com/57afc72dc86b578183070ca2/1366x325/f95057bc7d962d84f66cbdd6e793930a/am_13.8.2016_um_23_32_02_hochladen.png)

c makes a wrapper by copying with for in, every value of our object we returned, and setting our original object as .default, then returning this object. I think that's very dumb (specially when one loops the Window Object.), but who knows it's purpose. (esModules seem to be used for when modules are declarative)


    /****
     *  Copies the whole object and returns it.
     *  @param moduleResult the object returned by the module's execute.
     *  @return esModule which is a copy of the object.
     */
