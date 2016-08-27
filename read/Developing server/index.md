Logic First, Network Later
=======================
Ok, well, as you know when I first did the server code I just was handed the websocket server object, and just had to "complete" the server code. So I just listened to what the server expected and sent the same thing that the server send the client.

However there was no separation between the network and the game, so that's why when aggie changed PonyTown so dramatically, it was insane, we had to modify almost all the server in order to match the new protocol.

So to avoid that we need to make a Game object, a game object that is NOT concerned with anything on the network, that doesn't know the network and doesn't care! This means that if we want to port the game to a different protocol, we should do it as we please, just changing the network code, but not the game code.