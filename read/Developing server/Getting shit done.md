Figuring out what the network does
========================================

There comes a point where you realize that you might as well read the whole code and realize you haven't done
anything besides learning tons of important details about the internals.

However we want to create a server NOW, not after we rediscover the whole game logic, this section was done due to
the sheer frustation I had while trying to make the server, also because niggest doesn't care about understanding the
code but just getting shit done.

Reverse Engineering?
---------------
*This is how the protocol works at time of writing version `0.13.2-alpha`, protocol can and will probably change, so you should do your own investigation and research*
After having skimmed the whole code and having a general idea of what the game
does, you'll have more insight on what the requests should do, for this however we should look up how the requests
are handled.

A general idea of TCP, HTTP, websockets and general networking, e.g OSI model, would be good to understand the things we talk about on here.

### Signing Out
We make a GET request to /auth/sign-out, apparently we don't request anything else other than our cookie.

### Signing in First we make a GET request to  /auth/{service} in which service is either google, github, twitter,
facebook, vkontakte (russian fb), etc.. We get a redirect url to log in, then afer we log in, in the service of our
choosing, we get to /auth/{service}/callback?code={CallBackCode} This CallBackCode is defined by oauth shenanigans

In the response request we get a set cookie header that sets `connect.sid`, it's HttpOnly.

### Requesting ponies
After logging in our first request is /api/pony this will return an array of the ponies, we have stored in a compressed form.
An example JSON for illustration purposes is.

```
[{"name":"Example Pony","m":[2,0,"ffd700","b39700","0","1"],"bm":[1,0,"ffd700","b39700","1","1"],"t":[1,0,"ffd700","b39700","1","1"],"cf":"ff0000","co":"8b0000","lco":1,"el":0,"ecl":"daa520","ecr":"daa520","ew":"ffffff","eol":1,"eor":1,"es":0,"esc":"000000","le":1,"lec":1,"fan":0,"mu":0,"fr":0,"cmf":0,"col":0,"id":"{id}","lastUsed":"{last used}"}]
```
### Requesting status
We make a get request to api/status and we get the number of servers there are.

```
{"version":"0.13.2-alpha","servers":[{"id":"main","name":"18+ server [R]","desc":"No restrictions on language or player interactions","offline":false,"online":249},{"id":"safe","name":"Safe server [PG]","desc":"No swearing or adult topics are allowed","offline":false,"online":219}]}
```