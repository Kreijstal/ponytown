Implementation specifics
====================
So, we've finally managed to get to the good stuff, the specifics, how everything works on the network.

Okay, so there's an issue into how it's going to work out.
At the moment I'm not explaining the terminology very well, I might add a glossary later, or maybe someone cna do it for me.
For network, we shoud use these node modules: 

* express This not just handles HTTP requests but provides a framework for it, very useful.
* express-ws this makes it very easily to set ws as middleware for express.
* express-sessions this will make tracking sessions very easy