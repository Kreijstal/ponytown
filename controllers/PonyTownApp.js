/**
 * Created by RGB on 16/08/2016.
 */

//Is my code readable now, faggot?
//wrapper function to wrap namespace
var PonyTownApp=(function()
{
    /**
     *
     * @param {number} index
     * @param {number} width
     * @returns {number[]}
     */
    function indexToCoordinates(index, width) {
        return [index % width, Math.floor(index / width)]
    };

    function coordinatesToIndex(x, y, width) {
        return x + y * width;
    };
    /**
     * this "image" means a 2D array of course
     * @param img
     * @param width
     * @param height
     * @returns {Function}
     */
    function imageToFill(img, width, height) {
        return (function(x, y) {
            return img[coordinatesToIndex(x % width, y % height, width)];
        })
    };
    function stretchTileFunction(callback, sx, sy) {
        return function(x, y) {
            return callback(Math.floor(x / sx), Math.floor(y / sy))
        }
    }
    /**
     * This is one of the best ideas I've had
     * * this swaps array values, and you can specify what matches what. and you don't even have to swap them anymore but execute random instructions
     * valueFrom is an array, it is either the element for comparison or a findFunction
     * usage:
     * mapValueWithInstructions(1,[1,2],[2,1]);-> 2
     * mapValueWithInstructions(2,[1,2],[2,1]);-> 1
     * mapValueWithInstructions("findThisElement",['in this list','findThisElement'],['and replace it or execute a function ','with the index it found']);
     * (doens't) swaps {object:"rock"} with {object:"cloud"}
     * it doesn't swap it, but it renames .object for the desired element;
     * mapValueWithInstructions({object:"rock"},[function(a){return a.object=="rock"},function(a){return a.object=="cloud"}],[function(a){a.object='cloud';return a},function(a){a.object='rock';return a}])
     * as you guessed it it's to flip values, like the map in the function generator
     * @param value
     * @param valueFrom
     * @param valueTo
     * @returns {*}
     */
    function mapValueWithInstructions(value, valueFrom, valueTo) {
        var x = valueTo[valueFrom.findIndex(function(arg) {
            return (typeof arg === "function") ? arg(value) : arg === value;
        })];
        if (x) {
            if (typeof x == "function") return x(value);
            return x;
        } else return value;
    }
    function mapValuesWithInstructions(values, valueFrom, valueTo) {
        return values.map(function(value) {
            return mapValueWithInstructions(value, valueFrom, valueTo)
        });
    }
    /**
     *
     * @param {number} sizeX
     * @param {number} sizeY
     * @param {string} mapName
     * @class
     */
    function Map(sizeX,sizeY,mapName){
        /**
         * @type {string}
         */
        this.name=mapName;
        /**
         * @type {number}
         */
        this.width=sizeX;
        /**
         * @type {number}
         */
        this.height=sizeY;
        /**
         *
         * @type {Array.Region}
         */
        this.regions=[]

    }

    /**
     *
     * @param {Map~fillCallback} callback
     */
    Map.prototype.fill= function (callback){

    };

    Map.prototype.getTiles= function () {

    };

    Map.prototype.getTile= function (x,y) {

    };
    Map.prototype.changeTile= function () {

    };
    /**
     *
     * @param {Map~fillCallback} callback
     */
    Map.prototype.changeTiles= function (callback) {

    };

    Map.prototype.getEntities= function () {

    };

    Map.prototype.spawn= function (entity) {

    };

    Map.prototype.selectRegions= function () {

    };

    Map.prototype.coordinatesToIndex=coordinatesToIndex;
    Map.prototype.indexToCoordinates=indexToCoordinates

    Map.prototype.imageToFill=imageToFill
    Map.prototype.stretchfill=stretchTileFunction

    /**
     * A function that returns how the map should be filled given x and y coordinates
     * @callback Map~fillCallback
     * @param {number} x
     * @param {number} y
     */
    /**
     *
     * @param {number} length
     * @return {array}
     */
    function createArray(length){
        return Array.apply(null, Array(length));
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     * @constructor
     */
    function Region(x,y){
        /**
         * @type {Array.Entity}
         */
        this.entities=[];
        this.x=x;
        this.y=y;
        /**
         *
         * @type {Array}
         */
        this.tiles=createArray(this.REGION_HEIGHT*this.REGION_WIDTH);
    }
    Region.prototype.REGION_HEIGHT=20;
    Region.prototype.REGION_WIDTH=20;

    function PonyCharacter(){

    }
    PonyCharacter.prototype.minify=function(){

    }
    /**
     *
     * @param {string} type
     * @param {object} description
     * @class
     */
    function Entity(type,description){

    }

    Entity.prototype.update= function () {

    };

    Entity.prototype.say= function (sayText) {

    };

    Entity.prototype.despawn= function () {

    };

    /**
     *
     * @constructor
     */
    function Player(playerCallbacks){

    }

    /**
     * @global
     * @class
     */
    function PonyTownApp(name,desc) {
        /**
         *
         * @public
         * @type {Array.Map}
         */
        this.map = [];
        /**
         * @public
         * @type {Array.Player}
         */
        this.players = [];
        this.name=name;
        this.desc=desc;
    }

    /**
     * Creates a map of defined width,height and returns it
     * @param {number} width
     * @param {number} height
     * @param {string} mapName
     * @returns {Map}
     */
    PonyTownApp.prototype.createMap=function(width,height,mapName){
        return new Map(width,height,mapName);
    };
    /**
     * Adds a map to the game.
     * @param {Map} map
     */
    PonyTownApp.prototype.addMap=function(map){
        if(this.map.indexOf(map)==-1){
            this.map.push(map);
        }
    };
    PonyTownApp.prototype.version="1.0.0";
    PonyTownApp.prototype.offline=false;
    PonyTownApp.prototype.defaultMap="default";
    /**
     *
     * @type {{Map: Map, Player: Player, Entity: Entity, PonyCharacter: PonyCharacter}}
     */
    PonyTownApp.prototype.types={Map:Map,Player:Player,Entity:Entity,PonyCharacter:PonyCharacter};

    // Miscelaneous utilities that are used in Ponytown code, but can be general enough to be outside outside of it.
    PonyTownApp.prototype.utils={
        /**
         * Retuns a random integer between min and max
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        getRandomInt:function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        mapValueWithInstructions:mapValueWithInstructions,
        mapValuesWithInstructions:mapValuesWithInstructions,
        imageToFill:imageToFill,
        stretchTileFunction:stretchTileFunction,
        indexToCoordinates:indexToCoordinates,
        coordinatesToIndex:coordinatesToIndex,
        createArray:createArray
    };

    return PonyTownApp;
})();
module.exports =PonyTownApp;