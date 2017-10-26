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

  var PonyCharacter=(function(){function PonyCharacter(ponyobject){
Object.assign(this,ponyobject);
}
function compressColor(t) {
      return t ? U.default.parse(t).toHexRGB() : ""
    }

    function deleteNulls(t) {
      return Object.keys(t).forEach(function (e) {
        null == t[e] && delete t[e]
      }),
          t
    }

    function booloeanToInt(boolean) {
      return boolean ? 1 : 0
    }

    function numberButZero(number) {
      return !!+number
    }

    function compressBooleans(t, e) {
      return t.slice(0, e).map(booloeanToInt).join(" ")
    }

    function decompressBooleans(t) {
      return t && t.split ? t.split(" ").map(numberButZero) : null
    }

    function compressColours(t, e) {
      return t.slice(0, e).map(compressColor).join(" ")
    }

    function decompressColor(t) {
      return t && t.split ? t.split(" ") : null
    }
	    function decompressPonyObject(t) {
      return t ? {
        type: t[0],
        pattern: t[1],
        fills: decompressColor(t[2]),
        outlines: decompressColor(t[3]),
        lockFills: decompressBooleans(t[4]),
        lockOutlines: decompressBooleans(t[5])
      } : null
    }
	    function compressPonyObject(objToCompress, e, n, r) {
      if (void 0 === n && (n = !0),
          void 0 === r && (r = 0),
          !objToCompress || n && 0 === objToCompress.type)
        return null;
      var o = 6;
      return [objToCompress.type, objToCompress.pattern, compressColours(objToCompress.fills, o), compressColours(objToCompress.outlines, o), compressBooleans(objToCompress.lockFills, o), compressBooleans(objToCompress.lockOutlines, o)]
    }
PonyCharacter.create=function(){}
PonyCharacter.decompress=function(t) {
      var e = {
        id: t.id,
        name: t.name,
        site: t.site,
        lastUsed: t.lastUsed,
        horn: decompressPonyObject(t.h),
        wings: decompressPonyObject(t.w),
        frontHooves: decompressPonyObject(t.fh),
        backHooves: decompressPonyObject(t.bh),
        mane: decompressPonyObject(t.deleteNulls),
        backMane: decompressPonyObject(t.bm),
        tail: decompressPonyObject(t.t),
        facialHair: decompressPonyObject(t.fac),
        headAccessory: decompressPonyObject(t.ha),
        earAccessory: decompressPonyObject(t.ea),
        faceAccessory: decompressPonyObject(t.fa),
        neckAccessory: decompressPonyObject(t.na),
        frontLegAccessory: decompressPonyObject(t.fla),
        backLegAccessory: decompressPonyObject(t.bla),
        lockBackLegAccessory: numberButZero(t.lbl),
        coatFill: t.cf,
        coatOutline: t.co,
        lockCoatOutline: numberButZero(t.lco),
        eyelashes: t.el,
        eyeColorLeft: t.ecl,
        eyeColorRight: t.ecr,
        eyeWhites: t.ew,
        eyeOpennessLeft: t.eol,
        eyeOpennessRight: t.eor,
        eyeshadow: numberButZero(t.es),
        eyeshadowColor: t.esc,
        lockEyes: numberButZero(t.le),
        lockEyeColor: numberButZero(t.lec),
        fangs: t.fan,
        muzzle: t.mu,
        freckles: t.fr,
        frecklesColor: t.frc,
        cm: t.cm,
        cmFlip: numberButZero(t.cmf),
        customOutlines: numberButZero(t.col)
      };
      return new PonyCharacter(e)
    }
PonyCharacter.prototype.compress=function() {
	var ponyobj=this, e = {
        name: ponyobj.name,
        site: ponyobj.site,
        h: compressPonyObject(ponyobj.horn, null),
        w: compressPonyObject(ponyobj.wings, null),
        fh: compressPonyObject(ponyobj.frontHooves, null),
        bh: compressPonyObject(ponyobj.backHooves, null),
        m: compressPonyObject(ponyobj.mane, null, !1, 1),
        bm: compressPonyObject(ponyobj.backMane, null, !1),
        t: compressPonyObject(ponyobj.tail, null, !1),
        fac: compressPonyObject(ponyobj.facialHair, null),
        ha: compressPonyObject(ponyobj.headAccessory, null),
        ea: compressPonyObject(ponyobj.earAccessory, null),
        fa: compressPonyObject(ponyobj.faceAccessory, null),
        na: compressPonyObject(ponyobj.neckAccessory, null),
        fla: compressPonyObject(ponyobj.frontLegAccessory, null),
        bla: ponyobj.lockBackLegAccessory ? null : compressPonyObject(ponyobj.backLegAccessory, null),
        lbl: booloeanToInt(ponyobj.lockBackLegAccessory),
        cf: compressColor(ponyobj.coatFill),
        co: compressColor(ponyobj.coatOutline),
        lco: booloeanToInt(ponyobj.lockCoatOutline),
        el: ponyobj.eyelashes,
        ecl: compressColor(ponyobj.eyeColorLeft),
        ecr: compressColor(ponyobj.eyeColorRight),
        ew: compressColor(ponyobj.eyeWhites),
        eol: ponyobj.eyeOpennessLeft,
        eor: ponyobj.eyeOpennessRight,
        es: booloeanToInt(ponyobj.eyeshadow),
        esc: compressColor(ponyobj.eyeshadowColor),
        le: booloeanToInt(ponyobj.lockEyes),
        lec: booloeanToInt(ponyobj.lockEyeColor),
        fan: ponyobj.fangs,
        mu: ponyobj.muzzle,
        fr: ponyobj.freckles,
        frc: ponyobj.freckles ? compressColor(ponyobj.frecklesColor) : null,
        cm: ponyobj.cm && ponyobj.cm.some(function (t) {
          return !!t
        }) ? ponyobj.cm.map(compressColor) : null,
        cmf: booloeanToInt(ponyobj.cmFlip),
        col: booloeanToInt(ponyobj.customOutlines)
      };
      return deleteNulls(e)
    }
return PonyCharacter;
})()
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
PonyTownApp.prototype.binaryOrder=["Int8", "Uint8", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "Boolean", "String", "Object"];
    return PonyTownApp;
})();
module.exports =PonyTownApp;