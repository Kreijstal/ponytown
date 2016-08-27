(function(store) {
  //I'm not really sure how to explain this logic, the thing is, this shit converts.
  /**
   * @param {...Uint8Array}
   * @returns {Uint8Array}
   */
  function mergeTypedArrays() {
    var tparraylength = 0;
    var tparraylengths = Array.prototype.map.call(arguments, function(tparr) {
      var ret = tparraylength;
      tparraylength += tparr.length;
      return {
        length: ret,
        value: tparr
      };
    })
    var c = new Uint8Array(tparraylength);
    tparraylengths.forEach(function(arr) {
      c.set(arr.value, arr.length)
    })


    return c;
  }
  var double = new Float64Array(1),
    buffer = double.buffer,
    float = new Float32Array(buffer),
    qbyte = new Uint32Array(buffer),
    dbyte = new Uint16Array(buffer),
    byte = new Uint8Array(buffer);
  var bytes = {
    Uint8: {
      size: 1,
      type: byte
    },
    Uint16: {
      size: 2,
      type: dbyte
    },
    Uint32: {
      size: 4,
      type: qbyte
    },
    Float32: {
      size: 4,
      type: float
    },
    Float64: {
      size: 8,
      type: double
    }
  }

  function fromValueToBinary(value, convertFrom) {
    var data;
    if (data = bytes[convertFrom]) {
      data.type[0] = value;
      return byte.slice(0, data.size)
    } else {
      throw new Error("Invalid convert string")
    }
  }

  function fromArrayToBinary(arrayToConvert, conversionArray) {
    var concarr = arrayToConvert.map(function(vals, conv) {
      return new Uint8Array(fromValueToBinary(vals, conversionArray[conv]))
    });
    return mergeTypedArrays.apply(null, concarr)

  }

  function fromBinaryToValue(value, convertTo) {
    var data;
    if (data = bytes[convertTo]) {
      byte.set(value);
      return bytes[convertTo].type[0]
    } else {
      throw new Error("Invalid convert string")
    }
  }

  function fromBinaryToArray(arrayToConvert, conversionArray) {
    var values = [],
      index = 0,
      convIterate = 0;
    conversionArray.forEach(function(conv) {
      var length = bytes[conv].size
      values.push(fromBinaryToValue(arrayToConvert.slice(index, index + length), conv));
      index += length;
    })

    return values;
  }
  store.fromArrayToBinary = fromArrayToBinary;
  store.fromBinaryToArray = fromBinaryToArray;
})(typeof exports == "undefined" ? self : exports)