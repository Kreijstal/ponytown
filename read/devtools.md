DevTools
=========
I must say that chrome devtools offer some of the best debugging tools I've seen.

Anyway, first we go to main pony.town webpage, we press f12 and look for the bootstrap code

![devtools console](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1366x528/d6a2b55f05778c3adf2da553d12cf2e2/woF8Cn.jpg)

We then set breakpoints, and step into the code. I'd recomment any tutorial for using chrome dev tools, they're really good.

After we prettify, we find ourselves with pretty much the same code but with whitespaces, so for other minification that uglifiers do, they won't unminify that, that means, that code overwall will still be ugly in some parts, oh, and the variable names have been minified, so now we can only refactor them.

When we set breakpoints, we have to reload because chances are the code has already been executed, breakpoints only break when the code is running.

![Reloading pony.town](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/1007x679/fa805d883e99a00efcb1babb323868f5/2eGXE8.jpg)

When you break on a random function you are lost, you don't know who called the function, why was it called? and what is going to happen after it's called, but we can try to figure out, we can see who called the function with the call-stack, 

Call-stack
------------
![callstack](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/353x399/dc5b0faf7c7027ca8f3698e92c687db2/mlpJU0.jpg)

We can click through the call stack to see the previous functions, it's arguments, and what's going to happen after the function ends, etc, we can also browse the closure of our function when it was defined, and we can also see the closures of the caller functions.

However we have to browse the functions by clicking on them so we can switch contexts scopes, it's a very useful feature.

If we're lazy about checking variables, or want to interact with them directly we can use the console, the console can inject javascript into the current scope, and change variables, call functions, change them, etc, it's one of the most important utilities chrome dev tool has

![console](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/839x521/baf905c16bfcbc09bb0eba0dbd115cc3/VFOxC8.jpg)

We can also hover over variables to see their values.

![hover](https://trello-attachments.s3.amazonaws.com/57afa86f6d8393328372a2f7/207x194/b6f507c74e3bc074e0543580b78226e6/emw5fS.jpg)

Watches
----------
![arguments](https://trello-attachments.s3.amazonaws.com/57afc650a88d75c2a238cd17/336x53/6a37e5c99028f721889d425850cb9185/cqeWTU.jpg)
You can set-up watches, these are expressions that will get executed every step of the debugger, they can be useful, in this case, if you're watching the arguments