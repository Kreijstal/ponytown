var libraries;
var modules = function (System) {
  var e = this.require
      , n = this.exports
      , r = this.module;
  libraries = getLibraries(System);
  libraries.npmModules();
  (function () {
    var e = System.amdDefine;
    !function (t, i) {
      "function" == typeof e && e.amd ? e("2", [], i) : "object" == typeof n ? r.exports = i() : t.returnExports = i()
    }(this, libraries.es6)
  })();
  (function () {
    var e = System.amdDefine;
    e("3", ["2"], function (t) {
      return t
    })
  }());
  System.registerDynamic("4", [], !1, function (e, n, r) {
    var i = System.get("@@global-helpers").prepareGlobal(r.id, null, null);
    return function () {
      window.performance = window.performance || Date;
      try {
        "getGamepads" in navigator || (navigator.getGamepads = function () {
              return []
            }
        )
      } catch (t) {
      }
    }(),
        i()
  });
  System.registerDynamic("b", [getCodeName("BlueBird")], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      var e, n, r = !1, o = i.resolve(t.load()).then(function () {
            function i(r, i) {
              e = requestAnimationFrame(a),
                  n = setTimeout(o, 100),
                  l++,
              r - u > 1e3 && (c = 1e3 * l / (r - u),
                  l = 0,
                  u = r),
                  t.fps = c,
                  t.update((r - s) / 1e3),
              i && t.draw(),
                  s = r
            }

            function o() {
              cancelAnimationFrame(e),
                  i(performance.now(), !1)
            }

            function a(t) {
              clearTimeout(n),
                  i(t, !0)
            }

            if (r)
              throw new Error("cancelled");
            t.init();
            var s = performance.now()
                , u = s
                , l = 0
                , c = 0;
            e = requestAnimationFrame(a)
          }), a = function () {
            cancelAnimationFrame(e),
                clearTimeout(n),
                r = !0
          }
          ;
      return {
        promise: o,
        cancel: a
      }
    }

    var i = t(getCodeName("BlueBird"));
    return e.start = r,
        n.exports
  });
  System.registerDynamic("f", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t.map(function (t) {
        return "string" == typeof t ? t : t[0]
      })
    }

    function i(t) {
      return t.map(function (t) {
        return "string" != typeof t && t[1].ignore ? t[0] : null
      }).filter(function (t) {
        return !!t
      })
    }

    function o(t) {
      var e = {};
      return t.forEach(function (t) {
        "string" != typeof t && t[1].binary && (e[t[0]] = t[1].binary)
      }),
          e
    }

    return e.getNames = r,
        e.getIgnore = i,
        e.getBinary = o,
        n.exports
  });
  System.registerDynamic("10", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      for (var e = "", n = 0; n < t; n++)
        e += o[Math.floor(Math.random() * o.length)];
      return e
    }

    function i(t, e) {
      var n = e[t];
      if (n) {
        var r = Date.now();
        if (r - n.last < n.limit)
          return !1;
        n.last = r
      }
      return !0
    }

    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
    return e.randomString = r,
        e.checkRateLimit = i,
        n.exports
  });
  System.registerDynamic("11", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return !t.some(function (t) {
        return 10 === t || 9 === t || Array.isArray(t)
      })
    }

    function i(t, e, n) {
      if (t instanceof Array) {
        if (r(t))
          return "writer.measureSimpleArray(" + e + ", " + t.reduce(function (t, e) {
                return t + c[e]
              }, 0) + ")";
        var o = ""
            , a = 0;
        if (1 === t.length) {
          var s = i(t[0], "item", n + "\t");
          isNaN(s) ? o += "\n" + n + "\t+ " + s : a += s
        } else
          for (var u = 0; u < t.length; u++) {
            var s = i(t[u], "item[" + u + "]", n + "\t");
            isNaN(s) ? o += "\n" + n + "\t+ " + s : a += s
          }
        return "writer.measureArray(" + e + ", function (item) { return " + a + o + "; })"
      }
      return 10 === t || 9 === t ? "writer.measure" + f[t] + "(" + e + ")" : c[t]
    }

    function o(t, e, n, r) {
      if (e instanceof Array)
        if (1 === e.length)
          t.code += r + "writer.writeArray(" + n + ", function (item) {\n",
              o(t, e[0], "item", r + "\t"),
              t.code += r + "});\n";
        else {
          t.code += r + "writer.writeArray(" + n + ", function (item) {\n";
          for (var i = 0; i < e.length; i++)
            o(t, e[i], "item[" + i + "]", r + "\t");
          t.code += r + "});\n"
        }
      else
        t.code += r + "writer.write" + f[e] + "(" + n + ");\n"
    }

    function a(t) {
      for (var e = {
        code: "",
        size: 1
      }, n = 0; n < t.length; n++) {
        var r = i(t[n], "args[" + n + "]", "\t\t");
        isNaN(r) ? e.code += "\t\tsize += " + r + ";\n" : e.size += r
      }
      e.code += "\t\twriter.init(size);\n",
          e.code += "\t\twriter.writeUint8(id);\n";
      for (var n = 0; n < t.length; n++)
        o(e, t[n], "args[" + n + "]", "\t\t");
      return "function (writer, id, args) {\n\t\tvar size = " + e.size + ";\n" + e.code + "\t}"
    }

    function s(t, e) {
      if (t instanceof Array) {
        var n = "";
        if (1 === t.length)
          n += "\n" + e + "\t" + s(t[0], e + "\t") + "\n" + e;
        else {
          n += "[\n";
          for (var r = 0; r < t.length; r++)
            n += e + "\t" + s(t[r], e + "\t") + ",\n";
          n += e + "]"
        }
        return "reader.readArray(function () { return " + n.trim() + "; })"
      }
      return "reader.read" + f[t] + "()"
    }

    function u(t) {
      for (var e = "", n = 0; n < t.length; n++)
        e += "\t\tresult.push(" + s(t[n], "\t\t") + ");\n";
      return "function (reader, result) {\n" + e + "\t}"
    }

    function l(t, e) {
      var n = Object.keys(t).map(function (e) {
        return e + ": " + a(t[e])
      })
          , r = Object.keys(e).map(function (t) {
        return t + ": " + u(e[t])
      })
          , i = "var write = {\n\t" + n.join(",\n\t") + "\n};\n\nvar read = {\n\t" + r.join(",\n\t") + "\n};\n\nreturn { write: write, read: read };";
      return new Function(i)()
    }

    var c = [];
    c[1] = 1,
        c[0] = 1,
        c[3] = 2,
        c[2] = 2,
        c[5] = 4,
        c[4] = 4,
        c[6] = 4,
        c[7] = 8,
        c[8] = 1;
    var f = [];
    return f[1] = "Uint8",
        f[0] = "Int8",
        f[3] = "Uint16",
        f[2] = "Int16",
        f[5] = "Uint32",
        f[4] = "Int32",
        f[6] = "Float32",
        f[7] = "Float64",
        f[8] = "Boolean",
        f[9] = "String",
        f[10] = "Object",
        e.createHandlers = l,
        n.exports
  });
  System.registerDynamic("12", [], !0, function (t, e, n) {
    "use strict";
    e.defaultHandleFunction = function (t, e, n, r, i) {
      return n.apply(r, i)
    }
    ;
    var r = function () {
      function t(t, e, n, r, i) {
        this.readNames = t,
            this.remoteNames = e,
            this.packetWriter = n,
            this.packetReader = r,
            this.supportsBinary = !1,
            this.lastWriteBinary = !1,
            this.writeHandlers = i.write,
            this.readHandlers = i.read
      }

      return t.prototype.write = function (t, e, n, r) {
        var i = this.writeHandlers[e];
        if (this.supportsBinary && i) {
          i(this.packetWriter, n, r);
          var o = this.packetWriter.getBuffer();
          return t.send(o),
              this.lastWriteBinary = !0,
          o.byteLength || o.length || 0
        }
        r.unshift(n);
        var a = JSON.stringify(r);
        return t.send(a),
            a.length
      }
          ,
          t.prototype.read = function (t) {
            if ("string" == typeof t)
              return JSON.parse(t);
            this.packetReader.setBuffer(t);
            var e = this.packetReader.readUint8()
                , n = this.readNames[e]
                , r = this.readHandlers[n]
                , i = [e];
            if (!r)
              throw new Error("Missing packet handler for: " + n + " (" + e + ")");
            return r(this.packetReader, i),
                i
          }
          ,
          t.prototype.getFuncName = function (t, e) {
            return 255 === t ? "*version" : 253 === t ? "*reject:" + this.remoteNames[e.shift()] : 254 === t ? "*resolve:" + this.remoteNames[e.shift()] : this.readNames[t]
          }
          ,
          t.prototype.send = function (t, e, n, r) {
            try {
              return this.write(t, e, n, r)
            } catch (t) {
              return 0
            }
          }
          ,
          t.prototype.recv = function (t, n, r, i) {
            void 0 === i && (i = e.defaultHandleFunction);
            var o = this.read(t);
            try {
              var a = o.shift()
                  , s = this.getFuncName(a, o)
                  , u = s && "*" === s[0]
                  , l = u ? r : n
                  , c = l[s]
            } catch (t) {
            }
            return c && i(a, s, c, l, o),
            t.length || t.byteLength || 0
          }
          ,
          t
    }();
    return e.PacketHandler = r,
        n.exports
  });
  System.registerDynamic("13", ["12"], !0, function (t, e, n) {
    "use strict";
    var r = this && this.__extends || function (t, e) {
          function n() {
            this.constructor = t
          }

          for (var r in e)
            e.hasOwnProperty(r) && (t[r] = e[r]);
          t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
        }
        , i = t("12")
        , o = function (t) {
      function e(e, n, r, i, o, a, s) {
        t.call(this, e, n, r, i, o),
            this.ignorePackets = a,
            this.log = s
      }

      return r(e, t),
          e.prototype.send = function (t, e, n, r) {
            var i = this.write(t, e, n, r);
            if (this.ignorePackets.indexOf(e) === -1) {
              var o = this.lastWriteBinary ? "bin" : "str";
              this.log("SEND [" + i + "] (" + o + ")", e, r)
            }
            return i
          }
          ,
          e.prototype.recv = function (t, e, n, r) {
            void 0 === r && (r = i.defaultHandleFunction);
            var o = this.read(t)
                , a = o.shift()
                , s = this.getFuncName(a, o);
            s || this.log("invalid message id: " + a);
            var u = s && "*" === s[0]
                , l = u ? n : e
                , c = l[s]
                , f = t.length || t.byteLength;
            if (this.ignorePackets.indexOf(s) === -1) {
              var p = "string" != typeof t ? "bin" : "str";
              this.log("RECV [" + f + "] (" + p + ")", s, o)
            }
            return c ? r(a, s, c, l, o) : this.log("invalid message: " + s, o),
                f
          }
          ,
          e
    }(i.PacketHandler);
    return e.DebugPacketHandler = o,
        n.exports
  });
  System.registerDynamic("14", ["15"], !0, function (t, e, n) {
    "use strict";
    var r = t("15")
        , i = function () {
      function t() {
      }

      return t.prototype.measureString = function (t) {
        if (null == t)
          return this.measureLength(-1);
        var e = r.stringLengthInBytes(t);
        return this.measureLength(e) + e
      }
          ,
          t.prototype.measureObject = function (t) {
            return null == t ? this.measureLength(-1) : this.measureString(JSON.stringify(t))
          }
          ,
          t.prototype.measureArray = function (t, e) {
            return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.reduce(function (t, n) {
              return t + e(n)
            }, 0)
          }
          ,
          t.prototype.measureSimpleArray = function (t, e) {
            return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.length * e
          }
          ,
          t.prototype.measureLength = function (t) {
            return t === -1 ? 2 : t < 127 ? 1 : t < 16383 ? 2 : t < 2097151 ? 3 : 4
          }
          ,
          t.prototype.writeUint8 = function (t) {
            throw new Error("not implemented")
          }
          ,
          t.prototype.writeBytes = function (t) {
            throw new Error("not implemented")
          }
          ,
          t.prototype.writeBoolean = function (t) {
            this.writeUint8(t ? 1 : 0)
          }
          ,
          t.prototype.writeString = function (t) {
            if (null == t)
              this.writeLength(-1);
            else {
              var e = r.encodeString(t);
              this.writeLength(e.length),
                  this.writeBytes(e)
            }
          }
          ,
          t.prototype.writeObject = function (t) {
            null == t ? this.writeString(null) : this.writeString(JSON.stringify(t))
          }
          ,
          t.prototype.writeArray = function (t, e) {
            null == t ? this.writeLength(-1) : (this.writeLength(t.length),
                t.forEach(e))
          }
          ,
          t.prototype.writeLength = function (t) {
            if (t === -1)
              this.writeUint8(128),
                  this.writeUint8(0);
            else
              do
                this.writeUint8(127 & t | (t >> 7 ? 128 : 0)),
                    t >>= 7;
              while (t)
          }
          ,
          t
    }();
    return e.BasePacketWriter = i,
        n.exports
  });
  System.registerDynamic("16", ["14"], !0, function (t, e, n) {
    "use strict";
    var r = this && this.__extends || function (t, e) {
          function n() {
            this.constructor = t
          }

          for (var r in e)
            e.hasOwnProperty(r) && (t[r] = e[r]);
          t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
        }
        , i = t("14")
        , o = function (t) {
      function e() {
        t.apply(this, arguments),
            this.offset = 0
      }

      return r(e, t),
          e.prototype.getBuffer = function () {
            return this.buffer
          }
          ,
          e.prototype.init = function (t) {
            this.offset = 0,
                this.buffer = new ArrayBuffer(t),
                this.view = new DataView(this.buffer),
                this.bytes = new Uint8Array(this.buffer)
          }
          ,
          e.prototype.writeInt8 = function (t) {
            this.view.setInt8(this.offset, t),
                this.offset += 1
          }
          ,
          e.prototype.writeUint8 = function (t) {
            this.view.setUint8(this.offset, t),
                this.offset += 1
          }
          ,
          e.prototype.writeInt16 = function (t) {
            this.view.setInt16(this.offset, t),
                this.offset += 2
          }
          ,
          e.prototype.writeUint16 = function (t) {
            this.view.setUint16(this.offset, t),
                this.offset += 2
          }
          ,
          e.prototype.writeInt32 = function (t) {
            this.view.setInt32(this.offset, t),
                this.offset += 4
          }
          ,
          e.prototype.writeUint32 = function (t) {
            this.view.setUint32(this.offset, t),
                this.offset += 4
          }
          ,
          e.prototype.writeFloat32 = function (t) {
            this.view.setFloat32(this.offset, t),
                this.offset += 4
          }
          ,
          e.prototype.writeFloat64 = function (t) {
            this.view.setFloat64(this.offset, t),
                this.offset += 8
          }
          ,
          e.prototype.writeBytes = function (t) {
            this.bytes.set(t, this.offset),
                this.offset += t.length
          }
          ,
          e
    }(i.BasePacketWriter);
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("15", [], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      for (var n = 0; n < t.length; n++) {
        var r = t.charCodeAt(n);
        if (r >= 55296 && r <= 56319 && n + 1 < t.length) {
          var i = t.charCodeAt(n + 1);
          56320 === (64512 & i) && (r = ((1023 & r) << 10) + (1023 & i) + 65536,
              n++)
        }
        e(r)
      }
    }

    function i(t) {
      return 0 === (4294967168 & t) ? 1 : 0 === (4294965248 & t) ? 2 : 0 === (4294901760 & t) ? 3 : 4
    }

    function o(t) {
      var e = 0;
      return r(t, function (t) {
        return e += i(t)
      }),
          e
    }

    function a(t) {
      if (null == t)
        return null;
      var e = new Uint8Array(o(t))
          , n = 0;
      return r(t, function (t) {
        var r = i(t);
        1 === r ? e[n++] = t : (2 === r ? e[n++] = t >> 6 & 31 | 192 : 3 === r ? (e[n++] = t >> 12 & 15 | 224,
            e[n++] = t >> 6 & 63 | 128) : (e[n++] = t >> 18 & 7 | 240,
            e[n++] = t >> 12 & 63 | 128,
            e[n++] = t >> 6 & 63 | 128),
            e[n++] = 63 & t | 128)
      }),
          e
    }

    function s(t, e) {
      if (e >= t.length)
        throw Error("Invalid byte index");
      var n = t[e];
      if (128 === (192 & n))
        return 63 & n;
      throw Error("Invalid continuation byte")
    }

    function u(t) {
      if (null == t)
        return null;
      for (var e = "", n = 0; n < t.length;) {
        var r = t[n++]
            , i = void 0;
        if (0 === (128 & r))
          i = r;
        else if (192 === (224 & r)) {
          var o = s(t, n++);
          if (i = (31 & r) << 6 | o,
              i < 128)
            throw Error("Invalid continuation byte")
        } else if (224 === (240 & r)) {
          var o = s(t, n++)
              , a = s(t, n++);
          if (i = (15 & r) << 12 | o << 6 | a,
              i < 2048)
            throw Error("Invalid continuation byte");
          if (i >= 55296 && i <= 57343)
            throw Error("Lone surrogate U+" + i.toString(16).toUpperCase() + " is not a scalar value")
        } else {
          if (240 !== (248 & r))
            throw Error("Invalid UTF-8 detected");
          var o = s(t, n++)
              , a = s(t, n++)
              , u = s(t, n++);
          if (i = (15 & r) << 18 | o << 12 | a << 6 | u,
              i < 65536 || i > 1114111)
            throw Error("Invalid continuation byte")
        }
        i > 65535 && (i -= 65536,
            e += String.fromCharCode(i >>> 10 & 1023 | 55296),
            i = 56320 | 1023 & i),
            e += String.fromCharCode(i)
      }
      return e
    }

    return e.stringLengthInBytes = o,
        e.encodeString = a,
        e.decodeString = u,
        n.exports
  });
  System.registerDynamic("17", ["15"], !0, function (t, e, n) {
    "use strict";
    var r = t("15")
        , i = function () {
      function t() {
      }

      return t.prototype.readUint8 = function () {
        throw new Error("not implemented")
      }
          ,
          t.prototype.readBytes = function (t) {
            throw new Error("not implemented")
          }
          ,
          t.prototype.readBoolean = function () {
            return 1 === this.readUint8()
          }
          ,
          t.prototype.readArray = function (t) {
            var e = this.readLength();
            if (e === -1)
              return null;
            for (var n = new Array(e), r = 0; r < e; r++)
              n[r] = t();
            return n
          }
          ,
          t.prototype.readString = function () {
            var t = this.readLength();
            return t === -1 ? null : r.decodeString(this.readBytes(t))
          }
          ,
          t.prototype.readObject = function () {
            var t = this.readString();
            return null == t ? null : JSON.parse(t)
          }
          ,
          t.prototype.readLength = function () {
            var t = 0
                , e = 0
                , n = 0;
            do {
              var r = this.readUint8();
              t |= (127 & r) << e,
                  e += 7,
                  n++
            } while (128 & r);
            return 2 === n && 0 === t ? -1 : t
          }
          ,
          t
    }();
    return e.BasePacketReader = i,
        n.exports
  });
  System.registerDynamic("18", ["17"], !0, function (t, e, n) {
    "use strict";
    var r = this && this.__extends || function (t, e) {
          function n() {
            this.constructor = t
          }

          for (var r in e)
            e.hasOwnProperty(r) && (t[r] = e[r]);
          t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
        }
        , i = t("17")
        , o = function (t) {
      function e() {
        t.apply(this, arguments),
            this.offset = 0,
            this.view = null ,
            this.buffer = null
      }

      return r(e, t),
          e.prototype.setBuffer = function (t) {
            this.offset = 0,
                this.buffer = t,
                this.view = new DataView(this.buffer)
          }
          ,
          e.prototype.readInt8 = function () {
            return this.offset += 1,
                this.view.getInt8(this.offset - 1)
          }
          ,
          e.prototype.readUint8 = function () {
            return this.offset += 1,
                this.view.getUint8(this.offset - 1)
          }
          ,
          e.prototype.readInt16 = function () {
            return this.offset += 2,
                this.view.getInt16(this.offset - 2)
          }
          ,
          e.prototype.readUint16 = function () {
            return this.offset += 2,
                this.view.getUint16(this.offset - 2)
          }
          ,
          e.prototype.readInt32 = function () {
            return this.offset += 4,
                this.view.getInt32(this.offset - 4)
          }
          ,
          e.prototype.readUint32 = function () {
            return this.offset += 4,
                this.view.getUint32(this.offset - 4)
          }
          ,
          e.prototype.readFloat32 = function () {
            return this.offset += 4,
                this.view.getFloat32(this.offset - 4)
          }
          ,
          e.prototype.readFloat64 = function () {
            return this.offset += 8,
                this.view.getFloat64(this.offset - 8)
          }
          ,
          e.prototype.readBytes = function (t) {
            return this.offset += t,
                new Uint8Array(this.view.buffer, this.offset - t, t)
          }
          ,
          e
    }(i.BasePacketReader);
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("19", [getCodeName("BlueBird"), "f", "1a", "10", "11", "12", "13", "16", "18", getCodeName("BufferForTheBrowser")], !0, function (t, e, n) {
    return function (n) {
      "use strict";
      function r() {
        var t = {};
        return t.promise = new i(function (e, n) {
              t.resolve = e,
                  t.reject = n
            }
        ),
            t
      }

      var i = t(getCodeName("BlueBird"))
          , o = t("f")
          , a = t("1a")
          , s = t("10")
          , u = t("11")
          , l = t("12")
          , c = t("13")
          , f = t("16")
          , p = t("18")
          , h = function () {
        function t(t, e, n, r) {
          var i = this;
          void 0 === n && (n = function (t) {
                return t()
              }
          ),
          void 0 === r && (r = console.log.bind(console)),
              this.options = t,
              this.errorHandler = e,
              this.apply = n,
              this.log = r,
              this.client = {},
              this.server = {},
              this.sentSize = 0,
              this.receivedSize = 0,
              this.isConnected = !1,
              this.special = {},
              this.connecting = !1,
              this.lastPing = 0,
              this.lastSentId = 0,
              this.versionValidated = !1,
              this.beforeunload = function () {
                if (i.socket)
                  try {
                    i.socket.onclose = null ,
                        i.socket.close(),
                        i.socket = null
                  } catch (t) {
                  }
              }
              ,
              this.defers = [],
              this.inProgressFields = {},
              this.rateLimits = [],
              this.options.server.forEach(function (t, e) {
                "string" == typeof t ? i.createMethod(t, e, {}) : (i.createMethod(t[0], e, t[1]),
                t[1].rateLimit && (i.rateLimits[e] = {
                  limit: t[1].rateLimit + 50,
                  last: 0
                }))
              }),
              this.special["*version"] = function (t) {
                t === i.options.hash ? i.versionValidated = !0 : i.client.invalidVersion && i.client.invalidVersion(t, i.options.hash)
              }
        }

        return t.prototype.getWebsocketUrl = function () {
          var t = this.options
              , e = t.host || location.host
              , n = t.path || "/ws"
              , r = t.ssl || "https:" === location.protocol ? "wss://" : "ws://"
              , i = t.token ? "?t=" + t.token : "";
          if (t.requestParams) {
            var o = Object.keys(t.requestParams).map(function (e) {
              return e + "=" + encodeURIComponent(t.requestParams[e])
            }).join("&");
            i += (i ? "&" : "?") + o
          }
          return r + e + n + i
        }
            ,
            t.prototype.connect = function () {
              var t = this;
              if (this.connecting = !0,
                      !this.socket) {
                var e = this.options;
                this.socket = new WebSocket(this.getWebsocketUrl()),
                    window.addEventListener("beforeunload", this.beforeunload);
                var r = new p.default
                    , i = new f.default
                    , a = u.createHandlers(o.getBinary(e.server), o.getBinary(e.client))
                    , s = o.getNames(e.server)
                    , h = o.getNames(e.client)
                    , d = o.getIgnore(e.server).concat(o.getIgnore(e.client));
                e.debug ? this.packet = new c.DebugPacketHandler(h, s, i, r, a, d, this.log) : this.packet = new l.PacketHandler(h, s, i, r, a),
                    this.packet.supportsBinary = !!this.socket.binaryType,
                    this.socket.binaryType = "arraybuffer",
                    this.socket.onmessage = function (e) {
                      if (e.data)
                        try {
                          t.receivedSize += t.packet.recv(e.data, t.client, t.special)
                        } catch (n) {
                          if (!t.errorHandler)
                            throw n;
                          t.errorHandler.handleRecvError(n, e.data)
                        }
                      else
                        t.sendPing()
                    }
                    ,
                    this.socket.onopen = function () {
                      e.debug && t.log("socket opened"),
                          t.lastSentId = 0,
                          t.isConnected = !0,
                      t.socket && t.packet.supportsBinary && t.socket.send("undefined" != typeof n ? new n(0) : new ArrayBuffer(0)),
                      t.client.connected && t.client.connected(),
                      e.pingInterval && (t.pingInterval = setInterval(function () {
                        return t.sendPing()
                      }, e.pingInterval))
                    }
                    ,
                    this.socket.onerror = function (n) {
                      e.debug && t.log("socket error", n)
                    }
                    ,
                    this.socket.onclose = function (n) {
                      e.debug && t.log("socket closed", n),
                          t.socket = null ,
                          t.versionValidated = !1,
                      t.isConnected && (t.isConnected = !1,
                      t.client.disconnected && t.client.disconnected()),
                      t.connecting && (t.reconnectTimeout = setTimeout(function () {
                        t.connect(),
                            t.reconnectTimeout = null
                      }, e.reconnectTimeout)),
                          t.defers.forEach(function (t) {
                            return t[1].reject(new Error("disconnected"))
                          }),
                          t.defers = [],
                          Object.keys(t.inProgressFields).forEach(function (e) {
                            return t.inProgressFields[e] = 0
                          }),
                      t.pingInterval && (clearInterval(t.pingInterval),
                          t.pingInterval = null )
                    }
              }
            }
            ,
            t.prototype.disconnect = function () {
              this.connecting = !1,
              this.reconnectTimeout && (clearTimeout(this.reconnectTimeout),
                  this.reconnectTimeout = null ),
              this.pingInterval && (clearInterval(this.pingInterval),
                  this.pingInterval = null ),
              this.socket && (this.socket.close(),
                  this.socket = null ),
                  window.removeEventListener("beforeunload", this.beforeunload)
            }
            ,
            t.prototype.sendPing = function () {
              try {
                var t = Date.now();
                this.socket && this.versionValidated && t - this.lastPing > this.options.pingInterval && (this.socket.send(""),
                    this.lastPing = Date.now())
              } catch (t) {
              }
            }
            ,
            t.prototype.createMethod = function (t, e, n) {
              n.promise ? this.createPromiseMethod(t, e, n.progress) : this.createSimpleMethod(t, e)
            }
            ,
            t.prototype.createSimpleMethod = function (t, e) {
              var n = this;
              this.server[t] = function () {
                for (var r = [], i = 0; i < arguments.length; i++)
                  r[i - 0] = arguments[i];
                return !!s.checkRateLimit(e, n.rateLimits) && (n.sentSize += n.packet.send(n.socket, t, e, r),
                        n.lastSentId++,
                        !0)
              }
            }
            ,
            t.prototype.createPromiseMethod = function (t, e, n) {
              var o = this;
              n && (this.inProgressFields[n] = 0,
                  Object.defineProperty(this.server, n, {
                    get: function () {
                      return !!o.inProgressFields[n]
                    }
                  })),
                  this.server[t] = function () {
                    for (var u = [], l = 0; l < arguments.length; l++)
                      u[l - 0] = arguments[l];
                    if (!o.isConnected)
                      return i.reject(new Error("not connected"));
                    if (!s.checkRateLimit(e, o.rateLimits))
                      return i.reject(new Error("rate limit exceeded"));
                    o.sentSize += o.packet.send(o.socket, t, e, u);
                    var c = ++o.lastSentId
                        , f = r();
                    return a.set(o.defers, c, f),
                        o.inProgressFields[n]++,
                        f.promise
                  }
                  ,
                  this.special["*resolve:" + t] = function (t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                        o.inProgressFields[n]--,
                        o.apply(function () {
                          return r.resolve(e)
                        }))
                  }
                  ,
                  this.special["*reject:" + t] = function (t, e) {
                    var r = a.get(o.defers, t);
                    r && (a.remove(o.defers, t),
                        o.inProgressFields[n]--,
                        o.apply(function () {
                          return r.reject(new Error(e))
                        }))
                  }
            }
            ,
            t
      }();
      e.ClientSocket = h
    }(t(getCodeName("BufferForTheBrowser")).Buffer),
        n.exports
  });
  System.registerDynamic("1a", [], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      for (var n = 0; n < t.length; n++)
        if (t[n][0] === e)
          return t[n][1]
    }

    function i(t, e, n) {
      for (var r = 0; r < t.length; r++)
        if (t[r][0] === e)
          return void (t[r][1] = n);
      t.push([e, n])
    }

    function o(t, e) {
      for (var n = 0; n < t.length; n++)
        if (t[n][0] === e) {
          t.splice(n, 1);
          break
        }
    }

    return e.get = r,
        e.set = i,
        e.remove = o,
        n.exports
  });
  System.registerDynamic("1c", ["1a"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return void 0 === t && (t = {}),
          function (e, n) {
            var r = l.get(c, e.constructor) || [];
            r.push({
              name: n,
              options: t
            }),
                l.set(c, e.constructor, r)
          }
    }

    function i(t) {
      return function (e) {
        l.set(f, e, t)
      }
    }

    function o(t) {
      return l.get(f, t)
    }

    function a(t) {
      return l.get(c, t)
    }

    function s(t) {
      return Object.keys(t).filter(function (e) {
        return "connected" !== e && "disconnected" !== e && "invalidVersion" !== e && "function" == typeof t[e]
      }).map(function (t) {
        return {
          name: t,
          options: {}
        }
      })
    }

    function u(t) {
      return a(t) || s(t.prototype)
    }

    var l = t("1a")
        , c = []
        , f = [];
    return e.Method = r,
        e.Socket = i,
        e.getSocketMetadata = o,
        e.getMethodMetadata = a,
        e.getMethods = u,
        n.exports
  });
  System.registerDynamic("1d", ["f", "19", "1c"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      for (var n in t)
        e.hasOwnProperty(n) || (e[n] = t[n])
    }

    r(t("f"));
    var i = t("19");
    e.ClientSocket = i.ClientSocket;
    var o = t("1c");
    return e.Method = o.Method,
        n.exports
  });
  System.registerDynamic("1e", ["1d"], !0, function (t, e, n) {
    return n.exports = t("1d"),
        n.exports
  });
  System.registerDynamic("1f", ["20", "21", "22", "23", "24", "25"], !0, function (t, e, n) {
    "use strict";
    var r = t("20")
        , i = t("21")
        , o = t("22")
        , a = t("23")
        , s = t("24")
        , u = t("25")
        , l = Math.floor
        , c = Math.ceil
        , f = Math.round
        , p = function () {
      function t(t, e, n) {
        this.id = t,
            this.x = e,
            this.y = n,
            this.entities = [],
            this.entitiesDrawn = 0,
            this.tiles = new Uint8Array(o.REGION_SIZE * o.REGION_SIZE),
            this.tileIndices = new Int16Array(o.REGION_SIZE * o.REGION_SIZE),
            this.randoms = new Int16Array(o.REGION_SIZE * o.REGION_SIZE);
        for (var r = 0; r < this.tiles.length; r++)
          this.tiles[r] = s.TileType.Dirt,
              this.tileIndices[r] = -1,
              this.randoms[r] = Math.floor(1e3 * Math.random())
      }

      return t.prototype.getTiles = function () {
        return this.tiles
      }
          ,
          t.prototype.load = function (t) {
            this.tiles = t;
            for (var e = 0; e < this.tiles.length; e++)
              this.tileIndices[e] = -1
          }
          ,
          t.prototype.canWalk = function (t, e) {
            if (t < 0 || e < 0 || t > o.REGION_SIZE || e > o.REGION_SIZE)
              return !1;
            var n = this.getTile(t, e);
            return n && s.canWalk(n)
          }
          ,
          t.prototype.getTile = function (t, e) {
            return this.tiles[(0 | t) + (0 | e) * o.REGION_SIZE]
          }
          ,
          t.prototype.setTile = function (t, e, n) {
            this.tiles[l(t) + l(e) * o.REGION_SIZE] = n
          }
          ,
          t.prototype.setDirty = function (t, e) {
            this.tileIndices[l(t) + l(e) * o.REGION_SIZE] = -1
          }
          ,
          t.prototype.drawEntities = function (t, e) {
            var n = this;
            this.entitiesDrawn = 0,
                this.entities.sort(function (t, e) {
                  return t.y === e.y ? t.x - e.x : t.y - e.y
                }),
                this.entities.forEach(function (r) {
                  function a(e, n) {
                    e && t.drawRect(n, f(r.x * o.tileWidth + e.x), f(r.y * o.tileHeight + e.y), f(e.w), f(e.h))
                  }

                  r.draw && e.isVisible(r) && (r.draw(t),
                      n.entitiesDrawn++),
                  i.debugOptions.showHelpers && (t.globalAlpha = .3,
                  r.collider && t.drawRect(u.RED, f((r.x + r.collider.x) * o.tileWidth), f((r.y + r.collider.y) * o.tileHeight), f(r.collider.w * o.tileWidth), f(r.collider.h * o.tileHeight)),
                      a(r.bounds, u.ORANGE),
                      a(r.coverBounds, u.BLUE),
                      a(r.interactBounds, u.PURPLE),
                      t.globalAlpha = 1)
                })
          }
          ,
          t.prototype.drawEntities2 = function (t, e) {
            var n = this;
            this.entitiesDrawn = 0,
                this.entities.sort(function (t, e) {
                  return t.y === e.y ? t.x - e.x : t.y - e.y
                }),
                this.entities.forEach(function (r) {
                  function a(e, n) {
                    e && t.drawRect(n, f(r.x * o.tileWidth + e.x), f(r.y * o.tileHeight + e.y), f(e.w), f(e.h))
                  }

                  r.draw2 && e.isVisible(r) && (r.draw2(t),
                      n.entitiesDrawn++),
                  i.debugOptions.showHelpers && (t.globalAlpha = .3,
                  r.collider && t.drawRect(u.RED, f((r.x + r.collider.x) * o.tileWidth), f((r.y + r.collider.y) * o.tileHeight), f(r.collider.w * o.tileWidth), f(r.collider.h * o.tileHeight)),
                      a(r.bounds, u.ORANGE),
                      a(r.coverBounds, u.BLUE),
                      a(r.interactBounds, u.PURPLE),
                      t.globalAlpha = 1)
                })
          }
          ,
          t.prototype.drawTiles = function (t, e, n) {
            var r = this.x * o.REGION_SIZE
                , i = this.y * o.REGION_SIZE;
            if (e.isRectVisible(r * o.tileWidth, i * o.tileHeight, o.REGION_SIZE * o.tileWidth, o.REGION_SIZE * o.tileHeight))
              for (var s = a.clamp(l(e.x / o.tileWidth - r), 0, o.REGION_SIZE), u = a.clamp(l(e.y / o.tileHeight - i), 0, o.REGION_SIZE), f = a.clamp(c((e.x + e.w) / o.tileWidth - r), 0, o.REGION_SIZE), p = a.clamp(c((e.y + e.h) / o.tileHeight - i), 0, o.REGION_SIZE), h = u; h <= p; h++)
                for (var d = s; d < f; d++)
                  this.drawMapTile(t, d, h, d + r, h + i, n)
          }
          ,
          t.prototype.getTileType = function (t, e, n) {
            return t >= 0 && e >= 0 && t < o.REGION_SIZE && e < o.REGION_SIZE ? this.getTile(t, e) : n.getTile(t + this.x * o.REGION_SIZE, e + this.y * o.REGION_SIZE)
          }
          ,
          t.prototype.updateTileIndex = function (t, e, n) {
            var r, i = this.getTile(t, e), a = 0;
            i === s.TileType.Dirt ? r = 47 : i === s.TileType.Grass && (a += this.getTileType(t - 1, e - 1, n) === i ? 1 : 0,
                a += this.getTileType(t, e - 1, n) === i ? 2 : 0,
                a += this.getTileType(t + 1, e - 1, n) === i ? 4 : 0,
                a += this.getTileType(t - 1, e, n) === i ? 8 : 0,
                a += this.getTileType(t + 1, e, n) === i ? 16 : 0,
                a += this.getTileType(t - 1, e + 1, n) === i ? 32 : 0,
                a += this.getTileType(t, e + 1, n) === i ? 64 : 0,
                a += this.getTileType(t + 1, e + 1, n) === i ? 128 : 0,
                r = s.TILE_MAP[a]);
            var u = s.TILE_COUNT_MAP[r]
                , l = s.TILE_MAP_MAP[r] + (u > 1 ? this.randoms[t + e * o.REGION_SIZE] % u : 0);
            return this.tileIndices[t + e * o.REGION_SIZE] = l
          }
          ,
          t.prototype.drawMapTile = function (t, e, n, i, a, s) {
            var u = this.tileIndices[e + n * o.REGION_SIZE];
            u === -1 && (u = this.updateTileIndex(e, n, s));
            var l = 8
                , c = u % l
                , f = Math.floor(u / l)
                , p = c * o.tileWidth
                , h = f * o.tileHeight;
            t.drawImage(r.tileSprite.tex, null, p, h, o.tileWidth, o.tileHeight, i * o.tileWidth, a * o.tileHeight, o.tileWidth, o.tileHeight)
          }
          ,
          t
    }();
    return e.Region = p,
        n.exports
  });
  System.registerDynamic("26", [getCodeName("Lodash"), "20", "28", "23", "22", "25"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n) {
      return t ? {
        x: t.ox + e,
        y: t.oy + n,
        w: t.w,
        h: t.h
      } : {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    }

    function i(t, e, n) {
      var i = t.color
          , o = t.shadow;
      return i && o ? $.addRects(r(i, -e, -n), r(o, -e, -n)) : i ? r(i, -e, -n) : r(o, -e, -n)
    }

    function o(t, e, n) {
      var r = e.palette ? n.add(e.palette) : null
          , i = 8
          , o = 5 * Math.random();
      return {
        bounds: {
          x: -t[0].w / 2,
          y: -t[0].h,
          w: t[0].w,
          h: t[0].h
        },
        update: function (t) {
          o += t
        },
        draw: function (e) {
          var n = Math.floor(o * i) % t.length
              , r = t[n];
          r && e.drawSprite(r, null, Math.round(this.x * S.tileWidth - r.w / 2), Math.round(this.y * S.tileHeight - r.h))
        },
        draw2: function (t) {
          var n = Math.floor(o * i) % e.frames.length
              , a = e.frames[n];
          a && t.drawSprite(a, null, r, Math.round(this.x * S.tileWidth - a.w / 2), Math.round(this.y * S.tileHeight - a.h))
        }
      }
    }

    function a(t, e, n, r, o, a) {
      void 0 === a && (a = T.SHADOW_COLOR);
      var s = e.shadow ? o.add(A) : null
          , u = e.palette ? o.add(e.palette) : null;
      return {
        bounds: i(t, n, r),
        draw: function (e) {
          var i = Math.round(this.x * S.tileWidth - n)
              , o = Math.round(this.y * S.tileHeight - r);
          e.drawSprite(t.shadow, a, i, o),
              e.drawSprite(t.color, null, i, o)
        },
        draw2: function (t) {
          var i = Math.round(this.x * S.tileWidth - n)
              , o = Math.round(this.y * S.tileHeight - r);
          t.drawSprite(e.shadow, a, s, i, o),
              t.drawSprite(e.color, null, u, i, o)
        },
        release: function () {
          E.releasePalette(s),
              E.releasePalette(u)
        }
      }
    }

    function s(t) {
      var n = x.tree.stump
          , i = x.tree.stumpShadow
          , o = x.tree.trunk
          , a = t.add(A)
          , s = t.add(x.tree2.palette)
          , u = x.tree2.stump
          , l = x.tree2.stumpShadow
          , c = x.tree2.trunk;
      return {
        bounds: $.addRects($.addRects(r(n, -e.treeOffsetX, -e.treeOffsetY), r(o, -e.treeOffsetX, -e.treeOffsetY)), r(i, -e.treeOffsetX, -e.treeOffsetY)),
        coverBounds: {
          x: -50,
          y: -135,
          w: 110,
          h: 120
        },
        draw: function (t) {
          var r = Math.round(this.x * S.tileWidth - e.treeOffsetX)
              , a = Math.round(this.y * S.tileHeight - e.treeOffsetY);
          t.drawSprite(i, T.SHADOW_COLOR, r, a),
              t.drawSprite(n, null, r, a),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(o, null, r, a),
              t.globalAlpha = 1
        },
        draw2: function (t) {
          var n = Math.round(this.x * S.tileWidth - e.treeOffsetX)
              , r = Math.round(this.y * S.tileHeight - e.treeOffsetY);
          t.drawSprite(l, T.SHADOW_COLOR, a, n, r),
              t.drawSprite(u, null, s, n, r),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(c, null, s, n, r),
              t.globalAlpha = 1
        }
      }
    }

    function u(t) {
      var n = x.tree.crown
          , i = x.tree.shadow
          , o = t.add(A)
          , a = t.add(x.tree2.palette)
          , s = x.tree2.crown
          , u = x.tree2.shadow;
      return {
        bounds: $.addRects(r(n, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset), r(i, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset)),
        coverBounds: {
          x: -50,
          y: -135 - e.treeOffset,
          w: 110,
          h: 120
        },
        draw: function (t) {
          var r = Math.round(this.x * S.tileWidth - e.treeOffsetX)
              , o = Math.round(this.y * S.tileHeight - e.treeOffsetY - e.treeOffset);
          t.drawSprite(i, T.SHADOW_COLOR, r, o),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(n, null, r, o),
              t.globalAlpha = 1
        },
        draw2: function (t) {
          var n = Math.round(this.x * S.tileWidth - e.treeOffsetX)
              , r = Math.round(this.y * S.tileHeight - e.treeOffsetY - e.treeOffset);
          t.drawSprite(u, T.SHADOW_COLOR, o, n, r),
              t.globalAlpha = 1 - .6 * (this.coverLifting || 0),
              t.drawSprite(s, null, a, n, r),
              t.globalAlpha = 1
        }
      }
    }

    function l(t, e, n, r) {
      return {
        collider: {
          x: t,
          y: e,
          w: n,
          h: r
        },
        canCollideWith: !0
      }
    }

    function c(t, e, n, r) {
      for (var i = [], o = 4; o < arguments.length; o++)
        i[o - 4] = arguments[o];
      return w.assign.apply(void 0, [{
        type: t,
        id: e,
        x: n,
        y: r
      }].concat(i))
    }

    function f(t, e, n, r) {
      return c("apple", t, e, n, {
        interactive: !0
      }, k ? a(x.apple, x.apple_2, 4, 4, r) : {}, {
        bounds: {
          x: -8,
          y: -8,
          w: 16,
          h: 16
        }
      })
    }

    function p(t, e, n, r, i) {
      return c("sign", t, e, n, {
        interactive: !0
      }, k ? a(x.sign, x.sign_2, 11, 24, i) : {}, r, {
        options: r
      })
    }

    function h(t, e, n, r) {
      return c("rock", t, e, n, l(-.5, -.25, 1, .5), k ? a(x.rock, x.rock_2, 15, 15, r) : {})
    }

    function d(t, e, n, r) {
      return c("pumpkin", t, e, n, l(-.35, -.25, .7, .5), k ? a(x.pumpkin, x.pumpkin_2, 11, 15, r) : {})
    }

    function v(t, e, n, r) {
      return c("tree", t, e, n, l(-.5, 0, 1, .5), k ? s(r) : {})
    }

    function m(t, e, n, r) {
      return c("tree-crown", t, e, n, k ? u(r) : {})
    }

    function g(t, n, r, i) {
      return c("tree-stump", t, n, r, l(-.5, -.1, 1, .5), k ? a(C, D, e.treeOffsetX, e.treeOffsetY, i) : {})
    }

    function y(t, e, n, r) {
      return c("butterfly", t, e, n, k ? o(x.butterfly, x.butterfly2, r) : {})
    }

    function b(t, e, n, r) {
      var o = x.cloud.shadow
          , s = o.w / 2
          , u = o.h;
      return c("cloud", t, e, n, {
        vx: -.5,
        vy: 0
      }, {
        bounds: i(x.cloud, s, u)
      }, k ? a(x.cloud, x.cloud_2, s, u, r, T.CLOUD_SHADOW_COLOR) : {})
    }

    function _(t, e, n, r, i, o) {
      return "cloud" === t ? b(e, n, r, o) : "apple" === t ? f(e, n, r, o) : "rock" === t ? h(e, n, r, o) : "sign" === t ? p(e, n, r, i, o) : "tree" === t ? v(e, n, r, o) : "tree-crown" === t ? m(e, n, r, o) : "tree-stump" === t ? g(e, n, r, o) : "pumpkin" === t ? d(e, n, r, o) : "butterfly" === t ? y(e, n, r, o) : null
    }

    var w = t(getCodeName("Lodash"))
        , x = t("20")
        , E = t("28")
        , $ = t("23")
        , S = t("22")
        , T = t("25")
        , k = "undefined" != typeof window
        , M = 4294967295
        , A = [0, M]
        , C = {
      color: x.tree.stump,
      shadow: x.tree.stumpShadow
    }
        , D = {
      color: x.tree2.stump,
      shadow: x.tree2.stumpShadow,
      palette: x.tree2.palette
    };
    return e.treeOffsetX = 72,
        e.treeOffsetY = 162,
        e.treeOffset = 30,
        e.createApple = f,
        e.createSign = p,
        e.createRock = h,
        e.createPumpkin = d,
        e.createTree = v,
        e.createTreeCrown = m,
        e.createTreeStump = g,
        e.createButterfly = y,
        e.createCloud = b,
        e.createAnEntity = _,
        n.exports
  });
  System.registerDynamic("29", [getCodeName("Lodash"), "1e", "23", "22", "2a", "2b", "1f", "26", "2c", "2d"], !0, function (t, e, n) {
    "use strict";
    var r = this && this.__decorate || function (t, e, n, r) {
          var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(t, e, n, r);
          else
            for (var s = t.length - 1; s >= 0; s--)
              (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
          return o > 3 && a && Object.defineProperty(e, n, a),
              a
        }
        , i = this && this.__metadata || function (t, e) {
          if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
            return Reflect.metadata(t, e)
        }
        , o = t(getCodeName("Lodash"))
        , a = t("1e")
        , s = t("23")
        , u = t("22")
        , l = t("2a")
        , c = t("2b")
        , f = t("1f")
        , p = t("26")
        , h = t("2c")
        , d = t("2d")
        , v = function (t, e) {
      t.player = e,
          t.player.interactive = !1,
          s.setupSetTes(e)
    }
        , m = h.default.game
        , g = [5, 9, 10, 6, 6, 6, 6, 1]
        , y = function () {
      function t(t, e, n) {
        this.gameService = t,
            this.server = e,
            this.$timeout = n
      }

      return t.prototype.connected = function () {
        m.player = null ,
            m.map = new c.Map(0, 0),
            this.gameService.joined()
      }
          ,
          t.prototype.disconnected = function () {
            this.gameService.disconnected()
          }
          ,
          t.prototype.invalidVersion = function () {
            location.reload()
          }
          ,
          t.prototype.map = function (t) {
            m.baseTime = Date.now() - t.time,
                m.map = new c.Map(t.regionsX, t.regionsY)
          }
          ,
          t.prototype.subscribeRegion = function (t, e, n) {
            var r = new f.Region(0, t, e);
            r.load(n),
                m.map.setRegion(t, e, r)
          }
          ,
          t.prototype.unsubscribeRegion = function (t, e) {
            m.map.setRegion(t, e, null)
          }
          ,
          t.prototype.updateTile = function (t, e, n) {
            m.map.setTile(t, e, n)
          }
          ,
          t.prototype.myEntityId = function (t) {
            this.myId = t
          }
          ,
          t.prototype.addEntities = function (t) {
            var e = this;
            t.forEach(function (t) {
              var n = t[0]
                  , r = t[1]
                  , i = t[2]
                  , o = t[3]
                  , a = t[4]
                  , s = t[5]
                  , u = t[6]
                  , l = t[7];
              return e.addEntity(n, r, i, o, a, s, u, l)
            }),
                m.loaded = !0
          }
          ,
          t.prototype.addEntity = function (t, e, n, r, i, a, s, u) {
            var c;
            if ("pony" === e) {
              var f = n.info
                  , h = n.site
                  , d = this.gameService.account;
              d.settings.filterSwearWords && f.cmo && t !== this.myId && (f.cm = null ),
                  delete n.info,
                  delete n.site,
                  c = new l.Pony(t, f, u, h, m.paletteManager),
                  o.assign(c, n),
                  c.name = this.filterText(d, c.name, t === this.myId)
            } else
              c = p.createAnEntity(e, t, r, i, n, m.paletteManager);
            c ? (c.id = t,
                c.x = r,
                c.y = i,
                c.vx = a,
                c.vy = s,
                m.map.addEntity(c),
            t === this.myId && this.$timeout(function () {
              return v(m, c)
            })) : console.error("unknown entity type", e)
          }
          ,
          t.prototype.removeEntity = function (t) {
            m.map.removeEntity(t),
            m.isSelected(t) && this.$timeout(function () {
              m.isSelected(t) && m.select(null)
            }, 15e3)
          }
          ,
          t.prototype.updateEntity = function (t, e, n, r, i) {
            var o = m.map.findEntityById(t);
            o !== m.player && (o ? (o.x = e,
                o.y = n,
                o.vx = r,
                o.vy = i) : console.error("updateEntity: missing entity", t))
          }
          ,
          t.prototype.updateEntities = function (t, e) {
            var n = this;
            t.forEach(function (t) {
              var e = t[0]
                  , r = t[1]
                  , i = t[2]
                  , o = t[3]
                  , a = t[4];
              return n.updateEntity(e, r, i, o, a)
            }),
                e.forEach(function (t) {
                  return n.removeEntity(t)
                })
          }
          ,
          t.prototype.updateEntityOptions = function (t, e) {
            var n = m.map.findEntityById(t);
            n ? o.assign(n, e) : console.error("updateEntityOptions: missing entity", t)
          }
          ,
          t.prototype.says = function (t, e, n) {
            var r = m.map.findEntityById(t);
            if (r) {
              var i = r.id === this.myId
                  , o = this.gameService.account;
              if (!i && o.settings.filterCyrillic && d.containsCyrillic(e))
                return;
              if (r.ignored && 2 !== n)
                return;
              if (!m.camera.isVisible(r))
                return;
              r.says = {
                message: this.filterText(o, e, i),
                timer: u.SAYS_TIME,
                type: n
              }
            } else
              console.error("says: missing entity", t)
          }
          ,
          t.prototype.left = function () {
            m.player = null ,
                m.map = new c.Map(0, 0),
                this.gameService.left()
          }
          ,
          t.prototype.filterText = function (t, e, n) {
            var r = !n && (t.settings.filterSwearWords || this.gameService.server.filter);
            return r ? d.filterBadWords(e) : e
          }
          ,
          r([a.Method(), i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", void 0)], t.prototype, "map", null),
          r([a.Method({
            binary: [1, 1, [1]]
          }), i("design:type", Function), i("design:paramtypes", [Number, Number, Array]), i("design:returntype", void 0)], t.prototype, "subscribeRegion", null),
          r([a.Method({
            binary: [1, 1]
          }), i("design:type", Function), i("design:paramtypes", [Number, Number]), i("design:returntype", void 0)], t.prototype, "unsubscribeRegion", null),
          r([a.Method({
            binary: [3, 3, 1]
          }), i("design:type", Function), i("design:paramtypes", [Number, Number, Number]), i("design:returntype", void 0)], t.prototype, "updateTile", null),
          r([a.Method({
            binary: [5]
          }), i("design:type", Function), i("design:paramtypes", [Number]), i("design:returntype", void 0)], t.prototype, "myEntityId", null),
          r([a.Method({
            binary: [g]
          }), i("design:type", Function), i("design:paramtypes", [Array]), i("design:returntype", void 0)], t.prototype, "addEntities", null),
          r([a.Method({
            binary: g
          }), i("design:type", Function), i("design:paramtypes", [Number, String, Object, Number, Number, Number, Number, Number]), i("design:returntype", void 0)], t.prototype, "addEntity", null),
          r([a.Method({
            binary: [[5, 6, 6, 6, 6, 1], [5]]
          }), i("design:type", Function), i("design:paramtypes", [Array, Array]), i("design:returntype", void 0)], t.prototype, "updateEntities", null),
          r([a.Method(), i("design:type", Function), i("design:paramtypes", [Number, Object]), i("design:returntype", void 0)], t.prototype, "updateEntityOptions", null),
          r([a.Method(), i("design:type", Function), i("design:paramtypes", [Number, String, Number]), i("design:returntype", void 0)], t.prototype, "says", null),
          r([a.Method(), i("design:type", Function), i("design:paramtypes", []), i("design:returntype", void 0)], t.prototype, "left", null),
          t
    }();
    return e.ClientActions = y,
        n.exports
  });
  System.registerDynamic("2e", [getCodeName("BlueBird"), getCodeName("Lodash"), "1e", "23", "b", "2c", "29", "21"], !0, function (t, e, n) {
    "use strict";
    var r = t(getCodeName("BlueBird"))
        , i = t(getCodeName("Lodash"))
        , o = t("1e")
        , a = t("23")
        , s = t("b")
        , u = t("2c")
        , l = t("29")
        , c = t("21")
        , f = u.default.game
        , p = function () {
      function t(t, e, n) {
        this.$timeout = t,
            this.model = e,
            this.apply = n,
            this.playing = !1,
            this.joining = !1,
            this.offline = !1,
            this.protectionError = !1,
            this.servers = [],
            this.initialized = !1,
            this.updateStatus()
      }

      return Object.defineProperty(t.prototype, "selected", {
        get: function () {
          return f.selected
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "account", {
            get: function () {
              return this.model.account
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canPlay", {
            get: function () {
              return !!this.model.pony && !!this.model.pony.name && !this.joining && this.server && !this.server.offline
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.updateStatus = function () {
            var t = this;
            r.resolve().then(function () {
              return t.joining || t.playing || !t.account ? null : t.model.status().then(function (e) {
                t.initialized = !0,
                    t.offline = !1,
                    t.version = e.version,
                    i.merge(t.servers, e.servers),
                !t.server && t.account.settings.defaultServer && (t.server = t.servers.find(function (e) {
                  return e.id === t.account.settings.defaultServer
                }),
                c.debugOptions.autoJoin && setTimeout(function () {
                  return t.join(t.model.pony.id)
                }))
              }).catch(function (e) {
                t.offline = e.message === a.OFFLINE_ERROR,
                    t.protectionError = e.message === a.PROTECTION_ERROR
              })
            }).then(function () {
              return setTimeout(function () {
                return t.updateStatus()
              }, t.initialized ? 5e3 : 500)
            })
          }
          ,
          t.prototype.join = function (t) {
            var e = this;
            return this.playing || this.joining ? r.resolve() : (this.joining = !0,
                this.model.join(this.server.id, t).then(function (t) {
                  if (e.joining) {
                    var n = new o.ClientSocket(t);
                    n.client = new l.ClientActions(e, n.server, e.$timeout),
                        n.connect(),
                        f.startup(n, e.apply);
                    var r = s.start(f)
                        , i = r.promise
                        , a = r.cancel;
                    return e.cancelGameLoop = a,
                        i
                  }
                }).catch(function (t) {
                  throw e.left(),
                      t
                }))
          }
          ,
          t.prototype.leave = function () {
            f.socket && (f.socket.isConnected ? f.socket.server.leave() : f.socket.disconnect()),
                this.left()
          }
          ,
          t.prototype.joined = function () {
            var t = this;
            this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function () {
                  t.joining = !1,
                      t.playing = !0
                })
          }
          ,
          t.prototype.left = function () {
            var t = this;
            this.cancelGameLoop && (this.cancelGameLoop(),
                this.cancelGameLoop = null ),
                this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function () {
                  t.joining = !1,
                      t.playing = !1
                }),
                f.release()
          }
          ,
          t.prototype.disconnected = function () {
            var t = this;
            this.$timeout.cancel(this.disconnectedTimeout),
                this.disconnectedTimeout = this.$timeout(function () {
                  return t.left()
                }, 1e4)
          }
          ,
          t.$inject = ["$timeout", "model", "applyCallback"],
          t
    }();
    return e.GameService = p,
        n.exports
  });
  System.registerDynamic("2f", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      "undefined" != typeof Rollbar && Rollbar.configure({
        payload: {
          person: t
        }
      })
    }

    function i(t, e) {
      console.error(t),
      "undefined" != typeof Rollbar && Rollbar.error(t, e)
    }

    return e.configureUser = r,
        e.reportError = i,
        n.exports
  });
  System.registerDynamic("30", [getCodeName("BlueBird"), getCodeName("Lodash"), "31", "23", "2f", "21", "2d"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t.length ? t[0] : u.createDefaultPony()
    }

    function i(t, e) {
      return e.lastUsed && t.lastUsed ? e.lastUsed.localeCompare(t.lastUsed) : 0
    }

    function o() {
      try {
        return window.self !== window.top
      } catch (t) {
        return !0
      }
    }

    var a = t(getCodeName("BlueBird"))
        , s = t(getCodeName("Lodash"))
        , u = t("31")
        , l = t("23")
        , c = t("2f")
        , f = t("21")
        , p = t("2d")
        , h = {
      id: null,
      name: "none",
      url: null,
      icon: null,
      color: "#222"
    }
        , d = function () {
      function t(t) {
        var e = this;
        this.$http = t,
            this.loading = !0,
            this.ponies = [],
            this.saving = !1,
            this.sites = [h],
            this._pony = u.createDefaultPony(),
            this.accountPromise = this.getAccount().tap(function (t) {
              c.configureUser({
                id: t.id,
                username: t.name,
                custom: {
                  sri: window.__sri ? "FAIL" : "OK",
                  iframe: o()
                }
              }),
                  e.account = t,
                  e.sites = [h].concat(t.sites.map(p.toSocialSiteInfo)),
                  e.ponies = t.ponies.map(u.decompressPonyInfo).sort(i),
                  e.selectPony(r(e.ponies))
            }).catch(function (t) {
              "Access denied" !== t.message && console.error(t)
            }).finally(function () {
              return e.loading = !1
            })
      }

      return Object.defineProperty(t.prototype, "pony", {
        get: function () {
          return this._pony
        },
        enumerable: !0,
        configurable: !0
      }),
          t.prototype.selectPony = function (t) {
            this._pony = s.cloneDeep(t)
          }
          ,
          t.prototype.getAccount = function () {
            return l.toPromise(this.$http.post("/api/account", {}))
          }
          ,
          t.prototype.updateAccount = function (t) {
            var e = this;
            return l.toPromise(this.$http.post("/api/account-update", {
              account: t
            })).tap(function (t) {
              return s.merge(e.account, t)
            })
          }
          ,
          t.prototype.saveSettings = function (t) {
            var e = this;
            return l.toPromise(this.$http.post("/api/account-settings", {
              settings: t
            })).tap(function (t) {
              return s.merge(e.account, t)
            })
          }
          ,
          t.prototype.savePony = function (t) {
            var e = this;
            return this.saving ? a.reject(new Error("Saving in progress")) : (this.saving = !0,
                l.toPromise(this.$http.post("/api/pony/save", {
                  pony: t
                })).then(u.decompressPonyInfo).tap(function (n) {
                  s.remove(e.ponies, function (e) {
                    return e.id === t.id
                  }),
                      e.ponies.push(n),
                      e.ponies.sort(i),
                  e.pony === t && e.selectPony(n)
                }).finally(function () {
                  return e.saving = !1
                }))
          }
          ,
          t.prototype.removePony = function (t) {
            var e = this;
            return l.toPromise(this.$http.post("/api/pony/remove", {
              id: t.id
            })).then(function () {
              s.remove(e.ponies, function (e) {
                return e.id === t.id
              }),
              e.pony === t && e.selectPony(r(e.ponies))
            })
          }
          ,
          t.prototype.status = function () {
            return l.toPromise(this.$http.get("/api2/game/status"))
          }
          ,
          t.prototype.join = function (t, e) {
            return l.toPromise(this.$http.post("/api/game/join", {
              serverId: t,
              ponyId: e,
              version: f.version
            }))
          }
          ,
          t.$inject = ["$http"],
          t
    }();
    return e.Model = d,
        n.exports
  });
  System.registerDynamic("32", ["23"], !0, function (t, e, n) {
    "use strict";
    var r = t("23")
        , i = {
      left: 0,
      top: 0
    }
        , o = function () {
      function t(t) {
        this.rect = i,
            this.scrollLeft = 0,
            this.scrollTop = 0,
            this.startX = 0,
            this.startY = 0,
            this.button = 0,
            this.dragging = !1,
            window.navigator.pointerEnabled ? this.setupEvents(t, "pointerdown", "pointermove", "pointerup") : (this.setupEvents(t, "mousedown", "mousemove", "mouseup"),
                this.setupEvents(t, "touchstart", "touchmove", "touchend"))
      }

      return t.prototype.setupEvents = function (t, e, n, o) {
        var a = this;
        t.addEventListener(e, function (e) {
          if (!a.dragging) {
            "self" === a.relative ? (a.rect = t.getBoundingClientRect(),
                a.scrollLeft = -window.scrollX,
                a.scrollTop = -window.scrollY) : "parent" === a.relative ? (a.rect = t.parentElement.getBoundingClientRect(),
                a.scrollLeft = t.parentElement.scrollLeft,
                a.scrollTop = t.parentElement.scrollTop) : (a.rect = i,
                a.scrollLeft = 0,
                a.scrollTop = 0),
                a.dragging = !0,
                a.button = r.getButton(e),
                a.startX = r.getX(e),
                a.startY = r.getY(e),
                a.send(e, "start");
            var s, u = e, l = function (t) {
                  u = t,
                      t.preventDefault(),
                      a.send(t, "drag")
                }
                , c = function (t) {
                  r.getButton(t) === a.button && (r.isTouch(t) || (u = t),
                      s())
                }
                ;
            s = function () {
              a.send(u, "end"),
                  window.removeEventListener(n, l),
                  window.removeEventListener(o, c),
                  window.removeEventListener("blur", s),
                  a.dragging = !1
            }
                ,
                window.addEventListener(n, l),
                window.addEventListener(o, c),
                window.addEventListener("blur", s),
                e.stopPropagation(),
            a.prevent && e.preventDefault()
          }
        })
      }
          ,
          t.prototype.send = function (t, e) {
            if (this.drag) {
              var n = r.getX(t)
                  , i = r.getY(t);
              this.drag({
                $event: {
                  event: t,
                  type: e,
                  x: n - this.rect.left + this.scrollLeft,
                  y: i - this.rect.top + this.scrollTop,
                  dx: n - this.startX,
                  dy: i - this.startY
                }
              })
            }
          }
          ,
          t
    }();
    return e.AgDrag = o,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = ["$parse", "applyCallback", function (t, e) {
          return {
            restrict: "A",
            compile: function (n, r) {
              var i = t(r.agDrag);
              return function (t, n) {
                var a = new o(n[0]);
                a.drag = function (n) {
                  return e(function () {
                    i(t, n)
                  })
                }
                    ,
                    a.relative = r.agDragRelative,
                    a.prevent = "true" === r.agDragPrevent
              }
            }
          }
        }
        ],
        n.exports
  });
  System.registerDynamic("33", [], !0, function (t, e, n) {
    return n.exports = '<div ng-class="{ disabled: vm.isDisabled }" class="color-picker"><div ng-style="{ background: vm.bg }" class="color-picker-box"></div><div class="input-group"><input type="text" ng-focus="vm.focus($event)" ng-blur="vm.close()" ng-model="vm.inputColor" ng-disabled="vm.isDisabled" spellcheck="false" ng-change="vm.inputChanged()" class="form-control color-picker-input"><div ng-class="{ open: vm.isOpen }" class="input-group-btn"><button ng-mousedown="vm.toggleOpen()" ng-disabled="vm.isDisabled" class="btn btn-default dropdown-toggle"><span class="caret"></span></button><div uib-dropdown-menu ng-mousedown="vm.stopEvent($event)" class="dropdown-menu dropdown-menu-right color-picker-menu"><div class="color-picker-content"><div ag-drag="vm.dragSV($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-sv"><div ng-style="{ background: vm.hue }" class="color-picker-sv-bg"><div class="color-picker-sv-overlay-white"><div class="color-picker-sv-overlay-black"></div></div></div><div ng-style="{ left: vm.svLeft + \'%\', top: vm.svTop + \'%\' }" class="color-wheel-circle-sv"><div></div></div></div><div ag-drag="vm.dragHue($event)" ag-drag-relative="self" ag-drag-prevent="true" class="color-picker-hue"><div ng-style="{ top: vm.hueTop + \'%\' }" class="color-wheel-circle-hue"><div></div></div></div></div></div></div></div></div>',
        n.exports
  });
  System.registerDynamic("34", ["23", "35", "33"], !0, function (t, e, n) {
    "use strict";
    var r = t("23")
        , i = t("35")
        , o = 175
        , a = function () {
      function t(t, e) {
        var n = this;
        this.$timeout = t,
            this.$document = e,
            this.s = 0,
            this.v = 0,
            this.h = 0,
            this.lastColor = "",
            this.closeHandler = function () {
              return n.close()
            }
      }

      return Object.defineProperty(t.prototype, "inputColor", {
        get: function () {
          return this.isDisabled && this.disabledColor ? this.disabledColor : this.color
        },
        set: function (t) {
          this.isDisabled || (this.color = t)
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "bg", {
            get: function () {
              return i.default.parseWithAlpha(this.inputColor, 1).css()
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "svLeft", {
            get: function () {
              return this.updateHsv(),
              100 * this.s
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "svTop", {
            get: function () {
              return this.updateHsv(),
              100 * (1 - this.v)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "hueTop", {
            get: function () {
              return this.updateHsv(),
              100 * this.h / 360
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "hue", {
            get: function () {
              return this.updateHsv(),
                  i.default.fromHsva(this.h, 1, 1, 1).css()
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.focus = function (t) {
            this.isOpen = !0,
                t.target.select()
          }
          ,
          t.prototype.dragSV = function (t) {
            var e = t.event
                , n = t.x
                , i = t.y;
            e.preventDefault(),
                this.updateHsv(),
                this.s = r.clamp(n / o, 0, 1),
                this.v = 1 - r.clamp(i / o, 0, 1),
                this.updateColor()
          }
          ,
          t.prototype.dragHue = function (t) {
            var e = t.event
                , n = t.y;
            e.preventDefault(),
                this.updateHsv(),
                this.h = r.clamp(360 * n / o, 0, 360),
                this.updateColor()
          }
          ,
          t.prototype.updateHsv = function () {
            if (this.lastColor !== this.color) {
              var t = i.default.parseWithAlpha(this.color, 1).hsva(this.h)
                  , e = t.h
                  , n = t.s
                  , r = t.v;
              this.h = e,
                  this.s = n,
                  this.v = r,
                  this.lastColor = this.color
            }
          }
          ,
          t.prototype.updateColor = function () {
            var t = i.default.fromHsva(this.h, this.s, this.v, 1).css()
                , e = this.color !== t;
            this.lastColor = this.color = t,
            e && this.changed && this.changed({
              $value: t
            })
          }
          ,
          t.prototype.inputChanged = function () {
            var t = this;
            this.$timeout(function () {
              t.changed && t.changed({
                $value: t.color
              })
            })
          }
          ,
          t.prototype.stopEvent = function (t) {
            t.stopPropagation(),
                t.preventDefault()
          }
          ,
          t.prototype.open = function () {
            var t = this;
            this.isOpen || this.$timeout(function () {
              t.isOpen = !0,
                  t.$document.bind("mousedown", t.closeHandler),
                  t.$document.bind("touchstart", t.closeHandler)
            })
          }
          ,
          t.prototype.close = function () {
            var t = this;
            this.isOpen && (this.$timeout(function () {
              return t.isOpen = !1
            }),
                this.$document.unbind("mousedown", this.closeHandler),
                this.$document.unbind("touchstart", this.closeHandler))
          }
          ,
          t.prototype.toggleOpen = function () {
            this.isOpen ? this.close() : this.open()
          }
          ,
          t.$inject = ["$timeout", "$document"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            color: "=",
            isDisabled: "<",
            disabledColor: "<",
            changed: "&"
          },
          controller: a,
          controllerAs: "vm",
          template: t("33")
        },
        n.exports
  });
  System.registerDynamic("36", [], !0, function (t, e, n) {
    "use strict";
    var r = function () {
      function t() {
      }

      return t.prototype.toggle = function () {
        this.disabled || (this.checked = !this.checked,
        this.changed && this.changed({
          $value: this.checked
        }))
      }
          ,
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            checked: "=",
            disabled: "<",
            icon: "@",
            changed: "&"
          },
          controller: r,
          controllerAs: "vm",
          template: '\n\t\t<div class="check-box" ng-class="{ disabled: vm.disabled }" ng-click="vm.toggle()">\n\t\t\t<i class="fa fa-fw fa-lg" ng-if="vm.checked" ng-class="vm.icon || \'fa-check\'"></i>\n\t\t</div>\n\t'
        },
        n.exports
  });
  System.registerDynamic("37", [], !0, function (t, e, n) {
    return n.exports = '<div class="row form-group"><div class="col-sm-4"><check-box ng-if="vm.hasLock &amp;&amp; !vm.nonLockable" checked="vm.locked" icon="fa-lock" changed="vm.lockChanged($value)" title="Automatic color" class="lock-box"></check-box><label class="control-label text-muted">{{vm.label || \'Color\'}}</label></div><div class="col-sm-8"><color-picker color="vm.fill" is-disabled="vm.locked" changed="vm.fillChanged($value)"></color-picker></div></div><div ng-if="!vm.outlineHidden" class="row form-group"><div class="col-sm-4"><check-box checked="vm.outlineLocked" icon="fa-lock" changed="vm.outlineLockChanged($value)" title="Automatic outline" class="lock-box"></check-box><label class="control-label text-muted">Outline</label></div><div class="col-sm-8"><color-picker color="vm.outline" is-disabled="vm.outlineLocked"></color-picker></div></div>',
        n.exports
  });
  System.registerDynamic("38", ["39", "37"], !0, function (t, e, n) {
    "use strict";
    var r = t("39")
        , i = function () {
      function t() {
      }

      return t.prototype.fillChanged = function (t) {
        this.outlineLocked && (this.outline = r.fillToOutline(t))
      }
          ,
          t.prototype.lockChanged = function (t) {
            t && (this.fill = this.base,
                this.outlineLockChanged(this.outlineLocked))
          }
          ,
          t.prototype.outlineLockChanged = function (t) {
            t && (this.outline = r.fillToOutline(this.fill))
          }
          ,
          t.prototype.$onChanges = function (t) {
            this.locked && t.base && (this.fill = t.base.currentValue,
                this.outlineLockChanged(this.outlineLocked))
          }
          ,
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            base: "<",
            fill: "=",
            locked: "=",
            hasLock: "@locked",
            nonLockable: "<",
            outline: "=",
            outlineLocked: "=",
            outlineHidden: "<"
          },
          controller: i,
          controllerAs: "vm",
          template: t("37")
        },
        n.exports
  });
  System.registerDynamic("3a", ["23", "35", "3b"], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (e && 0 !== e.w && 0 !== e.h)
        if (0 === t.w || 0 === t.h)
          t.x = e.ox,
              t.y = e.oy,
              t.w = e.w,
              t.h = e.h;
        else {
          var n = Math.min(t.x, e.ox)
              , r = Math.min(t.y, e.oy);
          t.w = Math.max(t.x + t.w, e.ox + e.w) - n,
              t.h = Math.max(t.y + t.h, e.oy + e.h) - r,
              t.x = n,
              t.y = r
        }
    }

    function i(t, e) {
      r(t, e.fill),
          r(t, e.outline),
          r(t, e.extra)
    }

    function o(t, e, n, r, i) {
      var o = Math.round((t.canvas.width / 2 - i.w) / 2 - i.x)
          , a = Math.round((t.canvas.height / 2 - i.h) / 2 - i.y);
      e.fill && l.drawColoredSprite(t, e.fill, n, o, a),
      e.outline && l.drawColoredSprite(t, e.outline, r, o, a),
      e.extra && l.drawSprite(t, e.extra, o, a)
    }

    function a(t, e) {
      return Array.isArray(t) ? t[e] : t
    }

    var s = t("23")
        , u = t("35")
        , l = t("3b")
        , c = 52
        , f = function () {
      function t(t, e) {
        var n = this;
        this.$element = e,
            t.$watch("vm.sprite", function () {
              return n.redraw()
            }),
            t.$watch("vm.circle", function () {
              return n.redraw()
            });
        for (var r = 0; r < 6; r++)
          t.$watch("vm.fill[" + r + "]", function () {
            return n.redraw()
          }),
              t.$watch("vm.outline[" + r + "]", function () {
                return n.redraw()
              })
      }

      return t.prototype.redraw = function () {
        var t = this;
        clearTimeout(this.timeout),
            this.timeout = setTimeout(function () {
              var e = t.$element[0].firstChild;
              e.width = c,
                  e.height = c;
              var n = e.getContext("2d");
              n.save(),
                  n.clearRect(0, 0, e.width, e.height);
              var r = t.sprite;
              if (r) {
                t.circle && (n.fillStyle = u.default.parse(t.circle).css(),
                    n.beginPath(),
                    n.arc(e.width / 2, e.height / 2, e.width / 3, 0, 2 * Math.PI),
                    n.fill()),
                    n.scale(2, 2),
                    s.disableImageSmoothing(n);
                var l = {
                  x: 0,
                  y: 0,
                  w: 0,
                  h: 0
                };
                Array.isArray(r) ? (r.forEach(function (t) {
                  return i(l, t)
                }),
                    r.forEach(function (e, r) {
                      return o(n, e, a(t.fill, r), a(t.outline, r), l)
                    })) : (i(l, r),
                    o(n, r, a(t.fill, 0), a(t.outline, 0), l))
              }
              n.restore()
            })
      }
          ,
          t.prototype.$onInit = function () {
            this.redraw()
          }
          ,
          t.prototype.$onChanges = function () {
            this.redraw()
          }
          ,
          t.$inject = ["$scope", "$element"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            sprite: "<",
            fill: "<",
            outline: "<",
            circle: "<"
          },
          controller: f,
          controllerAs: "vm",
          template: '<canvas></canvas><i ng-if="!vm.sprite" class="fa fa-fw fa-times"></i>'
        },
        n.exports
  });
  System.registerDynamic("3c", [], !0, function (t, e, n) {
    return n.exports = '<div class="selection-list"><div class="selection-list-content"><sprite-box ng-repeat="i in vm.sprites track by $index" ng-class="{ active: vm.selected === $index }" ng-click="vm.selected = $index" sprite="i" fill="vm.fill" outline="vm.outline" circle="vm.circle" class="selection-item"></sprite-box></div></div>',
        n.exports
  });
  System.registerDynamic("3d", ["3c"], !0, function (t, e, n) {
    "use strict";
    var r = function () {
      function t() {
      }

      return t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            selected: "=",
            sprites: "<",
            fill: "<",
            outline: "<",
            circle: "<"
          },
          controller: r,
          controllerAs: "vm",
          template: t("3c")
        },
        n.exports
  });
  System.registerDynamic("3e", [], !0, function (t, e, n) {
    return n.exports = '<div ng-if="vm.compact"><div class="row form-group"><div class="col-sm-4"><label class="control-label">{{vm.label}}</label></div><div class="col-sm-8"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="!vm.compact"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">{{vm.label}}</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="vm.set.type &amp;&amp; vm.sets[vm.set.type].length &gt; 1"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Color pattern</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.pattern" sprites="vm.sets[vm.set.type]" fill="vm.exampleFills" outline="vm.exampleOutlines"></sprite-selection></div></div></div><fill-outline ng-repeat="c in vm.set.fills track by $index" ng-if="vm.patternColors &gt; $index" label="Color {{$index + 1}}" base="vm.base" outline-hidden="vm.outlineHidden" fill="vm.set.fills[$index]" locked="vm.set.lockFills[$index]" non-lockable="$index === 0 &amp;&amp; vm.nonLockable" outline="vm.set.outlines[$index]" outline-locked="vm.set.lockOutlines[$index]"></fill-outline>',
        n.exports
  });
  System.registerDynamic("3f", ["3e"], !0, function (t, e, n) {
    "use strict";
    var r = function () {
      function t() {
        this.exampleFills = ["Orange", "DodgerBlue", "LimeGreen", "Orchid", "crimson", "Aquamarine"],
            this.exampleOutlines = ["Chocolate", "SteelBlue", "ForestGreen", "DarkOrchid", "darkred", "DarkTurquoise"]
      }

      return Object.defineProperty(t.prototype, "patternColors", {
        get: function () {
          var t = this.set && this.sets && this.sets[this.set.type] && this.sets[this.set.type][this.set.pattern];
          return t ? t.length : this.nonLockable ? 1 : 0
        },
        enumerable: !0,
        configurable: !0
      }),
          t.prototype.$onChanges = function () {
            this.sprites = this.sets ? this.sets.map(function (t) {
              return t ? t[0] : null
            }) : null
          }
          ,
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            base: "<",
            set: "<",
            sets: "<",
            outlineHidden: "<",
            nonLockable: "<",
            compact: "<"
          },
          controller: r,
          controllerAs: "vm",
          template: t("3e")
        },
        n.exports
  });
  System.registerDynamic("40", ["35"], !0, function (t, e, n) {
    "use strict";
    var r = t("35")
        , i = function () {
      function t() {
      }

      return t.prototype.$onChanges = function (t) {
        if (t.width || t.height) {
          this.rows = [];
          for (var e = 0; e < this.height; e++) {
            this.rows[e] = [];
            for (var n = 0; n < this.width; n++)
              this.rows[e][n] = n + this.width * e
          }
        }
      }
          ,
          t.prototype.draw = function (t) {
            this.bitmap && ("eraser" === this.tool ? this.bitmap[t] = "" : "brush" === this.tool ? this.bitmap[t] = r.default.parse(this.bitmap[t]).equal(r.default.parse(this.color)) ? "" : this.color : "eyedropper" === this.tool && (this.color = this.bitmap[t]))
          }
          ,
          t.prototype.colorAt = function (t) {
            return this.bitmap[t] ? r.default.parse(this.bitmap[t]).css() : ""
          }
          ,
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            tool: "=",
            color: "=",
            bitmap: "<",
            width: "<",
            height: "<"
          },
          controller: i,
          controllerAs: "vm",
          template: '<div class="bitmap-box">\n\t\t<div class="bitmap-box-row clearfix" ng-repeat="row in vm.rows">\n\t\t\t<div class="bitmap-box-cell" ng-repeat="cell in row" ng-style="{ background: vm.colorAt(cell) }" ng-mousedown="vm.draw(cell)"></div>\n\t\t</div>\n\t</div>'
        },
        n.exports
  });
  System.registerDynamic("41", ["23", "31", "42", "43", "44"], !0, function (t, e, n) {
    "use strict";
    var r = t("23")
        , i = t("31")
        , o = t("42")
        , a = t("43")
        , s = t("44")
        , u = 3
        , l = function () {
      function t(t) {
        this.$element = t
      }

      return t.prototype.$onInit = function () {
        var t = this;
        return this.canvas = this.$element[0].querySelector("canvas"),
            this.interval = setInterval(function () {
              return t.draw()
            }, 1e3 / 24),
            s.loadSpriteSheets()
      }
          ,
          t.prototype.$onDestroy = function () {
            clearInterval(this.interval)
          }
          ,
          t.prototype.draw = function () {
            var t = u * r.getPixelRatio();
            o.resizeCanvasToElementSize(this.canvas);
            var e = Math.round(this.canvas.width / t)
                , n = Math.round(this.canvas.height / t);
            this.buffer = this.buffer || r.createCanvas(e, n),
                o.resizeCanvas(this.buffer, e, n);
            var s = this.buffer.getContext("2d")
                , l = Math.round(e / 2)
                , c = Math.round(n / 2 + 28);
            this.noBackground ? s.clearRect(0, 0, e, n) : (s.fillStyle = "LightGreen",
                s.fillRect(0, 0, e, n)),
            this.pony && a.drawPony2D(s, i.toRenderInfo(this.pony), this.state || a.createDefaultPonyState(), l, c, !1);
            var f = this.canvas.getContext("2d");
            this.noBackground && f.clearRect(0, 0, this.canvas.width, this.canvas.height),
                f.save(),
                r.disableImageSmoothing(f),
                f.scale(t, t),
                f.drawImage(this.buffer, 0, 0),
                f.restore()
          }
          ,
          t.$inject = ["$element"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: l,
          controllerAs: "vm",
          bindings: {
            pony: "<",
            state: "<",
            noBackground: "<"
          },
          template: '<canvas class="character-preview"></canvas>'
        },
        n.exports
  });
  System.registerDynamic("45", [], !0, function (t, e, n) {
    return n.exports = '<div class="chat-box"><i ng-click="vm.toggle($event)" class="fa fa-fw fa-comment chat-open-button game-button"></i><div ng-show="vm.isOpen" class="chat-input-box"><input ng-model="vm.message" ng-keydown="vm.keydown($event)" maxlength="{{::vm.maxSayLength}}" class="chat-input"><i ng-click="vm.send()" class="fa fa-fw fa-angle-double-right chat-send-button game-button"></i></div></div>',
        n.exports
  });
  System.registerDynamic("46", ["22", "2c", "45"], !0, function (t, e, n) {
    "use strict";
    var r = t("22")
        , i = t("2c")
        , o = i.default.game
        , a = function () {
      function t(t, e) {
        var n = this;
        this.maxSayLength = r.SAY_MAX_LENGTH,
            this.isOpen = !1,
            this.input = e[0].querySelector(".chat-input"),
            o.onChat = function () {
              return t(function () {
                return n.chat()
              })
            }
            ,
            o.onCommand = function () {
              return t(function () {
                return n.command()
              })
            }
            ,
            o.onCancel = function () {
              return !!n.isOpen && !!t(function () {
                    return n.close()
                  })
            }
      }

      return t.prototype.send = function () {
        var t = (this.message || "").trim();
        this.close(),
        o.player && t && o.socket.server.say(t)
      }
          ,
          t.prototype.keydown = function (t) {
            13 === t.keyCode ? this.send() : 27 === t.keyCode && this.close()
          }
          ,
          t.prototype.chat = function () {
            this.isOpen ? this.send() : this.open()
          }
          ,
          t.prototype.command = function () {
            this.isOpen || (this.chat(),
                this.message = "/")
          }
          ,
          t.prototype.open = function () {
            var t = this;
            this.isOpen || (this.isOpen = !0,
                setTimeout(function () {
                  return t.input.focus()
                }))
          }
          ,
          t.prototype.close = function () {
            this.isOpen && (this.input.blur(),
                this.isOpen = !1,
                this.message = null )
          }
          ,
          t.prototype.toggle = function (t) {
            this.isOpen ? this.close() : this.open()
          }
          ,
          t.$inject = ["$timeout", "$element"],
          t
    }();
    return e.ChatBox = a,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = {
          controller: a,
          controllerAs: "vm",
          template: t("45")
        },
        n.exports
  });
  System.registerDynamic("47", [], !0, function (t, e, n) {
    return n.exports = '<div uib-dropdown is-open="vm.dropdownOpen" class="settings-box"><span id="clock" class="settings-clock">00:00</span><i uib-dropdown-toggle class="fa fa-fw fa-gear game-button"></i><ul uib-dropdown-menu ng-if="vm.dropdownOpen" class="dropdown-menu pull-right settings-box-menu"><li class="dropdown-header">{{vm.server}}</li><li ng-mouseup="$event.stopPropagation(); $event.preventDefault();" ng-click="$event.stopPropagation(); $event.preventDefault();"><a ng-click="vm.changeScale()"><i class="fa fa-fw fa-search"></i> Change scale (x{{vm.scale}})</a></li><li class="divider"></li><li><a ng-click="vm.leave()"><i class="fa fa-fw fa-sign-out"></i> Leave</a></li></ul></div>',
        n.exports
  });
  System.registerDynamic("48", ["2c", "47"], !0, function (t, e, n) {
    "use strict";
    var r = t("2c")
        , i = r.default.game
        , o = function () {
      function t(t, e) {
        var n = this;
        this.$timeout = t,
            this.gameService = e,
            this.touchstart = function () {
              n.dropdownOpen && n.$timeout(function () {
                return n.dropdownOpen = !1
              })
            }
      }

      return Object.defineProperty(t.prototype, "scale", {
        get: function () {
          return i.scale
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "server", {
            get: function () {
              return this.gameService.server.name
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.$onInit = function () {
            document.getElementById("canvas").addEventListener("touchstart", this.touchstart)
          }
          ,
          t.prototype.$onDestroy = function () {
            document.getElementById("canvas").removeEventListener("touchstart", this.touchstart)
          }
          ,
          t.prototype.leave = function () {
            this.gameService.leave()
          }
          ,
          t.prototype.changeScale = function () {
            i.changeScale()
          }
          ,
          t.$inject = ["$timeout", "gameService"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: o,
          controllerAs: "vm",
          template: t("47")
        },
        n.exports
  });
  System.registerDynamic("49", [], !0, function (t, e, n) {
    return n.exports = '<li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li>',
        n.exports
  });
  System.registerDynamic("4a", ["49"], !0, function (t, e, n) {
    "use strict";
    var r = function () {
      function t(t, e) {
        this.model = e,
            t.addClass("account-button")
      }

      return t.$inject = ["$element", "model"],
          t
    }();
    return e.AccountButton = r,
        Object.defineProperty(e, "__esModule", {
          value: !0
        }),
        e.default = {
          controller: r,
          controllerAs: "vm",
          template: t("49")
        },
        n.exports
  });
  System.registerDynamic("4b", [], !0, function (t, e, n) {
    return n.exports = '<nav class="navbar navbar-inverse"><div class="navbar-header navbar-main"><button ng-click="vm.menuExpanded = !vm.menuExpanded" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a ng-if="vm.logo &amp;&amp; !vm.isActive(\'/\')" href="/" class="pixelart main-logo-small hidden-xs"><img src="/images/logo-small.png" width="287" height="65"></a></div><div uib-collapse="!vm.menuExpanded" class="collapse navbar-collapse"><div ng-if="vm.model.loading" style="font-size: 20px; padding: 10px 20px;" class="navbar-right text-muted"><i class="fa fa-fw fa-spin fa-spinner"></i></div><form ng-if="!vm.model.loading &amp;&amp; !vm.model.account" class="navbar-form navbar-right"><div uib-dropdown class="button-group"><button uib-dropdown-toggle class="btn btn-default">Sign in <span class="caret"></span></button><ul uib-dropdown-menu><li ng-repeat="p in vm.providers"><a ng-href="{{p.url}}" target="_self"><i ng-class="p.icon" class="fa fa-fw"></i> {{p.name}}</a></li></ul></div></form><ul class="nav navbar-nav navbar-right"><ng-transclude></ng-transclude><li ng-repeat="i in vm.items" ng-class="{ active: vm.isActive(i.href) }" class="navbar-link"><a ng-href="{{i.href}}">{{i.name}}</a></li><li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li></ul></div></nav>',
        n.exports
  });
  System.registerDynamic("4c", ["21", "4b"], !0, function (t, e, n) {
    "use strict";
    var r = t("21")
        , i = function () {
      function t(t) {
        this.$location = t,
            this.items = [],
            this.providers = r.oauthProviders.filter(function (t) {
              return !t.disabled
            })
      }

      return t.prototype.isActive = function (t) {
        return t === this.$location.absUrl().substr(8).replace(/^[^\/]+/, "")
      }
          ,
          t.$inject = ["$location"],
          t
    }()
        , o = function () {
      function t() {
      }

      return t.prototype.$onInit = function () {
        this.menuBar.items.push(this)
      }
          ,
          t.prototype.$onDestroy = function () {
            this.menuBar.items.splice(this.menuBar.items.indexOf(this), 1)
          }
          ,
          t
    }();
    return e.menuBar = {
      transclude: !0,
      bindings: {
        logo: "<",
        model: "<"
      },
      controller: i,
      controllerAs: "vm",
      template: t("4b")
    },
        e.menuItem = {
          require: {
            menuBar: "^menuBar"
          },
          bindings: {
            href: "@",
            name: "@"
          },
          controller: o,
          controllerAs: "vm"
        },
        n.exports
  });
  System.registerDynamic("4d", [], !0, function (t, e, n) {
    return n.exports = '<div class="sign-in-box center-block"><div class="text-center"><p class="lead">Sign in with your social site account</p><div class="sign-in-box-providers"><a ng-repeat="p in vm.providers" ng-href="{{p.url}}" target="_self" title="{{p.name}}" ng-style="{ borderBottomColor: p.disabled ? \'#666\' : p.color }" ng-class="{ disabled: p.disabled }" class="btn btn-lg btn-provider"><i ng-class="p.icon" class="fa fa-fw fa-lg"></i></a></div></div></div>',
        n.exports
  });
  System.registerDynamic("4e", ["21", "4d"], !0, function (t, e, n) {
    "use strict";
    var r = t("21")
        , i = function () {
      function t() {
        this.providers = r.oauthProviders
      }

      return t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          controller: i,
          controllerAs: "vm",
          template: t("4d")
        },
        n.exports
  });
  System.registerDynamic("4f", [], !0, function (t, e, n) {
    return n.exports = '<div class="play-box"><div uib-dropdown class="form-group btn-group dropdown"><button ng-if="!vm.joining" ng-click="vm.play()" ng-disabled="!vm.canPlay" type="button" class="btn btn-lg btn-success play-box-btn"><span ng-if="vm.server"><strong>{{vm.label || \'Play\'}}</strong> on<span> {{vm.server.name}}</span></span><span ng-if="!vm.server" class="text-faded">select server to play</span></button><button ng-if="vm.joining" ng-click="vm.cancel()" type="button" class="btn btn-lg btn-success play-box-btn"><i class="fa fa-spinner fa-spin"></i> Cancel</button><button uib-dropdown-toggle class="btn btn-lg btn-success"><span class="caret"></span></button><ul uib-dropdown-menu style="width: 100%;" class="dropdown-menu"><li ng-repeat="s in vm.servers"><a ng-click="vm.server = s"><div ng-if="s.offline" class="pull-right text-unsafe">offline</div><div ng-if="!s.offline" class="pull-right text-muted">online ({{s.online}})</div><strong>{{s.name}}</strong><div class="text-muted text-wrap">{{s.desc}}</div></a></li></ul></div><div ng-if="vm.server.offline" class="form-group"><div class="alert alert-info">Selected server is offline, try again later</div></div><div ng-if="vm.offline" class="form-group"><div class="alert alert-info">Server is offline, try again later</div></div><div ng-if="vm.invalidVersion &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">Your client version is outdated, <a ng-click="vm.reload()" class="alert-link">reload</a> to be able to play.</div></div><div ng-if="vm.protectionError &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">DDOS protection error, <a ng-click="vm.reload()" class="alert-link">reload</a> to continue.</div></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div ng-if="vm.server" class="form-group text-left"><h4>Server rules</h4><p class="text-muted">{{vm.server.desc}}</p></div></div>',
        n.exports
  });
  System.registerDynamic("50", ["23", "21", "4f"], !0, function (t, e, n) {
    "use strict";
    var r = t("23")
        , i = t("21")
        , o = function () {
      function t(t, e, n) {
        this.$location = t,
            this.gameService = e,
            this.model = n,
            this.handleError = r.errorHandler(this)
      }

      return Object.defineProperty(t.prototype, "server", {
        get: function () {
          return this.gameService.server
        },
        set: function (t) {
          this.gameService.server = t
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "servers", {
            get: function () {
              return this.gameService.servers
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "offline", {
            get: function () {
              return this.gameService.offline
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "invalidVersion", {
            get: function () {
              return this.gameService.version && this.gameService.version !== i.version
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "protectionError", {
            get: function () {
              return this.gameService.protectionError
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "joining", {
            get: function () {
              return this.gameService.joining
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canPlay", {
            get: function () {
              return this.server && this.gameService.canPlay
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.play = function () {
            var t = this;
            this.canPlay && (this.error = null ,
                this.model.savePony(this.model.pony).then(function (e) {
                  return t.gameService.join(e.id)
                }).catch(this.handleError))
          }
          ,
          t.prototype.cancel = function () {
            this.gameService.leave()
          }
          ,
          t.prototype.reload = function () {
            location.reload(!0)
          }
          ,
          t.$inject = ["$location", "gameService", "model"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            label: "@",
            error: "=?"
          },
          controller: o,
          controllerAs: "vm",
          template: t("4f")
        },
        n.exports
  });
  (function () {
    var i = System.amdDefine;
    !function (t, e) {
      "object" == typeof n && "undefined" != typeof r ? r.exports = e() : "function" == typeof i && i.amd ? i("51", [], e) : t.moment = e()
    }(this, libraries.momentJS)
  })();
  (function () {
    var e = System.amdDefine;
    e("52", ["51"], function (t) {
      return t
    })
  })();
  System.registerDynamic("53", [], !0, function (t, e, n) {
    "use strict";
    !function (t) {
      t[t.None = 0] = "None",
          t[t.Ignore = 1] = "Ignore",
          t[t.Unignore = 2] = "Unignore"
    }(e.PlayerAction || (e.PlayerAction = {}));
    e.PlayerAction;
    !function (t) {
      t[t.None = 0] = "None",
          t[t.Report = 1] = "Report",
          t[t.Mute = 2] = "Mute",
          t[t.Unmute = 3] = "Unmute",
          t[t.Shadow = 4] = "Shadow",
          t[t.Unshadow = 5] = "Unshadow",
          t[t.Timeout = 6] = "Timeout"
    }(e.ModAction || (e.ModAction = {}));
    e.ModAction;
    return n.exports
  });
  System.registerDynamic("54", [getCodeName("Lodash")], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      return t && a.includes(t.roles, e)
    }

    function i(t) {
      return r(t, "admin") || r(t, "superadmin")
    }

    function o(t) {
      return r(t, "mod") || i(t)
    }

    var a = t(getCodeName("Lodash"));
    return e.hasRole = r,
        e.isAdmin = i,
        e.isMod = o,
        n.exports
  });
  System.registerDynamic("2a", [getCodeName("gl-matrix"), "23", "22", "43", "31", "5c"], !0, function (t, e, n) {
    "use strict";
    var r = t(getCodeName("gl-matrix"))
        , i = t("23")
        , o = t("22")
        , a = t("43")
        , s = t("31")
        , u = t("5c")
        , l = r.mat2d.create()
        , c = r.vec2.create()
        , f = function () {
      function t(t, e, n, r, o) {
        this.id = t,
            this.site = r,
            this.type = "pony",
            this.x = 0,
            this.y = 0,
            this.vx = 0,
            this.vy = 0,
            this.canCollide = !0,
            this.collisions = !0,
            this.collider = {
              x: -.4,
              y: -.2,
              w: .8,
              h: .4
            },
            this.interactive = !0,
            this.selected = !1,
            this.right = !1,
            this.walking = !1,
            this.nextBlink = 0,
            this.time = 5 * Math.random(),
            this.state = a.createDefaultPonyState();
        var u = a.PONY_WIDTH
            , l = a.PONY_HEIGHT;
        this.bounds = {
          x: -u / 2,
          y: -l,
          w: u,
          h: l + 5
        },
            this.interactBounds = {
              x: -20,
              y: -50,
              w: 40,
              h: 50
            };
        var c = s.decompressPonyInfo(e);
        this.info = s.toRenderInfo(c),
            this.pal = s.toPalette(c, o),
            this.right = i.hasFlag(n, 1)
      }

      return t.prototype.update = function (t) {
        this.time += t,
        this.time - this.nextBlink > 1 && (this.nextBlink = this.time + 2 * Math.random() + 3),
            this.walking = !(!this.vx && !this.vy),
            this.right = i.isFacingRight(this.vx, this.right);
        var e = Math.floor((this.time - this.nextBlink) * o.frameTime);
        this.state.blinkFrame = a.BLINK_FRAMES[e] || 1,
            this.state.animation = this.walking ? u.trot : u.stand,
            this.state.animationFrame = Math.floor(this.time * o.frameTime) % this.state.animation.frames
      }
          ,
          t.prototype.getTransform = function () {
            return r.mat2d.identity(l),
                r.mat2d.translate(l, l, r.vec2.set(c, Math.round(this.x * o.tileWidth), Math.round(this.y * o.tileHeight))),
                r.mat2d.scale(l, l, r.vec2.set(c, this.right ? -1 : 1, 1)),
                l
          }
          ,
          t.prototype.draw = function (t) {
            t.transform = this.getTransform(),
                a.drawPonyGL(t, this.info, this.state, 0, 0, this.right, this.selected),
                t.transform = null
          }
          ,
          t.prototype.draw2 = function (t) {
            t.transform = this.getTransform(),
                a.drawPonyGL2(t, this.pal, this.state, 0, 0, this.right, this.selected),
                t.transform = null
          }
          ,
          t.prototype.drawHead = function (t) {
            a.drawPony2D(t, this.info, {
              animation: u.stand,
              animationFrame: 0,
              blinkFrame: 0
            }, 0, 0, !0)
          }
          ,
          t.prototype.release = function () {
            s.releasePalettes(this.pal)
          }
          ,
          t
    }();
    return e.Pony = f,
        n.exports
  });
  System.registerDynamic("2b", [getCodeName("Lodash"), "22", "23", "24"], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      if (!t.interactive)
        return !1;
      var n = t.interactBounds || t.bounds;
      return s.contains(t.x, t.y, n, e)
    }

    function i(t, e, n) {
      return (!n || "pony" !== t.type) && r(t, e)
    }

    var o = t(getCodeName("Lodash"))
        , a = t("22")
        , s = t("23")
        , u = t("24")
        , l = function () {
      function t(t, e) {
        this.regionsX = t,
            this.regionsY = e,
            this.regions = [],
            this.minRegionX = 0,
            this.minRegionY = 0,
            this.maxRegionX = 0,
            this.maxRegionY = 0,
            this.updateMinMaxRegion()
      }

      return Object.defineProperty(t.prototype, "width", {
        get: function () {
          return this.regionsX * a.REGION_SIZE
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "height", {
            get: function () {
              return this.regionsY * a.REGION_SIZE
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "entities", {
            get: function () {
              return this.regions[0] ? this.regions[0].entities : []
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "entitiesDrawn", {
            get: function () {
              var t = 0;
              return this.forEachRegion(function (e) {
                return t += e.entitiesDrawn
              }),
                  t
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.findEntityById = function (t) {
            return this.findEntity(function (e) {
              return e.id === t
            })
          }
          ,
          t.prototype.findClosestEntity = function (t, e) {
            var n, r = 0;
            return this.forEachEntity(function (i) {
              if (!e || e(i)) {
                var o = s.distance(i, t);
                (o < r || !n) && (n = i,
                    r = o)
              }
            }),
                n
          }
          ,
          t.prototype.addEntity = function (t) {
            this.regions[0] && this.regions[0].entities.push(t)
          }
          ,
          t.prototype.removeEntity = function (t) {
            this.forEachRegion(function (e) {
              var n = o.remove(e.entities, function (e) {
                return e.id === t
              })[0];
              return !n || (n.release && n.release(),
                      !1)
            })
          }
          ,
          t.prototype.pickEntity = function (t, e) {
            return this.findEntity(function (n) {
              return i(n, t, e)
            })
          }
          ,
          t.prototype.pickEntities = function (t, e) {
            return this.findEntities(function (n) {
              return i(n, t, e)
            }).reverse()
          }
          ,
          t.prototype.getTotalEntities = function (t) {
            var e = 0;
            return this.forEachRegion(function (n) {
              return e += t ? n.entities.reduce(function (e, n) {
                return e + (t(n) ? 1 : 0)
              }, 0) : n.entities.length
            }),
                e
          }
          ,
          t.prototype.findEntity = function (t) {
            var e = null;
            return this.forEachRegion(function (n) {
              return !(e = n.entities.find(t))
            }),
                e
          }
          ,
          t.prototype.findEntities = function (t) {
            var e = [];
            return this.forEachRegion(function (n) {
              return e.push.apply(e, n.entities.filter(t))
            }),
                e
          }
          ,
          t.prototype.updateMinMaxRegion = function () {
            this.minRegionX = this.regionsX,
                this.minRegionY = this.regionsY,
                this.maxRegionX = 0,
                this.maxRegionY = 0;
            for (var t = 0; t < this.regionsY; t++)
              for (var e = 0; e < this.regionsX; e++)
                this.getRegion(e, t) && (this.minRegionX = Math.min(e, this.minRegionX),
                    this.minRegionY = Math.min(t, this.minRegionY),
                    this.maxRegionX = Math.max(e, this.maxRegionX),
                    this.maxRegionY = Math.max(t, this.maxRegionY))
          }
          ,
          t.prototype.setRegion = function (t, e, n) {
            t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY && (this.regions[t + e * this.regionsX] = null ,
                this.setDirty(t * a.REGION_SIZE - 1, e * a.REGION_SIZE - 1, a.REGION_SIZE + 2, a.REGION_SIZE + 2),
                this.regions[t + e * this.regionsX] = n,
                this.updateMinMaxRegion())
          }
          ,
          t.prototype.getRegion = function (t, e) {
            return t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY ? this.regions[t + e * this.regionsX] : null
          }
          ,
          t.prototype.getRegionGlobal = function (t, e) {
            var n = Math.floor(t / a.REGION_SIZE)
                , r = Math.floor(e / a.REGION_SIZE);
            return this.getRegion(n, r)
          }
          ,
          t.prototype.getTile = function (t, e) {
            var n = this.getRegionGlobal(t, e);
            return n ? n.getTile(t - n.x * a.REGION_SIZE, e - n.y * a.REGION_SIZE) : u.TileType.None
          }
          ,
          t.prototype.doRelativeToRegion = function (t, e, n) {
            var r = this.getRegionGlobal(t, e);
            if (r) {
              var i = Math.floor(t - r.x * a.REGION_SIZE)
                  , o = Math.floor(e - r.y * a.REGION_SIZE);
              n(r, i, o)
            }
          }
          ,
          t.prototype.setTile = function (t, e, n) {
            this.doRelativeToRegion(t, e, function (t, e, r) {
              return t.setTile(e, r, n)
            }),
                this.setDirty(t - 1, e - 1, 3, 3)
          }
          ,
          t.prototype.setDirty = function (t, e, n, r) {
            for (var i = 0; i < r; i++)
              for (var o = 0; o < n; o++)
                this.doRelativeToRegion(o + t, i + e, function (t, e, n) {
                  return t.setDirty(e, n)
                })
          }
          ,
          t.prototype.isCollision = function (t, e, n) {
            var r = this.getTile(e, n);
            if (!u.canWalk(r))
              return !0;
            if (!t.collider)
              return !1;
            var i = !1;
            return this.forEachEntity(function (r) {
              return !(r !== t && r.canCollideWith && r.collider && s.collidersIntersect(e, n, t.collider, r.x, r.y, r.collider)) || (i = !0,
                      !1)
            }),
                i
          }
          ,
          t.prototype.update = function (t) {
            var e = this;
            this.forEachRegion(function (n) {
              n.entities.forEach(function (n) {
                if (n.update && n.update(t),
                    n.vx || n.vy)
                  if (n.canCollide) {
                    var r = n.x + n.vx * t
                        , i = n.y + n.vy * t;
                    e.isCollision(n, r, i) ? e.isCollision(n, n.x, i) ? e.isCollision(n, r, n.y) || (n.x = r) : n.y = i : (n.x = r,
                        n.y = i)
                  } else
                    n.x += n.vx * t,
                        n.y += n.vy * t;
                if (n.set && n.set(),
                    n.says && (n.says.timer -= t,
                    n.says.timer < 0 && (n.says.timer = 0,
                        n.says = null )),
                        n.coverBounds) {
                  var o = n.coverLifting || 0;
                  n.coverLifted && o < 1 ? n.coverLifting = Math.min(o + 2 * t, 1) : !n.coverLifted && o > 0 && (n.coverLifting = Math.max(o - 2 * t, 0))
                }
              })
            })
          }
          ,
          t.prototype.drawTiles = function (t, e) {
            var n = this;
            this.forEachRegion(function (r) {
              return r.drawTiles(t, e, n)
            })
          }
          ,
          t.prototype.drawEntities = function (t, e) {
            this.forEachRegion(function (n) {
              return n.drawEntities(t, e)
            })
          }
          ,
          t.prototype.drawEntities2 = function (t, e) {
            this.forEachRegion(function (n) {
              return n.drawEntities2(t, e)
            })
          }
          ,
          t.prototype.forEachRegion = function (t) {
            for (var e = this.minRegionY; e <= this.maxRegionY; e++)
              for (var n = this.minRegionX; n <= this.maxRegionX; n++) {
                var r = this.getRegion(n, e);
                if (r && t(r) === !1)
                  return
              }
          }
          ,
          t.prototype.forEachEntity = function (t) {
            this.forEachRegion(function (e) {
              return e.entities.forEach(t)
            })
          }
          ,
          t
    }();
    return e.Map = l,
        n.exports
  });
  System.registerDynamic("5e", ["22", "23"], !0, function (t, e, n) {
    "use strict";
    var r = t("22")
        , i = t("23")
        , o = function () {
      function t() {
        this.x = 0,
            this.y = 0,
            this.w = 100,
            this.h = 100
      }

      return t.prototype.update = function (t, e) {
        var n = this.w
            , o = this.h
            , a = e.width * r.tileWidth
            , s = e.height * r.tileHeight
            , u = a - n
            , l = s - o
            , c = t.x * r.tileWidth
            , f = t.y * r.tileHeight
            , p = Math.floor(.3 * n)
            , h = Math.floor(.3 * o)
            , d = i.clamp(c - (p + (n - p) / 2), 0, u)
            , v = i.clamp(c - (n - p) / 2, 0, u)
            , m = i.clamp(f - (h + (o - h) / 2), 0, l)
            , g = i.clamp(f - (o - h) / 2, 0, l);
        this.x = Math.floor(i.clamp(this.x, d, v)),
            this.y = Math.floor(i.clamp(this.y, m, g))
      }
          ,
          t.prototype.isVisible = function (t) {
            var e = t.bounds;
            if (!e)
              return !0;
            var n = e.x + t.x * r.tileWidth
                , i = e.y + t.y * r.tileHeight;
            return this.isRectVisible(n, i, e.w, e.h)
          }
          ,
          t.prototype.isRectVisible = function (t, e, n, r) {
            return this.x <= t + n && this.x + this.w >= t && this.y <= e + r && this.y + this.h >= e
          }
          ,
          t.prototype.screenToCamera = function (t) {
            return t ? {
              x: Math.round(t.x + this.x),
              y: Math.round(t.y + this.y)
            } : null
          }
          ,
          t.prototype.screenToWorld = function (t) {
            return t ? {
              x: (t.x + this.x) / r.tileWidth,
              y: (t.y + this.y) / r.tileHeight
            } : null
          }
          ,
          t.prototype.worldToScreen = function (t) {
            return t ? {
              x: Math.round(t.x * r.tileWidth - this.x),
              y: Math.round(t.y * r.tileHeight - this.y)
            } : null
          }
          ,
          t
    }();
    return e.Camera = o,
        n.exports
  });
  System.registerDynamic("24", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t !== o.None
    }

    function i(t) {
      return t >= o.Dirt && t <= o.Grass
    }

    !function (t) {
      t[t.None = 0] = "None",
          t[t.Dirt = 1] = "Dirt",
          t[t.Grass = 2] = "Grass"
    }(e.TileType || (e.TileType = {}));
    var o = e.TileType;
    e.TILE_COUNTS = [[0, 4], [2, 3], [4, 3], [6, 3], [8, 3], [13, 3], [14, 3], [47, 4]],
        e.TILE_COUNT_MAP = [],
        e.TILE_MAP_MAP = [],
        e.TILE_COUNTS.forEach(function (t) {
          var n = t[0]
              , r = t[1];
          return e.TILE_COUNT_MAP[n] = r
        });
    for (var a = 0, s = 0; s <= 47; s++)
      e.TILE_MAP_MAP[s] = a,
          a += e.TILE_COUNT_MAP[s] || 1;
    return e.canWalk = r,
        e.isValidTile = i,
        e.TILE_MAP = [46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 15, 15, 25, 25, 15, 15, 34, 34, 26, 26, 45, 41, 26, 26, 42, 36, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 15, 15, 25, 25, 15, 15, 34, 34, 27, 27, 43, 37, 27, 27, 35, 5, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 46, 46, 22, 22, 46, 46, 22, 22, 21, 21, 17, 11, 21, 21, 17, 11, 19, 19, 18, 18, 19, 19, 12, 12, 14, 14, 24, 28, 14, 14, 30, 6, 20, 20, 13, 13, 20, 20, 13, 13, 16, 16, 23, 32, 16, 16, 23, 32, 9, 9, 33, 33, 9, 9, 8, 8, 29, 29, 44, 39, 29, 29, 38, 7, 20, 20, 13, 13, 20, 20, 13, 13, 10, 10, 31, 4, 10, 10, 31, 4, 9, 9, 33, 33, 9, 9, 8, 8, 2, 2, 40, 3, 2, 2, 1, 0],
        n.exports
  });
  System.registerDynamic("5f", [getCodeName("Lodash"), "35", "25"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      for (var e = t % d, n = 24 * e / d, r = 1; r < h.length; r++)
        if (h[r] >= n) {
          var i = h[r - 1]
              , o = h[r]
              , u = p[r - 1]
              , l = p[r];
          return a.default.lerp(u, l, (n - i) / (o - i))
        }
      return s.WHITE
    }

    function i(t) {
      var e = t % d
          , n = 1440
          , r = Math.floor(e * n / d)
          , i = r % 60
          , a = Math.floor(r / 60);
      return o.padStart(a.toFixed(), 2, "0") + ":" + o.padStart(i.toFixed(), 2, "0")
    }

    var o = t(getCodeName("Lodash"))
        , a = t("35")
        , s = t("25")
        , u = "ffffff"
        , l = "d4ab64"
        , c = "3e489e"
        , f = "cfcc7e"
        , p = [c, c, f, u, u, l, c, c].map(a.default.parse)
        , h = [0, 4, 4.75, 5.5, 19.5, 20.25, 21, 24]
        , d = 288e4;
    return e.getLight = r,
        e.formatHourMinutes = i,
        n.exports
  });
  System.registerDynamic("60", ["25", "61"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n, r, i, o, s, u) {
      return s = a.setXY(t, e, o, s, u),
          o[s++] = n,
          o[s++] = r,
          o[s++] = i,
          s
    }

    var i = this && this.__extends || function (t, e) {
          function n() {
            this.constructor = t
          }

          for (var r in e)
            e.hasOwnProperty(r) && (t[r] = e[r]);
          t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
        }
        , o = t("25")
        , a = t("61")
        , s = 5
        , u = 4
        , l = function (t) {
      function e(e) {
        t.call(this, e, 256, 1e4, 4 * s)
      }

      return i(e, t),
          e.prototype.drawImage = function (t, e, n, i, a, s, u, l, c, f) {
            var p = (e || o.WHITE).toFloat(this.globalAlpha)
                , h = this.setupTexture(t)
                , d = h[0]
                , v = h[1]
                , m = u + c
                , g = l + f
                , y = n / d
                , b = i / v
                , _ = (n + a) / d
                , w = (i + s) / v
                , x = this.vertices
                , E = this.transform
                , $ = this.index;
            $ = r(u, l, y, b, p, x, $, E),
                $ = r(m, l, _, b, p, x, $, E),
                $ = r(m, g, _, w, p, x, $, E),
                $ = r(u, g, y, w, p, x, $, E),
                this.index = $,
                this.spritesCount++,
                this.tris += 2
          }
          ,
          e.prototype.drawRect = function (t, e, n, r, i) {
            if (r && i) {
              var o = this.rectSprite;
              o ? this.drawImage(o.tex, t, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null, t, 0, 0, 1, 1, e, n, r, i)
            }
          }
          ,
          e.prototype.drawSprite = function (t, e, n, r) {
            t && t.w && t.h && t.tex && this.drawImage(t.tex, e, t.x, t.y, t.w, t.h, n + t.ox, r + t.oy, t.w, t.h)
          }
          ,
          e.prototype.getAttributes = function () {
            var t = s * u;
            return [{
              name: "position",
              buffer: this.vertexBuffer,
              size: 2,
              stride: t
            }, {
              name: "texcoord0",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 2 * u,
              stride: t
            }, {
              name: "color",
              buffer: this.vertexBuffer,
              size: 4,
              stride: t,
              offset: 4 * u,
              type: this.gl.UNSIGNED_BYTE,
              normalized: !0
            }]
          }
          ,
          e
    }(a.BaseSpriteBatch);
    return e.SpriteBatch = l,
        n.exports
  });
  System.registerDynamic("64", ["65"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n, r, i, o) {
      this.location = t,
          this.dimension = e,
          this.a = n,
          this.b = r,
          this.c = i,
          this.d = o
    }

    function i(t, e, n) {
      this.gl = t,
          this._ext = e,
          this.handle = n,
          this._attribs = [],
          this._useElements = !1,
          this._elementsType = t.UNSIGNED_SHORT
    }

    function o(t, e) {
      return new i(t, e, e.createVertexArrayOES())
    }

    var a = t("65");
    return r.prototype.bind = function (t) {
      switch (this.dimension) {
        case 1:
          t.vertexAttrib1f(this.location, this.a);
          break;
        case 2:
          t.vertexAttrib2f(this.location, this.a, this.b);
          break;
        case 3:
          t.vertexAttrib3f(this.location, this.a, this.b, this.c);
          break;
        case 4:
          t.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
      }
    }
        ,
        i.prototype.bind = function () {
          this._ext.bindVertexArrayOES(this.handle);
          for (var t = 0; t < this._attribs.length; ++t)
            this._attribs[t].bind(this.gl)
        }
        ,
        i.prototype.unbind = function () {
          this._ext.bindVertexArrayOES(null)
        }
        ,
        i.prototype.dispose = function () {
          this._ext.deleteVertexArrayOES(this.handle)
        }
        ,
        i.prototype.update = function (t, e, n) {
          if (this.bind(),
                  a(this.gl, e, t),
                  this.unbind(),
                  this._attribs.length = 0,
                  t)
            for (var i = 0; i < t.length; ++i) {
              var o = t[i];
              "number" == typeof o ? this._attribs.push(new r(i, 1, o)) : Array.isArray(o) && this._attribs.push(new r(i, o.length, o[0], o[1], o[2], o[3]))
            }
          this._useElements = !!e,
              this._elementsType = n || this.gl.UNSIGNED_SHORT
        }
        ,
        i.prototype.draw = function (t, e, n) {
          n = n || 0;
          var r = this.gl;
          this._useElements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
        }
        ,
        n.exports = o,
        n.exports
  });
  System.registerDynamic("65", [], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n) {
      e ? e.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null);
      var r = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
      if (n) {
        if (n.length > r)
          throw new Error("gl-vao: Too many vertex attributes (" + n.length + "/" + r + ")");
        for (var i = 0; i < n.length; ++i) {
          var o = n[i];
          if (o.buffer) {
            var a = o.buffer
                , s = o.size || 4
                , u = o.type || t.FLOAT
                , l = !!o.normalized
                , c = o.stride || 0
                , f = o.offset || 0;
            a.bind(),
                t.enableVertexAttribArray(i),
                t.vertexAttribPointer(i, s, u, l, c, f)
          } else {
            if ("number" == typeof o)
              t.vertexAttrib1f(i, o);
            else if (1 === o.length)
              t.vertexAttrib1f(i, o[0]);
            else if (2 === o.length)
              t.vertexAttrib2f(i, o[0], o[1]);
            else if (3 === o.length)
              t.vertexAttrib3f(i, o[0], o[1], o[2]);
            else {
              if (4 !== o.length)
                throw new Error("gl-vao: Invalid vertex attribute");
              t.vertexAttrib4f(i, o[0], o[1], o[2], o[3])
            }
            t.disableVertexAttribArray(i)
          }
        }
        for (; i < r; ++i)
          t.disableVertexAttribArray(i)
      } else {
        t.bindBuffer(t.ARRAY_BUFFER, null);
        for (var i = 0; i < r; ++i)
          t.disableVertexAttribArray(i)
      }
    }

    return n.exports = r,
        n.exports
  });
  System.registerDynamic("66", ["65"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      this.gl = t,
          this._elements = null ,
          this._attributes = null ,
          this._elementsType = t.UNSIGNED_SHORT
    }

    function i(t) {
      return new r(t)
    }

    var o = t("65");
    return r.prototype.bind = function () {
      o(this.gl, this._elements, this._attributes)
    }
        ,
        r.prototype.update = function (t, e, n) {
          this._elements = e,
              this._attributes = t,
              this._elementsType = n || this.gl.UNSIGNED_SHORT
        }
        ,
        r.prototype.dispose = function () {
        }
        ,
        r.prototype.unbind = function () {
        }
        ,
        r.prototype.draw = function (t, e, n) {
          n = n || 0;
          var r = this.gl;
          this._elements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
        }
        ,
        n.exports = i,
        n.exports
  });
  System.registerDynamic("67", ["64", "66"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      this.bindVertexArrayOES = t.bindVertexArray.bind(t),
          this.createVertexArrayOES = t.createVertexArray.bind(t),
          this.deleteVertexArrayOES = t.deleteVertexArray.bind(t)
    }

    function i(t, e, n, i) {
      var s, u = t.createVertexArray ? new r(t) : t.getExtension("OES_vertex_array_object");
      return s = u ? o(t, u) : a(t),
          s.update(e, n, i),
          s
    }

    var o = t("64")
        , a = t("66");
    return n.exports = i,
        n.exports
  });
  System.registerDynamic("68", ["67"], !0, function (t, e, n) {
    return n.exports = t("67"),
        n.exports
  });
  System.registerDynamic("61", [getCodeName("gl-buffer"), getCodeName("gl-texture2d"), "68", "23", "69"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n, r, i) {
      if (i) {
        var o = t;
        t = i[0] * o + i[2] * e + i[4],
            e = i[1] * o + i[3] * e + i[5]
      }
      return n[r++] = t,
          n[r++] = e,
          r
    }

    var i = t(getCodeName("gl-buffer"))
        , o = t(getCodeName("gl-texture2d"))
        , a = t("68")
        , s = t("23")
        , u = t("69");
    e.setXY = r;
    var l = function () {
      function t(t, e, n, r) {
        this.gl = t,
            this.initialCapacity = e,
            this.maxCapacity = n,
            this.floatsPerSprite = r,
            this.tris = 0,
            this.globalAlpha = 1,
            this.index = 0,
            this.spritesCount = 0,
            this.spritesCapacity = 0,
            this.ensureCapacity(e);
        var i = s.createCanvas(1, 1)
            , a = i.getContext("2d");
        a.fillStyle = "white",
            a.fillRect(0, 0, 1, 1),
            this.defaultTexture = o(t, i)
      }

      return t.prototype.dispose = function () {
        this.defaultTexture = s.dispose(this.defaultTexture),
            this.disposeBuffers()
      }
          ,
          t.prototype.disposeBuffers = function () {
            this.vertexBuffer = s.dispose(this.vertexBuffer),
                this.indexBuffer = s.dispose(this.indexBuffer),
                this.vao = s.dispose(this.vao)
          }
          ,
          t.prototype.begin = function (t) {
            t.bind(),
                this.texture = this.defaultTexture,
                this.vao.bind()
          }
          ,
          t.prototype.end = function () {
            this.flush(),
                this.vao.unbind()
          }
          ,
          t.prototype.setupTexture = function (t) {
            return t = t || this.defaultTexture,
            this.texture !== t && this.flush(),
                this.ensureCapacity(this.spritesCount + 1),
                this.texture = t,
                t.shape
          }
          ,
          t.prototype.bind = function () {
            this.texture.bind(0)
          }
          ,
          t.prototype.flush = function () {
            if (this.index && this.texture) {
              var t = this.vertices.subarray(0, this.index);
              this.vertexBuffer.update(t, 0),
                  this.bind(),
                  this.vao.draw(this.gl.TRIANGLES, 6 * this.spritesCount, 0),
                  this.texture = null ,
                  this.spritesCount = 0,
                  this.index = 0
            }
          }
          ,
          t.prototype.ensureCapacity = function (t) {
            if (!(this.spritesCapacity > t)) {
              this.flush();
              var e = 2 * this.spritesCapacity || this.initialCapacity;
              e > this.maxCapacity || (this.disposeBuffers(),
                  this.spritesCapacity = e,
                  this.vertices = new Float32Array(this.spritesCapacity * this.floatsPerSprite),
                  this.indices = u.createIndices(this.spritesCapacity),
                  this.vertexBuffer = i(this.gl, this.vertices, this.gl.ARRAY_BUFFER, this.gl.STATIC_DRAW),
                  this.indexBuffer = i(this.gl, this.indices, this.gl.ELEMENT_ARRAY_BUFFER, this.gl.STATIC_DRAW),
                  this.vao = a(this.gl, this.getAttributes(), this.indexBuffer),
                  this.vao.bind())
            }
          }
          ,
          t.prototype.getAttributes = function () {
            throw new Error("not implemented")
          }
          ,
          t
    }();
    return e.BaseSpriteBatch = l,
        n.exports
  });
  System.registerDynamic("6b", ["25", "61"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n, r, i, o, s, u, l, c) {
      return l = a.setXY(t, e, u, l, c),
          u[l++] = n,
          u[l++] = r,
          u[l++] = i,
          u[l++] = o,
          u[l++] = s,
          l
    }

    var i = this && this.__extends || function (t, e) {
          function n() {
            this.constructor = t
          }

          for (var r in e)
            e.hasOwnProperty(r) && (t[r] = e[r]);
          t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
              new n)
        }
        , o = t("25")
        , a = t("61")
        , s = 7
        , u = 4
        , l = function (t) {
      function e(e) {
        t.call(this, e, 256, 1e4, 4 * s)
      }

      return i(e, t),
          e.prototype.drawImage = function (t, e, n, i, a, s, u, l, c, f, p) {
            var h = (e || o.WHITE).toFloat(this.globalAlpha)
                , d = n || this.defaultPalette
                , v = this.setupTexture(t)
                , m = v[0]
                , g = v[1]
                , y = l + f
                , b = c + p
                , _ = i / m
                , w = a / g
                , x = (i + s) / m
                , E = (a + u) / g
                , $ = d ? d.u : 0
                , S = d ? d.v : 0
                , T = this.vertices
                , k = this.transform
                , M = this.index;
            M = r(l, c, _, w, $, S, h, T, M, k),
                M = r(y, c, x, w, $, S, h, T, M, k),
                M = r(y, b, x, E, $, S, h, T, M, k),
                M = r(l, b, _, E, $, S, h, T, M, k),
                this.index = M,
                this.spritesCount++,
                this.tris += 2
          }
          ,
          e.prototype.drawRect = function (t, e, n, r, i) {
            if (r && i) {
              var o = this.rectSprite;
              o ? this.drawImage(o.tex, t, null, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null, t, null, 0, 0, 1, 1, e, n, r, i)
            }
          }
          ,
          e.prototype.drawSprite = function (t, e, n, r, i) {
            t && t.w && t.h && t.tex && this.drawImage(t.tex, e, n, t.x, t.y, t.w, t.h, r + t.ox, i + t.oy, t.w, t.h)
          }
          ,
          e.prototype.bind = function () {
            t.prototype.bind.call(this),
            this.palette && this.palette.bind(1)
          }
          ,
          e.prototype.getAttributes = function () {
            var t = s * u;
            return [{
              name: "position",
              buffer: this.vertexBuffer,
              size: 2,
              stride: t
            }, {
              name: "texcoord0",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 2 * u,
              stride: t
            }, {
              name: "texcoord1",
              buffer: this.vertexBuffer,
              size: 2,
              offset: 4 * u,
              stride: t
            }, {
              name: "color",
              buffer: this.vertexBuffer,
              size: 4,
              stride: t,
              offset: 6 * u,
              type: this.gl.UNSIGNED_BYTE,
              normalized: !0
            }]
          }
          ,
          e
    }(a.BaseSpriteBatch);
    return e.PaletteSpriteBatch = l,
        n.exports
  });
  System.registerDynamic("6c", [], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n, r, i) {
      var o = t.tex;
      return {
        tex: o,
        x: e,
        y: n,
        w: r,
        h: i,
        ox: 0,
        oy: 0
      }
    }

    function i(t, e, n, r, i, o, a) {
      if (e.h && e.w)
        for (var s = 0; s < a; s += e.h)
          for (var u = 0; u < o; u += e.w) {
            var l = Math.min(e.w, o - u)
                , c = Math.min(e.h, a - s);
            t.drawImage(e.tex, n, e.x, e.y, l, c, r + u, i + s, l, c)
          }
    }

    var o = function () {
      function t(t, e, n, i, o) {
        if (this.t = e,
                this.l = n,
                this.b = i,
                this.r = o,
                !t.tex)
          throw new Error("creating sprite button before sprites texture initialization");
        this.topLeft = r(t, t.x, t.y, n, e),
            this.topRight = r(t, t.x + t.w - o, t.y, o, e),
            this.bottomLeft = r(t, t.x, t.y + t.h - i, n, i),
            this.bottomRight = r(t, t.x + t.w - o, t.y + t.h - i, o, i),
            this.top = r(t, t.x + n, t.y, t.w - (n + o), e),
            this.bottom = r(t, t.x + n, t.y + t.h - i, t.w - (n + o), i),
            this.left = r(t, t.x, t.y + e, n, t.h - (e + i)),
            this.right = r(t, t.x + t.w - o, t.y + e, o, t.h - (e + i)),
            this.bg = r(t, t.x + n, t.y + e, t.w - (n + o), t.h - (e + i))
      }

      return t.prototype.draw = function (t, e, n, r, o, a) {
        var s = n + o - this.r
            , u = r + a - this.b
            , l = o - (this.l + this.r)
            , c = a - (this.t + this.b);
        t.drawSprite(this.topLeft, e, n, r),
            t.drawSprite(this.topRight, e, s, r),
            t.drawSprite(this.bottomLeft, e, n, u),
            t.drawSprite(this.bottomRight, e, s, u),
            i(t, this.top, e, n + this.l, r, l, this.t),
            i(t, this.left, e, n, r + this.t, this.l, c),
            i(t, this.bg, e, n + this.l, r + this.t, l, c),
            i(t, this.right, e, n + o - this.r, r + this.t, this.r, c),
            i(t, this.bottom, e, n + this.l, r + a - this.b, l, this.b)
      }
          ,
          t
    }();
    return e.SpriteButton = o,
        n.exports
  });
  System.registerDynamic("6d", ["23"], !0, function (t, e, n) {
    "use strict";
    var r = t("23")
        , i = " ".charCodeAt(0)
        , o = "\t".charCodeAt(0)
        , a = "?".charCodeAt(0)
        , s = "\n".charCodeAt(0)
        , u = "\r".charCodeAt(0)
        , l = function () {
      function t(t) {
        var e = this;
        this.lineSpacing = 2,
            this.characterSpacing = 1,
            this.chars = [],
            this.emotes = [],
            this.emotePictures = [],
            t.forEach(function (t) {
              t && (e.chars[t.code] = t.sprite)
            });
        var n = this.chars[0]
            , r = 3;
        this.height = n.h,
            this.chars[i] = {
              x: 0,
              y: 0,
              w: r,
              h: n.h,
              ox: 0,
              oy: 0
            },
            this.chars[o] = {
              x: 0,
              y: 0,
              w: 4 * r,
              h: n.h,
              ox: 0,
              oy: 0
            }
      }

      return t.prototype.getChar = function (t) {
        return this.chars[t] || this.chars[a]
      }
          ,
          t.prototype.parseEmotes = function (t) {
            return this.emotes.reduce(function (t, e) {
              var n = e.regex
                  , r = e.char;
              return t.replace(n, r)
            }, t)
          }
          ,
          t.prototype.forEachChar = function (t, e) {
            t = this.parseEmotes(t);
            for (var n = 0; n < t.length; n++) {
              var i = n
                  , o = t.charCodeAt(n);
              r.isSurrogate(o) && n + 1 < t.length && (o = r.fromSurrogate(o, t.charCodeAt(n + 1)),
                  n++),
              o !== u && e(o, i)
            }
          }
          ,
          t.prototype.addEmoticon = function (t, e, n) {
            this.emotes.push({
              regex: t,
              char: e
            });
            var i = e.charCodeAt(0);
            r.isSurrogate(i) && e.length > 1 && (i = r.fromSurrogate(i, e.charCodeAt(1))),
            n && (this.emotePictures[i] = n)
          }
          ,
          t.prototype.measureChar = function (t) {
            return (this.emotePictures[t] || this.getChar(t)).w
          }
          ,
          t.prototype.drawChar = function (t, e, n, r, i) {
            var o = this.emotePictures[e];
            if (o)
              return t.drawSprite(o, null, r, i - 1),
                  o.w;
            var a = this.getChar(e);
            return t.drawSprite(a, n, r, i),
                a.w
          }
          ,
          t.prototype.measureText = function (t) {
            var e = this
                , n = 0
                , r = 1
                , i = 0;
            return this.forEachChar(t, function (t) {
              t === s ? (n = Math.max(n, i),
                  i = 0,
                  r++) : (i && (i += e.characterSpacing),
                  i += e.measureChar(t))
            }),
            {
              w: Math.max(n, i),
              h: r * this.height + (r - 1) * this.lineSpacing
            }
          }
          ,
          t.prototype.drawText = function (t, e, n, r, i) {
            var o = this;
            r = Math.round(r),
                i = Math.round(i);
            var a = r;
            this.forEachChar(e, function (e, u) {
              e === s ? (a = r,
                  i += o.height + o.lineSpacing) : a += o.drawChar(t, e, n, a, i) + o.characterSpacing
            })
          }
          ,
          t.prototype.drawTextJumping = function (t, e, n, r, i, o) {
            var a = this;
            r = Math.round(r),
                i = Math.round(i);
            var u = r;
            this.forEachChar(e, function (e, l) {
              e === s ? (u = r,
                  i += a.height + a.lineSpacing) : u += a.drawChar(t, e, n, u, o && o.indexOf(l) !== -1 ? i - 1 : i) + a.characterSpacing
            })
          }
          ,
          t.prototype.drawTextAligned = function (t, e, n, r, i, o) {
            void 0 === i && (i = "left"),
            void 0 === o && (o = "top");
            var a = r.x
                , s = r.y;
            if ("left" !== i || "top" !== o) {
              var u = this.measureText(e);
              "left" !== i && (a += "center" === i ? (r.w - u.w) / 2 : r.w - u.w),
              "top" !== o && (s += "middle" === o ? (r.h - u.h) / 2 : r.h - u.h)
            }
            this.drawText(t, e, n, a, s)
          }
          ,
          t
    }();
    return e.SpriteFont = l,
        n.exports
  });
  System.registerDynamic("6e", [getCodeName("gl-texture2d")], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      e.forEach(function (e) {
        e.tex = o(t, e.img),
            e.sprites.filter(function (t) {
              return !!t
            }).forEach(function (t) {
              return t.tex = e.tex
            })
      })
    }

    function i(t) {
      t.forEach(function (t) {
        t.tex && (t.tex.dispose(),
            t.tex = null ),
            t.sprites.filter(function (t) {
              return !!t
            }).forEach(function (t) {
              return t.tex = null
            })
      })
    }

    var o = t(getCodeName("gl-texture2d"));
    return e.createTexturesForSpriteSheets = r,
        e.releaseTexturesForSpriteSheets = i,
        n.exports
  });
  System.registerDynamic("69", [getCodeName("gl-shader"), getCodeName("gl-matrix")], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      for (var n = Math.max(t, e), r = 256; r < n;)
        r *= 2;
      return r
    }

    function i(t) {
      var e = {
        alpha: !1,
        premultipliedAlpha: !1
      }
          , n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
      if (!n)
        throw new Error("Failed to create WebGL context");
      return n
    }

    function o(t) {
      for (var e = 6 * t, n = new Uint16Array(e), r = 0, i = 0; r < e; i += 4)
        n[r++] = i + 0,
            n[r++] = i + 1,
            n[r++] = i + 2,
            n[r++] = i + 0,
            n[r++] = i + 2,
            n[r++] = i + 3;
      return n
    }

    function a(t, e, n, r, i, o) {
      return void 0 === r && (r = 1),
      void 0 === i && (i = 0),
      void 0 === o && (o = 0),
          p.mat4.identity(t),
          p.mat4.translate(t, t, p.vec3.fromValues(-1, 1, 0)),
          p.mat4.scale(t, t, p.vec3.fromValues(2 / e, -2 / n, 1)),
          p.mat4.scale(t, t, p.vec3.fromValues(r, r, 1)),
          p.mat4.translate(t, t, p.vec3.fromValues(i, o, 0)),
          t
    }

    function s(t, e, n, r, i, o) {
      return void 0 === r && (r = 1),
      void 0 === i && (i = 0),
      void 0 === o && (o = 0),
          p.mat4.identity(t),
          p.mat4.translate(t, t, p.vec3.fromValues(-1, -1, 0)),
          p.mat4.scale(t, t, p.vec3.fromValues(2 / e, 2 / n, 1)),
          p.mat4.scale(t, t, p.vec3.fromValues(r, r, 1)),
          p.mat4.translate(t, t, p.vec3.fromValues(i, o, 0)),
          t
    }

    function u(t) {
      return f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\n\t\tuniform mat4 transform;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t}\n\t")
    }

    function l(t) {
      return f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y)) * vColor;\n\t\t}\n\t")
    }

    function c(t) {
      var e = f(t, h + "\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec2 texcoords1;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tpaletteCoord = texcoords1;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", h + "\n\t\tuniform sampler2D sampler1; // sprite\n\t\tuniform sampler2D sampler2; // palette\n\t\tuniform float pixelSize;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec2 paletteCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tvec4 sprite = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y));\n\t\t\tvec4 palette = texture2D(sampler2, vec2(paletteCoord.x + sprite.x * pixelSize, paletteCoord.y));\n\t\t\tgl_FragColor = vec4(palette.xyz * sprite.y, palette.w) * vColor;\n\t\t}\n\t");
      return t.useProgram(e.program),
          t.uniform1i(t.getUniformLocation(e.program, "sampler1"), 0),
          t.uniform1i(t.getUniformLocation(e.program, "sampler2"), 1),
          t.useProgram(null),
          e
    }

    var f = t(getCodeName("gl-shader"))
        , p = t(getCodeName("gl-matrix"))
        , h = "\n\t#ifdef GL_ES\n\tprecision mediump float;\n\t#endif\n";
    return e.getRenderTargetSize = r,
        e.getWebGLContext = i,
        e.createIndices = o,
        e.createViewMatrix = a,
        e.createViewMatrix2 = s,
        e.createBasicShader = u,
        e.createSpriteShader = l,
        e.createPaletteShader = c,
        n.exports
  });
  System.registerDynamic("9e", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t.target && /^(input|textarea|select)$/i.test(t.target.tagName)
    }

    var i = function () {
      function t(t) {
        this.manager = t
      }

      return t.prototype.initialize = function () {
        var t = this;
        this.initialized || (this.initialized = !0,
            window.addEventListener("keydown", function (e) {
              !r(e) && t.manager.setValue(e.keyCode, 1) && (e.preventDefault(),
                  e.stopPropagation())
            }),
            window.addEventListener("keyup", function (e) {
              t.manager.setValue(e.keyCode, 0) && (e.preventDefault(),
                  e.stopPropagation())
            }),
            window.addEventListener("blur", function (e) {
              t.manager.clear()
            }))
      }
          ,
          t.prototype.update = function () {
          }
          ,
          t
    }();
    return e.KeyboardController = i,
        n.exports
  });
  System.registerDynamic("9f", [], !0, function (t, e, n) {
    "use strict";
    var r = [1002, 1004, 1003]
        , i = function () {
      function t(t) {
        this.manager = t
      }

      return t.prototype.initialize = function () {
        var t = this;
        if (!this.initialized) {
          this.initialized = !0;
          var e = document.getElementById("canvas");
          e.addEventListener("mousemove", function (e) {
            t.manager.setValue(1e3, Math.floor(e.clientX)),
                t.manager.setValue(1001, Math.floor(e.clientY))
          }),
              e.addEventListener("mousedown", function (e) {
                t.manager.setValue(r[e.button], 1)
              }),
              e.addEventListener("mouseup", function (e) {
                t.manager.setValue(r[e.button], 0)
              }),
              e.addEventListener("contextmenu", function (t) {
                t.preventDefault(),
                    t.stopPropagation()
              }),
              window.addEventListener("blur", function () {
                t.manager.setValue(1002, 0)
              })
        }
      }
          ,
          t.prototype.update = function () {
          }
          ,
          t
    }();
    return e.MouseController = i,
        n.exports
  });
  System.registerDynamic("a0", ["23"], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      for (var n = 0; n < t.changedTouches.length; ++n) {
        var r = t.changedTouches.item(n);
        if (r.identifier === e)
          return r
      }
      return null
    }

    var i = t("23")
        , o = 15
        , a = 100
        , s = function () {
      function t(t) {
        this.manager = t,
            this.touchId = -1,
            this.touchStartTime = 0,
            this.touchStart = {
              x: 0,
              y: 0
            },
            this.touchCurrent = {
              x: 0,
              y: 0
            },
            this.originShown = !1,
            this.positionShown = !1
      }

      return t.prototype.initialize = function () {
        var t = this;
        if (!this.initialized) {
          this.initialized = !0,
              this.origin = document.getElementById("touch-origin"),
              this.position = document.getElementById("touch-position");
          var e = document.getElementById("canvas");
          e.addEventListener("touchstart", function (e) {
            if (e.preventDefault(),
                    e.stopPropagation(),
                t.touchId === -1) {
              var n = e.changedTouches.item(0);
              t.touchId = n.identifier,
                  t.touchStartTime = Date.now(),
                  t.touchStart = t.touchCurrent = {
                    x: n.clientX,
                    y: n.clientY
                  }
            }
          }),
              e.addEventListener("touchmove", function (e) {
                e.preventDefault(),
                    e.stopPropagation();
                var n = r(e, t.touchId);
                n && (t.touchCurrent = {
                  x: n.clientX,
                  y: n.clientY
                },
                    t.updateInput())
              }),
              e.addEventListener("touchend", function (e) {
                e.preventDefault(),
                    e.stopPropagation();
                var n = r(e, t.touchId);
                n && (t.touchIsDrag || (t.manager.setValue(1e3, t.touchStart.x),
                    t.manager.setValue(1001, t.touchStart.y),
                    t.manager.setValue(1002, 1)),
                    t.resetTouch())
              }),
              window.addEventListener("touchend", function () {
                return t.resetTouch()
              }),
              window.addEventListener("blur", function () {
                return t.resetTouch()
              })
        }
      }
          ,
          t.prototype.update = function () {
            var t = this.touchIsDrag && this.touchId !== -1
                , e = this.touchId !== -1;
            if (this.originShown !== t && (this.originShown = t,
                    this.origin.style.display = t ? "block" : "none"),
                this.positionShown !== e && (this.positionShown = e,
                    this.position.style.display = e ? "block" : "none"),
                    t) {
              var n = "translate3d(" + (this.touchStart.x - 50) + "px, " + (this.touchStart.y - 50) + "px, 0px)";
              this.originTransform !== n && (this.originTransform = n,
                  i.setTransform(this.origin, n))
            }
            if (e) {
              var n = "translate3d(" + (this.touchCurrent.x - 25) + "px, " + (this.touchCurrent.y - 25) + "px, 0px)";
              this.positionTransform !== n && (this.positionTransform = n,
                  i.setTransform(this.position, n))
            }
          }
          ,
          t.prototype.resetTouch = function () {
            this.touchId = -1,
                this.touchStart = this.touchCurrent = {
                  x: 0,
                  y: 0
                },
                this.touchIsDrag = !1,
                this.updateInput()
          }
          ,
          t.prototype.updateInput = function () {
            var t = this.touchStart.y - this.touchCurrent.y
                , e = this.touchStart.x - this.touchCurrent.x
                , n = Math.atan2(t, e)
                , r = Math.sqrt(t * t + e * e);
            if (r > o) {
              var i = Math.min((r - o) / (a - o), 1);
              this.touchIsDrag = !0,
                  this.manager.setValue(2e3, -Math.cos(n) * i),
                  this.manager.setValue(2001, -Math.sin(n) * i)
            } else
              this.manager.setValue(2e3, 0),
                  this.manager.setValue(2001, 0)
          }
          ,
          t
    }();
    return e.TouchController = s,
        n.exports
  });
  System.registerDynamic("a1", [getCodeName("Lodash")], !0, function (t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash"))
        , i = .2
        , o = function () {
      function t(t) {
        this.manager = t,
            this.gamepadIndex = -1
      }

      return t.prototype.initialize = function () {
        var t = this;
        this.initialized || (this.initialized = !0,
            window.addEventListener("gamepadconnected", function (e) {
              t.gamepadIndex = e.gamepad.index
            }),
            window.addEventListener("gamepaddisconnected", function (e) {
              t.gamepadIndex === e.gamepad.index && t.scanGamepads()
            }),
            this.scanGamepads())
      }
          ,
          t.prototype.update = function () {
            if (this.gamepadIndex !== -1) {
              var t = navigator.getGamepads()
                  , e = t[this.gamepadIndex];
              if (!e)
                return void this.scanGamepads();
              var n = "(null) (null) (Vendor: 045e Product: 0289)" === e.id || "045e-0289-Microsoft X-Box pad v2 (US)" === e.id
                  , r = n ? 4 : 3
                  , o = Math.sqrt(e.axes[0] * e.axes[0] + e.axes[1] * e.axes[1]);
              if (o > i) {
                this.zeroed = !1;
                var a = Math.min((o - i) / (1 - i), 1)
                    , s = Math.atan2(e.axes[1], e.axes[0]);
                this.manager.setValue(2e3, Math.cos(s) * a),
                    this.manager.setValue(2001, Math.sin(s) * a)
              } else
                this.zeroed || (this.manager.setValue(2e3, 0),
                    this.manager.setValue(2001, 0),
                    this.zeroed = !0);
              this.manager.setValue(3003, e.buttons[r] && e.buttons[r].pressed ? 1 : 0)
            }
          }
          ,
          t.prototype.scanGamepads = function () {
            var t = r.find(navigator.getGamepads(), function (t) {
              return !!t
            });
            this.gamepadIndex = t ? t.index : -1
          }
          ,
          t
    }();
    return e.GamePadController = o,
        n.exports
  });
  System.registerDynamic("a2", [getCodeName("Lodash"), "9e", "9f", "a0", "a1"], !0, function (t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash"))
        , i = t("9e")
        , o = t("9f")
        , a = t("a0")
        , s = t("a1")
        , u = function () {
      function t() {
        this.inputs = [],
            this.actions = []
      }

      return Object.defineProperty(t.prototype, "axisX", {
        get: function () {
          var t = this.getRange(2e3)
              , e = this.getState(37, 65, 3014)
              , n = this.getState(39, 68, 3015)
              , i = t + (e ? -1 : n ? 1 : 0);
          return r.clamp(i, -1, 1)
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "axisY", {
            get: function () {
              var t = this.getRange(2001)
                  , e = this.getState(38, 87, 3012)
                  , n = this.getState(40, 83, 3013)
                  , i = t + (e ? -1 : n ? 1 : 0);
              return r.clamp(i, -1, 1)
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.initialize = function () {
            this.controllers = [new i.KeyboardController(this), new o.MouseController(this), new a.TouchController(this), new s.GamePadController(this)],
                this.controllers.forEach(function (t) {
                  return t.initialize()
                })
          }
          ,
          t.prototype.update = function () {
            this.controllers.forEach(function (t) {
              return t.update()
            })
          }
          ,
          t.prototype.onPressed = function (t, e) {
            this.onAction(t, function (t, n) {
              1 === n && e()
            })
          }
          ,
          t.prototype.onReleased = function (t, e) {
            this.onAction(t, function (t, n) {
              0 === n && e()
            })
          }
          ,
          t.prototype.isPressed = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e - 0] = arguments[e];
            return this.getState.apply(this, t)
          }
          ,
          t.prototype.onAction = function (t, e) {
            var n = this
                , r = Array.isArray(t) ? t : [t];
            r.forEach(function (t) {
              n.actions[t] || (n.actions[t] = []),
                  n.actions[t].push(e)
            })
          }
          ,
          t.prototype.getAction = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.reduce(function (e, n) {
              var r = !!t.inputs[n];
              return t.inputs[n] = 0,
              e || r
            }, !1)
          }
          ,
          t.prototype.getState = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.some(function (e) {
              return !!t.inputs[e]
            })
          }
          ,
          t.prototype.getRange = function () {
            for (var t = this, e = [], n = 0; n < arguments.length; n++)
              e[n - 0] = arguments[n];
            return e.reduce(function (e, n) {
              return e + (t.inputs[n] || 0)
            }, 0)
          }
          ,
          t.prototype.setValue = function (t, e) {
            return !((this.inputs[t] || 0) === e || (this.inputs[t] = e,
                    !this.actions[t])) && (this.actions[t].forEach(function (n) {
                  return n(t, e)
                }),
                    !0)
          }
          ,
          t.prototype.clear = function () {
            this.inputs = []
          }
          ,
          t
    }();
    return e.InputManager = u,
        n.exports
  });
  System.registerDynamic("42", ["23"], !0, function (t, e, n) {
    "use strict";
    function r(t, e, n) {
      t.width === e && t.height === n || (t.width = e,
          t.height = n)
    }

    function i(t) {
      var e = t.getBoundingClientRect()
          , n = a.getPixelRatio()
          , i = Math.round(e.width * n)
          , o = Math.round(e.height * n);
      r(t, i, o)
    }

    function o(t, e, n) {
      return t = t || a.createCanvas(e, n),
          r(t, e, n),
          t
    }

    var a = t("23");
    return e.resizeCanvas = r,
        e.resizeCanvasToElementSize = i,
        e.createOrResizeCanvas = o,
        n.exports
  });
  System.registerDynamic("a3", [getCodeName("gl-matrix"), getCodeName("gl-fbo"), "23", "22", "2a", "2b", "5e", "25", "24", "5f", "60", "6b", "6c", "6d", "28", "6e", "69", "20", "a2", "3b", "42", "21", "2d", "a4"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return 2 === t ? d.ADMIN_COLOR : 1 === t ? d.SYSTEM_COLOR : d.WHITE
    }

    function i(t) {
      t.player && t.player.tes
    }

    function o(t) {
      A.emotes.forEach(function (e) {
        var n = e.regex
            , r = e.symbol
            , i = e.sprite;
        return t.addEmoticon(n, r, i)
      })
    }

    function a() {
      return l.clamp(0 | +C.getItem("game-scale") || (l.getPixelRatio() > 1 ? 3 : 2), 1, 4)
    }

    var s = t(getCodeName("gl-matrix"))
        , u = t(getCodeName("gl-fbo"))
        , l = t("23")
        , c = t("22")
        , f = t("2a")
        , p = t("2b")
        , h = t("5e")
        , d = t("25")
        , v = t("24")
        , m = t("5f")
        , g = t("60")
        , y = t("6b")
        , b = t("6c")
        , _ = t("6d")
        , w = t("28")
        , x = t("6e")
        , E = t("69")
        , $ = t("20")
        , S = t("a2")
        , T = t("3b")
        , k = t("42")
        , M = t("21")
        , A = t("2d")
        , C = t("a4")
        , D = function () {
      function t() {
        this.loaded = !1,
            this.fps = 0,
            this.map = new p.Map(0, 0),
            this.scale = a(),
            this.baseTime = 0,
            this.camera = new h.Camera,
            this.failedToCreateWebGL = !1,
            this.apply = function (t) {
              return t()
            }
            ,
            this.paletteManager = new w.PaletteManager,
            this.input = new S.InputManager,
            this.timeSize = 0,
            this.lastStats = 0,
            this.sent = 0,
            this.recv = 0,
            this.textJump = 0,
            this.hideText = !1,
            this.hideObjects = !1,
            this.hover = {
              x: 0,
              y: 0
            },
            this.legacyRenderer = !1,
            this.viewMatrix = s.mat4.create(),
            this.initialized = !1
      }

      return t.prototype.changeScale = function () {
        this.scale = this.scale % 4 + 1,
            C.setItem("game-scale", this.scale.toString())
      }
          ,
          t.prototype.isSelected = function (t) {
            return this.selected && this.selected.id === t
          }
          ,
          t.prototype.select = function (t) {
            var e = this;
            this.selected !== t && this.apply(function () {
              e.selected && (e.selected.selected = !1),
                  e.selected = t,
              e.selected && (e.selected.selected = !0)
            })
          }
          ,
          t.prototype.load = function () {
            return this.loadPromise || (this.loadPromise = T.loadSpriteSheets($.spriteSheets, "/images/"))
          }
          ,
          t.prototype.init = function () {
            var t = this;
            this.initialized || (this.initialized = !0,
                this.defaultPalette = this.paletteManager.add([0, 4294967295]),
                this.canvas = document.getElementById("canvas"),
                this.stats = document.getElementById("stats"),
                this.clock = document.getElementById("clock"),
                this.input.initialize(),
                this.input.onReleased([80, 3003], function () {
                  return t.changeScale()
                }),
                this.input.onPressed(13, function () {
                  return t.onChat()
                }),
                this.input.onPressed(27, function () {
                  t.onCancel() || t.select(null)
                }),
                this.input.onPressed(191, function () {
                  return t.onCommand()
                }),
                this.input.onPressed(113, function () {
                  return t.hideText = !t.hideText
                }),
                this.input.onPressed(115, function () {
                  return t.hideObjects = !t.hideObjects
                }),
            M.debug && this.input.onReleased([84], function () {
              return t.legacyRenderer = !t.legacyRenderer
            }),
                window.addEventListener("resize", function () {
                  return t.resizeCanvas()
                })),
                this.resizeCanvas(),
            this.gl || this.initWebGL()
          }
          ,
          t.prototype.initWebGL = function () {
            try {
              this.updateCamera();
              var t = this.gl = E.getWebGLContext(this.canvas)
                  , e = E.getRenderTargetSize(this.camera.w, this.camera.h);
              this.frameBuffer = u(t, [e, e], {
                depth: !1
              }),
                  this.spriteShader = E.createSpriteShader(t),
                  this.spriteBatch = new g.SpriteBatch(t),
                  this.paletteShader = E.createPaletteShader(t),
                  this.paletteBatch = new y.PaletteSpriteBatch(t),
                  x.createTexturesForSpriteSheets(t, $.spriteSheets),
                  this.spriteBatch.rectSprite = $.pixel,
                  this.paletteBatch.rectSprite = $.rectSprite,
                  this.button = new b.SpriteButton($.bubble, 2, 2, 2, 2),
                  this.font = new _.SpriteFont($.font),
                  o(this.font)
            } catch (t) {
              throw console.error(t),
                  this.releaseWebGL(),
                  t
            }
          }
          ,
          t.prototype.releaseWebGL = function () {
            this.gl = null ,
                this.font = null ,
                this.button = null ,
                this.frameBuffer = l.dispose(this.frameBuffer),
                this.spriteShader = l.dispose(this.spriteShader),
                this.paletteShader = l.dispose(this.paletteShader),
                this.spriteBatch = l.dispose(this.spriteBatch),
                this.paletteBatch = l.dispose(this.paletteBatch),
                l.dispose(this.paletteManager),
                x.releaseTexturesForSpriteSheets($.spriteSheets)
          }
          ,
          t.prototype.updateCamera = function () {
            var t = this.scale * l.getPixelRatio();
            this.camera.w = Math.ceil(this.canvas.width / t),
                this.camera.h = Math.ceil(this.canvas.height / t)
          }
          ,
          t.prototype.release = function () {
            this.loaded = !1,
                this.selected = null ,
            this.socket && (this.socket.disconnect(),
                this.socket = null ),
                l.dispose(this.paletteManager),
                this.releaseWebGL()
          }
          ,
          t.prototype.startup = function (t, e) {
            this.selected = null ,
                this.socket = t,
                this.apply = e
          }
          ,
          t.prototype.update = function (t) {
            var e = this;
            if (this.socket && this.socket.isConnected) {
              var n = this.camera
                  , r = this.player
                  , o = this.map;
              if (i(this),
                      this.input.update(),
                      this.updateCamera(),
                  r && o && this.loaded) {
                var a = this.input.axisX
                    , s = this.input.axisY
                    , u = l.length(a, s)
                    , f = u < .5 || this.input.isPressed(16)
                    , p = l.vectorToDir(a, s)
                    , h = a || s ? l.dirToVector(p) : {
                  x: 0,
                  y: 0
                }
                    , d = a || s ? f ? 1 : 2 : 0
                    , m = l.flagsToSpeed(d)
                    , g = h.x * m
                    , y = h.y * m;
                if (r.vx !== g || r.vy !== y) {
                  var b = l.encodeMovement(r.x, r.y, p, d)
                      , _ = b[0]
                      , w = b[1];
                  this.socket.server.update(_, w)
                }
                if (r.vx = g,
                        r.vy = y,
                        n.update(r, o),
                        this.input.getAction(1002)) {
                  var x = this.scale
                      , E = n.screenToWorld({
                    x: this.input.getRange(1e3) / x,
                    y: this.input.getRange(1001) / x
                  })
                      , $ = o.pickEntities(E, this.input.isPressed(16))
                      , S = $[($.indexOf(this.selected) + 1) % $.length];
                  if (S)
                    "pony" === S.type ? this.select(S) : this.socket.server.interact(S.id);
                  else if (this.selected)
                    this.select(null);
                  else {
                    var T = this.map.getTile(0 | E.x, 0 | E.y) === v.TileType.Grass ? v.TileType.Dirt : v.TileType.Grass;
                    this.socket.server.changeTile(0 | E.x, 0 | E.y, T)
                  }
                }
                o.update(t);
                var k = r.x * c.tileWidth
                    , M = r.y * c.tileHeight;
                o.forEachEntity(function (t) {
                  t.coverBounds && (t.coverLifted = e.hideObjects || l.containsPoint(t.x * c.tileWidth, t.y * c.tileHeight, t.coverBounds, k, M))
                }),
                    this.hover = this.camera.screenToWorld({
                      x: this.input.getRange(1e3) / this.scale,
                      y: this.input.getRange(1001) / this.scale
                    })
              }
              this.timeSize += t,
                  this.textJump += 4 * t,
              this.timeSize > 1 && (this.sent = 8 * this.socket.sentSize / this.timeSize / 1024,
                  this.recv = 8 * this.socket.receivedSize / this.timeSize / 1024,
                  this.socket.sentSize = 0,
                  this.socket.receivedSize = 0,
                  this.timeSize = 0)
            }
          }
          ,
          t.prototype.draw = function () {
            if (this.gl) {
              var t = this.gl
                  , e = this.camera
                  , n = e.w
                  , r = e.h
                  , i = this.scale * l.getPixelRatio();
              if (this.initializeFrameBuffer(n, r),
                      t.enable(t.SCISSOR_TEST),
                      t.scissor(0, 0, n, r),
                      t.viewport(0, 0, n, r),
                      t.disable(t.DEPTH_TEST),
                      t.enable(t.BLEND),
                      t.blendEquation(t.FUNC_ADD),
                      t.blendFunc(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA),
                      t.clearColor(d.BG_COLOR.floatR, d.BG_COLOR.floatG, d.BG_COLOR.floatB, 1),
                      t.clear(t.COLOR_BUFFER_BIT),
                      this.map) {
                var o = E.createViewMatrix(this.viewMatrix, e.w, e.h, 1, -e.x, -e.y)
                    , a = m.getLight(this.getTime())
                    , s = a.toFloatArray();
                this.legacyRenderer ? (this.spriteBatch.begin(this.spriteShader),
                    this.spriteShader.uniforms.transform = o,
                    this.spriteShader.uniforms.lighting = s,
                    this.map.drawTiles(this.spriteBatch, e),
                    this.map.drawEntities(this.spriteBatch, e),
                    this.spriteBatch.end()) : (this.paletteManager.commit(this.gl),
                    this.paletteBatch.palette = this.paletteManager.texture,
                    this.spriteBatch.begin(this.spriteShader),
                    this.spriteShader.uniforms.transform = o,
                    this.spriteShader.uniforms.lighting = s,
                    this.map.drawTiles(this.spriteBatch, e),
                    this.spriteBatch.end(),
                    this.paletteBatch.begin(this.paletteShader),
                    this.paletteShader.uniforms.transform = o,
                    this.paletteShader.uniforms.lighting = s,
                    this.paletteShader.uniforms.pixelSize = this.paletteManager.pixelSize,
                    this.map.drawEntities2(this.paletteBatch, e),
                    this.paletteBatch.end())
              }
              if (this.spriteBatch.begin(this.spriteShader),
                      this.spriteShader.uniforms.transform = E.createViewMatrix(this.viewMatrix, e.w, e.h, 1),
                      this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                      this.drawChatAndNames(),
                      this.socket && this.socket.isConnected ? this.loaded || this.drawMessage(this.spriteBatch, "Loading...") : this.drawMessage(this.spriteBatch, "Connecting..."),
                      this.spriteBatch.end(),
                      t.disable(t.SCISSOR_TEST),
                      t.bindFramebuffer(t.FRAMEBUFFER, null),
                      t.viewport(0, 0, this.canvas.width, this.canvas.height),
                      this.spriteBatch.begin(this.spriteShader),
                      this.spriteShader.uniforms.transform = E.createViewMatrix2(this.viewMatrix, this.canvas.width, this.canvas.height, i),
                      this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                      this.spriteBatch.drawImage(this.frameBuffer.color[0], null, 0, 0, n, r, 0, 0, n, r),
                      M.debugOptions.showPalette) {
                var u = this.paletteManager;
                this.spriteBatch.drawRect(d.GRAY, 10, 10, u.textureSize, u.textureSize),
                    this.spriteBatch.drawImage(u.texture, null, 0, 0, u.textureSize, u.textureSize, 10, 10, u.textureSize, u.textureSize)
              }
              this.spriteBatch.end(),
                  this.updateStats()
            }
          }
          ,
          t.prototype.getTime = function () {
            return this.baseTime + Date.now()
          }
          ,
          t.prototype.resizeCanvas = function () {
            var t = window.innerWidth
                , e = window.innerHeight
                , n = l.getPixelRatio()
                , r = Math.round(t * n)
                , i = Math.round(e * n);
            k.resizeCanvas(this.canvas, r, i)
          }
          ,
          t.prototype.initializeFrameBuffer = function (t, e) {
            var n = E.getRenderTargetSize(t, e);
            if (n !== this.frameBuffer.shape[0]) {
              var r = this.gl.getParameter(this.gl.MAX_RENDERBUFFER_SIZE);
              if (n > r)
                return void this.scale++;
              this.frameBuffer.shape = [n, n]
            }
            this.frameBuffer.bind()
          }
          ,
          t.prototype.drawChatAndNames = function () {
            var t = this;
            this.hideText || this.map.forEachEntity(function (e) {
              var n = e.interactBounds || e.bounds;
              if (e !== t.player && e.name && n && l.contains(e.x, e.y, n, t.hover)) {
                var r = t.camera.worldToScreen(e);
                t.drawNamePlate(t.spriteBatch, e.name, r.x, r.y + n.y - 12)
              }
              if (e.says) {
                var r = t.camera.worldToScreen(e);
                t.drawSpeechBaloon(t.spriteBatch, e.says, r.x, r.y + n.y - 18)
              }
            })
          }
          ,
          t.prototype.updateStats = function () {
            var t = Date.now();
            if (t - this.lastStats > 1e3) {
              var e = this.spriteBatch.tris + this.paletteBatch.tris
                  , n = this.sent.toFixed()
                  , r = this.recv.toFixed()
                  , i = this.map ? this.map.entitiesDrawn : 0
                  , o = this.map ? this.map.getTotalEntities() : 0
                  , a = this.map ? this.map.getTotalEntities(function (t) {
                return t instanceof f.Pony
              }) : 0
                  , s = this.legacyRenderer ? "legacy" : ""
                  , u = M.debug ? "(" + i + "/" + o + ") " + e + " tris" : "";
              this.stats.textContent = s + " " + this.fps.toFixed(0) + " fps " + n + "/" + r + " kb/s " + a + " ponies " + u,
                  this.lastStats = t,
                  this.clock.textContent = m.formatHourMinutes(this.getTime())
            }
            this.spriteBatch.tris = 0,
                this.paletteBatch.tris = 0
          }
          ,
          t.prototype.drawMessage = function (t, e) {
            var n = 100
                , r = Math.round((this.camera.h - n) / 2);
            t.drawRect(d.MESSAGE_COLOR, 0, r, this.camera.w, n),
                this.font.drawTextAligned(t, e, d.WHITE, {
                  x: 0,
                  y: r,
                  w: this.camera.w,
                  h: n
                }, "center", "middle")
          }
          ,
          t.prototype.drawNamePlate = function (t, e, n, r) {
            var i = this.font.measureText(e)
                , o = n - Math.round(i.w / 2)
                , a = r - i.h + 8;
            this.font.drawText(t, e, d.BLACK, o, a)
          }
          ,
          t.prototype.drawSpeechBaloon = function (t, e, n, i) {
            var o = e.message
                , a = e.type
                , s = e.timer
                , u = this.font.measureText(o);
            if (l.intersect(0, 0, this.camera.w, this.camera.h, n - u.w / 2, i - u.h / 2, u.w, u.h)) {
              var f = .2
                  , p = (c.SAYS_TIME - s) / f
                  , h = s / f
                  , v = [3, 2, 1, 0, -1, 0]
                  , m = [-4, -3, -2, -1]
                  , g = p * v.length
                  , y = h * m.length
                  , b = l.clamp(Math.round(g), 0, v.length - 1)
                  , _ = l.clamp(Math.round(y), 0, m.length);
              i += _ < m.length ? m[_] : v[b];
              var w = Math.min(p, h, 1)
                  , x = 4
                  , E = n - Math.round(u.w / 2)
                  , S = i - u.h;
              t.globalAlpha = .6 * w,
                  this.button.draw(t, d.BLACK, E - x, S - x, u.w + 2 * x, u.h + 2 * x),
                  t.drawSprite($.nipple, d.BLACK, n - Math.round($.nipple.w / 2), i + x),
                  t.globalAlpha = w,
                  this.font.drawText(t, o, r(a), E, S),
                  t.globalAlpha = 1
            }
          }
          ,
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = D,
        n.exports
  });
  System.registerDynamic("2c", ["a3"], !0, function (t, e, n) {
    "use strict";
    var r, i = t("a3"), o = "undefined" != typeof document;
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          get game() {
            return o ? r ? r : r = new i.default : null
          }
        },
        n.exports
  });
  System.registerDynamic("a5", [], !0, function (t, e, n) {
    return n.exports = '<script type="text/ng-template" id="pony-box-note-popover.html"><textarea cols="20" rows="6" ag-auto-focus ng-model="vm.pony.note" ng-keydown="vm.keydown($event)" ng-blur="vm.blur()" class="form-control pony-box-note-editor"></textarea></script><div class="pony-box"><div class="pony-box-rect"><div class="pony-box-name">{{vm.name}}</div><div class="pony-box-buttons"><div class="btn-group"><button uib-tooltip="{{vm.pony.ignored ? \'Unignore player\' : \'Ignore player\'}}" ng-click="vm.toggleIgnore()" ng-class="{ \'btn-danger\': vm.pony.ignored }" class="btn btn-xs btn-default"><i class="fa fa-ban"></i></button></div> <a ng-if="vm.site" ng-href="{{vm.site.url}}" target="_blank" class="pony-box-site"><i ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}}</b></a></div><div ng-if="vm.isMod" class="btn-group pony-box-buttons-mod"><button ng-click="vm.report()" uib-tooltip="Report" class="btn btn-xs btn-default"><i class="fa fa-flag"></i></button><button uib-tooltip="{{vm.isNoteOpen ? null : vm.pony.note}}" tooltip-placement="bottom" tooltip-class="tooltip-pre" uib-popover-template="\'pony-box-note-popover.html\'" popover-placement="bottom" popover-is-open="vm.isNoteOpen" ng-class="{ \'btn-danger\': !!vm.pony.note }" class="btn btn-xs btn-default"><i class="fa fa-sticky-note"></i></button><div uib-dropdown ng-if="vm.isMod" uib-tooltip="{{vm.timeoutTooltip}}" class="btn-group dropdown"><button uib-dropdown-toggle ng-class="{ \'btn-danger\': vm.hasTimeout }" class="btn btn-xs btn-default"><i class="fa fa-clock-o"></i></button><ul uib-dropdown-menu class="dropdown-menu pull-right"><li ng-repeat="t in vm.timeouts"><a ng-click="vm.timeout(t.value)">{{t.label}}</a></li></ul></div><button ng-click="vm.toggleMute()" uib-tooltip="{{vm.pony.muted ? \'Unmute\' : \'Mute\'}}" ng-class="{ \'btn-danger\': vm.pony.muted }" class="btn btn-xs btn-default"><i class="fa fa-microphone-slash"></i></button><button ng-click="vm.toggleShadow()" uib-tooltip="{{vm.pony.shadow ? \'Unshadow\' : \'Shadow\'}}" ng-class="{ \'btn-danger\': vm.pony.shadow }" class="btn btn-xs btn-default"><i class="fa fa-eye-slash"></i></button></div></div><div class="pony-box-avatar"><canvas width="100" height="100"></canvas><div class="pony-box-avatar-cover"></div></div></div>',
        n.exports
  });
  System.registerDynamic("a6", ["52", "22", "53", "23", "54", "2c", "2d", "a5"], !0, function (t, e, n) {
    "use strict";
    var r = t("52")
        , i = t("22")
        , o = t("53")
        , a = t("23")
        , s = t("54")
        , u = t("2c")
        , l = t("2d")
        , c = u.default.game
        , f = 3
        , p = function () {
      function t(t, e) {
        this.$element = t,
            this.model = e,
            this.timeouts = i.TIMEOUTS,
            this.canvas = t.find("canvas")[0]
      }

      return Object.defineProperty(t.prototype, "isMod", {
        get: function () {
          return s.isMod(this.model.account)
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "hasTimeout", {
            get: function () {
              return new Date(this.pony.timeout) > new Date
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "timeoutTooltip", {
            get: function () {
              return this.hasTimeout ? r(this.pony.timeout).fromNow(!0) : "Timeout"
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.$onChanges = function (t) {
            if (t.pony) {
              this.name = l.emotes.reduce(function (t, e) {
                return t.replace(e.regex, e.symbol)
              }, this.pony.name),
                  this.site = this.pony.site ? l.toSocialSiteInfo(this.pony.site) : null;
              var e = this.canvas.getContext("2d");
              e.save(),
                  e.fillStyle = "#444",
                  e.fillRect(0, 0, this.canvas.width, this.canvas.height),
              this.pony && (e.translate(9 * f, 54 * f),
                  e.scale(-f, f),
                  a.disableImageSmoothing(e),
                  this.pony.drawHead(e)),
                  e.restore()
            }
          }
          ,
          t.prototype.report = function () {
            this.isMod && this.modAction(o.ModAction.Report)
          }
          ,
          t.prototype.timeout = function (t) {
            var e = this;
            this.isMod && this.modAction(o.ModAction.Timeout, t).then(function () {
              return e.pony.timeout = a.fromNow(t).toISOString()
            })
          }
          ,
          t.prototype.toggleIgnore = function () {
            this.playerAction(this.pony.ignored ? o.PlayerAction.Unignore : o.PlayerAction.Ignore),
                this.pony.ignored = !this.pony.ignored
          }
          ,
          t.prototype.toggleMute = function () {
            var t = this;
            this.isMod && this.modAction(this.pony.muted ? o.ModAction.Unmute : o.ModAction.Mute).then(function () {
              return t.pony.muted = !t.pony.muted
            })
          }
          ,
          t.prototype.toggleShadow = function () {
            var t = this;
            this.isMod && this.modAction(this.pony.shadow ? o.ModAction.Unshadow : o.ModAction.Shadow).then(function () {
              return t.pony.shadow = !t.pony.shadow
            })
          }
          ,
          t.prototype.blur = function () {
            this.isMod && (c.socket.server.setNote(this.pony.id, this.pony.note),
                this.isNoteOpen = !1)
          }
          ,
          t.prototype.keydown = function (t) {
            27 === t.keyCode && this.blur()
          }
          ,
          t.prototype.playerAction = function (t, e) {
            void 0 === e && (e = 0),
                c.socket.server.playerAction(this.pony.id, t)
          }
          ,
          t.prototype.modAction = function (t, e) {
            return void 0 === e && (e = 0),
                c.socket.server.modAction(this.pony.id, t, e)
          }
          ,
          t.$inject = ["$element", "model"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = {
          bindings: {
            pony: "<"
          },
          controller: p,
          controllerAs: "vm",
          template: t("a5")
        },
        n.exports
  });
  System.registerDynamic("a7", [getCodeName("BlueBird"), "52", "2e", "30", "32", "34", "36", "38", "3a", "3d", "3f", "40", "41", "46", "48", "4a", "4c", "4e", "50", "a6"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      t.run(["$rootScope", function (t) {
        i.setScheduler && i.setScheduler(function (e) {
          t.$evalAsync(e)
        })
      }
      ]),
          t.config(["$uibTooltipProvider", function (t) {
            t.options({
              appendToBody: !0
            })
          }
          ]),
          t.filter("fromNow", function () {
            var t = function (t, e) {
                  return o(t).fromNow(e)
                }
                ;
            return t.$stateful = !0,
                t
          }),
          t.service("gameService", a.GameService),
          t.service("model", s.Model),
          t.service("applyCallback", ["$rootScope", function (t) {
            return function (e) {
              t.$$phase ? e() : t.$apply(e)
            }
          }
          ]),
          t.directive("agDrag", u.default),
          t.directive("agAutoFocus", function () {
            return {
              restrict: "A",
              link: function (t, e) {
                setTimeout(function () {
                  return e[0].focus()
                }, 100)
              }
            }
          }),
          t.directive("a", function () {
            return {
              restrict: "E",
              link: function (t, e, n) {
                !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                    e[0].setAttribute("rel", "noopener noreferrer"))
              }
            }
          }),
          t.directive("fixToTop", ["$window", "$parse", function (t, e) {
            return {
              restrict: "A",
              link: function (n, r, i) {
                function o() {
                  var t = r[0].getBoundingClientRect().top;
                  u !== t < a && (u = t < a,
                      u ? r.addClass("fixed-to-top") : r.removeClass("fixed-to-top"),
                  s && n.$apply(function () {
                    return s(n, {
                      fixed: u
                    })
                  }))
                }

                var a = i.fixToTopOffset ? +i.fixToTopOffset : 0
                    , s = i.fixToTop ? e(i.fixToTop) : null
                    , u = !1;
                t.addEventListener("scroll", o),
                    n.$on("$destroy", function () {
                      return t.removeEventListener("scroll", o)
                    })
              }
            }
          }
          ]),
          t.component("colorPicker", l.default),
          t.component("checkBox", c.default),
          t.component("fillOutline", f.default),
          t.component("spriteBox", p.default),
          t.component("spriteSelection", h.default),
          t.component("spriteSetSelection", d.default),
          t.component("bitmapBox", v.default),
          t.component("characterPreview", m.default),
          t.component("chatBox", g.default),
          t.component("settingsBox", y.default),
          t.component("accountButton", b.default),
          t.component("menuBar", _.menuBar),
          t.component("menuItem", _.menuItem),
          t.component("signInBox", w.default),
          t.component("playBox", x.default),
          t.component("ponyBox", E.default)
    }

    var i = t(getCodeName("BlueBird"))
        , o = t("52")
        , a = t("2e")
        , s = t("30")
        , u = t("32")
        , l = t("34")
        , c = t("36")
        , f = t("38")
        , p = t("3a")
        , h = t("3d")
        , d = t("3f")
        , v = t("40")
        , m = t("41")
        , g = t("46")
        , y = t("48")
        , b = t("4a")
        , _ = t("4c")
        , w = t("4e")
        , x = t("50")
        , E = t("a6");
    return e.init = r,
        n.exports
  });
  System.registerDynamic("a8", [], !0, function (t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="app"><div ng-style="{ display: vm.playing ? \'block\' : \'none\' }" class="app-game"><canvas id="canvas"></canvas><span id="stats"></span><settings-box></settings-box><chat-box></chat-box><pony-box id="pony-box" pony="vm.selected" ng-if="vm.selected"></pony-box><div id="touch-origin"></div><div id="touch-position"></div></div><div ng-if="!vm.playing" class="app-cover"><div class="container"><menu-bar logo="true" model="vm.model"><menu-item href="/" name="Home"></menu-item><menu-item href="/about" name="About"></menu-item><menu-item href="/character" name="Characters" ng-if="vm.model.account"></menu-item></menu-bar><div><div ng-view class="app-view"></div></div><footer class="app-footer clearfix"><div class="pull-left text-muted text-nowrap">version <b>0.16.0-alpha</b></div><div class="pull-right text-muted text-nowrap">&copy; 2016 <a href="https://twitter.com/Agamnentzar" class="text-muted">Agamnentzar</a> | <a href="http://agamnentzar.deviantart.com/" title="DeviantArt" class="text-muted"><i class="fa fa-fw fa-deviantart"></i></a><a href="http://agamnentzar.tumblr.com/" title="Tumblr" class="text-muted"><i class="fa fa-fw fa-tumblr"></i></a><a href="https://twitter.com/Agamnentzar" title="Twitter" class="text-muted"><i class="fa fa-fw fa-twitter"></i></a><a href="https://github.com/Agamnentzar" title="Github" class="text-muted"><i class="fa fa-fw fa-github"></i></a> <a href="mailto:agamnentzar&#64;gmail.com" target="_blank" title="Email" class="text-muted"><i class="fa fa-fw fa-envelope"></i></a></div></footer></div></div></div>',
        n.exports
  });
  System.registerDynamic("44", ["20", "3b"], !0, function (t, e, n) {
    "use strict";
    function r() {
      return i || (i = a.loadSpriteSheets(o.spriteSheets, "/images/"))
    }

    var i, o = t("20"), a = t("3b");
    return e.loadSpriteSheets = r,
        n.exports
  });
  System.registerDynamic("a4", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      if (a)
        return a[t];
      try {
        return localStorage.getItem(t)
      } catch (t) {
        return
      }
    }

    function i(t, e) {
      try {
        localStorage.setItem(t, e),
            a = null
      } catch (n) {
        a || (a = {}),
            a[t] = e
      }
    }

    function o(t) {
      if (a)
        delete a[t];
      else
        try {
          localStorage.removeItem(t)
        } catch (t) {
        }
    }

    var a = null;
    return e.getItem = r,
        e.setItem = i,
        e.removeItem = o,
        n.exports
  });
  System.registerDynamic("a9", [getCodeName("Lodash"), "22", "23", "43", "31", "20", "44", "5c", "21", "a4"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t && t.fills && t.fills[0]
    }

    var i = t(getCodeName("Lodash"))
        , o = t("22")
        , a = t("23")
        , s = t("43")
        , u = t("31")
        , l = t("20")
        , c = t("44")
        , f = t("5c")
        , p = t("21")
        , h = t("a4")
        , d = l.ponyNoses[0]
        , v = function () {
      function t(t, e, n, r, i) {
        var u = this;
        this.$http = e,
            this.$location = n,
            this.gameService = r,
            this.model = i,
            this.maxNameLength = o.PLAYER_NAME_MAX_LENGTH,
            this.state = s.createDefaultPonyState(),
            this.saved = [],
            this.brushType = "brush",
            this.brush = "orange",
            this.horns = l.ponyHorns,
            this.manes = l.ponyManes,
            this.backManes = l.ponyBackManes,
            this.tails = l.ponyTails,
            this.facialHair = l.ponyFacialHair,
            this.wings = l.ponyWings,
            this.headAccessories = l.ponyHeadAccessories,
            this.earAccessories = l.ponyEarAccessories,
            this.faceAccessories = l.ponyFaceAccessories,
            this.neckAccessories = l.ponyNeckAccessories,
            this.frontLegAccessories = l.ponyFrontLegAccessoriesStand[0],
            this.backLegAccessories = l.ponyBackLegAccessoriesStand[0],
            this.frontHooves = [null, [[l.ponyFetlocksFrontStand[0]]]],
            this.backHooves = [null, [[l.ponyFetlocksBackStand[0]]]],
            this.animations = f.animations,
            this.activeAnimation = 0,
            this.muzzles = l.ponyNoses.map(function (t) {
              return {
                fill: null,
                outline: t.muzzle,
                extra: t.mouth
              }
            }),
            this.freckles = l.ponyFreckles.map(function (t) {
              return t ? {
                fill: t,
                outline: d.muzzle
              } : null
            }),
            this.fangs = [null, {
              fill: null,
              outline: d.muzzle,
              extra: d.fangs
            }],
            this.loaded = !1,
            this.playAnimation = !0,
            this.cmSize = o.CM_SIZE,
            this.deleting = !1,
            this.fixed = !1,
            this.nextBlink = 0,
            this.blinkFrames = s.BLINK_FRAMES,
            this.blinkFrame = -1,
            this.handleError = a.errorHandler(this),
            this.destroyed = !1,
            t.$on("$destroy", function () {
              return u.destroy()
            })
      }

      return Object.defineProperty(t.prototype, "customOutlines", {
        get: function () {
          return this.pony.customOutlines
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "ponies", {
            get: function () {
              return this.model.ponies
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "pony", {
            get: function () {
              return this.model.pony
            },
            set: function (t) {
              this.model.selectPony(t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "activeTab", {
            get: function () {
              return 0 | parseInt(h.getItem("character-active-tab"), 10)
            },
            set: function (t) {
              h.setItem("character-active-tab", t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "activeAccessoryTab", {
            get: function () {
              return 0 | parseInt(h.getItem("character-active-accessory-tab"), 10)
            },
            set: function (t) {
              h.setItem("character-active-accessory-tab", t)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseHairColor", {
            get: function () {
              return r(this.pony.mane)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseCoatColor", {
            get: function () {
              return this.pony.coatFill
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseHeadAccessoryColor", {
            get: function () {
              return r(this.pony.headAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseNeckAccessoryColor", {
            get: function () {
              return r(this.pony.neckAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseEarAccessoryColor", {
            get: function () {
              return r(this.pony.earAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseFaceAccessoryColor", {
            get: function () {
              return r(this.pony.faceAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseFrontLegAccessoryColor", {
            get: function () {
              return r(this.pony.frontLegAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "baseBackLegAccessoryColor", {
            get: function () {
              return r(this.pony.backLegAccessory)
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canExport", {
            get: function () {
              return p.debug
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "sites", {
            get: function () {
              return this.model.sites
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "site", {
            get: function () {
              var t = this;
              return this.sites.find(function (e) {
                    return e.id === t.pony.site
                  }) || this.sites[0]
            },
            set: function (t) {
              this.pony.site = t.id
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.init = function () {
            var t = this;
            if (this.model.accountPromise.then(function (e) {
                  e || t.$location.url("/")
                }),
                    p.debug) {
              var e, n;
              window.addEventListener("keydown", function (r) {
                71 === r.keyCode && (n || e || (n = t.pony.backLegAccessory,
                    e = t.pony.frontLegAccessory,
                    t.pony.backLegAccessory = null ,
                    t.pony.frontLegAccessory = null ))
              }),
                  window.addEventListener("keyup", function (r) {
                    71 === r.keyCode && (t.pony.backLegAccessory = n,
                        t.pony.frontLegAccessory = e,
                        n = null ,
                        e = null )
                  })
            }
            var r = Date.now();
            return c.loadSpriteSheets().then(function () {
              t.destroyed || (t.loaded = !0,
                  t.interval = setInterval(function () {
                    var e = Date.now();
                    t.update(e - r),
                        r = e
                  }, 1e3 / 24))
            })
          }
          ,
          t.prototype.destroy = function () {
            this.destroyed = !0,
                clearInterval(this.interval)
          }
          ,
          t.prototype.update = function (t) {
            var e = Date.now();
            this.state.animation = this.animations[this.activeAnimation],
            this.playAnimation && (this.state.animationFrame = (this.state.animationFrame + 1) % this.state.animation.frames),
                this.blinkFrame === -1 ? this.nextBlink < e && (this.blinkFrame = 0) : (this.blinkFrame++,
                this.blinkFrame >= this.blinkFrames.length && (this.nextBlink = e + 2e3 * Math.random() + 3e3,
                    this.blinkFrame = -1)),
                this.state.blinkFrame = this.blinkFrame === -1 ? 1 : this.blinkFrames[this.blinkFrame]
          }
          ,
          t.prototype.clearCM = function () {
            i.fill(this.pony.cm, "")
          }
          ,
          t.prototype.eyeColorLockChanged = function (t) {
            t && (this.pony.eyeColorLeft = this.pony.eyeColorRight)
          }
          ,
          t.prototype.eyeOpennessChanged = function (t) {
            t && (this.pony.eyeOpennessLeft = this.pony.eyeOpennessRight)
          }
          ,
          Object.defineProperty(t.prototype, "canNew", {
            get: function () {
              return this.ponies.length < o.PONY_LIMIT
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.new = function () {
            this.canNew && (this.deleting = !1,
                this.pony = u.createDefaultPony())
          }
          ,
          t.prototype.select = function (t) {
            t && (this.deleting = !1,
                this.pony = t)
          }
          ,
          Object.defineProperty(t.prototype, "canSave", {
            get: function () {
              return !this.model.saving && !!this.pony && !!this.pony.name
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.save = function () {
            this.canSave && (this.error = null ,
                this.deleting = !1,
                this.model.savePony(this.pony).catch(this.handleError))
          }
          ,
          Object.defineProperty(t.prototype, "canRevert", {
            get: function () {
              var t = this;
              return !!this.pony.id && this.ponies.some(function (e) {
                    return e.id === t.pony.id
                  })
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.revert = function () {
            this.canRevert && this.select(a.findById(this.ponies, this.pony.id))
          }
          ,
          Object.defineProperty(t.prototype, "canDelete", {
            get: function () {
              return !!this.pony.id
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.delete = function () {
            this.canDelete && (this.error = null ,
                this.deleting = !1,
                this.model.removePony(this.pony).catch(this.handleError))
          }
          ,
          Object.defineProperty(t.prototype, "canDuplicate", {
            get: function () {
              return this.canNew
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.duplicate = function () {
            this.canDuplicate && (this.deleting = !1,
                this.pony = i.cloneDeep(this.pony),
                this.pony.name = "",
                delete this.pony.id)
          }
          ,
          t.prototype.export = function () {
            var t = 80
                , e = 80
                , n = this.animations.reduce(function (t, e) {
              return t + e.frames
            }, 0)
                , r = a.createCanvas(t * n, e)
                , i = r.getContext("2d")
                , o = u.toRenderInfo(this.pony)
                , l = 0;
            this.animations.forEach(function (n) {
              for (var r = 0; r < n.frames; r++,
                  l++) {
                var a = {
                  animation: n,
                  animationFrame: r,
                  blinkFrame: 1
                };
                s.drawPony2D(i, o, a, l * t + t / 2, e - 10)
              }
            }),
                window.open(r.toDataURL())
          }
          ,
          t.$inject = ["$scope", "$http", "$location", "gameService", "model"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = v,
        n.exports
  });
  System.registerDynamic("2d", [getCodeName("Lodash"), "20", "21"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t.replace(c, function (t) {
        return a.repeat("*", t.length)
      })
    }

    function i(t) {
      return /[\u0400-\u04FF]/.test(t)
    }

    function o(t) {
      var e = t.id
          , n = t.name
          , r = t.url
          , i = t.provider
          , o = u.oauthProviders.find(function (t) {
        return t.id === i
      });
      return {
        id: e,
        name: n,
        url: r,
        icon: o && o.icon,
        color: o && o.color
      }
    }

    var a = t(getCodeName("Lodash"))
        , s = t("20")
        , u = t("21");
    e.emotes = [{
      regex: /:apple:/g,
      symbol: "🍎",
      sprite: s.apple.color
    }, {
      regex: /:heart:/g,
      symbol: "❤",
      sprite: s.heartemote
    }, {
      regex: /:pumpkin:/g,
      symbol: "🎃",
      sprite: s.pumpkinemote
    }, {
      regex: /:pizza:/g,
      symbol: "🍕",
      sprite: s.pizzaemote
    }, {
      regex: /:rock:/g,
      symbol: "⽯",
      sprite: s.rockemote
    }, {
      regex: /:face:/g,
      symbol: "ツ",
      sprite: null
    }, {
      regex: /:derp:/g,
      symbol: "シ",
      sprite: null
    }];
    var l = ["all?ahu?", "aids", "akbar", "alt ?[+-] ?f4", "anal", "anus", "(bitch)?ass(fuck|hole|hat|licker|wipe)?", "autis(ts?|ms?|tic)", "bitch(e?s)?", "(blow|hoof|foot|hand|rim) ?jobs?", "boners?", "boob(s|ie|ies)?", "buttplugs?", "can[cs]er(s|ous)?", "(horse|mare)?cocks?", "clit(oris)?", "(ctrl|control) ?[+-]? ?w", "cum(s|ming)?", "cumdump(sters?)?", "cunts?", "deepthroat(ing)?", "(horse)?dicks?", "dildos?", "fap(p?ing)?", "foalcon", "(brony|furry?|gay|horse|pony|nigg?er)?fag(s|g?[oi]t(s|ry)?)?", "(brony|furry?|gay|horse|pony|nigg?er|butt|mother)?fu(c|k|cc|ck)(ed|er|ing?|able|face|balls|toy)?", "gang ?bang(ed|ing)?", "hitlers?", "(in|self)cest", "jizz(ed|ing)?", "lubed?", "masturbat(e|tion|ing)?", "milfs?", "molest(ation|ing|ed|ia)?", "nazi(s|sm|sts?)?", "negros?", "nigg?as?", "nigg?[e3](rs?|st)?", "norm(y|ies?)", "orgasms?", "org(y|ies)", "piss(ing)?", "penis(es)?", "porno?", "prostitutes?", "(octo|horse|pony)?puss(y|ies)?(juice)?", "raep", "rap(e|ed|es|ing)", "retards?", "sieg ?h[ea]il", "semen", "(anal|butt)?(sex|secks|secs|seks)", "(bull)?shit(s|ting)?", "slut(s|ty)?", "spunk", "(cock)?suck(ing|er)?", "tit(s|ty|ties?)?", "tranny", "wank(ing|ers?)?", "whores?", "vaginas?", "vulva"]
        , c = new RegExp("\\b(" + l.join("|") + ")\\b", "gi");
    return e.filterBadWords = r,
        e.containsCyrillic = i,
        e.toSocialSiteInfo = o,
        n.exports
  });
  System.registerDynamic("aa", [getCodeName("Lodash"), "22", "2d", "23"], !0, function (t, e, n) {
    "use strict";
    var r = t(getCodeName("Lodash"))
        , i = t("22")
        , o = t("2d")
        , a = t("23")
        , s = function () {
      function t(t, e, n) {
        var r = this;
        this.$location = e,
            this.model = n,
            this.nameMinLength = i.ACCOUNT_NAME_MIN_LENGTH,
            this.nameMaxLength = i.ACCOUNT_NAME_MAX_LENGTH,
            this.settings = {},
            this.handleError = a.errorHandler(this),
            t.$watchCollection("[vm.settings.filterSwearWords, vm.settings.filterCyrillic]", function () {
              return r.saveSettings()
            })
      }

      return t.prototype.init = function () {
        var t = this;
        this.model.accountPromise.then(function (e) {
          e ? (t.settings = r.clone(e.settings),
              t.sites = e.sites.map(o.toSocialSiteInfo),
              t.data = {
                name: e.name
              }) : t.$location.url("/")
        })
      }
          ,
          Object.defineProperty(t.prototype, "canSubmit", {
            get: function () {
              return this.data && this.data.name && !!this.data.name.trim().length
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.submit = function () {
            this.canSubmit && (this.error = null ,
                this.model.updateAccount(this.data).catch(this.handleError))
          }
          ,
          t.prototype.saveSettings = function () {
            this.model.account && !r.isEqual(this.settings, this.model.account.settings) && this.model.saveSettings(this.settings).catch(this.handleError)
          }
          ,
          t.$inject = ["$scope", "$location", "model"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = s,
        n.exports
  });
  System.registerDynamic("28", [getCodeName("Lodash"), getCodeName("gl-texture2d"), "23"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      t && t.refs && t.refs--
    }

    var i = t(getCodeName("Lodash"))
        , o = t(getCodeName("gl-texture2d"))
        , a = t("23")
        , s = 128
        , u = 1024;
    e.releasePalette = r;
    var l = function () {
      function t(t) {
        void 0 === t && (t = s),
            this.size = t,
            this.palettes = [],
            this.dirty = [],
            this.dirtyMinY = 0,
            this.dirtyMaxY = -1,
            this.lastX = 0,
            this.lastY = 0,
        "undefined" != typeof window && (window.paletteManager = this)
      }

      return Object.defineProperty(t.prototype, "textureSize", {
        get: function () {
          return this.size
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "pixelSize", {
            get: function () {
              return 256 / this.size
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.add = function (t) {
            var e = t.map(function (t) {
              return t >>> 0
            })
                , n = i.find(this.palettes, function (t) {
              return a.arraysEqual(t.colors, e)
            });
            if (n)
              return n.refs++,
                  n;
            var r = {
              x: 0,
              y: 0,
              u: 0,
              v: 0,
              refs: 1,
              colors: e
            };
            return this.palettes.push(r),
                this.dirty.push(r),
                r
          }
          ,
          t.prototype.commit = function (t) {
            if (this.texture || this.initializeTexture(t, this.size),
                    this.dirty.length) {
              if (!this.arrange(this.dirty))
                for (this.cleanupPalettes(); !this.arrange(this.dirty);) {
                  if (!(this.size < u))
                    throw new Error("Exceeded maximum palettes limit");
                  this.initializeTexture(t, 2 * this.size)
                }
              this.updateTexture(),
                  this.dirty = []
            }
          }
          ,
          t.prototype.dispose = function () {
            this.texture && (this.texture.dispose(),
                this.texture = null ),
                this.size = s,
                this.palettes = [],
                this.resetPalettes()
          }
          ,
          t.prototype.resetPalettes = function () {
            this.dirty = this.palettes,
                this.lastX = 0,
                this.lastY = 0
          }
          ,
          t.prototype.cleanupPalettes = function () {
            this.palettes = this.palettes.filter(function (t) {
              return t.refs > 0
            }),
                this.resetPalettes()
          }
          ,
          t.prototype.initializeTexture = function (t, e) {
            this.texture && this.texture.dispose();
            try {
              this.texture = o(t, [e, e])
            } catch (t) {
              throw new Error("Failed to create canvas (" + e + "): " + t.message)
            }
            this.size = e,
                this.resetPalettes()
          }
          ,
          t.prototype.arrange = function (t) {
            if (!t)
              return !0;
            for (var e = this.size, n = this.lastX, r = this.lastY, i = -1, o = -1, a = 0; a < t.length; a++) {
              var s = t[a];
              if (e - n < s.colors.length && (n = 0,
                      r++,
                  r >= e))
                return !1;
              s.x = n,
                  s.y = r,
                  s.u = (n + .5) / e,
                  s.v = (r + .5) / e,
                  n += s.colors.length,
                  i = i === -1 ? r : i,
                  o = Math.max(o, r)
            }
            return this.lastX = n,
                this.lastY = r,
                this.dirtyMinY = i,
                this.dirtyMaxY = o,
                !0
          }
          ,
          t.prototype.updateTexture = function () {
            if (!(this.dirtyMinY > this.dirtyMaxY)) {
              for (var t = a.getTempCanvas().getContext("2d").createImageData(this.size, this.dirtyMaxY - this.dirtyMinY + 1), e = this.palettes, n = 0; n < e.length; n++) {
                var r = e[n]
                    , i = r.x
                    , o = r.y
                    , s = r.colors;
                if (!(o < this.dirtyMinY || o > this.dirtyMaxY))
                  for (var u = 4 * (i + (o - this.dirtyMinY) * t.width), l = 0; l < s.length; l++) {
                    var c = s[l];
                    t.data[u++] = c >> 24 & 255,
                        t.data[u++] = c >> 16 & 255,
                        t.data[u++] = c >> 8 & 255,
                        t.data[u++] = c >> 0 & 255
                  }
              }
              this.texture.setPixels(t, 0, this.dirtyMinY),
                  this.dirtyMinY = 0,
                  this.dirtyMaxY = -1
            }
          }
          ,
          t
    }();
    return e.PaletteManager = l,
        n.exports
  });
  System.registerDynamic("39", ["35"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      var e = a.default.parseWithAlpha(t, 1).hsva();
      return e.v *= .7,
          e.s = Math.min(1.3 * e.s, 1),
          a.default.fromHsvaObject(e).css()
    }

    function i(t) {
      return o(t, .8)
    }

    function o(t, e) {
      var n = a.default.parseWithAlpha(t, 1).hsva();
      return n.v *= e,
          a.default.fromHsvaObject(n).css()
    }

    var a = t("35");
    return e.fillToOutline = r,
        e.colorToFar = i,
        e.darkenColor = o,
        n.exports
  });
  System.registerDynamic("31", [getCodeName("Lodash"), "20", "28", "23", "39", "22", "35"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return R.mergeWith({}, o(), R.cloneDeep(t), function (t, e) {
        if (null == e)
          return t
      })
    }

    function i(t, e, n) {
      void 0 === e && (e = !0),
      void 0 === n && (n = "gold");
      var r = [n, "dodgerblue", "limegreen", "orchid", "crimson", "aquamarine"]
          , i = r.map(N.fillToOutline);
      return {
        type: t,
        pattern: 0,
        fills: r,
        outlines: i,
        lockFills: [e, !1, !1, !1, !1, !1],
        lockOutlines: [!0, !0, !0, !0, !0, !0]
      }
    }

    function o() {
      return {
        id: null,
        name: "",
        site: null,
        horn: i(0, !0, "red"),
        wings: i(0, !0, "red"),
        frontHooves: i(0, !1, "orange"),
        backHooves: i(0, !1, "orange"),
        mane: i(2, !1),
        backMane: i(1),
        tail: i(1),
        facialHair: i(0),
        headAccessory: i(0, !1, "violet"),
        earAccessory: i(0, !1, "gray"),
        faceAccessory: i(0, !1, "black"),
        neckAccessory: i(0, !1, "violet"),
        frontLegAccessory: i(0, !1, "violet"),
        backLegAccessory: i(0, !1, "violet"),
        lockBackLegAccessory: !0,
        coatFill: "red",
        coatOutline: "darkred",
        lockCoatOutline: !0,
        eyelashes: 0,
        eyeColorLeft: "goldenrod",
        eyeColorRight: "goldenrod",
        eyeWhites: "white",
        eyeOpennessLeft: 1,
        eyeOpennessRight: 1,
        eyeshadow: !1,
        eyeshadowColor: "black",
        lockEyes: !0,
        lockEyeColor: !0,
        fangs: 0,
        muzzle: 0,
        freckles: 0,
        frecklesColor: "darkred",
        cm: R.range(0, L.CM_SIZE * L.CM_SIZE).map(function () {
          return ""
        }),
        cmFlip: !1,
        customOutlines: !1
      }
    }

    function a(t) {
      return U.default.parseWithAlpha(t, 1)
    }

    function s(t) {
      return a(N.colorToFar(t))
    }

    function u(t) {
      return s(t && t[0] ? t[0] : "black")
    }

    function l(t) {
      return U.default.parse(t)
    }

    function c(t) {
      return t ? t.map(a) : null
    }

    function f(t) {
      return t ? {
        type: t.type,
        pattern: t.pattern,
        fills: c(t.fills),
        outlines: c(t.outlines),
        lockFills: t.lockFills,
        lockOutlines: t.lockOutlines
      } : null
    }

    function p(t) {
      return t ? {
        type: t.type,
        pattern: t.pattern,
        fills: t.fills && t.fills.map(s),
        outlines: t.outlines && t.outlines.map(s),
        lockFills: t.lockFills,
        lockOutlines: t.lockOutlines
      } : null
    }

    function h(t) {
      return {
        name: t.name,
        site: t.site,
        horn: f(t.horn),
        wings: f(t.wings),
        frontHooves: f(t.frontHooves),
        backHooves: f(t.backHooves),
        mane: f(t.mane),
        backMane: f(t.backMane),
        tail: f(t.tail),
        facialHair: f(t.facialHair),
        headAccessory: f(t.headAccessory),
        earAccessory: f(t.earAccessory),
        faceAccessory: f(t.faceAccessory),
        neckAccessory: f(t.neckAccessory),
        frontLegAccessory: f(t.frontLegAccessory),
        backLegAccessory: f(t.lockBackLegAccessory ? t.frontLegAccessory : t.backLegAccessory),
        lockBackLegAccessory: t.lockBackLegAccessory,
        coatFill: a(t.coatFill),
        coatOutline: a(t.coatOutline),
        lockCoatOutline: t.lockCoatOutline,
        darkCoatFill: s(t.coatFill),
        darkCoatOutline: s(t.coatOutline),
        eyelashes: t.eyelashes,
        eyeColorLeft: a(t.eyeColorLeft),
        eyeColorRight: a(t.eyeColorRight),
        eyeWhites: a(t.eyeWhites),
        eyeOpennessLeft: t.eyeOpennessLeft,
        eyeOpennessRight: t.eyeOpennessRight,
        eyeshadow: t.eyeshadow,
        eyeshadowColor: a(t.eyeshadowColor),
        lockEyes: t.lockEyes,
        lockEyeColor: t.lockEyeColor,
        fangs: t.fangs,
        muzzle: t.muzzle,
        freckles: t.freckles,
        frecklesColor: a(t.frecklesColor),
        cm: t.cm && t.cm.map(l),
        cmFlip: t.cmFlip,
        darkFrontHoovesFill: u(t.frontHooves && t.frontHooves.fills),
        darkFrontHoovesOutline: u(t.frontHooves && t.frontHooves.outlines),
        darkBackHoovesFill: u(t.backHooves && t.backHooves.fills),
        darkBackHoovesOutline: u(t.backHooves && t.backHooves.outlines),
        darkBackLegAccessory: p(t.lockBackLegAccessory ? t.frontLegAccessory : t.backLegAccessory),
        darkFrontLegAccessory: p(t.frontLegAccessory),
        customOutlines: t.customOutlines
      }
    }

    function d(t) {
      return t.map(function (t) {
        return t ? t.map(function (t) {
          return t.length
        }) : [0]
      })
    }

    function v(t) {
      return t ? U.default.parse(t).toHexRGB() : ""
    }

    function m(t) {
      return Object.keys(t).forEach(function (e) {
        null == t[e] && delete t[e]
      }),
          t
    }

    function g(t) {
      return t ? 1 : 0
    }

    function y(t) {
      return !!+t
    }

    function b(t, e) {
      return t.slice(0, e).map(g).join(" ")
    }

    function _(t) {
      return t && t.split ? t.split(" ").map(y) : null
    }

    function w(t, e) {
      return t.slice(0, e).map(v).join(" ")
    }

    function x(t) {
      return t && t.split ? t.split(" ") : null
    }

    function E(t, e, n, r) {
      if (void 0 === n && (n = !0),
          void 0 === r && (r = 0),
          !t || n && 0 === t.type)
        return null;
      var i = e ? d(e) : null
          , o = Math.max(i ? j.at(j.at(i, t.type), t.pattern) : 6, r);
      return [t.type, t.pattern, w(t.fills, o), w(t.outlines, o), b(t.lockFills, o), b(t.lockOutlines, o)]
    }

    function $(t) {
      return t ? {
        type: t[0],
        pattern: t[1],
        fills: x(t[2]),
        outlines: x(t[3]),
        lockFills: _(t[4]),
        lockOutlines: _(t[5])
      } : null
    }

    function S(t) {
      var e = {
        name: t.name,
        site: t.site,
        h: E(t.horn, F.ponyHorns),
        w: E(t.wings, F.ponyWings),
        fh: E(t.frontHooves, null),
        bh: E(t.backHooves, null),
        m: E(t.mane, F.ponyManes, !1, 1),
        bm: E(t.backMane, F.ponyBackManes, !1),
        t: E(t.tail, F.ponyTails, !1),
        fac: E(t.facialHair, F.ponyFacialHair),
        ha: E(t.headAccessory, F.ponyHeadAccessories),
        ea: E(t.earAccessory, F.ponyEarAccessories),
        fa: E(t.faceAccessory, F.ponyFaceAccessories),
        na: E(t.neckAccessory, F.ponyNeckAccessories),
        fla: E(t.frontLegAccessory, F.ponyFrontLegAccessoriesStand[0]),
        bla: t.lockBackLegAccessory ? null : E(t.backLegAccessory, F.ponyBackLegAccessoriesStand[0]),
        lbl: g(t.lockBackLegAccessory),
        cf: v(t.coatFill),
        co: v(t.coatOutline),
        lco: g(t.lockCoatOutline),
        el: t.eyelashes,
        ecl: v(t.eyeColorLeft),
        ecr: v(t.eyeColorRight),
        ew: v(t.eyeWhites),
        eol: t.eyeOpennessLeft,
        eor: t.eyeOpennessRight,
        es: g(t.eyeshadow),
        esc: v(t.eyeshadowColor),
        le: g(t.lockEyes),
        lec: g(t.lockEyeColor),
        fan: t.fangs,
        mu: t.muzzle,
        fr: t.freckles,
        frc: t.freckles ? v(t.frecklesColor) : null,
        cm: t.cm && t.cm.some(function (t) {
          return !!t
        }) ? R.dropRightWhile(t.cm.map(v), function (t) {
          return !t
        }) : null,
        cmf: g(t.cmFlip),
        col: g(t.customOutlines)
      };
      return m(e)
    }

    function T(t) {
      var e = {
        id: t.id,
        name: t.name,
        site: t.site,
        lastUsed: t.lastUsed,
        horn: $(t.h),
        wings: $(t.w),
        frontHooves: $(t.fh),
        backHooves: $(t.bh),
        mane: $(t.m),
        backMane: $(t.bm),
        tail: $(t.t),
        facialHair: $(t.fac),
        headAccessory: $(t.ha),
        earAccessory: $(t.ea),
        faceAccessory: $(t.fa),
        neckAccessory: $(t.na),
        frontLegAccessory: $(t.fla),
        backLegAccessory: $(t.bla),
        lockBackLegAccessory: y(t.lbl),
        coatFill: t.cf,
        coatOutline: t.co,
        lockCoatOutline: y(t.lco),
        eyelashes: t.el,
        eyeColorLeft: t.ecl,
        eyeColorRight: t.ecr,
        eyeWhites: t.ew,
        eyeOpennessLeft: t.eol,
        eyeOpennessRight: t.eor,
        eyeshadow: y(t.es),
        eyeshadowColor: t.esc,
        lockEyes: y(t.le),
        lockEyeColor: y(t.lec),
        fangs: t.fan,
        muzzle: t.mu,
        freckles: t.fr,
        frecklesColor: t.frc,
        cm: t.cm,
        cmFlip: y(t.cmf),
        customOutlines: y(t.col)
      };
      return r(e)
    }

    function k(t, e) {
      for (var n = t || [], r = e || [], i = Math.max(n.length, r.length), o = [], a = 0; a < i; a++)
        o.push(n[a] || "000000"),
            o.push(r[a] || "000000");
      return o
    }

    function M(t) {
      return k(t.fills, t.outlines)
    }

    function A(t) {
      return [0].concat(t.map(U.default.parseFast))
    }

    function C(t, e) {
      var n = t && j.at(e, t.type)
          , r = n && j.at(n, t.pattern);
      return r && r.palette
    }

    function D(t, e, n) {
      if (!t)
        return null;
      var r = C(t, e);
      return {
        type: t.type,
        pattern: t.pattern,
        palette: n.add(A(M(t))),
        extraPalette: r ? n.add(r) : null
      }
    }

    function O(t, e) {
      return {
        name: t.name,
        site: t.site,
        horn: D(t.horn, F.ponHorns, e),
        wings: D(t.wings, F.ponWings, e),
        frontHooves: D(t.frontHooves, [null, [{
          color: F.ponFetlocksFrontStand[0]
        }]], e),
        backHooves: D(t.backHooves, [null, [{
          color: F.ponFetlocksBackStand[0]
        }]], e),
        mane: D(t.mane, F.ponManes, e),
        backMane: D(t.backMane, F.ponBackManes, e),
        tail: D(t.tail, F.ponTails, e),
        facialHair: D(t.facialHair, F.ponFacialHair, e),
        headAccessory: D(t.headAccessory, F.ponHeadAccessories, e),
        earAccessory: D(t.earAccessory, F.ponEarAccessories, e),
        faceAccessory: D(t.faceAccessory, F.ponFaceAccessories, e),
        neckAccessory: D(t.neckAccessory, F.ponNeckAccessories, e),
        frontLegAccessory: D(t.frontLegAccessory, F.ponFrontLegAccessoriesStand[0], e),
        backLegAccessory: D(t.lockBackLegAccessory ? t.frontLegAccessory : t.backLegAccessory, F.ponBackLegAccessoriesStand[0], e),
        lockBackLegAccessory: t.lockBackLegAccessory,
        coatPalette: e.add(A([t.coatFill, t.coatOutline])),
        coatFill: null,
        coatOutline: null,
        lockCoatOutline: t.lockCoatOutline,
        eyelashes: t.eyelashes,
        eyePalette: e.add(A([t.eyeWhites, "000000"])),
        eyeColorLeft: e.add(A([t.eyeColorLeft])),
        eyeColorRight: e.add(A([t.eyeColorRight])),
        eyeWhites: null,
        eyeOpennessLeft: t.eyeOpennessLeft,
        eyeOpennessRight: t.eyeOpennessRight,
        eyeshadow: t.eyeshadow,
        eyeshadowColor: e.add(A([t.eyeshadowColor])),
        lockEyes: t.lockEyes,
        lockEyeColor: t.lockEyeColor,
        fangs: t.fangs,
        muzzle: t.muzzle,
        freckles: t.freckles,
        frecklesColor: e.add(A([t.frecklesColor])),
        cm: null,
        cmFlip: t.cmFlip,
        cmPalette: t.cm ? e.add(t.cm.map(function (t) {
          return t ? U.default.parseFast(t) : 0
        })) : null,
        customOutlines: t.customOutlines,
        defaultPalette: e.add(A(["ffffff", "000000", "721946", "f39f4b"]))
      }
    }

    function I(t) {
      R.forOwn(t, P.releasePalette)
    }

    var R = t(getCodeName("Lodash"))
        , F = t("20")
        , P = t("28")
        , j = t("23")
        , N = t("39")
        , L = t("22")
        , U = t("35");
    return e.fixPony = r,
        e.createSpriteSet = i,
        e.createDefaultPony = o,
        e.toRenderInfo = h,
        e.compressPonyInfo = S,
        e.decompressPonyInfo = T,
        e.toPalette = O,
        e.releasePalettes = I,
        n.exports
  });
  System.registerDynamic("25", ["35"], !0, function (t, e, n) {
    "use strict";
    var r = t("35");
    return e.WHITE = r.default.parse("white"),
        e.BLACK = r.default.parse("black"),
        e.ORANGE = r.default.parse("orange"),
        e.BLUE = r.default.parse("blue"),
        e.GRAY = r.default.parse("#444"),
        e.RED = r.default.parse("red"),
        e.PURPLE = r.default.parse("purple"),
        e.BG_COLOR = r.default.parse("#333"),
        e.ADMIN_COLOR = r.default.parse("HotPink"),
        e.SYSTEM_COLOR = r.default.parse("#999"),
        e.MESSAGE_COLOR = r.default.parse("#333"),
        e.SHADOW_COLOR = new r.default(0, 0, 0, .3),
        e.CLOUD_SHADOW_COLOR = new r.default(0, 0, 0, .2),
        e.SHINES_COLOR = new r.default(255, 255, 255, .4),
        e.FAR_COLOR = r.default.fromHsva(0, 0, .8, 1),
        n.exports
  });
  System.registerDynamic("c9", [], !0, function (t, e, n) {
    var r = new Int8Array(4)
        , i = new Int32Array(r.buffer, 0, 1)
        , o = new Float32Array(r.buffer, 0, 1)
        , a = function () {
        }
        ;
    return a.intBitsToFloat = function (t) {
      return i[0] = t,
          o[0]
    }
        ,
        a.floatToIntBits = function (t) {
          return o[0] = t,
              i[0]
        }
        ,
        a.intToFloatColor = function (t) {
          return a.intBitsToFloat(4278190079 & t)
        }
        ,
        a.colorToFloat = function (t, e, n, r) {
          var i = r << 24 | n << 16 | e << 8 | t;
          return a.intToFloatColor(i)
        }
        ,
        a.isPowerOfTwo = function (t) {
          return 0 === (t & t - 1)
        }
        ,
        a.nextPowerOfTwo = function (t) {
          return t--,
              t |= t >> 1,
              t |= t >> 2,
              t |= t >> 4,
              t |= t >> 8,
              t |= t >> 16,
          t + 1
        }
        ,
        n.exports = a,
        n.exports
  });
  System.registerDynamic("ca", ["c9"], !0, function (t, e, n) {
    return n.exports = t("c9"),
        n.exports
  });
  System.registerDynamic("35", ["ca"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      var e = (0 | t).toString(16);
      return 2 === e.length ? e : "0" + e
    }

    var i = t("ca")
        , o = function () {
      function t(t, e, n, r) {
        void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === n && (n = 0),
        void 0 === r && (r = 1),
            this.r = 0 | t,
            this.g = 0 | e,
            this.b = 0 | n,
            this.a = +r
      }

      return Object.defineProperty(t.prototype, "floatR", {
        get: function () {
          return this.r / 255
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "floatG", {
            get: function () {
              return this.g / 255
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "floatB", {
            get: function () {
              return this.b / 255
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "floatA", {
            get: function () {
              return this.a
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.toInt = function () {
            return (this.r << 24 | this.g << 16 | this.b << 8 | 255 * this.a) >>> 0
          }
          ,
          t.prototype.toFloat = function (t) {
            return void 0 === t && (t = 1),
                i.colorToFloat(this.r, this.g, this.b, this.a * t * 255)
          }
          ,
          t.prototype.toFloatArray = function () {
            return [this.floatR, this.floatG, this.floatB, this.floatA]
          }
          ,
          t.prototype.toHexRGB = function () {
            return r(this.r) + r(this.g) + r(this.b)
          }
          ,
          t.prototype.toHexRGBA = function () {
            return r(this.r) + r(this.g) + r(this.b) + r(255 * this.a)
          }
          ,
          t.prototype.toRGB = function () {
            return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
          }
          ,
          t.prototype.toRGBA = function () {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
          }
          ,
          t.prototype.complementary = function () {
            var e = this.hsva();
            return e.h += e.h >= 180 ? -180 : 180,
                t.fromHsvaObject(e)
          }
          ,
          t.prototype.css = function () {
            return 1 === this.a ? "#" + this.toHexRGB() : this.toRGBA()
          }
          ,
          t.prototype.hsva = function (e) {
            return t.rgb2hsv(this.r, this.g, this.b, this.a, e)
          }
          ,
          t.prototype.equal = function (t) {
            return !!t && this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a
          }
          ,
          t.prototype.darken = function (t) {
            this.r *= t,
                this.g *= t,
                this.b *= t
          }
          ,
          t.compare = function (t, e) {
            if (null === t && null === e)
              return 0;
            if (null == t || null == e)
              return 1;
            var n = t.hsva()
                , r = e.hsva();
            return .25 * (Math.abs(n.h - r.h) / 360) + .25 * Math.abs(n.s - r.s) + .25 * Math.abs(n.v - r.v) + .25 * Math.abs(n.a - r.a)
          }
          ,
          t.lerp = function (e, n, r) {
            var i = r
                , o = 1 - r;
            return new t(e.r * o + n.r * i, e.g * o + n.g * i, e.b * o + n.b * i, e.a * o + n.a * i)
          }
          ,
          t.fromHsva = function (e, n, r, i) {
            var o = t.hsv2rgb(e, n, r, i);
            return new t(o.r, o.g, o.b, o.a)
          }
          ,
          t.fromHsvaObject = function (e) {
            return t.fromHsva(e.h, e.s, e.v, e.a)
          }
          ,
          t.fromInt = function (e) {
            return new t(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (255 & e) / 255)
          }
          ,
          t.parseFast = function (e) {
            var n = parseInt(e, 16);
            return 6 !== e.length || isNaN(n) || n < 0 ? t.parseWithAlpha(e, 1).toInt() : (n << 8 | 255) >>> 0
          }
          ,
          t.parse = function (e) {
            if ("string" != typeof e)
              return new t(0, 0, 0, 0);
            if (e = e.trim().toLowerCase(),
                "" === e || "none" === e || "transparent" === e)
              return new t(0, 0, 0, 0);
            e = t.names[e] || e;
            var n = /(\d+)[ ,]+(\d+)[ ,]+(\d+)([ ,]+(\d*\.?\d+))?/.exec(e);
            if (n)
              return new t(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), n[5] ? parseFloat(n[5]) : 1);
            var r = /[0-9a-f]+/i.exec(e);
            if (r) {
              var i = r[0];
              return 3 === i.length ? new t(17 * parseInt(i.charAt(0), 16), 17 * parseInt(i.charAt(1), 16), 17 * parseInt(i.charAt(2), 16)) : new t(parseInt(i.substr(0, 2), 16), parseInt(i.substr(2, 2), 16), parseInt(i.substr(4, 2), 16), i.length >= 8 ? parseInt(i.substr(6, 2), 16) / 255 : 1)
            }
            return new t(0, 0, 0, 1)
          }
          ,
          t.parseWithAlpha = function (e, n) {
            var r = t.parse(e);
            return r.a = +n,
                r
          }
          ,
          t.rgb2hex = function (t, e, n, i) {
            return r(t) + r(e) + r(n) + r(255 * i)
          }
          ,
          t.rgb2hsv = function (t, e, n, r, i) {
            void 0 === i && (i = 0),
                t /= 255,
                e /= 255,
                n /= 255,
                i /= 360;
            var o = Math.max(t, e, n)
                , a = Math.min(t, e, n)
                , s = o
                , u = o - a
                , l = 0 === o ? 0 : u / o;
            if (o !== a) {
              switch (o) {
                case t:
                  i = (e - n) / u + (e < n ? 6 : 0);
                  break;
                case e:
                  i = (n - t) / u + 2;
                  break;
                case n:
                  i = (t - e) / u + 4
              }
              i /= 6
            }
            return {
              h: 360 * i,
              s: l,
              v: s,
              a: r
            }
          }
          ,
          t.hsv2rgb = function (t, e, n, r) {
            t = Math.max(0, Math.min(360, 360 === t ? 0 : t)),
                e = Math.max(0, Math.min(1, e)),
                n = Math.max(0, Math.min(1, n));
            var i = n
                , o = n
                , a = n;
            if (0 !== e) {
              t /= 60;
              var s = Math.floor(t)
                  , u = t - s
                  , l = n * (1 - e)
                  , c = n * (1 - e * u)
                  , f = n * (1 - e * (1 - u));
              switch (s) {
                case 0:
                  i = n,
                      o = f,
                      a = l;
                  break;
                case 1:
                  i = c,
                      o = n,
                      a = l;
                  break;
                case 2:
                  i = l,
                      o = n,
                      a = f;
                  break;
                case 3:
                  i = l,
                      o = c,
                      a = n;
                  break;
                case 4:
                  i = f,
                      o = l,
                      a = n;
                  break;
                default:
                  i = n,
                      o = l,
                      a = c
              }
            }
            return {
              r: Math.round(255 * i),
              g: Math.round(255 * o),
              b: Math.round(255 * a),
              a: r
            }
          }
          ,
          t.h2rgb = function (t) {
            t /= 60;
            var e = 0
                , n = 0
                , r = 0
                , i = Math.floor(t)
                , o = t - i
                , a = 1 - o
                , s = 1 - (1 - o);
            switch (i) {
              case 0:
                e = 1,
                    n = s;
                break;
              case 1:
                e = a,
                    n = 1;
                break;
              case 2:
                n = 1,
                    r = s;
                break;
              case 3:
                n = a,
                    r = 1;
                break;
              case 4:
                e = s,
                    r = 1;
                break;
              default:
                e = 1,
                    r = a
            }
            return {
              r: Math.round(255 * e),
              g: Math.round(255 * n),
              b: Math.round(255 * r)
            }
          }
          ,
          t.random = function () {
            var e = Object.keys(t.names)
                , n = t.names[e[Math.random() * e.length | 0]];
            return t.parse(n)
          }
          ,
          t.names = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "00ffff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000000",
            blanchedalmond: "ffebcd",
            blue: "0000ff",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "00ffff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dodgerblue: "1e90ff",
            feldspar: "d19275",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "ff00ff",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgrey: "d3d3d3",
            lightgreen: "90ee90",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslateblue: "8470ff",
            lightslategray: "778899",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "00ff00",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "ff00ff",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370d8",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "d87093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            red: "ff0000",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            violetred: "d02090",
            wheat: "f5deb3",
            white: "ffffff",
            whitesmoke: "f5f5f5",
            yellow: "ffff00",
            yellowgreen: "9acd32"
          },
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = o,
        n.exports
  });
  System.registerDynamic("22", [], !0, function (t, e, n) {
    "use strict";
    return e.PONY_SPEED_TROT = 4,
        e.PONY_SPEED_WALK = 2,
        e.SAYS_TIME = 6,
        e.REGION_SIZE = 20,
        e.MAP_SIZE = 3,
        e.CM_SIZE = 5,
        e.SAY_MAX_LENGTH = 64,
        e.PLAYER_NAME_MAX_LENGTH = 20,
        e.ACCOUNT_NAME_MIN_LENGTH = 1,
        e.ACCOUNT_NAME_MAX_LENGTH = 32,
        e.PONY_LIMIT = 20,
        e.frameTime = 24,
        e.tileWidth = 32,
        e.tileHeight = 24,
        e.tileCols = 4,
        e.tileRows = 8,
        e.MINUTE = 6e4,
        e.HOUR = 36e5,
        e.TIMEOUTS = [{
          value: 0,
          label: "unmute"
        }, {
          value: 5 * e.MINUTE,
          label: "5 minutes"
        }, {
          value: 10 * e.MINUTE,
          label: "10 minutes"
        }, {
          value: 30 * e.MINUTE,
          label: "30 minutes"
        }, {
          value: 1 * e.HOUR,
          label: "1 hour"
        }, {
          value: 5 * e.HOUR,
          label: "5 hours"
        }, {
          value: 10 * e.HOUR,
          label: "10 hours"
        }, {
          value: 24 * e.HOUR,
          label: "24 hours"
        }],
        n.exports
  });
  System.registerDynamic("23", [getCodeName("BlueBird"), getCodeName("Lodash"), "22"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return new RegExp("^" + Z.escapeRegExp((t || "").trim()) + "$", "i")
    }

    function i(t) {
      var e = new Date;
      return e.setTime(e.getTime() + t),
          e
    }

    function o(t, e) {
      return (t & e) === e
    }

    function a(t, e) {
      return t ? t[s(0 | e, 0, t.length - 1)] : null
    }

    function s(t, e, n) {
      return t > e ? t < n ? t : n : e
    }

    function u(t, e) {
      return t.find(function (t) {
        return t.id === e
      })
    }

    function l(t, e) {
      if (t)
        for (var n = -1; (n = t.indexOf(e)) !== -1;)
          t.splice(n, 1)
    }

    function c(t, e) {
      return !!Z.remove(t, function (t) {
        return t.id === e
      }).length
    }

    function f(t, e) {
      return t + Math.floor(Math.random() * (e - t))
    }

    function p(t) {
      return t[Math.floor(Math.random() * t.length)]
    }

    function h(t, e) {
      var n = Math.sqrt(t * t + e * e);
      return {
        x: t / n,
        y: e / n
      }
    }

    function d(t, e) {
      if (t.length !== e.length)
        return !1;
      for (var n = 0; n < t.length; n++)
        if (t[n] !== e[n])
          return !1;
      return !0
    }

    function v(t) {
      return t && t.dispose(),
          null
    }

    function m(t, e, n, r) {
      var i = n.x / K.tileWidth + t
          , o = n.y / K.tileHeight + e
          , a = n.w / K.tileWidth
          , s = n.h / K.tileHeight;
      return r.x > i && r.x < i + a && r.y > o && r.y < o + s
    }

    function g(t, e, n, r, i) {
      var o = n.x + t
          , a = n.y + e
          , s = n.w
          , u = n.h;
      return r > o && r < o + s && i > a && i < a + u
    }

    function y(t, e) {
      return Math.sqrt(t * t + e * e)
    }

    function b(t, e) {
      var n = t.x - e.x
          , r = t.y - e.y;
      return y(n, r)
    }

    function _(t, e) {
      if (!t.bounds || !e.bounds)
        return !1;
      var n = t.x * K.tileWidth + t.bounds.x
          , r = t.y * K.tileHeight + t.bounds.y
          , i = e.x * K.tileWidth + e.bounds.x
          , o = e.y * K.tileHeight + e.bounds.y;
      return $(n, r, t.bounds.w, t.bounds.h, i, o, e.bounds.w, e.bounds.h)
    }

    function w(t, e) {
      return $(t.x, t.y, t.w, t.h, e.x, e.y, e.w, e.h)
    }

    function x(t, e) {
      var n = Math.min(t.x, e.x)
          , r = Math.min(t.y, e.y);
      return {
        x: n,
        y: r,
        w: Math.max(t.x + t.w, e.x + e.w) - n,
        h: Math.max(t.y + t.h, e.y + e.h) - r
      }
    }

    function E(t, e, n, r, i, o) {
      return $(t + n.x, e + n.y, n.w, n.h, r + o.x, i + o.y, o.w, o.h)
    }

    function $(t, e, n, r, i, o, a, s) {
      return t <= i + a && t + n >= i && e <= o + s && e + r >= o
    }

    function S(t) {
      return t >= 55296 && t <= 56319
    }

    function T(t, e) {
      return ((1023 & t) << 10) + (1023 & e) + 65536
    }

    function k(t, e) {
      void 0 === e && (e = !1);
      for (var n = e ? J : Q, r = "", i = 0; i < t; i++)
        r += n[Math.random() * n.length | 0];
      return r
    }

    function M(t) {
      var n = t.data
          , r = t.status
          , i = n;
      throw 500 !== r && 5 === Math.floor(r / 100) ? new Error(e.PROTECTION_ERROR) : 403 === r ? new Error(e.ACCESS_ERROR) : 404 === r ? new Error(e.NOT_FOUND_ERROR) : new Error(i && i.error || e.OFFLINE_ERROR)
    }

    function A(t) {
      return X.resolve(t).catch(M).then(function (t) {
        return t.data
      })
    }

    function C(t) {
      return function (e) {
        t.error = e.message
      }
    }

    function D() {
      return tt || (tt = I(1, 1))
    }

    function O() {
      return "undefined" != typeof window ? window.devicePixelRatio || 1 : 1
    }

    function I(t, e) {
      var n = document.createElement("canvas");
      return n.width = t,
          n.height = e,
          n
    }

    function R(t) {
      return new X(function (e, n) {
            var r = new Image;
            r.addEventListener("load", function () {
              return e(r)
            }),
                r.addEventListener("error", function () {
                  return n(new Error("Failed to load image: " + t))
                }),
                r.src = t
          }
      )
    }

    function F(t) {
      "imageSmoothingEnabled" in t ? t.imageSmoothingEnabled = !1 : (t.webkitImageSmoothingEnabled = !1,
          t.mozImageSmoothingEnabled = !1,
          t.msImageSmoothingEnabled = !1)
    }

    function P(t) {
      var e = 3 & t;
      return 2 === e ? K.PONY_SPEED_TROT : 1 === e ? K.PONY_SPEED_WALK : 0
    }

    function j(t) {
      var e = et[(0 | t) % et.length];
      return {
        x: e[0],
        y: e[1]
      }
    }

    function N(t, e) {
      var n = Math.atan2(t, -e);
      return Math.round((n < 0 ? n + it : n) * ot) % et.length
    }

    function L(t, e, n, r) {
      var i = Math.floor(100 * s(t, 0, 1e5)) | n << 24
          , o = Math.floor(100 * s(e, 0, 1e5)) | r << 24;
      return [i ^ nt, o ^ rt]
    }

    function U(t, e) {
      t ^= nt,
          e ^= rt;
      var n = (16777215 & t) / 100
          , r = (16777215 & e) / 100
          , i = t >> 24 & 255
          , o = e >> 24 & 255;
      return [n, r, i, o]
    }

    function B(t, e) {
      return !(t < 0) && (t > 0 || e)
    }

    function V(t) {
      var e, n;
      t && (t.set = function () {
        e = t.x,
            n = t.y
      }
          ,
          t.tes = function () {
            t.x = e,
                t.y = n
          }
          ,
          t.set())
    }

    function H(t, e) {
      t && ("transform" in t.style ? t.style.transform = e : t.style.webkitTransform = e)
    }

    function z(t) {
      return !!t.pointerType
    }

    function Y(t) {
      return !!t.touches
    }

    function W(t) {
      return Y(t) ? 0 : t.button
    }

    function q(t) {
      return Y(t) ? t.touches[0].pageX : t.pageX
    }

    function G(t) {
      return Y(t) ? t.touches[0].pageY : t.pageY
    }

    var X = t(getCodeName("BlueBird"))
        , Z = t(getCodeName("Lodash"))
        , K = t("22")
        , Q = "abcdefghijklmnopqrstuvwxyz0123456789_"
        , J = Q + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    e.matchString = r,
        e.fromNow = i,
        e.hasFlag = o,
        e.at = a,
        e.clamp = s,
        e.findById = u,
        e.remove = l,
        e.removeById = c,
        e.randomInt = f,
        e.randomItem = p,
        e.normalize = h,
        e.arraysEqual = d,
        e.dispose = v,
        e.contains = m,
        e.containsPoint = g,
        e.length = y,
        e.distance = b,
        e.entitiesIntersect = _,
        e.rectsIntersect = w,
        e.addRects = x,
        e.collidersIntersect = E,
        e.intersect = $,
        e.isSurrogate = S,
        e.fromSurrogate = T,
        e.randomString = k,
        e.ACCESS_ERROR = "Access denied",
        e.NOT_FOUND_ERROR = "Not found",
        e.OFFLINE_ERROR = "Server is offline",
        e.PROTECTION_ERROR = "DDOS protection error, reload the page to continue",
        e.handleReject = M,
        e.toPromise = A,
        e.errorHandler = C;
    var tt;
    e.getTempCanvas = D,
        e.getPixelRatio = O,
        e.createCanvas = I,
        e.loadImage = R,
        e.disableImageSmoothing = F;
    var et = [[0, -1], [.5, -1], [1, -1], [1, -.5], [1, 0], [1, .5], [1, 1], [.5, 1], [0, 1], [-.5, 1], [-1, 1], [-1, .5], [-1, 0], [-1, -.5], [-1, -1], [-.5, -1]]
        , nt = 63540507
        , rt = 1026711136
        , it = 2 * Math.PI
        , ot = et.length / it;
    return e.flagsToSpeed = P,
        e.dirToVector = j,
        e.vectorToDir = N,
        e.encodeMovement = L,
        e.decodeMovement = U,
        e.isFacingRight = B,
        e.setupSetTes = V,
        e.setTransform = H,
        e.isPointer = z,
        e.isTouch = Y,
        e.getButton = W,
        e.getX = q,
        e.getY = G,
        n.exports
  });
  System.registerDynamic("3b", [getCodeName("BlueBird"), "35", "23"], !0, function (t, e, n) {
    "use strict";
    function r(t, e) {
      var n = Object.keys(t).reduce(function (e, n) {
        var r = t[n];
        if (r) {
          var i = e[r.src] || [];
          i.push(r),
              e[r.src] = i
        }
        return e
      }, {});
      return l.map(Object.keys(n), function (t) {
        return f.loadImage(e + t).then(function (e) {
          return n[t].forEach(function (t) {
            return t.img = e
          })
        })
      })
    }

    function i(t, e) {
      return f.loadImage(e + t.src).then(function (e) {
        t.img = e,
            t.sprites.filter(function (t) {
              return !!t
            }).forEach(function (t) {
              return t.img = e
            })
      })
    }

    function o(t, e) {
      return l.map(t, function (t) {
        return i(t, e)
      }).then(function () {
      })
    }

    function a(t, e, n, r) {
      e && e.w && e.h && e.img && t.drawImage(e.img, e.x, e.y, e.w, e.h, n + e.ox, r + e.oy, e.w, e.h)
    }

    function s(t, e) {
      return p = p || f.createCanvas(t, e),
      (p.width < t || p.height < e) && (p.width = Math.max(p.width, t),
          p.height = Math.max(p.height, e)),
          p.getContext("2d")
    }

    function u(t, e, n, r, i) {
      if (e && e.img) {
        var o = s(e.w, e.h)
            , a = c.default.parse(n);
        o.fillStyle = "#" + a.toHexRGB(),
            o.globalCompositeOperation = "source-over",
            o.fillRect(0, 0, e.w, e.h),
            o.globalCompositeOperation = "destination-in",
            o.drawImage(e.img, e.x, e.y, e.w, e.h, 0, 0, e.w, e.h),
            o.globalCompositeOperation = "multiply",
            o.drawImage(e.img, e.x, e.y, e.w, e.h, 0, 0, e.w, e.h);
        var u = t.globalAlpha;
        t.globalAlpha = u * a.a,
            t.drawImage(o.canvas, 0, 0, e.w, e.h, r + e.ox, i + e.oy, e.w, e.h),
            t.globalAlpha = u
      }
    }

    var l = t(getCodeName("BlueBird"))
        , c = t("35")
        , f = t("23");
    e.loadSprites = r,
        e.loadSpriteSheets = o,
        e.drawSprite = a;
    var p;
    return e.drawColoredSprite = u,
        n.exports
  });
  System.registerDynamic("cc", [], !0, function (t, e, n) {
    return n.exports = {
      "pony.png": "pony-18957dcd2d.png",
      "pony2.png": "pony2-ff33d811d6.png",
      "tiles.png": "tiles-1147a10312.png"
    },
        n.exports
  });
  System.registerDynamic("20", ["cc"], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: E
      } : null
    }

    function i(t, e) {
      return {
        x: t,
        y: e
      }
    }

    function o(t, e) {
      return {
        fill: S[t],
        outline: S[e]
      }
    }

    function a(t, e, n) {
      return {
        fill: S[t],
        outline: S[e],
        extra: S[n]
      }
    }

    function s(t, e) {
      return {
        color: S[t],
        shadow: S[e]
      }
    }

    function u(t) {
      return {
        shadow: S[t]
      }
    }

    function l(t, e, n) {
      return {
        mouth: S[t],
        muzzle: S[e],
        fangs: S[n]
      }
    }

    function c(t, e, n, r) {
      return {
        fill: S[t],
        line: S[e],
        iris: S[n],
        lashes: S[r]
      }
    }

    function f(t, e, n, r, i) {
      return {
        stump: S[t],
        trunk: S[e],
        crown: S[n],
        stumpShadow: S[r],
        shadow: S[i]
      }
    }

    function p(t) {
      return t ? {
        x: t[0],
        y: t[1],
        w: t[2],
        h: t[3],
        ox: t[4],
        oy: t[5],
        src: $
      } : null
    }

    function h(t) {
      return {
        color: T[t]
      }
    }

    function d(t, e) {
      return {
        color: T[t],
        palette: e
      }
    }

    function v(t, e, n) {
      return {
        color: T[t],
        extra: T[e],
        palette: n
      }
    }

    function m(t) {
      return {
        shadow: T[t]
      }
    }

    function g(t, e, n) {
      return {
        color: T[t],
        shadow: T[e],
        palette: n
      }
    }

    function y(t, e, n) {
      return {
        mouth: T[t],
        muzzle: T[e],
        fangs: T[n]
      }
    }

    function b(t, e, n) {
      return {
        normal: T[t],
        lashes: T[e],
        iris: T[n]
      }
    }

    function _(t, e, n, r, i, o) {
      return {
        stump: T[t],
        trunk: T[e],
        crown: T[n],
        stumpShadow: T[r],
        shadow: T[i],
        palette: o
      }
    }

    function w(t, e) {
      return {
        frames: t.map(function (t) {
          return T[t]
        }),
        palette: e
      }
    }

    var x = t("cc")
        , E = x["pony.png"]
        , $ = x["pony2.png"]
        , S = [null, [395, 285, 9, 7, 31, 28], [55, 300, 12, 6, 29, 30], [511, 11, 1, 1, 38, 28], null, [404, 285, 8, 7, 31, 28], [67, 300, 12, 6, 29, 30], [248, 316, 7, 4, 33, 30], [231, 306, 9, 5, 32, 30], [112, 300, 9, 6, 31, 29], [43, 300, 12, 6, 29, 30], [373, 306, 7, 5, 32, 28], [498, 125, 1, 1, 40, 30], [303, 299, 4, 7, 31, 28], [229, 320, 4, 4, 29, 32], [170, 300, 7, 6, 33, 28], [249, 306, 8, 5, 33, 30], [386, 285, 9, 7, 31, 28], [55, 300, 12, 6, 29, 30], [131, 316, 8, 4, 31, 28], null, [34, 306, 4, 6, 31, 29], [346, 316, 6, 4, 29, 32], [146, 311, 6, 5, 34, 28], [412, 316, 6, 4, 35, 30], [395, 285, 9, 7, 31, 28], [55, 300, 12, 6, 29, 30], [511, 11, 1, 1, 38, 28], null, [404, 285, 8, 7, 31, 28], [67, 300, 12, 6, 29, 30], [248, 316, 7, 4, 33, 30], [231, 306, 9, 5, 32, 30], [112, 300, 9, 6, 31, 29], [43, 300, 12, 6, 29, 30], [373, 306, 7, 5, 32, 28], [498, 125, 1, 1, 40, 30], [303, 299, 4, 7, 31, 28], [229, 320, 4, 4, 29, 32], [170, 300, 7, 6, 33, 28], [249, 306, 8, 5, 33, 30], [386, 285, 9, 7, 31, 28], [55, 300, 12, 6, 29, 30], [131, 316, 8, 4, 31, 28], null, [34, 306, 4, 6, 31, 29], [346, 316, 6, 4, 29, 32], [146, 311, 6, 5, 34, 28], [412, 316, 6, 4, 35, 30], [198, 213, 8, 15, 35, 26], [312, 209, 10, 15, 34, 28], [242, 192, 2, 1, 37, 26], null, [276, 238, 8, 14, 35, 27], [218, 228, 9, 14, 34, 29], [458, 265, 8, 11, 35, 26], [6, 267, 5, 11, 39, 28], [378, 277, 10, 8, 31, 27], [177, 277, 12, 8, 30, 28], [503, 284, 8, 8, 31, 27], [161, 285, 7, 8, 30, 28], [22, 306, 4, 6, 37, 29], [456, 292, 5, 7, 37, 29], [24, 312, 4, 5, 32, 28], [417, 55, 5, 5, 31, 29], [511, 11, 1, 1, 35, 28], [498, 125, 1, 1, 33, 29], [169, 320, 4, 4, 32, 29], [35, 317, 5, 4, 31, 30], [457, 311, 4, 5, 32, 29], [321, 292, 5, 7, 31, 29], [460, 172, 3, 3, 33, 29], [445, 311, 4, 5, 31, 29], [24, 324, 4, 3, 32, 31], [94, 320, 5, 4, 31, 32], [252, 209, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [252, 276, 13, 9, 28, 20], [19, 255, 16, 12, 26, 19], [490, 239, 20, 13, 21, 22], [252, 238, 8, 14, 20, 22], [188, 306, 14, 5, 27, 28], [74, 178, 6, 1, 27, 33], [388, 320, 8, 3, 33, 30], [320, 320, 9, 3, 33, 31], [336, 208, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [373, 254, 19, 12, 22, 21], null, [240, 210, 12, 15, 21, 20], [212, 180, 15, 17, 20, 19], [234, 253, 15, 12, 25, 21], [426, 211, 15, 15, 26, 19], [147, 285, 7, 8, 34, 25], [438, 276, 9, 9, 33, 25], [356, 208, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [442, 253, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [456, 239, 6, 14, 20, 22], [89, 228, 11, 14, 23, 20], [111, 213, 11, 15, 24, 19], [95, 255, 10, 12, 29, 21], [144, 213, 10, 15, 30, 19], [55, 277, 7, 9, 34, 23], [172, 267, 7, 10, 35, 23], [252, 209, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [252, 276, 13, 9, 28, 20], [19, 255, 16, 12, 26, 19], [490, 239, 20, 13, 21, 22], [252, 238, 8, 14, 20, 22], [188, 306, 14, 5, 27, 28], [74, 178, 6, 1, 27, 33], [388, 320, 8, 3, 33, 30], [320, 320, 9, 3, 33, 31], [336, 208, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [373, 254, 19, 12, 22, 21], null, [240, 210, 12, 15, 21, 20], [212, 180, 15, 17, 20, 19], [234, 253, 15, 12, 25, 21], [426, 211, 15, 15, 26, 19], [147, 285, 7, 8, 34, 25], [438, 276, 9, 9, 33, 25], [356, 208, 20, 15, 21, 20], [22, 180, 22, 17, 20, 19], [442, 253, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [456, 239, 6, 14, 20, 22], [89, 228, 11, 14, 23, 20], [111, 213, 11, 15, 24, 19], [95, 255, 10, 12, 29, 21], [144, 213, 10, 15, 30, 19], [55, 277, 7, 9, 34, 23], [172, 267, 7, 10, 35, 23], [125, 180, 20, 17, 21, 23], [80, 139, 22, 21, 20, 22], [493, 299, 15, 6, 26, 23], [148, 277, 17, 8, 25, 22], [0, 228, 13, 14, 21, 25], [507, 171, 5, 15, 20, 25], [410, 227, 13, 14, 22, 26], [411, 254, 12, 12, 22, 31], [50, 317, 5, 4, 34, 27], [74, 178, 6, 1, 34, 31], [176, 311, 6, 5, 35, 26], [510, 239, 2, 2, 40, 30], [392, 254, 19, 12, 22, 23], [299, 224, 21, 14, 21, 22], [166, 324, 9, 2, 28, 23], [173, 306, 15, 5, 26, 22], [458, 299, 18, 6, 22, 24], [232, 276, 20, 9, 21, 24], [31, 267, 19, 10, 22, 25], [128, 277, 20, 8, 22, 28], [74, 316, 10, 4, 31, 27], [273, 320, 12, 3, 30, 29], [267, 326, 4, 2, 37, 29], [210, 326, 5, 2, 37, 30], [353, 264, 16, 11, 25, 21], [375, 241, 18, 13, 24, 20], [363, 275, 5, 10, 25, 21], [103, 242, 9, 13, 24, 20], [391, 266, 7, 11, 27, 21], [312, 264, 5, 12, 30, 21], [82, 277, 6, 9, 32, 22], [220, 267, 6, 10, 33, 22], [412, 305, 5, 6, 36, 25], [45, 286, 6, 7, 36, 25], [300, 252, 21, 12, 21, 21], [351, 223, 25, 14, 19, 20], [476, 299, 17, 6, 25, 21], [107, 277, 21, 8, 23, 20], [61, 306, 21, 5, 21, 23], [413, 299, 24, 6, 19, 23], [437, 299, 21, 6, 21, 26], [389, 299, 24, 6, 19, 27], [141, 306, 16, 5, 26, 28], [122, 306, 19, 5, 24, 29], [175, 324, 8, 2, 34, 29], [154, 324, 12, 2, 31, 30], [468, 252, 20, 12, 28, 20], [277, 224, 22, 14, 27, 19], [323, 299, 4, 7, 28, 25], [358, 275, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [255, 252, 6, 13, 30, 19], [447, 276, 8, 9, 35, 22], [254, 265, 10, 11, 35, 21], [102, 300, 10, 6, 38, 25], [189, 277, 11, 8, 38, 24], [488, 133, 22, 22, 20, 22], [340, 106, 23, 25, 18, 21], [368, 285, 9, 7, 33, 22], [121, 300, 9, 6, 32, 21], [321, 252, 21, 12, 20, 23], [426, 226, 19, 14, 18, 22], [324, 173, 20, 18, 22, 26], [122, 213, 11, 15, 21, 31], [329, 320, 9, 3, 33, 29], [422, 195, 2, 1, 32, 31], [303, 323, 6, 3, 36, 30], [255, 324, 6, 2, 34, 31], [477, 225, 20, 14, 20, 24], [0, 197, 22, 16, 19, 23], [262, 300, 6, 6, 34, 25], [230, 285, 6, 8, 35, 24], [154, 285, 7, 8, 27, 24], [136, 267, 8, 10, 27, 23], [74, 242, 10, 13, 20, 25], [77, 213, 12, 15, 19, 24], [343, 299, 4, 7, 24, 32], [94, 277, 5, 9, 23, 32], [325, 326, 3, 2, 24, 32], [498, 112, 1, 3, 23, 32], [498, 121, 1, 2, 27, 32], null, [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [367, 299, 4, 7, 24, 32], [118, 125, 4, 9, 23, 32], [120, 169, 2, 4, 25, 34], null, [238, 218, 2, 2, 24, 32], [498, 112, 1, 3, 23, 32], [298, 326, 3, 2, 25, 32], null, [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [351, 299, 4, 7, 24, 32], [118, 125, 4, 9, 23, 32], [444, 133, 1, 1, 27, 32], null, null, [498, 127, 1, 1, 23, 34], [275, 326, 4, 2, 24, 32], [498, 123, 1, 2, 23, 32], [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [179, 267, 7, 10, 25, 33], [141, 255, 9, 12, 24, 32], [451, 80, 3, 3, 27, 33], [115, 179, 5, 1, 27, 32], [207, 267, 7, 10, 25, 33], [441, 265, 9, 11, 24, 33], [486, 155, 11, 20, 20, 31], [15, 139, 13, 22, 19, 30], null, [498, 125, 1, 1, 31, 32], [377, 285, 9, 7, 21, 31], [277, 276, 11, 9, 20, 30], [507, 155, 5, 16, 21, 35], [504, 57, 8, 19, 19, 33], [477, 311, 4, 5, 20, 46], [46, 306, 3, 6, 19, 46], [233, 197, 7, 16, 24, 32], [417, 39, 5, 16, 27, 33], [80, 160, 20, 19, 21, 20], [466, 133, 22, 22, 20, 19], [252, 276, 13, 9, 28, 20], [19, 255, 16, 12, 26, 19], [423, 240, 20, 13, 21, 22], [252, 238, 8, 14, 20, 22], [334, 285, 13, 7, 27, 28], [15, 300, 14, 6, 27, 30], [248, 316, 7, 4, 33, 30], [212, 306, 10, 5, 32, 30], [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [100, 160, 20, 19, 21, 20], [347, 131, 22, 22, 20, 19], [145, 180, 19, 17, 22, 21], [498, 125, 1, 1, 40, 30], [240, 210, 12, 15, 21, 20], [212, 180, 15, 17, 20, 19], [497, 225, 15, 14, 25, 21], [227, 180, 15, 17, 26, 19], [455, 276, 8, 9, 33, 25], [118, 267, 9, 10, 33, 25], [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [404, 158, 20, 19, 21, 20], [369, 131, 22, 22, 20, 19], [488, 252, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [456, 239, 6, 14, 20, 22], [89, 228, 11, 14, 23, 20], [111, 213, 11, 15, 24, 19], [133, 228, 10, 14, 29, 21], [269, 192, 11, 17, 29, 19], [151, 267, 7, 10, 34, 23], [377, 266, 7, 11, 35, 23], [35, 312, 3, 5, 24, 34], [10, 306, 4, 6, 23, 35], [459, 210, 20, 15, 21, 20], [0, 180, 22, 17, 20, 19], [252, 276, 13, 9, 28, 20], [19, 255, 16, 12, 26, 19], [423, 240, 20, 13, 21, 22], [252, 238, 8, 14, 20, 22], [334, 285, 13, 7, 27, 28], [15, 300, 14, 6, 27, 30], [248, 316, 7, 4, 33, 30], [212, 306, 10, 5, 32, 30], [292, 209, 20, 15, 21, 20], [44, 180, 22, 17, 20, 19], [0, 255, 19, 12, 22, 21], [498, 125, 1, 1, 40, 30], [240, 210, 12, 15, 21, 20], [212, 180, 15, 17, 20, 19], [497, 225, 15, 14, 25, 21], [227, 180, 15, 17, 26, 19], [455, 276, 8, 9, 33, 25], [118, 267, 9, 10, 33, 25], [272, 209, 20, 15, 21, 20], [0, 180, 22, 17, 20, 19], [488, 252, 19, 12, 22, 22], null, [509, 23, 3, 11, 21, 24], [456, 239, 6, 14, 20, 22], [89, 228, 11, 14, 23, 20], [111, 213, 11, 15, 24, 19], [133, 228, 10, 14, 29, 21], [269, 192, 11, 17, 29, 19], [151, 267, 7, 10, 34, 23], [377, 266, 7, 11, 35, 23], [345, 153, 22, 20, 21, 23], [323, 131, 24, 22, 20, 22], [0, 300, 15, 6, 26, 23], [148, 277, 17, 8, 25, 22], [0, 228, 13, 14, 21, 25], [507, 171, 5, 15, 20, 25], [13, 228, 13, 14, 22, 26], [411, 254, 12, 12, 22, 31], [276, 238, 8, 14, 35, 27], [209, 228, 9, 14, 34, 29], [458, 265, 8, 11, 35, 26], [6, 267, 5, 11, 39, 28], [165, 267, 7, 10, 25, 33], [369, 266, 8, 11, 25, 33], [423, 253, 19, 12, 22, 23], [456, 225, 21, 14, 21, 22], [166, 324, 9, 2, 28, 23], [173, 306, 15, 5, 26, 22], [458, 299, 18, 6, 22, 24], [232, 276, 20, 9, 21, 24], [31, 267, 19, 10, 22, 25], [128, 277, 20, 8, 22, 28], [222, 277, 10, 8, 31, 27], [165, 277, 12, 8, 30, 28], [22, 306, 4, 6, 37, 29], [195, 293, 5, 7, 37, 29], [353, 264, 16, 11, 25, 21], [375, 241, 18, 13, 24, 20], [363, 275, 5, 10, 25, 21], [103, 242, 9, 13, 24, 20], [391, 266, 7, 11, 27, 21], [312, 264, 5, 12, 30, 21], [82, 277, 6, 9, 32, 22], [220, 267, 6, 10, 33, 22], [412, 305, 5, 6, 36, 25], [45, 286, 6, 7, 36, 25], [279, 252, 21, 12, 21, 21], [252, 224, 25, 14, 19, 20], [476, 299, 17, 6, 25, 21], [107, 277, 21, 8, 23, 20], [61, 306, 21, 5, 21, 23], [413, 299, 24, 6, 19, 23], [437, 299, 21, 6, 21, 26], [389, 299, 24, 6, 19, 27], [157, 306, 16, 5, 26, 28], [103, 306, 19, 5, 24, 29], [94, 316, 10, 4, 32, 29], [474, 53, 12, 4, 31, 30], [468, 252, 20, 12, 28, 20], [277, 224, 22, 14, 27, 19], [323, 299, 4, 7, 28, 25], [358, 275, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [255, 252, 6, 13, 30, 19], [447, 276, 8, 9, 35, 22], [254, 265, 10, 11, 35, 21], [102, 300, 10, 6, 38, 25], [189, 277, 11, 8, 38, 24], [441, 134, 22, 22, 20, 22], [363, 106, 23, 25, 18, 21], [368, 285, 9, 7, 33, 22], [121, 300, 9, 6, 32, 21], [321, 252, 21, 12, 20, 23], [426, 226, 19, 14, 18, 22], [324, 173, 20, 18, 22, 26], [122, 213, 11, 15, 21, 31], [347, 320, 9, 3, 33, 29], [445, 311, 4, 5, 31, 29], [84, 316, 10, 4, 32, 30], [113, 316, 9, 4, 31, 32], [454, 32, 20, 27, 20, 24], [486, 0, 22, 29, 19, 23], [262, 300, 6, 6, 34, 25], [230, 285, 6, 8, 35, 24], [154, 285, 7, 8, 27, 24], [136, 267, 8, 10, 27, 23], [74, 242, 10, 13, 20, 25], [77, 213, 12, 15, 19, 24], [507, 155, 5, 16, 21, 35], [504, 57, 8, 19, 19, 33], [477, 311, 4, 5, 20, 46], [46, 306, 3, 6, 19, 46], [233, 197, 7, 16, 24, 32], [417, 39, 5, 16, 27, 33], [16, 267, 5, 11, 39, 35], [313, 238, 7, 14, 38, 33], [242, 184, 2, 4, 40, 37], [47, 312, 3, 5, 38, 37], [415, 277, 4, 8, 39, 38], [217, 320, 4, 4, 39, 43], [32, 312, 3, 5, 41, 35], [441, 123, 4, 10, 41, 33], [21, 267, 5, 11, 39, 35], [313, 238, 7, 14, 38, 33], [460, 164, 3, 8, 40, 37], null, [274, 265, 5, 11, 39, 35], [341, 238, 7, 14, 38, 33], [456, 211, 3, 7, 41, 36], [435, 186, 4, 8, 40, 37], [26, 267, 5, 11, 39, 35], [313, 238, 7, 14, 38, 33], [509, 34, 3, 10, 40, 36], null, [11, 267, 5, 11, 39, 35], [299, 238, 7, 14, 38, 33], [460, 156, 3, 8, 40, 38], [451, 60, 3, 10, 40, 37], [226, 255, 7, 12, 36, 37], [173, 228, 9, 14, 35, 36], [105, 293, 5, 7, 36, 40], [186, 267, 7, 10, 35, 37], [214, 267, 6, 10, 37, 37], [291, 326, 4, 2, 36, 46], [466, 275, 5, 10, 38, 39], [238, 220, 2, 2, 37, 48], [463, 143, 3, 8, 40, 41], [399, 178, 5, 14, 39, 36], [0, 139, 15, 22, 37, 22], [424, 112, 17, 24, 36, 21], [322, 206, 2, 2, 41, 26], [245, 320, 4, 4, 40, 25], [455, 323, 5, 3, 42, 22], [368, 277, 10, 8, 39, 21], [322, 206, 2, 2, 41, 26], [245, 320, 4, 4, 40, 25], [429, 276, 9, 9, 43, 24], [220, 242, 7, 13, 46, 23], [348, 251, 7, 13, 44, 25], [52, 306, 3, 6, 48, 35], [233, 265, 11, 11, 37, 28], [27, 242, 12, 13, 36, 28], [267, 285, 5, 8, 37, 36], [226, 267, 6, 10, 36, 35], [405, 266, 7, 11, 40, 33], [148, 242, 9, 13, 39, 32], [322, 200, 2, 3, 43, 37], null, [0, 306, 5, 6, 42, 33], [219, 255, 7, 12, 41, 32], [322, 200, 2, 3, 43, 37], null, [412, 266, 7, 11, 40, 33], [112, 242, 9, 13, 39, 32], [340, 275, 6, 10, 40, 34], [174, 255, 8, 12, 39, 33], [447, 305, 5, 6, 40, 38], [24, 278, 7, 8, 39, 37], [180, 197, 10, 16, 37, 29], [484, 175, 12, 18, 36, 28], [88, 277, 6, 9, 41, 29], [158, 255, 8, 12, 40, 28], [212, 255, 7, 12, 37, 33], [139, 242, 9, 13, 36, 33], [391, 212, 14, 15, 30, 35], [364, 173, 16, 18, 29, 34], [84, 242, 10, 13, 30, 35], [133, 213, 11, 15, 29, 34], [65, 228, 12, 14, 30, 35], [297, 174, 13, 18, 29, 34], [39, 228, 13, 14, 30, 36], [70, 197, 13, 16, 30, 35], [435, 177, 4, 9, 40, 37], [198, 255, 7, 12, 38, 36], [261, 252, 6, 13, 37, 32], [230, 213, 8, 15, 36, 31], [311, 299, 4, 7, 39, 32], [194, 285, 6, 8, 38, 31], [76, 324, 4, 3, 39, 37], [418, 316, 6, 4, 38, 36], [99, 320, 5, 4, 37, 40], [195, 316, 8, 4, 36, 40], [358, 316, 6, 4, 37, 41], [329, 306, 8, 5, 36, 41], [67, 139, 13, 22, 48, 42], [88, 115, 15, 24, 47, 41], [391, 131, 11, 5, 48, 42], [320, 285, 14, 7, 47, 41], [87, 267, 11, 10, 48, 44], [482, 264, 13, 11, 47, 45], [109, 197, 13, 16, 48, 48], [40, 197, 15, 16, 47, 49], [367, 251, 6, 13, 48, 50], [190, 213, 8, 15, 47, 50], [54, 139, 13, 22, 48, 42], [103, 115, 15, 24, 47, 41], [440, 156, 10, 20, 48, 43], [498, 119, 1, 2, 47, 47], [499, 106, 13, 22, 48, 42], [308, 131, 15, 23, 47, 41], [450, 156, 10, 20, 48, 44], [102, 139, 12, 21, 47, 44], [28, 139, 13, 22, 48, 42], [88, 115, 15, 24, 47, 41], [244, 155, 13, 20, 48, 43], null, [41, 139, 13, 22, 48, 42], [244, 131, 15, 24, 47, 41], [271, 174, 13, 18, 48, 46], [510, 243, 2, 2, 60, 61], [122, 228, 11, 14, 48, 42], [96, 197, 13, 16, 47, 41], [437, 305, 5, 6, 48, 42], [138, 300, 8, 6, 47, 41], [202, 306, 10, 5, 49, 44], [406, 277, 9, 8, 51, 43], [47, 277, 8, 9, 49, 47], [242, 285, 5, 8, 53, 49], [240, 197, 2, 3, 51, 50], [348, 245, 3, 6, 50, 49], [445, 226, 11, 14, 48, 42], [96, 197, 13, 16, 47, 41], [108, 267, 10, 10, 48, 44], null, [153, 228, 10, 14, 48, 42], [135, 197, 13, 16, 47, 41], [200, 277, 11, 8, 48, 45], [358, 285, 10, 7, 50, 47], [100, 228, 11, 14, 48, 42], [122, 197, 13, 16, 47, 41], [63, 242, 11, 13, 48, 43], [498, 125, 1, 1, 50, 49], [111, 228, 11, 14, 48, 42], [83, 197, 13, 16, 47, 41], [423, 265, 9, 11, 48, 45], [498, 125, 1, 1, 55, 48], [84, 255, 11, 12, 47, 43], [13, 213, 13, 15, 46, 42], [288, 276, 11, 9, 47, 43], [49, 255, 13, 12, 46, 42], [98, 267, 10, 10, 47, 44], [347, 285, 11, 7, 46, 48], [31, 277, 8, 9, 48, 46], [397, 277, 9, 8, 47, 48], [274, 300, 6, 6, 49, 47], [69, 277, 7, 9, 48, 48], [136, 324, 3, 3, 51, 48], [320, 311, 5, 5, 49, 48], [302, 154, 13, 20, 47, 42], [425, 136, 15, 22, 46, 41], [498, 128, 12, 5, 47, 42], [29, 300, 14, 6, 46, 41], [26, 228, 13, 14, 47, 45], [55, 197, 15, 16, 46, 45], [65, 213, 12, 15, 47, 47], [39, 213, 13, 15, 46, 48], [200, 267, 7, 10, 47, 49], [331, 299, 4, 7, 51, 53], [103, 277, 4, 9, 48, 50], [118, 115, 4, 10, 47, 50], [454, 59, 19, 24, 47, 42], [403, 86, 21, 26, 46, 41], [17, 161, 14, 19, 52, 42], [445, 109, 21, 25, 46, 41], [290, 131, 18, 23, 47, 43], [498, 119, 1, 2, 46, 47], [391, 136, 17, 22, 47, 44], [344, 173, 20, 18, 46, 49], [274, 154, 14, 20, 48, 46], [367, 153, 17, 20, 47, 47], [499, 83, 13, 23, 47, 42], [386, 106, 16, 25, 46, 41], [139, 316, 8, 4, 47, 42], [91, 300, 11, 6, 46, 41], [265, 276, 12, 9, 47, 44], [468, 264, 14, 11, 46, 44], [43, 161, 12, 19, 48, 46], [339, 191, 14, 17, 47, 48], [390, 178, 9, 18, 50, 47], [257, 174, 14, 18, 48, 48], [55, 306, 3, 6, 50, 48], [235, 228, 3, 7, 50, 49], [261, 320, 3, 4, 35, 34], [322, 196, 2, 4, 28, 34], [507, 305, 5, 6, 34, 33], [38, 306, 4, 6, 27, 33], [120, 177, 2, 3, 35, 35], [473, 80, 1, 3, 29, 35], [498, 126, 1, 1, 39, 35], [498, 126, 1, 1, 26, 35], [509, 54, 3, 3, 35, 35], [120, 177, 2, 3, 28, 35], [325, 311, 5, 5, 34, 34], [12, 312, 4, 5, 27, 34], [120, 177, 2, 3, 35, 35], [473, 80, 1, 3, 29, 35], [498, 126, 1, 1, 39, 35], [498, 126, 1, 1, 26, 35], [304, 326, 3, 2, 35, 36], [238, 216, 2, 2, 28, 36], [399, 192, 5, 4, 34, 35], [193, 320, 4, 4, 27, 35], [238, 216, 2, 2, 35, 36], [498, 117, 1, 2, 29, 36], [498, 126, 1, 1, 39, 35], [498, 126, 1, 1, 26, 35], [419, 195, 3, 1, 35, 37], [242, 192, 2, 1, 28, 37], [395, 323, 5, 3, 34, 36], [116, 324, 4, 3, 27, 36], [242, 192, 2, 1, 35, 37], [511, 11, 1, 1, 29, 37], [498, 126, 1, 1, 39, 36], [498, 126, 1, 1, 26, 36], null, null, [240, 326, 5, 2, 34, 37], [263, 326, 4, 2, 27, 37], null, null, [498, 126, 1, 1, 39, 37], [498, 126, 1, 1, 26, 37], null, null, [215, 326, 5, 2, 34, 37], [271, 326, 4, 2, 27, 37], null, null, [498, 126, 1, 1, 39, 37], [498, 126, 1, 1, 26, 37], null, [5, 317, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], null, [300, 311, 5, 5, 29, 38], [511, 11, 1, 1, 32, 42], null, [241, 320, 4, 4, 29, 38], [511, 11, 1, 1, 32, 42], null, [365, 311, 5, 5, 29, 38], [511, 11, 1, 1, 32, 42], [424, 195, 2, 1, 31, 42], [5, 317, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], [463, 283, 3, 2, 31, 41], [5, 317, 5, 4, 29, 38], [511, 11, 1, 1, 33, 41], null, [144, 320, 5, 4, 29, 38], [511, 11, 1, 1, 33, 42], [79, 300, 12, 6, 27, 33], [184, 300, 7, 6, 29, 33], [309, 320, 11, 3, 27, 39], [211, 277, 11, 8, 27, 34], [511, 11, 1, 1, 36, 40], [511, 11, 1, 1, 27, 40], [14, 306, 4, 6, 30, 27], [218, 285, 6, 8, 29, 25], [56, 312, 3, 5, 31, 28], [452, 305, 5, 6, 30, 27], [154, 300, 8, 6, 38, 48], [388, 277, 9, 8, 38, 47], [506, 193, 6, 16, 32, 54], [217, 197, 8, 16, 31, 55], [170, 197, 10, 16, 42, 54], [367, 191, 12, 17, 41, 54], [22, 197, 18, 16, 31, 41], [105, 180, 20, 17, 30, 41], [14, 242, 13, 13, 27, 31], [441, 211, 15, 15, 26, 30], [99, 277, 4, 9, 40, 28], [352, 275, 6, 10, 39, 27], [461, 311, 4, 5, 27, 28], [63, 286, 6, 7, 26, 27], [281, 285, 39, 7, 22, 66], [471, 275, 41, 9, 21, 65], [445, 86, 6, 17, 32, 53], [90, 179, 8, 18, 31, 53], [74, 161, 6, 17, 34, 53], [82, 179, 8, 18, 33, 53], [98, 179, 7, 18, 35, 52], [315, 173, 9, 19, 34, 52], [329, 208, 7, 16, 35, 51], [488, 193, 9, 17, 34, 51], [344, 223, 7, 15, 35, 51], [190, 197, 9, 16, 34, 51], [334, 238, 7, 14, 35, 51], [173, 213, 9, 15, 34, 51], [462, 239, 6, 14, 35, 52], [222, 213, 8, 15, 34, 52], [227, 242, 7, 13, 34, 53], [200, 228, 9, 14, 33, 53], [249, 252, 6, 13, 34, 53], [260, 238, 8, 14, 33, 53], [279, 264, 6, 12, 33, 53], [166, 242, 8, 13, 32, 53], [398, 266, 7, 11, 31, 52], [105, 255, 9, 12, 30, 52], [166, 255, 8, 12, 30, 51], [163, 228, 10, 14, 29, 50], [121, 242, 9, 13, 29, 51], [89, 213, 11, 15, 28, 50], [291, 192, 11, 17, 27, 51], [284, 174, 13, 18, 26, 51], [460, 193, 10, 17, 28, 52], [460, 175, 12, 18, 27, 52], [451, 194, 8, 17, 30, 53], [450, 176, 10, 18, 29, 53], [393, 241, 15, 13, 42, 51], [376, 227, 17, 14, 41, 51], [148, 197, 12, 16, 42, 51], [353, 191, 14, 17, 41, 51], [312, 192, 10, 17, 42, 50], [472, 175, 12, 18, 41, 50], [66, 180, 8, 17, 42, 49], [425, 177, 10, 18, 41, 49], [435, 194, 8, 17, 42, 49], [415, 177, 10, 18, 41, 49], [443, 194, 8, 17, 42, 49], [380, 178, 10, 18, 41, 49], [74, 179, 8, 18, 42, 50], [55, 161, 10, 19, 41, 50], [114, 139, 8, 19, 42, 51], [394, 158, 10, 20, 41, 51], [315, 154, 8, 19, 42, 51], [384, 158, 10, 20, 41, 51], [65, 161, 9, 19, 42, 51], [475, 155, 11, 20, 41, 51], [497, 155, 10, 20, 42, 50], [474, 32, 12, 21, 41, 50], [463, 155, 12, 20, 42, 49], [403, 39, 14, 21, 41, 49], [31, 161, 12, 19, 42, 49], [288, 154, 14, 20, 41, 49], [244, 175, 13, 18, 42, 49], [424, 158, 15, 19, 41, 49], [320, 224, 15, 14, 42, 50], [479, 210, 17, 15, 41, 50], [408, 241, 15, 13, 42, 51], [393, 227, 17, 14, 41, 51], [205, 326, 5, 2, 32, 68], [190, 324, 7, 2, 31, 69], [205, 326, 5, 2, 32, 68], [190, 324, 7, 2, 31, 69], [114, 158, 6, 2, 34, 68], [372, 320, 8, 3, 33, 68], [134, 320, 5, 4, 37, 66], [89, 311, 7, 5, 36, 66], [257, 168, 2, 5, 40, 62], [18, 306, 4, 6, 39, 62], [257, 168, 2, 5, 40, 61], [257, 162, 2, 6, 41, 61], [257, 168, 2, 5, 40, 60], [257, 162, 2, 6, 41, 60], [120, 164, 2, 5, 39, 61], [510, 142, 2, 7, 40, 60], [120, 164, 2, 5, 39, 61], [510, 142, 2, 7, 40, 60], [50, 312, 3, 5, 37, 61], [467, 305, 5, 6, 36, 61], [120, 164, 2, 5, 37, 60], [359, 299, 4, 7, 36, 59], [8, 324, 4, 3, 32, 60], [128, 311, 6, 5, 31, 59], [8, 324, 4, 3, 31, 60], [442, 316, 6, 4, 30, 60], [185, 326, 5, 2, 29, 62], [442, 316, 6, 4, 29, 61], [190, 326, 5, 2, 27, 66], [197, 324, 7, 2, 26, 67], [205, 326, 5, 2, 28, 67], [211, 324, 7, 2, 27, 68], [205, 326, 5, 2, 30, 68], [190, 324, 7, 2, 29, 69], [114, 158, 6, 2, 46, 68], [372, 320, 8, 3, 45, 68], [242, 180, 2, 4, 55, 60], [18, 306, 4, 6, 54, 59], [58, 306, 3, 6, 51, 61], [335, 299, 4, 7, 51, 61], [487, 316, 5, 4, 47, 63], [212, 300, 7, 6, 46, 62], [160, 326, 5, 2, 45, 64], [448, 316, 6, 4, 45, 63], [390, 323, 5, 3, 45, 63], [285, 323, 6, 3, 44, 64], [424, 316, 6, 4, 44, 62], [366, 306, 7, 5, 43, 62], [273, 323, 6, 3, 43, 65], [219, 316, 8, 4, 42, 65], [237, 324, 6, 2, 43, 68], [372, 320, 8, 3, 42, 68], [237, 324, 6, 2, 43, 68], [372, 320, 8, 3, 42, 68], [237, 324, 6, 2, 44, 68], [372, 320, 8, 3, 43, 68], [243, 324, 6, 2, 46, 68], [211, 316, 8, 4, 45, 67], [485, 323, 5, 3, 48, 66], [194, 311, 6, 5, 48, 65], [68, 316, 3, 5, 51, 63], [380, 299, 3, 7, 52, 62], [65, 316, 3, 5, 52, 62], [383, 299, 3, 7, 53, 61], [62, 316, 3, 5, 54, 59], [423, 227, 3, 7, 55, 58], [322, 192, 2, 4, 55, 60], [508, 299, 4, 6, 54, 59], [291, 264, 6, 12, 32, 58], [359, 237, 8, 14, 31, 57], [301, 326, 3, 2, 35, 58], [330, 323, 5, 3, 34, 57], [259, 326, 4, 2, 34, 60], [54, 321, 6, 3, 33, 59], [369, 264, 4, 2, 34, 62], [493, 320, 6, 3, 33, 61], [225, 326, 5, 2, 33, 64], [446, 320, 7, 3, 32, 63], [235, 326, 5, 2, 33, 66], [439, 320, 7, 3, 32, 65], [261, 324, 6, 2, 32, 68], [203, 316, 8, 4, 31, 67], [273, 252, 6, 13, 32, 57], [214, 213, 8, 15, 31, 56], [301, 326, 3, 2, 35, 57], [410, 323, 5, 3, 34, 56], [20, 324, 4, 3, 34, 59], [0, 321, 6, 3, 33, 59], [369, 264, 4, 2, 34, 62], [267, 324, 6, 2, 33, 62], [235, 326, 5, 2, 33, 64], [218, 324, 7, 2, 32, 64], [200, 326, 5, 2, 33, 66], [218, 324, 7, 2, 32, 66], [261, 324, 6, 2, 32, 68], [380, 320, 8, 3, 31, 68], [355, 251, 6, 13, 34, 57], [182, 213, 8, 15, 33, 56], [304, 326, 3, 2, 35, 57], [330, 323, 5, 3, 34, 56], [112, 324, 4, 3, 35, 59], [454, 316, 6, 4, 34, 58], [369, 264, 4, 2, 35, 62], [493, 320, 6, 3, 34, 61], [195, 326, 5, 2, 35, 64], [493, 320, 6, 3, 34, 63], [200, 326, 5, 2, 35, 66], [439, 320, 7, 3, 34, 65], [225, 324, 6, 2, 34, 68], [187, 316, 8, 4, 33, 67], [242, 239, 7, 14, 35, 56], [199, 197, 9, 16, 34, 55], [130, 324, 3, 3, 35, 56], [104, 320, 5, 4, 34, 55], [38, 312, 3, 5, 36, 57], [370, 311, 5, 5, 35, 57], [189, 320, 4, 4, 36, 60], [152, 311, 6, 5, 35, 59], [201, 320, 4, 4, 37, 62], [134, 311, 6, 5, 36, 61], [114, 320, 5, 4, 37, 64], [370, 316, 6, 4, 36, 64], [119, 320, 5, 4, 37, 66], [198, 300, 7, 6, 36, 65], [461, 253, 7, 12, 35, 55], [191, 228, 9, 14, 34, 54], [419, 195, 3, 1, 35, 55], [180, 326, 5, 2, 34, 54], [509, 54, 3, 3, 35, 56], [124, 320, 5, 4, 34, 55], [270, 320, 3, 4, 36, 58], [129, 320, 5, 4, 35, 58], [36, 324, 4, 3, 36, 61], [394, 316, 6, 4, 35, 60], [139, 320, 5, 4, 37, 62], [370, 316, 6, 4, 36, 62], [48, 324, 4, 3, 38, 64], [122, 311, 6, 5, 37, 63], [384, 266, 7, 11, 35, 55], [94, 242, 9, 13, 34, 54], [307, 326, 3, 2, 35, 55], [330, 323, 5, 3, 34, 54], [145, 324, 3, 3, 35, 56], [335, 323, 5, 3, 34, 56], [59, 316, 3, 5, 36, 57], [370, 311, 5, 5, 35, 57], [463, 151, 3, 4, 37, 60], [469, 311, 4, 5, 36, 59], [473, 311, 4, 5, 37, 61], [407, 305, 5, 6, 36, 60], [267, 320, 3, 4, 39, 62], [432, 305, 5, 6, 38, 61], [193, 267, 7, 10, 35, 55], [123, 255, 9, 12, 34, 54], [416, 195, 3, 1, 36, 55], [340, 323, 5, 3, 35, 54], [510, 245, 2, 2, 37, 56], [220, 326, 5, 2, 35, 56], [148, 324, 3, 3, 35, 57], [511, 7, 1, 4, 34, 57], [350, 323, 5, 3, 35, 59], [285, 311, 5, 5, 35, 58], [30, 317, 5, 4, 36, 60], [407, 305, 5, 6, 36, 59], [153, 320, 4, 4, 38, 61], [432, 305, 5, 6, 38, 60], [0, 267, 6, 11, 35, 55], [174, 242, 8, 13, 34, 54], [498, 115, 1, 2, 38, 55], [472, 316, 5, 4, 35, 54], [283, 326, 4, 2, 35, 56], [355, 323, 5, 3, 34, 56], [316, 326, 3, 2, 35, 58], [498, 109, 1, 3, 34, 58], [237, 320, 4, 4, 35, 59], [116, 311, 6, 5, 34, 59], [433, 311, 4, 5, 36, 60], [498, 125, 1, 1, 36, 64], [71, 316, 3, 5, 38, 61], [426, 292, 5, 7, 37, 60], [158, 267, 7, 10, 34, 56], [132, 255, 9, 12, 33, 55], [257, 173, 2, 1, 37, 56], [154, 326, 6, 2, 34, 55], [370, 323, 5, 3, 34, 57], [467, 320, 7, 3, 33, 57], [287, 326, 4, 2, 34, 59], [238, 220, 2, 2, 33, 60], [16, 324, 4, 3, 35, 60], [140, 311, 6, 5, 34, 59], [465, 311, 4, 5, 36, 60], [498, 125, 1, 1, 36, 64], [509, 311, 3, 5, 38, 61], [426, 292, 5, 7, 37, 60], [328, 275, 6, 10, 34, 56], [182, 255, 8, 12, 33, 55], [511, 11, 1, 1, 36, 56], [48, 321, 6, 3, 34, 55], [230, 326, 5, 2, 34, 57], [474, 320, 7, 3, 33, 57], [40, 324, 4, 3, 34, 58], [498, 119, 1, 2, 33, 60], [249, 320, 4, 4, 34, 59], [345, 311, 5, 5, 34, 59], [118, 134, 4, 5, 35, 60], [260, 311, 5, 5, 35, 60], [53, 312, 3, 5, 37, 61], [467, 305, 5, 6, 36, 61], [346, 275, 6, 10, 33, 55], [190, 255, 8, 12, 32, 54], [328, 326, 3, 2, 35, 55], [406, 316, 6, 4, 33, 54], [195, 326, 5, 2, 33, 56], [498, 109, 1, 3, 32, 56], [92, 324, 4, 3, 33, 58], [12, 321, 6, 3, 32, 58], [209, 320, 4, 4, 34, 59], [498, 119, 1, 2, 33, 61], [233, 320, 4, 4, 35, 60], [407, 305, 5, 6, 34, 59], [267, 320, 3, 4, 36, 61], [508, 299, 4, 6, 36, 60], [76, 277, 6, 9, 31, 54], [450, 265, 8, 11, 30, 53], [510, 241, 2, 2, 35, 54], [364, 316, 6, 4, 32, 53], [4, 324, 4, 3, 32, 54], [42, 321, 6, 3, 31, 54], [175, 326, 5, 2, 31, 56], [204, 324, 7, 2, 30, 56], [170, 326, 5, 2, 31, 58], [183, 324, 7, 2, 30, 58], [380, 323, 5, 3, 31, 59], [238, 220, 2, 2, 30, 60], [0, 324, 4, 3, 32, 60], [128, 311, 6, 5, 31, 59], [334, 275, 6, 10, 30, 53], [150, 255, 8, 12, 29, 52], [120, 324, 4, 3, 32, 53], [376, 316, 6, 4, 31, 52], [4, 324, 4, 3, 31, 54], [42, 321, 6, 3, 30, 54], [175, 326, 5, 2, 30, 56], [204, 324, 7, 2, 29, 56], [250, 326, 5, 2, 30, 58], [183, 324, 7, 2, 29, 58], [420, 323, 5, 3, 30, 59], [498, 119, 1, 2, 29, 60], [0, 324, 4, 3, 31, 60], [128, 311, 6, 5, 30, 59], [144, 267, 7, 10, 29, 54], [114, 255, 9, 12, 28, 53], [295, 326, 3, 2, 33, 54], [109, 320, 5, 4, 32, 53], [465, 323, 5, 3, 31, 54], [164, 311, 6, 5, 30, 54], [470, 323, 5, 3, 30, 56], [498, 119, 1, 2, 29, 56], [175, 326, 5, 2, 29, 58], [204, 324, 7, 2, 28, 58], [165, 326, 5, 2, 29, 60], [183, 324, 7, 2, 28, 60], [475, 323, 5, 3, 29, 61], [227, 316, 7, 4, 28, 61], [157, 242, 9, 13, 27, 55], [100, 213, 11, 15, 26, 54], [80, 324, 4, 3, 32, 55], [74, 320, 5, 4, 32, 54], [84, 324, 4, 3, 31, 57], [352, 316, 6, 4, 30, 56], [495, 323, 5, 3, 29, 59], [411, 320, 7, 3, 28, 59], [400, 323, 5, 3, 28, 61], [411, 320, 7, 3, 27, 61], [309, 323, 6, 3, 27, 63], [356, 320, 8, 3, 26, 63], [245, 326, 5, 2, 27, 66], [283, 316, 7, 4, 26, 65], [198, 242, 8, 13, 28, 56], [154, 213, 10, 15, 27, 55], [313, 326, 3, 2, 33, 56], [25, 317, 5, 4, 32, 55], [108, 324, 4, 3, 32, 57], [297, 323, 6, 3, 31, 57], [100, 324, 4, 3, 31, 59], [291, 323, 6, 3, 30, 59], [460, 323, 5, 3, 30, 61], [297, 316, 7, 4, 29, 61], [10, 317, 5, 4, 29, 63], [304, 316, 7, 4, 28, 63], [480, 323, 5, 3, 28, 66], [318, 316, 7, 4, 27, 66], [206, 242, 7, 13, 30, 57], [164, 213, 9, 15, 29, 56], [133, 324, 3, 3, 34, 57], [507, 316, 5, 4, 33, 56], [68, 324, 4, 3, 33, 59], [279, 323, 6, 3, 32, 59], [460, 323, 5, 3, 32, 61], [418, 320, 7, 3, 31, 61], [52, 324, 4, 3, 32, 63], [279, 323, 6, 3, 31, 63], [445, 323, 5, 3, 31, 65], [425, 320, 7, 3, 30, 65], [261, 324, 6, 2, 30, 68], [380, 320, 8, 3, 29, 68], [367, 237, 8, 14, 44, 56], [280, 192, 11, 17, 42, 54], [435, 323, 5, 3, 44, 56], [257, 306, 8, 5, 42, 54], [185, 320, 4, 4, 46, 57], [212, 311, 6, 5, 45, 57], [161, 320, 4, 4, 47, 60], [152, 311, 6, 5, 46, 59], [482, 316, 5, 4, 47, 62], [352, 306, 7, 5, 46, 61], [430, 323, 5, 3, 47, 65], [262, 316, 7, 4, 46, 64], [66, 321, 6, 3, 46, 67], [337, 306, 8, 5, 45, 66], [310, 276, 11, 9, 46, 55], [35, 255, 14, 12, 44, 53], [415, 323, 5, 3, 46, 55], [205, 300, 7, 6, 44, 53], [157, 320, 4, 4, 48, 56], [427, 305, 5, 6, 48, 55], [255, 311, 5, 5, 49, 57], [260, 311, 5, 5, 49, 57], [213, 320, 4, 4, 51, 59], [226, 300, 6, 6, 50, 58], [295, 311, 5, 5, 52, 59], [487, 305, 5, 6, 52, 59], [124, 324, 3, 3, 54, 61], [501, 311, 4, 5, 54, 60], [432, 265, 9, 11, 45, 56], [77, 228, 12, 14, 43, 54], [405, 323, 5, 3, 45, 56], [359, 306, 7, 5, 43, 54], [376, 208, 3, 4, 47, 57], [315, 311, 5, 5, 46, 56], [8, 312, 4, 5, 48, 58], [5, 306, 5, 6, 47, 58], [28, 312, 4, 5, 49, 60], [69, 286, 6, 7, 48, 59], [16, 312, 4, 5, 50, 61], [422, 305, 5, 6, 50, 61], [235, 235, 3, 4, 51, 63], [30, 306, 4, 6, 51, 62], [285, 264, 6, 12, 46, 55], [143, 228, 10, 14, 43, 54], [127, 324, 3, 3, 46, 55], [339, 316, 7, 4, 43, 54], [225, 320, 4, 4, 46, 56], [477, 316, 5, 4, 45, 56], [492, 316, 5, 4, 46, 58], [191, 300, 7, 6, 45, 57], [395, 311, 5, 5, 46, 60], [380, 306, 7, 5, 45, 60], [497, 316, 5, 4, 47, 62], [61, 311, 7, 5, 46, 61], [502, 316, 5, 4, 47, 63], [384, 153, 7, 5, 46, 63], [302, 264, 5, 12, 45, 54], [268, 238, 8, 14, 43, 53], [310, 326, 3, 2, 46, 54], [432, 320, 7, 3, 43, 53], [60, 324, 4, 3, 46, 55], [493, 320, 6, 3, 45, 55], [0, 317, 5, 4, 45, 57], [311, 316, 7, 4, 44, 57], [15, 317, 5, 4, 45, 59], [262, 316, 7, 4, 44, 59], [385, 323, 5, 3, 45, 62], [290, 316, 7, 4, 44, 61], [279, 326, 4, 2, 46, 64], [481, 320, 6, 3, 45, 64], [297, 264, 5, 12, 45, 54], [351, 237, 8, 14, 43, 53], [319, 326, 3, 2, 46, 54], [388, 316, 6, 4, 43, 53], [20, 317, 5, 4, 45, 55], [82, 311, 7, 5, 44, 54], [40, 317, 5, 4, 45, 56], [276, 316, 7, 4, 44, 56], [89, 320, 5, 4, 45, 58], [262, 316, 7, 4, 44, 58], [365, 323, 5, 3, 45, 61], [290, 316, 7, 4, 44, 60], [360, 323, 5, 3, 45, 63], [227, 316, 7, 4, 44, 63], [342, 252, 6, 12, 44, 54], [227, 228, 8, 14, 43, 53], [310, 326, 3, 2, 46, 54], [36, 321, 6, 3, 43, 53], [60, 324, 4, 3, 46, 55], [394, 316, 6, 4, 45, 54], [60, 324, 4, 3, 46, 57], [30, 321, 6, 3, 45, 56], [345, 323, 5, 3, 45, 59], [439, 320, 7, 3, 44, 58], [24, 321, 6, 3, 44, 61], [364, 320, 8, 3, 43, 60], [18, 321, 6, 3, 44, 63], [297, 306, 8, 5, 43, 62], [213, 242, 7, 13, 43, 55], [208, 197, 9, 16, 42, 53], [255, 326, 4, 2, 45, 55], [234, 316, 7, 4, 43, 53], [88, 324, 4, 3, 46, 56], [6, 321, 6, 3, 45, 56], [315, 323, 5, 3, 45, 58], [404, 320, 7, 3, 44, 58], [252, 206, 5, 3, 45, 60], [439, 320, 7, 3, 44, 60], [505, 320, 6, 3, 44, 63], [179, 316, 8, 4, 43, 62], [499, 320, 6, 3, 43, 65], [289, 306, 8, 5, 42, 64], [327, 238, 7, 14, 43, 56], [470, 193, 9, 17, 42, 54], [104, 324, 4, 3, 44, 56], [96, 311, 7, 5, 42, 54], [0, 317, 5, 4, 45, 57], [103, 311, 7, 5, 44, 56], [15, 317, 5, 4, 45, 59], [290, 316, 7, 4, 44, 59], [460, 316, 6, 4, 44, 62], [147, 316, 8, 4, 43, 62], [241, 316, 7, 4, 43, 64], [122, 316, 9, 4, 42, 64], [460, 320, 7, 3, 43, 67], [104, 316, 9, 4, 42, 67], [235, 239, 7, 14, 43, 56], [497, 193, 9, 17, 42, 54], [104, 324, 4, 3, 44, 56], [96, 311, 7, 5, 42, 54], [96, 324, 4, 3, 46, 57], [430, 316, 6, 4, 45, 56], [79, 320, 5, 4, 45, 59], [255, 316, 7, 4, 44, 59], [436, 316, 6, 4, 44, 62], [163, 316, 8, 4, 43, 62], [241, 316, 7, 4, 43, 64], [122, 316, 9, 4, 42, 64], [460, 320, 7, 3, 43, 67], [104, 316, 9, 4, 42, 67], [292, 238, 7, 14, 44, 56], [242, 193, 10, 17, 42, 54], [440, 323, 5, 3, 44, 56], [313, 306, 8, 5, 42, 54], [257, 320, 4, 4, 46, 57], [382, 316, 6, 4, 45, 57], [425, 323, 5, 3, 46, 60], [269, 316, 7, 4, 45, 59], [436, 316, 6, 4, 45, 62], [163, 316, 8, 4, 44, 62], [466, 316, 6, 4, 45, 64], [171, 316, 8, 4, 44, 64], [460, 320, 7, 3, 44, 67], [104, 316, 9, 4, 43, 67], [336, 223, 8, 15, 44, 55], [439, 176, 11, 18, 42, 53], [487, 320, 6, 3, 44, 55], [240, 306, 9, 5, 42, 53], [32, 324, 4, 3, 46, 56], [400, 316, 6, 4, 45, 56], [28, 324, 4, 3, 47, 58], [382, 316, 6, 4, 46, 58], [20, 312, 4, 5, 47, 60], [218, 311, 6, 5, 46, 60], [250, 300, 6, 6, 46, 62], [130, 300, 8, 6, 45, 62], [200, 311, 6, 5, 46, 65], [162, 300, 8, 6, 45, 65], [206, 213, 8, 15, 46, 54], [496, 175, 11, 18, 44, 52], [322, 326, 3, 2, 46, 54], [110, 311, 6, 5, 44, 52], [310, 188, 5, 4, 47, 55], [401, 305, 6, 6, 47, 54], [253, 320, 4, 4, 48, 57], [206, 311, 6, 5, 47, 57], [390, 311, 5, 5, 48, 59], [177, 300, 7, 6, 47, 59], [170, 311, 6, 5, 48, 62], [427, 285, 7, 7, 47, 61], [420, 311, 5, 5, 49, 64], [420, 285, 7, 7, 48, 63], [419, 212, 7, 15, 47, 53], [404, 177, 11, 18, 44, 51], [151, 324, 3, 3, 47, 53], [75, 311, 7, 5, 44, 51], [55, 317, 4, 4, 48, 54], [182, 311, 6, 5, 47, 53], [376, 208, 3, 4, 49, 57], [370, 311, 5, 5, 48, 56], [315, 299, 4, 7, 49, 58], [27, 286, 6, 7, 48, 58], [249, 246, 3, 6, 50, 61], [401, 292, 5, 7, 49, 60], [423, 234, 3, 6, 51, 62], [396, 292, 5, 7, 50, 62], [284, 238, 8, 14, 47, 53], [257, 192, 12, 17, 44, 51], [64, 324, 4, 3, 47, 53], [146, 300, 8, 6, 44, 51], [181, 320, 4, 4, 48, 54], [315, 311, 5, 5, 48, 54], [56, 324, 4, 3, 49, 57], [152, 311, 6, 5, 48, 56], [442, 305, 5, 6, 49, 58], [256, 300, 6, 6, 48, 58], [380, 173, 4, 5, 50, 61], [21, 286, 6, 7, 49, 60], [153, 320, 4, 4, 51, 63], [432, 305, 5, 6, 51, 62], [264, 265, 10, 11, 47, 53], [238, 225, 14, 14, 44, 51], [325, 323, 5, 3, 47, 53], [273, 306, 8, 5, 44, 51], [320, 323, 5, 3, 48, 54], [325, 316, 7, 4, 47, 53], [197, 320, 4, 4, 50, 55], [224, 311, 6, 5, 49, 55], [197, 320, 4, 4, 51, 57], [417, 305, 5, 6, 50, 57], [149, 320, 4, 4, 52, 59], [498, 125, 1, 1, 52, 63], [425, 311, 4, 5, 53, 59], [356, 292, 5, 7, 53, 58], [76, 267, 11, 10, 46, 54], [0, 242, 14, 13, 44, 52], [500, 323, 5, 3, 46, 54], [219, 300, 7, 6, 44, 52], [157, 320, 4, 4, 48, 55], [427, 305, 5, 6, 48, 54], [255, 311, 5, 5, 49, 56], [260, 311, 5, 5, 49, 56], [213, 320, 4, 4, 51, 58], [395, 305, 6, 6, 50, 57], [449, 311, 4, 5, 52, 59], [331, 326, 3, 2, 52, 63], [242, 188, 2, 4, 55, 60], [49, 306, 3, 6, 55, 59], [105, 179, 10, 1, 27, 38], [297, 320, 12, 3, 26, 37], null, [285, 320, 12, 3, 26, 37], null, [404, 195, 7, 1, 28, 38], [338, 320, 9, 3, 27, 37], null, [242, 192, 2, 1, 43, 31], null, [238, 213, 2, 3, 43, 30], null, [238, 216, 2, 2, 43, 30], null, [120, 173, 2, 4, 43, 30], null, [375, 311, 5, 5, 41, 31], null, [511, 11, 1, 1, 43, 33], null, [259, 154, 15, 20, 39, 20], [408, 136, 17, 22, 38, 19], [474, 57, 30, 26, 26, 17], [422, 32, 32, 28, 25, 16], [496, 210, 15, 15, 41, 18], [0, 161, 17, 19, 40, 16], [190, 242, 8, 13, 43, 17], null, [50, 267, 15, 10, 41, 19], null, [424, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [376, 212, 15, 15, 41, 17], [164, 180, 16, 17, 41, 16], [130, 242, 9, 13, 41, 20], [160, 197, 10, 16, 40, 19], [443, 240, 13, 13, 43, 18], null, [424, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [52, 213, 13, 15, 43, 17], [180, 180, 16, 17, 41, 16], [130, 242, 9, 13, 41, 20], [160, 197, 10, 16, 40, 19], [495, 264, 11, 11, 41, 19], [12, 324, 4, 3, 49, 28], [424, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [402, 112, 22, 24, 32, 12], [451, 83, 24, 26, 31, 11], [66, 115, 22, 24, 32, 12], [427, 60, 24, 26, 31, 11], [244, 265, 10, 11, 38, 19], [73, 255, 11, 12, 38, 19], [0, 115, 22, 24, 32, 12], [316, 106, 24, 25, 31, 12], [244, 265, 10, 11, 38, 19], [73, 255, 11, 12, 38, 19], [22, 115, 22, 24, 32, 12], [475, 83, 24, 26, 31, 11], [26, 213, 13, 15, 41, 12], [324, 191, 15, 17, 40, 11], [62, 255, 11, 12, 38, 18], [39, 242, 12, 13, 38, 18], [51, 242, 12, 13, 40, 15], [52, 228, 13, 14, 39, 15], [405, 212, 14, 15, 32, 21], [196, 180, 16, 17, 31, 20], [44, 115, 22, 24, 32, 12], [403, 60, 24, 26, 31, 11], [244, 265, 10, 11, 38, 19], [73, 255, 11, 12, 38, 19], [0, 213, 13, 15, 40, 12], [302, 192, 10, 17, 42, 11], [453, 320, 7, 3, 31, 46], [222, 306, 9, 5, 30, 45], [441, 133, 3, 1, 31, 48], [375, 323, 5, 3, 30, 47], [231, 324, 6, 2, 32, 46], [155, 316, 8, 4, 31, 45], [306, 238, 7, 14, 31, 45], [479, 193, 9, 17, 30, 44], [361, 251, 6, 13, 32, 46], [322, 208, 7, 16, 31, 45], [205, 255, 7, 12, 31, 45], [182, 228, 9, 14, 30, 44], [441, 112, 4, 11, 34, 46], [252, 193, 5, 13, 33, 45], [508, 0, 3, 12, 33, 47], [310, 174, 5, 14, 32, 47], [221, 320, 4, 4, 31, 46], [244, 300, 6, 6, 30, 45], [419, 266, 4, 9, 34, 45], [322, 275, 6, 10, 33, 44], [320, 238, 7, 14, 31, 45], [426, 195, 9, 16, 30, 44], [267, 252, 6, 13, 32, 46], [225, 197, 8, 16, 31, 45], [506, 264, 6, 11, 32, 46], [182, 242, 8, 13, 31, 45], [509, 44, 3, 10, 32, 47], [507, 252, 5, 12, 31, 46], [240, 200, 2, 3, 36, 46], [265, 306, 8, 5, 31, 45], [451, 70, 3, 10, 32, 47], [317, 264, 5, 12, 31, 46], [240, 200, 2, 3, 36, 46], [265, 306, 8, 5, 31, 45], [510, 149, 2, 6, 32, 50], [327, 299, 4, 7, 31, 49], [238, 222, 2, 2, 33, 47], [205, 320, 4, 4, 32, 46], [240, 200, 2, 3, 36, 46], [265, 306, 8, 5, 31, 45], [440, 136, 1, 1, 33, 50], [173, 320, 4, 4, 31, 49], [240, 206, 2, 3, 32, 51], [497, 311, 4, 5, 31, 50], [240, 206, 2, 3, 32, 53], [165, 320, 4, 4, 31, 52], [498, 117, 1, 2, 33, 55], [264, 320, 3, 4, 32, 54], [463, 134, 3, 9, 32, 47], [307, 264, 5, 12, 31, 46], [240, 200, 2, 3, 36, 46], [265, 306, 8, 5, 31, 45], [120, 158, 2, 6, 32, 51], [277, 285, 4, 8, 31, 49], [511, 11, 1, 1, 31, 45], [142, 324, 3, 3, 30, 44], [244, 106, 47, 25, 48, 151], [403, 0, 19, 39, 63, 122], [0, 0, 122, 115, 17, 9], [379, 196, 47, 16, 48, 161], [122, 106, 122, 74, 14, 122], [39, 277, 8, 9, 0, 0], [396, 320, 8, 3, 0, 7], [122, 0, 281, 106, 0, 0], [323, 153, 22, 20, 0, 0], [468, 239, 22, 13, 0, 9], [259, 131, 31, 23, 0, 0], [322, 264, 31, 11, 0, 14], [291, 106, 25, 25, 1, 1], [82, 306, 21, 5, 3, 22], [212, 285, 6, 8, 0, 0], [131, 285, 8, 8, 0, 0], [139, 285, 8, 8, 0, 0], [441, 285, 7, 7, 0, 0], [448, 285, 7, 7, 0, 0], [175, 285, 7, 8, 0, 0], [168, 285, 7, 8, 0, 0], [177, 320, 4, 4, 0, 2], [487, 284, 8, 8, 0, 0], [238, 300, 6, 6, 0, 1], [123, 285, 8, 8, 0, 0], [115, 285, 8, 8, 0, 0], [200, 285, 6, 8, 0, 0], [0, 278, 8, 8, 0, 0], [471, 284, 8, 8, 0, 0], [8, 278, 8, 8, 0, 0], [462, 285, 7, 7, 0, 0], [0, 286, 7, 7, 0, 0], [224, 285, 6, 8, 0, 0], [57, 286, 6, 7, 0, 0], [412, 285, 8, 7, 0, 0], [107, 285, 8, 8, 0, 0], [60, 321, 6, 3, 0, 4], [479, 284, 8, 8, 0, 0], [81, 286, 6, 7, 0, 0], [87, 286, 6, 7, 0, 0], [68, 311, 7, 5, 0, 1], [345, 306, 7, 5, 0, 1], [332, 316, 7, 4, 0, 2], [281, 306, 8, 5, 0, 1], [321, 306, 8, 5, 0, 1], [305, 306, 8, 5, 0, 1], [473, 59, 1, 7, 0, 0], [44, 324, 4, 3, 0, 0], [160, 293, 5, 7, 0, 0], [170, 293, 5, 7, 0, 0], [175, 293, 5, 7, 0, 0], [180, 293, 5, 7, 0, 0], [322, 203, 2, 3, 0, 0], [371, 299, 3, 7, 0, 0], [374, 299, 3, 7, 0, 0], [72, 324, 4, 3, 0, 2], [245, 311, 5, 5, 0, 1], [473, 80, 1, 3, 0, 5], [411, 195, 5, 1, 0, 3], [498, 117, 1, 2, 0, 5], [200, 293, 5, 7, 0, 0], [341, 292, 5, 7, 0, 0], [205, 293, 5, 7, 0, 0], [215, 293, 5, 7, 0, 0], [0, 293, 5, 7, 0, 0], [225, 293, 5, 7, 0, 0], [235, 293, 5, 7, 0, 0], [250, 293, 5, 7, 0, 0], [255, 293, 5, 7, 0, 0], [265, 293, 5, 7, 0, 0], [270, 293, 5, 7, 0, 0], [402, 106, 1, 6, 0, 1], [473, 66, 1, 7, 0, 1], [307, 299, 4, 7, 0, 0], [84, 320, 5, 4, 0, 2], [339, 299, 4, 7, 0, 0], [80, 293, 5, 7, 0, 0], [33, 286, 6, 7, 0, 0], [496, 292, 5, 7, 0, 0], [486, 292, 5, 7, 0, 0], [98, 286, 5, 7, 0, 0], [476, 292, 5, 7, 0, 0], [466, 292, 5, 7, 0, 0], [451, 292, 5, 7, 0, 0], [446, 292, 5, 7, 0, 0], [391, 292, 5, 7, 0, 0], [377, 299, 3, 7, 0, 0], [441, 292, 5, 7, 0, 0], [381, 292, 5, 7, 0, 0], [376, 292, 5, 7, 0, 0], [371, 292, 5, 7, 0, 0], [351, 292, 5, 7, 0, 0], [341, 292, 5, 7, 0, 0], [286, 292, 5, 7, 0, 0], [110, 293, 5, 7, 0, 0], [90, 293, 5, 7, 0, 0], [70, 293, 5, 7, 0, 0], [301, 292, 5, 7, 0, 0], [60, 293, 5, 7, 0, 0], [35, 293, 5, 7, 0, 0], [25, 293, 5, 7, 0, 0], [20, 293, 5, 7, 0, 0], [481, 292, 5, 7, 0, 0], [461, 292, 5, 7, 0, 0], [348, 238, 3, 7, 0, 0], [436, 292, 5, 7, 0, 0], [249, 239, 3, 7, 0, 0], [450, 323, 5, 3, 0, 0], [411, 195, 5, 1, 0, 7], [240, 203, 2, 3, 0, 0], [385, 311, 5, 5, 0, 2], [421, 292, 5, 7, 0, 0], [355, 311, 5, 5, 0, 2], [406, 292, 5, 7, 0, 0], [330, 311, 5, 5, 0, 2], [319, 299, 4, 7, 0, 0], [457, 305, 5, 6, 0, 2], [366, 292, 5, 7, 0, 0], [473, 73, 1, 7, 0, 0], [247, 285, 5, 8, 0, 0], [299, 299, 4, 7, 0, 0], [510, 128, 2, 7, 0, 0], [280, 311, 5, 5, 0, 2], [275, 311, 5, 5, 0, 2], [270, 311, 5, 5, 0, 2], [497, 305, 5, 6, 0, 2], [477, 305, 5, 6, 0, 2], [240, 311, 5, 5, 0, 2], [235, 311, 5, 5, 0, 2], [386, 299, 3, 7, 0, 0], [290, 311, 5, 5, 0, 2], [305, 311, 5, 5, 0, 2], [310, 311, 5, 5, 0, 2], [340, 311, 5, 5, 0, 2], [492, 305, 5, 6, 0, 2], [350, 311, 5, 5, 0, 2], [103, 286, 4, 7, 0, 0], [511, 0, 1, 7, 0, 0], [355, 299, 4, 7, 0, 0], [249, 324, 6, 2, 0, 2], [410, 311, 5, 5, 0, 2], [252, 285, 5, 8, 0, 0], [361, 292, 5, 7, 0, 0], [386, 292, 5, 7, 0, 0], [411, 292, 5, 7, 0, 0], [416, 292, 5, 7, 0, 0], [506, 292, 5, 7, 0, 0], [30, 293, 5, 7, 0, 0], [40, 293, 5, 7, 0, 1], [50, 293, 5, 7, 0, 0], [55, 293, 5, 7, 0, 0], [65, 293, 5, 7, 0, 0], [463, 276, 3, 7, 0, 0], [75, 293, 5, 7, 0, 0], [510, 135, 2, 7, 0, 0], [85, 293, 5, 7, 0, 0], [95, 293, 5, 7, 0, 0], [125, 293, 5, 7, 0, 0], [360, 311, 5, 5, 0, 2], [135, 293, 5, 7, 0, 0], [140, 293, 5, 7, 0, 0], [145, 293, 5, 7, 0, 0], [150, 293, 5, 7, 0, 0], [155, 293, 5, 7, 0, 0], [185, 293, 5, 7, 0, 0], [257, 285, 5, 8, 0, 0], [190, 293, 5, 7, 0, 0], [220, 293, 5, 7, 0, 0], [482, 305, 5, 6, 0, 2], [230, 293, 5, 7, 0, 0], [240, 293, 5, 7, 0, 0], [139, 324, 3, 3, 0, 2], [262, 285, 5, 8, 0, 0], [245, 293, 5, 7, 0, 0], [257, 155, 2, 7, 0, 0], [290, 299, 5, 7, 0, 0], [285, 299, 5, 7, 0, 0], [280, 299, 5, 7, 0, 0], [275, 293, 5, 7, 0, 0], [472, 305, 5, 6, 0, 0], [462, 305, 5, 6, 0, 0], [260, 293, 5, 7, 0, 0], [158, 311, 6, 5, 0, 1], [490, 323, 5, 3, 0, 3], [210, 293, 5, 7, 0, 0], [272, 285, 5, 8, 0, 0], [508, 23, 1, 6, 0, 1], [250, 311, 5, 5, 0, 1], [230, 311, 5, 5, 0, 1], [496, 292, 5, 7, 0, 0], [405, 311, 5, 5, 0, 2], [165, 293, 5, 7, 0, 0], [507, 186, 5, 7, 0, 0], [120, 293, 5, 7, 0, 0], [481, 311, 4, 5, 0, 2], [347, 299, 4, 7, 0, 0], [44, 312, 3, 5, 0, 2], [236, 285, 6, 8, 0, 0], [502, 305, 5, 6, 0, 2], [466, 292, 5, 7, 0, 0], [330, 311, 5, 5, 0, 2], [466, 292, 5, 7, 0, 0], [55, 293, 5, 7, 0, 0], [10, 293, 5, 7, 0, 0], [335, 311, 5, 5, 0, 2], [0, 293, 5, 7, 0, 0], [493, 311, 4, 5, 0, 2], [501, 292, 5, 7, 0, 0], [485, 311, 4, 5, 0, 2], [491, 292, 5, 7, 0, 0], [295, 299, 4, 7, 0, 0], [381, 292, 5, 7, 0, 0], [0, 312, 4, 5, 0, 2], [431, 292, 5, 7, 0, 0], [437, 311, 4, 5, 0, 2], [7, 286, 7, 7, 0, 0], [380, 311, 5, 5, 0, 2], [391, 292, 5, 7, 0, 0], [4, 312, 4, 5, 0, 2], [341, 292, 5, 7, 0, 0], [270, 311, 5, 5, 0, 2], [331, 292, 5, 7, 0, 0], [505, 311, 4, 5, 0, 2], [326, 292, 5, 7, 0, 0], [26, 306, 4, 6, 0, 2], [98, 286, 5, 7, 0, 0], [355, 311, 5, 5, 0, 2], [301, 292, 5, 7, 0, 0], [41, 312, 3, 5, 0, 2], [291, 292, 5, 7, 0, 0], [42, 306, 4, 6, 0, 2], [281, 292, 5, 7, 0, 0], [93, 286, 5, 7, 0, 1], [20, 293, 5, 7, 0, 0], [340, 311, 5, 5, 0, 2], [188, 285, 6, 8, 0, 0], [445, 103, 6, 6, 0, 2], [15, 293, 5, 7, 0, 0], [489, 311, 4, 5, 0, 2], [455, 285, 7, 7, 0, 0], [265, 311, 5, 5, 0, 2], [495, 284, 8, 8, 0, 0], [268, 300, 6, 6, 0, 2], [130, 293, 5, 7, 0, 0], [400, 311, 5, 5, 0, 2], [75, 286, 6, 7, 0, 0], [188, 311, 6, 5, 0, 2], [363, 299, 4, 7, 0, 0], [429, 311, 4, 5, 0, 2], [45, 293, 5, 7, 0, 0], [453, 311, 4, 5, 0, 2], [51, 286, 6, 7, 0, 0], [415, 311, 5, 5, 0, 2], [100, 293, 5, 7, 0, 0], [441, 311, 4, 5, 0, 2], [206, 285, 6, 8, 0, 0], [389, 305, 6, 6, 0, 2], [296, 292, 5, 7, 0, 0], [296, 292, 5, 7, 0, 0], [182, 285, 6, 8, 0, 0], [232, 300, 6, 6, 0, 2], [306, 292, 5, 7, 0, 0], [311, 292, 5, 7, 0, 0], [316, 292, 5, 7, 0, 0], [316, 292, 5, 7, 0, 0], [336, 292, 5, 7, 0, 0], [336, 292, 5, 7, 0, 0], [346, 292, 5, 7, 0, 0], [346, 292, 5, 7, 0, 0], [39, 286, 6, 7, 0, 0], [456, 218, 3, 7, 0, 0], [5, 293, 5, 7, 0, 0], [14, 286, 7, 7, 0, 0], [115, 293, 5, 7, 0, 0], [471, 292, 5, 7, 0, 0], [434, 285, 7, 7, 0, 0], [238, 216, 2, 2, 0, 3], [322, 203, 2, 3, 0, 0], [454, 0, 32, 32, 0, 0], [422, 0, 32, 32, 0, 0], [466, 109, 32, 24, 0, 0], [16, 278, 8, 8, 0, 1], [505, 323, 5, 3, 0, 0], [45, 317, 5, 4, 0, 0], [511, 11, 1, 1, 0, 0], [62, 277, 7, 9, 0, 0], [419, 276, 10, 9, 0, 0], [504, 76, 8, 7, 0, 1], [65, 267, 11, 10, 0, 1], [127, 267, 9, 10, 1, 2], [65, 267, 11, 10, 0, 1], [299, 276, 11, 9, 0, 1]].map(r)
        , T = [null, [213, 222, 12, 8, 29, 28], [353, 222, 12, 8, 29, 28], [365, 222, 12, 8, 29, 28], [385, 106, 12, 8, 29, 28], [389, 222, 12, 8, 29, 28], [377, 222, 12, 8, 29, 28], [213, 222, 12, 8, 29, 28], [353, 222, 12, 8, 29, 28], [365, 222, 12, 8, 29, 28], [385, 106, 12, 8, 29, 28], [389, 222, 12, 8, 29, 28], [377, 222, 12, 8, 29, 28], [419, 177, 10, 17, 34, 26], [0, 178, 10, 17, 34, 26], [76, 222, 12, 9, 30, 27], [499, 221, 12, 9, 30, 27], [148, 223, 5, 6, 31, 28], [506, 199, 5, 6, 31, 28], [507, 150, 5, 7, 31, 29], [506, 192, 5, 7, 31, 29], [371, 160, 22, 17, 20, 19], [244, 173, 22, 17, 20, 19], [319, 172, 22, 17, 20, 19], [44, 161, 22, 17, 20, 19], [22, 161, 22, 17, 20, 19], [0, 161, 22, 17, 20, 19], [371, 160, 22, 17, 20, 19], [244, 173, 22, 17, 20, 19], [319, 172, 22, 17, 20, 19], [44, 161, 22, 17, 20, 19], [22, 161, 22, 17, 20, 19], [0, 161, 22, 17, 20, 19], [374, 139, 22, 21, 20, 22], [81, 139, 22, 21, 20, 22], [206, 196, 21, 14, 21, 22], [185, 196, 21, 14, 21, 22], [57, 209, 18, 13, 24, 20], [355, 209, 18, 13, 24, 20], [25, 195, 25, 14, 19, 20], [412, 194, 25, 14, 19, 20], [120, 196, 22, 14, 27, 19], [142, 196, 22, 14, 27, 19], [385, 114, 24, 25, 18, 21], [475, 110, 24, 25, 18, 21], [190, 180, 22, 16, 19, 23], [168, 180, 22, 16, 19, 23], [83, 178, 5, 9, 23, 32], [417, 48, 5, 9, 23, 32], [507, 132, 5, 9, 23, 32], [507, 141, 5, 9, 23, 32], [103, 149, 5, 9, 23, 32], [417, 39, 5, 9, 23, 32], [299, 219, 9, 12, 24, 32], [326, 219, 9, 12, 24, 32], [499, 110, 13, 22, 19, 30], [109, 115, 13, 22, 19, 30], [441, 135, 22, 22, 20, 19], [463, 135, 22, 22, 20, 19], [22, 139, 22, 22, 20, 19], [0, 139, 22, 22, 20, 19], [485, 135, 22, 22, 20, 19], [44, 139, 22, 22, 20, 19], [481, 175, 22, 17, 20, 19], [459, 175, 22, 17, 20, 19], [437, 175, 22, 17, 20, 19], [341, 173, 22, 17, 20, 19], [288, 173, 22, 17, 20, 19], [266, 173, 22, 17, 20, 19], [244, 132, 24, 22, 20, 22], [350, 131, 24, 22, 20, 22], [300, 205, 21, 14, 21, 22], [164, 196, 21, 14, 21, 22], [57, 209, 18, 13, 24, 20], [355, 209, 18, 13, 24, 20], [50, 195, 25, 14, 19, 20], [0, 195, 25, 14, 19, 20], [120, 196, 22, 14, 27, 19], [142, 196, 22, 14, 27, 19], [451, 110, 24, 25, 18, 21], [361, 106, 24, 25, 18, 21], [486, 29, 22, 29, 19, 23], [486, 0, 22, 29, 19, 23], [428, 208, 7, 14, 38, 33], [0, 209, 7, 14, 38, 33], [7, 209, 7, 14, 38, 33], [14, 209, 7, 14, 38, 33], [28, 209, 7, 14, 38, 33], [21, 209, 7, 14, 38, 33], [456, 207, 9, 14, 35, 36], [465, 207, 9, 14, 35, 36], [32, 115, 17, 24, 36, 21], [467, 60, 17, 24, 36, 21], [133, 210, 9, 13, 39, 32], [401, 209, 9, 13, 39, 32], [297, 155, 12, 18, 36, 28], [285, 155, 12, 18, 36, 28], [319, 154, 16, 18, 29, 34], [269, 154, 16, 18, 29, 34], [396, 194, 8, 15, 36, 31], [372, 194, 8, 15, 36, 31], [64, 115, 15, 24, 47, 41], [94, 115, 15, 24, 47, 41], [304, 131, 15, 24, 47, 41], [289, 131, 15, 24, 47, 41], [49, 115, 15, 24, 47, 41], [79, 115, 15, 24, 47, 41], [89, 160, 13, 16, 47, 41], [251, 190, 13, 16, 47, 41], [238, 190, 13, 16, 47, 41], [319, 189, 13, 16, 47, 41], [225, 180, 13, 16, 47, 41], [212, 180, 13, 16, 47, 41], [437, 192, 13, 15, 46, 42], [450, 192, 13, 15, 46, 42], [451, 88, 15, 22, 46, 41], [66, 139, 15, 22, 46, 41], [268, 106, 21, 26, 46, 41], [491, 84, 21, 26, 46, 41], [425, 114, 16, 25, 46, 41], [409, 114, 16, 25, 46, 41], [19, 223, 5, 6, 34, 33], [285, 138, 4, 6, 27, 33], [83, 187, 6, 6, 34, 33], [293, 220, 5, 6, 26, 33], [484, 60, 2, 3, 35, 35], [511, 35, 1, 3, 29, 35], [173, 228, 5, 5, 34, 34], [285, 150, 4, 5, 27, 34], [192, 223, 6, 5, 34, 34], [178, 228, 5, 5, 26, 34], [484, 60, 2, 3, 35, 35], [511, 35, 1, 3, 29, 35], [124, 230, 5, 4, 34, 35], [508, 54, 4, 4, 27, 35], [418, 229, 6, 4, 34, 35], [109, 230, 5, 4, 26, 35], [484, 63, 2, 2, 35, 36], [511, 38, 1, 2, 29, 36], [403, 230, 5, 3, 34, 36], [437, 162, 4, 3, 27, 36], [238, 187, 6, 3, 34, 36], [417, 57, 5, 3, 26, 36], [484, 65, 2, 1, 35, 37], [511, 40, 1, 1, 29, 37], [31, 231, 5, 2, 34, 37], [437, 167, 4, 2, 27, 37], [506, 205, 6, 2, 34, 37], [505, 230, 5, 2, 26, 37], [413, 230, 5, 2, 34, 37], [437, 165, 4, 2, 27, 37], [499, 230, 6, 2, 34, 37], [115, 208, 5, 2, 26, 37], [148, 229, 5, 4, 29, 38], [511, 40, 1, 1, 33, 41], [183, 228, 5, 5, 29, 38], [511, 40, 1, 1, 32, 42], [437, 158, 4, 4, 29, 38], [511, 40, 1, 1, 32, 42], [0, 229, 5, 5, 29, 38], [511, 40, 1, 1, 32, 42], [510, 65, 2, 1, 31, 42], [148, 229, 5, 4, 29, 38], [511, 40, 1, 1, 33, 41], [371, 156, 3, 2, 31, 41], [148, 229, 5, 4, 29, 38], [511, 40, 1, 1, 33, 41], [114, 230, 5, 4, 29, 38], [511, 40, 1, 1, 33, 42], [0, 223, 12, 6, 27, 33], [12, 223, 7, 6, 29, 33], [353, 230, 11, 3, 27, 39], [374, 131, 11, 8, 27, 34], [511, 40, 1, 1, 36, 40], [511, 40, 1, 1, 27, 40], [397, 106, 6, 8, 29, 25], [29, 223, 5, 6, 30, 27], [401, 222, 9, 8, 38, 47], [429, 177, 8, 17, 31, 54], [109, 176, 12, 17, 41, 54], [89, 176, 20, 17, 30, 41], [341, 190, 15, 15, 26, 30], [103, 139, 6, 10, 39, 27], [238, 180, 6, 7, 26, 27], [109, 223, 39, 7, 22, 66], [35, 222, 41, 9, 21, 65], [426, 228, 5, 5, 0, 0], [188, 228, 5, 5, 0, 0], [114, 158, 8, 18, 31, 53], [81, 160, 8, 18, 33, 53], [432, 139, 9, 19, 34, 52], [29, 178, 9, 17, 34, 51], [332, 189, 9, 16, 34, 51], [93, 193, 9, 15, 34, 51], [404, 194, 8, 15, 34, 52], [483, 207, 9, 14, 33, 53], [107, 208, 8, 14, 33, 53], [166, 210, 8, 13, 32, 53], [344, 219, 9, 12, 30, 52], [289, 206, 10, 14, 29, 50], [463, 192, 11, 15, 28, 50], [335, 154, 13, 18, 26, 51], [453, 157, 12, 18, 27, 52], [427, 159, 10, 18, 29, 53], [321, 205, 17, 14, 41, 51], [66, 161, 14, 17, 41, 51], [441, 157, 12, 18, 41, 50], [417, 159, 10, 18, 41, 49], [309, 155, 10, 18, 41, 49], [407, 159, 10, 18, 41, 49], [259, 154, 10, 19, 41, 50], [441, 114, 10, 20, 41, 51], [361, 153, 10, 20, 41, 51], [350, 153, 11, 20, 41, 51], [109, 137, 12, 21, 41, 50], [403, 39, 14, 21, 41, 49], [418, 139, 14, 20, 41, 49], [244, 154, 15, 19, 41, 49], [300, 190, 17, 15, 41, 50], [338, 205, 17, 14, 41, 51], [141, 230, 7, 3, 31, 68], [141, 230, 7, 3, 31, 68], [373, 230, 8, 3, 33, 68], [153, 228, 7, 5, 36, 66], [508, 42, 4, 6, 39, 62], [285, 144, 3, 6, 40, 61], [285, 144, 3, 6, 40, 60], [508, 35, 3, 7, 39, 60], [508, 35, 3, 7, 39, 60], [24, 223, 5, 6, 36, 61], [508, 28, 4, 7, 36, 59], [167, 228, 6, 5, 31, 59], [19, 229, 6, 4, 30, 60], [356, 190, 6, 4, 29, 61], [389, 230, 7, 3, 26, 66], [396, 230, 7, 3, 27, 67], [141, 230, 7, 3, 29, 68], [373, 230, 8, 3, 45, 68], [285, 132, 4, 6, 54, 59], [508, 14, 4, 7, 51, 61], [426, 222, 7, 6, 46, 62], [25, 229, 6, 4, 45, 63], [13, 229, 6, 4, 44, 63], [160, 228, 7, 5, 43, 62], [5, 229, 8, 4, 42, 65], [499, 132, 8, 3, 42, 68], [499, 132, 8, 3, 42, 68], [499, 132, 8, 3, 43, 68], [363, 173, 8, 4, 45, 67], [293, 226, 6, 5, 48, 65], [508, 21, 4, 7, 51, 62], [508, 7, 4, 7, 52, 61], [508, 0, 4, 7, 54, 58], [508, 48, 4, 6, 54, 59], [420, 208, 8, 14, 31, 57], [75, 195, 8, 14, 31, 57], [364, 194, 8, 15, 31, 56], [356, 194, 8, 15, 31, 56], [380, 194, 8, 15, 33, 56], [388, 194, 8, 15, 33, 56], [282, 190, 9, 16, 34, 55], [291, 190, 9, 16, 34, 55], [474, 207, 9, 14, 34, 54], [447, 207, 9, 14, 34, 54], [124, 210, 9, 13, 34, 54], [115, 210, 9, 13, 34, 54], [226, 220, 9, 12, 34, 54], [335, 219, 9, 12, 34, 54], [75, 209, 8, 13, 34, 54], [190, 210, 8, 13, 34, 54], [244, 220, 9, 12, 33, 55], [235, 220, 9, 12, 33, 55], [253, 220, 8, 12, 33, 55], [435, 221, 8, 12, 33, 55], [261, 220, 8, 12, 32, 54], [269, 220, 8, 12, 32, 54], [482, 221, 8, 11, 30, 53], [474, 221, 8, 11, 30, 53], [285, 220, 8, 12, 29, 52], [277, 220, 8, 12, 29, 52], [317, 219, 9, 12, 28, 53], [308, 219, 9, 12, 28, 53], [485, 192, 11, 15, 26, 54], [474, 192, 11, 15, 26, 54], [496, 192, 10, 15, 27, 55], [83, 193, 10, 15, 27, 55], [102, 193, 9, 15, 29, 56], [111, 193, 9, 15, 29, 56], [398, 177, 11, 17, 42, 54], [387, 177, 11, 17, 42, 54], [212, 210, 14, 12, 44, 53], [198, 210, 14, 12, 44, 53], [267, 206, 12, 14, 43, 54], [255, 206, 12, 14, 43, 54], [279, 206, 10, 14, 43, 54], [437, 207, 10, 14, 43, 54], [412, 208, 8, 14, 43, 53], [99, 208, 8, 14, 43, 53], [91, 208, 8, 14, 43, 53], [83, 208, 8, 14, 43, 53], [500, 207, 8, 14, 43, 53], [492, 207, 8, 14, 43, 53], [273, 190, 9, 16, 42, 53], [264, 190, 9, 16, 42, 53], [38, 178, 9, 17, 42, 54], [310, 173, 9, 17, 42, 54], [503, 175, 9, 17, 42, 54], [20, 178, 9, 17, 42, 54], [409, 177, 10, 17, 42, 54], [10, 178, 10, 17, 42, 54], [487, 157, 11, 18, 42, 53], [476, 157, 11, 18, 42, 53], [396, 159, 11, 18, 44, 52], [465, 157, 11, 18, 44, 52], [498, 157, 11, 18, 44, 51], [103, 158, 11, 18, 44, 51], [363, 177, 12, 17, 44, 51], [375, 177, 12, 17, 44, 51], [241, 206, 14, 14, 44, 51], [227, 206, 14, 14, 44, 51], [387, 209, 14, 13, 44, 52], [373, 209, 14, 13, 44, 52], [441, 134, 10, 1, 27, 38], [129, 230, 12, 3, 26, 37], [213, 230, 12, 3, 26, 37], [269, 172, 7, 1, 28, 38], [364, 230, 9, 3, 27, 37], [484, 65, 2, 1, 43, 31], [510, 62, 2, 3, 43, 30], [484, 63, 2, 2, 43, 30], [510, 58, 2, 4, 43, 30], [193, 228, 5, 5, 41, 31], [268, 132, 17, 22, 38, 19], [435, 60, 32, 28, 25, 16], [403, 60, 32, 28, 25, 16], [422, 32, 32, 28, 25, 16], [454, 32, 32, 28, 25, 16], [244, 106, 24, 26, 31, 11], [427, 88, 24, 26, 31, 11], [403, 88, 24, 26, 31, 11], [486, 58, 24, 26, 31, 11], [467, 84, 24, 26, 31, 11], [183, 223, 9, 5, 30, 45], [174, 223, 9, 5, 30, 45], [47, 178, 9, 17, 30, 44], [56, 178, 9, 17, 30, 44], [65, 178, 9, 17, 30, 44], [74, 178, 9, 17, 30, 44], [158, 210, 8, 13, 31, 45], [174, 210, 8, 13, 31, 45], [182, 210, 8, 13, 31, 45], [142, 210, 8, 13, 31, 45], [150, 210, 8, 13, 31, 45], [371, 153, 3, 3, 30, 44], [289, 106, 47, 25, 48, 151], [403, 0, 19, 39, 63, 122], [0, 0, 122, 115, 17, 9], [121, 180, 47, 16, 48, 161], [122, 106, 122, 74, 14, 122], [198, 222, 8, 9, 0, 0], [381, 230, 8, 3, 0, 7], [122, 0, 281, 106, 0, 0], [396, 139, 22, 20, 0, 0], [35, 209, 22, 13, 0, 9], [319, 131, 31, 23, 0, 0], [443, 221, 31, 11, 0, 14], [336, 106, 25, 25, 1, 1], [153, 223, 21, 5, 3, 22], [422, 0, 32, 32, 0, 0], [454, 0, 32, 32, 0, 0], [0, 115, 32, 24, 0, 0], [410, 222, 8, 8, 0, 1], [408, 230, 5, 3, 0, 0], [119, 230, 5, 4, 0, 0], [511, 41, 1, 1, 0, 0], [206, 222, 7, 9, 0, 0], [99, 222, 10, 9, 0, 0], [418, 222, 8, 7, 0, 1], [511, 40, 1, 1, 0, 0], [227, 196, 11, 10, 0, 1], [490, 221, 9, 10, 1, 2], [227, 196, 11, 10, 0, 1], [88, 222, 11, 9, 0, 1]].map(p);
    return e.ponyFrontManes = [null, [[o(1, 2)], [, o(3, 4), o(5, 6), o(7, 8)], [o(9, 10), o(11, 12)], [, o(13, 14), o(15, 16)], [o(17, 18), o(19, 20)], [, , o(21, 22), o(23, 24)]], [[o(25, 26)], [, o(27, 28), o(29, 30), o(31, 32)], [o(33, 34), o(35, 36)], [, o(37, 38), o(39, 40)], [o(41, 42), o(43, 44)], [, , o(45, 46), o(47, 48)]], [[o(49, 50)], [o(51, 52), , , o(53, 54), o(55, 56)]], [[o(57, 58)], [, , , o(59, 60), o(61, 62)]], [], [[o(63, 64)], [, , , o(65, 66), o(67, 68)]], [], [[o(69, 70)], [, , , o(71, 72), o(73, 74)]], []],
        e.ponyTopManes = [null, [[o(75, 76)], [o(77, 78), o(79, 80), o(81, 82), o(83, 84)], [o(85, 86), o(87, 88)], [o(89, 90), o(91, 92), o(93, 94)], [o(95, 96), o(97, 98)], [o(99, 100), o(101, 102), o(103, 104), o(105, 106)]], [[o(107, 108)], [o(109, 110), o(111, 112), o(113, 114), o(115, 116)], [o(117, 118), o(119, 120)], [o(121, 122), o(123, 124), o(125, 126)], [o(127, 128), o(129, 130)], [o(131, 132), o(133, 134), o(135, 136), o(137, 138)]], [[o(139, 140)], [o(141, 142), o(143, 144), o(145, 146), o(147, 148), o(149, 150)]], [[o(151, 152)], [o(153, 154), o(155, 156), o(157, 158), o(159, 160), o(161, 162)]], [[o(163, 164)], [o(165, 166), o(167, 168), o(169, 170), o(171, 172)]], [[o(173, 174)], [o(175, 176), o(177, 178), o(179, 180), o(181, 182), o(183, 184)]], [[o(185, 186)], [o(187, 188), o(189, 190), o(191, 192), o(193, 194)]], [[o(195, 196)], [o(197, 198), o(199, 200), o(201, 202), o(203, 204), o(205, 206)]], [[o(207, 208)], [o(209, 210), o(211, 212), o(213, 214)]]],
        e.ponyBehindManes = [null, [[o(215, 216)], [, o(217, 218), o(219, 220), , o(221, 222)], [o(223, 224), o(225, 226)], [o(227, 228), o(229, 230), , o(231, 232)], [o(233, 234), o(235, 236)], [o(237, 238), o(239, 240), , , o(241, 242)]], [], [[o(243, 244)], [, , o(245, 246), , , o(247, 248)]], [], [], [], [], [], [[o(249, 250)], [, o(251, 252), o(253, 254), o(255, 256), o(257, 258), o(259, 260)]]],
        e.ponyManes = [null, [[o(261, 262)], [o(263, 264), o(265, 266), o(267, 268), o(269, 270), o(271, 272)], [o(273, 274), o(275, 276)], [o(277, 278), o(279, 280), o(281, 282), o(283, 284)], [o(285, 286), o(287, 288)], [o(289, 290), o(291, 292), o(293, 294), o(295, 296), o(297, 298)]], [[o(299, 300)], [o(301, 302), o(303, 304), o(305, 306), o(307, 308)], [o(309, 310), o(311, 312)], [o(313, 314), o(315, 316), o(317, 318)], [o(319, 320), o(321, 322)], [o(323, 324), o(325, 326), o(327, 328), o(329, 330)]], [[o(331, 332)], [o(333, 334), o(335, 336), o(337, 338), o(339, 340), o(341, 342), o(343, 344)]], [[o(345, 346)], [o(347, 348), o(349, 350), o(351, 352), o(353, 354), o(355, 356)]], [[o(357, 358)], [o(359, 360), o(361, 362), o(363, 364), o(365, 366)]], [[o(367, 368)], [o(369, 370), o(371, 372), o(373, 374), o(375, 376), o(377, 378)]], [[o(379, 380)], [o(381, 382), o(383, 384), o(385, 386), o(387, 388)]], [[o(389, 390)], [o(391, 392), o(393, 394), o(395, 396), o(397, 398), o(399, 400)]], [[o(401, 402)], [o(403, 404), o(405, 406), o(407, 408), o(409, 410), o(411, 412), o(413, 414)]]],
        e.ponyBackFrontManes = [null, [[o(415, 416)], [o(417, 418), o(419, 420), o(421, 422)], [o(423, 424), o(425, 426)], [o(427, 428), o(429, 430)], [o(431, 432), o(433, 434)], [o(435, 436), o(437, 438)]], [], [[o(439, 440)], [o(441, 442), o(443, 444), o(445, 446), o(447, 448)]], [], [], [], []],
        e.ponyBackBehindManes = [null, [], [[o(449, 450), o(451, 452)], [o(453, 454), o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]], [], [[o(465, 466), o(467, 468)], [o(469, 470), o(471, 472), o(473, 474), o(475, 476), o(477, 478)]], [[o(479, 480)], [o(481, 482), o(483, 484)]], [[o(485, 486)], [o(487, 488), o(489, 490), o(491, 492), o(493, 494)]], [[o(495, 496)], [o(497, 498), o(499, 500), o(501, 502), o(503, 504)]]],
        e.ponyBackManes = [null, [[o(415, 416)], [o(417, 418), o(419, 420), o(421, 422)], [o(423, 424), o(425, 426)], [o(427, 428), o(429, 430)], [o(431, 432), o(433, 434)], [o(435, 436), o(437, 438)]], [[o(449, 450), o(451, 452)], [o(453, 454), o(455, 456), o(457, 458), o(459, 460), o(461, 462), o(463, 464)]], [[o(439, 440)], [o(441, 442), o(443, 444), o(445, 446), o(447, 448)]], [[o(465, 466), o(467, 468)], [o(469, 470), o(471, 472), o(473, 474), o(475, 476), o(477, 478)]], [[o(479, 480)], [o(481, 482), o(483, 484)]], [[o(485, 486)], [o(487, 488), o(489, 490), o(491, 492), o(493, 494)]], [[o(495, 496)], [o(497, 498), o(499, 500), o(501, 502), o(503, 504)]]],
        e.ponyTails = [null, [[o(505, 506)], [o(507, 508), o(509, 510), o(511, 512), o(513, 514)], [o(515, 516), o(517, 518)], [o(519, 520), o(521, 522)], [o(523, 524), o(525, 526)], [o(527, 528), o(529, 530)]], [[o(531, 532)], [o(533, 534), o(535, 536), o(537, 538), o(539, 540)], [o(541, 542), o(543, 544)], [o(545, 546), o(547, 548)], [o(549, 550), o(551, 552)], [o(553, 554), o(555, 556)]], [[o(557, 558)], [o(559, 560), o(561, 562), o(563, 564), o(565, 566), o(567, 568)]], [[o(569, 570)], [o(571, 572), o(573, 574), o(575, 576), o(577, 578), o(579, 580)]], [[o(581, 582)], [o(583, 584), o(585, 586), o(587, 588), o(589, 590)]], [[o(591, 592)], [o(593, 594), o(595, 596), o(597, 598), o(599, 600), o(601, 602)]]],
        e.ponyEyeLeft = [null, c(603, 605, 607, 609), c(611, 613, 615, 617), c(619, 621, 623, 625), c(627, 629, 631, 633), c(635, 637, 639, 641), c(643, 645, 647, 649)],
        e.ponyEyeRight = [null, c(604, 606, 608, 610), c(612, 614, 616, 618), c(620, 622, 624, 626), c(628, 630, 632, 634), c(636, 638, 640, 642), c(644, 646, 648, 650)],
        e.ponyNoses = [l(651, 652, 653), l(654, 655, 656), l(657, 658, 659), l(660, 661, 662), l(663, 664, 665), l(666, 667, 668), l(669, 670, 671)],
        e.ponyFreckles = [null, S[674], S[675], S[676], S[677]],
        e.ponyHorns = [null, [[o(678, 679)]], [[o(680, 681)]]],
        e.ponyWings = [null, [[o(682, 683)]]],
        e.ponyLegFrontStand = [o(684, 685)],
        e.ponyLegBackStand = [o(686, 687)],
        e.ponyLegFrontTrot = [o(698, 699), o(700, 701), o(702, 703), o(704, 705), o(706, 707), o(708, 709), o(710, 711), o(712, 713), o(714, 715), o(716, 717), o(718, 719), o(720, 721), o(722, 723), o(724, 725), o(726, 727), o(728, 729)],
        e.ponyLegBackTrot = [o(730, 731), o(732, 733), o(734, 735), o(736, 737), o(738, 739), o(740, 741), o(742, 743), o(744, 745), o(746, 747), o(748, 749), o(750, 751), o(752, 753), o(754, 755), o(756, 757), o(758, 759), o(760, 761)],
        e.ponyBobsBodyTrot = [i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 1), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
        e.ponyBobsHeadTrot = [i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0), i(0, 0), i(0, 0), i(0, -1), i(0, -2), i(0, -2), i(0, -2), i(0, -1), i(0, 0)],
        e.ponyFetlocksFrontStand = [o(762, 763)],
        e.ponyFetlocksFrontTrot = [o(764, 765), o(766, 767), o(768, 769), o(770, 771), o(772, 773), o(774, 775), o(776, 777), o(778, 779), o(780, 781), o(782, 783), o(784, 785), o(786, 787), o(788, 789), o(790, 791), o(792, 793), o(794, 795)],
        e.ponyFetlocksBackStand = [o(796, 797)],
        e.ponyFetlocksBackTrot = [o(798, 799), o(800, 801), o(802, 803), o(804, 805), o(806, 807), o(808, 809), o(810, 811), o(812, 813), o(814, 815), o(816, 817), o(818, 819), o(820, 821), o(822, 823), o(824, 825), o(826, 827), o(828, 829)],
        e.ponyFrontLegAccessoriesStand = [[null, [[o(830, 831)], [o(832, 833), o(834, 835), o(836, 837), o(838, 839), o(840, 841), o(842, 843)]]]],
        e.ponyFrontLegAccessoriesTrot = [[null, [[o(844, 845)], [o(846, 847), o(848, 849), o(850, 851), o(852, 853), o(854, 855), o(856, 857)]]], [null, [[o(858, 859)], [o(860, 861), o(862, 863), o(864, 865), o(866, 867), o(868, 869), o(870, 871)]]], [null, [[o(872, 873)], [o(874, 875), o(876, 877), o(878, 879), o(880, 881), o(882, 883), o(884, 885)]]], [null, [[o(886, 887)], [o(888, 889), o(890, 891), o(892, 893), o(894, 895), o(896, 897), o(898, 899)]]], [null, [[o(900, 901)], [o(902, 903), o(904, 905), o(906, 907), o(908, 909), o(910, 911), o(912, 913)]]], [null, [[o(914, 915)], [o(916, 917), o(918, 919), o(920, 921), o(922, 923), o(924, 925), o(926, 927)]]], [null, [[o(928, 929)], [o(930, 931), o(932, 933), o(934, 935), o(936, 937), o(938, 939), o(940, 941)]]], [null, [[o(942, 943)], [o(944, 945), o(946, 947), o(948, 949), o(950, 951), o(952, 953), o(954, 955)]]], [null, [[o(956, 957)], [o(958, 959), o(960, 961), o(962, 963), o(964, 965), o(966, 967), o(968, 969)]]], [null, [[o(970, 971)], [o(972, 973), o(974, 975), o(976, 977), o(978, 979), o(980, 981), o(982, 983)]]], [null, [[o(984, 985)], [o(986, 987), o(988, 989), o(990, 991), o(992, 993), o(994, 995), o(996, 997)]]], [null, [[o(998, 999)], [o(1e3, 1001), o(1002, 1003), o(1004, 1005), o(1006, 1007), o(1008, 1009), o(1010, 1011)]]], [null, [[o(1012, 1013)], [o(1014, 1015), o(1016, 1017), o(1018, 1019), o(1020, 1021), o(1022, 1023), o(1024, 1025)]]], [null, [[o(1026, 1027)], [o(1028, 1029), o(1030, 1031), o(1032, 1033), o(1034, 1035), o(1036, 1037), o(1038, 1039)]]], [null, [[o(1040, 1041)], [o(1042, 1043), o(1044, 1045), o(1046, 1047), o(1048, 1049), o(1050, 1051), o(1052, 1053)]]], [null, [[o(1054, 1055)], [o(1056, 1057), o(1058, 1059), o(1060, 1061), o(1062, 1063), o(1064, 1065), o(1066, 1067)]]]],
        e.ponyBackLegAccessoriesStand = [[null, [[o(1068, 1069)], [o(1070, 1071), o(1072, 1073), o(1074, 1075), o(1076, 1077), o(1078, 1079), o(1080, 1081)]]]],
        e.ponyBackLegAccessoriesTrot = [[null, [[o(1082, 1083)], [o(1084, 1085), o(1086, 1087), o(1088, 1089), o(1090, 1091), o(1092, 1093), o(1094, 1095)]]], [null, [[o(1096, 1097)], [o(1098, 1099), o(1100, 1101), o(1102, 1103), o(1104, 1105), o(1106, 1107), o(1108, 1109)]]], [null, [[o(1110, 1111)], [o(1112, 1113), o(1114, 1115), o(1116, 1117), o(1118, 1119), o(1120, 1121), o(1122, 1123)]]], [null, [[o(1124, 1125)], [o(1126, 1127), o(1128, 1129), o(1130, 1131), o(1132, 1133), o(1134, 1135), o(1136, 1137)]]], [null, [[o(1138, 1139)], [o(1140, 1141), o(1142, 1143), o(1144, 1145), o(1146, 1147), o(1148, 1149), o(1150, 1151)]]], [null, [[o(1152, 1153)], [o(1154, 1155), o(1156, 1157), o(1158, 1159), o(1160, 1161), o(1162, 1163), o(1164, 1165)]]], [null, [[o(1166, 1167)], [o(1168, 1169), o(1170, 1171), o(1172, 1173), o(1174, 1175), o(1176, 1177), o(1178, 1179)]]], [null, [[o(1180, 1181)], [o(1182, 1183), o(1184, 1185), o(1186, 1187), o(1188, 1189), o(1190, 1191), o(1192, 1193)]]], [null, [[o(1194, 1195)], [o(1196, 1197), o(1198, 1199), o(1200, 1201), o(1202, 1203), o(1204, 1205), o(1206, 1207)]]], [null, [[o(1208, 1209)], [o(1210, 1211), o(1212, 1213), o(1214, 1215), o(1216, 1217), o(1218, 1219), o(1220, 1221)]]], [null, [[o(1222, 1223)], [o(1224, 1225), o(1226, 1227), o(1228, 1229), o(1230, 1231), o(1232, 1233), o(1234, 1235)]]], [null, [[o(1236, 1237)], [o(1238, 1239), o(1240, 1241), o(1242, 1243), o(1244, 1245), o(1246, 1247), o(1248, 1249)]]], [null, [[o(1250, 1251)], [o(1252, 1253), o(1254, 1255), o(1256, 1257), o(1258, 1259), o(1260, 1261), o(1262, 1263)]]], [null, [[o(1264, 1265)], [o(1266, 1267), o(1268, 1269), o(1270, 1271), o(1272, 1273), o(1274, 1275), o(1276, 1277)]]], [null, [[o(1278, 1279)], [o(1280, 1281), o(1282, 1283), o(1284, 1285), o(1286, 1287), o(1288, 1289), o(1290, 1291)]]], [null, [[o(1292, 1293)], [o(1294, 1295), o(1296, 1297), o(1298, 1299), o(1300, 1301), o(1302, 1303), o(1304, 1305)]]]],
        e.ponyFaceAccessories = [null, [[a(1307, 1308, 1306)]], [[o(1309, 1310)]], [[a(1312, 1313, 1311)]]],
        e.ponyEarAccessories = [null, [[o(1314, 1315)]], [[o(1316, 1317)]], [[o(1318, 1319)]], [[o(1320, 1321)]], [[o(1322, 1323), o(1324, 1325)]]],
        e.ponyHeadAccessories = [null, [[o(1326, 1327)]], [[o(1328, 1329)], [o(1330, 1331), o(1332, 1333), o(1334, 1335), o(1336, 1337)], [o(1338, 1339), o(1340, 1341), o(1342, 1343), o(1344, 1345)], [o(1346, 1347), o(1348, 1349), o(1350, 1351), o(1352, 1353)]], [[o(1354, 1355)], [o(1356, 1357), o(1358, 1359)], [o(1360, 1361), o(1362, 1363), o(1364, 1365)], [o(1366, 1367), o(1368, 1369), o(1370, 1371), o(1372, 1373)], [o(1374, 1375), o(1376, 1377), o(1378, 1379)]]],
        e.ponyNeckAccessories = [null, [[o(1380, 1381)], [o(1382, 1383), o(1384, 1385)]], [[o(1386, 1387)], [o(1388, 1389), o(1390, 1391)], [o(1392, 1393), o(1394, 1395), o(1396, 1397), o(1398, 1399)], [o(1400, 1401), o(1402, 1403)]], [[o(1404, 1405)], [o(1406, 1407), o(1408, 1409)], [o(1410, 1411), o(1412, 1413), o(1414, 1415)], [o(1416, 1417), o(1418, 1419), o(1420, 1421), o(1422, 1423), o(1424, 1425), o(1426, 1427)], [o(1428, 1429), o(1430, 1431), o(1432, 1433)]]],
        e.ponyFacialHair = [null, [[o(1434, 1435)]]],
        e.butterfly = [S[1724], S[1725], S[1726], S[1727]],
        e.ponyEyeshadow = S[672],
        e.ponyEyeshadowShine = S[673],
        e.ponyBody = o(688, 689),
        e.ponyHead = o(690, 691),
        e.ponyEar = o(692, 693),
        e.ponyEar2 = o(694, 695),
        e.ponyShadow = S[696],
        e.ponySelection = S[697],
        e.tree = f(1436, 1437, 1438, 1439, 1440),
        e.apple = s(1441, 1442),
        e.cloud = u(1443),
        e.pumpkin = s(1444, 1445),
        e.rock = s(1446, 1447),
        e.sign = s(1448, 1449),
        e.bubble = S[1714],
        e.bubble2 = S[1715],
        e.grass = S[1716],
        e.heartemote = S[1717],
        e.nipple = S[1718],
        e.nipple2 = S[1719],
        e.pixel = S[1720],
        e.pizzaemote = S[1721],
        e.pumpkinemote = S[1722],
        e.rockemote = S[1723],
        e.ponFrontManes = [null, [h(1), h(2), h(3), h(4), h(5), h(6)], [h(7), h(8), h(9), h(10), h(11), h(12)], [h(13), h(14)], [h(15), h(16)], [], [h(17), h(18)], [], [h(19), h(20)], []],
        e.ponTopManes = [null, [h(21), h(22), h(23), h(24), h(25), h(26)], [h(27), h(28), h(29), h(30), h(31), h(32)], [h(33), h(34)], [h(35), h(36)], [h(37), h(38)], [h(39), h(40)], [h(41), h(42)], [h(43), h(44)], [h(45), h(46)]],
        e.ponBehindManes = [null, [h(47), h(48), h(49), h(50), h(51), h(52)], [], [h(53), h(54)], [], [], [], [], [], [h(55), h(56)]],
        e.ponManes = [null, [h(57), h(58), h(59), h(60), h(61), h(62)], [h(63), h(64), h(65), h(66), h(67), h(68)], [h(69), h(70)], [h(71), h(72)], [h(73), h(74)], [h(75), h(76)], [h(77), h(78)], [h(79), h(80)], [h(81), h(82)]],
        e.ponBackFrontManes = [null, [h(83), h(84), h(85), h(86), h(87), h(88)], [], [h(89), h(90)], [], [], [], []],
        e.ponBackBehindManes = [null, [], [h(91), h(92)], [], [h(93), h(94)], [h(95), h(96)], [h(97), h(98)], [h(99), h(100)]],
        e.ponBackManes = [null, [h(83), h(84), h(85), h(86), h(87), h(88)], [h(91), h(92)], [h(89), h(90)], [h(93), h(94)], [h(95), h(96)], [h(97), h(98)], [h(99), h(100)]],
        e.ponTails = [null, [h(101), h(102), h(103), h(104), h(105), h(106)], [h(107), h(108), h(109), h(110), h(111), h(112)], [h(113), h(114)], [h(115), h(116)], [h(117), h(118)], [h(119), h(120)]],
        e.ponEyeLeft = [null, b(121, 123, 125), b(127, 129, 131), b(133, 135, 137), b(139, 141, 143), b(145, 147, 0), b(149, 151, 0)],
        e.ponEyeRight = [null, b(122, 124, 126), b(128, 130, 132), b(134, 136, 138), b(140, 142, 144), b(146, 148, 0), b(150, 152, 0)],
        e.ponNoses = [y(0, 153, 154), y(0, 155, 156), y(0, 157, 158), y(0, 159, 160), y(161, 162, 163), y(164, 165, 166), y(0, 167, 168)],
        e.ponFreckles = [null, T[171], T[172], T[173], T[174]],
        e.ponHorns = [null, [h(175)], [h(176)]],
        e.ponWings = [null, [h(177)]],
        e.ponLegFrontStand = [T[178]],
        e.ponLegBackStand = [T[179]],
        e.ponLegFrontTrot = [T[188], T[189], T[190], T[191], T[192], T[193], T[194], T[195], T[196], T[197], T[198], T[199], T[200], T[201], T[202], T[203]],
        e.ponLegBackTrot = [T[204], T[205], T[206], T[207], T[208], T[209], T[210], T[211], T[212], T[213], T[214], T[215], T[216], T[217], T[218], T[219]],
        e.ponFetlocksFrontStand = [T[220]],
        e.ponFetlocksFrontTrot = [T[221], T[222], T[223], T[224], T[225], T[226], T[227], T[228], T[229], T[230], T[231], T[232], T[233], T[234], T[235], T[236]],
        e.ponFetlocksBackStand = [T[237]],
        e.ponFetlocksBackTrot = [T[238], T[239], T[240], T[241], T[242], T[243], T[244], T[245], T[246], T[247], T[248], T[249], T[250], T[251], T[252], T[253]],
        e.ponFrontLegAccessoriesStand = [[null, [h(254), h(255)]]],
        e.ponFrontLegAccessoriesTrot = [[null, [h(256), h(257)]], [null, [h(258), h(259)]], [null, [h(260), h(261)]], [null, [h(262), h(263)]], [null, [h(264), h(265)]], [null, [h(266), h(267)]], [null, [h(268), h(269)]], [null, [h(270), h(271)]], [null, [h(272), h(273)]], [null, [h(274), h(275)]], [null, [h(276), h(277)]], [null, [h(278), h(279)]], [null, [h(280), h(281)]], [null, [h(282), h(283)]], [null, [h(284), h(285)]], [null, [h(286), h(287)]]],
        e.ponBackLegAccessoriesStand = [[null, [h(288), h(289)]]],
        e.ponBackLegAccessoriesTrot = [[null, [h(290), h(291)]], [null, [h(292), h(293)]], [null, [h(294), h(295)]], [null, [h(296), h(297)]], [null, [h(298), h(299)]], [null, [h(300), h(301)]], [null, [h(302), h(303)]], [null, [h(304), h(305)]], [null, [h(306), h(307)]], [null, [h(308), h(309)]], [null, [h(310), h(311)]], [null, [h(312), h(313)]], [null, [h(314), h(315)]], [null, [h(316), h(317)]], [null, [h(318), h(319)]], [null, [h(320), h(321)]]],
        e.ponFaceAccessories = [null, [v(323, 322, [0, 4294967153])], [h(324)], [v(326, 325, [0, 4294967153])]],
        e.ponEarAccessories = [null, [h(327)], [h(328)], [h(329)], [h(330)], [h(331)]],
        e.ponHeadAccessories = [null, [h(332)], [h(333), h(334), h(335), h(336)], [h(337), h(338), h(339), h(340), h(341)]],
        e.ponNeckAccessories = [null, [h(342), h(343)], [h(344), h(345), h(346), h(347)], [h(348), h(349), h(350), h(351), h(352)]],
        e.ponFacialHair = [null, [h(353)]],
        e.ponEyeshadow = T[169],
        e.ponEyeshadowShine = T[170],
        e.ponBody = T[180],
        e.ponHead = T[181],
        e.ponEar = T[182],
        e.ponEar2 = T[183],
        e.ponShadow = T[184],
        e.ponSelection = T[185],
        e.ponCM = T[186],
        e.ponCMFlip = T[187],
        e.tree2 = _(354, 355, 356, 357, 358, [0, 1648566271, 1176305919, 2978502143, 3686626303, 2093650687, 2440584959, 1800616447, 3036666623, 3029561599, 2087013887, 1890942719, 1648236543, 1328153087, 542583551, 1553622527, 1066096127, 2328465407, 828261375, 1166170623, 3607295, 745882111, 1099582975]),
        e.apple_2 = g(359, 360, [0, 738592255, 2097348863, 4202988031, 3523608831, 3523806463]),
        e.cloud_2 = m(361),
        e.pumpkin_2 = g(362, 363, [0, 1217814527, 5904127, 2318663935, 4171326463, 4292055551, 4102701567, 3613926399, 3227390719, 2722895103, 4275213823]),
        e.rock_2 = g(364, 365, [0, 2020893439, 3418335487, 2593489919, 2980879103, 1667060479]),
        e.sign_2 = g(366, 367, [0, 2303012607, 3988029695, 2875473919, 3464778495, 572662527, 75]),
        e.bubble_2 = d(368, [0, 4294967295]),
        e.bubble2_2 = d(369, [0, 255, 4294967295]),
        e.grass_2 = d(370, [2093650687, 3036666623, 2464591615, 1890942719]),
        e.heartemote_2 = d(371, [0, 3875537151, 3254780159, 2902458623]),
        e.nipple_2 = d(372, [4294967295, 0]),
        e.nipple2_2 = d(373, [4294967295, 255, 0]),
        e.pixel_2 = d(374, [4294967295]),
        e.pizzaemote_2 = d(375, [2354323967, 0, 4158365183, 3548861951, 3956117759, 3523872255, 2751726079, 3770116607]),
        e.pumpkinemote_2 = d(376, [0, 864834559, 5838335, 2368405759, 4085792767, 3479444991, 4291463167]),
        e.rockemote_2 = d(377, [0, 2020893439, 3418335487, 2593489919, 2980879103]),
        e.rectSprite = T[378],
        e.butterfly2 = w([379, 380, 381, 382], [0, 2151972607, 4068601343]),
        e.tileSheet = x["tiles.png"],
        e.tileSprite = {
          x: 0,
          y: 0,
          w: 32,
          h: 24,
          ox: 0,
          oy: 0
        },
        e.spriteSheets = [{
          src: E,
          sprites: S
        }, {
          src: $,
          sprites: T
        }, {
          src: e.tileSheet,
          sprites: [e.tileSprite]
        }],
        e.font = [[0, 1450], [9786, 1451], [9787, 1452], [9829, 1453], [9830, 1454], [9827, 1455], [9824, 1456], [8226, 1457], [9688, 1458], [9675, 1459], [9689, 1460], [9794, 1461], [9792, 1462], [9834, 1463], [9835, 1464], [9788, 1465], [9658, 1466], [9668, 1467], [8597, 1468], [8252, 1469], [182, 1470], [167, 1471], [9644, 1472], [8616, 1473], [8593, 1474], [8595, 1475], [8594, 1476], [8592, 1477], [8735, 1478], [8596, 1479], [9650, 1480], [9660, 1481], [33, 1482], [34, 1483], [35, 1484], [36, 1485], [37, 1486], [38, 1487], [39, 1488], [40, 1489], [41, 1490], [42, 1491], [43, 1492], [44, 1493], [45, 1494], [46, 1495], [47, 1496], [48, 1497], [49, 1498], [50, 1499], [51, 1500], [52, 1501], [53, 1502], [54, 1503], [55, 1504], [56, 1505], [57, 1506], [58, 1507], [59, 1508], [60, 1509], [61, 1510], [62, 1511], [63, 1512], [64, 1513], [65, 1514], [66, 1515], [67, 1516], [68, 1517], [69, 1518], [70, 1519], [71, 1520], [72, 1521], [73, 1522], [74, 1523], [75, 1524], [76, 1525], [77, 1526], [78, 1527], [79, 1528], [80, 1529], [81, 1530], [82, 1531], [83, 1532], [84, 1533], [85, 1534], [86, 1535], [87, 1536], [88, 1537], [89, 1538], [90, 1539], [91, 1540], [92, 1541], [93, 1542], [94, 1543], [95, 1544], [96, 1545], [97, 1546], [98, 1547], [99, 1548], [100, 1549], [101, 1550], [102, 1551], [103, 1552], [104, 1553], [105, 1554], [106, 1555], [107, 1556], [108, 1557], [109, 1558], [110, 1559], [111, 1560], [112, 1561], [113, 1562], [114, 1563], [115, 1564], [116, 1565], [117, 1566], [118, 1567], [119, 1568], [120, 1569], [121, 1570], [122, 1571], [123, 1572], [124, 1573], [125, 1574], [126, 1575], [8962, 1576], [199, 1577], [252, 1578], [233, 1579], [226, 1580], [228, 1581], [224, 1582], [229, 1583], [231, 1584], [234, 1585], [235, 1586], [232, 1587], [239, 1588], [238, 1589], [236, 1590], [196, 1591], [197, 1592], [201, 1593], [230, 1594], [198, 1595], [244, 1596], [246, 1597], [242, 1598], [251, 1599], [249, 1600], [255, 1601], [214, 1602], [220, 1603], [248, 1604], [163, 1605], [216, 1606], [215, 1607], [402, 1608], [225, 1609], [237, 1610], [243, 1611], [250, 1612], [241, 1613], [209, 1614], [170, 1615], [186, 1616], [191, 1617], [174, 1618], [172, 1619], [189, 1620], [188, 1621], [161, 1622], [171, 1623], [187, 1624], [1040, 1625], [1072, 1626], [1041, 1627], [1073, 1628], [1042, 1629], [1074, 1630], [1043, 1631], [1075, 1632], [1044, 1633], [1076, 1634], [1045, 1635], [1077, 1636], [1025, 1637], [1105, 1638], [1046, 1639], [1078, 1640], [1047, 1641], [1079, 1642], [1048, 1643], [1080, 1644], [1049, 1645], [1081, 1646], [1050, 1647], [1082, 1648], [1051, 1649], [1083, 1650], [1052, 1651], [1084, 1652], [1053, 1653], [1085, 1654], [1054, 1655], [1086, 1656], [1055, 1657], [1087, 1658], [1056, 1659], [1088, 1660], [1057, 1661], [1089, 1662], [1058, 1663], [1090, 1664], [1059, 1665], [1091, 1666], [1060, 1667], [1092, 1668], [1061, 1669], [1093, 1670], [1062, 1671], [1094, 1672], [1063, 1673], [1095, 1674], [1064, 1675], [1096, 1676], [1065, 1677], [1097, 1678], [1066, 1679], [1098, 1680], [1067, 1681], [1099, 1682], [1068, 1683], [1100, 1684], [1069, 1685], [1101, 1686], [1070, 1687], [1102, 1688], [1071, 1689], [1103, 1690], [260, 1691], [261, 1692], [262, 1693], [263, 1694], [280, 1695], [281, 1696], [323, 1697], [324, 1698], [346, 1699], [347, 1700], [377, 1701], [378, 1702], [379, 1703], [380, 1704], [321, 1705], [322, 1706], [211, 1707], [12484, 1708], [362, 1709], [363, 1710], [12471, 1711], [183, 1712], [180, 1713]].map(function (t) {
          return {
            code: t[0],
            sprite: S[t[1]]
          }
        }),
        n.exports
  });
  System.registerDynamic("5c", ["20"], !0, function (t, e, n) {
    "use strict";
    var r = t("20");
    return e.stand = {
      name: "stand",
      frames: 1,
      framesShift: 0,
      headBobs: [{
        x: 0,
        y: 0
      }],
      bodyBobs: [{
        x: 0,
        y: 0
      }],
      frontLegs: r.ponyLegFrontStand,
      backLegs: r.ponyLegBackStand,
      frontHooves: [null, r.ponyFetlocksFrontStand],
      backHooves: [null, r.ponyFetlocksBackStand],
      frontLegAccessory: r.ponyFrontLegAccessoriesStand,
      backLegAccessory: r.ponyBackLegAccessoriesStand,
      frontLegs2: r.ponLegFrontStand,
      backLegs2: r.ponLegBackStand,
      frontHooves2: [null, r.ponFetlocksFrontStand],
      backHooves2: [null, r.ponFetlocksBackStand],
      frontLegAccessory2: r.ponFrontLegAccessoriesStand,
      backLegAccessory2: r.ponBackLegAccessoriesStand
    },
        e.trot = {
          name: "trot",
          frames: 16,
          framesShift: 8,
          headBobs: r.ponyBobsHeadTrot,
          bodyBobs: r.ponyBobsBodyTrot,
          frontLegs: r.ponyLegFrontTrot,
          backLegs: r.ponyLegBackTrot,
          frontHooves: [null, r.ponyFetlocksFrontTrot],
          backHooves: [null, r.ponyFetlocksBackTrot],
          frontLegAccessory: r.ponyFrontLegAccessoriesTrot,
          backLegAccessory: r.ponyBackLegAccessoriesTrot,
          frontLegs2: r.ponLegFrontTrot,
          backLegs2: r.ponLegBackTrot,
          frontHooves2: [null, r.ponFetlocksFrontTrot],
          backHooves2: [null, r.ponFetlocksBackTrot],
          frontLegAccessory2: r.ponFrontLegAccessoriesTrot,
          backLegAccessory2: r.ponBackLegAccessoriesTrot
        },
        e.animations = [e.stand, e.trot],
        n.exports
  });
  System.registerDynamic("43", ["22", "23", "25", "20", "3b", "5c"], !0, function (t, e, n) {
    "use strict";
    function r() {
      return {
        animation: $.stand,
        animationFrame: 0,
        blinkFrame: 1
      }
    }

    function i(t, n, r, i, u, c, p) {
      var h = i - e.PONY_WIDTH / 2
          , d = u - e.PONY_HEIGHT
          , v = r.animation
          , m = r.animationFrame % v.frames
          , g = (r.animationFrame + v.framesShift) % v.frames
          , y = _.at(v.headBobs, m)
          , b = _.at(v.bodyBobs, m)
          , E = h + b.x
          , $ = d + b.y
          , S = h + y.x
          , T = d + y.y;
      p && t.drawSprite(x.ponySelection, null, h, d),
          t.drawSprite(x.ponyShadow, w.SHADOW_COLOR, h, d),
          l(t, x.ponyBackBehindManes, n.backMane, S, T);
      var k = !n.mane || !n.mane.type
          , M = k ? S - 1 : S
          , A = k ? T + 4 : T;
      l(t, x.ponyHeadAccessories, n.headAccessory, M, A);
      var C = h - 3
          , D = d - 1
          , O = v.frontLegs
          , I = v.backLegs
          , R = _.at(v.frontHooves, n.frontHooves && n.frontHooves.type)
          , F = _.at(v.backHooves, n.backHooves && n.backHooves.type)
          , P = v.frontLegAccessory
          , j = v.backLegAccessory;
      o(t, C, D, O, R, P, n.darkFrontLegAccessory, g, n.darkCoatFill, n.darkCoatOutline, n.darkFrontHoovesFill, n.darkFrontHoovesOutline),
          o(t, C, D, I, F, j, n.darkBackLegAccessory, g, n.darkCoatFill, n.darkCoatOutline, n.darkBackHoovesFill, n.darkBackHoovesOutline),
          l(t, x.ponyTails, n.tail, E, $),
          s(t, x.ponyBody, n.coatFill, n.coatOutline, E, $);
      var N = n.frontHooves && n.frontHooves.fills && n.frontHooves.fills[0]
          , L = n.frontHooves && n.frontHooves.outlines && n.frontHooves.outlines[0]
          , U = n.backHooves && n.backHooves.fills && n.backHooves.fills[0]
          , B = n.backHooves && n.backHooves.outlines && n.backHooves.outlines[0];
      o(t, h, d, O, R, P, n.frontLegAccessory, m, n.coatFill, n.coatOutline, N, L),
          o(t, h, d, I, F, j, n.backLegAccessory, m, n.coatFill, n.coatOutline, U, B),
          f(t, n.cm, E + 43, $ + 49, c && n.cmFlip),
          l(t, x.ponyWings, n.wings, E, $),
          l(t, x.ponyNeckAccessories, n.neckAccessory, E, $),
          a(t, n, S, T, r.blinkFrame, c)
    }

    function o(t, e, n, r, i, o, a, u, c, f, p, h) {
      s(t, _.at(r, u), c, f, e, n),
          s(t, _.at(i, u), p, h, e, n),
          l(t, _.at(o, u), a, e, n)
    }

    function a(t, e, n, r, i, o) {
      void 0 === i && (i = 1),
          l(t, x.ponyBehindManes, e.mane, n, r),
          s(t, x.ponyEar2, e.coatFill, e.coatOutline, n, r),
          s(t, x.ponyHead, e.coatFill, e.coatOutline, n, r),
          l(t, x.ponyFacialHair, e.facialHair, n, r);
      var a = _.at(x.ponyNoses, e.muzzle);
      t.drawSprite(a.mouth, w.WHITE, n, r),
          t.drawSprite(a.muzzle, e.coatOutline, n, r),
      e.fangs && t.drawSprite(a.fangs, w.WHITE, n, r);
      var u = 0 | e.freckles;
      o && 3 === u ? u = 4 : o && 4 === u && (u = 3),
          t.drawSprite(_.at(x.ponyFreckles, u), e.frecklesColor, n, r),
      e.eyeshadow && (t.drawSprite(x.ponyEyeshadow, e.eyeshadowColor, n, r),
          t.drawSprite(x.ponyEyeshadowShine, w.SHINES_COLOR, n, r));
      var f = o ? e.eyeColorRight : e.eyeColorLeft
          , p = o ? e.eyeColorLeft : e.eyeColorRight
          , h = o ? e.eyeOpennessRight : e.eyeOpennessLeft
          , d = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
      c(t, _.at(x.ponyEyeLeft, Math.max(i, h)), e, f, n, r),
          c(t, _.at(x.ponyEyeRight, Math.max(i, d)), e, p, n, r),
          l(t, x.ponyBackFrontManes, e.backMane, n, r),
          l(t, x.ponyTopManes, e.mane, n, r),
          l(t, x.ponyHorns, e.horn, n, r),
          s(t, x.ponyEar, e.coatFill, e.coatOutline, n, r),
          l(t, x.ponyFaceAccessories, e.faceAccessory, n, r),
          l(t, x.ponyEarAccessories, e.earAccessory, n, r),
          l(t, x.ponyFrontManes, e.mane, n, r)
    }

    function s(t, e, n, r, i, o) {
      e && e.fill && t.drawSprite(e.fill, n, i, o),
      e && e.outline && t.drawSprite(e.outline, r, i, o),
      e && e.extra && t.drawSprite(e.extra, w.WHITE, i, o)
    }

    function u(t, e, n, r, i, o) {
      e && e.forEach(function (e, a) {
        return s(t, e, _.at(n, a), _.at(r, a), i, o)
      })
    }

    function l(t, e, n, r, i) {
      if (n) {
        var o = _.at(e, n.type);
        o && u(t, _.at(o, n.pattern), n.fills, n.outlines, r, i)
      }
    }

    function c(t, e, n, r, i, o) {
      e && (t.drawSprite(e.fill, n.eyeWhites, i, o),
          t.drawSprite(e.iris, r, i, o),
          t.drawSprite(e.line, w.BLACK, i, o),
      n.eyelashes && t.drawSprite(e.lashes, n.coatOutline, i, o))
    }

    function f(t, e, n, r, i) {
      if (e)
        for (var o = 0; o < b.CM_SIZE; o++)
          for (var a = 0; a < b.CM_SIZE; a++) {
            var s = i ? e[b.CM_SIZE - a - 1 + o * b.CM_SIZE] : e[a + o * b.CM_SIZE];
            s && t.drawRect(s, n + a, r + o, 1, 1)
          }
    }

    function p(t, e, n, r, o, a, s) {
      void 0 === a && (a = !1),
      void 0 === s && (s = !1);
      try {
        i({
          drawSprite: function (e, n, r, i) {
            var o = n ? n.css() : "#ffffff";
            "#ffffff" === o ? E.drawSprite(t, e, r, i) : E.drawColoredSprite(t, e, o, r, i)
          },
          drawRect: function (e, n, r, i, o) {
            t.fillStyle = e ? e.css() : "white",
                t.fillRect(n, r, i, o)
          }
        }, e, n, r, o, a, s)
      } catch (t) {
        console.error(t)
      }
    }

    function h(t, e, n, r, o, a, s) {
      void 0 === a && (a = !1),
      void 0 === s && (s = !1);
      try {
        i(t, e, n, r, o, a, s)
      } catch (t) {
        console.error(t)
      }
    }

    function d(t, n, r, i, o, a, s) {
      void 0 === a && (a = !1),
      void 0 === s && (s = !1);
      var u = i - e.PONY_WIDTH / 2
          , l = o - e.PONY_HEIGHT;
      s && t.drawSprite(x.ponSelection, null, n.defaultPalette, u, l),
          t.drawSprite(x.ponShadow, w.SHADOW_COLOR, n.defaultPalette, u, l);
      var c = r.animation
          , f = r.animationFrame % c.frames
          , p = (r.animationFrame + c.framesShift) % c.frames
          , h = _.at(c.headBobs, f)
          , d = _.at(c.bodyBobs, f)
          , g = u + d.x
          , b = l + d.y
          , E = u + h.x
          , $ = l + h.y;
      y(t, x.ponBackBehindManes, n.backMane, E, $);
      var S = !n.mane || !n.mane.type
          , T = S ? E - 1 : E
          , k = S ? $ + 4 : $;
      y(t, x.ponHeadAccessories, n.headAccessory, T, k);
      var M = u - 3
          , A = l - 1
          , C = c.frontLegs2
          , D = c.backLegs2
          , O = _.at(c.frontHooves2, n.frontHooves && n.frontHooves.type)
          , I = _.at(c.backHooves2, n.backHooves && n.backHooves.type)
          , R = c.frontLegAccessory2
          , F = c.backLegAccessory2;
      v(t, M, A, C, O, R, n.frontLegAccessory, p, n.coatPalette, n.frontHooves.palette, w.FAR_COLOR),
          v(t, M, A, D, I, F, n.backLegAccessory, p, n.coatPalette, n.backHooves.palette, w.FAR_COLOR),
          y(t, x.ponTails, n.tail, g, b),
          t.drawSprite(x.ponBody, null, n.coatPalette, g, b),
          v(t, u, l, C, O, R, n.frontLegAccessory, f, n.coatPalette, n.frontHooves.palette, w.WHITE),
          v(t, u, l, D, I, F, n.backLegAccessory, f, n.coatPalette, n.backHooves.palette, w.WHITE),
          t.drawSprite(a && n.cmFlip ? x.ponCMFlip : x.ponCM, null, n.cmPalette, g + 43, b + 49),
          y(t, x.ponWings, n.wings, g, b),
          y(t, x.ponNeckAccessories, n.neckAccessory, g, b),
          m(t, n, E, $, r.blinkFrame, a)
    }

    function v(t, e, n, r, i, o, a, s, u, l, c) {
      t.drawSprite(_.at(r, s), c, u, e, n),
          t.drawSprite(_.at(i, s), c, l, e, n),
          y(t, _.at(o, s), a, e, n, c)
    }

    function m(t, e, n, r, i, o) {
      void 0 === i && (i = 1),
          y(t, x.ponBehindManes, e.mane, n, r),
          t.drawSprite(x.ponEar2, null, e.coatPalette, n, r),
          t.drawSprite(x.ponHead, null, e.coatPalette, n, r),
          y(t, x.ponFacialHair, e.facialHair, n, r);
      var a = _.at(x.ponNoses, e.muzzle);
      t.drawSprite(a.mouth, null, e.defaultPalette, n, r),
          t.drawSprite(a.muzzle, null, e.coatPalette, n, r),
      e.fangs && t.drawSprite(a.fangs, null, e.defaultPalette, n, r);
      var s = 0 | e.freckles;
      o && 3 === s ? s = 4 : o && 4 === s && (s = 3),
          t.drawSprite(_.at(x.ponFreckles, s), null, e.frecklesColor, n, r),
      e.eyeshadow && (t.drawSprite(x.ponEyeshadow, null, e.eyeshadowColor, n, r),
          t.drawSprite(x.ponEyeshadowShine, w.SHINES_COLOR, e.defaultPalette, n, r));
      var u = o ? e.eyeColorRight : e.eyeColorLeft
          , l = o ? e.eyeColorLeft : e.eyeColorRight
          , c = o ? e.eyeOpennessRight : e.eyeOpennessLeft
          , f = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
      g(t, _.at(x.ponEyeLeft, Math.max(i, c)), e, u, n, r),
          g(t, _.at(x.ponEyeRight, Math.max(i, f)), e, l, n, r),
          y(t, x.ponBackFrontManes, e.backMane, n, r),
          y(t, x.ponTopManes, e.mane, n, r),
          y(t, x.ponHorns, e.horn, n, r),
          t.drawSprite(x.ponEar, null, e.coatPalette, n, r),
          y(t, x.ponFaceAccessories, e.faceAccessory, n, r),
          y(t, x.ponEarAccessories, e.earAccessory, n, r),
          y(t, x.ponFrontManes, e.mane, n, r)
    }

    function g(t, e, n, r, i, o) {
      e && (t.drawSprite(n.eyelashes ? e.lashes : e.normal, null, n.eyePalette, i, o),
          t.drawSprite(e.iris, null, r, i, o))
    }

    function y(t, e, n, r, i, o) {
      var a = n && _.at(e, n.type);
      if (a) {
        var s = _.at(a, n.pattern);
        s && (t.drawSprite(s.color, o, n.palette, r, i),
            t.drawSprite(s.extra, null, n.extraPalette, r, i))
      }
    }

    var b = t("22")
        , _ = t("23")
        , w = t("25")
        , x = t("20")
        , E = t("3b")
        , $ = t("5c");
    return e.PONY_WIDTH = 80,
        e.PONY_HEIGHT = 70,
        e.BLINK_FRAMES = [2, 6, 6, 4, 2],
        e.createDefaultPonyState = r,
        e.drawPony2D = p,
        e.drawPonyGL = h,
        e.drawPonyGL2 = d,
        n.exports
  });
  System.registerDynamic("cd", ["22", "31", "43"], !0, function (t, e, n) {
    "use strict";
    var r = t("22")
        , i = t("31")
        , o = t("43")
        , a = function () {
      function t(t, e, n) {
        this.$location = t,
            this.gameService = e,
            this.model = n,
            this.maxNameLength = r.PLAYER_NAME_MAX_LENGTH,
            this.state = o.createDefaultPonyState(),
            this.authError = t.search().error
      }

      return Object.defineProperty(t.prototype, "joining", {
        get: function () {
          return this.gameService.joining
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "pony", {
            get: function () {
              return this.model.pony
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "ponies", {
            get: function () {
              return this.model.ponies
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(t.prototype, "canNew", {
            get: function () {
              return this.ponies.length < r.PONY_LIMIT
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.new = function () {
            this.model.selectPony(i.createDefaultPony()),
                this.$location.url("/character")
          }
          ,
          t.prototype.select = function (t) {
            this.model.selectPony(t)
          }
          ,
          t.$inject = ["$location", "gameService", "model"],
          t
    }();
    return Object.defineProperty(e, "__esModule", {
      value: !0
    }),
        e.default = a,
        n.exports
  });
  System.registerDynamic("ce", [], !0, function (t, e, n) {
    return n.exports = '<div class="text-center heading"><img src="/images/logo.png" width="574" height="130" class="pixelart hidden-xs"><img src="/images/logo-small.png" width="287" height="65" class="pixelart hidden-lg hidden-md hidden-sm"></div><div class="center-block home-content"><div ng-if="vm.model.loading" style="font-size: 50px; padding: 150px 0;" class="text-muted text-center"><i class="fa fa-fw fa-spin fa-spinner"></i></div><div ng-if="!vm.model.loading"><div ng-if="!vm.model.account" class="form-group"><sign-in-box></sign-in-box></div><div ng-if="vm.authError" class="form-group"><div class="alert alert-danger">{{vm.authError}}</div></div><div ng-if="!!vm.model.account"><div class="form-group"><div class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" ng-disabled="vm.joining" class="form-control text-center"><div class="input-group-btn"><a href="/character" ng-class="{ disabled: vm.joining }" class="btn btn-default">edit</a><div uib-dropdown style="width: auto;" class="btn-group"><button type="button" ng-disabled="!vm.ponies.length || vm.joining" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="i in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(i)">{{i.name}}</a></li><li ng-if="vm.canNew"><a href="#" ng-click="vm.new()" class="text-center"><em>new pony</em></a></li></ul></div></div></div></div><div class="form-group"><character-preview pony="vm.pony" state="vm.state"></character-preview></div><div class="form-group text-center"><play-box></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div></div></div>',
        n.exports
  });
  System.registerDynamic("cf", [], !0, function (t, e, n) {
    return n.exports = '<h1>About</h1><div class="row"><div class="col-md-6"><p class="lead">A game of ponies building a town\n</p><h2>Keyboard shortcuts</h2><ul><li><b>movement</b><ul><li>use <kbd><i class="fa fa-arrow-up"></i></kbd> <kbd><i class="fa fa-arrow-left"></i></kbd> <kbd><i class="fa fa-arrow-down"></i></kbd> <kbd><i class="fa fa-arrow-right"></i></kbd>\nor <kbd class="b">W</kbd> <kbd class="b">A</kbd> <kbd class="b">S</kbd> <kbd class="b">D</kbd> to move</li><li>hold <kbd class="b">shift</kbd> to walk slowly</li></ul></li><li><b>chat</b><ul><li><kbd class="b">enter</kbd> to open chat box and send a message</li><li><kbd class="b">esc</kbd> to cancel the message</li></ul></li><li><b>zoom (1x, 2x, 3x, 4x)</b> - <kbd class="b">P</kbd></li><li><b>hide all text</b> - <kbd class="b">F2</kbd></li><li><b>fade all objects</b> - <kbd class="b">F4</kbd></li><li><b>fullscreen</b> - <kbd class="b">F11</kbd></li><li>hold <kbd class="b">shift</kbd> to be able to click on ground and items behind other players</li></ul><h2>Emotes</h2><p>You can use emotes in chat by typings their name surrounded by colons <samp>:apple:</samp>\nor by using unicode characters assigned to them. Available emotes:\n</p><ul><li>:face: - ツ</li><li>:derp: - シ</li><li>:heart: - ❤</li><li>:rock: - ⽯</li><li>:apple: - 🍎</li><li>:pizza: - 🍕</li><li>:pumpkin: - 🎃</li></ul><h2>Technology</h2><p>The entire game is written in <a href="http://www.typescriptlang.org/">TypeScript</a>,\na typed superset of JavaScript that compiles to plain JavaScript.\nServer side code is running on <a href="https://nodejs.org/en/">Node.js</a> server with WebSockets for communication.\nUser interface is built using <a href="https://angularjs.org/">Angular.js</a> framework and \nthe game itself is using WebGL for rendering graphics.\n</p><h2>The Team</h2><h3 id="agamnentzar">Agamnentzar</h3>\n<p><a href="http://agamnentzar.deviantart.com/">deviantart</a> | <a href="http://agamnentzar.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Designer</li>\n<li>Programmer</li>\n<li>Artist</li>\n</ul>\n<h3 id="shino">Shino</h3>\n<p><a href="http://shinodage.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="chirachan">ChiraChan</h3>\n<p><a href="http://chiramii-chan.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="velenor">Velenor</h3>\n<p><a href="http://velenor.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="disastral">Disastral</h3>\n<p><a href="http://askdisastral.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="cyberpon3">CyberPon3</h3>\n<p><a href="http://cyberpon3.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Programmer</li>\n</ul>\n<h2>Other contributors</h2><p><strong>OtakuAP</strong> - <a href="http://otakuap.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<p><strong>Velvet-Frost</strong> - <a href="http://velvet-frost.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Jet7Wave</strong> - <a href="http://jetwave.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Meno</strong> - <a href="http://menojar.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Lalieri</strong> - <a href="http://lalieri.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Goodly</strong> - <a href="http://goodlyay.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n</div><div class="col-md-6"><h2>Changelog</h2><h4 id="v0-16-0">v0.16.0</h4>\n<ul>\n<li>Added option for locking back leg accessory</li>\n<li>Added loading message when joining to the game</li>\n<li>Added button for opening color picker without selecting input box</li>\n<li>Added floating character preview when scrolling far down in character editor</li>\n<li>Added shortcut <kbd>F4</kbd> for fading all objects</li>\n<li>Improved rendering performance</li>\n<li>Improved selection when selecting a pony from a group of stacked ponies</li>\n<li>Fixed issues when joining to the game</li>\n<li>Fixed issues with updating game state when game runs in background tab</li>\n<li>Fixed issue with glasses color difference between editor and the game</li>\n<li>Fixed issue with automatic account merging not working in certain cases</li>\n<li>Fixed issue with clock showing 60 minutes</li>\n<li>Fixed scale on high DPI devices</li>\n<li>Fixed graphical glitches on some devices</li>\n<li>Fixed cancelling joining not working in certain cases</li>\n<li>Fixed back hair and tail color resetting in certain cases</li>\n</ul>\n<h4 id="v0-15-2">v0.15.2</h4>\n<ul>\n<li>Fixed deleting ponies</li>\n<li>Fixed clouds overlapping</li>\n<li>Fixed glass in glasses not rendering properly</li>\n</ul>\n<h4 id="v0-15-1">v0.15.1</h4>\n<ul>\n<li>Fixed errors when leaving and joining the game</li>\n<li>Fixed selection ring not showing up</li>\n<li>Fixed non-flipped buttmark being drawn incorrectly</li>\n<li>Fixed color parsing issue with empty colors</li>\n<li>Fixed locking colors for accessories</li>\n</ul>\n<h4 id="v0-15-0">v0.15.0</h4>\n<ul>\n<li>Added socks</li>\n<li>Added server name in settings dropdown</li>\n<li>Added associated social site account list on account page</li>\n<li>Added saving of last used zoom level</li>\n<li>Removed security check causing page styles to not load on some setups</li>\n<li>Improved performance of rendering engine</li>\n<li>Increased max number of ponies to 20</li>\n<li>Fixed redirecting to home page when reloading account page</li>\n<li>Fixed game screen blinking randomly</li>\n</ul>\n<h4 id="v0-14-5">v0.14.5</h4>\n<ul>\n<li>Fixed wrapping long names on character selection box</li>\n</ul>\n<h4 id="v0-14-4">v0.14.4</h4>\n<ul>\n<li>Added duplicate character option to character creator</li>\n<li>Added better error handling for DDOS protection errors</li>\n<li>Added option to share social accounts on pony selection box</li>\n<li>Added automatic closing of pony selection box when selected pony leaves the game</li>\n<li>Enabled swear filter by default on safe server</li>\n<li>Removed security check causing page to not load on some setups</li>\n<li>Fixed game crashing when changing scale if given resolution is not suported</li>\n<li>Fixed caching issues with main page</li>\n</ul>\n<h4 id="v0-14-3">v0.14.3</h4>\n<ul>\n<li>Fixed color picker hiding when selecting a color</li>\n<li>Fixed color picker input not selecting text when focused on firefox</li>\n<li>Fixed performance issue when selecting colors in character creator</li>\n<li>Fixed being redirected to home page from character creator on refresh</li>\n</ul>\n<h4 id="v0-14-2">v0.14.2</h4>\n<ul>\n<li>Added client script version check when joining to the game</li>\n</ul>\n<h4 id="v0-14-1">v0.14.1</h4>\n<ul>\n<li>Hotfixes</li>\n</ul>\n<h4 id="v0-14-0">v0.14.0</h4>\n<ul>\n<li>Added selecting other players (hold <kbd>shift</kbd> to be able to click on ground and items behind other players)</li>\n<li>Added option for ignoring other players</li>\n<li>Fixed about page inaccuracies</li>\n<li>Fixed gamepad controls</li>\n</ul>\n<h4 id="v0-13-2">v0.13.2</h4>\n<ul>\n<li>Added slow walking with <kbd>shift</kbd> key</li>\n<li>Adjusted day-night cycle length and night darkness intensity</li>\n<li>Adjusted dead zone for gamepads</li>\n<li>Improved networking performance</li>\n<li>Fixed disconnect issues on mobile devices</li>\n</ul>\n<h4 id="v0-13-1">v0.13.1</h4>\n<ul>\n<li>Fixed multiple servers not connecting properly</li>\n</ul>\n<h4 id="v0-13-0">v0.13.0</h4>\n<ul>\n<li>Added touch and gamepad controls</li>\n<li>Added day-night cycle</li>\n<li>Added game time clock</li>\n<li>Added option to leave game without having to reload the page</li>\n<li>Added support for multiple servers</li>\n<li>Fixed horn outlines</li>\n<li>Fixed zoom repeating when holding zoom key</li>\n<li>Fixed getting logged out when closing browser</li>\n</ul>\n<h4 id="v0-12-1">v0.12.1</h4>\n<ul>\n<li>Added back lighting test shortcut <kbd>T</kbd></li>\n<li>Added keyboard shortcut <kbd>F2</kbd> for hiding all text messages</li>\n<li>Fixed issue with setting color and opennes independently for left and right eye</li>\n<li>Fixed issue with incorrect pony name text placement</li>\n<li>Fixed being able to spawn inside a tree</li>\n</ul>\n<h4 id="v0-12-0">v0.12.0</h4>\n<ul>\n<li>Added trees</li>\n<li>Added pumpkins</li>\n<li>Added eyeshadow</li>\n<li>Added hats</li>\n<li>Added tie</li>\n<li>Added reading glasses</li>\n<li>Added flower ear accessory</li>\n<li>Added new face markings</li>\n<li>Added new emotes</li>\n<li>Changed map design</li>\n<li>Fixed head accessories placement without hair</li>\n<li>Fixed not being able to set 6th color on 2nd mane</li>\n</ul>\n<h4 id="v0-11-4">v0.11.4</h4>\n<ul>\n<li>Added new scarf pattern</li>\n<li>Improved rendering performance</li>\n<li>Fixed not being able to see name of a pony when they are saying something</li>\n<li>Fixed issues with server restart</li>\n<li>Fixed fetlocks in trot animation</li>\n<li>Fixed issues with font and emote spacing</li>\n</ul>\n<h4 id="v0-11-3">v0.11.3</h4>\n<ul>\n<li>Added scarf accessory</li>\n<li>Added option for hiding all chat messages with russian text</li>\n<li>Added list of rules and in-development notice</li>\n<li>Fixed some issues with chat messages</li>\n<li>Fixed multiple issues with manes</li>\n<li>Fixed issue with fetlocks</li>\n</ul>\n<h4 id="v0-11-2">v0.11.2</h4>\n<ul>\n<li>Added announcements support</li>\n<li>Added hide background switch for pony creator</li>\n<li>Removed stones from the spawning area</li>\n</ul>\n<h4 id="v0-11-1">v0.11.1</h4>\n<ul>\n<li>Added polish characters to pixel font</li>\n<li>Fixed sign-in with facebook</li>\n<li>Fixed cancelling character edit</li>\n<li>Fixed clouds</li>\n<li>Fixed spelling mistake</li>\n<li>Fixed buttmark position</li>\n</ul>\n<h4 id="v0-11-0">v0.11.0</h4>\n<ul>\n<li>Added cyrillic characters to pixel font</li>\n<li>Added logos</li>\n<li>Added optional swear filter</li>\n<li>Added more mane styles</li>\n<li>Reworked sign-in and account system</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-10-1">v0.10.1</h4>\n<ul>\n<li>Fixed connection resetting every 10 seconds when not in game</li>\n</ul>\n<h4 id="v0-10-0">v0.10.0</h4>\n<ul>\n<li>Added back butterflies</li>\n<li>Improved networking performance</li>\n<li>Fixed not initialized errors</li>\n<li>Fixed deleting character not updating character list</li>\n<li>Fixed cursor and camera offset errors on screens with high pixel density</li>\n<li>Fixed styling issue in chat box</li>\n</ul>\n<h4 id="v0-9-8">v0.9.8</h4>\n<ul>\n<li>Improved connection performance</li>\n<li>Fixed issues with chat box focus on Safari and Edge</li>\n</ul>\n<h4 id="v0-9-7">v0.9.7</h4>\n<ul>\n<li>Added chat buttons</li>\n<li>Improved connection performance</li>\n<li>Fixed automatically signing in after signing up for new account</li>\n<li>Fixed character name not saving if joining the game from home screen</li>\n</ul>\n<h4 id="v0-9-6">v0.9.6</h4>\n<ul>\n<li>Added logging off after 15 minutes of no activity</li>\n<li>Improved performance of joining to the game</li>\n<li>Fixed multiple issues with character creator on IE11</li>\n</ul>\n<h4 id="v0-9-5">v0.9.5</h4>\n<ul>\n<li>Fixed non-flippable buttmarks</li>\n<li>Fixed some rate limiting issues</li>\n</ul>\n<h4 id="v0-9-4">v0.9.4</h4>\n<ul>\n<li>Removed ability to log into the same character multiple times</li>\n<li>Added back rocks</li>\n<li>Added displaying of WegGL initialization error</li>\n</ul>\n<h4 id="v0-9-3">v0.9.3</h4>\n<ul>\n<li>Removed rocks</li>\n</ul>\n<h4 id="v0-9-2">v0.9.2</h4>\n<ul>\n<li>Removed butterflies</li>\n<li>Removed debug code</li>\n</ul>\n<h4 id="v0-9-1">v0.9.1</h4>\n<ul>\n<li>Fixed issue with rendering when value is out of range</li>\n</ul>\n<h4 id="v0-9-0">v0.9.0</h4>\n<ul>\n<li>Added shading to trot animation</li>\n<li>Added new mane styles</li>\n<li>Added mane color patterns</li>\n<li>Added option for non-flippable butt marks</li>\n<li>Added account system</li>\n<li>Added saving characters on server side</li>\n<li>Fixed eye colors switching sides  when turning left and right</li>\n<li>Fixed performance issues with rendering</li>\n<li>Fixed shader code not working on some low end devices</li>\n<li>Fixed errors when character has invalid values set for sprite types</li>\n<li>Fixed being able to use transparency for character colors</li>\n<li>Fixed chat not limiting characters properly</li>\n</ul>\n<h4 id="v0-8-0">v0.8.0</h4>\n<ul>\n<li>Added character customization in game</li>\n<li>Added eye blinking</li>\n<li>Added character selection on home screen</li>\n</ul>\n<h4 id="v0-7-0">v0.7.0</h4>\n<ul>\n<li>Removed spawn command</li>\n<li>Added character creation prototype</li>\n</ul>\n<h4 id="v0-6-1">v0.6.1</h4>\n<ul>\n<li>Fixed mouse not working in the game</li>\n</ul>\n<h4 id="v0-6-0">v0.6.0</h4>\n<ul>\n<li>Added AFK indicator</li>\n<li>Updated styles</li>\n<li>Fixed wrong cursor position on retina displays and zommed in pages</li>\n<li>Fixed emoticon parsing</li>\n<li>Fixed issue on mobile devices</li>\n</ul>\n<h4 id="v0-5-0">v0.5.0</h4>\n<ul>\n<li>Added butterfies</li>\n<li>Added apples</li>\n<li>Added apple emote to chat</li>\n<li>Fixed login form not displaying on mobile safari</li>\n</ul>\n<div class="text-muted">• c •</div></div></div>',
        n.exports
  });
  System.registerDynamic("d0", [], !0, function (t, e, n) {
    return n.exports = '<div ng-init="vm.init()" class="row"><div class="col-md-6 text-center"><div style="max-width: 400px; margin: auto;" class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" class="form-control text-center"><div class="input-group-btn"><button type="button" ng-click="vm.new()" ng-disabled="!vm.canNew" class="btn btn-default">new</button><div uib-dropdown class="btn-group"><button type="button" ng-disabled="!vm.ponies.length" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="p in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(p)">{{p.name}}</a></li></ul></div><button type="button" ng-if="!vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = true" title="delete pony" class="btn btn-danger"><i class="fa fa-trash"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = false" uib-tooltip="cancel" class="btn btn-danger"><i class="fa fa-fw fa-times"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.delete()" uib-tooltip="confirm delete" class="btn btn-success"><i class="fa fa-fw fa-check"></i></button></div></div><div style="margin: 30px auto 20px auto;" fix-to-top="vm.fixed = fixed" fix-to-top-offset="-40" class="character-preview-box"><character-preview pony="vm.pony" state="vm.state" no-background="true"></character-preview></div><div class="form-group text-center"><button ng-disabled="!vm.canDuplicate" ng-click="vm.duplicate()" class="btn btn-lg btn-default">Duplicate</button> <button ng-disabled="!vm.canRevert" ng-click="vm.revert()" class="btn btn-lg btn-default">Revert</button> <button ng-disabled="!vm.canSave" ng-click="vm.save()" class="btn btn-lg btn-default">Save</button></div><div style="max-width: 400px;" class="center-block"><play-box label="Save and Play" error="vm.error"></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div><div style="min-height: 500px;" class="col-md-6"><uib-tabset type="pills" active="vm.activeTab" ng-if="vm.loaded"><uib-tab heading="body"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">General options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.customOutlines" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">allow custom outlines</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Show social site</label></div><div class="col-sm-8"><div uib-dropdown class="dropdown"><button uib-dropdown-toggle class="btn btn-default"><i ng-if="vm.site.icon" ng-class="vm.site.icon" ng-style="{ color: vm.site.color }" class="fa fa-fw fa-lg"></i><b> {{vm.site.name}} </b><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu"><li ng-repeat="s in vm.sites"><a ng-click="vm.site = s"><i ng-class="s.icon" ng-style="{ color: s.color }" class="fa fa-fw fa-lg"></i><b> {{s.name}}</b></a></li></ul></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Animation</label></div><div class="col-sm-8"><div class="btn-group"><label ng-repeat="a in ::vm.animations" ng-model="vm.activeAnimation" uib-btn-radio="::$index" class="btn btn-primary">{{::a.name}}</label></div> <button ng-if="vm.canExport" ng-click="vm.export()" class="btn btn-default">export</button></div></div><div class="row form-group"><div class="col-sm-4"><check-box icon="fa-play" checked="vm.playAnimation" class="lock-box"></check-box><label class="control-label">Frame</label></div><div class="col-sm-8"><input type="number" ng-model="vm.state.animationFrame" ng-disabled="vm.playAnimation" min="0" class="form-control"></div></div><hr><fill-outline label="Body color" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" outline-locked="vm.pony.lockCoatOutline" outline-hidden="!vm.customOutlines"></fill-outline><hr><sprite-set-selection label="Horn" base="vm.baseCoatColor" set="vm.pony.horn" sets="::vm.horns" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Wings" base="vm.baseCoatColor" set="vm.pony.wings" sets="::vm.wings" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Front hooves" base="vm.baseCoatColor" set="vm.pony.frontHooves" sets="::vm.frontHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Back hooves" base="vm.baseCoatColor" set="vm.pony.backHooves" sets="::vm.backHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Butt mark</label></div></div><div class="row form-group"><div class="col-sm-7"><button ng-click="vm.clearCM()" title="Clear all" class="btn btn-primary"><i class="fa fa-fw fa-trash"></i></button> <div class="btn-group"><label ng-model="vm.brushType" uib-btn-radio="\'eraser\'" title="Eraser" class="btn btn-primary"><i class="fa fa-fw fa-eraser"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'eyedropper\'" title="Eyedropper" class="btn btn-primary"><i class="fa fa-fw fa-eyedropper"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'brush\'" title="Brush" class="btn btn-primary"><i class="fa fa-fw fa-paint-brush"></i></label></div></div><div class="col-sm-5"><color-picker color="vm.brush"></color-picker></div></div><div class="row form-group"><div class="col-sm-12 text-center"><bitmap-box bitmap="vm.pony.cm" tool="vm.brushType" color="vm.brush" width="::vm.cmSize" height="::vm.cmSize"></bitmap-box></div></div><div class="row form-group"><div class="col-sm-12 text-center"><check-box icon="fa-check" checked="vm.pony.cmFlip"></check-box><label style="margin-left: 10px; vertical-align: top;" class="form-control-static text-muted">don\'t flip mark on the other side</label></div></div></div></div></uib-tab><uib-tab heading="mane"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Mane" base="vm.baseHairColor" set="vm.pony.mane" sets="::vm.manes" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back mane" base="vm.baseHairColor" set="vm.pony.backMane" sets="::vm.backManes" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="tail"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Tail" base="vm.baseHairColor" set="vm.pony.tail" sets="::vm.tails" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="face"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eyelashes</label></div><div class="col-sm-8"><div class="btn-group"><label ng-model="vm.pony.eyelashes" uib-btn-radio="0" class="btn btn-primary">no</label><label ng-model="vm.pony.eyelashes" uib-btn-radio="1" class="btn btn-primary">yes</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorRight" changed="vm.eyeColorLockChanged(vm.pony.lockEyeColor)"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyeColor" icon="fa-lock" changed="vm.eyeColorLockChanged($value)" class="lock-box"></check-box><label class="control-label">Eye color (left)</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorLeft" is-disabled="vm.pony.lockEyeColor"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye whites color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeWhites"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyes" icon="fa-lock" changed="vm.eyeOpennessChanged($value)" class="lock-box"></check-box><label class="control-label">Eye openness</label></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessRight" min="1" max="6" step="1" ng-change="vm.eyeOpennessChanged(vm.pony.lockEyes)" class="form-control"></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessLeft" min="1" max="6" step="1" ng-disabled="vm.pony.lockEyes" class="form-control"></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.eyeshadow" icon="fa-check" class="lock-box"></check-box><label class="control-label">Eyeshadow</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeshadowColor" is-disabled="!vm.pony.eyeshadow"></color-picker></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Expression</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.muzzle" sprites="vm.muzzles" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Fangs</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.fangs" sprites="vm.fangs" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.freckles" sprites="vm.freckles" fill="vm.pony.frecklesColor" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings color</label></div><div class="col-sm-8"><color-picker color="vm.pony.frecklesColor" is-disabled="!vm.pony.freckles"></color-picker></div></div><hr><sprite-set-selection label="Facial hair" base="vm.baseHairColor" set="vm.pony.facialHair" sets="::vm.facialHair" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="other"><div class="panel container-fluid character-tab"><div class="form-horizontal"><uib-tabset active="vm.activeAccessoryTab"><uib-tab heading="head"><div style="margin-top: 10px;"><sprite-set-selection label="Head accessories" base="vm.baseHeadAccessoryColor" set="vm.pony.headAccessory" sets="::vm.headAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Ear accessories" base="vm.baseEarAccessoryColor" set="vm.pony.earAccessory" sets="::vm.earAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Face accessories" base="vm.baseFaceAccessoryColor" set="vm.pony.faceAccessory" sets="::vm.faceAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="neck"><div style="margin-top: 10px;"><sprite-set-selection label="Neck accessories" base="vm.baseNeckAccessoryColor" set="vm.pony.neckAccessory" sets="::vm.neckAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></uib-tab><uib-tab heading="legs"><div style="margin-top: 10px;"><sprite-set-selection label="Front leg accessories" base="vm.baseFrontLegAccessoryColor" set="vm.pony.frontLegAccessory" sets="::vm.frontLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.lockBackLegAccessory" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">use the same accessory for back legs</label></div></div></div><sprite-set-selection label="Back leg accessories" base="vm.baseBackLegAccessoryColor" set="vm.pony.backLegAccessory" sets="::vm.backLegAccessories" outline-hidden="!vm.customOutlines" non-lockable="true" ng-if="!vm.pony.lockBackLegAccessory"></sprite-set-selection></div></uib-tab></uib-tabset></div></div></uib-tab></uib-tabset></div></div>',
        n.exports
  });
  System.registerDynamic("d1", [], !0, function (t, e, n) {
    return n.exports = '<div ng-init="vm.init()"><h1>Account settings</h1></div><div class="row"><div class="col-md-6"><form name="form" ng-submit="vm.submit()" style="max-width: 400px;" class="form"><div class="form-group"><h3>Account details</h3></div><div class="form-group"><label for="account-name" class="control-label">name</label><input id="account-name" type="text" ng-model="vm.data.name" required maxlength="{{vm.nameMaxLength}}" class="form-control"></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div class="form-group"><button type="submit" ng-disabled="!vm.canSubmit || form.$pristine || form.$invalid || form.$pending" class="btn btn-primary">Save</button></div></form></div><div class="col-md-6"><div class="form form-horizontal"><div class="form-group row"><div class="col-xs-12"><h3>Game settings</h3></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">bad word filter</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">hide all messages with russian text</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div></div><h3>Connected accounts</h3><div ng-repeat="s in vm.sites"><a ng-href="{{s.url}}" target="_blank"><i ng-class="s.icon" class="fa fa-fw fa-lg"></i><b>{{s.name}}</b></a></div></div><div class="row"><div class="col-xs-12"><a href="/" style="max-width: 200px; margin-top: 50px;" class="btn btn-lg btn-primary btn-block center-block"><i class="fa fa-angle-double-left"></i> Back to game</a></div></div></div>',
        n.exports
  });
  System.registerDynamic("d2", [getCodeName("AngularRoute"), getCodeName("AngularAnimate"), getCodeName("angular-ui/bootstrap.js"), getCodeName("Angular"), "2f", "a4", "21", "a7", "a8", "a9", "aa", "cd", "ce", "cf", "d0", "d1"], !0, function (t, e, n) {
    "use strict";
    t(getCodeName("AngularRoute")),
        t(getCodeName("AngularAnimate")),
        t(getCodeName("angular-ui/bootstrap.js"));
    var r = t(getCodeName("Angular"))
        , i = t("2f")
        , o = t("a4")
        , a = t("21")
        , s = t("a7");
    e.app = r.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap"]),
        s.init(e.app),
        e.app.directive("a", function () {
          return {
            restrict: "E",
            link: function (t, e, n) {
              !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                  e[0].setAttribute("rel", "noopener noreferrer"))
            }
          }
        }),
        e.app.run(["$http", function (t) {
          setTimeout(function () {
            a.debug || window.__sriTestPassed || o.getItem("sri-test-reported") || t.get("/scripts/test.js").then(function (t) {
              var e = t.data;
              i.reportError("SRI FAILED", {
                script: e
              }),
                  o.setItem("sri-test-reported", "sent")
            })
          }, 2e3)
        }
        ]);
    var u = function () {
      function t(t, e) {
        this.gameService = t,
            this.model = e
      }

      return Object.defineProperty(t.prototype, "selected", {
        get: function () {
          return this.gameService.selected
        },
        enumerable: !0,
        configurable: !0
      }),
          Object.defineProperty(t.prototype, "playing", {
            get: function () {
              return this.gameService.playing
            },
            enumerable: !0,
            configurable: !0
          }),
          t.prototype.init = function () {
            var t = document.getElementById("music");
            t && (t.volume = .15)
          }
          ,
          t.$inject = ["gameService", "model"],
          t
    }();
    e.app.component("ponyTownApp", {
      controller: u,
      controllerAs: "vm",
      template: t("a8")
    });
    var l = t("a9")
        , c = t("aa")
        , f = t("cd");
    return e.app.config(["$routeProvider", "$locationProvider", function (e, n) {
      n.html5Mode(!0),
          e.when("/", {
            template: t("ce"),
            controller: f.default,
            controllerAs: "vm"
          }).when("/about", {
            template: t("cf"),
            controller: function () {
            },
            controllerAs: "vm"
          }).when("/character", {
            template: t("d0"),
            controller: l.default,
            controllerAs: "vm"
          }).when("/account", {
            template: t("d1"),
            controller: c.default,
            controllerAs: "vm"
          }).otherwise({
            redirectTo: "/"
          })
    }
    ]),
        n.exports
  });
  System.registerDynamic("21", [], !0, function (t, e, n) {
    "use strict";
    function r(t) {
      return "undefined" != typeof document ? document.body.getAttribute(t) : null
    }

    function i(t) {
      return "undefined" != typeof document ? document.getElementById(t).innerHTML : null
    }

    return e.debug = "true" === r("data-debug"),
        e.version = r("data-version") || null ,
        e.debugOptions = e.debug && "undefined" != typeof localStorage ? localStorage : {},
        e.oauthProviders = JSON.parse(i("oauth-providers") || "[]"),
    "undefined" != typeof window && (window.debugOptions = e.debugOptions),
        n.exports
  });
  System.registerDynamic("main", ["3", "4", "d2", getCodeName("BlueBird"), getCodeName("Angular"), "21"], !0, function (t, e, n) {
    "use strict";
    window.__ponytown = !0,
        t("3"),
        t("4"),
        t("d2");
    var r = t(getCodeName("BlueBird"))
        , i = t(getCodeName("Angular"))
        , o = t("21");
    o.debug && r.config({
      warnings: !1,
      longStackTraces: !0
    }),
        i.element().ready(function () {
        return i.bootstrap(document, ["app"]);
    });
    return n.exports
  })
}
