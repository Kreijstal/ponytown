

Software Design
---------------------
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

PonyTown app
-------------------
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


