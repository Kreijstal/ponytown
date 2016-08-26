A bit of history
------------------
As far as I know, no one has understood the whole code of pony.town other than Agmentizar, and probably they don't even know how it fully works, due to the use other frameworks.

So far we've "reverse engineered" the game, by listening to the server requests, and sends, and setting some breakpoints here and there.

Altdev managed to make a copy of pony-town server as "proof" that it can be done, but so far he doesn't have time or desire to mantain the server, I wouldn't know his motives for it.

I managed, to copy blackjacktown server code, I saw some "hacks" posted on /mlp/ threads, where you could do crazy stuff, like teleportation, walking when standing, or just very big boxes, also, null grass.

Bootsy was the first one that wanted to re-make the game, but everyone agreed that the code was a complete mess.

Well, this is my first attempt to understand the complexity of pony.town code, bear with me, into the unknown...

Code Overall
===========
:warning: *I think you should know a bit of JavaScript before entering the depths of this 'Tutorial'*

At time of writting, ponytown's overall code looked like [this](http://pasted.co/d34d0007).

the whole code is wrapped in a function preceeded by ! to make the function an expression and so, not require paranthesis, most expressions are written with commas, not with ';' semi-colon terminators, and of course no whitespace at all. It's of course very ugly.

Fortunately modern browsers do have a prettify function which beautifies code, there is also a website called beautify.js which will beautify minified javascript code.

The first part of the website however calls Rollbar.js an error-reporting tool, so when clients get JavaScript errors, they are notified, directly to Agementizar, this is of no good use to us, so we should remove such code.

Table of Contents:

- [DevTools](https://trello.com/c/DdBXcize) 
- [Understanding The Wrapper function](https://trello.com/c/hVphmgxL)
   * [Module loading](https://trello.com/c/7yQECegR)
- [Modules](https://trello.com/c/zFDgVbMB)
- [Modules P2](https://trello.com/c/UZEWhHba)

A little note, the tutorial was original written with the modules as numbers, as I haven't named every module yet, they were all numbers, so we couldn't figure out what was what.