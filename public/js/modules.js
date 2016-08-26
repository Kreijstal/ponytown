var modules=
function(System) {
    var e = this.require
      , n = this.exports
      , r = this.module;
    !function(e) {
        function n(t, e) {
            for (var n = t.split("."); n.length; )
                e = e[n.shift()];
            return e
        }
        function r(t) {
            if ("string" == typeof t)
                return n(t, e);
            if (!(t instanceof Array))
                throw new Error("Global exports must be a string or array.");
            for (var r = {}, i = !0, o = 0; o < t.length; o++) {
                var a = n(t[o], e);
                i && (r.default = a,
                i = !1),
                r[t[o].split(".").pop()] = a
            }
            return r
        }
        function i(t) {
            if (Object.keys)
                Object.keys(e).forEach(t);
            else
                for (var n in e)
                    l.call(e, n) && t(n)
        }
        function o(t) {
            i(function(n) {
                if (-1 == u.call(c, n)) {
                    try {
                        var r = e[n]
                    } catch (t) {
                        c.push(n)
                    }
                    t(n, r)
                }
            })
        }
        var a, s = System, l = Object.prototype.hasOwnProperty, u = Array.prototype.indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (this[e] === t)
                    return e;
            return -1
        }
        , c = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "frameElement", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB", "mozInnerScreenY", "mozInnerScreenX"];
        s.set("@@global-helpers", s.newModule({
            prepareGlobal: function(t, n, i) {
                var s = e.define;
                e.define = void 0;
                var l;
                if (i) {
                    l = {};
                    for (var u in i)
                        l[u] = e[u],
                        e[u] = i[u]
                }
                return n || (a = {},
                o(function(t, e) {
                    a[t] = e
                })),
                function() {
                    var t;
                    if (n)
                        t = r(n);
                    else {
                        t = {};
                        var i, u;
                        o(function(e, n) {
                            a[e] !== n && "undefined" != typeof n && (t[e] = n,
                            "undefined" != typeof i ? u || i === n || (u = !0) : i = n)
                        }),
                        t = u ? t : i
                    }
                    if (l)
                        for (var c in l)
                            e[c] = l[c];
                    return e.define = s,
                    t
                }
            }
        }))
    }("undefined" != typeof self ? self : global),
    !function(e) {
        function n(t, e) {
            t = t.replace(s, "");
            var n = t.match(c)
              , r = (n[1].split(",")[e] || "require").replace(f, "")
              , i = p[r] || (p[r] = new RegExp(l + r + u,"g"));
            i.lastIndex = 0;
            for (var o, a = []; o = i.exec(t); )
                a.push(o[2] || o[3]);
            return a
        }
        function r(t, e, n, i) {
            if ("object" == typeof t && !(t instanceof Array))
                return r.apply(null , Array.prototype.splice.call(arguments, 1, arguments.length - 1));
            if ("string" == typeof t && "function" == typeof e && (t = [t]),
            !(t instanceof Array)) {
                if ("string" == typeof t) {
                    var a = o.get(t);
                    return a.__useDefault ? a.default : a
                }
                throw new TypeError("Invalid require")
            }
            for (var s = [], l = 0; l < t.length; l++)
                s.push(o.import(t[l], i));
            Promise.all(s).then(function(t) {
                e && e.apply(null , t)
            }, n)
        }
        function i(t, i, s) {
            "string" != typeof t && (s = i,
            i = t,
            t = null ),
            i instanceof Array || (s = i,
            i = ["require", "exports", "module"].splice(0, s.length)),
            "function" != typeof s && (s = function(t) {
                return function() {
                    return t
                }
            }(s)),
            void 0 === i[i.length - 1] && i.pop();
            var l, u, c;
            -1 != (l = a.call(i, "require")) && (i.splice(l, 1),
            t || (i = i.concat(n(s.toString(), l)))),
            -1 != (u = a.call(i, "exports")) && i.splice(u, 1),
            -1 != (c = a.call(i, "module")) && i.splice(c, 1);
            var f = {
                name: t,
                deps: i,
                execute: function(t, n, a) {
                    for (var f = [], p = 0; p < i.length; p++)
                        f.push(t(i[p]));
                    a.uri = a.id,
                    a.config = function() {}
                    ,
                    -1 != c && f.splice(c, 0, a),
                    -1 != u && f.splice(u, 0, n),
                    -1 != l && f.splice(l, 0, function(e, n, i) {
                        return "string" == typeof e && "function" != typeof n ? t(e) : r.call(o, e, n, i, a.id)
                    });
                    var h = s.apply(-1 == u ? e : n, f);
                    return "undefined" == typeof h && a && (h = a.exports),
                    "undefined" != typeof h ? h : void 0
                }
            };
            if (t)
                h.anonDefine || h.isBundle ? h.anonDefine && h.anonDefine.name && (h.anonDefine = null ) : h.anonDefine = f,
                h.isBundle = !0,
                o.registerDynamic(f.name, f.deps, !1, f.execute);
            else {
                if (h.anonDefine && !h.anonDefine.name)
                    throw new Error("Multiple anonymous defines in module " + t);
                h.anonDefine = f
            }
        }
        var o = System
          , a = Array.prototype.indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (this[e] === t)
                    return e;
            return -1
        }
          , s = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm
          , l = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])"
          , u = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)"
          , c = /\(([^\)]*)\)/
          , f = /^\s+|\s+$/g
          , p = {};
        i.amd = {};
        var h = {
            isBundle: !1,
            anonDefine: null
        };
        o.amdDefine = i,
        o.amdRequire = r
    }("undefined" != typeof self ? self : global),
    function() {
        var e = System.amdDefine;
        !function(t, i) {
            "function" == typeof e && e.amd ? e("es6-shims", [], i) : "object" == typeof n ? r.exports = i() : t.returnExports = i()
        }(this, libraries.es6)
    }(),
    function() {
        var e = System.amdDefine;
        e("amd es6-shims passthrough", ["es6-shims"], function(t) {
            return t
        })
    }(),
    System.registerDynamic("toBlobShim", [], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null , null );
        return function() {
            !function(t) {
                "use strict";
                var e, n = t.Uint8Array, r = t.HTMLCanvasElement, i = r && r.prototype, o = /\s*;\s*base64\s*(?:;|$)/i, a = "toDataURL", s = function(t) {
                    for (var r, i, o, a = t.length, s = new n(a / 4 * 3 | 0), l = 0, u = 0, c = [0, 0], f = 0, p = 0; a--; )
                        i = t.charCodeAt(l++),
                        r = e[i - 43],
                        255 !== r && r !== o && (c[1] = c[0],
                        c[0] = i,
                        p = p << 6 | r,
                        f++,
                        4 === f && (s[u++] = p >>> 16,
                        61 !== c[1] && (s[u++] = p >>> 8),
                        61 !== c[0] && (s[u++] = p),
                        f = 0));
                    return s
                };
                n && (e = new n([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])),
                r && !i.toBlob && (i.toBlob = function(t, e) {
                    if (e || (e = "image/png"),
                    this.mozGetAsFile)
                        return void t(this.mozGetAsFile("canvas", e));
                    if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(e))
                        return void t(this.msToBlob());
                    var r, i = Array.prototype.slice.call(arguments, 1), l = this[a].apply(this, i), u = l.indexOf(","), c = l.substring(u + 1), f = o.test(l.substring(0, u));
                    Blob.fake ? (r = new Blob,
                    f ? r.encoding = "base64" : r.encoding = "URI",
                    r.data = c,
                    r.size = c.length) : n && (r = f ? new Blob([s(c)],{
                        type: e
                    }) : new Blob([decodeURIComponent(c)],{
                        type: e
                    })),
                    t(r)
                }
                ,
                i.toDataURLHD ? i.toBlobHD = function() {
                    a = "toDataURLHD";
                    var t = this.toBlob();
                    return a = "toDataURL",
                    t
                }
                : i.toBlobHD = i.toBlob)
            }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content || this)
        }(),
        i()
    }),
    System.registerDynamic("CanvasContext2DEllipseShim", [], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null , null );
        return function() {
            window.performance = window.performance || Date;
            try {
                "undefined" == typeof CanvasRenderingContext2D.prototype.ellipse && (CanvasRenderingContext2D.prototype.ellipse = function(t, e, n, r, i, o, a, s) {
                    this.save(),
                    this.translate(t, e),
                    this.rotate(i),
                    this.scale(n, r),
                    this.arc(0, 0, 1, o, a, s),
                    this.restore()
                }
                )
            } catch (t) {}
            try {
                "undefined" == typeof navigator.getGamepads && (navigator.getGamepads = function() {
                    return []
                }
                )
            } catch (t) {}
        }(),
        i()
    }),
    System.registerDynamic("angular route", ["<angular passthrough>"], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null , null );
		libraries.angular_route();
        return i()
    }),
    System.registerDynamic("<angular route passthrough>", ["angular route"], !0, function(t, e, n) {
        return n.exports = t("angular route"),
        n.exports
    }),
    System.registerDynamic("angular animate", ["<angular passthrough>"], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null , null );
		libraries.angular_animate();
        return i()
    }),
    System.registerDynamic("<angular animate passthrough>", ["angular animate"], !0, function(t, e, n) {
        return n.exports = t("angular animate"),
        n.exports
    }),
    System.registerDynamic("Angular UI bootstrap", [], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, null , null );
		libraries.angularUI();
        return i()
    }),
    function() {
        var i = System.amdDefine;
        !function(t, e) {
            "object" == typeof n && "undefined" != typeof r ? r.exports = e() : "function" == typeof i && i.amd ? i("momentjs", [], e) : t.moment = e()
        }(this, libraries.momentJS)
    }(),
    function() {
        var e = System.amdDefine;
        e("amd momentjs passthrough", ["momentjs"], function(t) {
            return t
        })
    }(),
    System.registerDynamic("possible socket methods?", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t.map(function(t) {
                return "string" == typeof t ? t : t[0]
            })
        }
        function i(t) {
            return t.map(function(t) {
                return "string" != typeof t && t[1].ignore ? t[0] : null
            }).filter(function(t) {
                return !!t
            })
        }
        function o(t) {
            var e = {};
            return t.forEach(function(t) {
                "string" != typeof t && t[1].binary && (e[t[0]] = t[1].binary)
            }),
            e
        }
        return e.getNames = r,
        e.getIgnore = i,
        e.getBinary = o,
        n.exports
    }),
    System.registerDynamic("f", [], !0, function(t, e, n) {
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
    }),
    System.registerDynamic("10", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return !t.some(function(t) {
                return 10 === t || 9 === t || Array.isArray(t)
            })
        }
        function i(t, e, n) {
            if (t instanceof Array) {
                if (r(t))
                    return "writer.measureSimpleArray(" + e + ", " + t.reduce(function(t, e) {
                        return t + c[e]
                    }, 0) + ")";
                var o = ""
                  , a = 0;
                if (1 === t.length) {
                    var s = i(t[0], "item", n + "\t");
                    isNaN(s) ? o += "\n" + n + "\t+ " + s : a += s
                } else
                    for (var l = 0; l < t.length; l++) {
                        var s = i(t[l], "item[" + l + "]", n + "\t");
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
        function l(t) {
            for (var e = "", n = 0; n < t.length; n++)
                e += "\t\tresult.push(" + s(t[n], "\t\t") + ");\n";
            return "function (reader, result) {\n" + e + "\t}"
        }
        function u(t, e) {
            var n = Object.keys(t).map(function(e) {
                return e + ": " + a(t[e])
            })
              , r = Object.keys(e).map(function(t) {
                return t + ": " + l(e[t])
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
        e.createHandlers = u,
        n.exports
    }),
    System.registerDynamic("11", [], !0, function(t, e, n) {
        "use strict";
        e.defaultHandleFunction = function(t, e, n, r, i) {
            return n.apply(r, i)
        }
        ;
        var r = function() {
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
            return t.prototype.write = function(t, e, n, r) {
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
            t.prototype.read = function(t) {
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
            t.prototype.getFuncName = function(t, e) {
                return 255 === t ? "*version" : 253 === t ? "*reject:" + this.remoteNames[e.shift()] : 254 === t ? "*resolve:" + this.remoteNames[e.shift()] : this.readNames[t]
            }
            ,
            t.prototype.send = function(t, e, n, r) {
                try {
                    return this.write(t, e, n, r)
                } catch (t) {
                    return 0
                }
            }
            ,
            t.prototype.recv = function(t, n, r, i) {
                void 0 === i && (i = e.defaultHandleFunction);
                var o = this.read(t);
                try {
                    var a = o.shift()
                      , s = this.getFuncName(a, o)
                      , l = s && "*" === s[0]
                      , u = l ? r : n
                      , c = u[s]
                } catch (t) {}
                return c && i(a, s, c, u, o),
                t.length || t.byteLength || 0
            }
            ,
            t
        }();
        return e.PacketHandler = r,
        n.exports
    }),
    System.registerDynamic("12", ["11"], !0, function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = t("11")
          , o = function(t) {
            function e(e, n, r, i, o, a, s) {
                t.call(this, e, n, r, i, o),
                this.ignorePackets = a,
                this.log = s
            }
            return r(e, t),
            e.prototype.send = function(t, e, n, r) {
                var i = this.write(t, e, n, r);
                if (this.ignorePackets.indexOf(e) === -1) {
                    var o = this.lastWriteBinary ? "bin" : "str";
                    this.log("SEND [" + i + "] (" + o + ")", e, r)
                }
                return i
            }
            ,
            e.prototype.recv = function(t, e, n, r) {
                void 0 === r && (r = i.defaultHandleFunction);
                var o = this.read(t)
                  , a = o.shift()
                  , s = this.getFuncName(a, o);
                s || this.log("invalid message id: " + a);
                var l = s && "*" === s[0]
                  , u = l ? n : e
                  , c = u[s]
                  , f = t.length || t.byteLength;
                if (this.ignorePackets.indexOf(s) === -1) {
                    var p = "string" != typeof t ? "bin" : "str";
                    this.log("RECV [" + f + "] (" + p + ")", s, o)
                }
                return c ? r(a, s, c, u, o) : this.log("invalid message: " + s, o),
                f
            }
            ,
            e
        }(i.PacketHandler);
        return e.DebugPacketHandler = o,
        n.exports
    }),
    System.registerDynamic("13", ["14"], !0, function(t, e, n) {
        "use strict";
        var r = t("14")
          , i = function() {
            function t() {}
            return t.prototype.measureString = function(t) {
                if (null == t)
                    return this.measureLength(-1);
                var e = r.stringLengthInBytes(t);
                return this.measureLength(e) + e
            }
            ,
            t.prototype.measureObject = function(t) {
                return null == t ? this.measureLength(-1) : this.measureString(JSON.stringify(t))
            }
            ,
            t.prototype.measureArray = function(t, e) {
                return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.reduce(function(t, n) {
                    return t + e(n)
                }, 0)
            }
            ,
            t.prototype.measureSimpleArray = function(t, e) {
                return null == t ? this.measureLength(-1) : this.measureLength(t.length) + t.length * e
            }
            ,
            t.prototype.measureLength = function(t) {
                return t === -1 ? 2 : t < 127 ? 1 : t < 16383 ? 2 : t < 2097151 ? 3 : 4
            }
            ,
            t.prototype.writeUint8 = function(t) {
                throw new Error("not implemented")
            }
            ,
            t.prototype.writeBytes = function(t) {
                throw new Error("not implemented")
            }
            ,
            t.prototype.writeBoolean = function(t) {
                this.writeUint8(t ? 1 : 0)
            }
            ,
            t.prototype.writeString = function(t) {
                if (null == t)
                    this.writeLength(-1);
                else {
                    var e = r.encodeString(t);
                    this.writeLength(e.length),
                    this.writeBytes(e)
                }
            }
            ,
            t.prototype.writeObject = function(t) {
                null == t ? this.writeString(null ) : this.writeString(JSON.stringify(t))
            }
            ,
            t.prototype.writeArray = function(t, e) {
                null == t ? this.writeLength(-1) : (this.writeLength(t.length),
                t.forEach(e))
            }
            ,
            t.prototype.writeLength = function(t) {
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
    }),
    System.registerDynamic("15", ["13"], !0, function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = t("13")
          , o = function(t) {
            function e() {
                t.apply(this, arguments),
                this.offset = 0
            }
            return r(e, t),
            e.prototype.getBuffer = function() {
                return this.buffer
            }
            ,
            e.prototype.init = function(t) {
                this.offset = 0,
                this.buffer = new ArrayBuffer(t),
                this.view = new DataView(this.buffer),
                this.bytes = new Uint8Array(this.buffer)
            }
            ,
            e.prototype.writeInt8 = function(t) {
                this.view.setInt8(this.offset, t),
                this.offset += 1
            }
            ,
            e.prototype.writeUint8 = function(t) {
                this.view.setUint8(this.offset, t),
                this.offset += 1
            }
            ,
            e.prototype.writeInt16 = function(t) {
                this.view.setInt16(this.offset, t),
                this.offset += 2
            }
            ,
            e.prototype.writeUint16 = function(t) {
                this.view.setUint16(this.offset, t),
                this.offset += 2
            }
            ,
            e.prototype.writeInt32 = function(t) {
                this.view.setInt32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeUint32 = function(t) {
                this.view.setUint32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeFloat32 = function(t) {
                this.view.setFloat32(this.offset, t),
                this.offset += 4
            }
            ,
            e.prototype.writeFloat64 = function(t) {
                this.view.setFloat64(this.offset, t),
                this.offset += 8
            }
            ,
            e.prototype.writeBytes = function(t) {
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
    }),
    System.registerDynamic("14", [], !0, function(t, e, n) {
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
            return r(t, function(t) {
                return e += i(t)
            }),
            e
        }
        function a(t) {
            if (null == t)
                return null ;
            var e = new Uint8Array(o(t))
              , n = 0;
            return r(t, function(t) {
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
        function l(t) {
            if (null == t)
                return null ;
            for (var e = "", n = 0; n < t.length; ) {
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
                      , l = s(t, n++);
                    if (i = (15 & r) << 18 | o << 12 | a << 6 | l,
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
        e.decodeString = l,
        n.exports
    }),
    System.registerDynamic("16", ["14"], !0, function(t, e, n) {
        "use strict";
        var r = t("14")
          , i = function() {
            function t() {}
            return t.prototype.readUint8 = function() {
                throw new Error("not implemented")
            }
            ,
            t.prototype.readBytes = function(t) {
                throw new Error("not implemented")
            }
            ,
            t.prototype.readBoolean = function() {
                return 1 === this.readUint8()
            }
            ,
            t.prototype.readArray = function(t) {
                var e = this.readLength();
                if (e === -1)
                    return null ;
                for (var n = new Array(e), r = 0; r < e; r++)
                    n[r] = t();
                return n
            }
            ,
            t.prototype.readString = function() {
                var t = this.readLength();
                return t === -1 ? null : r.decodeString(this.readBytes(t))
            }
            ,
            t.prototype.readObject = function() {
                var t = this.readString();
                return null == t ? null : JSON.parse(t)
            }
            ,
            t.prototype.readLength = function() {
                var t = 0
                  , e = 0
                  , n = 0;
                do {
                    var r = this.readUint8();
                    t |= (127 & r) << e,
                    e += 7,
                    n++
                } while (128 & r);return 2 === n && 0 === t ? -1 : t
            }
            ,
            t
        }();
        return e.BasePacketReader = i,
        n.exports
    }),
    System.registerDynamic("17", ["16"], !0, function(t, e, n) {
        "use strict";
        var r = this && this.__extends || function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var r in e)
                e.hasOwnProperty(r) && (t[r] = e[r]);
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
          , i = t("16")
          , o = function(t) {
            function e() {
                t.apply(this, arguments),
                this.offset = 0,
                this.view = null ,
                this.buffer = null
            }
            return r(e, t),
            e.prototype.setBuffer = function(t) {
                this.offset = 0,
                this.buffer = t,
                this.view = new DataView(this.buffer)
            }
            ,
            e.prototype.readInt8 = function() {
                return this.offset += 1,
                this.view.getInt8(this.offset - 1)
            }
            ,
            e.prototype.readUint8 = function() {
                return this.offset += 1,
                this.view.getUint8(this.offset - 1)
            }
            ,
            e.prototype.readInt16 = function() {
                return this.offset += 2,
                this.view.getInt16(this.offset - 2)
            }
            ,
            e.prototype.readUint16 = function() {
                return this.offset += 2,
                this.view.getUint16(this.offset - 2)
            }
            ,
            e.prototype.readInt32 = function() {
                return this.offset += 4,
                this.view.getInt32(this.offset - 4)
            }
            ,
            e.prototype.readUint32 = function() {
                return this.offset += 4,
                this.view.getUint32(this.offset - 4)
            }
            ,
            e.prototype.readFloat32 = function() {
                return this.offset += 4,
                this.view.getFloat32(this.offset - 4)
            }
            ,
            e.prototype.readFloat64 = function() {
                return this.offset += 8,
                this.view.getFloat64(this.offset - 8)
            }
            ,
            e.prototype.readBytes = function(t) {
                return this.offset += t,
                new Uint8Array(this.view.buffer,this.offset - t,t)
            }
            ,
            e
        }(i.BasePacketReader);
        return Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = o,
        n.exports
    }),
    System.registerDynamic("ClientSocket", ["<bluebird passthrough>", "possible socket methods?", "19", "f", "10", "11", "12", "15", "17", "<buffer from node attempt passthrough>"], !0, function(t, e, n) {
        return function(n) {
            "use strict";
            function r() {
                var t = {};
                return t.promise = new i(function(e, n) {
                    t.resolve = e,
                    t.reject = n
                }
                ),
                t
            }
            var i = t("<bluebird passthrough>")
              , o = t("possible socket methods?")
              , a = t("19")
              , s = t("f")
              , l = t("10")
              , u = t("11")
              , c = t("12")
              , f = t("15")
              , p = t("17")
              , h = function() {
                function t(t, e, n, r) {
                    var i = this;
                    void 0 === n && (n = function(t) {
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
                    this.beforeunload = function() {
                        if (i.socket)
                            try {
                                i.socket.onclose = null ,
                                i.socket.close(),
                                i.socket = null
                            } catch (t) {}
                    }
                    ,
                    this.defers = [],
                    this.inProgressFields = {},
                    this.rateLimits = [],
                    this.options.server.forEach(function(t, e) {
                        "string" == typeof t ? i.createMethod(t, e, {}) : (i.createMethod(t[0], e, t[1]),
                        t[1].rateLimit && (i.rateLimits[e] = {
                            limit: t[1].rateLimit + 50,
                            last: 0
                        }))
                    }),
                    this.special["*version"] = function(t) {
                        t === i.options.hash ? i.versionValidated = !0 : i.client.invalidVersion && i.client.invalidVersion(t, i.options.hash)
                    }
                }
                return t.prototype.getWebsocketUrl = function() {
                    var t = this.options
                      , e = t.host || location.host
                      , n = t.path || "/ws"
                      , r = t.ssl || "https:" === location.protocol ? "wss://" : "ws://"
                      , i = t.token ? "?t=" + t.token : "";
                    if (t.requestParams) {
                        var o = Object.keys(t.requestParams).map(function(e) {
                            return e + "=" + encodeURIComponent(t.requestParams[e])
                        }).join("&");
                        i += (i ? "&" : "?") + o
                    }
                    return r + e + n + i
                }
                ,
                t.prototype.connect = function() {
                    var t = this;
                    if (this.connecting = !0,
                    !this.socket) {
                        var e = this.options;
                        this.socket = new WebSocket(this.getWebsocketUrl()),
                        window.addEventListener("beforeunload", this.beforeunload);
                        var r = new p.default
                          , i = new f.default
                          , a = l.createHandlers(o.getBinary(e.server), o.getBinary(e.client))
                          , s = o.getNames(e.server)
                          , h = o.getNames(e.client)
                          , d = o.getIgnore(e.server).concat(o.getIgnore(e.client));
                        e.debug ? this.packet = new c.DebugPacketHandler(h,s,i,r,a,d,this.log) : this.packet = new u.PacketHandler(h,s,i,r,a),
                        this.packet.supportsBinary = !!this.socket.binaryType,
                        this.socket.binaryType = "arraybuffer",
                        this.socket.onmessage = function(e) {
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
                        this.socket.onopen = function() {
                            e.debug && t.log("socket opened"),
                            t.lastSentId = 0,
                            t.isConnected = !0,
                            t.packet.supportsBinary && t.socket.send("undefined" != typeof n ? new n(0) : new ArrayBuffer(0)),
                            t.client.connected && t.client.connected(),
                            e.pingInterval && (t.pingInterval = setInterval(function() {
                                return t.sendPing()
                            }, e.pingInterval))
                        }
                        ,
                        this.socket.onerror = function(n) {
                            e.debug && t.log("socket error", n)
                        }
                        ,
                        this.socket.onclose = function(n) {
                            e.debug && t.log("socket closed", n),
                            t.socket = null ,
                            t.versionValidated = !1,
                            t.isConnected && (t.isConnected = !1,
                            t.client.disconnected && t.client.disconnected()),
                            t.connecting && (t.reconnectTimeout = setTimeout(function() {
                                t.connect(),
                                t.reconnectTimeout = null
                            }, e.reconnectTimeout)),
                            t.defers.forEach(function(t) {
                                return t[1].reject(new Error("disconnected"))
                            }),
                            t.defers = [],
                            Object.keys(t.inProgressFields).forEach(function(e) {
                                return t.inProgressFields[e] = 0
                            }),
                            t.pingInterval && (clearInterval(t.pingInterval),
                            t.pingInterval = null )
                        }
                    }
                }
                ,
                t.prototype.disconnect = function() {
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
                t.prototype.sendPing = function() {
                    try {
                        var t = Date.now();
                        this.socket && this.versionValidated && t - this.lastPing > this.options.pingInterval && (this.socket.send(""),
                        this.lastPing = Date.now())
                    } catch (t) {}
                }
                ,
                t.prototype.createMethod = function(t, e, n) {
                    n.promise ? this.createPromiseMethod(t, e, n.progress) : this.createSimpleMethod(t, e)
                }
                ,
                t.prototype.createSimpleMethod = function(t, e) {
                    var n = this;
                    this.server[t] = function() {
                        for (var r = [], i = 0; i < arguments.length; i++)
                            r[i - 0] = arguments[i];
                        return !!s.checkRateLimit(e, n.rateLimits) && (n.sentSize += n.packet.send(n.socket, t, e, r),
                        n.lastSentId++,
                        !0)
                    }
                }
                ,
                t.prototype.createPromiseMethod = function(t, e, n) {
                    var o = this;
                    n && (this.inProgressFields[n] = 0,
                    Object.defineProperty(this.server, n, {
                        get: function() {
                            return !!o.inProgressFields[n]
                        }
                    })),
                    this.server[t] = function() {
                        for (var l = [], u = 0; u < arguments.length; u++)
                            l[u - 0] = arguments[u];
                        if (!o.isConnected)
                            return i.reject(new Error("not connected"));
                        if (!s.checkRateLimit(e, o.rateLimits))
                            return i.reject(new Error("rate limit exceeded"));
                        o.sentSize += o.packet.send(o.socket, t, e, l);
                        var c = ++o.lastSentId
                          , f = r();
                        return a.set(o.defers, c, f),
                        o.inProgressFields[n]++,
                        f.promise
                    }
                    ,
                    this.special["*resolve:" + t] = function(t, e) {
                        var r = a.get(o.defers, t);
                        r && (a.remove(o.defers, t),
                        o.inProgressFields[n]--,
                        o.apply(function() {
                            return r.resolve(e)
                        }))
                    }
                    ,
                    this.special["*reject:" + t] = function(t, e) {
                        var r = a.get(o.defers, t);
                        r && (a.remove(o.defers, t),
                        o.inProgressFields[n]--,
                        o.apply(function() {
                            return r.reject(new Error(e))
                        }))
                    }
                }
                ,
                t
            }();
            e.ClientSocket = h
        }(t("<buffer from node attempt passthrough>").Buffer),
        n.exports
    }),
    System.registerDynamic("19", [], !0, function(t, e, n) {
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
    }),
    System.registerDynamic("1c", ["19"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return void 0 === t && (t = {}),
            function(e, n) {
                var r = u.get(c, e.constructor) || [];
                r.push({
                    name: n,
                    options: t
                }),
                u.set(c, e.constructor, r)
            }
        }
        function i(t) {
            return function(e) {
                u.set(f, e, t)
            }
        }
        function o(t) {
            return u.get(f, t)
        }
        function a(t) {
            return u.get(c, t)
        }
        function s(t) {
            return Object.keys(t).filter(function(e) {
                return "connected" !== e && "disconnected" !== e && "invalidVersion" !== e && "function" == typeof t[e]
            }).map(function(t) {
                return {
                    name: t,
                    options: {}
                }
            })
        }
        function l(t) {
            return a(t) || s(t.prototype)
        }
        var u = t("19")
          , c = []
          , f = [];
        return e.Method = r,
        e.Socket = i,
        e.getSocketMetadata = o,
        e.getMethodMetadata = a,
        e.getMethods = l,
        n.exports
    }),
    System.registerDynamic("socketPony wrapper", ["possible socket methods?", "ClientSocket", "1c"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            for (var n in t)
                e.hasOwnProperty(n) || (e[n] = t[n])
        }
        r(t("possible socket methods?"));
        var i = t("ClientSocket");
        e.ClientSocket = i.ClientSocket;
        var o = t("1c");
        return e.Method = o.Method,
        n.exports
    }),
    System.registerDynamic("<socketPony wrapper passthrough>", ["socketPony wrapper"], !0, function(t, e, n) {
        return n.exports = t("socketPony wrapper"),
        n.exports
    }),
    System.registerDynamic("1f", ["20", "21", "22", "23", "24"], !0, function(t, e, n) {
        "use strict";
        var r = t("20")
          , i = t("21")
          , o = t("22")
          , a = t("23")
          , s = t("24")
          , l = function() {
            function t(t, e, n) {
                this.id = t,
                this.x = e,
                this.y = n,
                this.entities = [],
                this.entitiesDrawn = 0,
                this.tiles = new Uint8Array(i.REGION_SIZE * i.REGION_SIZE),
                this.tileIndices = new Int16Array(i.REGION_SIZE * i.REGION_SIZE),
                this.randoms = new Int16Array(i.REGION_SIZE * i.REGION_SIZE);
                for (var r = 0; r < this.tiles.length; r++)
                    this.tiles[r] = a.TileType.Dirt,
                    this.tileIndices[r] = -1,
                    this.randoms[r] = Math.floor(1e3 * Math.random())
            }
            return t.prototype.getTiles = function() {
                return this.tiles
            }
            ,
            t.prototype.load = function(t) {
                this.tiles = t;
                for (var e = 0; e < this.tiles.length; e++)
                    this.tileIndices[e] = -1
            }
            ,
            t.prototype.canWalk = function(t, e) {
                if (t < 0 || e < 0 || t > i.REGION_SIZE || e > i.REGION_SIZE)
                    return !1;
                var n = this.getTile(t, e);
                return n && a.canWalk(n)
            }
            ,
            t.prototype.getTile = function(t, e) {
                return this.tiles[(0 | t) + (0 | e) * i.REGION_SIZE]
            }
            ,
            t.prototype.setTile = function(t, e, n) {
                this.tiles[Math.floor(t) + Math.floor(e) * i.REGION_SIZE] = n
            }
            ,
            t.prototype.setDirty = function(t, e) {
                this.tileIndices[Math.floor(t) + Math.floor(e) * i.REGION_SIZE] = -1
            }
            ,
            t.prototype.drawEntities = function(t, e) {
                var n = this;
                this.entitiesDrawn = 0,
                this.entities.sort(function(t, e) {
                    return t.y === e.y ? t.x - e.x : t.y - e.y
                }),
                this.entities.forEach(function(r) {
                    r.draw && e.isVisible(r) && (r.draw(t),
                    n.entitiesDrawn++),
                    i.debug.showHelpers && (t.globalAlpha = .3,
                    r.collider && t.drawRect(s.RED, Math.round((r.x + r.collider.x) * i.tileWidth), Math.round((r.y + r.collider.y) * i.tileHeight), Math.round(r.collider.w * i.tileWidth), Math.round(r.collider.h * i.tileHeight)),
                    r.bounds && t.drawRect(s.ORANGE, Math.round(r.x * i.tileWidth + r.bounds.x), Math.round(r.y * i.tileHeight + r.bounds.y), Math.round(r.bounds.w), Math.round(r.bounds.h)),
                    r.coverBounds && t.drawRect(s.BLUE, Math.round(r.x * i.tileWidth + r.coverBounds.x), Math.round(r.y * i.tileHeight + r.coverBounds.y), Math.round(r.coverBounds.w), Math.round(r.coverBounds.h)),
                    t.globalAlpha = 1)
                })
            }
            ,
            t.prototype.drawTiles = function(t, e, n) {
                var r = this.x * i.REGION_SIZE
                  , a = this.y * i.REGION_SIZE;
                if (e.isRectVisible(r * i.tileWidth, a * i.tileHeight, i.REGION_SIZE * i.tileWidth, i.REGION_SIZE * i.tileHeight))
                    for (var s = o.clamp(Math.floor(e.x / i.tileWidth - r), 0, i.REGION_SIZE), l = o.clamp(Math.floor(e.y / i.tileHeight - a), 0, i.REGION_SIZE), u = o.clamp(Math.ceil((e.x + e.w) / i.tileWidth - r), 0, i.REGION_SIZE), c = o.clamp(Math.ceil((e.y + e.h) / i.tileHeight - a), 0, i.REGION_SIZE), f = l; f <= c; f++)
                        for (var p = s; p < u; p++)
                            this.drawMapTile(t, p, f, p + r, f + a, n)
            }
            ,
            t.prototype.getTileType = function(t, e, n) {
                return t >= 0 && e >= 0 && t < i.REGION_SIZE && e < i.REGION_SIZE ? this.getTile(t, e) : n.getTile(t + this.x * i.REGION_SIZE, e + this.y * i.REGION_SIZE)
            }
            ,
            t.prototype.updateTileIndex = function(t, e, n) {
                var r, o = this.getTile(t, e), s = 0;
                o === a.TileType.Dirt ? r = 47 : o === a.TileType.Grass && (s += this.getTileType(t - 1, e - 1, n) === o ? 1 : 0,
                s += this.getTileType(t, e - 1, n) === o ? 2 : 0,
                s += this.getTileType(t + 1, e - 1, n) === o ? 4 : 0,
                s += this.getTileType(t - 1, e, n) === o ? 8 : 0,
                s += this.getTileType(t + 1, e, n) === o ? 16 : 0,
                s += this.getTileType(t - 1, e + 1, n) === o ? 32 : 0,
                s += this.getTileType(t, e + 1, n) === o ? 64 : 0,
                s += this.getTileType(t + 1, e + 1, n) === o ? 128 : 0,
                r = a.TILE_MAP[s]);
                var l = a.TILE_COUNT_MAP[r]
                  , u = a.TILE_MAP_MAP[r] + (l > 1 ? this.randoms[t + e * i.REGION_SIZE] % l : 0);
                return this.tileIndices[t + e * i.REGION_SIZE] = u
            }
            ,
            t.prototype.drawMapTile = function(t, e, n, o, a, s) {
                var l = this.tileIndices[e + n * i.REGION_SIZE];
                l === -1 && (l = this.updateTileIndex(e, n, s));
                var u = 8
                  , c = l % u
                  , f = Math.floor(l / u)
                  , p = c * i.tileWidth
                  , h = f * i.tileHeight;
                t.drawImage(r.tileSprite.tex, null , p, h, i.tileWidth, i.tileHeight, o * i.tileWidth, a * i.tileHeight, i.tileWidth, i.tileHeight)
            }
            ,
            t
        }();
        return e.Region = l,
        n.exports
    }),
    System.registerDynamic("25", ["21"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = function() {
            function t(t, e, n, r) {
                this.id = t,
                this.x = e,
                this.y = n,
                this.sprite = r,
                this.type = "doodad";
                var i = this.sprite.w
                  , o = this.sprite.h;
                this.bounds = {
                    x: -i / 2,
                    y: -o,
                    w: i,
                    h: o
                }
            }
            return t.prototype.draw = function(t) {
                var e = this.sprite.w
                  , n = this.sprite.h;
                t.drawSprite(this.sprite, null , Math.round(this.x * r.tileWidth + -e / 2), Math.round(this.y * r.tileHeight - n))
            }
            ,
            t
        }();
        return e.Doodad = i,
        n.exports
    }),
    System.registerDynamic("26", ["21"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = 8
          , o = function() {
            function t(t, e, n, r) {
                this.id = t,
                this.x = e,
                this.y = n,
                this.sprites = r,
                this.type = "animated",
                this.time = 5 * Math.random();
                var i = r[0]
                  , o = i.w
                  , a = i.h;
                this.bounds = {
                    x: -o / 2,
                    y: -a,
                    w: o,
                    h: a
                }
            }
            return t.prototype.update = function(t) {
                this.time += t
            }
            ,
            t.prototype.draw = function(t) {
                var e = Math.floor(this.time * i) % this.sprites.length
                  , n = this.sprites[e]
                  , o = n.w
                  , a = n.h;
                t.drawSprite(n, null , Math.round(this.x * r.tileWidth - o / 2), Math.round(this.y * r.tileHeight - a))
            }
            ,
            t
        }();
        return e.Animated = o,
        n.exports
    }),
    System.registerDynamic("27", ["<lodash core passthrough>", "20", "22", "21", "24"], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n) {
            return {
                x: t.ox + e,
                y: t.oy + n,
                w: t.w,
                h: t.h
            }
        }
        function i(t) {
            return {
                bounds: {
                    x: -t.w / 2,
                    y: -t.h,
                    w: t.w,
                    h: t.h
                },
                draw: function(e) {
                    e.drawSprite(t, null , Math.round(this.x * w.tileWidth - t.w / 2), Math.round(this.y * w.tileHeight - t.h))
                }
            }
        }
        function o(t, e, n, i) {
            return {
                bounds: _.addRects(r(t, -n, -i), r(e, -n, -i)),
                draw: function(r) {
                    var o = Math.round(this.x * w.tileWidth - n)
                      , a = Math.round(this.y * w.tileHeight - i);
                    r.drawSprite(e, x.SHADOW_COLOR, o, a),
                    r.drawSprite(t, null , o, a)
                }
            }
        }
        function a() {
            var t = b.tree.stump
              , n = b.tree.stumpShadow
              , i = b.tree.trunk;
            return {
                bounds: _.addRects(_.addRects(r(t, -e.treeOffsetX, -e.treeOffsetY), r(i, -e.treeOffsetX, -e.treeOffsetY)), r(n, -e.treeOffsetX, -e.treeOffsetY)),
                coverBounds: {
                    x: -50,
                    y: -135,
                    w: 110,
                    h: 120
                },
                draw: function(r) {
                    var o = Math.round(this.x * w.tileWidth - e.treeOffsetX)
                      , a = Math.round(this.y * w.tileHeight - e.treeOffsetY);
                    r.drawSprite(n, x.SHADOW_COLOR, o, a),
                    r.drawSprite(t, null , o, a),
                    r.globalAlpha = 1 - .6 * (this.coverLifting || 0),
                    r.drawSprite(i, null , o, a),
                    r.globalAlpha = 1
                }
            }
        }
        function s() {
            var t = b.tree.crown
              , n = b.tree.shadow;
            return {
                bounds: _.addRects(r(t, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset), r(n, -e.treeOffsetX, -e.treeOffsetY - e.treeOffset)),
                coverBounds: {
                    x: -50,
                    y: -135 - e.treeOffset,
                    w: 110,
                    h: 120
                },
                draw: function(r) {
                    var i = Math.round(this.x * w.tileWidth - e.treeOffsetX)
                      , o = Math.round(this.y * w.tileHeight - e.treeOffsetY - e.treeOffset);
                    r.drawSprite(n, x.SHADOW_COLOR, i, o),
                    r.globalAlpha = 1 - .6 * (this.coverLifting || 0),
                    r.drawSprite(t, null , i, o),
                    r.globalAlpha = 1
                }
            }
        }
        function l(t) {
            return $ ? t : {}
        }
        function u(t, e, n, r) {
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
            return y.assign.apply(void 0, [{
                type: t,
                id: e,
                x: n,
                y: r
            }].concat(i))
        }
        function f(t, e, n) {
            return c("apple", t, e, n, {
                interactive: !0
            }, l(o(b.apple.color, b.apple.shadow, 4, 4)), {
                bounds: {
                    x: -8,
                    y: -8,
                    w: 16,
                    h: 16
                }
            })
        }
        function p(t, e, n, r) {
            return c("sign", t, e, n, {
                interactive: !0
            }, l(i(b.sign)), r, {
                options: r
            })
        }
        function h(t, e, n) {
            return c("rock", t, e, n, u(-.5, -.25, 1, .5), l(o(b.rock.color, b.rock.shadow, 15, 15)))
        }
        function d(t, e, n) {
            return c("pumpkin", t, e, n, u(-.35, -.25, .7, .5), l(o(b.pumpkin.color, b.pumpkin.shadow, 11, 15)))
        }
        function m(t, e, n) {
            return c("tree", t, e, n, u(-.5, 0, 1, .5), l(a()))
        }
        function v(t, e, n) {
            return c("tree-crown", t, e, n, l(s()))
        }
        function g(t, n, r) {
            return c("tree-stump", t, n, r, u(-.5, -.1, 1, .5), l(o(b.tree.stump, b.tree.stumpShadow, e.treeOffsetX, e.treeOffsetY)))
        }
        var y = t("<lodash core passthrough>")
          , b = t("20")
          , _ = t("22")
          , w = t("21")
          , x = t("24")
          , $ = "undefined" != typeof window;
        return e.treeOffsetX = 72,
        e.treeOffsetY = 162,
        e.treeOffset = 30,
        e.createApple = f,
        e.createSign = p,
        e.createRock = h,
        e.createPumpkin = d,
        e.createTree = m,
        e.createTreeCrown = v,
        e.createTreeStump = g,
        n.exports
    }),
    System.registerDynamic("29", ["<lodash core passthrough>"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t.replace(s, function(t) {
                return o.repeat("*", t.length)
            })
        }
        function i(t) {
            return /[\u0400-\u04FF]/.test(t)
        }
        var o = t("<lodash core passthrough>")
          , a = ["all?ahu?", "aids", "akbar", "alt ?[+-] ?f4", "anal", "anus", "(bitch)?ass(fuck|hole|hat|licker|wipe)?", "autis(ts?|ms?|tic)", "bitch(e?s)?", "(blow|hoof|foot|hand|rim) ?jobs?", "boners?", "boob(s|ie|ies)?", "buttplugs?", "can[cs]er(s|ous)?", "(horse|mare)?cocks?", "clit(oris)?", "(ctrl|control) ?[+-]? ?w", "cum(s|ming)?", "cumdump(sters?)?", "cunts?", "deepthroat(ing)?", "(horse)?dicks?", "dildos?", "fap(p?ing)?", "foalcon", "(brony|furry?|gay|horse|pony|nigg?er)?fag(s|g?[oi]t(s|ry)?)?", "(brony|furry?|gay|horse|pony|nigg?er|butt|mother)?fu(c|k|cc|ck)(ed|er|ing?|able|face)?", "gang ?bang(ed|ing)?", "hitlers?", "(in|self)cest", "jizz(ed|ing)?", "lubed?", "masturbat(e|tion|ing)?", "milfs?", "molest(ation|ing|ed|ia)?", "nazi(s|sm|sts?)?", "negros?", "nigg?as?", "nigg?[e3](rs?|st)?", "norm(y|ies?)", "orgasms?", "org(y|ies)", "piss(ing)?", "penis(es)?", "porno?", "prostitutes?", "(octo|horse|pony)?puss(y|ies)?(juice)?", "raep", "rap(e|ed|es|ing)", "retards?", "sieg ?h[ea]il", "semen", "(anal|butt)?(sex|secks|secs|seks)", "(bull)?shit(s|ting)?", "slut(s|ty)?", "spunk", "(cock)?suck(ing|er)?", "tit(s|ty|ties?)?", "tranny", "wank(ing|ers?)?", "whores?", "vaginas?", "vulva"]
          , s = new RegExp("\\b(" + a.join("|") + ")\\b","gi");
        return e.filterBadWords = r,
        e.containsCyrillic = i,
        n.exports
    }),
    System.registerDynamic("2a", ["<socketPony wrapper passthrough>", "22", "21", "2b", "2c", "1f", "25", "26", "27", "20", "2d", "29", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return y.account.settings.filterSwearWords ? g.filterBadWords(t) : t
        }
        var i = this && this.__decorate || function(t, e, n, r) {
            var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                a = Reflect.decorate(t, e, n, r);
            else
                for (var s = t.length - 1; s >= 0; s--)
                    (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
            return o > 3 && a && Object.defineProperty(e, n, a),
            a
        }
          , o = this && this.__metadata || function(t, e) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                return Reflect.metadata(t, e)
        }
          , a = t("<socketPony wrapper passthrough>")
          , s = t("22")
          , l = t("21")
          , u = t("2b")
          , c = t("2c")
          , f = t("1f")
          , p = t("25")
          , h = t("26")
          , d = t("27")
          , m = t("20")
          , v = t("2d")
          , g = t("29")
          , y = t("ponytownapp settings")
          , b = s.setupSetTes
          , _ = v.default.game
          , w = [5, 9, 10, 6, 6, 6, 6, 1]
          , x = function() {
            function t(t, e) {
                this.gameService = t,
                this.server = e
            }
            return t.prototype.connected = function() {
                _.player = null ,
                _.map = new c.Map(0,0),
                this.gameService.joined()
            }
            ,
            t.prototype.disconnected = function() {
                this.gameService.disconnected()
            }
            ,
            t.prototype.invalidVersion = function() {
                location.reload()
            }
            ,
            t.prototype.map = function(t) {
                _.baseTime = Date.now() - t.time,
                _.map = new c.Map(t.regionsX,t.regionsY)
            }
            ,
            t.prototype.subscribeRegion = function(t, e, n) {
                var r = new f.Region(0,t,e);
                r.load(n),
                _.map.setRegion(t, e, r)
            }
            ,
            t.prototype.unsubscribeRegion = function(t, e) {
                _.map.setRegion(t, e, null )
            }
            ,
            t.prototype.updateTile = function(t, e, n) {
                _.map.setTile(t, e, n)
            }
            ,
            t.prototype.myEntityId = function(t) {
                this.myId = t,
                _.player = _.map.findEntity(t),
                b(_.player)
            }
            ,
            t.prototype.addEntities = function(t) {
                var e = this;
                t.forEach(function(t) {
                    var n = t[0]
                      , r = t[1]
                      , i = t[2]
                      , o = t[3]
                      , a = t[4]
                      , s = t[5]
                      , l = t[6]
                      , u = t[7];
                    return e.addEntity(n, r, i, o, a, s, l, u)
                })
            }
            ,
            t.prototype.addEntity = function(t, e, n, i, o, a, s, l) {
                var c;
                if ("cloud" === e)
                    c = new p.Doodad(t,i,o,m.cloud);
                else if ("apple" === e)
                    c = d.createApple(t, i, o);
                else if ("rock" === e)
                    c = d.createRock(t, i, o);
                else if ("sign" === e)
                    c = d.createSign(t, i, o, n);
                else if ("tree" === e)
                    c = d.createTree(t, i, o);
                else if ("tree-crown" === e)
                    c = d.createTreeCrown(t, i, o);
                else if ("tree-stump" === e)
                    c = d.createTreeStump(t, i, o);
                else if ("pumpkin" === e)
                    c = d.createPumpkin(t, i, o);
                else if ("butterfly" === e)
                    c = new h.Animated(t,i,o,m.butterfly);
                else if ("pony" === e) {
                    var f = n.info;
                    y.account.settings.filterSwearWords && f.cmo && (f.cm = null ),
                    c = new u.Pony(t,f,l),
                    c.name = r(n.name),
                    c.collider = {
                        x: -.4,
                        y: -.2,
                        w: .8,
                        h: .4
                    },
                    c.canCollide = !0
                } else
                    console.error("unknown entity type", e);
                c && (c.id = t,
                c.x = i,
                c.y = o,
                c.vx = a,
                c.vy = s,
                _.map.addEntity(c))
            }
            ,
            t.prototype.removeEntity = function(t) {
                _.map.removeEntity(t)
            }
            ,
            t.prototype.updateEntity = function(t, e, n, r, i) {
                var o = _.map.findEntity(t);
                o !== _.player && (o ? (o.x = e,
                o.y = n,
                o.vx = r,
                o.vy = i) : console.error("updateEntity: missing entity", t))
            }
            ,
            t.prototype.updateEntities = function(t, e) {
                var n = this;
                t.forEach(function(t) {
                    var e = t[0]
                      , r = t[1]
                      , i = t[2]
                      , o = t[3]
                      , a = t[4];
                    return n.updateEntity(e, r, i, o, a)
                }),
                e.forEach(function(t) {
                    return n.removeEntity(t)
                })
            }
            ,
            t.prototype.updateEntityOptions = function(t, e) {
                var n = _.map.findEntity(t);
                n ? Object.keys(e).forEach(function(t) {
                    return n[t] = e[t]
                }) : console.error("updateEntityExtended: missing entity", t)
            }
            ,
            t.prototype.says = function(t, e, n) {
                var i = _.map.findEntity(t);
                if (i) {
                    var o = i.id === this.myId;
                    if (!o && y.account.settings.filterCyrillic && g.containsCyrillic(e))
                        return;
                    i.says = {
                        message: o ? e : r(e),
                        timer: l.SAYS_TIME,
                        type: n
                    }
                } else
                    console.error("says: missing entity", t)
            }
            ,
            t.prototype.left = function() {
                _.player = null ,
                _.map = new c.Map(0,0),
                this.gameService.left()
            }
            ,
            i([a.Method(), o("design:type", Function), o("design:paramtypes", [Object]), o("design:returntype", void 0)], t.prototype, "map", null ),
            i([a.Method({
                binary: [1, 1, [1]]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number, Array]), o("design:returntype", void 0)], t.prototype, "subscribeRegion", null ),
            i([a.Method({
                binary: [1, 1]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number]), o("design:returntype", void 0)], t.prototype, "unsubscribeRegion", null ),
            i([a.Method({
                binary: [3, 3, 1]
            }), o("design:type", Function), o("design:paramtypes", [Number, Number, Number]), o("design:returntype", void 0)], t.prototype, "updateTile", null ),
            i([a.Method({
                binary: [5]
            }), o("design:type", Function), o("design:paramtypes", [Number]), o("design:returntype", void 0)], t.prototype, "myEntityId", null ),
            i([a.Method({
                binary: [w]
            }), o("design:type", Function), o("design:paramtypes", [Array]), o("design:returntype", void 0)], t.prototype, "addEntities", null ),
            i([a.Method({
                binary: w
            }), o("design:type", Function), o("design:paramtypes", [Number, String, Object, Number, Number, Number, Number, Number]), o("design:returntype", void 0)], t.prototype, "addEntity", null ),
            i([a.Method({
                binary: [[5, 6, 6, 6, 6, 1], [5]]
            }), o("design:type", Function), o("design:paramtypes", [Array, Array]), o("design:returntype", void 0)], t.prototype, "updateEntities", null ),
            i([a.Method(), o("design:type", Function), o("design:paramtypes", [Number, Object]), o("design:returntype", void 0)], t.prototype, "updateEntityOptions", null ),
            i([a.Method(), o("design:type", Function), o("design:paramtypes", [Number, String, Number]), o("design:returntype", void 0)], t.prototype, "says", null ),
            i([a.Method(), o("design:type", Function), o("design:paramtypes", []), o("design:returntype", void 0)], t.prototype, "left", null ),
            t
        }();
        return e.ClientActions = x,
        n.exports
    }),
    System.registerDynamic("game service", ["<bluebird passthrough>", "<lodash core passthrough>", "<socketPony wrapper passthrough>", "22", "2d", "2a", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        var r = t("<bluebird passthrough>")
          , i = t("<lodash core passthrough>")
          , o = t("<socketPony wrapper passthrough>")
          , a = t("22")
          , s = t("2d")
          , l = t("2a")
          , u = t("ponytownapp settings")
          , c = s.default.game
          , f = function() {
            function t(t, e) {
                this.$timeout = t,
                this.model = e,
                this.playing = !1,
                this.joining = !1,
                this.offline = !1,
                this.servers = [],
                e.account && this.updateStatus()
            }
            return Object.defineProperty(t.prototype, "canPlay", {
                get: function() {
                    return !!this.model.pony && !!this.model.pony.name && !this.joining && this.server && !this.server.offline
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.updateStatus = function() {
                var t = this;
                r.resolve().then(function() {
                    return t.joining || t.playing ? null : t.model.status().then(function(e) {
                        t.offline = !1,
                        t.version = e.version,
                        i.merge(t.servers, e.servers),
                        !t.server && u.account.settings.defaultServer && (t.server = t.servers.find(function(t) {
                            return t.id === u.account.settings.defaultServer
                        }))
                    }).catch(function(e) {
                        return t.offline = "Server is offline" === e.message
                    })
                }).then(function() {
                    return setTimeout(function() {
                        return t.updateStatus()
                    }, 5e3)
                })
            }
            ,
            t.prototype.join = function(t) {
                var e = this;
                return this.playing || this.joining ? r.resolve() : (this.joining = !0,
                this.model.join(this.server.id, t).then(function(t) {
                    var n = new o.ClientSocket(t);
                    n.client = new l.ClientActions(e,n.server),
                    n.connect(),
                    c.socket = n;
                    var r = a.start(c)
                      , i = r.promise
                      , s = r.cancel;
                    return e.cancelGameLoop = s,
                    i
                }).catch(function(t) {
                    throw e.left(),
                    t
                }))
            }
            ,
            t.prototype.leave = function() {
                c.socket && (c.socket.isConnected ? c.socket.server.leave() : c.socket.disconnect()),
                this.left()
            }
            ,
            t.prototype.joined = function() {
                var t = this;
                this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function() {
                    t.joining = !1,
                    t.playing = !0
                })
            }
            ,
            t.prototype.left = function() {
                var t = this;
                this.cancelGameLoop && (this.cancelGameLoop(),
                this.cancelGameLoop = null ),
                this.$timeout.cancel(this.disconnectedTimeout),
                this.$timeout(function() {
                    t.joining = !1,
                    t.playing = !1
                }),
                c.release()
            }
            ,
            t.prototype.disconnected = function() {
                var t = this;
                this.$timeout.cancel(this.disconnectedTimeout),
                this.disconnectedTimeout = this.$timeout(function() {
                    return t.left()
                }, 1e4)
            }
            ,
            t.$inject = ["$timeout", "model"],
            t
        }();
        return e.GameService = f,
        n.exports
    }),
    System.registerDynamic("30", ["<bluebird passthrough>", "<lodash core passthrough>", "22", "31", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t.length ? t[0] : l.createDefaultPony()
        }
        function i(t, e) {
            return e.lastUsed && t.lastUsed ? e.lastUsed.localeCompare(t.lastUsed) : 0
        }
        var o = t("<bluebird passthrough>")
          , a = t("<lodash core passthrough>")
          , s = t("22")
          , l = t("31")
          , u = t("ponytownapp settings")
          , c = function() {
            function t(t) {
                var e = this;
                this.$http = t,
                this.saving = !1,
                this.account = u.account,
                this.ponies = [],
                this._pony = l.createDefaultPony(),
                this.account && this.getPonies().then(function(t) {
                    e.ponies = t.sort(i),
                    e.selectPony(r(e.ponies))
                })
            }
            return Object.defineProperty(t.prototype, "pony", {
                get: function() {
                    return this._pony
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.selectPony = function(t) {
                this._pony = a.cloneDeep(t)
            }
            ,
            t.prototype.updateAccount = function(t) {
                var e = this;
                return s.toPromise(this.$http.post("/api/account-update", {
                    account: t
                })).tap(function(t) {
                    return a.merge(e.account, t)
                })
            }
            ,
            t.prototype.saveSettings = function(t) {
                var e = this;
                return s.toPromise(this.$http.post("/api/account-settings", {
                    settings: t
                })).tap(function(t) {
                    return a.merge(e.account, t)
                })
            }
            ,
            t.prototype.getPonies = function() {
                return s.toPromise(this.$http.get("/api/pony")).then(function(t) {
                    return t.map(l.decompressPonyInfo)
                })
            }
            ,
            t.prototype.savePony = function(t) {
                var e = this;
                return this.saving ? o.reject(new Error("Saving in progress")) : (this.saving = !0,
                s.toPromise(this.$http.post("/api/pony/save", {
                    pony: t
                })).then(l.decompressPonyInfo).tap(function(n) {
                    a.remove(e.ponies, function(e) {
                        return e.id === t.id
                    }),
                    e.ponies.push(n),
                    e.ponies.sort(i),
                    e.pony === t && e.selectPony(n)
                }).finally(function() {
                    return e.saving = !1
                }))
            }
            ,
            t.prototype.removePony = function(t) {
                var e = this;
                return s.toPromise(this.$http.post("/api/pony/remove", {
                    id: t.id
                })).then(function() {
                    a.remove(e.ponies, function(e) {
                        return e.id === t.id
                    }),
                    e.pony === t && e.selectPony(r(e.ponies))
                })
            }
            ,
            t.prototype.status = function() {
                return s.toPromise(this.$http.get("/api/game/status"))
            }
            ,
            t.prototype.join = function(t, e) {
                return s.toPromise(this.$http.post("/api/game/join", {
                    serverId: t,
                    ponyId: e
                }))
            }
            ,
            t.$inject = ["$http"],
            t
        }();
        return e.Model = c,
        n.exports
    }),
    System.registerDynamic("32", ["22"], !0, function(t, e, n) {
        "use strict";
        var r = t("22")
          , i = {
            left: 0,
            top: 0
        }
          , o = function() {
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
            return t.prototype.setupEvents = function(t, e, n, o) {
                var a = this;
                t.addEventListener(e, function(e) {
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
                        var s, l = e, u = function(t) {
                            l = t,
                            t.preventDefault(),
                            a.send(t, "drag")
                        }, c = function(t) {
                            r.getButton(t) === a.button && (r.isTouch(t) || (l = t),
                            s())
                        };
                        s = function() {
                            a.send(l, "end"),
                            window.removeEventListener(n, u),
                            window.removeEventListener(o, c),
                            window.removeEventListener("blur", s),
                            a.dragging = !1
                        }
                        ,
                        window.addEventListener(n, u),
                        window.addEventListener(o, c),
                        window.addEventListener("blur", s),
                        e.stopPropagation()
                    }
                })
            }
            ,
            t.prototype.send = function(t, e) {
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
        e.default = ["$parse", "applyCallback", function(t, e) {
            return {
                restrict: "A",
                compile: function(n, r) {
                    var i = t(r.agDrag);
                    return function(t, n) {
                        var a = new o(n[0]);
                        a.drag = function(n) {
                            return e(function() {
                                i(t, n)
                            })
                        }
                        ,
                        a.relative = r.agDragRelative
                    }
                }
            }
        }
        ],
        n.exports
    }),
    System.registerDynamic("33", [], !0, function(t, e, n) {
        return n.exports = '<div ng-class="{ disabled: vm.isDisabled }" class="color-picker"><div ng-style="{ background: vm.bg }" class="color-picker-box"></div><input type="text" ng-focus="vm.focus($event)" ng-blur="vm.open = false" ng-model="vm.inputColor" ng-disabled="vm.isDisabled" spellcheck="false" ng-change="vm.inputChanged()" class="form-control"><div ng-class="{ open: vm.open }" class="dropdown"><div ng-mousedown="$event.stopPropagation(); $event.preventDefault();" class="dropdown-menu dropdown-menu-right color-picker-menu"><div class="color-picker-content"><div ag-drag="vm.dragSV($event)" ag-drag-relative="self" class="color-picker-sv"><div ng-style="{ background: vm.hue }" class="color-picker-sv-bg"><div class="color-picker-sv-overlay-white"><div class="color-picker-sv-overlay-black"></div></div></div><div ng-style="{ left: vm.svLeft + \'%\', top: vm.svTop + \'%\' }" class="color-wheel-circle-sv"><div></div></div></div><div ag-drag="vm.dragHue($event)" ag-drag-relative="self" class="color-picker-hue"><div ng-style="{ top: vm.hueTop + \'%\' }" class="color-wheel-circle-hue"><div></div></div></div></div></div></div></div>',
        n.exports
    }),
    System.registerDynamic("34", ["22", "35", "33"], !0, function(t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("35")
          , o = 175
          , a = function() {
            function t(t) {
                this.$timeout = t,
                this.s = 0,
                this.v = 0,
                this.h = 0,
                this.lastColor = ""
            }
            return t.prototype.focus = function(t) {
                this.open = !0,
                event.target.select()
            }
            ,
            t.prototype.dragSV = function(t) {
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
            t.prototype.dragHue = function(t) {
                var e = t.event
                  , n = t.y;
                e.preventDefault(),
                this.updateHsv(),
                this.h = r.clamp(360 * n / o, 0, 360),
                this.updateColor()
            }
            ,
            t.prototype.updateHsv = function() {
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
            t.prototype.updateColor = function() {
                var t = i.default.fromHsva(this.h, this.s, this.v, 1).css()
                  , e = this.color !== t;
                this.lastColor = this.color = t,
                e && this.changed && this.changed({
                    $value: t
                })
            }
            ,
            t.prototype.inputChanged = function() {
                var t = this;
                this.$timeout(function() {
                    t.changed && t.changed({
                        $value: t.color
                    })
                }, 0)
            }
            ,
            Object.defineProperty(t.prototype, "inputColor", {
                get: function() {
                    return this.isDisabled && this.disabledColor ? this.disabledColor : this.color
                },
                set: function(t) {
                    this.isDisabled || (this.color = t)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "bg", {
                get: function() {
                    return i.default.parseWithAlpha(this.inputColor, 1).css()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "svLeft", {
                get: function() {
                    return this.updateHsv(),
                    100 * this.s
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "svTop", {
                get: function() {
                    return this.updateHsv(),
                    100 * (1 - this.v)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "hueTop", {
                get: function() {
                    return this.updateHsv(),
                    100 * this.h / 360
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "hue", {
                get: function() {
                    return this.updateHsv(),
                    i.default.fromHsva(this.h, 1, 1, 1).css()
                },
                enumerable: !0,
                configurable: !0
            }),
            t.$inject = ["$timeout"],
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
    }),
    System.registerDynamic("36", [], !0, function(t, e, n) {
        "use strict";
        var r = function() {
            function t() {}
            return t.prototype.toggle = function() {
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
    }),
    System.registerDynamic("37", [], !0, function(t, e, n) {
        return n.exports = '<div class="row form-group"><div class="col-sm-4"><check-box ng-if="vm.hasLock &amp;&amp; !vm.nonLockable" checked="vm.locked" icon="fa-lock" changed="vm.lockChanged($value)" title="Automatic color" class="lock-box"></check-box><label class="control-label text-muted">{{vm.label || \'Color\'}}</label></div><div class="col-sm-8"><color-picker color="vm.fill" is-disabled="vm.locked" changed="vm.fillChanged($value)"></color-picker></div></div><div ng-if="!vm.outlineHidden" class="row form-group"><div class="col-sm-4"><check-box checked="vm.outlineLocked" icon="fa-lock" changed="vm.outlineLockChanged($value)" title="Automatic outline" class="lock-box"></check-box><label class="control-label text-muted">Outline</label></div><div class="col-sm-8"><color-picker color="vm.outline" is-disabled="vm.outlineLocked"></color-picker></div></div>',
        n.exports
    }),
    System.registerDynamic("38", ["39", "37"], !0, function(t, e, n) {
        "use strict";
        var r = t("39")
          , i = function() {
            function t() {}
            return t.prototype.fillChanged = function(t) {
                this.outlineLocked && (this.outline = r.fillToOutline(t))
            }
            ,
            t.prototype.lockChanged = function(t) {
                t && (this.fill = this.base,
                this.outlineLockChanged(this.outlineLocked))
            }
            ,
            t.prototype.outlineLockChanged = function(t) {
                t && (this.outline = r.fillToOutline(this.fill))
            }
            ,
            t.prototype.$onChanges = function(t) {
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
    }),
    System.registerDynamic("3a", ["22", "35", "3b"], !0, function(t, e, n) {
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
            e.fill && u.drawColoredSprite(t, e.fill, n, o, a),
            e.outline && u.drawColoredSprite(t, e.outline, r, o, a),
            e.extra && u.drawSprite(t, e.extra, o, a)
        }
        function a(t, e) {
            return Array.isArray(t) ? t[e] : t
        }
        var s = t("22")
          , l = t("35")
          , u = t("3b")
          , c = 52
          , f = function() {
            function t(t, e) {
                var n = this;
                this.$element = e,
                t.$watch("vm.sprite", function() {
                    return n.redraw()
                }),
                t.$watch("vm.circle", function() {
                    return n.redraw()
                });
                for (var r = 0; r < 6; r++)
                    t.$watch("vm.fill[" + r + "]", function() {
                        return n.redraw()
                    }),
                    t.$watch("vm.outline[" + r + "]", function() {
                        return n.redraw()
                    })
            }
            return t.prototype.redraw = function() {
                var t = this;
                clearTimeout(this.timeout),
                this.timeout = setTimeout(function() {
                    var e = t.$element[0].firstChild;
                    e.width = c,
                    e.height = c;
                    var n = e.getContext("2d");
                    n.save(),
                    n.clearRect(0, 0, e.width, e.height);
                    var r = t.sprite;
                    if (r) {
                        t.circle && (n.fillStyle = l.default.parse(t.circle).css(),
                        n.beginPath(),
                        n.arc(e.width / 2, e.height / 2, e.width / 3, 0, 2 * Math.PI),
                        n.fill()),
                        n.scale(2, 2),
                        s.disableImageSmoothing(n);
                        var u = {
                            x: 0,
                            y: 0,
                            w: 0,
                            h: 0
                        };
                        Array.isArray(r) ? (r.forEach(function(t) {
                            return i(u, t)
                        }),
                        r.forEach(function(e, r) {
                            return o(n, e, a(t.fill, r), a(t.outline, r), u)
                        })) : (i(u, r),
                        o(n, r, a(t.fill, 0), a(t.outline, 0), u))
                    }
                    n.restore()
                })
            }
            ,
            t.prototype.$onInit = function() {
                this.redraw()
            }
            ,
            t.prototype.$onChanges = function() {
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
    }),
    System.registerDynamic("3c", [], !0, function(t, e, n) {
        return n.exports = '<div class="selection-list"><div class="selection-list-content"><sprite-box ng-repeat="i in vm.sprites track by $index" ng-class="{ active: vm.selected === $index }" ng-click="vm.selected = $index" sprite="i" fill="vm.fill" outline="vm.outline" circle="vm.circle" class="selection-item"></sprite-box></div></div>',
        n.exports
    }),
    System.registerDynamic("3d", ["3c"], !0, function(t, e, n) {
        "use strict";
        var r = function() {
            function t() {}
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
    }),
    System.registerDynamic("3e", [], !0, function(t, e, n) {
        return n.exports = '<div ng-if="vm.compact"><div class="row form-group"><div class="col-sm-4"><label class="control-label">{{vm.label}}</label></div><div class="col-sm-8"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="!vm.compact"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">{{vm.label}}</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.type" sprites="vm.sprites" fill="vm.set.fills[0]" outline="vm.set.outlines[0]"></sprite-selection></div></div></div><div ng-if="vm.set.type &amp;&amp; vm.sets[vm.set.type].length &gt; 1"><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Color pattern</label></div></div><div class="row form-group"><div class="col-sm-12"><sprite-selection selected="vm.set.pattern" sprites="vm.sets[vm.set.type]" fill="vm.exampleFills" outline="vm.exampleOutlines"></sprite-selection></div></div></div><fill-outline ng-repeat="c in vm.set.fills track by $index" ng-if="vm.patternColors &gt; $index" label="Color {{$index + 1}}" base="vm.base" outline-hidden="vm.outlineHidden" fill="vm.set.fills[$index]" locked="vm.set.lockFills[$index]" non-lockable="$index === 0 &amp;&amp; vm.nonLockable" outline="vm.set.outlines[$index]" outline-locked="vm.set.lockOutlines[$index]"></fill-outline>',
        n.exports
    }),
    System.registerDynamic("3f", ["3e"], !0, function(t, e, n) {
        "use strict";
        var r = function() {
            function t() {
                this.exampleFills = ["Orange", "DodgerBlue", "LimeGreen", "Orchid", "crimson", "Aquamarine"],
                this.exampleOutlines = ["Chocolate", "SteelBlue", "ForestGreen", "DarkOrchid", "darkred", "DarkTurquoise"]
            }
            return Object.defineProperty(t.prototype, "patternColors", {
                get: function() {
                    var t = this.set && this.sets && this.sets[this.set.type] && this.sets[this.set.type][this.set.pattern];
                    return t ? t.length : this.nonLockable ? 1 : 0
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.$onChanges = function() {
                this.sprites = this.sets ? this.sets.map(function(t) {
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
    }),
    System.registerDynamic("40", ["35"], !0, function(t, e, n) {
        "use strict";
        var r = t("35")
          , i = function() {
            function t() {}
            return t.prototype.$onChanges = function(t) {
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
            t.prototype.draw = function(t) {
                this.bitmap && ("eraser" === this.tool ? this.bitmap[t] = "" : "brush" === this.tool ? this.bitmap[t] = r.default.parse(this.bitmap[t]).equal(r.default.parse(this.color)) ? "" : this.color : "eyedropper" === this.tool && (this.color = this.bitmap[t]))
            }
            ,
            t.prototype.colorAt = function(t) {
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
    }),
    System.registerDynamic("41", ["22", "31", "42", "43", "44"], !0, function(t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("31")
          , o = t("42")
          , a = t("43")
          , s = t("44")
          , l = 3
          , u = function() {
            function t(t) {
                this.$element = t
            }
            return t.prototype.$onInit = function() {
                var t = this;
                return this.canvas = this.$element[0].querySelector("canvas"),
                this.interval = setInterval(function() {
                    return t.draw()
                }, 1e3 / 24),
                s.loadSpriteSheets()
            }
            ,
            t.prototype.$onDestroy = function() {
                clearInterval(this.interval)
            }
            ,
            t.prototype.draw = function() {
                var t = l * r.getPixelRatio();
                o.resizeCanvasToElementSize(this.canvas);
                var e = Math.round(this.canvas.width / t)
                  , n = Math.round(this.canvas.height / t);
                this.buffer = this.buffer || r.createCanvas(e, n),
                o.resizeCanvas(this.buffer, e, n);
                var s = this.buffer.getContext("2d")
                  , u = Math.round(e / 2)
                  , c = Math.round(n / 2 + 28);
                this.noBackground ? s.clearRect(0, 0, e, n) : (s.fillStyle = "LightGreen",
                s.fillRect(0, 0, e, n)),
                this.pony && a.drawPony2D(s, i.toRenderInfo(this.pony), this.state || a.createDefaultPonyState(), u, c, !1);
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
            controller: u,
            controllerAs: "vm",
            bindings: {
                pony: "<",
                state: "<",
                noBackground: "<"
            },
            template: '<canvas class="character-preview"></canvas>'
        },
        n.exports
    }),
    System.registerDynamic("45", [], !0, function(t, e, n) {
        return n.exports = '<div class="chat-box"><i ng-click="vm.toggle()" class="fa fa-fw fa-comment chat-open-button game-button"></i><div ng-show="vm.isOpen" class="chat-input-box"><input ng-model="vm.message" ng-keydown="vm.keydown($event)" maxlength="{{::vm.maxSayLength}}" class="chat-input"><i ng-click="vm.send()" class="fa fa-fw fa-angle-double-right chat-send-button game-button"></i></div></div>',
        n.exports
    }),
    System.registerDynamic("46", ["21", "2d", "45"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("2d")
          , o = i.default.game
          , a = function() {
            function t(t, e) {
                var n = this;
                this.maxSayLength = r.SAY_MAX_LENGTH,
                this.isOpen = !1,
                this.input = e[0].querySelector(".chat-input"),
                o.onChat = function() {
                    return t(function() {
                        return n.chat()
                    })
                }
                ,
                o.onCommand = function() {
                    return t(function() {
                        return n.command()
                    })
                }
                ,
                o.onCancel = function() {
                    return t(function() {
                        return n.close()
                    })
                }
            }
            return t.prototype.send = function() {
                var t = (this.message || "").trim();
                this.close(),
                o.player && t && o.socket.server.say(t)
            }
            ,
            t.prototype.keydown = function(t) {
                13 === t.keyCode ? this.send() : 27 === t.keyCode && this.close()
            }
            ,
            t.prototype.chat = function() {
                this.isOpen ? this.send() : this.open()
            }
            ,
            t.prototype.command = function() {
                this.isOpen || (this.chat(),
                this.message = "/")
            }
            ,
            t.prototype.open = function() {
                var t = this;
                this.isOpen || (this.isOpen = !0,
                setTimeout(function() {
                    return t.input.focus()
                }))
            }
            ,
            t.prototype.close = function() {
                this.isOpen && (this.input.blur(),
                this.isOpen = !1,
                this.message = null )
            }
            ,
            t.prototype.toggle = function() {
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
    }),
    System.registerDynamic("2b", ["48", "22", "21", "43", "31", "47"], !0, function(t, e, n) {
        "use strict";
        var r = t("48")
          , i = t("22")
          , o = t("21")
          , a = t("43")
          , s = t("31")
          , l = t("47")
          , u = r.mat2d.create()
          , c = r.vec2.create()
          , f = function() {
            function t(t, e, n) {
                this.id = t,
                this.type = "pony",
                this.x = 0,
                this.y = 0,
                this.vx = 0,
                this.vy = 0,
                this.collisions = !0,
                this.right = !1,
                this.walking = !1,
                this.nextBlink = 0,
                this.time = 5 * Math.random(),
                this.state = a.createDefaultPonyState();
                var r = a.PONY_WIDTH
                  , o = a.PONY_HEIGHT;
                this.bounds = {
                    x: -r / 2,
                    y: -o,
                    w: r,
                    h: o + 5
                },
                this.info = s.toRenderInfo(s.decompressPonyInfo(e)),
                this.right = i.hasFlag(n, 1)
            }
            return t.prototype.update = function(t) {
                this.time += t,
                this.time - this.nextBlink > 1 && (this.nextBlink = this.time + 2 * Math.random() + 3),
                this.walking = !(!this.vx && !this.vy),
                this.right = i.isFacingRight(this.vx, this.right);
                var e = Math.floor((this.time - this.nextBlink) * o.frameTime);
                this.state.blinkFrame = a.BLINK_FRAMES[e] || 1,
                this.state.animation = this.walking ? l.trot : l.stand,
                this.state.animationFrame = Math.floor(this.time * o.frameTime) % this.state.animation.frames
            }
            ,
            t.prototype.draw = function(t) {
                r.mat2d.identity(u),
                r.mat2d.translate(u, u, r.vec2.set(c, Math.round(this.x * o.tileWidth), Math.round(this.y * o.tileHeight))),
                r.mat2d.scale(u, u, r.vec2.set(c, this.right ? -1 : 1, 1)),
                t.transform = u,
                a.drawPonyGL(t, this.info, this.state, 0, 0, this.right),
                t.transform = null
            }
            ,
            t
        }();
        return e.Pony = f,
        n.exports
    }),
    System.registerDynamic("23", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t !== o.None
        }
        function i(t) {
            return t >= o.Dirt && t <= o.Grass
        }
        !function(t) {
            t[t.None = 0] = "None",
            t[t.Dirt = 1] = "Dirt",
            t[t.Grass = 2] = "Grass"
        }(e.TileType || (e.TileType = {}));
        var o = e.TileType;
        e.TILE_COUNTS = [[0, 4], [2, 3], [4, 3], [6, 3], [8, 3], [13, 3], [14, 3], [47, 4]],
        e.TILE_COUNT_MAP = [],
        e.TILE_MAP_MAP = [],
        e.TILE_COUNTS.forEach(function(t) {
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
    }),
    System.registerDynamic("2c", ["21", "22", "23"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("22")
          , o = t("23")
          , a = function() {
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
                get: function() {
                    return this.regionsX * r.REGION_SIZE
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "height", {
                get: function() {
                    return this.regionsY * r.REGION_SIZE
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "entities", {
                get: function() {
                    return this.regions[0].entities
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "entitiesDrawn", {
                get: function() {
                    var t = 0;
                    return this.forEachRegion(function(e) {
                        return t += e.entitiesDrawn
                    }),
                    t
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.findEntity = function(t) {
                var e = null ;
                return this.forEachRegion(function(n) {
                    return !(e = i.findById(n.entities, t))
                }),
                e
            }
            ,
            t.prototype.findClosestEntity = function(t, e) {
                var n, r = 0;
                return this.forEachEntity(function(o) {
                    if (!e || e(o)) {
                        var a = i.distance(o, t);
                        (a < r || !n) && (n = o,
                        r = a)
                    }
                }),
                n
            }
            ,
            t.prototype.addEntity = function(t) {
                this.regions[0].entities.push(t)
            }
            ,
            t.prototype.removeEntity = function(t) {
                this.forEachRegion(function(e) {
                    return !i.removeById(e.entities, t)
                })
            }
            ,
            t.prototype.pickEntity = function(t) {
                var e = null ;
                return this.forEachRegion(function(n) {
                    return !(e = n.entities.find(function(e) {
                        return e.interactive && i.contains(e.x, e.y, e.bounds, t)
                    }))
                }),
                e
            }
            ,
            t.prototype.getTotalEntities = function(t) {
                var e = 0;
                return this.forEachRegion(function(n) {
                    e += t ? n.entities.reduce(function(e, n) {
                        return e + (t(n) ? 1 : 0)
                    }, 0) : n.entities.length
                }),
                e
            }
            ,
            t.prototype.updateMinMaxRegion = function() {
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
            t.prototype.setRegion = function(t, e, n) {
                t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY && (this.regions[t + e * this.regionsX] = null ,
                this.setDirty(t * r.REGION_SIZE - 1, e * r.REGION_SIZE - 1, r.REGION_SIZE + 2, r.REGION_SIZE + 2),
                this.regions[t + e * this.regionsX] = n,
                this.updateMinMaxRegion())
            }
            ,
            t.prototype.getRegion = function(t, e) {
                return t >= 0 && e >= 0 && t < this.regionsX && e < this.regionsY ? this.regions[t + e * this.regionsX] : null
            }
            ,
            t.prototype.getRegionGlobal = function(t, e) {
                var n = Math.floor(t / r.REGION_SIZE)
                  , i = Math.floor(e / r.REGION_SIZE);
                return this.getRegion(n, i)
            }
            ,
            t.prototype.getTile = function(t, e) {
                var n = this.getRegionGlobal(t, e);
                return n ? n.getTile(t - n.x * r.REGION_SIZE, e - n.y * r.REGION_SIZE) : o.TileType.None
            }
            ,
            t.prototype.doRelativeToRegion = function(t, e, n) {
                var i = this.getRegionGlobal(t, e);
                if (i) {
                    var o = Math.floor(t - i.x * r.REGION_SIZE)
                      , a = Math.floor(e - i.y * r.REGION_SIZE);
                    n(i, o, a)
                }
            }
            ,
            t.prototype.setTile = function(t, e, n) {
                this.doRelativeToRegion(t, e, function(t, e, r) {
                    return t.setTile(e, r, n)
                }),
                this.setDirty(t - 1, e - 1, 3, 3)
            }
            ,
            t.prototype.setDirty = function(t, e, n, r) {
                for (var i = 0; i < r; i++)
                    for (var o = 0; o < n; o++)
                        this.doRelativeToRegion(o + t, i + e, function(t, e, n) {
                            return t.setDirty(e, n)
                        })
            }
            ,
            t.prototype.isCollision = function(t, e, n) {
                var r = this.getTile(e, n);
                if (!o.canWalk(r))
                    return !0;
                if (!t.collider)
                    return !1;
                var a = !1;
                return this.forEachEntity(function(r) {
                    return r !== t && r.canCollideWith && r.collider && i.collidersIntersect(e, n, t.collider, r.x, r.y, r.collider) ? (a = !0,
                    !1) : void 0
                }),
                a
            }
            ,
            t.prototype.update = function(t) {
                var e = this;
                this.forEachRegion(function(n) {
                    n.entities.forEach(function(n) {
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
            t.prototype.draw = function(t, e) {
                var n = this;
                this.forEachRegion(function(r) {
                    return r.drawTiles(t, e, n)
                }),
                this.forEachRegion(function(n) {
                    return n.drawEntities(t, e)
                })
            }
            ,
            t.prototype.forEachRegion = function(t) {
                for (var e = this.minRegionY; e <= this.maxRegionY; e++)
                    for (var n = this.minRegionX; n <= this.maxRegionX; n++) {
                        var r = this.getRegion(n, e);
                        if (r && t(r) === !1)
                            return
                    }
            }
            ,
            t.prototype.forEachEntity = function(t) {
                this.forEachRegion(function(e) {
                    return e.entities.forEach(t)
                })
            }
            ,
            t
        }();
        return e.Map = a,
        n.exports
    }),
    System.registerDynamic("49", ["21", "22"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("22")
          , o = function() {
            function t() {
                this.x = 0,
                this.y = 0,
                this.w = 100,
                this.h = 100
            }
            return t.prototype.update = function(t, e) {
                var n = this.w
                  , o = this.h
                  , a = e.width * r.tileWidth
                  , s = e.height * r.tileHeight
                  , l = a - n
                  , u = s - o
                  , c = t.x * r.tileWidth
                  , f = t.y * r.tileHeight
                  , p = Math.floor(.3 * n)
                  , h = Math.floor(.3 * o)
                  , d = i.clamp(c - (p + (n - p) / 2), 0, l)
                  , m = i.clamp(c - (n - p) / 2, 0, l)
                  , v = i.clamp(f - (h + (o - h) / 2), 0, u)
                  , g = i.clamp(f - (o - h) / 2, 0, u);
                this.x = Math.floor(i.clamp(this.x, d, m)),
                this.y = Math.floor(i.clamp(this.y, v, g))
            }
            ,
            t.prototype.isVisible = function(t) {
                var e = t.bounds;
                if (!e)
                    return !0;
                var n = e.x + t.x * r.tileWidth
                  , i = e.y + t.y * r.tileHeight;
                return this.isRectVisible(n, i, e.w, e.h)
            }
            ,
            t.prototype.isRectVisible = function(t, e, n, r) {
                return this.x <= t + n && this.x + this.w >= t && this.y <= e + r && this.y + this.h >= e
            }
            ,
            t.prototype.screenToCamera = function(t) {
                return t ? {
                    x: Math.round(t.x + this.x),
                    y: Math.round(t.y + this.y)
                } : null
            }
            ,
            t.prototype.screenToWorld = function(t) {
                return t ? {
                    x: (t.x + this.x) / r.tileWidth,
                    y: (t.y + this.y) / r.tileHeight
                } : null
            }
            ,
            t.prototype.worldToScreen = function(t) {
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
    }),
    System.registerDynamic("4a", ["4b", "4c", "4d"], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n, r, i) {
            this.gl = t,
            this.type = e,
            this.handle = n,
            this.length = r,
            this.usage = i
        }
        function i(t, e, n, r, i, o) {
            var a = i.length * i.BYTES_PER_ELEMENT;
            if (o < 0)
                return t.bufferData(e, i, r),
                a;
            if (a + o > n)
                throw new Error("gl-buffer: If resizing buffer, must not specify offset");
            return t.bufferSubData(e, o, i),
            n
        }
        function o(t, e) {
            for (var n = l.malloc(t.length, e), r = t.length, i = 0; i < r; ++i)
                n[i] = t[i];
            return n
        }
        function a(t, e) {
            for (var n = 1, r = e.length - 1; r >= 0; --r) {
                if (e[r] !== n)
                    return !1;
                n *= t[r]
            }
            return !0
        }
        function s(t, e, n, i) {
            if (n = n || t.ARRAY_BUFFER,
            i = i || t.DYNAMIC_DRAW,
            n !== t.ARRAY_BUFFER && n !== t.ELEMENT_ARRAY_BUFFER)
                throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER");
            if (i !== t.DYNAMIC_DRAW && i !== t.STATIC_DRAW && i !== t.STREAM_DRAW)
                throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW");
            var o = t.createBuffer()
              , a = new r(t,n,o,0,i);
            return a.update(e),
            a
        }
        var l = t("4b")
          , u = t("4c")
          , c = t("4d")
          , f = ["uint8", "uint8_clamped", "uint16", "uint32", "int8", "int16", "int32", "float32"]
          , p = r.prototype;
        return p.bind = function() {
            this.gl.bindBuffer(this.type, this.handle)
        }
        ,
        p.unbind = function() {
            this.gl.bindBuffer(this.type, null )
        }
        ,
        p.dispose = function() {
            this.gl.deleteBuffer(this.handle)
        }
        ,
        p.update = function(t, e) {
            if ("number" != typeof e && (e = -1),
            this.bind(),
            "object" == typeof t && "undefined" != typeof t.shape) {
                var n = t.dtype;
                if (f.indexOf(n) < 0 && (n = "float32"),
                this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
                    var r = gl.getExtension("OES_element_index_uint");
                    n = r && "uint16" !== n ? "uint32" : "uint16"
                }
                if (n === t.dtype && a(t.shape, t.stride))
                    0 === t.offset && t.data.length === t.shape[0] ? this.length = i(this.gl, this.type, this.length, this.usage, t.data, e) : this.length = i(this.gl, this.type, this.length, this.usage, t.data.subarray(t.offset, t.shape[0]), e);
                else {
                    var s = l.malloc(t.size, n)
                      , p = c(s, t.shape);
                    u.assign(p, t),
                    e < 0 ? this.length = i(this.gl, this.type, this.length, this.usage, s, e) : this.length = i(this.gl, this.type, this.length, this.usage, s.subarray(0, t.size), e),
                    l.free(s)
                }
            } else if (Array.isArray(t)) {
                var h;
                h = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? o(t, "uint16") : o(t, "float32"),
                e < 0 ? this.length = i(this.gl, this.type, this.length, this.usage, h, e) : this.length = i(this.gl, this.type, this.length, this.usage, h.subarray(0, t.length), e),
                l.free(h)
            } else if ("object" == typeof t && "number" == typeof t.length)
                this.length = i(this.gl, this.type, this.length, this.usage, t, e);
            else {
                if ("number" != typeof t && void 0 !== t)
                    throw new Error("gl-buffer: Invalid data type");
                if (e >= 0)
                    throw new Error("gl-buffer: Cannot specify offset when resizing buffer");
                t = 0 | t,
                t <= 0 && (t = 1),
                this.gl.bufferData(this.type, 0 | t, this.usage),
                this.length = t
            }
        }
        ,
        n.exports = s,
        n.exports
    }),
    System.registerDynamic("4e", ["4a"], !0, function(t, e, n) {
        return n.exports = t("4a"),
        n.exports
    }),
    System.registerDynamic("4f", ["50"], !0, function(t, e, n) {
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
            return new i(t,e,e.createVertexArrayOES())
        }
        var a = t("50");
        return r.prototype.bind = function(t) {
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
        i.prototype.bind = function() {
            this._ext.bindVertexArrayOES(this.handle);
            for (var t = 0; t < this._attribs.length; ++t)
                this._attribs[t].bind(this.gl)
        }
        ,
        i.prototype.unbind = function() {
            this._ext.bindVertexArrayOES(null )
        }
        ,
        i.prototype.dispose = function() {
            this._ext.deleteVertexArrayOES(this.handle)
        }
        ,
        i.prototype.update = function(t, e, n) {
            if (this.bind(),
            a(this.gl, e, t),
            this.unbind(),
            this._attribs.length = 0,
            t)
                for (var i = 0; i < t.length; ++i) {
                    var o = t[i];
                    "number" == typeof o ? this._attribs.push(new r(i,1,o)) : Array.isArray(o) && this._attribs.push(new r(i,o.length,o[0],o[1],o[2],o[3]))
                }
            this._useElements = !!e,
            this._elementsType = n || this.gl.UNSIGNED_SHORT
        }
        ,
        i.prototype.draw = function(t, e, n) {
            n = n || 0;
            var r = this.gl;
            this._useElements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
        }
        ,
        n.exports = o,
        n.exports
    }),
    System.registerDynamic("50", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n) {
            e ? e.bind() : t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null );
            var r = 0 | t.getParameter(t.MAX_VERTEX_ATTRIBS);
            if (n) {
                if (n.length > r)
                    throw new Error("gl-vao: Too many vertex attributes");
                for (var i = 0; i < n.length; ++i) {
                    var o = n[i];
                    if (o.buffer) {
                        var a = o.buffer
                          , s = o.size || 4
                          , l = o.type || t.FLOAT
                          , u = !!o.normalized
                          , c = o.stride || 0
                          , f = o.offset || 0;
                        a.bind(),
                        t.enableVertexAttribArray(i),
                        t.vertexAttribPointer(i, s, l, u, c, f)
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
                t.bindBuffer(t.ARRAY_BUFFER, null );
                for (var i = 0; i < r; ++i)
                    t.disableVertexAttribArray(i)
            }
        }
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("51", ["50"], !0, function(t, e, n) {
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
        var o = t("50");
        return r.prototype.bind = function() {
            o(this.gl, this._elements, this._attributes)
        }
        ,
        r.prototype.update = function(t, e, n) {
            this._elements = e,
            this._attributes = t,
            this._elementsType = n || this.gl.UNSIGNED_SHORT
        }
        ,
        r.prototype.dispose = function() {}
        ,
        r.prototype.unbind = function() {}
        ,
        r.prototype.draw = function(t, e, n) {
            n = n || 0;
            var r = this.gl;
            this._elements ? r.drawElements(t, e, this._elementsType, n) : r.drawArrays(t, n, e)
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("52", ["4f", "51"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            this.bindVertexArrayOES = t.bindVertexArray.bind(t),
            this.createVertexArrayOES = t.createVertexArray.bind(t),
            this.deleteVertexArrayOES = t.deleteVertexArray.bind(t)
        }
        function i(t, e, n, i) {
            var s, l = t.createVertexArray ? new r(t) : t.getExtension("OES_vertex_array_object");
            return s = l ? o(t, l) : a(t),
            s.update(e, n, i),
            s
        }
        var o = t("4f")
          , a = t("51");
        return n.exports = i,
        n.exports
    }),
    System.registerDynamic("53", ["52"], !0, function(t, e, n) {
        return n.exports = t("52"),
        n.exports
    }),
    System.registerDynamic("54", ["4e", "55", "53", "22", "24"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            for (var e = t * p, n = new Uint16Array(e), r = 0, i = 0; r < e; i += 4)
                n[r++] = i + 0,
                n[r++] = i + 1,
                n[r++] = i + 2,
                n[r++] = i + 0,
                n[r++] = i + 2,
                n[r++] = i + 3;
            return n
        }
        function i(t, e, n, r, i, o, a, s) {
            if (s) {
                var l = t;
                t = s[0] * l + s[2] * e + s[4],
                e = s[1] * l + s[3] * e + s[5]
            }
            return o[a++] = t,
            o[a++] = e,
            o[a++] = n,
            o[a++] = r,
            o[a++] = i,
            a
        }
        var o = t("4e")
          , a = t("55")
          , s = t("53")
          , l = t("22")
          , u = t("24")
          , c = 1e4
          , f = 16
          , p = 6
          , h = 4
          , d = 5
          , m = function() {
            function t(t) {
                this.gl = t,
                this.globalAlpha = 1,
                this.count = 0,
                this.capacity = 0,
                this.index = 0,
                this.ensureCapacity(f);
                var e = l.createCanvas(1, 1)
                  , n = e.getContext("2d");
                n.fillStyle = "white",
                n.fillRect(0, 0, 1, 1),
                this.defaultTexture = a(t, e)
            }
            return t.prototype.dispose = function() {
                this.vertexBuffer && (this.vertexBuffer.dispose(),
                this.vertexBuffer = null ),
                this.indexBuffer && (this.indexBuffer.dispose(),
                this.indexBuffer = null ),
                this.vao && (this.vao.dispose(),
                this.vao = null )
            }
            ,
            t.prototype.begin = function(t) {
                t.bind(),
                this.texture = this.defaultTexture,
                this.vao.bind()
            }
            ,
            t.prototype.drawImage = function(t, e, n, r, o, a, s, l, c, f) {
                t = t || this.defaultTexture,
                this.texture !== t && this.flush(),
                this.ensureCapacity(this.count + 1) || (this.flush(),
                this.ensureCapacity(this.count + 1)),
                this.texture = t,
                e || (e = u.WHITE);
                var p = e.toFloat(this.globalAlpha)
                  , h = t.shape
                  , d = h[0]
                  , m = h[1]
                  , v = n / d
                  , g = r / m
                  , y = (n + o) / d
                  , b = (r + a) / m
                  , _ = s
                  , w = l
                  , x = s + c
                  , $ = l + f
                  , E = this.vertices
                  , S = this.transform
                  , M = this.index;
                M = i(_, w, v, g, p, E, M, S),
                M = i(x, w, y, g, p, E, M, S),
                M = i(x, $, y, b, p, E, M, S),
                M = i(_, $, v, b, p, E, M, S),
                this.index = M,
                this.count++
            }
            ,
            t.prototype.drawRect = function(t, e, n, r, i) {
                if (r && i) {
                    var o = this.rectSprite;
                    o ? this.drawImage(o.tex, t, o.x, o.y, o.w, o.h, e, n, r, i) : this.drawImage(null , t, 0, 0, 1, 1, e, n, r, i)
                }
            }
            ,
            t.prototype.drawSprite = function(t, e, n, r) {
                t && t.w && t.h && t.tex && this.drawImage(t.tex, e, t.x, t.y, t.w, t.h, n + t.ox, r + t.oy, t.w, t.h)
            }
            ,
            t.prototype.end = function() {
                this.flush(),
                this.vao.unbind()
            }
            ,
            t.prototype.ensureCapacity = function(t) {
                if (this.capacity < t) {
                    var e = this.capacity ? 2 * this.capacity : f;
                    if (e > c)
                        return !1;
                    var n = new Float32Array(e * h * d);
                    this.vertices && n.set(this.vertices),
                    this.capacity = e,
                    this.vertices = n,
                    this.indices = r(this.capacity),
                    this.dispose();
                    var i = this.gl.STATIC_DRAW
                      , a = 4 * d;
                    this.vertexBuffer = o(this.gl, this.vertices, this.gl.ARRAY_BUFFER, i),
                    this.indexBuffer = o(this.gl, this.indices, this.gl.ELEMENT_ARRAY_BUFFER, this.gl.STATIC_DRAW),
                    this.vao = s(this.gl, [{
                        name: "position",
                        buffer: this.vertexBuffer,
                        size: 2,
                        stride: a
                    }, {
                        name: "texcoord0",
                        buffer: this.vertexBuffer,
                        size: 2,
                        offset: 8,
                        stride: a
                    }, {
                        name: "color",
                        buffer: this.vertexBuffer,
                        size: 4,
                        stride: a,
                        offset: 16,
                        type: this.gl.UNSIGNED_BYTE,
                        normalized: !0
                    }], this.indexBuffer)
                }
                return !0
            }
            ,
            t.prototype.flush = function() {
                if (this.index && this.texture) {
                    var t = this.vertices.subarray(0, this.index);
                    this.vertexBuffer.update(t, 0),
                    this.texture && this.texture.bind();
                    var e = this.index / (4 * d);
                    e && this.vao.draw(this.gl.TRIANGLES, 6 * e, 0),
                    this.texture = null ,
                    this.count = 0,
                    this.index = 0
                }
            }
            ,
            t
        }();
        return e.SpriteBatch = m,
        n.exports
    }),
    System.registerDynamic("56", [], !0, function(t, e, n) {
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
                    for (var l = 0; l < o; l += e.w) {
                        var u = Math.min(e.w, o - l)
                          , c = Math.min(e.h, a - s);
                        t.drawImage(e.tex, n, e.x, e.y, u, c, r + l, i + s, u, c)
                    }
        }
        var o = function() {
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
            return t.prototype.draw = function(t, e, n, r, o, a) {
                var s = n + o - this.r
                  , l = r + a - this.b
                  , u = o - (this.l + this.r)
                  , c = a - (this.t + this.b);
                t.drawSprite(this.topLeft, e, n, r),
                t.drawSprite(this.topRight, e, s, r),
                t.drawSprite(this.bottomLeft, e, n, l),
                t.drawSprite(this.bottomRight, e, s, l),
                i(t, this.top, e, n + this.l, r, u, this.t),
                i(t, this.left, e, n, r + this.t, this.l, c),
                i(t, this.bg, e, n + this.l, r + this.t, u, c),
                i(t, this.right, e, n + o - this.r, r + this.t, this.r, c),
                i(t, this.bottom, e, n + this.l, r + a - this.b, u, this.b)
            }
            ,
            t
        }();
        return e.SpriteButton = o,
        n.exports
    }),
    System.registerDynamic("57", ["22"], !0, function(t, e, n) {
        "use strict";
        var r = t("22")
          , i = " ".charCodeAt(0)
          , o = "\t".charCodeAt(0)
          , a = "?".charCodeAt(0)
          , s = "\n".charCodeAt(0)
          , l = "\r".charCodeAt(0)
          , u = function() {
            function t(t) {
                var e = this;
                this.lineSpacing = 2,
                this.characterSpacing = 1,
                this.chars = [],
                this.emotes = [],
                this.emotePictures = [],
                t.forEach(function(t) {
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
            return t.prototype.getChar = function(t) {
                return this.chars[t] || this.chars[a]
            }
            ,
            t.prototype.parseEmotes = function(t) {
                return this.emotes.reduce(function(t, e) {
                    var n = e.regex
                      , r = e.char;
                    return t.replace(n, r)
                }, t)
            }
            ,
            t.prototype.forEachChar = function(t, e) {
                t = this.parseEmotes(t);
                for (var n = 0; n < t.length; n++) {
                    var i = n
                      , o = t.charCodeAt(n);
                    r.isSurrogate(o) && n + 1 < t.length && (o = r.fromSurrogate(o, t.charCodeAt(n + 1)),
                    n++),
                    o !== l && e(o, i)
                }
            }
            ,
            t.prototype.addEmoticon = function(t, e, n) {
                this.emotes.push({
                    regex: new RegExp(t,"g"),
                    char: e
                });
                var i = e.charCodeAt(0);
                r.isSurrogate(i) && e.length > 1 && (i = r.fromSurrogate(i, e.charCodeAt(1))),
                n && (this.emotePictures[i] = n)
            }
            ,
            t.prototype.measureChar = function(t) {
                return (this.emotePictures[t] || this.getChar(t)).w
            }
            ,
            t.prototype.drawChar = function(t, e, n, r, i) {
                var o = this.emotePictures[e];
                if (o)
                    return t.drawSprite(o, null , r, i - 1),
                    o.w;
                var a = this.getChar(e);
                return t.drawSprite(a, n, r, i),
                a.w
            }
            ,
            t.prototype.measureText = function(t) {
                var e = this
                  , n = 0
                  , r = 1
                  , i = 0;
                return this.forEachChar(t, function(t) {
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
            t.prototype.drawText = function(t, e, n, r, i) {
                var o = this;
                r = Math.round(r),
                i = Math.round(i);
                var a = r;
                this.forEachChar(e, function(e, l) {
                    e === s ? (a = r,
                    i += o.height + o.lineSpacing) : a += o.drawChar(t, e, n, a, i) + o.characterSpacing
                })
            }
            ,
            t.prototype.drawTextJumping = function(t, e, n, r, i, o) {
                var a = this;
                r = Math.round(r),
                i = Math.round(i);
                var l = r;
                this.forEachChar(e, function(e, u) {
                    e === s ? (l = r,
                    i += a.height + a.lineSpacing) : l += a.drawChar(t, e, n, l, o && o.indexOf(u) !== -1 ? i - 1 : i) + a.characterSpacing
                })
            }
            ,
            t.prototype.drawTextAligned = function(t, e, n, r, i, o) {
                void 0 === i && (i = "left"),
                void 0 === o && (o = "top");
                var a = r.x
                  , s = r.y;
                if ("left" !== i || "top" !== o) {
                    var l = this.measureText(e);
                    "left" !== i && (a += "center" === i ? (r.w - l.w) / 2 : r.w - l.w),
                    "top" !== o && (s += "middle" === o ? (r.h - l.h) / 2 : r.h - l.h)
                }
                this.drawText(t, e, n, a, s)
            }
            ,
            t
        }();
        return e.SpriteFont = u,
        n.exports
    }),
    System.registerDynamic("58", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            for (var e = new Array(t), n = 0; n < t; ++n)
                e[n] = n;
            return e
        }
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("59", ["58"], !0, function(t, e, n) {
        return n.exports = t("58"),
        n.exports
    }),
    System.registerDynamic("5a", ["<buffer from node attempt passthrough>"], !0, function(t, e, n) {
        return function(t) {
            n.exports = function(t) {
                return !(null == t || !(t._isBuffer || t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)))
            }
        }(t("<buffer from node attempt passthrough>").Buffer),
        n.exports
    }),
    System.registerDynamic("5b", ["5a"], !0, function(t, e, n) {
        return n.exports = t("5a"),
        n.exports
    }),
    System.registerDynamic("5c", ["59", "5b"], !0, function(t, e, n) {
        function r(t, e) {
            return t[0] - e[0]
        }
        function i() {
            var t, e = this.stride, n = new Array(e.length);
            for (t = 0; t < n.length; ++t)
                n[t] = [Math.abs(e[t]), t];
            n.sort(r);
            var i = new Array(n.length);
            for (t = 0; t < i.length; ++t)
                i[t] = n[t][1];
            return i
        }
        function o(t, e) {
            var n = ["View", e, "d", t].join("");
            e < 0 && (n = "View_Nil" + t);
            var r = "generic" === t;
            if (e === -1) {
                var o = "function " + n + "(a){this.data=a;};var proto=" + n + ".prototype;proto.dtype='" + t + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + n + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + n + "(a){return new " + n + "(a);}"
                  , a = new Function(o);
                return a()
            }
            if (0 === e) {
                var o = "function " + n + "(a,d) {this.data = a;this.offset = d};var proto=" + n + ".prototype;proto.dtype='" + t + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + n + "_copy() {return new " + n + "(this.data,this.offset)};proto.pick=function " + n + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + n + "_get(){return " + (r ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + n + "_set(v){return " + (r ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + n + "(a,b,c,d){return new " + n + "(a,d)}"
                  , a = new Function("TrivialArray",o);
                return a(f[t][0])
            }
            var o = ["'use strict'"]
              , s = l(e)
              , u = s.map(function(t) {
                return "i" + t
            })
              , c = "this.offset+" + s.map(function(t) {
                return "this.stride[" + t + "]*i" + t
            }).join("+")
              , p = s.map(function(t) {
                return "b" + t
            }).join(",")
              , h = s.map(function(t) {
                return "c" + t
            }).join(",");
            o.push("function " + n + "(a," + p + "," + h + ",d){this.data=a", "this.shape=[" + p + "]", "this.stride=[" + h + "]", "this.offset=d|0}", "var proto=" + n + ".prototype", "proto.dtype='" + t + "'", "proto.dimension=" + e),
            o.push("Object.defineProperty(proto,'size',{get:function " + n + "_size(){return " + s.map(function(t) {
                return "this.shape[" + t + "]"
            }).join("*"), "}})"),
            1 === e ? o.push("proto.order=[0]") : (o.push("Object.defineProperty(proto,'order',{get:"),
            e < 4 ? (o.push("function " + n + "_order(){"),
            2 === e ? o.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : 3 === e && o.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : o.push("ORDER})")),
            o.push("proto.set=function " + n + "_set(" + u.join(",") + ",v){"),
            r ? o.push("return this.data.set(" + c + ",v)}") : o.push("return this.data[" + c + "]=v}"),
            o.push("proto.get=function " + n + "_get(" + u.join(",") + "){"),
            r ? o.push("return this.data.get(" + c + ")}") : o.push("return this.data[" + c + "]}"),
            o.push("proto.index=function " + n + "_index(", u.join(), "){return " + c + "}"),
            o.push("proto.hi=function " + n + "_hi(" + u.join(",") + "){return new " + n + "(this.data," + s.map(function(t) {
                return ["(typeof i", t, "!=='number'||i", t, "<0)?this.shape[", t, "]:i", t, "|0"].join("")
            }).join(",") + "," + s.map(function(t) {
                return "this.stride[" + t + "]"
            }).join(",") + ",this.offset)}");
            var d = s.map(function(t) {
                return "a" + t + "=this.shape[" + t + "]"
            })
              , m = s.map(function(t) {
                return "c" + t + "=this.stride[" + t + "]"
            });
            o.push("proto.lo=function " + n + "_lo(" + u.join(",") + "){var b=this.offset,d=0," + d.join(",") + "," + m.join(","));
            for (var v = 0; v < e; ++v)
                o.push("if(typeof i" + v + "==='number'&&i" + v + ">=0){d=i" + v + "|0;b+=c" + v + "*d;a" + v + "-=d}");
            o.push("return new " + n + "(this.data," + s.map(function(t) {
                return "a" + t
            }).join(",") + "," + s.map(function(t) {
                return "c" + t
            }).join(",") + ",b)}"),
            o.push("proto.step=function " + n + "_step(" + u.join(",") + "){var " + s.map(function(t) {
                return "a" + t + "=this.shape[" + t + "]"
            }).join(",") + "," + s.map(function(t) {
                return "b" + t + "=this.stride[" + t + "]"
            }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
            for (var v = 0; v < e; ++v)
                o.push("if(typeof i" + v + "==='number'){d=i" + v + "|0;if(d<0){c+=b" + v + "*(a" + v + "-1);a" + v + "=ceil(-a" + v + "/d)}else{a" + v + "=ceil(a" + v + "/d)}b" + v + "*=d}");
            o.push("return new " + n + "(this.data," + s.map(function(t) {
                return "a" + t
            }).join(",") + "," + s.map(function(t) {
                return "b" + t
            }).join(",") + ",c)}");
            for (var g = new Array(e), y = new Array(e), v = 0; v < e; ++v)
                g[v] = "a[i" + v + "]",
                y[v] = "b[i" + v + "]";
            o.push("proto.transpose=function " + n + "_transpose(" + u + "){" + u.map(function(t, e) {
                return t + "=(" + t + "===undefined?" + e + ":" + t + "|0)"
            }).join(";"), "var a=this.shape,b=this.stride;return new " + n + "(this.data," + g.join(",") + "," + y.join(",") + ",this.offset)}"),
            o.push("proto.pick=function " + n + "_pick(" + u + "){var a=[],b=[],c=this.offset");
            for (var v = 0; v < e; ++v)
                o.push("if(typeof i" + v + "==='number'&&i" + v + ">=0){c=(c+this.stride[" + v + "]*i" + v + ")|0}else{a.push(this.shape[" + v + "]);b.push(this.stride[" + v + "])}");
            o.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),
            o.push("return function construct_" + n + "(data,shape,stride,offset){return new " + n + "(data," + s.map(function(t) {
                return "shape[" + t + "]"
            }).join(",") + "," + s.map(function(t) {
                return "stride[" + t + "]"
            }).join(",") + ",offset)}");
            var a = new Function("CTOR_LIST","ORDER",o.join("\n"));
            return a(f[t], i)
        }
        function a(t) {
            if (u(t))
                return "buffer";
            if (c)
                switch (Object.prototype.toString.call(t)) {
                case "[object Float64Array]":
                    return "float64";
                case "[object Float32Array]":
                    return "float32";
                case "[object Int8Array]":
                    return "int8";
                case "[object Int16Array]":
                    return "int16";
                case "[object Int32Array]":
                    return "int32";
                case "[object Uint8Array]":
                    return "uint8";
                case "[object Uint16Array]":
                    return "uint16";
                case "[object Uint32Array]":
                    return "uint32";
                case "[object Uint8ClampedArray]":
                    return "uint8_clamped"
                }
            return Array.isArray(t) ? "array" : "generic"
        }
        function s(t, e, n, r) {
            if (void 0 === t) {
                var i = f.array[0];
                return i([])
            }
            "number" == typeof t && (t = [t]),
            void 0 === e && (e = [t.length]);
            var s = e.length;
            if (void 0 === n) {
                n = new Array(s);
                for (var l = s - 1, u = 1; l >= 0; --l)
                    n[l] = u,
                    u *= e[l]
            }
            if (void 0 === r) {
                r = 0;
                for (var l = 0; l < s; ++l)
                    n[l] < 0 && (r -= (e[l] - 1) * n[l])
            }
            for (var c = a(t), p = f[c]; p.length <= s + 1; )
                p.push(o(c, p.length - 1));
            var i = p[s + 1];
            return i(t, e, n, r)
        }
        var l = t("59")
          , u = t("5b")
          , c = "undefined" != typeof Float64Array
          , f = {
            float32: [],
            float64: [],
            int8: [],
            int16: [],
            int32: [],
            uint8: [],
            uint16: [],
            uint32: [],
            array: [],
            uint8_clamped: [],
            buffer: [],
            generic: []
        };
        return n.exports = s,
        n.exports
    }),
    System.registerDynamic("4d", ["5c"], !0, function(t, e, n) {
        return n.exports = t("5c"),
        n.exports
    }),
    System.registerDynamic("5d", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            for (var n = 1, r = t.length, i = t[0], o = t[0], a = 1; a < r; ++a)
                if (o = i,
                i = t[a],
                e(i, o)) {
                    if (a === n) {
                        n++;
                        continue
                    }
                    t[n++] = i
                }
            return t.length = n,
            t
        }
        function i(t) {
            for (var e = 1, n = t.length, r = t[0], i = t[0], o = 1; o < n; ++o,
            i = r)
                if (i = r,
                r = t[o],
                r !== i) {
                    if (o === e) {
                        e++;
                        continue
                    }
                    t[e++] = r
                }
            return t.length = e,
            t
        }
        function o(t, e, n) {
            return 0 === t.length ? t : e ? (n || t.sort(e),
            r(t, e)) : (n || t.sort(),
            i(t))
        }
        return n.exports = o,
        n.exports
    }),
    System.registerDynamic("5e", ["5d"], !0, function(t, e, n) {
        return n.exports = t("5d"),
        n.exports
    }),
    System.registerDynamic("5f", ["5e", "60"], !0, function(t, e, n) {
        return function(e) {
            "use strict";
            function r(t, e, n) {
                var r, i, o = t.length, a = e.arrayArgs.length, s = e.indexArgs.length > 0, l = [], u = [], c = 0, f = 0;
                for (r = 0; r < o; ++r)
                    u.push(["i", r, "=0"].join(""));
                for (i = 0; i < a; ++i)
                    for (r = 0; r < o; ++r)
                        f = c,
                        c = t[r],
                        0 === r ? u.push(["d", i, "s", r, "=t", i, "p", c].join("")) : u.push(["d", i, "s", r, "=(t", i, "p", c, "-s", f, "*t", i, "p", f, ")"].join(""));
                for (l.push("var " + u.join(",")),
                r = o - 1; r >= 0; --r)
                    c = t[r],
                    l.push(["for(i", r, "=0;i", r, "<s", c, ";++i", r, "){"].join(""));
                for (l.push(n),
                r = 0; r < o; ++r) {
                    for (f = c,
                    c = t[r],
                    i = 0; i < a; ++i)
                        l.push(["p", i, "+=d", i, "s", r].join(""));
                    s && (r > 0 && l.push(["index[", f, "]-=s", f].join("")),
                    l.push(["++index[", c, "]"].join(""))),
                    l.push("}")
                }
                return l.join("\n")
            }
            function i(t, e, n, i) {
                for (var o = e.length, a = n.arrayArgs.length, s = n.blockSize, l = n.indexArgs.length > 0, u = [], c = 0; c < a; ++c)
                    u.push(["var offset", c, "=p", c].join(""));
                for (var c = t; c < o; ++c)
                    u.push(["for(var j" + c + "=SS[", e[c], "]|0;j", c, ">0;){"].join("")),
                    u.push(["if(j", c, "<", s, "){"].join("")),
                    u.push(["s", e[c], "=j", c].join("")),
                    u.push(["j", c, "=0"].join("")),
                    u.push(["}else{s", e[c], "=", s].join("")),
                    u.push(["j", c, "-=", s, "}"].join("")),
                    l && u.push(["index[", e[c], "]=j", c].join(""));
                for (var c = 0; c < a; ++c) {
                    for (var f = ["offset" + c], p = t; p < o; ++p)
                        f.push(["j", p, "*t", c, "p", e[p]].join(""));
                    u.push(["p", c, "=(", f.join("+"), ")"].join(""))
                }
                u.push(r(e, n, i));
                for (var c = t; c < o; ++c)
                    u.push("}");
                return u.join("\n")
            }
            function o(t) {
                for (var e = 0, n = t[0].length; e < n; ) {
                    for (var r = 1; r < t.length; ++r)
                        if (t[r][e] !== t[0][e])
                            return e;
                    ++e
                }
                return e
            }
            function a(t, e, n) {
                for (var r = t.body, i = [], o = [], a = 0; a < t.args.length; ++a) {
                    var s = t.args[a];
                    if (!(s.count <= 0)) {
                        var l = new RegExp(s.name,"g")
                          , u = ""
                          , c = e.arrayArgs.indexOf(a);
                        switch (e.argTypes[a]) {
                        case "offset":
                            var f = e.offsetArgIndex.indexOf(a)
                              , p = e.offsetArgs[f];
                            c = p.array,
                            u = "+q" + f;
                        case "array":
                            u = "p" + c + u;
                            var h = "l" + a
                              , d = "a" + c;
                            if (0 === e.arrayBlockIndices[c])
                                1 === s.count ? "generic" === n[c] ? s.lvalue ? (i.push(["var ", h, "=", d, ".get(", u, ")"].join("")),
                                r = r.replace(l, h),
                                o.push([d, ".set(", u, ",", h, ")"].join(""))) : r = r.replace(l, [d, ".get(", u, ")"].join("")) : r = r.replace(l, [d, "[", u, "]"].join("")) : "generic" === n[c] ? (i.push(["var ", h, "=", d, ".get(", u, ")"].join("")),
                                r = r.replace(l, h),
                                s.lvalue && o.push([d, ".set(", u, ",", h, ")"].join(""))) : (i.push(["var ", h, "=", d, "[", u, "]"].join("")),
                                r = r.replace(l, h),
                                s.lvalue && o.push([d, "[", u, "]=", h].join("")));
                            else {
                                for (var m = [s.name], v = [u], g = 0; g < Math.abs(e.arrayBlockIndices[c]); g++)
                                    m.push("\\s*\\[([^\\]]+)\\]"),
                                    v.push("$" + (g + 1) + "*t" + c + "b" + g);
                                if (l = new RegExp(m.join(""),"g"),
                                u = v.join("+"),
                                "generic" === n[c])
                                    throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                                r = r.replace(l, [d, "[", u, "]"].join(""))
                            }
                            break;
                        case "scalar":
                            r = r.replace(l, "Y" + e.scalarArgs.indexOf(a));
                            break;
                        case "index":
                            r = r.replace(l, "index");
                            break;
                        case "shape":
                            r = r.replace(l, "shape")
                        }
                    }
                }
                return [i.join("\n"), r, o.join("\n")].join("\n").trim()
            }
            function s(t) {
                for (var e = new Array(t.length), n = !0, r = 0; r < t.length; ++r) {
                    var i = t[r]
                      , o = i.match(/\d+/);
                    o = o ? o[0] : "",
                    0 === i.charAt(0) ? e[r] = "u" + i.charAt(1) + o : e[r] = i.charAt(0) + o,
                    r > 0 && (n = n && e[r] === e[r - 1])
                }
                return n ? e[0] : e.join("")
            }
            function l(t, e) {
                for (var n = e[1].length - Math.abs(t.arrayBlockIndices[0]) | 0, l = new Array(t.arrayArgs.length), c = new Array(t.arrayArgs.length), f = 0; f < t.arrayArgs.length; ++f)
                    c[f] = e[2 * f],
                    l[f] = e[2 * f + 1];
                for (var p = [], h = [], d = [], m = [], v = [], f = 0; f < t.arrayArgs.length; ++f) {
                    t.arrayBlockIndices[f] < 0 ? (d.push(0),
                    m.push(n),
                    p.push(n),
                    h.push(n + t.arrayBlockIndices[f])) : (d.push(t.arrayBlockIndices[f]),
                    m.push(t.arrayBlockIndices[f] + n),
                    p.push(0),
                    h.push(t.arrayBlockIndices[f]));
                    for (var g = [], y = 0; y < l[f].length; y++)
                        d[f] <= l[f][y] && l[f][y] < m[f] && g.push(l[f][y] - d[f]);
                    v.push(g)
                }
                for (var b = ["SS"], _ = ["'use strict'"], w = [], y = 0; y < n; ++y)
                    w.push(["s", y, "=SS[", y, "]"].join(""));
                for (var f = 0; f < t.arrayArgs.length; ++f) {
                    b.push("a" + f),
                    b.push("t" + f),
                    b.push("p" + f);
                    for (var y = 0; y < n; ++y)
                        w.push(["t", f, "p", y, "=t", f, "[", d[f] + y, "]"].join(""));
                    for (var y = 0; y < Math.abs(t.arrayBlockIndices[f]); ++y)
                        w.push(["t", f, "b", y, "=t", f, "[", p[f] + y, "]"].join(""))
                }
                for (var f = 0; f < t.scalarArgs.length; ++f)
                    b.push("Y" + f);
                if (t.shapeArgs.length > 0 && w.push("shape=SS.slice(0)"),
                t.indexArgs.length > 0) {
                    for (var x = new Array(n), f = 0; f < n; ++f)
                        x[f] = "0";
                    w.push(["index=[", x.join(","), "]"].join(""))
                }
                for (var f = 0; f < t.offsetArgs.length; ++f) {
                    for (var $ = t.offsetArgs[f], E = [], y = 0; y < $.offset.length; ++y)
                        0 !== $.offset[y] && (1 === $.offset[y] ? E.push(["t", $.array, "p", y].join("")) : E.push([$.offset[y], "*t", $.array, "p", y].join("")));
                    0 === E.length ? w.push("q" + f + "=0") : w.push(["q", f, "=", E.join("+")].join(""))
                }
                var S = u([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));
                w = w.concat(S),
                _.push("var " + w.join(","));
                for (var f = 0; f < t.arrayArgs.length; ++f)
                    _.push("p" + f + "|=0");
                t.pre.body.length > 3 && _.push(a(t.pre, t, c));
                var M = a(t.body, t, c)
                  , k = o(v);
                k < n ? _.push(i(k, v[0], t, M)) : _.push(r(v[0], t, M)),
                t.post.body.length > 3 && _.push(a(t.post, t, c)),
                t.debug && console.log("-----Generated cwise routine for ", e, ":\n" + _.join("\n") + "\n----------");
                var T = [t.funcName || "unnamed", "_cwise_loop_", l[0].join("s"), "m", k, s(c)].join("")
                  , A = new Function(["function ", T, "(", b.join(","), "){", _.join("\n"), "} return ", T].join(""));
                return A()
            }
            var u = t("5e");
            n.exports = l
        }(t("60")),
        n.exports
    }),
    System.registerDynamic("61", ["5f"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            var e = ["'use strict'", "var CACHED={}"]
              , n = []
              , r = t.funcName + "_cwise_thunk";
            e.push(["return function ", r, "(", t.shimArgs.join(","), "){"].join(""));
            for (var o = [], a = [], s = [["array", t.arrayArgs[0], ".shape.slice(", Math.max(0, t.arrayBlockIndices[0]), t.arrayBlockIndices[0] < 0 ? "," + t.arrayBlockIndices[0] + ")" : ")"].join("")], l = [], u = [], c = 0; c < t.arrayArgs.length; ++c) {
                var f = t.arrayArgs[c];
                n.push(["t", f, "=array", f, ".dtype,", "r", f, "=array", f, ".order"].join("")),
                o.push("t" + f),
                o.push("r" + f),
                a.push("t" + f),
                a.push("r" + f + ".join()"),
                s.push("array" + f + ".data"),
                s.push("array" + f + ".stride"),
                s.push("array" + f + ".offset|0"),
                c > 0 && (l.push("array" + t.arrayArgs[0] + ".shape.length===array" + f + ".shape.length+" + (Math.abs(t.arrayBlockIndices[0]) - Math.abs(t.arrayBlockIndices[c]))),
                u.push("array" + t.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[0]) + "]===array" + f + ".shape[shapeIndex+" + Math.max(0, t.arrayBlockIndices[c]) + "]"))
            }
            t.arrayArgs.length > 1 && (e.push("if (!(" + l.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),
            e.push("for(var shapeIndex=array" + t.arrayArgs[0] + ".shape.length-" + Math.abs(t.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"),
            e.push("if (!(" + u.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"),
            e.push("}"));
            for (var c = 0; c < t.scalarArgs.length; ++c)
                s.push("scalar" + t.scalarArgs[c]);
            n.push(["type=[", a.join(","), "].join()"].join("")),
            n.push("proc=CACHED[type]"),
            e.push("var " + n.join(",")),
            e.push(["if(!proc){", "CACHED[type]=proc=compile([", o.join(","), "])}", "return proc(", s.join(","), ")}"].join("")),
            t.debug && console.log("-----Generated thunk:\n" + e.join("\n") + "\n----------");
            var p = new Function("compile",e.join("\n"));
            return p(i.bind(void 0, t))
        }
        var i = t("5f");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("62", ["61"], !0, function(t, e, n) {
        "use strict";
        function r() {
            this.argTypes = [],
            this.shimArgs = [],
            this.arrayArgs = [],
            this.arrayBlockIndices = [],
            this.scalarArgs = [],
            this.offsetArgs = [],
            this.offsetArgIndex = [],
            this.indexArgs = [],
            this.shapeArgs = [],
            this.funcName = "",
            this.pre = null ,
            this.body = null ,
            this.post = null ,
            this.debug = !1
        }
        function i(t) {
            var e = new r;
            e.pre = t.pre,
            e.body = t.body,
            e.post = t.post;
            var n = t.args.slice(0);
            e.argTypes = n;
            for (var i = 0; i < n.length; ++i) {
                var a = n[i];
                if ("array" === a || "object" == typeof a && a.blockIndices) {
                    if (e.argTypes[i] = "array",
                    e.arrayArgs.push(i),
                    e.arrayBlockIndices.push(a.blockIndices ? a.blockIndices : 0),
                    e.shimArgs.push("array" + i),
                    i < e.pre.args.length && e.pre.args[i].count > 0)
                        throw new Error("cwise: pre() block may not reference array args");
                    if (i < e.post.args.length && e.post.args[i].count > 0)
                        throw new Error("cwise: post() block may not reference array args")
                } else if ("scalar" === a)
                    e.scalarArgs.push(i),
                    e.shimArgs.push("scalar" + i);
                else if ("index" === a) {
                    if (e.indexArgs.push(i),
                    i < e.pre.args.length && e.pre.args[i].count > 0)
                        throw new Error("cwise: pre() block may not reference array index");
                    if (i < e.body.args.length && e.body.args[i].lvalue)
                        throw new Error("cwise: body() block may not write to array index");
                    if (i < e.post.args.length && e.post.args[i].count > 0)
                        throw new Error("cwise: post() block may not reference array index")
                } else if ("shape" === a) {
                    if (e.shapeArgs.push(i),
                    i < e.pre.args.length && e.pre.args[i].lvalue)
                        throw new Error("cwise: pre() block may not write to array shape");
                    if (i < e.body.args.length && e.body.args[i].lvalue)
                        throw new Error("cwise: body() block may not write to array shape");
                    if (i < e.post.args.length && e.post.args[i].lvalue)
                        throw new Error("cwise: post() block may not write to array shape")
                } else {
                    if ("object" != typeof a || !a.offset)
                        throw new Error("cwise: Unknown argument type " + n[i]);
                    e.argTypes[i] = "offset",
                    e.offsetArgs.push({
                        array: a.array,
                        offset: a.offset
                    }),
                    e.offsetArgIndex.push(i)
                }
            }
            if (e.arrayArgs.length <= 0)
                throw new Error("cwise: No array arguments specified");
            if (e.pre.args.length > n.length)
                throw new Error("cwise: Too many arguments in pre() block");
            if (e.body.args.length > n.length)
                throw new Error("cwise: Too many arguments in body() block");
            if (e.post.args.length > n.length)
                throw new Error("cwise: Too many arguments in post() block");
            return e.debug = !!t.printCode || !!t.debug,
            e.funcName = t.funcName || "cwise",
            e.blockSize = t.blockSize || 64,
            o(e)
        }
        var o = t("61");
        return n.exports = i,
        n.exports
    }),
    System.registerDynamic("63", ["62"], !0, function(t, e, n) {
        return n.exports = t("62"),
        n.exports
    }),
    System.registerDynamic("64", ["63"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            if (!t)
                return s;
            for (var e = 0; e < t.args.length; ++e) {
                var n = t.args[e];
                0 === e ? t.args[e] = {
                    name: n,
                    lvalue: !0,
                    rvalue: !!t.rvalue,
                    count: t.count || 1
                } : t.args[e] = {
                    name: n,
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }
            }
            return t.thisVars || (t.thisVars = []),
            t.localVars || (t.localVars = []),
            t
        }
        function i(t) {
            return a({
                args: t.args,
                pre: r(t.pre),
                body: r(t.body),
                post: r(t.proc),
                funcName: t.funcName
            })
        }
        function o(t) {
            for (var e = [], n = 0; n < t.args.length; ++n)
                e.push("a" + n);
            var r = new Function("P",["return function ", t.funcName, "_ndarrayops(", e.join(","), ") {P(", e.join(","), ");return a0}"].join(""));
            return r(i(t))
        }
        var a = t("63")
          , s = {
            body: "",
            args: [],
            thisVars: [],
            localVars: []
        }
          , l = {
            add: "+",
            sub: "-",
            mul: "*",
            div: "/",
            mod: "%",
            band: "&",
            bor: "|",
            bxor: "^",
            lshift: "<<",
            rshift: ">>",
            rrshift: ">>>"
        };
        !function() {
            for (var t in l) {
                var n = l[t];
                e[t] = o({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + n + "c"
                    },
                    funcName: t
                }),
                e[t + "eq"] = o({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a" + n + "=b"
                    },
                    rvalue: !0,
                    funcName: t + "eq"
                }),
                e[t + "s"] = o({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + n + "s"
                    },
                    funcName: t + "s"
                }),
                e[t + "seq"] = o({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a" + n + "=s"
                    },
                    rvalue: !0,
                    funcName: t + "seq"
                })
            }
        }();
        var u = {
            not: "!",
            bnot: "~",
            neg: "-",
            recip: "1.0/"
        };
        !function() {
            for (var t in u) {
                var n = u[t];
                e[t] = o({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=" + n + "b"
                    },
                    funcName: t
                }),
                e[t + "eq"] = o({
                    args: ["array"],
                    body: {
                        args: ["a"],
                        body: "a=" + n + "a"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "eq"
                })
            }
        }();
        var c = {
            and: "&&",
            or: "||",
            eq: "===",
            neq: "!==",
            lt: "<",
            gt: ">",
            leq: "<=",
            geq: ">="
        };
        !function() {
            for (var t in c) {
                var n = c[t];
                e[t] = o({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + n + "c"
                    },
                    funcName: t
                }),
                e[t + "s"] = o({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + n + "s"
                    },
                    funcName: t + "s"
                }),
                e[t + "eq"] = o({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=a" + n + "b"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "eq"
                }),
                e[t + "seq"] = o({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a=a" + n + "s"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "seq"
                })
            }
        }();
        var f = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
        !function() {
            for (var t = 0; t < f.length; ++t) {
                var n = f[t];
                e[n] = o({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b)",
                        thisVars: ["this_f"]
                    },
                    funcName: n
                }),
                e[n + "eq"] = o({
                    args: ["array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a"],
                        body: "a=this_f(a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: n + "eq"
                })
            }
        }();
        var p = ["max", "min", "atan2", "pow"];
        !function() {
            for (var t = 0; t < p.length; ++t) {
                var n = p[t];
                e[n] = o({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: n
                }),
                e[n + "s"] = o({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: n + "s"
                }),
                e[n + "eq"] = o({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: n + "eq"
                }),
                e[n + "seq"] = o({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: n + "seq"
                })
            }
        }();
        var h = ["atan2", "pow"];
        return function() {
            for (var t = 0; t < h.length; ++t) {
                var n = h[t];
                e[n + "op"] = o({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: n + "op"
                }),
                e[n + "ops"] = o({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: n + "ops"
                }),
                e[n + "opeq"] = o({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: n + "opeq"
                }),
                e[n + "opseq"] = o({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + n,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: n + "opseq"
                })
            }
        }(),
        e.any = a({
            args: ["array"],
            pre: s,
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(a){return true}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return false"
            },
            funcName: "any"
        }),
        e.all = a({
            args: ["array"],
            pre: s,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(!x){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "all"
        }),
        e.sum = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s+=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "sum"
        }),
        e.prod = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=1"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s*=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "prod"
        }),
        e.norm2squared = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm2squared"
        }),
        e.norm2 = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return Math.sqrt(this_s)"
            },
            funcName: "norm2"
        }),
        e.norminf = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 4
                }],
                body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norminf"
        }),
        e.norm1 = a({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 3
                }],
                body: "this_s+=a<0?-a:a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm1"
        }),
        e.sup = a({
            args: ["array"],
            pre: {
                body: "this_h=-Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }),
        e.inf = a({
            args: ["array"],
            pre: {
                body: "this_h=Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }),
        e.argmin = a({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }),
        e.argmax = a({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }),
        e.random = o({
            args: ["array"],
            pre: {
                args: [],
                body: "this_f=Math.random",
                thisVars: ["this_f"]
            },
            body: {
                args: ["a"],
                body: "a=this_f()",
                thisVars: ["this_f"]
            },
            funcName: "random"
        }),
        e.assign = o({
            args: ["array", "array"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assign"
        }),
        e.assigns = o({
            args: ["array", "scalar"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assigns"
        }),
        e.equals = a({
            args: ["array", "array"],
            pre: s,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }, {
                    name: "y",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(x!==y){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "equals"
        }),
        n.exports
    }),
    System.registerDynamic("4c", ["64"], !0, function(t, e, n) {
        return n.exports = t("64"),
        n.exports
    }),
    System.registerDynamic("65", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            var e = 32;
            return t &= -t,
            t && e--,
            65535 & t && (e -= 16),
            16711935 & t && (e -= 8),
            252645135 & t && (e -= 4),
            858993459 & t && (e -= 2),
            1431655765 & t && (e -= 1),
            e
        }
        var i = 32;
        e.INT_BITS = i,
        e.INT_MAX = 2147483647,
        e.INT_MIN = -1 << i - 1,
        e.sign = function(t) {
            return (t > 0) - (t < 0)
        }
        ,
        e.abs = function(t) {
            var e = t >> i - 1;
            return (t ^ e) - e
        }
        ,
        e.min = function(t, e) {
            return e ^ (t ^ e) & -(t < e)
        }
        ,
        e.max = function(t, e) {
            return t ^ (t ^ e) & -(t < e)
        }
        ,
        e.isPow2 = function(t) {
            return !(t & t - 1 || !t)
        }
        ,
        e.log2 = function(t) {
            var e, n;
            return e = (t > 65535) << 4,
            t >>>= e,
            n = (t > 255) << 3,
            t >>>= n,
            e |= n,
            n = (t > 15) << 2,
            t >>>= n,
            e |= n,
            n = (t > 3) << 1,
            t >>>= n,
            e |= n,
            e | t >> 1
        }
        ,
        e.log10 = function(t) {
            return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
        }
        ,
        e.popCount = function(t) {
            return t -= t >>> 1 & 1431655765,
            t = (858993459 & t) + (t >>> 2 & 858993459),
            16843009 * (t + (t >>> 4) & 252645135) >>> 24
        }
        ,
        e.countTrailingZeros = r,
        e.nextPow2 = function(t) {
            return t += 0 === t,
            --t,
            t |= t >>> 1,
            t |= t >>> 2,
            t |= t >>> 4,
            t |= t >>> 8,
            t |= t >>> 16,
            t + 1
        }
        ,
        e.prevPow2 = function(t) {
            return t |= t >>> 1,
            t |= t >>> 2,
            t |= t >>> 4,
            t |= t >>> 8,
            t |= t >>> 16,
            t - (t >>> 1)
        }
        ,
        e.parity = function(t) {
            return t ^= t >>> 16,
            t ^= t >>> 8,
            t ^= t >>> 4,
            t &= 15,
            27030 >>> t & 1
        }
        ;
        var o = new Array(256);
        return function(t) {
            for (var e = 0; e < 256; ++e) {
                var n = e
                  , r = e
                  , i = 7;
                for (n >>>= 1; n; n >>>= 1)
                    r <<= 1,
                    r |= 1 & n,
                    --i;
                t[e] = r << i & 255
            }
        }(o),
        e.reverse = function(t) {
            return o[255 & t] << 24 | o[t >>> 8 & 255] << 16 | o[t >>> 16 & 255] << 8 | o[t >>> 24 & 255]
        }
        ,
        e.interleave2 = function(t, e) {
            return t &= 65535,
            t = 16711935 & (t | t << 8),
            t = 252645135 & (t | t << 4),
            t = 858993459 & (t | t << 2),
            t = 1431655765 & (t | t << 1),
            e &= 65535,
            e = 16711935 & (e | e << 8),
            e = 252645135 & (e | e << 4),
            e = 858993459 & (e | e << 2),
            e = 1431655765 & (e | e << 1),
            t | e << 1
        }
        ,
        e.deinterleave2 = function(t, e) {
            return t = t >>> e & 1431655765,
            t = 858993459 & (t | t >>> 1),
            t = 252645135 & (t | t >>> 2),
            t = 16711935 & (t | t >>> 4),
            t = 65535 & (t | t >>> 16),
            t << 16 >> 16
        }
        ,
        e.interleave3 = function(t, e, n) {
            return t &= 1023,
            t = 4278190335 & (t | t << 16),
            t = 251719695 & (t | t << 8),
            t = 3272356035 & (t | t << 4),
            t = 1227133513 & (t | t << 2),
            e &= 1023,
            e = 4278190335 & (e | e << 16),
            e = 251719695 & (e | e << 8),
            e = 3272356035 & (e | e << 4),
            e = 1227133513 & (e | e << 2),
            t |= e << 1,
            n &= 1023,
            n = 4278190335 & (n | n << 16),
            n = 251719695 & (n | n << 8),
            n = 3272356035 & (n | n << 4),
            n = 1227133513 & (n | n << 2),
            t | n << 2
        }
        ,
        e.deinterleave3 = function(t, e) {
            return t = t >>> e & 1227133513,
            t = 3272356035 & (t | t >>> 2),
            t = 251719695 & (t | t >>> 4),
            t = 4278190335 & (t | t >>> 8),
            t = 1023 & (t | t >>> 16),
            t << 22 >> 22
        }
        ,
        e.nextCombination = function(t) {
            var e = t | t - 1;
            return e + 1 | (~e & -~e) - 1 >>> r(t) + 1
        }
        ,
        n.exports
    }),
    System.registerDynamic("66", ["65"], !0, function(t, e, n) {
        return n.exports = t("65"),
        n.exports
    }),
    System.registerDynamic("67", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n) {
            var i = 0 | t[n];
            if (i <= 0)
                return [];
            var o, a = new Array(i);
            if (n === t.length - 1)
                for (o = 0; o < i; ++o)
                    a[o] = e;
            else
                for (o = 0; o < i; ++o)
                    a[o] = r(t, e, n + 1);
            return a
        }
        function i(t, e) {
            var n, r;
            for (n = new Array(t),
            r = 0; r < t; ++r)
                n[r] = e;
            return n
        }
        function o(t, e) {
            switch ("undefined" == typeof e && (e = 0),
            typeof t) {
            case "number":
                if (t > 0)
                    return i(0 | t, e);
                break;
            case "object":
                if ("number" == typeof t.length)
                    return r(t, e, 0)
            }
            return []
        }
        return n.exports = o,
        n.exports
    }),
    System.registerDynamic("68", ["67"], !0, function(t, e, n) {
        return n.exports = t("67"),
        n.exports
    }),
    System.registerDynamic("base64 to byte array", [], !0, function(t, e, n) {
        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        return function(t) {
            "use strict";
            function e(t) {
                var e = t.charCodeAt(0);
                return e === a || e === f ? 62 : e === s || e === p ? 63 : e < l ? -1 : e < l + 10 ? e - l + 26 + 26 : e < c + 26 ? e - c : e < u + 26 ? e - u + 26 : void 0
            }
            function n(t) {
                function n(t) {
                    u[f++] = t
                }
                var r, i, a, s, l, u;
                if (t.length % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                var c = t.length;
                l = "=" === t.charAt(c - 2) ? 2 : "=" === t.charAt(c - 1) ? 1 : 0,
                u = new o(3 * t.length / 4 - l),
                a = l > 0 ? t.length - 4 : t.length;
                var f = 0;
                for (r = 0,
                i = 0; r < a; r += 4,
                i += 3)
                    s = e(t.charAt(r)) << 18 | e(t.charAt(r + 1)) << 12 | e(t.charAt(r + 2)) << 6 | e(t.charAt(r + 3)),
                    n((16711680 & s) >> 16),
                    n((65280 & s) >> 8),
                    n(255 & s);
                return 2 === l ? (s = e(t.charAt(r)) << 2 | e(t.charAt(r + 1)) >> 4,
                n(255 & s)) : 1 === l && (s = e(t.charAt(r)) << 10 | e(t.charAt(r + 1)) << 4 | e(t.charAt(r + 2)) >> 2,
                n(s >> 8 & 255),
                n(255 & s)),
                u
            }
            function i(t) {
                function e(t) {
                    return r.charAt(t)
                }
                function n(t) {
                    return e(t >> 18 & 63) + e(t >> 12 & 63) + e(t >> 6 & 63) + e(63 & t)
                }
                var i, o, a, s = t.length % 3, l = "";
                for (i = 0,
                a = t.length - s; i < a; i += 3)
                    o = (t[i] << 16) + (t[i + 1] << 8) + t[i + 2],
                    l += n(o);
                switch (s) {
                case 1:
                    o = t[t.length - 1],
                    l += e(o >> 2),
                    l += e(o << 4 & 63),
                    l += "==";
                    break;
                case 2:
                    o = (t[t.length - 2] << 8) + t[t.length - 1],
                    l += e(o >> 10),
                    l += e(o >> 4 & 63),
                    l += e(o << 2 & 63),
                    l += "="
                }
                return l
            }
            var o = "undefined" != typeof Uint8Array ? Uint8Array : Array
              , a = "+".charCodeAt(0)
              , s = "/".charCodeAt(0)
              , l = "0".charCodeAt(0)
              , u = "a".charCodeAt(0)
              , c = "A".charCodeAt(0)
              , f = "-".charCodeAt(0)
              , p = "_".charCodeAt(0);
            t.toByteArray = n,
            t.fromByteArray = i
        }("undefined" == typeof e ? this.base64js = {} : e),
        n.exports
    }),
    System.registerDynamic("<base64 to byte array passthrough>", ["base64 to byte array"], !0, function(t, e, n) {
        return n.exports = t("base64 to byte array"),
        n.exports
    }),
    System.registerDynamic("6b", [], !0, function(t, e, n) {
        return e.read = function(t, e, n, r, i) {
            var o, a, s = 8 * i - r - 1, l = (1 << s) - 1, u = l >> 1, c = -7, f = n ? i - 1 : 0, p = n ? -1 : 1, h = t[e + f];
            for (f += p,
            o = h & (1 << -c) - 1,
            h >>= -c,
            c += s; c > 0; o = 256 * o + t[e + f],
            f += p,
            c -= 8)
                ;
            for (a = o & (1 << -c) - 1,
            o >>= -c,
            c += r; c > 0; a = 256 * a + t[e + f],
            f += p,
            c -= 8)
                ;
            if (0 === o)
                o = 1 - u;
            else {
                if (o === l)
                    return a ? NaN : (h ? -1 : 1) * (1 / 0);
                a += Math.pow(2, r),
                o -= u
            }
            return (h ? -1 : 1) * a * Math.pow(2, o - r)
        }
        ,
        e.write = function(t, e, n, r, i, o) {
            var a, s, l, u = 8 * o - i - 1, c = (1 << u) - 1, f = c >> 1, p = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : o - 1, d = r ? 1 : -1, m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e),
            isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
            a = c) : (a = Math.floor(Math.log(e) / Math.LN2),
            e * (l = Math.pow(2, -a)) < 1 && (a--,
            l *= 2),
            e += a + f >= 1 ? p / l : p * Math.pow(2, 1 - f),
            e * l >= 2 && (a++,
            l /= 2),
            a + f >= c ? (s = 0,
            a = c) : a + f >= 1 ? (s = (e * l - 1) * Math.pow(2, i),
            a += f) : (s = e * Math.pow(2, f - 1) * Math.pow(2, i),
            a = 0)); i >= 8; t[n + h] = 255 & s,
            h += d,
            s /= 256,
            i -= 8)
                ;
            for (a = a << i | s,
            u += i; u > 0; t[n + h] = 255 & a,
            h += d,
            a /= 256,
            u -= 8)
                ;
            t[n + h - d] |= 128 * m
        }
        ,
        n.exports
    }),
    System.registerDynamic("6c", ["6b"], !0, function(t, e, n) {
        return n.exports = t("6b"),
        n.exports
    }),
    System.registerDynamic("6d", [], !0, function(t, e, n) {
        var r = {}.toString;
        return n.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t)
        }
        ,
        n.exports
    }),
    System.registerDynamic("6e", ["6d"], !0, function(t, e, n) {
        return n.exports = t("6d"),
        n.exports
    }),
    System.registerDynamic("buffer for the browser", ["<base64 to byte array passthrough>", "6c", "6e"], !0, function(t, e, n) {
        "use strict";
        function r() {
            function t() {}
            try {
                var e = new Uint8Array(1);
                return e.foo = function() {
                    return 42
                }
                ,
                e.constructor = t,
                42 === e.foo() && e.constructor === t && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }
        function i() {
            return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }
        function o(t) {
            return this instanceof o ? (o.TYPED_ARRAY_SUPPORT || (this.length = 0,
            this.parent = void 0),
            "number" == typeof t ? a(this, t) : "string" == typeof t ? s(this, t, arguments.length > 1 ? arguments[1] : "utf8") : l(this, t)) : arguments.length > 1 ? new o(t,arguments[1]) : new o(t)
        }
        function a(t, e) {
            if (t = m(t, e < 0 ? 0 : 0 | v(e)),
            !o.TYPED_ARRAY_SUPPORT)
                for (var n = 0; n < e; n++)
                    t[n] = 0;
            return t
        }
        function s(t, e, n) {
            "string" == typeof n && "" !== n || (n = "utf8");
            var r = 0 | y(e, n);
            return t = m(t, r),
            t.write(e, n),
            t
        }
        function l(t, e) {
            if (o.isBuffer(e))
                return u(t, e);
            if (K(e))
                return c(t, e);
            if (null == e)
                throw new TypeError("must start with number, buffer, array or string");
            if ("undefined" != typeof ArrayBuffer) {
                if (e.buffer instanceof ArrayBuffer)
                    return f(t, e);
                if (e instanceof ArrayBuffer)
                    return p(t, e)
            }
            return e.length ? h(t, e) : d(t, e)
        }
        function u(t, e) {
            var n = 0 | v(e.length);
            return t = m(t, n),
            e.copy(t, 0, 0, n),
            t
        }
        function c(t, e) {
            var n = 0 | v(e.length);
            t = m(t, n);
            for (var r = 0; r < n; r += 1)
                t[r] = 255 & e[r];
            return t
        }
        function f(t, e) {
            var n = 0 | v(e.length);
            t = m(t, n);
            for (var r = 0; r < n; r += 1)
                t[r] = 255 & e[r];
            return t
        }
        function p(t, e) {
            return o.TYPED_ARRAY_SUPPORT ? (e.byteLength,
            t = o._augment(new Uint8Array(e))) : t = f(t, new Uint8Array(e)),
            t
        }
        function h(t, e) {
            var n = 0 | v(e.length);
            t = m(t, n);
            for (var r = 0; r < n; r += 1)
                t[r] = 255 & e[r];
            return t
        }
        function d(t, e) {
            var n, r = 0;
            "Buffer" === e.type && K(e.data) && (n = e.data,
            r = 0 | v(n.length)),
            t = m(t, r);
            for (var i = 0; i < r; i += 1)
                t[i] = 255 & n[i];
            return t
        }
        function m(t, e) {
            o.TYPED_ARRAY_SUPPORT ? (t = o._augment(new Uint8Array(e)),
            t.__proto__ = o.prototype) : (t.length = e,
            t._isBuffer = !0);
            var n = 0 !== e && e <= o.poolSize >>> 1;
            return n && (t.parent = J),
            t
        }
        function v(t) {
            if (t >= i())
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
            return 0 | t
        }
        function g(t, e) {
            if (!(this instanceof g))
                return new g(t,e);
            var n = new o(t,e);
            return delete n.parent,
            n
        }
        function y(t, e) {
            "string" != typeof t && (t = "" + t);
            var n = t.length;
            if (0 === n)
                return 0;
            for (var r = !1; ; )
                switch (e) {
                case "ascii":
                case "binary":
                case "raw":
                case "raws":
                    return n;
                case "utf8":
                case "utf-8":
                    return H(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return q(t).length;
                default:
                    if (r)
                        return H(t).length;
                    e = ("" + e).toLowerCase(),
                    r = !0
                }
        }
        function b(t, e, n) {
            var r = !1;
            if (e = 0 | e,
            n = void 0 === n || n === 1 / 0 ? this.length : 0 | n,
            t || (t = "utf8"),
            e < 0 && (e = 0),
            n > this.length && (n = this.length),
            n <= e)
                return "";
            for (; ; )
                switch (t) {
                case "hex":
                    return C(this, e, n);
                case "utf8":
                case "utf-8":
                    return k(this, e, n);
                case "ascii":
                    return A(this, e, n);
                case "binary":
                    return D(this, e, n);
                case "base64":
                    return M(this, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return I(this, e, n);
                default:
                    if (r)
                        throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(),
                    r = !0
                }
        }
        function _(t, e, n, r) {
            n = Number(n) || 0;
            var i = t.length - n;
            r ? (r = Number(r),
            r > i && (r = i)) : r = i;
            var o = e.length;
            if (o % 2 !== 0)
                throw new Error("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; a < r; a++) {
                var s = parseInt(e.substr(2 * a, 2), 16);
                if (isNaN(s))
                    throw new Error("Invalid hex string");
                t[n + a] = s
            }
            return a
        }
        function w(t, e, n, r) {
            return W(H(e, t.length - n), t, n, r)
        }
        function x(t, e, n, r) {
            return W(z(e), t, n, r)
        }
        function $(t, e, n, r) {
            return x(t, e, n, r)
        }
        function E(t, e, n, r) {
            return W(q(e), t, n, r)
        }
        function S(t, e, n, r) {
            return W(Y(e, t.length - n), t, n, r)
        }
        function M(t, e, n) {
            return 0 === e && n === t.length ? X.fromByteArray(t) : X.fromByteArray(t.slice(e, n))
        }
        function k(t, e, n) {
            n = Math.min(t.length, n);
            for (var r = [], i = e; i < n; ) {
                var o = t[i]
                  , a = null
                  , s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (i + s <= n) {
                    var l, u, c, f;
                    switch (s) {
                    case 1:
                        o < 128 && (a = o);
                        break;
                    case 2:
                        l = t[i + 1],
                        128 === (192 & l) && (f = (31 & o) << 6 | 63 & l,
                        f > 127 && (a = f));
                        break;
                    case 3:
                        l = t[i + 1],
                        u = t[i + 2],
                        128 === (192 & l) && 128 === (192 & u) && (f = (15 & o) << 12 | (63 & l) << 6 | 63 & u,
                        f > 2047 && (f < 55296 || f > 57343) && (a = f));
                        break;
                    case 4:
                        l = t[i + 1],
                        u = t[i + 2],
                        c = t[i + 3],
                        128 === (192 & l) && 128 === (192 & u) && 128 === (192 & c) && (f = (15 & o) << 18 | (63 & l) << 12 | (63 & u) << 6 | 63 & c,
                        f > 65535 && f < 1114112 && (a = f))
                    }
                }
                null === a ? (a = 65533,
                s = 1) : a > 65535 && (a -= 65536,
                r.push(a >>> 10 & 1023 | 55296),
                a = 56320 | 1023 & a),
                r.push(a),
                i += s
            }
            return T(r)
        }
        function T(t) {
            var e = t.length;
            if (e <= Q)
                return String.fromCharCode.apply(String, t);
            for (var n = "", r = 0; r < e; )
                n += String.fromCharCode.apply(String, t.slice(r, r += Q));
            return n
        }
        function A(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; i < n; i++)
                r += String.fromCharCode(127 & t[i]);
            return r
        }
        function D(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var i = e; i < n; i++)
                r += String.fromCharCode(t[i]);
            return r
        }
        function C(t, e, n) {
            var r = t.length;
            (!e || e < 0) && (e = 0),
            (!n || n < 0 || n > r) && (n = r);
            for (var i = "", o = e; o < n; o++)
                i += V(t[o]);
            return i
        }
        function I(t, e, n) {
            for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2)
                i += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return i
        }
        function O(t, e, n) {
            if (t % 1 !== 0 || t < 0)
                throw new RangeError("offset is not uint");
            if (t + e > n)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function R(t, e, n, r, i, a) {
            if (!o.isBuffer(t))
                throw new TypeError("buffer must be a Buffer instance");
            if (e > i || e < a)
                throw new RangeError("value is out of bounds");
            if (n + r > t.length)
                throw new RangeError("index out of range")
        }
        function P(t, e, n, r) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 2); i < o; i++)
                t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
        }
        function F(t, e, n, r) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - n, 4); i < o; i++)
                t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255
        }
        function j(t, e, n, r, i, o) {
            if (e > i || e < o)
                throw new RangeError("value is out of bounds");
            if (n + r > t.length)
                throw new RangeError("index out of range");
            if (n < 0)
                throw new RangeError("index out of range")
        }
        function N(t, e, n, r, i) {
            return i || j(t, e, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
            Z.write(t, e, n, r, 23, 4),
            n + 4
        }
        function L(t, e, n, r, i) {
            return i || j(t, e, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
            Z.write(t, e, n, r, 52, 8),
            n + 8
        }
        function U(t) {
            if (t = B(t).replace(et, ""),
            t.length < 2)
                return "";
            for (; t.length % 4 !== 0; )
                t += "=";
            return t
        }
        function B(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }
        function V(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }
        function H(t, e) {
            e = e || 1 / 0;
            for (var n, r = t.length, i = null , o = [], a = 0; a < r; a++) {
                if (n = t.charCodeAt(a),
                n > 55295 && n < 57344) {
                    if (!i) {
                        if (n > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = n;
                        continue
                    }
                    if (n < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189),
                        i = n;
                        continue
                    }
                    n = (i - 55296 << 10 | n - 56320) + 65536
                } else
                    i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null ,
                n < 128) {
                    if ((e -= 1) < 0)
                        break;
                    o.push(n)
                } else if (n < 2048) {
                    if ((e -= 2) < 0)
                        break;
                    o.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((e -= 3) < 0)
                        break;
                    o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112))
                        throw new Error("Invalid code point");
                    if ((e -= 4) < 0)
                        break;
                    o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return o
        }
        function z(t) {
            for (var e = [], n = 0; n < t.length; n++)
                e.push(255 & t.charCodeAt(n));
            return e
        }
        function Y(t, e) {
            for (var n, r, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); a++)
                n = t.charCodeAt(a),
                r = n >> 8,
                i = n % 256,
                o.push(i),
                o.push(r);
            return o
        }
        function q(t) {
            return X.toByteArray(U(t))
        }
        function W(t, e, n, r) {
            for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); i++)
                e[i + n] = t[i];
            return i
        }
        var G = this
          , X = t("<base64 to byte array passthrough>")
          , Z = t("6c")
          , K = t("6e");
        e.Buffer = o,
        e.SlowBuffer = g,
        e.INSPECT_MAX_BYTES = 50,
        o.poolSize = 8192;
        var J = {};
        o.TYPED_ARRAY_SUPPORT = void 0 !== G.TYPED_ARRAY_SUPPORT ? G.TYPED_ARRAY_SUPPORT : r(),
        o.TYPED_ARRAY_SUPPORT ? (o.prototype.__proto__ = Uint8Array.prototype,
        o.__proto__ = Uint8Array) : (o.prototype.length = void 0,
        o.prototype.parent = void 0),
        o.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }
        ,
        o.compare = function(t, e) {
            if (!o.isBuffer(t) || !o.isBuffer(e))
                throw new TypeError("Arguments must be Buffers");
            if (t === e)
                return 0;
            for (var n = t.length, r = e.length, i = 0, a = Math.min(n, r); i < a && t[i] === e[i]; )
                ++i;
            return i !== a && (n = t[i],
            r = e[i]),
            n < r ? -1 : r < n ? 1 : 0
        }
        ,
        o.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
            }
        }
        ,
        o.concat = function(t, e) {
            if (!K(t))
                throw new TypeError("list argument must be an Array of Buffers.");
            if (0 === t.length)
                return new o(0);
            var n;
            if (void 0 === e)
                for (e = 0,
                n = 0; n < t.length; n++)
                    e += t[n].length;
            var r = new o(e)
              , i = 0;
            for (n = 0; n < t.length; n++) {
                var a = t[n];
                a.copy(r, i),
                i += a.length
            }
            return r
        }
        ,
        o.byteLength = y,
        o.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? k(this, 0, t) : b.apply(this, arguments)
        }
        ,
        o.prototype.equals = function(t) {
            if (!o.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === o.compare(this, t)
        }
        ,
        o.prototype.inspect = function() {
            var t = ""
              , n = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "),
            this.length > n && (t += " ... ")),
            "<Buffer " + t + ">"
        }
        ,
        o.prototype.compare = function(t) {
            if (!o.isBuffer(t))
                throw new TypeError("Argument must be a Buffer");
            return this === t ? 0 : o.compare(this, t)
        }
        ,
        o.prototype.indexOf = function(t, e) {
            function n(t, e, n) {
                for (var r = -1, i = 0; n + i < t.length; i++)
                    if (t[n + i] === e[r === -1 ? 0 : i - r]) {
                        if (r === -1 && (r = i),
                        i - r + 1 === e.length)
                            return n + r
                    } else
                        r = -1;
                return -1
            }
            if (e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648),
            e >>= 0,
            0 === this.length)
                return -1;
            if (e >= this.length)
                return -1;
            if (e < 0 && (e = Math.max(this.length + e, 0)),
            "string" == typeof t)
                return 0 === t.length ? -1 : String.prototype.indexOf.call(this, t, e);
            if (o.isBuffer(t))
                return n(this, t, e);
            if ("number" == typeof t)
                return o.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, t, e) : n(this, [t], e);
            throw new TypeError("val must be string, number or Buffer")
        }
        ,
        o.prototype.get = function(t) {
            return console.log(".get() is deprecated. Access using array indexes instead."),
            this.readUInt8(t)
        }
        ,
        o.prototype.set = function(t, e) {
            return console.log(".set() is deprecated. Access using array indexes instead."),
            this.writeUInt8(t, e)
        }
        ,
        o.prototype.write = function(t, e, n, r) {
            if (void 0 === e)
                r = "utf8",
                n = this.length,
                e = 0;
            else if (void 0 === n && "string" == typeof e)
                r = e,
                n = this.length,
                e = 0;
            else if (isFinite(e))
                e = 0 | e,
                isFinite(n) ? (n = 0 | n,
                void 0 === r && (r = "utf8")) : (r = n,
                n = void 0);
            else {
                var i = r;
                r = e,
                e = 0 | n,
                n = i
            }
            var o = this.length - e;
            if ((void 0 === n || n > o) && (n = o),
            t.length > 0 && (n < 0 || e < 0) || e > this.length)
                throw new RangeError("attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var a = !1; ; )
                switch (r) {
                case "hex":
                    return _(this, t, e, n);
                case "utf8":
                case "utf-8":
                    return w(this, t, e, n);
                case "ascii":
                    return x(this, t, e, n);
                case "binary":
                    return $(this, t, e, n);
                case "base64":
                    return E(this, t, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return S(this, t, e, n);
                default:
                    if (a)
                        throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(),
                    a = !0
                }
        }
        ,
        o.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        var Q = 4096;
        o.prototype.slice = function(t, e) {
            var n = this.length;
            t = ~~t,
            e = void 0 === e ? n : ~~e,
            t < 0 ? (t += n,
            t < 0 && (t = 0)) : t > n && (t = n),
            e < 0 ? (e += n,
            e < 0 && (e = 0)) : e > n && (e = n),
            e < t && (e = t);
            var r;
            if (o.TYPED_ARRAY_SUPPORT)
                r = o._augment(this.subarray(t, e));
            else {
                var i = e - t;
                r = new o(i,(void 0));
                for (var a = 0; a < i; a++)
                    r[a] = this[a + t]
            }
            return r.length && (r.parent = this.parent || this),
            r
        }
        ,
        o.prototype.readUIntLE = function(t, e, n) {
            t = 0 | t,
            e = 0 | e,
            n || O(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                r += this[t + o] * i;
            return r
        }
        ,
        o.prototype.readUIntBE = function(t, e, n) {
            t = 0 | t,
            e = 0 | e,
            n || O(t, e, this.length);
            for (var r = this[t + --e], i = 1; e > 0 && (i *= 256); )
                r += this[t + --e] * i;
            return r
        }
        ,
        o.prototype.readUInt8 = function(t, e) {
            return e || O(t, 1, this.length),
            this[t]
        }
        ,
        o.prototype.readUInt16LE = function(t, e) {
            return e || O(t, 2, this.length),
            this[t] | this[t + 1] << 8
        }
        ,
        o.prototype.readUInt16BE = function(t, e) {
            return e || O(t, 2, this.length),
            this[t] << 8 | this[t + 1]
        }
        ,
        o.prototype.readUInt32LE = function(t, e) {
            return e || O(t, 4, this.length),
            (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }
        ,
        o.prototype.readUInt32BE = function(t, e) {
            return e || O(t, 4, this.length),
            16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }
        ,
        o.prototype.readIntLE = function(t, e, n) {
            t = 0 | t,
            e = 0 | e,
            n || O(t, e, this.length);
            for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                r += this[t + o] * i;
            return i *= 128,
            r >= i && (r -= Math.pow(2, 8 * e)),
            r
        }
        ,
        o.prototype.readIntBE = function(t, e, n) {
            t = 0 | t,
            e = 0 | e,
            n || O(t, e, this.length);
            for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256); )
                o += this[t + --r] * i;
            return i *= 128,
            o >= i && (o -= Math.pow(2, 8 * e)),
            o
        }
        ,
        o.prototype.readInt8 = function(t, e) {
            return e || O(t, 1, this.length),
            128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
        }
        ,
        o.prototype.readInt16LE = function(t, e) {
            e || O(t, 2, this.length);
            var n = this[t] | this[t + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        o.prototype.readInt16BE = function(t, e) {
            e || O(t, 2, this.length);
            var n = this[t + 1] | this[t] << 8;
            return 32768 & n ? 4294901760 | n : n
        }
        ,
        o.prototype.readInt32LE = function(t, e) {
            return e || O(t, 4, this.length),
            this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }
        ,
        o.prototype.readInt32BE = function(t, e) {
            return e || O(t, 4, this.length),
            this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }
        ,
        o.prototype.readFloatLE = function(t, e) {
            return e || O(t, 4, this.length),
            Z.read(this, t, !0, 23, 4)
        }
        ,
        o.prototype.readFloatBE = function(t, e) {
            return e || O(t, 4, this.length),
            Z.read(this, t, !1, 23, 4)
        }
        ,
        o.prototype.readDoubleLE = function(t, e) {
            return e || O(t, 8, this.length),
            Z.read(this, t, !0, 52, 8)
        }
        ,
        o.prototype.readDoubleBE = function(t, e) {
            return e || O(t, 8, this.length),
            Z.read(this, t, !1, 52, 8)
        }
        ,
        o.prototype.writeUIntLE = function(t, e, n, r) {
            t = +t,
            e = 0 | e,
            n = 0 | n,
            r || R(this, t, e, n, Math.pow(2, 8 * n), 0);
            var i = 1
              , o = 0;
            for (this[e] = 255 & t; ++o < n && (i *= 256); )
                this[e + o] = t / i & 255;
            return e + n
        }
        ,
        o.prototype.writeUIntBE = function(t, e, n, r) {
            t = +t,
            e = 0 | e,
            n = 0 | n,
            r || R(this, t, e, n, Math.pow(2, 8 * n), 0);
            var i = n - 1
              , o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
                this[e + i] = t / o & 255;
            return e + n
        }
        ,
        o.prototype.writeUInt8 = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 1, 255, 0),
            o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            this[e] = 255 & t,
            e + 1
        }
        ,
        o.prototype.writeUInt16LE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 2, 65535, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : P(this, t, e, !0),
            e + 2
        }
        ,
        o.prototype.writeUInt16BE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 2, 65535, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : P(this, t, e, !1),
            e + 2
        }
        ,
        o.prototype.writeUInt32LE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 4, 4294967295, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
            this[e + 2] = t >>> 16,
            this[e + 1] = t >>> 8,
            this[e] = 255 & t) : F(this, t, e, !0),
            e + 4
        }
        ,
        o.prototype.writeUInt32BE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 4, 4294967295, 0),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : F(this, t, e, !1),
            e + 4
        }
        ,
        o.prototype.writeIntLE = function(t, e, n, r) {
            if (t = +t,
            e = 0 | e,
            !r) {
                var i = Math.pow(2, 8 * n - 1);
                R(this, t, e, n, i - 1, -i)
            }
            var o = 0
              , a = 1
              , s = t < 0 ? 1 : 0;
            for (this[e] = 255 & t; ++o < n && (a *= 256); )
                this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }
        ,
        o.prototype.writeIntBE = function(t, e, n, r) {
            if (t = +t,
            e = 0 | e,
            !r) {
                var i = Math.pow(2, 8 * n - 1);
                R(this, t, e, n, i - 1, -i)
            }
            var o = n - 1
              , a = 1
              , s = t < 0 ? 1 : 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
                this[e + o] = (t / a >> 0) - s & 255;
            return e + n
        }
        ,
        o.prototype.writeInt8 = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 1, 127, -128),
            o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            this[e] = 255 & t,
            e + 1
        }
        ,
        o.prototype.writeInt16LE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 2, 32767, -32768),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : P(this, t, e, !0),
            e + 2
        }
        ,
        o.prototype.writeInt16BE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 2, 32767, -32768),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : P(this, t, e, !1),
            e + 2
        }
        ,
        o.prototype.writeInt32LE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 4, 2147483647, -2147483648),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8,
            this[e + 2] = t >>> 16,
            this[e + 3] = t >>> 24) : F(this, t, e, !0),
            e + 4
        }
        ,
        o.prototype.writeInt32BE = function(t, e, n) {
            return t = +t,
            e = 0 | e,
            n || R(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : F(this, t, e, !1),
            e + 4
        }
        ,
        o.prototype.writeFloatLE = function(t, e, n) {
            return N(this, t, e, !0, n)
        }
        ,
        o.prototype.writeFloatBE = function(t, e, n) {
            return N(this, t, e, !1, n)
        }
        ,
        o.prototype.writeDoubleLE = function(t, e, n) {
            return L(this, t, e, !0, n)
        }
        ,
        o.prototype.writeDoubleBE = function(t, e, n) {
            return L(this, t, e, !1, n)
        }
        ,
        o.prototype.copy = function(t, e, n, r) {
            if (n || (n = 0),
            r || 0 === r || (r = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            r > 0 && r < n && (r = n),
            r === n)
                return 0;
            if (0 === t.length || 0 === this.length)
                return 0;
            if (e < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("sourceStart out of bounds");
            if (r < 0)
                throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length),
            t.length - e < r - n && (r = t.length - e + n);
            var i, a = r - n;
            if (this === t && n < e && e < r)
                for (i = a - 1; i >= 0; i--)
                    t[i + e] = this[i + n];
            else if (a < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < a; i++)
                    t[i + e] = this[i + n];
            else
                t._set(this.subarray(n, n + a), e);
            return a
        }
        ,
        o.prototype.fill = function(t, e, n) {
            if (t || (t = 0),
            e || (e = 0),
            n || (n = this.length),
            n < e)
                throw new RangeError("end < start");
            if (n !== e && 0 !== this.length) {
                if (e < 0 || e >= this.length)
                    throw new RangeError("start out of bounds");
                if (n < 0 || n > this.length)
                    throw new RangeError("end out of bounds");
                var r;
                if ("number" == typeof t)
                    for (r = e; r < n; r++)
                        this[r] = t;
                else {
                    var i = H(t.toString())
                      , o = i.length;
                    for (r = e; r < n; r++)
                        this[r] = i[r % o]
                }
                return this
            }
        }
        ,
        o.prototype.toArrayBuffer = function() {
            if ("undefined" != typeof Uint8Array) {
                if (o.TYPED_ARRAY_SUPPORT)
                    return new o(this).buffer;
                for (var t = new Uint8Array(this.length), e = 0, n = t.length; e < n; e += 1)
                    t[e] = this[e];
                return t.buffer;
            }
            throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
        }
        ;
        var tt = o.prototype;
        o._augment = function(t) {
            return t.constructor = o,
            t._isBuffer = !0,
            t._set = t.set,
            t.get = tt.get,
            t.set = tt.set,
            t.write = tt.write,
            t.toString = tt.toString,
            t.toLocaleString = tt.toString,
            t.toJSON = tt.toJSON,
            t.equals = tt.equals,
            t.compare = tt.compare,
            t.indexOf = tt.indexOf,
            t.copy = tt.copy,
            t.slice = tt.slice,
            t.readUIntLE = tt.readUIntLE,
            t.readUIntBE = tt.readUIntBE,
            t.readUInt8 = tt.readUInt8,
            t.readUInt16LE = tt.readUInt16LE,
            t.readUInt16BE = tt.readUInt16BE,
            t.readUInt32LE = tt.readUInt32LE,
            t.readUInt32BE = tt.readUInt32BE,
            t.readIntLE = tt.readIntLE,
            t.readIntBE = tt.readIntBE,
            t.readInt8 = tt.readInt8,
            t.readInt16LE = tt.readInt16LE,
            t.readInt16BE = tt.readInt16BE,
            t.readInt32LE = tt.readInt32LE,
            t.readInt32BE = tt.readInt32BE,
            t.readFloatLE = tt.readFloatLE,
            t.readFloatBE = tt.readFloatBE,
            t.readDoubleLE = tt.readDoubleLE,
            t.readDoubleBE = tt.readDoubleBE,
            t.writeUInt8 = tt.writeUInt8,
            t.writeUIntLE = tt.writeUIntLE,
            t.writeUIntBE = tt.writeUIntBE,
            t.writeUInt16LE = tt.writeUInt16LE,
            t.writeUInt16BE = tt.writeUInt16BE,
            t.writeUInt32LE = tt.writeUInt32LE,
            t.writeUInt32BE = tt.writeUInt32BE,
            t.writeIntLE = tt.writeIntLE,
            t.writeIntBE = tt.writeIntBE,
            t.writeInt8 = tt.writeInt8,
            t.writeInt16LE = tt.writeInt16LE,
            t.writeInt16BE = tt.writeInt16BE,
            t.writeInt32LE = tt.writeInt32LE,
            t.writeInt32BE = tt.writeInt32BE,
            t.writeFloatLE = tt.writeFloatLE,
            t.writeFloatBE = tt.writeFloatBE,
            t.writeDoubleLE = tt.writeDoubleLE,
            t.writeDoubleBE = tt.writeDoubleBE,
            t.fill = tt.fill,
            t.inspect = tt.inspect,
            t.toArrayBuffer = tt.toArrayBuffer,
            t
        }
        ;
        var et = /[^+\/0-9A-Za-z-_]/g;
        return n.exports
    }),
    System.registerDynamic("<buffer for the browser passthrough>", ["buffer for the browser"], !0, function(t, e, n) {
        return n.exports = t("buffer for the browser"),
        n.exports
    }),
    System.registerDynamic("buffer from node attempt", ["<buffer for the browser passthrough>"], !0, function(e, n, r) {
        return r.exports = System._nodeRequire ? System._nodeRequire("buffer") : e("<buffer for the browser passthrough>"),
        r.exports
    }),
    System.registerDynamic("<buffer from node attempt passthrough>", ["buffer from node attempt"], !0, function(t, e, n) {
        return n.exports = t("buffer from node attempt"),
        n.exports
    }),
    System.registerDynamic("72", ["66", "68", "<buffer from node attempt passthrough>"], !0, function(t, e, n) {
        var r = this;
        return function(n) {
            "use strict";
            function i(t) {
                if (t) {
                    var e = t.length || t.byteLength
                      , n = y.log2(e);
                    x[n].push(t)
                }
            }
            function o(t) {
                i(t.buffer)
            }
            function a(t) {
                var t = y.nextPow2(t)
                  , e = y.log2(t)
                  , n = x[e];
                return n.length > 0 ? n.pop() : new ArrayBuffer(t)
            }
            function s(t) {
                return new Uint8Array(a(t),0,t)
            }
            function l(t) {
                return new Uint16Array(a(2 * t),0,t)
            }
            function u(t) {
                return new Uint32Array(a(4 * t),0,t)
            }
            function c(t) {
                return new Int8Array(a(t),0,t)
            }
            function f(t) {
                return new Int16Array(a(2 * t),0,t)
            }
            function p(t) {
                return new Int32Array(a(4 * t),0,t)
            }
            function h(t) {
                return new Float32Array(a(4 * t),0,t)
            }
            function d(t) {
                return new Float64Array(a(8 * t),0,t)
            }
            function m(t) {
                return _ ? new Uint8ClampedArray(a(t),0,t) : s(t)
            }
            function v(t) {
                return new DataView(a(t),0,t)
            }
            function g(t) {
                t = y.nextPow2(t);
                var e = y.log2(t)
                  , r = $[e];
                return r.length > 0 ? r.pop() : new n(t)
            }
            var y = t("66")
              , b = t("68");
            r.__TYPEDARRAY_POOL || (r.__TYPEDARRAY_POOL = {
                UINT8: b([32, 0]),
                UINT16: b([32, 0]),
                UINT32: b([32, 0]),
                INT8: b([32, 0]),
                INT16: b([32, 0]),
                INT32: b([32, 0]),
                FLOAT: b([32, 0]),
                DOUBLE: b([32, 0]),
                DATA: b([32, 0]),
                UINT8C: b([32, 0]),
                BUFFER: b([32, 0])
            });
            var _ = "undefined" != typeof Uint8ClampedArray
              , w = r.__TYPEDARRAY_POOL;
            w.UINT8C || (w.UINT8C = b([32, 0])),
            w.BUFFER || (w.BUFFER = b([32, 0]));
            var x = w.DATA
              , $ = w.BUFFER;
            e.free = function(t) {
                if (n.isBuffer(t))
                    $[y.log2(t.length)].push(t);
                else {
                    if ("[object ArrayBuffer]" !== Object.prototype.toString.call(t) && (t = t.buffer),
                    !t)
                        return;
                    var e = t.length || t.byteLength
                      , r = 0 | y.log2(e);
                    x[r].push(t)
                }
            }
            ,
            e.freeUint8 = e.freeUint16 = e.freeUint32 = e.freeInt8 = e.freeInt16 = e.freeInt32 = e.freeFloat32 = e.freeFloat = e.freeFloat64 = e.freeDouble = e.freeUint8Clamped = e.freeDataView = o,
            e.freeArrayBuffer = i,
            e.freeBuffer = function(t) {
                $[y.log2(t.length)].push(t)
            }
            ,
            e.malloc = function(t, e) {
                if (void 0 === e || "arraybuffer" === e)
                    return a(t);
                switch (e) {
                case "uint8":
                    return s(t);
                case "uint16":
                    return l(t);
                case "uint32":
                    return u(t);
                case "int8":
                    return c(t);
                case "int16":
                    return f(t);
                case "int32":
                    return p(t);
                case "float":
                case "float32":
                    return h(t);
                case "double":
                case "float64":
                    return d(t);
                case "uint8_clamped":
                    return m(t);
                case "buffer":
                    return g(t);
                case "data":
                case "dataview":
                    return v(t);
                default:
                    return null
                }
                return null
            }
            ,
            e.mallocArrayBuffer = a,
            e.mallocUint8 = s,
            e.mallocUint16 = l,
            e.mallocUint32 = u,
            e.mallocInt8 = c,
            e.mallocInt16 = f,
            e.mallocInt32 = p,
            e.mallocFloat32 = e.mallocFloat = h,
            e.mallocFloat64 = e.mallocDouble = d,
            e.mallocUint8Clamped = m,
            e.mallocDataView = v,
            e.mallocBuffer = g,
            e.clearCache = function() {
                for (var t = 0; t < 32; ++t)
                    w.UINT8[t].length = 0,
                    w.UINT16[t].length = 0,
                    w.UINT32[t].length = 0,
                    w.INT8[t].length = 0,
                    w.INT16[t].length = 0,
                    w.INT32[t].length = 0,
                    w.FLOAT[t].length = 0,
                    w.DOUBLE[t].length = 0,
                    w.UINT8C[t].length = 0,
                    x[t].length = 0,
                    $[t].length = 0
            }
        }(t("<buffer from node attempt passthrough>").Buffer),
        n.exports
    }),
    System.registerDynamic("4b", ["72"], !0, function(t, e, n) {
        return n.exports = t("72"),
        n.exports
    }),
    System.registerDynamic("73", ["4d", "4c", "4b"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            v = [t.LINEAR, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_NEAREST],
            g = [t.NEAREST, t.LINEAR, t.NEAREST_MIPMAP_NEAREST, t.NEAREST_MIPMAP_LINEAR, t.LINEAR_MIPMAP_NEAREST, t.LINEAR_MIPMAP_LINEAR],
            y = [t.REPEAT, t.CLAMP_TO_EDGE, t.MIRRORED_REPEAT]
        }
        function i(t, e, n) {
            var r = t.gl
              , i = r.getParameter(r.MAX_TEXTURE_SIZE);
            if (e < 0 || e > i || n < 0 || n > i)
                throw new Error("gl-texture2d: Invalid texture size");
            return t._shape = [e, n],
            t.bind(),
            r.texImage2D(r.TEXTURE_2D, 0, t.format, e, n, 0, t.format, t.type, null ),
            t._mipLevels = [0],
            t
        }
        function o(t, e, n, r, i, o) {
            this.gl = t,
            this.handle = e,
            this.format = i,
            this.type = o,
            this._shape = [n, r],
            this._mipLevels = [0],
            this._magFilter = t.NEAREST,
            this._minFilter = t.NEAREST,
            this._wrapS = t.CLAMP_TO_EDGE,
            this._wrapT = t.CLAMP_TO_EDGE,
            this._anisoSamples = 1;
            var a = this
              , s = [this._wrapS, this._wrapT];
            Object.defineProperties(s, [{
                get: function() {
                    return a._wrapS
                },
                set: function(t) {
                    return a.wrapS = t
                }
            }, {
                get: function() {
                    return a._wrapT
                },
                set: function(t) {
                    return a.wrapT = t
                }
            }]),
            this._wrapVector = s;
            var l = [this._shape[0], this._shape[1]];
            Object.defineProperties(l, [{
                get: function() {
                    return a._shape[0]
                },
                set: function(t) {
                    return a.width = t
                }
            }, {
                get: function() {
                    return a._shape[1]
                },
                set: function(t) {
                    return a.height = t
                }
            }]),
            this._shapeVector = l
        }
        function a(t, e) {
            return 3 === t.length ? 1 === e[2] && e[1] === t[0] * t[2] && e[0] === t[2] : 1 === e[0] && e[1] === t[0]
        }
        function s(t, e, n, r, i, o, s, l) {
            var u = l.dtype
              , c = l.shape.slice();
            if (c.length < 2 || c.length > 3)
                throw new Error("gl-texture2d: Invalid ndarray, must be 2d or 3d");
            var f = 0
              , p = 0
              , v = a(c, l.stride.slice());
            "float32" === u ? f = t.FLOAT : "float64" === u ? (f = t.FLOAT,
            v = !1,
            u = "float32") : "uint8" === u ? f = t.UNSIGNED_BYTE : (f = t.UNSIGNED_BYTE,
            v = !1,
            u = "uint8");
            var g = 1;
            if (2 === c.length)
                p = t.LUMINANCE,
                c = [c[0], c[1], 1],
                l = h(l.data, c, [l.stride[0], l.stride[1], 1], l.offset);
            else {
                if (3 !== c.length)
                    throw new Error("gl-texture2d: Invalid shape for texture");
                if (1 === c[2])
                    p = t.ALPHA;
                else if (2 === c[2])
                    p = t.LUMINANCE_ALPHA;
                else if (3 === c[2])
                    p = t.RGB;
                else {
                    if (4 !== c[2])
                        throw new Error("gl-texture2d: Invalid shape for pixel coords");
                    p = t.RGBA
                }
                g = c[2]
            }
            if (p !== t.LUMINANCE && p !== t.ALPHA || i !== t.LUMINANCE && i !== t.ALPHA || (p = i),
            p !== i)
                throw new Error("gl-texture2d: Incompatible texture format for setPixels");
            var y = l.size
              , _ = s.indexOf(r) < 0;
            if (_ && s.push(r),
            f === o && v)
                0 === l.offset && l.data.length === y ? _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, l.data) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, l.data) : _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, l.data.subarray(l.offset, l.offset + y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, l.data.subarray(l.offset, l.offset + y));
            else {
                var w;
                w = o === t.FLOAT ? m.mallocFloat32(y) : m.mallocUint8(y);
                var x = h(w, c, [c[2], c[2] * c[0], 1]);
                f === t.FLOAT && o === t.UNSIGNED_BYTE ? b(x, l) : d.assign(x, l),
                _ ? t.texImage2D(t.TEXTURE_2D, r, i, c[0], c[1], 0, i, o, w.subarray(0, y)) : t.texSubImage2D(t.TEXTURE_2D, r, e, n, c[0], c[1], i, o, w.subarray(0, y)),
                o === t.FLOAT ? m.freeFloat32(w) : m.freeUint8(w)
            }
        }
        function l(t) {
            var e = t.createTexture();
            return t.bindTexture(t.TEXTURE_2D, e),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            e
        }
        function u(t, e, n, r, i) {
            var a = t.getParameter(t.MAX_TEXTURE_SIZE);
            if (e < 0 || e > a || n < 0 || n > a)
                throw new Error("gl-texture2d: Invalid texture shape");
            if (i === t.FLOAT && !t.getExtension("OES_texture_float"))
                throw new Error("gl-texture2d: Floating point textures not supported on this platform");
            var s = l(t);
            return t.texImage2D(t.TEXTURE_2D, 0, r, e, n, 0, r, i, null ),
            new o(t,s,e,n,r,i)
        }
        function c(t, e, n, r) {
            var i = l(t);
            return t.texImage2D(t.TEXTURE_2D, 0, n, n, r, e),
            new o(t,i,0 | e.width,0 | e.height,n,r)
        }
        function f(t, e) {
            var n = e.dtype
              , r = e.shape.slice()
              , i = t.getParameter(t.MAX_TEXTURE_SIZE);
            if (r[0] < 0 || r[0] > i || r[1] < 0 || r[1] > i)
                throw new Error("gl-texture2d: Invalid texture size");
            var s = a(r, e.stride.slice())
              , u = 0;
            "float32" === n ? u = t.FLOAT : "float64" === n ? (u = t.FLOAT,
            s = !1,
            n = "float32") : "uint8" === n ? u = t.UNSIGNED_BYTE : (u = t.UNSIGNED_BYTE,
            s = !1,
            n = "uint8");
            var c = 0;
            if (2 === r.length)
                c = t.LUMINANCE,
                r = [r[0], r[1], 1],
                e = h(e.data, r, [e.stride[0], e.stride[1], 1], e.offset);
            else {
                if (3 !== r.length)
                    throw new Error("gl-texture2d: Invalid shape for texture");
                if (1 === r[2])
                    c = t.ALPHA;
                else if (2 === r[2])
                    c = t.LUMINANCE_ALPHA;
                else if (3 === r[2])
                    c = t.RGB;
                else {
                    if (4 !== r[2])
                        throw new Error("gl-texture2d: Invalid shape for pixel coords");
                    c = t.RGBA
                }
            }
            u !== t.FLOAT || t.getExtension("OES_texture_float") || (u = t.UNSIGNED_BYTE,
            s = !1);
            var f, p, v = e.size;
            if (s)
                f = 0 === e.offset && e.data.length === v ? e.data : e.data.subarray(e.offset, e.offset + v);
            else {
                var g = [r[2], r[2] * r[0], 1];
                p = m.malloc(v, n);
                var y = h(p, r, g, 0);
                "float32" !== n && "float64" !== n || u !== t.UNSIGNED_BYTE ? d.assign(y, e) : b(y, e),
                f = p.subarray(0, v)
            }
            var _ = l(t);
            return t.texImage2D(t.TEXTURE_2D, 0, c, r[0], r[1], 0, c, u, f),
            s || m.free(p),
            new o(t,_,r[0],r[1],c,u)
        }
        function p(t) {
            if (arguments.length <= 1)
                throw new Error("gl-texture2d: Missing arguments for texture2d constructor");
            if (v || r(t),
            "number" == typeof arguments[1])
                return u(t, arguments[1], arguments[2], arguments[3] || t.RGBA, arguments[4] || t.UNSIGNED_BYTE);
            if (Array.isArray(arguments[1]))
                return u(t, 0 | arguments[1][0], 0 | arguments[1][1], arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
            if ("object" == typeof arguments[1]) {
                var e = arguments[1];
                if (e instanceof HTMLCanvasElement || e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof ImageData)
                    return c(t, e, arguments[2] || t.RGBA, arguments[3] || t.UNSIGNED_BYTE);
                if (e.shape && e.data && e.stride)
                    return f(t, e)
            }
            throw new Error("gl-texture2d: Invalid arguments for texture2d constructor")
        }
        var h = t("4d")
          , d = t("4c")
          , m = t("4b");
        n.exports = p;
        var v = null
          , g = null
          , y = null
          , b = function(t, e) {
            d.muls(t, e, 255)
        }
          , _ = o.prototype;
        return Object.defineProperties(_, {
            minFilter: {
                get: function() {
                    return this._minFilter
                },
                set: function(t) {
                    this.bind();
                    var e = this.gl;
                    if (this.type === e.FLOAT && v.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
                    g.indexOf(t) < 0)
                        throw new Error("gl-texture2d: Unknown filter mode " + t);
                    return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t),
                    this._minFilter = t
                }
            },
            magFilter: {
                get: function() {
                    return this._magFilter
                },
                set: function(t) {
                    this.bind();
                    var e = this.gl;
                    if (this.type === e.FLOAT && v.indexOf(t) >= 0 && (e.getExtension("OES_texture_float_linear") || (t = e.NEAREST)),
                    g.indexOf(t) < 0)
                        throw new Error("gl-texture2d: Unknown filter mode " + t);
                    return e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t),
                    this._magFilter = t
                }
            },
            mipSamples: {
                get: function() {
                    return this._anisoSamples
                },
                set: function(t) {
                    var e = this._anisoSamples;
                    if (this._anisoSamples = 0 | Math.max(t, 1),
                    e !== this._anisoSamples) {
                        var n = gl.getExtension("EXT_texture_filter_anisotropic");
                        n && this.gl.texParameterf(this.gl.TEXTURE_2D, n.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples)
                    }
                    return this._anisoSamples
                }
            },
            wrapS: {
                get: function() {
                    return this._wrapS
                },
                set: function(t) {
                    if (this.bind(),
                    y.indexOf(t) < 0)
                        throw new Error("gl-texture2d: Unknown wrap mode " + t);
                    return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, t),
                    this._wrapS = t
                }
            },
            wrapT: {
                get: function() {
                    return this._wrapT
                },
                set: function(t) {
                    if (this.bind(),
                    y.indexOf(t) < 0)
                        throw new Error("gl-texture2d: Unknown wrap mode " + t);
                    return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, t),
                    this._wrapT = t
                }
            },
            wrap: {
                get: function() {
                    return this._wrapVector
                },
                set: function(t) {
                    if (Array.isArray(t) || (t = [t, t]),
                    2 !== t.length)
                        throw new Error("gl-texture2d: Must specify wrap mode for rows and columns");
                    for (var e = 0; e < 2; ++e)
                        if (y.indexOf(t[e]) < 0)
                            throw new Error("gl-texture2d: Unknown wrap mode " + t);
                    this._wrapS = t[0],
                    this._wrapT = t[1];
                    var n = this.gl;
                    return this.bind(),
                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, this._wrapS),
                    n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, this._wrapT),
                    t
                }
            },
            shape: {
                get: function() {
                    return this._shapeVector
                },
                set: function(t) {
                    if (Array.isArray(t)) {
                        if (2 !== t.length)
                            throw new Error("gl-texture2d: Invalid texture shape")
                    } else
                        t = [0 | t, 0 | t];
                    return i(this, 0 | t[0], 0 | t[1]),
                    [0 | t[0], 0 | t[1]]
                }
            },
            width: {
                get: function() {
                    return this._shape[0]
                },
                set: function(t) {
                    return t = 0 | t,
                    i(this, t, this._shape[1]),
                    t
                }
            },
            height: {
                get: function() {
                    return this._shape[1]
                },
                set: function(t) {
                    return t = 0 | t,
                    i(this, this._shape[0], t),
                    t
                }
            }
        }),
        _.bind = function(t) {
            var e = this.gl;
            return void 0 !== t && e.activeTexture(e.TEXTURE0 + (0 | t)),
            e.bindTexture(e.TEXTURE_2D, this.handle),
            void 0 !== t ? 0 | t : e.getParameter(e.ACTIVE_TEXTURE) - e.TEXTURE0
        }
        ,
        _.dispose = function() {
            this.gl.deleteTexture(this.handle)
        }
        ,
        _.generateMipmap = function() {
            this.bind(),
            this.gl.generateMipmap(this.gl.TEXTURE_2D);
            for (var t = Math.min(this._shape[0], this._shape[1]), e = 0; t > 0; ++e,
            t >>>= 1)
                this._mipLevels.indexOf(e) < 0 && this._mipLevels.push(e)
        }
        ,
        _.setPixels = function(t, e, n, r) {
            var i = this.gl;
            if (this.bind(),
            Array.isArray(e) ? (r = n,
            n = 0 | e[1],
            e = 0 | e[0]) : (e = e || 0,
            n = n || 0),
            r = r || 0,
            t instanceof HTMLCanvasElement || t instanceof ImageData || t instanceof HTMLImageElement || t instanceof HTMLVideoElement) {
                var o = this._mipLevels.indexOf(r) < 0;
                o ? (i.texImage2D(i.TEXTURE_2D, 0, this.format, this.format, this.type, t),
                this._mipLevels.push(r)) : i.texSubImage2D(i.TEXTURE_2D, r, e, n, this.format, this.type, t)
            } else {
                if (!(t.shape && t.stride && t.data))
                    throw new Error("gl-texture2d: Unsupported data type");
                if (t.shape.length < 2 || e + t.shape[1] > this._shape[1] >>> r || n + t.shape[0] > this._shape[0] >>> r || e < 0 || n < 0)
                    throw new Error("gl-texture2d: Texture dimensions are out of bounds");
                s(i, e, n, r, this.format, this.type, this._mipLevels, t)
            }
        }
        ,
        n.exports
    }),
    System.registerDynamic("55", ["73"], !0, function(t, e, n) {
        return n.exports = t("73"),
        n.exports
    }),
    System.registerDynamic("74", ["55"], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            e.forEach(function(e) {
                var n = i(t, e.img);
                e.sprites.filter(function(t) {
                    return !!t
                }).forEach(function(t) {
                    return t.tex = n
                })
            })
        }
        var i = t("55");
        return e.createTexturesForSpriteSheets = r,
        n.exports
    }),
    System.registerDynamic("75", [], !0, function(t, e, n) {
        function r(t) {
            if (u === setTimeout)
                return setTimeout(t, 0);
            try {
                return u(t, 0)
            } catch (e) {
                try {
                    return u.call(null , t, 0)
                } catch (e) {
                    return u.call(this, t, 0)
                }
            }
        }
        function i(t) {
            if (c === clearTimeout)
                return clearTimeout(t);
            try {
                return c(t)
            } catch (e) {
                try {
                    return c.call(null , t)
                } catch (e) {
                    return c.call(this, t)
                }
            }
        }
        function o() {
            d && p && (d = !1,
            p.length ? h = p.concat(h) : m = -1,
            h.length && a())
        }
        function a() {
            if (!d) {
                var t = r(o);
                d = !0;
                for (var e = h.length; e; ) {
                    for (p = h,
                    h = []; ++m < e; )
                        p && p[m].run();
                    m = -1,
                    e = h.length
                }
                p = null ,
                d = !1,
                i(t)
            }
        }
        function s(t, e) {
            this.fun = t,
            this.array = e
        }
        function l() {}
        var u, c, f = n.exports = {};
        !function() {
            try {
                u = setTimeout
            } catch (t) {
                u = function() {
                    throw new Error("setTimeout is not defined")
                }
            }
            try {
                c = clearTimeout
            } catch (t) {
                c = function() {
                    throw new Error("clearTimeout is not defined")
                }
            }
        }();
        var p, h = [], d = !1, m = -1;
        return f.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    e[n - 1] = arguments[n];
            h.push(new s(t,e)),
            1 !== h.length || d || r(a)
        }
        ,
        s.prototype.run = function() {
            this.fun.apply(null , this.array)
        }
        ,
        f.title = "browser",
        f.browser = !0,
        f.env = {},
        f.argv = [],
        f.version = "",
        f.versions = {},
        f.on = l,
        f.addListener = l,
        f.once = l,
        f.off = l,
        f.removeListener = l,
        f.removeAllListeners = l,
        f.emit = l,
        f.binding = function(t) {
            throw new Error("process.binding is not supported")
        }
        ,
        f.cwd = function() {
            return "/"
        }
        ,
        f.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }
        ,
        f.umask = function() {
            return 0
        }
        ,
        n.exports
    }),
    System.registerDynamic("76", ["75"], !0, function(t, e, n) {
        return n.exports = t("75"),
        n.exports
    }),
    System.registerDynamic("77", ["76"], !0, function(e, n, r) {
        return r.exports = System._nodeRequire ? process : e("76"),
        r.exports
    }),
    System.registerDynamic("60", ["77"], !0, function(t, e, n) {
        return n.exports = t("77"),
        n.exports
    }),
    System.registerDynamic("78", ["79", "7a", "60"], !0, function(t, e, n) {
        return function(e) {
            "use strict";
            function r(t) {
                var e = new Function("y","return function(){return y}");
                return e(t)
            }
            function i(t, e) {
                for (var n = new Array(t), r = 0; r < t; ++r)
                    n[r] = e;
                return n
            }
            function o(t, e, n, o) {
                function l(n) {
                    var r = new Function("gl","wrapper","locations","return function(){return gl.getUniform(wrapper.program,locations[" + n + "])}");
                    return r(t, e, o)
                }
                function u(t, e, n) {
                    switch (n) {
                    case "bool":
                    case "int":
                    case "sampler2D":
                    case "samplerCube":
                        return "gl.uniform1i(locations[" + e + "],obj" + t + ")";
                    case "float":
                        return "gl.uniform1f(locations[" + e + "],obj" + t + ")";
                    default:
                        var r = n.indexOf("vec");
                        if (!(0 <= r && r <= 1 && n.length === 4 + r)) {
                            if (0 === n.indexOf("mat") && 4 === n.length) {
                                var i = n.charCodeAt(n.length - 1) - 48;
                                if (i < 2 || i > 4)
                                    throw new s("","Invalid uniform dimension type for matrix " + name + ": " + n);
                                return "gl.uniformMatrix" + i + "fv(locations[" + e + "],false,obj" + t + ")"
                            }
                            throw new s("","Unknown uniform data type for " + name + ": " + n)
                        }
                        var i = n.charCodeAt(n.length - 1) - 48;
                        if (i < 2 || i > 4)
                            throw new s("","Invalid data type");
                        switch (n.charAt(0)) {
                        case "b":
                        case "i":
                            return "gl.uniform" + i + "iv(locations[" + e + "],obj" + t + ")";
                        case "v":
                            return "gl.uniform" + i + "fv(locations[" + e + "],obj" + t + ")";
                        default:
                            throw new s("","Unrecognized data type for vector " + name + ": " + n)
                        }
                    }
                }
                function c(t, e) {
                    if ("object" != typeof e)
                        return [[t, e]];
                    var n = [];
                    for (var r in e) {
                        var i = e[r]
                          , o = t;
                        o += parseInt(r) + "" === r ? "[" + r + "]" : "." + r,
                        "object" == typeof i ? n.push.apply(n, c(o, i)) : n.push([o, i])
                    }
                    return n
                }
                function f(e) {
                    for (var r = ["return function updateProperty(obj){"], i = c("", e), a = 0; a < i.length; ++a) {
                        var s = i[a]
                          , l = s[0]
                          , f = s[1];
                        o[f] && r.push(u(l, f, n[f].type))
                    }
                    r.push("return obj}");
                    var p = new Function("gl","locations",r.join("\n"));
                    return p(t, o)
                }
                function p(t) {
                    switch (t) {
                    case "bool":
                        return !1;
                    case "int":
                    case "sampler2D":
                    case "samplerCube":
                        return 0;
                    case "float":
                        return 0;
                    default:
                        var e = t.indexOf("vec");
                        if (0 <= e && e <= 1 && t.length === 4 + e) {
                            var n = t.charCodeAt(t.length - 1) - 48;
                            if (n < 2 || n > 4)
                                throw new s("","Invalid data type");
                            return "b" === t.charAt(0) ? i(n, !1) : i(n, 0)
                        }
                        if (0 === t.indexOf("mat") && 4 === t.length) {
                            var n = t.charCodeAt(t.length - 1) - 48;
                            if (n < 2 || n > 4)
                                throw new s("","Invalid uniform dimension type for matrix " + name + ": " + t);
                            return i(n * n, 0)
                        }
                        throw new s("","Unknown uniform data type for " + name + ": " + t)
                    }
                }
                function h(t, e, i) {
                    if ("object" == typeof i) {
                        var a = d(i);
                        Object.defineProperty(t, e, {
                            get: r(a),
                            set: f(i),
                            enumerable: !0,
                            configurable: !1
                        })
                    } else
                        o[i] ? Object.defineProperty(t, e, {
                            get: l(i),
                            set: f(i),
                            enumerable: !0,
                            configurable: !1
                        }) : t[e] = p(n[i].type)
                }
                function d(t) {
                    var e;
                    if (Array.isArray(t)) {
                        e = new Array(t.length);
                        for (var n = 0; n < t.length; ++n)
                            h(e, n, t[n])
                    } else {
                        e = {};
                        for (var r in t)
                            h(e, r, t[r])
                    }
                    return e
                }
                var m = a(n, !0);
                return {
                    get: r(d(m)),
                    set: f(m),
                    enumerable: !0,
                    configurable: !0
                }
            }
            var a = t("79")
              , s = t("7a");
            n.exports = o
        }(t("60")),
        n.exports
    }),
    System.registerDynamic("7b", ["7a"], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n, r, i, o) {
            this._gl = t,
            this._wrapper = e,
            this._index = n,
            this._locations = r,
            this._dimension = i,
            this._constFunc = o
        }
        function i(t, e, n, i, o, a, s) {
            for (var l = ["gl", "v"], u = [], c = 0; c < o; ++c)
                l.push("x" + c),
                u.push("x" + c);
            l.push("if(x0.length===void 0){return gl.vertexAttrib" + o + "f(v," + u.join() + ")}else{return gl.vertexAttrib" + o + "fv(v,x0)}");
            var f = Function.apply(null , l)
              , p = new r(t,e,n,i,o,f);
            Object.defineProperty(a, s, {
                set: function(e) {
                    return t.disableVertexAttribArray(i[n]),
                    f(t, i[n], e),
                    e
                },
                get: function() {
                    return p
                },
                enumerable: !0
            })
        }
        function o(t, e, n, r, o, a, s) {
            for (var l = new Array(o), u = new Array(o), c = 0; c < o; ++c)
                i(t, e, n[c], r, o, l, c),
                u[c] = l[c];
            Object.defineProperty(l, "location", {
                set: function(t) {
                    if (Array.isArray(t))
                        for (var e = 0; e < o; ++e)
                            u[e].location = t[e];
                    else
                        for (var e = 0; e < o; ++e)
                            u[e].location = t + e;
                    return t
                },
                get: function() {
                    for (var t = new Array(o), e = 0; e < o; ++e)
                        t[e] = r[n[e]];
                    return t
                },
                enumerable: !0
            }),
            l.pointer = function(e, i, a, s) {
                e = e || t.FLOAT,
                i = !!i,
                a = a || o * o,
                s = s || 0;
                for (var l = 0; l < o; ++l) {
                    var u = r[n[l]];
                    t.vertexAttribPointer(u, o, e, i, a, s + l * o),
                    t.enableVertexAttribArray(u)
                }
            }
            ;
            var f = new Array(o)
              , p = t["vertexAttrib" + o + "fv"];
            Object.defineProperty(a, s, {
                set: function(e) {
                    for (var i = 0; i < o; ++i) {
                        var a = r[n[i]];
                        if (t.disableVertexAttribArray(a),
                        Array.isArray(e[0]))
                            p.call(t, a, e[i]);
                        else {
                            for (var s = 0; s < o; ++s)
                                f[s] = e[o * i + s];
                            p.call(t, a, f)
                        }
                    }
                    return e
                },
                get: function() {
                    return l
                },
                enumerable: !0
            })
        }
        function a(t, e, n, r) {
            for (var a = {}, l = 0, u = n.length; l < u; ++l) {
                var c = n[l]
                  , f = c.name
                  , p = c.type
                  , h = c.locations;
                switch (p) {
                case "bool":
                case "int":
                case "float":
                    i(t, e, h[0], r, 1, a, f);
                    break;
                default:
                    if (p.indexOf("vec") >= 0) {
                        var d = p.charCodeAt(p.length - 1) - 48;
                        if (d < 2 || d > 4)
                            throw new s("","Invalid data type for attribute " + f + ": " + p);
                        i(t, e, h[0], r, d, a, f)
                    } else {
                        if (!(p.indexOf("mat") >= 0))
                            throw new s("","Unknown data type for attribute " + f + ": " + p);
                        var d = p.charCodeAt(p.length - 1) - 48;
                        if (d < 2 || d > 4)
                            throw new s("","Invalid data type for attribute " + f + ": " + p);
                        o(t, e, h, r, d, a, f)
                    }
                }
            }
            return a
        }
        n.exports = a;
        var s = t("7a")
          , l = r.prototype;
        return l.pointer = function(t, e, n, r) {
            var i = this
              , o = i._gl
              , a = i._locations[i._index];
            o.vertexAttribPointer(a, i._dimension, t || o.FLOAT, !!e, n || 0, r || 0),
            o.enableVertexAttribArray(a)
        }
        ,
        l.set = function(t, e, n, r) {
            return this._constFunc(this._locations[this._index], t, e, n, r)
        }
        ,
        Object.defineProperty(l, "location", {
            get: function() {
                return this._locations[this._index]
            },
            set: function(t) {
                return t !== this._locations[this._index] && (this._locations[this._index] = 0 | t,
                this._wrapper.program = null ),
                0 | t
            }
        }),
        n.exports
    }),
    System.registerDynamic("79", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            for (var n = {}, r = 0; r < t.length; ++r)
                for (var i = t[r].name, o = i.split("."), a = n, s = 0; s < o.length; ++s) {
                    var l = o[s].split("[");
                    if (l.length > 1) {
                        l[0]in a || (a[l[0]] = []),
                        a = a[l[0]];
                        for (var u = 1; u < l.length; ++u) {
                            var c = parseInt(l[u]);
                            u < l.length - 1 || s < o.length - 1 ? (c in a || (u < l.length - 1 ? a[c] = [] : a[c] = {}),
                            a = a[c]) : e ? a[c] = r : a[c] = t[r].type
                        }
                    } else
                        s < o.length - 1 ? (l[0]in a || (a[l[0]] = {}),
                        a = a[l[0]]) : e ? a[l[0]] = r : a[l[0]] = t[r].type
                }
            return n
        }
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("7c", [], !0, function(t, e, n) {
        var r;
        return function(t) {
            function n() {
                var t = arguments[0]
                  , e = n.cache;
                return e[t] && e.hasOwnProperty(t) || (e[t] = n.parse(t)),
                n.format.call(null , e[t], arguments)
            }
            function i(t) {
                return Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
            }
            function o(t, e) {
                return Array(e + 1).join(t)
            }
            var a = {
                not_string: /[^s]/,
                number: /[diefg]/,
                json: /[j]/,
                not_json: /[^j]/,
                text: /^[^\x25]+/,
                modulo: /^\x25{2}/,
                placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
                key: /^([a-z_][a-z_\d]*)/i,
                key_access: /^\.([a-z_][a-z_\d]*)/i,
                index_access: /^\[(\d+)\]/,
                sign: /^[\+\-]/
            };
            n.format = function(t, e) {
                var r, s, l, u, c, f, p, h = 1, d = t.length, m = "", v = [], g = !0, y = "";
                for (s = 0; s < d; s++)
                    if (m = i(t[s]),
                    "string" === m)
                        v[v.length] = t[s];
                    else if ("array" === m) {
                        if (u = t[s],
                        u[2])
                            for (r = e[h],
                            l = 0; l < u[2].length; l++) {
                                if (!r.hasOwnProperty(u[2][l]))
                                    throw new Error(n("[sprintf] property '%s' does not exist", u[2][l]));
                                r = r[u[2][l]]
                            }
                        else
                            r = u[1] ? e[u[1]] : e[h++];
                        if ("function" == i(r) && (r = r()),
                        a.not_string.test(u[8]) && a.not_json.test(u[8]) && "number" != i(r) && isNaN(r))
                            throw new TypeError(n("[sprintf] expecting number but found %s", i(r)));
                        switch (a.number.test(u[8]) && (g = r >= 0),
                        u[8]) {
                        case "b":
                            r = r.toString(2);
                            break;
                        case "c":
                            r = String.fromCharCode(r);
                            break;
                        case "d":
                        case "i":
                            r = parseInt(r, 10);
                            break;
                        case "j":
                            r = JSON.stringify(r, null , u[6] ? parseInt(u[6]) : 0);
                            break;
                        case "e":
                            r = u[7] ? r.toExponential(u[7]) : r.toExponential();
                            break;
                        case "f":
                            r = u[7] ? parseFloat(r).toFixed(u[7]) : parseFloat(r);
                            break;
                        case "g":
                            r = u[7] ? parseFloat(r).toPrecision(u[7]) : parseFloat(r);
                            break;
                        case "o":
                            r = r.toString(8);
                            break;
                        case "s":
                            r = (r = String(r)) && u[7] ? r.substring(0, u[7]) : r;
                            break;
                        case "u":
                            r >>>= 0;
                            break;
                        case "x":
                            r = r.toString(16);
                            break;
                        case "X":
                            r = r.toString(16).toUpperCase()
                        }
                        a.json.test(u[8]) ? v[v.length] = r : (!a.number.test(u[8]) || g && !u[3] ? y = "" : (y = g ? "+" : "-",
                        r = r.toString().replace(a.sign, "")),
                        f = u[4] ? "0" === u[4] ? "0" : u[4].charAt(1) : " ",
                        p = u[6] - (y + r).length,
                        c = u[6] && p > 0 ? o(f, p) : "",
                        v[v.length] = u[5] ? y + r + c : "0" === f ? y + c + r : c + y + r)
                    }
                return v.join("")
            }
            ,
            n.cache = {},
            n.parse = function(t) {
                for (var e = t, n = [], r = [], i = 0; e; ) {
                    if (null !== (n = a.text.exec(e)))
                        r[r.length] = n[0];
                    else if (null !== (n = a.modulo.exec(e)))
                        r[r.length] = "%";
                    else {
                        if (null === (n = a.placeholder.exec(e)))
                            throw new SyntaxError("[sprintf] unexpected placeholder");
                        if (n[2]) {
                            i |= 1;
                            var o = []
                              , s = n[2]
                              , l = [];
                            if (null === (l = a.key.exec(s)))
                                throw new SyntaxError("[sprintf] failed to parse named argument key");
                            for (o[o.length] = l[1]; "" !== (s = s.substring(l[0].length)); )
                                if (null !== (l = a.key_access.exec(s)))
                                    o[o.length] = l[1];
                                else {
                                    if (null === (l = a.index_access.exec(s)))
                                        throw new SyntaxError("[sprintf] failed to parse named argument key");
                                    o[o.length] = l[1]
                                }
                            n[2] = o
                        } else
                            i |= 2;
                        if (3 === i)
                            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                        r[r.length] = n
                    }
                    e = e.substring(n[0].length)
                }
                return r
            }
            ;
            var s = function(t, e, r) {
                return r = (e || []).slice(0),
                r.splice(0, 0, t),
                n.apply(null , r)
            };
            "undefined" != typeof e ? (e.sprintf = n,
            e.vsprintf = s) : (t.sprintf = n,
            t.vsprintf = s,
            "function" == typeof r && r.amd && r(function() {
                return {
                    sprintf: n,
                    vsprintf: s
                }
            }))
        }("undefined" == typeof window ? this : window),
        n.exports
    }),
    System.registerDynamic("7d", ["7c"], !0, function(t, e, n) {
        return n.exports = t("7c"),
        n.exports
    }),
    System.registerDynamic("7e", [], !0, function(t, e, n) {
        return n.exports = {
            0: "NONE",
            1: "ONE",
            2: "LINE_LOOP",
            3: "LINE_STRIP",
            4: "TRIANGLES",
            5: "TRIANGLE_STRIP",
            6: "TRIANGLE_FAN",
            256: "DEPTH_BUFFER_BIT",
            512: "NEVER",
            513: "LESS",
            514: "EQUAL",
            515: "LEQUAL",
            516: "GREATER",
            517: "NOTEQUAL",
            518: "GEQUAL",
            519: "ALWAYS",
            768: "SRC_COLOR",
            769: "ONE_MINUS_SRC_COLOR",
            770: "SRC_ALPHA",
            771: "ONE_MINUS_SRC_ALPHA",
            772: "DST_ALPHA",
            773: "ONE_MINUS_DST_ALPHA",
            774: "DST_COLOR",
            775: "ONE_MINUS_DST_COLOR",
            776: "SRC_ALPHA_SATURATE",
            1024: "STENCIL_BUFFER_BIT",
            1028: "FRONT",
            1029: "BACK",
            1032: "FRONT_AND_BACK",
            1280: "INVALID_ENUM",
            1281: "INVALID_VALUE",
            1282: "INVALID_OPERATION",
            1285: "OUT_OF_MEMORY",
            1286: "INVALID_FRAMEBUFFER_OPERATION",
            2304: "CW",
            2305: "CCW",
            2849: "LINE_WIDTH",
            2884: "CULL_FACE",
            2885: "CULL_FACE_MODE",
            2886: "FRONT_FACE",
            2928: "DEPTH_RANGE",
            2929: "DEPTH_TEST",
            2930: "DEPTH_WRITEMASK",
            2931: "DEPTH_CLEAR_VALUE",
            2932: "DEPTH_FUNC",
            2960: "STENCIL_TEST",
            2961: "STENCIL_CLEAR_VALUE",
            2962: "STENCIL_FUNC",
            2963: "STENCIL_VALUE_MASK",
            2964: "STENCIL_FAIL",
            2965: "STENCIL_PASS_DEPTH_FAIL",
            2966: "STENCIL_PASS_DEPTH_PASS",
            2967: "STENCIL_REF",
            2968: "STENCIL_WRITEMASK",
            2978: "VIEWPORT",
            3024: "DITHER",
            3042: "BLEND",
            3088: "SCISSOR_BOX",
            3089: "SCISSOR_TEST",
            3106: "COLOR_CLEAR_VALUE",
            3107: "COLOR_WRITEMASK",
            3317: "UNPACK_ALIGNMENT",
            3333: "PACK_ALIGNMENT",
            3379: "MAX_TEXTURE_SIZE",
            3386: "MAX_VIEWPORT_DIMS",
            3408: "SUBPIXEL_BITS",
            3410: "RED_BITS",
            3411: "GREEN_BITS",
            3412: "BLUE_BITS",
            3413: "ALPHA_BITS",
            3414: "DEPTH_BITS",
            3415: "STENCIL_BITS",
            3553: "TEXTURE_2D",
            4352: "DONT_CARE",
            4353: "FASTEST",
            4354: "NICEST",
            5120: "BYTE",
            5121: "UNSIGNED_BYTE",
            5122: "SHORT",
            5123: "UNSIGNED_SHORT",
            5124: "INT",
            5125: "UNSIGNED_INT",
            5126: "FLOAT",
            5386: "INVERT",
            5890: "TEXTURE",
            6401: "STENCIL_INDEX",
            6402: "DEPTH_COMPONENT",
            6406: "ALPHA",
            6407: "RGB",
            6408: "RGBA",
            6409: "LUMINANCE",
            6410: "LUMINANCE_ALPHA",
            7680: "KEEP",
            7681: "REPLACE",
            7682: "INCR",
            7683: "DECR",
            7936: "VENDOR",
            7937: "RENDERER",
            7938: "VERSION",
            9728: "NEAREST",
            9729: "LINEAR",
            9984: "NEAREST_MIPMAP_NEAREST",
            9985: "LINEAR_MIPMAP_NEAREST",
            9986: "NEAREST_MIPMAP_LINEAR",
            9987: "LINEAR_MIPMAP_LINEAR",
            10240: "TEXTURE_MAG_FILTER",
            10241: "TEXTURE_MIN_FILTER",
            10242: "TEXTURE_WRAP_S",
            10243: "TEXTURE_WRAP_T",
            10497: "REPEAT",
            10752: "POLYGON_OFFSET_UNITS",
            16384: "COLOR_BUFFER_BIT",
            32769: "CONSTANT_COLOR",
            32770: "ONE_MINUS_CONSTANT_COLOR",
            32771: "CONSTANT_ALPHA",
            32772: "ONE_MINUS_CONSTANT_ALPHA",
            32773: "BLEND_COLOR",
            32774: "FUNC_ADD",
            32777: "BLEND_EQUATION_RGB",
            32778: "FUNC_SUBTRACT",
            32779: "FUNC_REVERSE_SUBTRACT",
            32819: "UNSIGNED_SHORT_4_4_4_4",
            32820: "UNSIGNED_SHORT_5_5_5_1",
            32823: "POLYGON_OFFSET_FILL",
            32824: "POLYGON_OFFSET_FACTOR",
            32854: "RGBA4",
            32855: "RGB5_A1",
            32873: "TEXTURE_BINDING_2D",
            32926: "SAMPLE_ALPHA_TO_COVERAGE",
            32928: "SAMPLE_COVERAGE",
            32936: "SAMPLE_BUFFERS",
            32937: "SAMPLES",
            32938: "SAMPLE_COVERAGE_VALUE",
            32939: "SAMPLE_COVERAGE_INVERT",
            32968: "BLEND_DST_RGB",
            32969: "BLEND_SRC_RGB",
            32970: "BLEND_DST_ALPHA",
            32971: "BLEND_SRC_ALPHA",
            33071: "CLAMP_TO_EDGE",
            33170: "GENERATE_MIPMAP_HINT",
            33189: "DEPTH_COMPONENT16",
            33306: "DEPTH_STENCIL_ATTACHMENT",
            33635: "UNSIGNED_SHORT_5_6_5",
            33648: "MIRRORED_REPEAT",
            33901: "ALIASED_POINT_SIZE_RANGE",
            33902: "ALIASED_LINE_WIDTH_RANGE",
            33984: "TEXTURE0",
            33985: "TEXTURE1",
            33986: "TEXTURE2",
            33987: "TEXTURE3",
            33988: "TEXTURE4",
            33989: "TEXTURE5",
            33990: "TEXTURE6",
            33991: "TEXTURE7",
            33992: "TEXTURE8",
            33993: "TEXTURE9",
            33994: "TEXTURE10",
            33995: "TEXTURE11",
            33996: "TEXTURE12",
            33997: "TEXTURE13",
            33998: "TEXTURE14",
            33999: "TEXTURE15",
            34e3: "TEXTURE16",
            34001: "TEXTURE17",
            34002: "TEXTURE18",
            34003: "TEXTURE19",
            34004: "TEXTURE20",
            34005: "TEXTURE21",
            34006: "TEXTURE22",
            34007: "TEXTURE23",
            34008: "TEXTURE24",
            34009: "TEXTURE25",
            34010: "TEXTURE26",
            34011: "TEXTURE27",
            34012: "TEXTURE28",
            34013: "TEXTURE29",
            34014: "TEXTURE30",
            34015: "TEXTURE31",
            34016: "ACTIVE_TEXTURE",
            34024: "MAX_RENDERBUFFER_SIZE",
            34041: "DEPTH_STENCIL",
            34055: "INCR_WRAP",
            34056: "DECR_WRAP",
            34067: "TEXTURE_CUBE_MAP",
            34068: "TEXTURE_BINDING_CUBE_MAP",
            34069: "TEXTURE_CUBE_MAP_POSITIVE_X",
            34070: "TEXTURE_CUBE_MAP_NEGATIVE_X",
            34071: "TEXTURE_CUBE_MAP_POSITIVE_Y",
            34072: "TEXTURE_CUBE_MAP_NEGATIVE_Y",
            34073: "TEXTURE_CUBE_MAP_POSITIVE_Z",
            34074: "TEXTURE_CUBE_MAP_NEGATIVE_Z",
            34076: "MAX_CUBE_MAP_TEXTURE_SIZE",
            34338: "VERTEX_ATTRIB_ARRAY_ENABLED",
            34339: "VERTEX_ATTRIB_ARRAY_SIZE",
            34340: "VERTEX_ATTRIB_ARRAY_STRIDE",
            34341: "VERTEX_ATTRIB_ARRAY_TYPE",
            34342: "CURRENT_VERTEX_ATTRIB",
            34373: "VERTEX_ATTRIB_ARRAY_POINTER",
            34466: "NUM_COMPRESSED_TEXTURE_FORMATS",
            34467: "COMPRESSED_TEXTURE_FORMATS",
            34660: "BUFFER_SIZE",
            34661: "BUFFER_USAGE",
            34816: "STENCIL_BACK_FUNC",
            34817: "STENCIL_BACK_FAIL",
            34818: "STENCIL_BACK_PASS_DEPTH_FAIL",
            34819: "STENCIL_BACK_PASS_DEPTH_PASS",
            34877: "BLEND_EQUATION_ALPHA",
            34921: "MAX_VERTEX_ATTRIBS",
            34922: "VERTEX_ATTRIB_ARRAY_NORMALIZED",
            34930: "MAX_TEXTURE_IMAGE_UNITS",
            34962: "ARRAY_BUFFER",
            34963: "ELEMENT_ARRAY_BUFFER",
            34964: "ARRAY_BUFFER_BINDING",
            34965: "ELEMENT_ARRAY_BUFFER_BINDING",
            34975: "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
            35040: "STREAM_DRAW",
            35044: "STATIC_DRAW",
            35048: "DYNAMIC_DRAW",
            35632: "FRAGMENT_SHADER",
            35633: "VERTEX_SHADER",
            35660: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
            35661: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
            35663: "SHADER_TYPE",
            35664: "FLOAT_VEC2",
            35665: "FLOAT_VEC3",
            35666: "FLOAT_VEC4",
            35667: "INT_VEC2",
            35668: "INT_VEC3",
            35669: "INT_VEC4",
            35670: "BOOL",
            35671: "BOOL_VEC2",
            35672: "BOOL_VEC3",
            35673: "BOOL_VEC4",
            35674: "FLOAT_MAT2",
            35675: "FLOAT_MAT3",
            35676: "FLOAT_MAT4",
            35678: "SAMPLER_2D",
            35680: "SAMPLER_CUBE",
            35712: "DELETE_STATUS",
            35713: "COMPILE_STATUS",
            35714: "LINK_STATUS",
            35715: "VALIDATE_STATUS",
            35716: "INFO_LOG_LENGTH",
            35717: "ATTACHED_SHADERS",
            35718: "ACTIVE_UNIFORMS",
            35719: "ACTIVE_UNIFORM_MAX_LENGTH",
            35720: "SHADER_SOURCE_LENGTH",
            35721: "ACTIVE_ATTRIBUTES",
            35722: "ACTIVE_ATTRIBUTE_MAX_LENGTH",
            35724: "SHADING_LANGUAGE_VERSION",
            35725: "CURRENT_PROGRAM",
            36003: "STENCIL_BACK_REF",
            36004: "STENCIL_BACK_VALUE_MASK",
            36005: "STENCIL_BACK_WRITEMASK",
            36006: "FRAMEBUFFER_BINDING",
            36007: "RENDERBUFFER_BINDING",
            36048: "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
            36049: "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
            36050: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
            36051: "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
            36053: "FRAMEBUFFER_COMPLETE",
            36054: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
            36055: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
            36057: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
            36061: "FRAMEBUFFER_UNSUPPORTED",
            36064: "COLOR_ATTACHMENT0",
            36096: "DEPTH_ATTACHMENT",
            36128: "STENCIL_ATTACHMENT",
            36160: "FRAMEBUFFER",
            36161: "RENDERBUFFER",
            36162: "RENDERBUFFER_WIDTH",
            36163: "RENDERBUFFER_HEIGHT",
            36164: "RENDERBUFFER_INTERNAL_FORMAT",
            36168: "STENCIL_INDEX8",
            36176: "RENDERBUFFER_RED_SIZE",
            36177: "RENDERBUFFER_GREEN_SIZE",
            36178: "RENDERBUFFER_BLUE_SIZE",
            36179: "RENDERBUFFER_ALPHA_SIZE",
            36180: "RENDERBUFFER_DEPTH_SIZE",
            36181: "RENDERBUFFER_STENCIL_SIZE",
            36194: "RGB565",
            36336: "LOW_FLOAT",
            36337: "MEDIUM_FLOAT",
            36338: "HIGH_FLOAT",
            36339: "LOW_INT",
            36340: "MEDIUM_INT",
            36341: "HIGH_INT",
            36346: "SHADER_COMPILER",
            36347: "MAX_VERTEX_UNIFORM_VECTORS",
            36348: "MAX_VARYING_VECTORS",
            36349: "MAX_FRAGMENT_UNIFORM_VECTORS",
            37440: "UNPACK_FLIP_Y_WEBGL",
            37441: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
            37442: "CONTEXT_LOST_WEBGL",
            37443: "UNPACK_COLORSPACE_CONVERSION_WEBGL",
            37444: "BROWSER_DEFAULT_WEBGL"
        },
        n.exports
    }),
    System.registerDynamic("7f", ["7e"], !0, function(t, e, n) {
        var r = t("7e");
        return n.exports = function(t) {
            return r[t]
        }
        ,
        n.exports
    }),
    System.registerDynamic("80", [], !0, function(t, e, n) {
        return n.exports = ["<<=", ">>=", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||", "+=", "-=", "*=", "/=", "%=", "&=", "^^", "^=", "|=", "(", ")", "[", "]", ".", "!", "~", "*", "/", "%", "+", "-", "<", ">", "&", "^", "|", "?", ":", "=", ",", ";", "{", "}"],
        n.exports
    }),
    System.registerDynamic("81", [], !0, function(t, e, n) {
        return n.exports = ["precision", "highp", "mediump", "lowp", "attribute", "const", "uniform", "varying", "break", "continue", "do", "for", "while", "if", "else", "in", "out", "inout", "float", "int", "void", "bool", "true", "false", "discard", "return", "mat2", "mat3", "mat4", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow", "struct", "asm", "class", "union", "enum", "typedef", "template", "this", "packed", "goto", "switch", "default", "inline", "noinline", "volatile", "public", "static", "extern", "external", "interface", "long", "short", "double", "half", "fixed", "unsigned", "input", "output", "hvec2", "hvec3", "hvec4", "dvec2", "dvec3", "dvec4", "fvec2", "fvec3", "fvec4", "sampler2DRect", "sampler3DRect", "sampler2DRectShadow", "sizeof", "cast", "namespace", "using"],
        n.exports
    }),
    System.registerDynamic("82", ["81"], !0, function(t, e, n) {
        var r = t("81");
        return n.exports = r.slice().concat(["layout", "centroid", "smooth", "case", "mat2x2", "mat2x3", "mat2x4", "mat3x2", "mat3x3", "mat3x4", "mat4x2", "mat4x3", "mat4x4", "uint", "uvec2", "uvec3", "uvec4", "samplerCubeShadow", "sampler2DArray", "sampler2DArrayShadow", "isampler2D", "isampler3D", "isamplerCube", "isampler2DArray", "usampler2D", "usampler3D", "usamplerCube", "usampler2DArray", "coherent", "restrict", "readonly", "writeonly", "resource", "atomic_uint", "noperspective", "patch", "sample", "subroutine", "common", "partition", "active", "filter", "image1D", "image2D", "image3D", "imageCube", "iimage1D", "iimage2D", "iimage3D", "iimageCube", "uimage1D", "uimage2D", "uimage3D", "uimageCube", "image1DArray", "image2DArray", "iimage1DArray", "iimage2DArray", "uimage1DArray", "uimage2DArray", "image1DShadow", "image2DShadow", "image1DArrayShadow", "image2DArrayShadow", "imageBuffer", "iimageBuffer", "uimageBuffer", "sampler1DArray", "sampler1DArrayShadow", "isampler1D", "isampler1DArray", "usampler1D", "usampler1DArray", "isampler2DRect", "usampler2DRect", "samplerBuffer", "isamplerBuffer", "usamplerBuffer", "sampler2DMS", "isampler2DMS", "usampler2DMS", "sampler2DMSArray", "isampler2DMSArray", "usampler2DMSArray"]),
        n.exports
    }),
    System.registerDynamic("83", [], !0, function(t, e, n) {
        return n.exports = ["abs", "acos", "all", "any", "asin", "atan", "ceil", "clamp", "cos", "cross", "dFdx", "dFdy", "degrees", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floor", "fract", "gl_BackColor", "gl_BackLightModelProduct", "gl_BackLightProduct", "gl_BackMaterial", "gl_BackSecondaryColor", "gl_ClipPlane", "gl_ClipVertex", "gl_Color", "gl_DepthRange", "gl_DepthRangeParameters", "gl_EyePlaneQ", "gl_EyePlaneR", "gl_EyePlaneS", "gl_EyePlaneT", "gl_Fog", "gl_FogCoord", "gl_FogFragCoord", "gl_FogParameters", "gl_FragColor", "gl_FragCoord", "gl_FragData", "gl_FragDepth", "gl_FragDepthEXT", "gl_FrontColor", "gl_FrontFacing", "gl_FrontLightModelProduct", "gl_FrontLightProduct", "gl_FrontMaterial", "gl_FrontSecondaryColor", "gl_LightModel", "gl_LightModelParameters", "gl_LightModelProducts", "gl_LightProducts", "gl_LightSource", "gl_LightSourceParameters", "gl_MaterialParameters", "gl_MaxClipPlanes", "gl_MaxCombinedTextureImageUnits", "gl_MaxDrawBuffers", "gl_MaxFragmentUniformComponents", "gl_MaxLights", "gl_MaxTextureCoords", "gl_MaxTextureImageUnits", "gl_MaxTextureUnits", "gl_MaxVaryingFloats", "gl_MaxVertexAttribs", "gl_MaxVertexTextureImageUnits", "gl_MaxVertexUniformComponents", "gl_ModelViewMatrix", "gl_ModelViewMatrixInverse", "gl_ModelViewMatrixInverseTranspose", "gl_ModelViewMatrixTranspose", "gl_ModelViewProjectionMatrix", "gl_ModelViewProjectionMatrixInverse", "gl_ModelViewProjectionMatrixInverseTranspose", "gl_ModelViewProjectionMatrixTranspose", "gl_MultiTexCoord0", "gl_MultiTexCoord1", "gl_MultiTexCoord2", "gl_MultiTexCoord3", "gl_MultiTexCoord4", "gl_MultiTexCoord5", "gl_MultiTexCoord6", "gl_MultiTexCoord7", "gl_Normal", "gl_NormalMatrix", "gl_NormalScale", "gl_ObjectPlaneQ", "gl_ObjectPlaneR", "gl_ObjectPlaneS", "gl_ObjectPlaneT", "gl_Point", "gl_PointCoord", "gl_PointParameters", "gl_PointSize", "gl_Position", "gl_ProjectionMatrix", "gl_ProjectionMatrixInverse", "gl_ProjectionMatrixInverseTranspose", "gl_ProjectionMatrixTranspose", "gl_SecondaryColor", "gl_TexCoord", "gl_TextureEnvColor", "gl_TextureMatrix", "gl_TextureMatrixInverse", "gl_TextureMatrixInverseTranspose", "gl_TextureMatrixTranspose", "gl_Vertex", "greaterThan", "greaterThanEqual", "inversesqrt", "length", "lessThan", "lessThanEqual", "log", "log2", "matrixCompMult", "max", "min", "mix", "mod", "normalize", "not", "notEqual", "pow", "radians", "reflect", "refract", "sign", "sin", "smoothstep", "sqrt", "step", "tan", "texture2D", "texture2DLod", "texture2DProj", "texture2DProjLod", "textureCube", "textureCubeLod", "texture2DLodEXT", "texture2DProjLodEXT", "textureCubeLodEXT", "texture2DGradEXT", "texture2DProjGradEXT", "textureCubeGradEXT"],
        n.exports
    }),
    System.registerDynamic("84", ["83"], !0, function(t, e, n) {
        var r = t("83");
        return r = r.slice().filter(function(t) {
            return !/^(gl\_|texture)/.test(t)
        }),
        n.exports = r.concat(["gl_VertexID", "gl_InstanceID", "gl_Position", "gl_PointSize", "gl_FragCoord", "gl_FrontFacing", "gl_FragDepth", "gl_PointCoord", "gl_MaxVertexAttribs", "gl_MaxVertexUniformVectors", "gl_MaxVertexOutputVectors", "gl_MaxFragmentInputVectors", "gl_MaxVertexTextureImageUnits", "gl_MaxCombinedTextureImageUnits", "gl_MaxTextureImageUnits", "gl_MaxFragmentUniformVectors", "gl_MaxDrawBuffers", "gl_MinProgramTexelOffset", "gl_MaxProgramTexelOffset", "gl_DepthRangeParameters", "gl_DepthRange", "trunc", "round", "roundEven", "isnan", "isinf", "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat", "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16", "packHalf2x16", "unpackHalf2x16", "outerProduct", "transpose", "determinant", "inverse", "texture", "textureSize", "textureProj", "textureLod", "textureOffset", "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset", "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset", "textureProjGrad", "textureProjGradOffset"]),
        n.exports
    }),
    System.registerDynamic("85", ["81", "80", "83", "82", "84"], !0, function(t, e, n) {
        function r(t) {
            function e(t) {
                t.length && V.push({
                    type: $[U],
                    data: t,
                    position: Y,
                    line: H,
                    column: z
                })
            }
            function n(t) {
                N = 0,
                G += t,
                j = G.length;
                for (var e; P = G[N],
                N < j; ) {
                    switch (e = N,
                    U) {
                    case f:
                        N = T();
                        break;
                    case p:
                        N = k();
                        break;
                    case h:
                        N = M();
                        break;
                    case d:
                        N = A();
                        break;
                    case m:
                        N = I();
                        break;
                    case x:
                        N = C();
                        break;
                    case v:
                        N = O();
                        break;
                    case c:
                        N = R();
                        break;
                    case _:
                        N = S();
                        break;
                    case u:
                        N = E()
                    }
                    if (e !== N)
                        switch (G[e]) {
                        case "\n":
                            z = 0,
                            ++H;
                            break;
                        default:
                            ++z
                        }
                }
                return L += N,
                G = G.slice(N),
                V
            }
            function r(t) {
                return B.length && e(B.join("")),
                U = w,
                e("(eof)"),
                V
            }
            function E() {
                return B = B.length ? [] : B,
                "/" === F && "*" === P ? (Y = L + N - 1,
                U = f,
                F = P,
                N + 1) : "/" === F && "/" === P ? (Y = L + N - 1,
                U = p,
                F = P,
                N + 1) : "#" === P ? (U = h,
                Y = L + N,
                N) : /\s/.test(P) ? (U = _,
                Y = L + N,
                N) : (q = /\d/.test(P),
                W = /[^\w_]/.test(P),
                Y = L + N,
                U = q ? m : W ? d : c,
                N)
            }
            function S() {
                return /[^\s]/g.test(P) ? (e(B.join("")),
                U = u,
                N) : (B.push(P),
                F = P,
                N + 1)
            }
            function M() {
                return "\n" === P && "\\" !== F ? (e(B.join("")),
                U = u,
                N) : (B.push(P),
                F = P,
                N + 1)
            }
            function k() {
                return M()
            }
            function T() {
                return "/" === P && "*" === F ? (B.push(P),
                e(B.join("")),
                U = u,
                N + 1) : (B.push(P),
                F = P,
                N + 1)
            }
            function A() {
                if ("." === F && /\d/.test(P))
                    return U = v,
                    N;
                if ("/" === F && "*" === P)
                    return U = f,
                    N;
                if ("/" === F && "/" === P)
                    return U = p,
                    N;
                if ("." === P && B.length) {
                    for (; D(B); )
                        ;
                    return U = v,
                    N
                }
                if (";" === P || ")" === P || "(" === P) {
                    if (B.length)
                        for (; D(B); )
                            ;
                    return e(P),
                    U = u,
                    N + 1
                }
                var t = 2 === B.length && "=" !== P;
                if (/[\w_\d\s]/.test(P) || t) {
                    for (; D(B); )
                        ;
                    return U = u,
                    N
                }
                return B.push(P),
                F = P,
                N + 1
            }
            function D(t) {
                for (var n, r, i = 0; ; ) {
                    if (n = o.indexOf(t.slice(0, t.length + i).join("")),
                    r = o[n],
                    n === -1) {
                        if (i-- + t.length > 0)
                            continue;
                        r = t.slice(0, 1).join("")
                    }
                    return e(r),
                    Y += r.length,
                    B = B.slice(r.length),
                    B.length
                }
            }
            function C() {
                return /[^a-fA-F0-9]/.test(P) ? (e(B.join("")),
                U = u,
                N) : (B.push(P),
                F = P,
                N + 1)
            }
            function I() {
                return "." === P ? (B.push(P),
                U = v,
                F = P,
                N + 1) : /[eE]/.test(P) ? (B.push(P),
                U = v,
                F = P,
                N + 1) : "x" === P && 1 === B.length && "0" === B[0] ? (U = x,
                B.push(P),
                F = P,
                N + 1) : /[^\d]/.test(P) ? (e(B.join("")),
                U = u,
                N) : (B.push(P),
                F = P,
                N + 1)
            }
            function O() {
                return "f" === P && (B.push(P),
                F = P,
                N += 1),
                /[eE]/.test(P) ? (B.push(P),
                F = P,
                N + 1) : "-" === P && /[eE]/.test(F) ? (B.push(P),
                F = P,
                N + 1) : /[^\d]/.test(P) ? (e(B.join("")),
                U = u,
                N) : (B.push(P),
                F = P,
                N + 1)
            }
            function R() {
                if (/[^\d\w_]/.test(P)) {
                    var t = B.join("");
                    return U = Z.indexOf(t) > -1 ? b : X.indexOf(t) > -1 ? y : g,
                    e(B.join("")),
                    U = u,
                    N
                }
                return B.push(P),
                F = P,
                N + 1
            }
            var P, F, j, N = 0, L = 0, U = u, B = [], V = [], H = 1, z = 0, Y = 0, q = !1, W = !1, G = "";
            t = t || {};
            var X = a
              , Z = i;
            return "300 es" === t.version && (X = l,
            Z = s),
            function(t) {
                return V = [],
                null !== t ? n(t) : r()
            }
        }
        n.exports = r;
        var i = t("81")
          , o = t("80")
          , a = t("83")
          , s = t("82")
          , l = t("84")
          , u = 999
          , c = 9999
          , f = 0
          , p = 1
          , h = 2
          , d = 3
          , m = 4
          , v = 5
          , g = 6
          , y = 7
          , b = 8
          , _ = 9
          , w = 10
          , x = 11
          , $ = ["block-comment", "line-comment", "preprocessor", "operator", "integer", "float", "ident", "builtin", "keyword", "whitespace", "eof", "integer"];
        return n.exports
    }),
    System.registerDynamic("86", ["85"], !0, function(t, e, n) {
        function r(t, e) {
            var n = i(e)
              , r = [];
            return r = r.concat(n(t)),
            r = r.concat(n(null ))
        }
        var i = t("85");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("87", ["86"], !0, function(t, e, n) {
        return n.exports = t("86"),
        n.exports
    }),
    System.registerDynamic("88", [], !0, function(t, e, n) {
        return n.exports = function(t) {
            return atob(t)
        }
        ,
        n.exports
    }),
    System.registerDynamic("89", ["88"], !0, function(t, e, n) {
        return n.exports = t("88"),
        n.exports
    }),
    System.registerDynamic("8a", ["87", "89"], !0, function(t, e, n) {
        function r(t) {
            for (var e = Array.isArray(t) ? t : i(t), n = 0; n < e.length; n++) {
                var r = e[n];
                if ("preprocessor" === r.type) {
                    var a = r.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
                    if (a && a[2]) {
                        var s = a[1]
                          , l = a[2];
                        return (s ? o(l) : l).trim()
                    }
                }
            }
        }
        var i = t("87")
          , o = t("89");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("8b", ["8a"], !0, function(t, e, n) {
        return n.exports = t("8a"),
        n.exports
    }),
    System.registerDynamic("8c", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            if ("string" != typeof t)
                throw new TypeError("repeat-string expects a string.");
            if (1 === e)
                return t;
            if (2 === e)
                return t + t;
            var n = t.length * e;
            for (i === t && "undefined" != typeof i || (i = t,
            o = ""); n > o.length && e > 0 && (1 & e && (o += t),
            e >>= 1); )
                t += t;
            return o.substr(0, n)
        }
        var i, o = "";
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("8d", ["8c"], !0, function(t, e, n) {
        return n.exports = t("8c"),
        n.exports
    }),
    System.registerDynamic("8e", ["8d"], !0, function(t, e, n) {
        "use strict";
        var r = t("8d");
        return n.exports = function(t, e, n) {
            return n = "undefined" != typeof n ? n + "" : " ",
            r(n, e) + t
        }
        ,
        n.exports
    }),
    System.registerDynamic("8f", ["8e"], !0, function(t, e, n) {
        return n.exports = t("8e"),
        n.exports
    }),
    System.registerDynamic("90", ["8f"], !0, function(t, e, n) {
        function r(t, e, n) {
            e = "number" == typeof e ? e : 1,
            n = n || ": ";
            var r = t.split(/\r?\n/)
              , o = String(r.length + e - 1).length;
            return r.map(function(t, r) {
                var a = r + e
                  , s = String(a).length
                  , l = i(a, o - s);
                return l + n + t
            }).join("\n")
        }
        var i = t("8f");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("91", ["90"], !0, function(t, e, n) {
        return n.exports = t("90"),
        n.exports
    }),
    System.registerDynamic("92", ["7d", "7f", "8b", "91"], !0, function(t, e, n) {
        function r(t, e, n) {
            "use strict";
            var r = a(e) || "of unknown name (see npm glsl-shader-name)"
              , l = "unknown type";
            void 0 !== n && (l = n === o.FRAGMENT_SHADER ? "fragment" : "vertex");
            for (var u = i("Error compiling %s shader %s:\n", l, r), c = i("%s%s", u, t), f = t.split("\n"), p = {}, h = 0; h < f.length; h++) {
                var d = f[h];
                if ("" !== d) {
                    var m = parseInt(d.split(":")[2]);
                    if (isNaN(m))
                        throw new Error(i("Could not parse error: %s", d));
                    p[m] = d
                }
            }
            for (var v = s(e).split("\n"), h = 0; h < v.length; h++)
                if (p[h + 3] || p[h + 2] || p[h + 1]) {
                    var g = v[h];
                    if (u += g + "\n",
                    p[h + 1]) {
                        var y = p[h + 1];
                        y = y.substr(y.split(":", 3).join(":").length + 1).trim(),
                        u += i("^^^ %s\n\n", y)
                    }
                }
            return {
                long: u.trim(),
                short: c.trim()
            }
        }
        var i = t("7d").sprintf
          , o = t("7f")
          , a = t("8b")
          , s = t("91");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("93", ["92"], !0, function(t, e, n) {
        return n.exports = t("92"),
        n.exports
    }),
    System.registerDynamic("94", [], !0, function(t, e, n) {
        function r(t, e) {
            var n = {
                identity: e
            }
              , r = t.valueOf;
            return Object.defineProperty(t, "valueOf", {
                value: function(t) {
                    return t !== e ? r.apply(this, arguments) : n
                },
                writable: !0
            }),
            n
        }
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("95", ["94"], !0, function(t, e, n) {
        function r() {
            var t = {};
            return function(e) {
                if (("object" != typeof e || null === e) && "function" != typeof e)
                    throw new Error("Weakmap-shim: Key must be object");
                var n = e.valueOf(t);
                return n && n.identity === t ? n : i(e, t)
            }
        }
        var i = t("94");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("96", ["95"], !0, function(t, e, n) {
        function r() {
            var t = i();
            return {
                get: function(e, n) {
                    var r = t(e);
                    return r.hasOwnProperty("value") ? r.value : n
                },
                set: function(e, n) {
                    t(e).value = n
                },
                has: function(e) {
                    return "value"in t(e)
                },
                delete: function(e) {
                    return delete t(e).value
                }
            }
        }
        var i = t("95");
        return n.exports = r,
        n.exports
    }),
    System.registerDynamic("97", ["96"], !0, function(t, e, n) {
        return n.exports = t("96"),
        n.exports
    }),
    System.registerDynamic("98", ["7a", "93", "97"], !0, function(t, e, n) {
        "use strict";
        function r(t, e, n, r, i, o, a) {
            this.id = t,
            this.src = e,
            this.type = n,
            this.shader = r,
            this.count = o,
            this.programs = [],
            this.cache = a
        }
        function i(t) {
            this.gl = t,
            this.shaders = [{}, {}],
            this.programs = {}
        }
        function o(t, e, n) {
            var r = t.createShader(e);
            if (t.shaderSource(r, n),
            t.compileShader(r),
            !t.getShaderParameter(r, t.COMPILE_STATUS)) {
                var i = t.getShaderInfoLog(r);
                try {
                    var o = f(i, n, e)
                } catch (t) {
                    throw console.warn("Failed to format compiler error: " + t),
                    new c(i,"Error compiling shader:\n" + i)
                }
                throw new c(i,o.short,o.long)
            }
            return r
        }
        function a(t, e, n, r, i) {
            var o = t.createProgram();
            t.attachShader(o, e),
            t.attachShader(o, n);
            for (var a = 0; a < r.length; ++a)
                t.bindAttribLocation(o, i[a], r[a]);
            if (t.linkProgram(o),
            !t.getProgramParameter(o, t.LINK_STATUS)) {
                var s = t.getProgramInfoLog(o);
                throw new c(s,"Error linking program: " + s)
            }
            return o
        }
        function s(t) {
            var e = h.get(t);
            return e || (e = new i(t),
            h.set(t, e)),
            e
        }
        function l(t, e, n) {
            return s(t).getShaderReference(e, n)
        }
        function u(t, e, n, r, i) {
            return s(t).getProgram(e, n, r, i)
        }
        e.shader = l,
        e.program = u;
        var c = t("7a")
          , f = t("93")
          , p = "undefined" == typeof WeakMap ? t("97") : WeakMap
          , h = new p
          , d = 0;
        r.prototype.dispose = function() {
            if (0 === --this.count) {
                for (var t = this.cache, e = t.gl, n = this.programs, r = 0, i = n.length; r < i; ++r) {
                    var o = t.programs[n[r]];
                    o && (delete t.programs[r],
                    e.deleteProgram(o))
                }
                e.deleteShader(this.shader),
                delete t.shaders[this.type === e.FRAGMENT_SHADER | 0][this.src]
            }
        }
        ;
        var m = i.prototype;
        return m.getShaderReference = function(t, e) {
            var n = this.gl
              , i = this.shaders[t === n.FRAGMENT_SHADER | 0]
              , a = i[e];
            if (a && n.isShader(a.shader))
                a.count += 1;
            else {
                var s = o(n, t, e);
                a = i[e] = new r((d++),e,t,s,[],1,this)
            }
            return a
        }
        ,
        m.getProgram = function(t, e, n, r) {
            var i = [t.id, e.id, n.join(":"), r.join(":")].join("@")
              , o = this.programs[i];
            return o && this.gl.isProgram(o) || (this.programs[i] = o = a(this.gl, t.shader, e.shader, n, r),
            t.programs.push(i),
            e.programs.push(i)),
            o
        }
        ,
        n.exports
    }),
    System.registerDynamic("99", [], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            if (!s) {
                var n = Object.keys(a);
                s = {};
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    s[t[i]] = a[i]
                }
            }
            return s[e]
        }
        function i(t, e) {
            for (var n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS), i = [], o = 0; o < n; ++o) {
                var a = t.getActiveUniform(e, o);
                if (a) {
                    var s = r(t, a.type);
                    if (a.size > 1)
                        for (var l = 0; l < a.size; ++l)
                            i.push({
                                name: a.name.replace("[0]", "[" + l + "]"),
                                type: s
                            });
                    else
                        i.push({
                            name: a.name,
                            type: s
                        })
                }
            }
            return i
        }
        function o(t, e) {
            for (var n = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES), i = [], o = 0; o < n; ++o) {
                var a = t.getActiveAttrib(e, o);
                a && i.push({
                    name: a.name,
                    type: r(t, a.type)
                })
            }
            return i
        }
        e.uniforms = i,
        e.attributes = o;
        var a = {
            FLOAT: "float",
            FLOAT_VEC2: "vec2",
            FLOAT_VEC3: "vec3",
            FLOAT_VEC4: "vec4",
            INT: "int",
            INT_VEC2: "ivec2",
            INT_VEC3: "ivec3",
            INT_VEC4: "ivec4",
            BOOL: "bool",
            BOOL_VEC2: "bvec2",
            BOOL_VEC3: "bvec3",
            BOOL_VEC4: "bvec4",
            FLOAT_MAT2: "mat2",
            FLOAT_MAT3: "mat3",
            FLOAT_MAT4: "mat4",
            SAMPLER_2D: "sampler2D",
            SAMPLER_CUBE: "samplerCube"
        }
          , s = null ;
        return n.exports
    }),
    System.registerDynamic("7a", [], !0, function(t, e, n) {
        function r(t, e, n) {
            this.shortMessage = e || "",
            this.longMessage = n || "",
            this.rawError = t || "",
            this.message = "gl-shader: " + (e || t || "") + (n ? "\n" + n : ""),
            this.stack = (new Error).stack
        }
        return r.prototype = new Error,
        r.prototype.name = "GLError",
        r.prototype.constructor = r,
        n.exports = r,
        n.exports
    }),
    System.registerDynamic("9a", ["78", "7b", "79", "98", "99", "7a"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            this.gl = t,
            this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null
        }
        function i(t, e) {
            return t.name < e.name ? -1 : 1
        }
        function o(t, e, n, i, o) {
            var a = new r(t);
            return a.update(e, n, i, o),
            a
        }
        var a = t("78")
          , s = t("7b")
          , l = t("79")
          , u = t("98")
          , c = t("99")
          , f = t("7a")
          , p = r.prototype;
        return p.bind = function() {
            this.program || this._relink(),
            this.gl.useProgram(this.program)
        }
        ,
        p.dispose = function() {
            this._fref && this._fref.dispose(),
            this._vref && this._vref.dispose(),
            this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null
        }
        ,
        p.update = function(t, e, n, r) {
            function o() {
                h.program = u.program(d, h._vref, h._fref, _, w);
                for (var t = 0; t < n.length; ++t)
                    T[t] = d.getUniformLocation(h.program, n[t].name)
            }
            if (!e || 1 === arguments.length) {
                var p = t;
                t = p.vertex,
                e = p.fragment,
                n = p.uniforms,
                r = p.attributes
            }
            var h = this
              , d = h.gl
              , m = h._vref;
            h._vref = u.shader(d, d.VERTEX_SHADER, t),
            m && m.dispose(),
            h.vertShader = h._vref.shader;
            var v = this._fref;
            if (h._fref = u.shader(d, d.FRAGMENT_SHADER, e),
            v && v.dispose(),
            h.fragShader = h._fref.shader,
            !n || !r) {
                var g = d.createProgram();
                if (d.attachShader(g, h.fragShader),
                d.attachShader(g, h.vertShader),
                d.linkProgram(g),
                !d.getProgramParameter(g, d.LINK_STATUS)) {
                    var y = d.getProgramInfoLog(g);
                    throw new f(y,"Error linking program:" + y)
                }
                n = n || c.uniforms(d, g),
                r = r || c.attributes(d, g),
                d.deleteProgram(g)
            }
            r = r.slice(),
            r.sort(i);
            for (var b = [], _ = [], w = [], x = 0; x < r.length; ++x) {
                var $ = r[x];
                if ($.type.indexOf("mat") >= 0) {
                    for (var E = 0 | $.type.charAt($.type.length - 1), S = new Array(E), M = 0; M < E; ++M)
                        S[M] = w.length,
                        _.push($.name + "[" + M + "]"),
                        "number" == typeof $.location ? w.push($.location + M) : Array.isArray($.location) && $.location.length === E && "number" == typeof $.location[M] ? w.push(0 | $.location[M]) : w.push(-1);
                    b.push({
                        name: $.name,
                        type: $.type,
                        locations: S
                    })
                } else
                    b.push({
                        name: $.name,
                        type: $.type,
                        locations: [w.length]
                    }),
                    _.push($.name),
                    "number" == typeof $.location ? w.push(0 | $.location) : w.push(-1)
            }
            for (var k = 0, x = 0; x < w.length; ++x)
                if (w[x] < 0) {
                    for (; w.indexOf(k) >= 0; )
                        k += 1;
                    w[x] = k
                }
            var T = new Array(n.length);
            o(),
            h._relink = o,
            h.types = {
                uniforms: l(n),
                attributes: l(r)
            },
            h.attributes = s(d, h, b, w),
            Object.defineProperty(h, "uniforms", a(d, h, n, T))
        }
        ,
        n.exports = o,
        n.exports
    }),
    System.registerDynamic("9b", ["9a"], !0, function(t, e, n) {
        return n.exports = t("9a"),
        n.exports
    }),
    System.registerDynamic("9c", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(4);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(4);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        }
        ,
        i.identity = function(t) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        i.fromValues = function(t, e, n, i) {
            var o = new r.ARRAY_TYPE(4);
            return o[0] = t,
            o[1] = e,
            o[2] = n,
            o[3] = i,
            o
        }
        ,
        i.set = function(t, e, n, r, i) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t
        }
        ,
        i.transpose = function(t, e) {
            if (t === e) {
                var n = e[1];
                t[1] = e[2],
                t[2] = n
            } else
                t[0] = e[0],
                t[1] = e[2],
                t[2] = e[1],
                t[3] = e[3];
            return t
        }
        ,
        i.invert = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = n * o - i * r;
            return a ? (a = 1 / a,
            t[0] = o * a,
            t[1] = -r * a,
            t[2] = -i * a,
            t[3] = n * a,
            t) : null
        }
        ,
        i.adjoint = function(t, e) {
            var n = e[0];
            return t[0] = e[3],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = n,
            t
        }
        ,
        i.determinant = function(t) {
            return t[0] * t[3] - t[2] * t[1]
        }
        ,
        i.multiply = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = n[0]
              , l = n[1]
              , u = n[2]
              , c = n[3];
            return t[0] = r * s + o * l,
            t[1] = i * s + a * l,
            t[2] = r * u + o * c,
            t[3] = i * u + a * c,
            t
        }
        ,
        i.mul = i.multiply,
        i.rotate = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = Math.sin(n)
              , l = Math.cos(n);
            return t[0] = r * l + o * s,
            t[1] = i * l + a * s,
            t[2] = r * -s + o * l,
            t[3] = i * -s + a * l,
            t
        }
        ,
        i.scale = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = n[0]
              , l = n[1];
            return t[0] = r * s,
            t[1] = i * s,
            t[2] = o * l,
            t[3] = a * l,
            t
        }
        ,
        i.fromRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = r,
            t[1] = n,
            t[2] = -n,
            t[3] = r,
            t
        }
        ,
        i.fromScaling = function(t, e) {
            return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = e[1],
            t
        }
        ,
        i.str = function(t) {
            return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        i.frob = function(t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2))
        }
        ,
        i.LDU = function(t, e, n, r) {
            return t[2] = r[2] / r[0],
            n[0] = r[0],
            n[1] = r[1],
            n[3] = r[3] - t[2] * n[1],
            [t, e, n]
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t
        }
        ,
        i.sub = i.subtract,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = t[3]
              , s = e[0]
              , l = e[1]
              , u = e[2]
              , c = e[3];
            return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - l) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(o - u) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(u)) && Math.abs(a - c) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(c))
        }
        ,
        i.multiplyScalar = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("9e", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(6);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(6);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t
        }
        ,
        i.identity = function(t) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromValues = function(t, e, n, i, o, a) {
            var s = new r.ARRAY_TYPE(6);
            return s[0] = t,
            s[1] = e,
            s[2] = n,
            s[3] = i,
            s[4] = o,
            s[5] = a,
            s
        }
        ,
        i.set = function(t, e, n, r, i, o, a) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t
        }
        ,
        i.invert = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = n * o - r * i;
            return l ? (l = 1 / l,
            t[0] = o * l,
            t[1] = -r * l,
            t[2] = -i * l,
            t[3] = n * l,
            t[4] = (i * s - o * a) * l,
            t[5] = (r * a - n * s) * l,
            t) : null
        }
        ,
        i.determinant = function(t) {
            return t[0] * t[3] - t[1] * t[2]
        }
        ,
        i.multiply = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = n[0]
              , c = n[1]
              , f = n[2]
              , p = n[3]
              , h = n[4]
              , d = n[5];
            return t[0] = r * u + o * c,
            t[1] = i * u + a * c,
            t[2] = r * f + o * p,
            t[3] = i * f + a * p,
            t[4] = r * h + o * d + s,
            t[5] = i * h + a * d + l,
            t
        }
        ,
        i.mul = i.multiply,
        i.rotate = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = Math.sin(n)
              , c = Math.cos(n);
            return t[0] = r * c + o * u,
            t[1] = i * c + a * u,
            t[2] = r * -u + o * c,
            t[3] = i * -u + a * c,
            t[4] = s,
            t[5] = l,
            t
        }
        ,
        i.scale = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = n[0]
              , c = n[1];
            return t[0] = r * u,
            t[1] = i * u,
            t[2] = o * c,
            t[3] = a * c,
            t[4] = s,
            t[5] = l,
            t
        }
        ,
        i.translate = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = n[0]
              , c = n[1];
            return t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = r * u + o * c + s,
            t[5] = i * u + a * c + l,
            t
        }
        ,
        i.fromRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = r,
            t[1] = n,
            t[2] = -n,
            t[3] = r,
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromScaling = function(t, e) {
            return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = e[1],
            t[4] = 0,
            t[5] = 0,
            t
        }
        ,
        i.fromTranslation = function(t, e) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t[4] = e[0],
            t[5] = e[1],
            t
        }
        ,
        i.str = function(t) {
            return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")"
        }
        ,
        i.frob = function(t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1)
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = t[3]
              , s = t[4]
              , l = t[5]
              , u = e[0]
              , c = e[1]
              , f = e[2]
              , p = e[3]
              , h = e[4]
              , d = e[5];
            return Math.abs(n - u) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(i - c) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(c)) && Math.abs(o - f) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(f)) && Math.abs(a - p) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(s - h) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(h)) && Math.abs(l - d) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(d))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("9f", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {
            scalar: {},
            SIMD: {}
        };
        return i.create = function() {
            var t = new r.ARRAY_TYPE(16);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(16);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e[9] = t[9],
            e[10] = t[10],
            e[11] = t[11],
            e[12] = t[12],
            e[13] = t[13],
            e[14] = t[14],
            e[15] = t[15],
            e
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.fromValues = function(t, e, n, i, o, a, s, l, u, c, f, p, h, d, m, v) {
            var g = new r.ARRAY_TYPE(16);
            return g[0] = t,
            g[1] = e,
            g[2] = n,
            g[3] = i,
            g[4] = o,
            g[5] = a,
            g[6] = s,
            g[7] = l,
            g[8] = u,
            g[9] = c,
            g[10] = f,
            g[11] = p,
            g[12] = h,
            g[13] = d,
            g[14] = m,
            g[15] = v,
            g
        }
        ,
        i.set = function(t, e, n, r, i, o, a, s, l, u, c, f, p, h, d, m, v) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t[6] = s,
            t[7] = l,
            t[8] = u,
            t[9] = c,
            t[10] = f,
            t[11] = p,
            t[12] = h,
            t[13] = d,
            t[14] = m,
            t[15] = v,
            t
        }
        ,
        i.identity = function(t) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.scalar.transpose = function(t, e) {
            if (t === e) {
                var n = e[1]
                  , r = e[2]
                  , i = e[3]
                  , o = e[6]
                  , a = e[7]
                  , s = e[11];
                t[1] = e[4],
                t[2] = e[8],
                t[3] = e[12],
                t[4] = n,
                t[6] = e[9],
                t[7] = e[13],
                t[8] = r,
                t[9] = o,
                t[11] = e[14],
                t[12] = i,
                t[13] = a,
                t[14] = s
            } else
                t[0] = e[0],
                t[1] = e[4],
                t[2] = e[8],
                t[3] = e[12],
                t[4] = e[1],
                t[5] = e[5],
                t[6] = e[9],
                t[7] = e[13],
                t[8] = e[2],
                t[9] = e[6],
                t[10] = e[10],
                t[11] = e[14],
                t[12] = e[3],
                t[13] = e[7],
                t[14] = e[11],
                t[15] = e[15];
            return t
        }
        ,
        i.SIMD.transpose = function(t, e) {
            var n, r, i, o, a, s, l, u, c, f;
            return n = SIMD.Float32x4.load(e, 0),
            r = SIMD.Float32x4.load(e, 4),
            i = SIMD.Float32x4.load(e, 8),
            o = SIMD.Float32x4.load(e, 12),
            a = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5),
            s = SIMD.Float32x4.shuffle(i, o, 0, 1, 4, 5),
            l = SIMD.Float32x4.shuffle(a, s, 0, 2, 4, 6),
            u = SIMD.Float32x4.shuffle(a, s, 1, 3, 5, 7),
            SIMD.Float32x4.store(t, 0, l),
            SIMD.Float32x4.store(t, 4, u),
            a = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7),
            s = SIMD.Float32x4.shuffle(i, o, 2, 3, 6, 7),
            c = SIMD.Float32x4.shuffle(a, s, 0, 2, 4, 6),
            f = SIMD.Float32x4.shuffle(a, s, 1, 3, 5, 7),
            SIMD.Float32x4.store(t, 8, c),
            SIMD.Float32x4.store(t, 12, f),
            t
        }
        ,
        i.transpose = r.USE_SIMD ? i.SIMD.transpose : i.scalar.transpose,
        i.scalar.invert = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = e[6]
              , u = e[7]
              , c = e[8]
              , f = e[9]
              , p = e[10]
              , h = e[11]
              , d = e[12]
              , m = e[13]
              , v = e[14]
              , g = e[15]
              , y = n * s - r * a
              , b = n * l - i * a
              , _ = n * u - o * a
              , w = r * l - i * s
              , x = r * u - o * s
              , $ = i * u - o * l
              , E = c * m - f * d
              , S = c * v - p * d
              , M = c * g - h * d
              , k = f * v - p * m
              , T = f * g - h * m
              , A = p * g - h * v
              , D = y * A - b * T + _ * k + w * M - x * S + $ * E;
            return D ? (D = 1 / D,
            t[0] = (s * A - l * T + u * k) * D,
            t[1] = (i * T - r * A - o * k) * D,
            t[2] = (m * $ - v * x + g * w) * D,
            t[3] = (p * x - f * $ - h * w) * D,
            t[4] = (l * M - a * A - u * S) * D,
            t[5] = (n * A - i * M + o * S) * D,
            t[6] = (v * _ - d * $ - g * b) * D,
            t[7] = (c * $ - p * _ + h * b) * D,
            t[8] = (a * T - s * M + u * E) * D,
            t[9] = (r * M - n * T - o * E) * D,
            t[10] = (d * x - m * _ + g * y) * D,
            t[11] = (f * _ - c * x - h * y) * D,
            t[12] = (s * S - a * k - l * E) * D,
            t[13] = (n * k - r * S + i * E) * D,
            t[14] = (m * b - d * w - v * y) * D,
            t[15] = (c * w - f * b + p * y) * D,
            t) : null
        }
        ,
        i.SIMD.invert = function(t, e) {
            var n, r, i, o, a, s, l, u, c, f, p = SIMD.Float32x4.load(e, 0), h = SIMD.Float32x4.load(e, 4), d = SIMD.Float32x4.load(e, 8), m = SIMD.Float32x4.load(e, 12);
            return a = SIMD.Float32x4.shuffle(p, h, 0, 1, 4, 5),
            r = SIMD.Float32x4.shuffle(d, m, 0, 1, 4, 5),
            n = SIMD.Float32x4.shuffle(a, r, 0, 2, 4, 6),
            r = SIMD.Float32x4.shuffle(r, a, 1, 3, 5, 7),
            a = SIMD.Float32x4.shuffle(p, h, 2, 3, 6, 7),
            o = SIMD.Float32x4.shuffle(d, m, 2, 3, 6, 7),
            i = SIMD.Float32x4.shuffle(a, o, 0, 2, 4, 6),
            o = SIMD.Float32x4.shuffle(o, a, 1, 3, 5, 7),
            a = SIMD.Float32x4.mul(i, o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            s = SIMD.Float32x4.mul(r, a),
            l = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, a), s),
            l = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), l),
            l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(r, i),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            s = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), s),
            c = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(o, a)),
            c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r, 2, 3, 0, 1), o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1),
            s = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, a), s),
            u = SIMD.Float32x4.mul(n, a),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(i, a)),
            u = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, a), u),
            u = SIMD.Float32x4.swizzle(u, 2, 3, 0, 1),
            a = SIMD.Float32x4.mul(n, r),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            u = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), u),
            c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(i, a), c),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            u = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, a), u),
            c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(i, a)),
            a = SIMD.Float32x4.mul(n, o),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(i, a)),
            u = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, a), u),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            l = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, a), l),
            u = SIMD.Float32x4.sub(u, SIMD.Float32x4.mul(r, a)),
            a = SIMD.Float32x4.mul(n, i),
            a = SIMD.Float32x4.swizzle(a, 1, 0, 3, 2),
            l = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, a), l),
            c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(r, a)),
            a = SIMD.Float32x4.swizzle(a, 2, 3, 0, 1),
            l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(o, a)),
            c = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, a), c),
            f = SIMD.Float32x4.mul(n, s),
            f = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f, 2, 3, 0, 1), f),
            f = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(f, 1, 0, 3, 2), f),
            a = SIMD.Float32x4.reciprocalApproximation(f),
            f = SIMD.Float32x4.sub(SIMD.Float32x4.add(a, a), SIMD.Float32x4.mul(f, SIMD.Float32x4.mul(a, a))),
            (f = SIMD.Float32x4.swizzle(f, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(f, s)),
            SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(f, l)),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(f, u)),
            SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(f, c)),
            t) : null
        }
        ,
        i.invert = r.USE_SIMD ? i.SIMD.invert : i.scalar.invert,
        i.scalar.adjoint = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = e[6]
              , u = e[7]
              , c = e[8]
              , f = e[9]
              , p = e[10]
              , h = e[11]
              , d = e[12]
              , m = e[13]
              , v = e[14]
              , g = e[15];
            return t[0] = s * (p * g - h * v) - f * (l * g - u * v) + m * (l * h - u * p),
            t[1] = -(r * (p * g - h * v) - f * (i * g - o * v) + m * (i * h - o * p)),
            t[2] = r * (l * g - u * v) - s * (i * g - o * v) + m * (i * u - o * l),
            t[3] = -(r * (l * h - u * p) - s * (i * h - o * p) + f * (i * u - o * l)),
            t[4] = -(a * (p * g - h * v) - c * (l * g - u * v) + d * (l * h - u * p)),
            t[5] = n * (p * g - h * v) - c * (i * g - o * v) + d * (i * h - o * p),
            t[6] = -(n * (l * g - u * v) - a * (i * g - o * v) + d * (i * u - o * l)),
            t[7] = n * (l * h - u * p) - a * (i * h - o * p) + c * (i * u - o * l),
            t[8] = a * (f * g - h * m) - c * (s * g - u * m) + d * (s * h - u * f),
            t[9] = -(n * (f * g - h * m) - c * (r * g - o * m) + d * (r * h - o * f)),
            t[10] = n * (s * g - u * m) - a * (r * g - o * m) + d * (r * u - o * s),
            t[11] = -(n * (s * h - u * f) - a * (r * h - o * f) + c * (r * u - o * s)),
            t[12] = -(a * (f * v - p * m) - c * (s * v - l * m) + d * (s * p - l * f)),
            t[13] = n * (f * v - p * m) - c * (r * v - i * m) + d * (r * p - i * f),
            t[14] = -(n * (s * v - l * m) - a * (r * v - i * m) + d * (r * l - i * s)),
            t[15] = n * (s * p - l * f) - a * (r * p - i * f) + c * (r * l - i * s),
            t
        }
        ,
        i.SIMD.adjoint = function(t, e) {
            var n, r, i, o, a, s, l, u, c, f, p, h, d, n = SIMD.Float32x4.load(e, 0), r = SIMD.Float32x4.load(e, 4), i = SIMD.Float32x4.load(e, 8), o = SIMD.Float32x4.load(e, 12);
            return c = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5),
            s = SIMD.Float32x4.shuffle(i, o, 0, 1, 4, 5),
            a = SIMD.Float32x4.shuffle(c, s, 0, 2, 4, 6),
            s = SIMD.Float32x4.shuffle(s, c, 1, 3, 5, 7),
            c = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7),
            u = SIMD.Float32x4.shuffle(i, o, 2, 3, 6, 7),
            l = SIMD.Float32x4.shuffle(c, u, 0, 2, 4, 6),
            u = SIMD.Float32x4.shuffle(u, c, 1, 3, 5, 7),
            c = SIMD.Float32x4.mul(l, u),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            f = SIMD.Float32x4.mul(s, c),
            p = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, c), f),
            p = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), p),
            p = SIMD.Float32x4.swizzle(p, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(s, l),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            f = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, c), f),
            d = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(f, SIMD.Float32x4.mul(u, c)),
            d = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), d),
            d = SIMD.Float32x4.swizzle(d, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), u),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1),
            f = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, c), f),
            h = SIMD.Float32x4.mul(a, c),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            f = SIMD.Float32x4.sub(f, SIMD.Float32x4.mul(l, c)),
            h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, c), h),
            h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1),
            c = SIMD.Float32x4.mul(a, s),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            h = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, c), h),
            d = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, c), d),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, c), h),
            d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(l, c)),
            c = SIMD.Float32x4.mul(a, u),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(l, c)),
            h = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, c), h),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            p = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, c), p),
            h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(s, c)),
            c = SIMD.Float32x4.mul(a, l),
            c = SIMD.Float32x4.swizzle(c, 1, 0, 3, 2),
            p = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, c), p),
            d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(s, c)),
            c = SIMD.Float32x4.swizzle(c, 2, 3, 0, 1),
            p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(u, c)),
            d = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, c), d),
            SIMD.Float32x4.store(t, 0, f),
            SIMD.Float32x4.store(t, 4, p),
            SIMD.Float32x4.store(t, 8, h),
            SIMD.Float32x4.store(t, 12, d),
            t
        }
        ,
        i.adjoint = r.USE_SIMD ? i.SIMD.adjoint : i.scalar.adjoint,
        i.determinant = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2]
              , i = t[3]
              , o = t[4]
              , a = t[5]
              , s = t[6]
              , l = t[7]
              , u = t[8]
              , c = t[9]
              , f = t[10]
              , p = t[11]
              , h = t[12]
              , d = t[13]
              , m = t[14]
              , v = t[15]
              , g = e * a - n * o
              , y = e * s - r * o
              , b = e * l - i * o
              , _ = n * s - r * a
              , w = n * l - i * a
              , x = r * l - i * s
              , $ = u * d - c * h
              , E = u * m - f * h
              , S = u * v - p * h
              , M = c * m - f * d
              , k = c * v - p * d
              , T = f * v - p * m;
            return g * T - y * k + b * M + _ * S - w * E + x * $
        }
        ,
        i.SIMD.multiply = function(t, e, n) {
            var r = SIMD.Float32x4.load(e, 0)
              , i = SIMD.Float32x4.load(e, 4)
              , o = SIMD.Float32x4.load(e, 8)
              , a = SIMD.Float32x4.load(e, 12)
              , s = SIMD.Float32x4.load(n, 0)
              , l = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 3, 3, 3, 3), a))));
            SIMD.Float32x4.store(t, 0, l);
            var u = SIMD.Float32x4.load(n, 4)
              , c = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 3, 3, 3, 3), a))));
            SIMD.Float32x4.store(t, 4, c);
            var f = SIMD.Float32x4.load(n, 8)
              , p = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 3, 3, 3, 3), a))));
            SIMD.Float32x4.store(t, 8, p);
            var h = SIMD.Float32x4.load(n, 12)
              , d = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 2, 2, 2, 2), o), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(h, 3, 3, 3, 3), a))));
            return SIMD.Float32x4.store(t, 12, d),
            t
        }
        ,
        i.scalar.multiply = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = e[6]
              , c = e[7]
              , f = e[8]
              , p = e[9]
              , h = e[10]
              , d = e[11]
              , m = e[12]
              , v = e[13]
              , g = e[14]
              , y = e[15]
              , b = n[0]
              , _ = n[1]
              , w = n[2]
              , x = n[3];
            return t[0] = b * r + _ * s + w * f + x * m,
            t[1] = b * i + _ * l + w * p + x * v,
            t[2] = b * o + _ * u + w * h + x * g,
            t[3] = b * a + _ * c + w * d + x * y,
            b = n[4],
            _ = n[5],
            w = n[6],
            x = n[7],
            t[4] = b * r + _ * s + w * f + x * m,
            t[5] = b * i + _ * l + w * p + x * v,
            t[6] = b * o + _ * u + w * h + x * g,
            t[7] = b * a + _ * c + w * d + x * y,
            b = n[8],
            _ = n[9],
            w = n[10],
            x = n[11],
            t[8] = b * r + _ * s + w * f + x * m,
            t[9] = b * i + _ * l + w * p + x * v,
            t[10] = b * o + _ * u + w * h + x * g,
            t[11] = b * a + _ * c + w * d + x * y,
            b = n[12],
            _ = n[13],
            w = n[14],
            x = n[15],
            t[12] = b * r + _ * s + w * f + x * m,
            t[13] = b * i + _ * l + w * p + x * v,
            t[14] = b * o + _ * u + w * h + x * g,
            t[15] = b * a + _ * c + w * d + x * y,
            t
        }
        ,
        i.multiply = r.USE_SIMD ? i.SIMD.multiply : i.scalar.multiply,
        i.mul = i.multiply,
        i.scalar.translate = function(t, e, n) {
            var r, i, o, a, s, l, u, c, f, p, h, d, m = n[0], v = n[1], g = n[2];
            return e === t ? (t[12] = e[0] * m + e[4] * v + e[8] * g + e[12],
            t[13] = e[1] * m + e[5] * v + e[9] * g + e[13],
            t[14] = e[2] * m + e[6] * v + e[10] * g + e[14],
            t[15] = e[3] * m + e[7] * v + e[11] * g + e[15]) : (r = e[0],
            i = e[1],
            o = e[2],
            a = e[3],
            s = e[4],
            l = e[5],
            u = e[6],
            c = e[7],
            f = e[8],
            p = e[9],
            h = e[10],
            d = e[11],
            t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = s,
            t[5] = l,
            t[6] = u,
            t[7] = c,
            t[8] = f,
            t[9] = p,
            t[10] = h,
            t[11] = d,
            t[12] = r * m + s * v + f * g + e[12],
            t[13] = i * m + l * v + p * g + e[13],
            t[14] = o * m + u * v + h * g + e[14],
            t[15] = a * m + c * v + d * g + e[15]),
            t
        }
        ,
        i.SIMD.translate = function(t, e, n) {
            var r = SIMD.Float32x4.load(e, 0)
              , i = SIMD.Float32x4.load(e, 4)
              , o = SIMD.Float32x4.load(e, 8)
              , a = SIMD.Float32x4.load(e, 12)
              , s = SIMD.Float32x4(n[0], n[1], n[2], 0);
            e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11]),
            r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(s, 0, 0, 0, 0)),
            i = SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(s, 1, 1, 1, 1)),
            o = SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(s, 2, 2, 2, 2));
            var l = SIMD.Float32x4.add(r, SIMD.Float32x4.add(i, SIMD.Float32x4.add(o, a)));
            return SIMD.Float32x4.store(t, 12, l),
            t
        }
        ,
        i.translate = r.USE_SIMD ? i.SIMD.translate : i.scalar.translate,
        i.scalar.scale = function(t, e, n) {
            var r = n[0]
              , i = n[1]
              , o = n[2];
            return t[0] = e[0] * r,
            t[1] = e[1] * r,
            t[2] = e[2] * r,
            t[3] = e[3] * r,
            t[4] = e[4] * i,
            t[5] = e[5] * i,
            t[6] = e[6] * i,
            t[7] = e[7] * i,
            t[8] = e[8] * o,
            t[9] = e[9] * o,
            t[10] = e[10] * o,
            t[11] = e[11] * o,
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.SIMD.scale = function(t, e, n) {
            var r, i, o, a = SIMD.Float32x4(n[0], n[1], n[2], 0);
            return r = SIMD.Float32x4.load(e, 0),
            SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(a, 0, 0, 0, 0))),
            i = SIMD.Float32x4.load(e, 4),
            SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(a, 1, 1, 1, 1))),
            o = SIMD.Float32x4.load(e, 8),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(a, 2, 2, 2, 2))),
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15],
            t
        }
        ,
        i.scale = r.USE_SIMD ? i.SIMD.scale : i.scalar.scale,
        i.rotate = function(t, e, n, i) {
            var o, a, s, l, u, c, f, p, h, d, m, v, g, y, b, _, w, x, $, E, S, M, k, T, A = i[0], D = i[1], C = i[2], I = Math.sqrt(A * A + D * D + C * C);
            return Math.abs(I) < r.EPSILON ? null : (I = 1 / I,
            A *= I,
            D *= I,
            C *= I,
            o = Math.sin(n),
            a = Math.cos(n),
            s = 1 - a,
            l = e[0],
            u = e[1],
            c = e[2],
            f = e[3],
            p = e[4],
            h = e[5],
            d = e[6],
            m = e[7],
            v = e[8],
            g = e[9],
            y = e[10],
            b = e[11],
            _ = A * A * s + a,
            w = D * A * s + C * o,
            x = C * A * s - D * o,
            $ = A * D * s - C * o,
            E = D * D * s + a,
            S = C * D * s + A * o,
            M = A * C * s + D * o,
            k = D * C * s - A * o,
            T = C * C * s + a,
            t[0] = l * _ + p * w + v * x,
            t[1] = u * _ + h * w + g * x,
            t[2] = c * _ + d * w + y * x,
            t[3] = f * _ + m * w + b * x,
            t[4] = l * $ + p * E + v * S,
            t[5] = u * $ + h * E + g * S,
            t[6] = c * $ + d * E + y * S,
            t[7] = f * $ + m * E + b * S,
            t[8] = l * M + p * k + v * T,
            t[9] = u * M + h * k + g * T,
            t[10] = c * M + d * k + y * T,
            t[11] = f * M + m * k + b * T,
            e !== t && (t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t)
        }
        ,
        i.scalar.rotateX = function(t, e, n) {
            var r = Math.sin(n)
              , i = Math.cos(n)
              , o = e[4]
              , a = e[5]
              , s = e[6]
              , l = e[7]
              , u = e[8]
              , c = e[9]
              , f = e[10]
              , p = e[11];
            return e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[4] = o * i + u * r,
            t[5] = a * i + c * r,
            t[6] = s * i + f * r,
            t[7] = l * i + p * r,
            t[8] = u * i - o * r,
            t[9] = c * i - a * r,
            t[10] = f * i - s * r,
            t[11] = p * i - l * r,
            t
        }
        ,
        i.SIMD.rotateX = function(t, e, n) {
            var r = SIMD.Float32x4.splat(Math.sin(n))
              , i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            var o = SIMD.Float32x4.load(e, 4)
              , a = SIMD.Float32x4.load(e, 8);
            return SIMD.Float32x4.store(t, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, i), SIMD.Float32x4.mul(o, r))),
            t
        }
        ,
        i.rotateX = r.USE_SIMD ? i.SIMD.rotateX : i.scalar.rotateX,
        i.scalar.rotateY = function(t, e, n) {
            var r = Math.sin(n)
              , i = Math.cos(n)
              , o = e[0]
              , a = e[1]
              , s = e[2]
              , l = e[3]
              , u = e[8]
              , c = e[9]
              , f = e[10]
              , p = e[11];
            return e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[0] = o * i - u * r,
            t[1] = a * i - c * r,
            t[2] = s * i - f * r,
            t[3] = l * i - p * r,
            t[8] = o * r + u * i,
            t[9] = a * r + c * i,
            t[10] = s * r + f * i,
            t[11] = l * r + p * i,
            t
        }
        ,
        i.SIMD.rotateY = function(t, e, n) {
            var r = SIMD.Float32x4.splat(Math.sin(n))
              , i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            var o = SIMD.Float32x4.load(e, 0)
              , a = SIMD.Float32x4.load(e, 8);
            return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, r), SIMD.Float32x4.mul(a, i))),
            t
        }
        ,
        i.rotateY = r.USE_SIMD ? i.SIMD.rotateY : i.scalar.rotateY,
        i.scalar.rotateZ = function(t, e, n) {
            var r = Math.sin(n)
              , i = Math.cos(n)
              , o = e[0]
              , a = e[1]
              , s = e[2]
              , l = e[3]
              , u = e[4]
              , c = e[5]
              , f = e[6]
              , p = e[7];
            return e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]),
            t[0] = o * i + u * r,
            t[1] = a * i + c * r,
            t[2] = s * i + f * r,
            t[3] = l * i + p * r,
            t[4] = u * i - o * r,
            t[5] = c * i - a * r,
            t[6] = f * i - s * r,
            t[7] = p * i - l * r,
            t
        }
        ,
        i.SIMD.rotateZ = function(t, e, n) {
            var r = SIMD.Float32x4.splat(Math.sin(n))
              , i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[8] = e[8],
            t[9] = e[9],
            t[10] = e[10],
            t[11] = e[11],
            t[12] = e[12],
            t[13] = e[13],
            t[14] = e[14],
            t[15] = e[15]);
            var o = SIMD.Float32x4.load(e, 0)
              , a = SIMD.Float32x4.load(e, 4);
            return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(o, i), SIMD.Float32x4.mul(a, r))),
            SIMD.Float32x4.store(t, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, i), SIMD.Float32x4.mul(o, r))),
            t
        }
        ,
        i.rotateZ = r.USE_SIMD ? i.SIMD.rotateZ : i.scalar.rotateZ,
        i.fromTranslation = function(t, e) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = e[0],
            t[13] = e[1],
            t[14] = e[2],
            t[15] = 1,
            t
        }
        ,
        i.fromScaling = function(t, e) {
            return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = e[1],
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = e[2],
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromRotation = function(t, e, n) {
            var i, o, a, s = n[0], l = n[1], u = n[2], c = Math.sqrt(s * s + l * l + u * u);
            return Math.abs(c) < r.EPSILON ? null : (c = 1 / c,
            s *= c,
            l *= c,
            u *= c,
            i = Math.sin(e),
            o = Math.cos(e),
            a = 1 - o,
            t[0] = s * s * a + o,
            t[1] = l * s * a + u * i,
            t[2] = u * s * a - l * i,
            t[3] = 0,
            t[4] = s * l * a - u * i,
            t[5] = l * l * a + o,
            t[6] = u * l * a + s * i,
            t[7] = 0,
            t[8] = s * u * a + l * i,
            t[9] = l * u * a - s * i,
            t[10] = u * u * a + o,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t)
        }
        ,
        i.fromXRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = r,
            t[6] = n,
            t[7] = 0,
            t[8] = 0,
            t[9] = -n,
            t[10] = r,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromYRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = r,
            t[1] = 0,
            t[2] = -n,
            t[3] = 0,
            t[4] = 0,
            t[5] = 1,
            t[6] = 0,
            t[7] = 0,
            t[8] = n,
            t[9] = 0,
            t[10] = r,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromZRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = r,
            t[1] = n,
            t[2] = 0,
            t[3] = 0,
            t[4] = -n,
            t[5] = r,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 1,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.fromRotationTranslation = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = r + r
              , l = i + i
              , u = o + o
              , c = r * s
              , f = r * l
              , p = r * u
              , h = i * l
              , d = i * u
              , m = o * u
              , v = a * s
              , g = a * l
              , y = a * u;
            return t[0] = 1 - (h + m),
            t[1] = f + y,
            t[2] = p - g,
            t[3] = 0,
            t[4] = f - y,
            t[5] = 1 - (c + m),
            t[6] = d + v,
            t[7] = 0,
            t[8] = p + g,
            t[9] = d - v,
            t[10] = 1 - (c + h),
            t[11] = 0,
            t[12] = n[0],
            t[13] = n[1],
            t[14] = n[2],
            t[15] = 1,
            t
        }
        ,
        i.getTranslation = function(t, e) {
            return t[0] = e[12],
            t[1] = e[13],
            t[2] = e[14],
            t
        }
        ,
        i.getRotation = function(t, e) {
            var n = e[0] + e[5] + e[10]
              , r = 0;
            return n > 0 ? (r = 2 * Math.sqrt(n + 1),
            t[3] = .25 * r,
            t[0] = (e[6] - e[9]) / r,
            t[1] = (e[8] - e[2]) / r,
            t[2] = (e[1] - e[4]) / r) : e[0] > e[5] & e[0] > e[10] ? (r = 2 * Math.sqrt(1 + e[0] - e[5] - e[10]),
            t[3] = (e[6] - e[9]) / r,
            t[0] = .25 * r,
            t[1] = (e[1] + e[4]) / r,
            t[2] = (e[8] + e[2]) / r) : e[5] > e[10] ? (r = 2 * Math.sqrt(1 + e[5] - e[0] - e[10]),
            t[3] = (e[8] - e[2]) / r,
            t[0] = (e[1] + e[4]) / r,
            t[1] = .25 * r,
            t[2] = (e[6] + e[9]) / r) : (r = 2 * Math.sqrt(1 + e[10] - e[0] - e[5]),
            t[3] = (e[1] - e[4]) / r,
            t[0] = (e[8] + e[2]) / r,
            t[1] = (e[6] + e[9]) / r,
            t[2] = .25 * r),
            t
        }
        ,
        i.fromRotationTranslationScale = function(t, e, n, r) {
            var i = e[0]
              , o = e[1]
              , a = e[2]
              , s = e[3]
              , l = i + i
              , u = o + o
              , c = a + a
              , f = i * l
              , p = i * u
              , h = i * c
              , d = o * u
              , m = o * c
              , v = a * c
              , g = s * l
              , y = s * u
              , b = s * c
              , _ = r[0]
              , w = r[1]
              , x = r[2];
            return t[0] = (1 - (d + v)) * _,
            t[1] = (p + b) * _,
            t[2] = (h - y) * _,
            t[3] = 0,
            t[4] = (p - b) * w,
            t[5] = (1 - (f + v)) * w,
            t[6] = (m + g) * w,
            t[7] = 0,
            t[8] = (h + y) * x,
            t[9] = (m - g) * x,
            t[10] = (1 - (f + d)) * x,
            t[11] = 0,
            t[12] = n[0],
            t[13] = n[1],
            t[14] = n[2],
            t[15] = 1,
            t
        }
        ,
        i.fromRotationTranslationScaleOrigin = function(t, e, n, r, i) {
            var o = e[0]
              , a = e[1]
              , s = e[2]
              , l = e[3]
              , u = o + o
              , c = a + a
              , f = s + s
              , p = o * u
              , h = o * c
              , d = o * f
              , m = a * c
              , v = a * f
              , g = s * f
              , y = l * u
              , b = l * c
              , _ = l * f
              , w = r[0]
              , x = r[1]
              , $ = r[2]
              , E = i[0]
              , S = i[1]
              , M = i[2];
            return t[0] = (1 - (m + g)) * w,
            t[1] = (h + _) * w,
            t[2] = (d - b) * w,
            t[3] = 0,
            t[4] = (h - _) * x,
            t[5] = (1 - (p + g)) * x,
            t[6] = (v + y) * x,
            t[7] = 0,
            t[8] = (d + b) * $,
            t[9] = (v - y) * $,
            t[10] = (1 - (p + m)) * $,
            t[11] = 0,
            t[12] = n[0] + E - (t[0] * E + t[4] * S + t[8] * M),
            t[13] = n[1] + S - (t[1] * E + t[5] * S + t[9] * M),
            t[14] = n[2] + M - (t[2] * E + t[6] * S + t[10] * M),
            t[15] = 1,
            t
        }
        ,
        i.fromQuat = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = n + n
              , s = r + r
              , l = i + i
              , u = n * a
              , c = r * a
              , f = r * s
              , p = i * a
              , h = i * s
              , d = i * l
              , m = o * a
              , v = o * s
              , g = o * l;
            return t[0] = 1 - f - d,
            t[1] = c + g,
            t[2] = p - v,
            t[3] = 0,
            t[4] = c - g,
            t[5] = 1 - u - d,
            t[6] = h + m,
            t[7] = 0,
            t[8] = p + v,
            t[9] = h - m,
            t[10] = 1 - u - f,
            t[11] = 0,
            t[12] = 0,
            t[13] = 0,
            t[14] = 0,
            t[15] = 1,
            t
        }
        ,
        i.frustum = function(t, e, n, r, i, o, a) {
            var s = 1 / (n - e)
              , l = 1 / (i - r)
              , u = 1 / (o - a);
            return t[0] = 2 * o * s,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = 2 * o * l,
            t[6] = 0,
            t[7] = 0,
            t[8] = (n + e) * s,
            t[9] = (i + r) * l,
            t[10] = (a + o) * u,
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = a * o * 2 * u,
            t[15] = 0,
            t
        }
        ,
        i.perspective = function(t, e, n, r, i) {
            var o = 1 / Math.tan(e / 2)
              , a = 1 / (r - i);
            return t[0] = o / n,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = o,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = (i + r) * a,
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = 2 * i * r * a,
            t[15] = 0,
            t
        }
        ,
        i.perspectiveFromFieldOfView = function(t, e, n, r) {
            var i = Math.tan(e.upDegrees * Math.PI / 180)
              , o = Math.tan(e.downDegrees * Math.PI / 180)
              , a = Math.tan(e.leftDegrees * Math.PI / 180)
              , s = Math.tan(e.rightDegrees * Math.PI / 180)
              , l = 2 / (a + s)
              , u = 2 / (i + o);
            return t[0] = l,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = u,
            t[6] = 0,
            t[7] = 0,
            t[8] = -((a - s) * l * .5),
            t[9] = (i - o) * u * .5,
            t[10] = r / (n - r),
            t[11] = -1,
            t[12] = 0,
            t[13] = 0,
            t[14] = r * n / (n - r),
            t[15] = 0,
            t
        }
        ,
        i.ortho = function(t, e, n, r, i, o, a) {
            var s = 1 / (e - n)
              , l = 1 / (r - i)
              , u = 1 / (o - a);
            return t[0] = -2 * s,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 0,
            t[5] = -2 * l,
            t[6] = 0,
            t[7] = 0,
            t[8] = 0,
            t[9] = 0,
            t[10] = 2 * u,
            t[11] = 0,
            t[12] = (e + n) * s,
            t[13] = (i + r) * l,
            t[14] = (a + o) * u,
            t[15] = 1,
            t
        }
        ,
        i.lookAt = function(t, e, n, o) {
            var a, s, l, u, c, f, p, h, d, m, v = e[0], g = e[1], y = e[2], b = o[0], _ = o[1], w = o[2], x = n[0], $ = n[1], E = n[2];
            return Math.abs(v - x) < r.EPSILON && Math.abs(g - $) < r.EPSILON && Math.abs(y - E) < r.EPSILON ? i.identity(t) : (p = v - x,
            h = g - $,
            d = y - E,
            m = 1 / Math.sqrt(p * p + h * h + d * d),
            p *= m,
            h *= m,
            d *= m,
            a = _ * d - w * h,
            s = w * p - b * d,
            l = b * h - _ * p,
            m = Math.sqrt(a * a + s * s + l * l),
            m ? (m = 1 / m,
            a *= m,
            s *= m,
            l *= m) : (a = 0,
            s = 0,
            l = 0),
            u = h * l - d * s,
            c = d * a - p * l,
            f = p * s - h * a,
            m = Math.sqrt(u * u + c * c + f * f),
            m ? (m = 1 / m,
            u *= m,
            c *= m,
            f *= m) : (u = 0,
            c = 0,
            f = 0),
            t[0] = a,
            t[1] = u,
            t[2] = p,
            t[3] = 0,
            t[4] = s,
            t[5] = c,
            t[6] = h,
            t[7] = 0,
            t[8] = l,
            t[9] = f,
            t[10] = d,
            t[11] = 0,
            t[12] = -(a * v + s * g + l * y),
            t[13] = -(u * v + c * g + f * y),
            t[14] = -(p * v + h * g + d * y),
            t[15] = 1,
            t)
        }
        ,
        i.str = function(t) {
            return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
        }
        ,
        i.frob = function(t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2))
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t[6] = e[6] + n[6],
            t[7] = e[7] + n[7],
            t[8] = e[8] + n[8],
            t[9] = e[9] + n[9],
            t[10] = e[10] + n[10],
            t[11] = e[11] + n[11],
            t[12] = e[12] + n[12],
            t[13] = e[13] + n[13],
            t[14] = e[14] + n[14],
            t[15] = e[15] + n[15],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t[6] = e[6] - n[6],
            t[7] = e[7] - n[7],
            t[8] = e[8] - n[8],
            t[9] = e[9] - n[9],
            t[10] = e[10] - n[10],
            t[11] = e[11] - n[11],
            t[12] = e[12] - n[12],
            t[13] = e[13] - n[13],
            t[14] = e[14] - n[14],
            t[15] = e[15] - n[15],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t[6] = e[6] * n,
            t[7] = e[7] * n,
            t[8] = e[8] * n,
            t[9] = e[9] * n,
            t[10] = e[10] * n,
            t[11] = e[11] * n,
            t[12] = e[12] * n,
            t[13] = e[13] * n,
            t[14] = e[14] * n,
            t[15] = e[15] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t[6] = e[6] + n[6] * r,
            t[7] = e[7] + n[7] * r,
            t[8] = e[8] + n[8] * r,
            t[9] = e[9] + n[9] * r,
            t[10] = e[10] + n[10] * r,
            t[11] = e[11] + n[11] * r,
            t[12] = e[12] + n[12] * r,
            t[13] = e[13] + n[13] * r,
            t[14] = e[14] + n[14] * r,
            t[15] = e[15] + n[15] * r,
            t
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8] && t[9] === e[9] && t[10] === e[10] && t[11] === e[11] && t[12] === e[12] && t[13] === e[13] && t[14] === e[14] && t[15] === e[15]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = t[3]
              , s = t[4]
              , l = t[5]
              , u = t[6]
              , c = t[7]
              , f = t[8]
              , p = t[9]
              , h = t[10]
              , d = t[11]
              , m = t[12]
              , v = t[13]
              , g = t[14]
              , y = t[15]
              , b = e[0]
              , _ = e[1]
              , w = e[2]
              , x = e[3]
              , $ = e[4]
              , E = e[5]
              , S = e[6]
              , M = e[7]
              , k = e[8]
              , T = e[9]
              , A = e[10]
              , D = e[11]
              , C = e[12]
              , I = e[13]
              , O = e[14]
              , R = e[15];
            return Math.abs(n - b) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(b)) && Math.abs(i - _) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(_)) && Math.abs(o - w) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(w)) && Math.abs(a - x) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(x)) && Math.abs(s - $) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs($)) && Math.abs(l - E) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(E)) && Math.abs(u - S) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(S)) && Math.abs(c - M) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(M)) && Math.abs(f - k) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(k)) && Math.abs(p - T) <= r.EPSILON * Math.max(1, Math.abs(p), Math.abs(T)) && Math.abs(h - A) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(A)) && Math.abs(d - D) <= r.EPSILON * Math.max(1, Math.abs(d), Math.abs(D)) && Math.abs(m - C) <= r.EPSILON * Math.max(1, Math.abs(m), Math.abs(C)) && Math.abs(v - I) <= r.EPSILON * Math.max(1, Math.abs(v), Math.abs(I)) && Math.abs(g - O) <= r.EPSILON * Math.max(1, Math.abs(g), Math.abs(O)) && Math.abs(y - R) <= r.EPSILON * Math.max(1, Math.abs(y), Math.abs(R))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("a0", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(9);
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.fromMat4 = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[4],
            t[4] = e[5],
            t[5] = e[6],
            t[6] = e[8],
            t[7] = e[9],
            t[8] = e[10],
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(9);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e[4] = t[4],
            e[5] = t[5],
            e[6] = t[6],
            e[7] = t[7],
            e[8] = t[8],
            e
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t[4] = e[4],
            t[5] = e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t
        }
        ,
        i.fromValues = function(t, e, n, i, o, a, s, l, u) {
            var c = new r.ARRAY_TYPE(9);
            return c[0] = t,
            c[1] = e,
            c[2] = n,
            c[3] = i,
            c[4] = o,
            c[5] = a,
            c[6] = s,
            c[7] = l,
            c[8] = u,
            c
        }
        ,
        i.set = function(t, e, n, r, i, o, a, s, l, u) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t[4] = o,
            t[5] = a,
            t[6] = s,
            t[7] = l,
            t[8] = u,
            t
        }
        ,
        i.identity = function(t) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.transpose = function(t, e) {
            if (t === e) {
                var n = e[1]
                  , r = e[2]
                  , i = e[5];
                t[1] = e[3],
                t[2] = e[6],
                t[3] = n,
                t[5] = e[7],
                t[6] = r,
                t[7] = i
            } else
                t[0] = e[0],
                t[1] = e[3],
                t[2] = e[6],
                t[3] = e[1],
                t[4] = e[4],
                t[5] = e[7],
                t[6] = e[2],
                t[7] = e[5],
                t[8] = e[8];
            return t
        }
        ,
        i.invert = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = e[6]
              , u = e[7]
              , c = e[8]
              , f = c * a - s * u
              , p = -c * o + s * l
              , h = u * o - a * l
              , d = n * f + r * p + i * h;
            return d ? (d = 1 / d,
            t[0] = f * d,
            t[1] = (-c * r + i * u) * d,
            t[2] = (s * r - i * a) * d,
            t[3] = p * d,
            t[4] = (c * n - i * l) * d,
            t[5] = (-s * n + i * o) * d,
            t[6] = h * d,
            t[7] = (-u * n + r * l) * d,
            t[8] = (a * n - r * o) * d,
            t) : null
        }
        ,
        i.adjoint = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = e[6]
              , u = e[7]
              , c = e[8];
            return t[0] = a * c - s * u,
            t[1] = i * u - r * c,
            t[2] = r * s - i * a,
            t[3] = s * l - o * c,
            t[4] = n * c - i * l,
            t[5] = i * o - n * s,
            t[6] = o * u - a * l,
            t[7] = r * l - n * u,
            t[8] = n * a - r * o,
            t
        }
        ,
        i.determinant = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2]
              , i = t[3]
              , o = t[4]
              , a = t[5]
              , s = t[6]
              , l = t[7]
              , u = t[8];
            return e * (u * o - a * l) + n * (-u * i + a * s) + r * (l * i - o * s)
        }
        ,
        i.multiply = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = e[6]
              , c = e[7]
              , f = e[8]
              , p = n[0]
              , h = n[1]
              , d = n[2]
              , m = n[3]
              , v = n[4]
              , g = n[5]
              , y = n[6]
              , b = n[7]
              , _ = n[8];
            return t[0] = p * r + h * a + d * u,
            t[1] = p * i + h * s + d * c,
            t[2] = p * o + h * l + d * f,
            t[3] = m * r + v * a + g * u,
            t[4] = m * i + v * s + g * c,
            t[5] = m * o + v * l + g * f,
            t[6] = y * r + b * a + _ * u,
            t[7] = y * i + b * s + _ * c,
            t[8] = y * o + b * l + _ * f,
            t
        }
        ,
        i.mul = i.multiply,
        i.translate = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = e[6]
              , c = e[7]
              , f = e[8]
              , p = n[0]
              , h = n[1];
            return t[0] = r,
            t[1] = i,
            t[2] = o,
            t[3] = a,
            t[4] = s,
            t[5] = l,
            t[6] = p * r + h * a + u,
            t[7] = p * i + h * s + c,
            t[8] = p * o + h * l + f,
            t
        }
        ,
        i.rotate = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = e[4]
              , l = e[5]
              , u = e[6]
              , c = e[7]
              , f = e[8]
              , p = Math.sin(n)
              , h = Math.cos(n);
            return t[0] = h * r + p * a,
            t[1] = h * i + p * s,
            t[2] = h * o + p * l,
            t[3] = h * a - p * r,
            t[4] = h * s - p * i,
            t[5] = h * l - p * o,
            t[6] = u,
            t[7] = c,
            t[8] = f,
            t
        }
        ,
        i.scale = function(t, e, n) {
            var r = n[0]
              , i = n[1];
            return t[0] = r * e[0],
            t[1] = r * e[1],
            t[2] = r * e[2],
            t[3] = i * e[3],
            t[4] = i * e[4],
            t[5] = i * e[5],
            t[6] = e[6],
            t[7] = e[7],
            t[8] = e[8],
            t
        }
        ,
        i.fromTranslation = function(t, e) {
            return t[0] = 1,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = 1,
            t[5] = 0,
            t[6] = e[0],
            t[7] = e[1],
            t[8] = 1,
            t
        }
        ,
        i.fromRotation = function(t, e) {
            var n = Math.sin(e)
              , r = Math.cos(e);
            return t[0] = r,
            t[1] = n,
            t[2] = 0,
            t[3] = -n,
            t[4] = r,
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.fromScaling = function(t, e) {
            return t[0] = e[0],
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t[4] = e[1],
            t[5] = 0,
            t[6] = 0,
            t[7] = 0,
            t[8] = 1,
            t
        }
        ,
        i.fromMat2d = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = 0,
            t[3] = e[2],
            t[4] = e[3],
            t[5] = 0,
            t[6] = e[4],
            t[7] = e[5],
            t[8] = 1,
            t
        }
        ,
        i.fromQuat = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = n + n
              , s = r + r
              , l = i + i
              , u = n * a
              , c = r * a
              , f = r * s
              , p = i * a
              , h = i * s
              , d = i * l
              , m = o * a
              , v = o * s
              , g = o * l;
            return t[0] = 1 - f - d,
            t[3] = c - g,
            t[6] = p + v,
            t[1] = c + g,
            t[4] = 1 - u - d,
            t[7] = h - m,
            t[2] = p - v,
            t[5] = h + m,
            t[8] = 1 - u - f,
            t
        }
        ,
        i.normalFromMat4 = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = e[4]
              , s = e[5]
              , l = e[6]
              , u = e[7]
              , c = e[8]
              , f = e[9]
              , p = e[10]
              , h = e[11]
              , d = e[12]
              , m = e[13]
              , v = e[14]
              , g = e[15]
              , y = n * s - r * a
              , b = n * l - i * a
              , _ = n * u - o * a
              , w = r * l - i * s
              , x = r * u - o * s
              , $ = i * u - o * l
              , E = c * m - f * d
              , S = c * v - p * d
              , M = c * g - h * d
              , k = f * v - p * m
              , T = f * g - h * m
              , A = p * g - h * v
              , D = y * A - b * T + _ * k + w * M - x * S + $ * E;
            return D ? (D = 1 / D,
            t[0] = (s * A - l * T + u * k) * D,
            t[1] = (l * M - a * A - u * S) * D,
            t[2] = (a * T - s * M + u * E) * D,
            t[3] = (i * T - r * A - o * k) * D,
            t[4] = (n * A - i * M + o * S) * D,
            t[5] = (r * M - n * T - o * E) * D,
            t[6] = (m * $ - v * x + g * w) * D,
            t[7] = (v * _ - d * $ - g * b) * D,
            t[8] = (d * x - m * _ + g * y) * D,
            t) : null
        }
        ,
        i.str = function(t) {
            return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")"
        }
        ,
        i.frob = function(t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2))
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t[4] = e[4] + n[4],
            t[5] = e[5] + n[5],
            t[6] = e[6] + n[6],
            t[7] = e[7] + n[7],
            t[8] = e[8] + n[8],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t[4] = e[4] - n[4],
            t[5] = e[5] - n[5],
            t[6] = e[6] - n[6],
            t[7] = e[7] - n[7],
            t[8] = e[8] - n[8],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiplyScalar = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t[4] = e[4] * n,
            t[5] = e[5] * n,
            t[6] = e[6] * n,
            t[7] = e[7] * n,
            t[8] = e[8] * n,
            t
        }
        ,
        i.multiplyScalarAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t[4] = e[4] + n[4] * r,
            t[5] = e[5] + n[5] * r,
            t[6] = e[6] + n[6] * r,
            t[7] = e[7] + n[7] * r,
            t[8] = e[8] + n[8] * r,
            t
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = t[3]
              , s = t[4]
              , l = t[5]
              , u = t[6]
              , c = t[7]
              , f = t[8]
              , p = e[0]
              , h = e[1]
              , d = e[2]
              , m = e[3]
              , v = e[4]
              , g = e[5]
              , y = t[6]
              , b = e[7]
              , _ = e[8];
            return Math.abs(n - p) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(p)) && Math.abs(i - h) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(h)) && Math.abs(o - d) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(d)) && Math.abs(a - m) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(m)) && Math.abs(s - v) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(l - g) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(g)) && Math.abs(u - y) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(y)) && Math.abs(c - b) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(b)) && Math.abs(f - _) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(_))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("a1", ["9d", "a0", "a2", "a3"], !0, function(t, e, n) {
        var r = t("9d")
          , i = t("a0")
          , o = t("a2")
          , a = t("a3")
          , s = {};
        return s.create = function() {
            var t = new r.ARRAY_TYPE(4);
            return t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        s.rotationTo = function() {
            var t = o.create()
              , e = o.fromValues(1, 0, 0)
              , n = o.fromValues(0, 1, 0);
            return function(r, i, a) {
                var l = o.dot(i, a);
                return l < -.999999 ? (o.cross(t, e, i),
                o.length(t) < 1e-6 && o.cross(t, n, i),
                o.normalize(t, t),
                s.setAxisAngle(r, t, Math.PI),
                r) : l > .999999 ? (r[0] = 0,
                r[1] = 0,
                r[2] = 0,
                r[3] = 1,
                r) : (o.cross(t, i, a),
                r[0] = t[0],
                r[1] = t[1],
                r[2] = t[2],
                r[3] = 1 + l,
                s.normalize(r, r))
            }
        }(),
        s.setAxes = function() {
            var t = i.create();
            return function(e, n, r, i) {
                return t[0] = r[0],
                t[3] = r[1],
                t[6] = r[2],
                t[1] = i[0],
                t[4] = i[1],
                t[7] = i[2],
                t[2] = -n[0],
                t[5] = -n[1],
                t[8] = -n[2],
                s.normalize(e, s.fromMat3(e, t))
            }
        }(),
        s.clone = a.clone,
        s.fromValues = a.fromValues,
        s.copy = a.copy,
        s.set = a.set,
        s.identity = function(t) {
            return t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t[3] = 1,
            t
        }
        ,
        s.setAxisAngle = function(t, e, n) {
            n = .5 * n;
            var r = Math.sin(n);
            return t[0] = r * e[0],
            t[1] = r * e[1],
            t[2] = r * e[2],
            t[3] = Math.cos(n),
            t
        }
        ,
        s.getAxisAngle = function(t, e) {
            var n = 2 * Math.acos(e[3])
              , r = Math.sin(n / 2);
            return 0 != r ? (t[0] = e[0] / r,
            t[1] = e[1] / r,
            t[2] = e[2] / r) : (t[0] = 1,
            t[1] = 0,
            t[2] = 0),
            n
        }
        ,
        s.add = a.add,
        s.multiply = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = n[0]
              , l = n[1]
              , u = n[2]
              , c = n[3];
            return t[0] = r * c + a * s + i * u - o * l,
            t[1] = i * c + a * l + o * s - r * u,
            t[2] = o * c + a * u + r * l - i * s,
            t[3] = a * c - r * s - i * l - o * u,
            t
        }
        ,
        s.mul = s.multiply,
        s.scale = a.scale,
        s.rotateX = function(t, e, n) {
            n *= .5;
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = Math.sin(n)
              , l = Math.cos(n);
            return t[0] = r * l + a * s,
            t[1] = i * l + o * s,
            t[2] = o * l - i * s,
            t[3] = a * l - r * s,
            t
        }
        ,
        s.rotateY = function(t, e, n) {
            n *= .5;
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = Math.sin(n)
              , l = Math.cos(n);
            return t[0] = r * l - o * s,
            t[1] = i * l + a * s,
            t[2] = o * l + r * s,
            t[3] = a * l - i * s,
            t
        }
        ,
        s.rotateZ = function(t, e, n) {
            n *= .5;
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3]
              , s = Math.sin(n)
              , l = Math.cos(n);
            return t[0] = r * l + i * s,
            t[1] = i * l - r * s,
            t[2] = o * l + a * s,
            t[3] = a * l - o * s,
            t
        }
        ,
        s.calculateW = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2];
            return t[0] = n,
            t[1] = r,
            t[2] = i,
            t[3] = Math.sqrt(Math.abs(1 - n * n - r * r - i * i)),
            t
        }
        ,
        s.dot = a.dot,
        s.lerp = a.lerp,
        s.slerp = function(t, e, n, r) {
            var i, o, a, s, l, u = e[0], c = e[1], f = e[2], p = e[3], h = n[0], d = n[1], m = n[2], v = n[3];
            return o = u * h + c * d + f * m + p * v,
            o < 0 && (o = -o,
            h = -h,
            d = -d,
            m = -m,
            v = -v),
            1 - o > 1e-6 ? (i = Math.acos(o),
            a = Math.sin(i),
            s = Math.sin((1 - r) * i) / a,
            l = Math.sin(r * i) / a) : (s = 1 - r,
            l = r),
            t[0] = s * u + l * h,
            t[1] = s * c + l * d,
            t[2] = s * f + l * m,
            t[3] = s * p + l * v,
            t
        }
        ,
        s.sqlerp = function() {
            var t = s.create()
              , e = s.create();
            return function(n, r, i, o, a, l) {
                return s.slerp(t, r, a, l),
                s.slerp(e, i, o, l),
                s.slerp(n, t, e, 2 * l * (1 - l)),
                n
            }
        }(),
        s.invert = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = n * n + r * r + i * i + o * o
              , s = a ? 1 / a : 0;
            return t[0] = -n * s,
            t[1] = -r * s,
            t[2] = -i * s,
            t[3] = o * s,
            t
        }
        ,
        s.conjugate = function(t, e) {
            return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = e[3],
            t
        }
        ,
        s.length = a.length,
        s.len = s.length,
        s.squaredLength = a.squaredLength,
        s.sqrLen = s.squaredLength,
        s.normalize = a.normalize,
        s.fromMat3 = function(t, e) {
            var n, r = e[0] + e[4] + e[8];
            if (r > 0)
                n = Math.sqrt(r + 1),
                t[3] = .5 * n,
                n = .5 / n,
                t[0] = (e[5] - e[7]) * n,
                t[1] = (e[6] - e[2]) * n,
                t[2] = (e[1] - e[3]) * n;
            else {
                var i = 0;
                e[4] > e[0] && (i = 1),
                e[8] > e[3 * i + i] && (i = 2);
                var o = (i + 1) % 3
                  , a = (i + 2) % 3;
                n = Math.sqrt(e[3 * i + i] - e[3 * o + o] - e[3 * a + a] + 1),
                t[i] = .5 * n,
                n = .5 / n,
                t[3] = (e[3 * o + a] - e[3 * a + o]) * n,
                t[o] = (e[3 * o + i] + e[3 * i + o]) * n,
                t[a] = (e[3 * a + i] + e[3 * i + a]) * n
            }
            return t
        }
        ,
        s.str = function(t) {
            return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        s.exactEquals = a.exactEquals,
        s.equals = a.equals,
        n.exports = s,
        n.exports
    }),
    System.registerDynamic("a4", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(2);
            return t[0] = 0,
            t[1] = 0,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(2);
            return e[0] = t[0],
            e[1] = t[1],
            e
        }
        ,
        i.fromValues = function(t, e) {
            var n = new r.ARRAY_TYPE(2);
            return n[0] = t,
            n[1] = e,
            n
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t
        }
        ,
        i.set = function(t, e, n) {
            return t[0] = e,
            t[1] = n,
            t
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function(t, e, n) {
            return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function(t, e, n) {
            return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function(t, e) {
            return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t
        }
        ,
        i.floor = function(t, e) {
            return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t
        }
        ,
        i.min = function(t, e, n) {
            return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t
        }
        ,
        i.max = function(t, e, n) {
            return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t
        }
        ,
        i.round = function(t, e) {
            return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t
        }
        ,
        i.scale = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t
        }
        ,
        i.scaleAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t
        }
        ,
        i.distance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1];
            return Math.sqrt(n * n + r * r)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1];
            return n * n + r * r
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function(t) {
            var e = t[0]
              , n = t[1];
            return Math.sqrt(e * e + n * n)
        }
        ,
        i.len = i.length,
        i.squaredLength = function(t) {
            var e = t[0]
              , n = t[1];
            return e * e + n * n
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function(t, e) {
            return t[0] = -e[0],
            t[1] = -e[1],
            t
        }
        ,
        i.inverse = function(t, e) {
            return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t
        }
        ,
        i.normalize = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = n * n + r * r;
            return i > 0 && (i = 1 / Math.sqrt(i),
            t[0] = e[0] * i,
            t[1] = e[1] * i),
            t
        }
        ,
        i.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }
        ,
        i.cross = function(t, e, n) {
            var r = e[0] * n[1] - e[1] * n[0];
            return t[0] = t[1] = 0,
            t[2] = r,
            t
        }
        ,
        i.lerp = function(t, e, n, r) {
            var i = e[0]
              , o = e[1];
            return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t
        }
        ,
        i.random = function(t, e) {
            e = e || 1;
            var n = 2 * r.RANDOM() * Math.PI;
            return t[0] = Math.cos(n) * e,
            t[1] = Math.sin(n) * e,
            t
        }
        ,
        i.transformMat2 = function(t, e, n) {
            var r = e[0]
              , i = e[1];
            return t[0] = n[0] * r + n[2] * i,
            t[1] = n[1] * r + n[3] * i,
            t
        }
        ,
        i.transformMat2d = function(t, e, n) {
            var r = e[0]
              , i = e[1];
            return t[0] = n[0] * r + n[2] * i + n[4],
            t[1] = n[1] * r + n[3] * i + n[5],
            t
        }
        ,
        i.transformMat3 = function(t, e, n) {
            var r = e[0]
              , i = e[1];
            return t[0] = n[0] * r + n[3] * i + n[6],
            t[1] = n[1] * r + n[4] * i + n[7],
            t
        }
        ,
        i.transformMat4 = function(t, e, n) {
            var r = e[0]
              , i = e[1];
            return t[0] = n[0] * r + n[4] * i + n[12],
            t[1] = n[1] * r + n[5] * i + n[13],
            t
        }
        ,
        i.forEach = function() {
            var t = i.create();
            return function(e, n, r, i, o, a) {
                var s, l;
                for (n || (n = 2),
                r || (r = 0),
                l = i ? Math.min(i * n + r, e.length) : e.length,
                s = r; s < l; s += n)
                    t[0] = e[s],
                    t[1] = e[s + 1],
                    o(t, t, a),
                    e[s] = t[0],
                    e[s + 1] = t[1];
                return e
            }
        }(),
        i.str = function(t) {
            return "vec2(" + t[0] + ", " + t[1] + ")"
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = e[0]
              , a = e[1];
            return Math.abs(n - o) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - a) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(a))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("a2", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(3);
            return t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(3);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e
        }
        ,
        i.fromValues = function(t, e, n) {
            var i = new r.ARRAY_TYPE(3);
            return i[0] = t,
            i[1] = e,
            i[2] = n,
            i
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t
        }
        ,
        i.set = function(t, e, n, r) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function(t, e, n) {
            return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t[2] = e[2] * n[2],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function(t, e, n) {
            return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t[2] = e[2] / n[2],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function(t, e) {
            return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t[2] = Math.ceil(e[2]),
            t
        }
        ,
        i.floor = function(t, e) {
            return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t[2] = Math.floor(e[2]),
            t
        }
        ,
        i.min = function(t, e, n) {
            return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t[2] = Math.min(e[2], n[2]),
            t
        }
        ,
        i.max = function(t, e, n) {
            return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t[2] = Math.max(e[2], n[2]),
            t
        }
        ,
        i.round = function(t, e) {
            return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t[2] = Math.round(e[2]),
            t
        }
        ,
        i.scale = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t
        }
        ,
        i.scaleAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t
        }
        ,
        i.distance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1]
              , i = e[2] - t[2];
            return Math.sqrt(n * n + r * r + i * i)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1]
              , i = e[2] - t[2];
            return n * n + r * r + i * i
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2];
            return Math.sqrt(e * e + n * n + r * r)
        }
        ,
        i.len = i.length,
        i.squaredLength = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2];
            return e * e + n * n + r * r
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function(t, e) {
            return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t
        }
        ,
        i.inverse = function(t, e) {
            return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t[2] = 1 / e[2],
            t
        }
        ,
        i.normalize = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = n * n + r * r + i * i;
            return o > 0 && (o = 1 / Math.sqrt(o),
            t[0] = e[0] * o,
            t[1] = e[1] * o,
            t[2] = e[2] * o),
            t
        }
        ,
        i.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }
        ,
        i.cross = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = n[0]
              , s = n[1]
              , l = n[2];
            return t[0] = i * l - o * s,
            t[1] = o * a - r * l,
            t[2] = r * s - i * a,
            t
        }
        ,
        i.lerp = function(t, e, n, r) {
            var i = e[0]
              , o = e[1]
              , a = e[2];
            return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t[2] = a + r * (n[2] - a),
            t
        }
        ,
        i.hermite = function(t, e, n, r, i, o) {
            var a = o * o
              , s = a * (2 * o - 3) + 1
              , l = a * (o - 2) + o
              , u = a * (o - 1)
              , c = a * (3 - 2 * o);
            return t[0] = e[0] * s + n[0] * l + r[0] * u + i[0] * c,
            t[1] = e[1] * s + n[1] * l + r[1] * u + i[1] * c,
            t[2] = e[2] * s + n[2] * l + r[2] * u + i[2] * c,
            t
        }
        ,
        i.bezier = function(t, e, n, r, i, o) {
            var a = 1 - o
              , s = a * a
              , l = o * o
              , u = s * a
              , c = 3 * o * s
              , f = 3 * l * a
              , p = l * o;
            return t[0] = e[0] * u + n[0] * c + r[0] * f + i[0] * p,
            t[1] = e[1] * u + n[1] * c + r[1] * f + i[1] * p,
            t[2] = e[2] * u + n[2] * c + r[2] * f + i[2] * p,
            t
        }
        ,
        i.random = function(t, e) {
            e = e || 1;
            var n = 2 * r.RANDOM() * Math.PI
              , i = 2 * r.RANDOM() - 1
              , o = Math.sqrt(1 - i * i) * e;
            return t[0] = Math.cos(n) * o,
            t[1] = Math.sin(n) * o,
            t[2] = i * e,
            t
        }
        ,
        i.transformMat4 = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = n[3] * r + n[7] * i + n[11] * o + n[15];
            return a = a || 1,
            t[0] = (n[0] * r + n[4] * i + n[8] * o + n[12]) / a,
            t[1] = (n[1] * r + n[5] * i + n[9] * o + n[13]) / a,
            t[2] = (n[2] * r + n[6] * i + n[10] * o + n[14]) / a,
            t
        }
        ,
        i.transformMat3 = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2];
            return t[0] = r * n[0] + i * n[3] + o * n[6],
            t[1] = r * n[1] + i * n[4] + o * n[7],
            t[2] = r * n[2] + i * n[5] + o * n[8],
            t
        }
        ,
        i.transformQuat = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = n[0]
              , s = n[1]
              , l = n[2]
              , u = n[3]
              , c = u * r + s * o - l * i
              , f = u * i + l * r - a * o
              , p = u * o + a * i - s * r
              , h = -a * r - s * i - l * o;
            return t[0] = c * u + h * -a + f * -l - p * -s,
            t[1] = f * u + h * -s + p * -a - c * -l,
            t[2] = p * u + h * -l + c * -s - f * -a,
            t
        }
        ,
        i.rotateX = function(t, e, n, r) {
            var i = []
              , o = [];
            return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[0],
            o[1] = i[1] * Math.cos(r) - i[2] * Math.sin(r),
            o[2] = i[1] * Math.sin(r) + i[2] * Math.cos(r),
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.rotateY = function(t, e, n, r) {
            var i = []
              , o = [];
            return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[2] * Math.sin(r) + i[0] * Math.cos(r),
            o[1] = i[1],
            o[2] = i[2] * Math.cos(r) - i[0] * Math.sin(r),
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.rotateZ = function(t, e, n, r) {
            var i = []
              , o = [];
            return i[0] = e[0] - n[0],
            i[1] = e[1] - n[1],
            i[2] = e[2] - n[2],
            o[0] = i[0] * Math.cos(r) - i[1] * Math.sin(r),
            o[1] = i[0] * Math.sin(r) + i[1] * Math.cos(r),
            o[2] = i[2],
            t[0] = o[0] + n[0],
            t[1] = o[1] + n[1],
            t[2] = o[2] + n[2],
            t
        }
        ,
        i.forEach = function() {
            var t = i.create();
            return function(e, n, r, i, o, a) {
                var s, l;
                for (n || (n = 3),
                r || (r = 0),
                l = i ? Math.min(i * n + r, e.length) : e.length,
                s = r; s < l; s += n)
                    t[0] = e[s],
                    t[1] = e[s + 1],
                    t[2] = e[s + 2],
                    o(t, t, a),
                    e[s] = t[0],
                    e[s + 1] = t[1],
                    e[s + 2] = t[2];
                return e
            }
        }(),
        i.angle = function(t, e) {
            var n = i.fromValues(t[0], t[1], t[2])
              , r = i.fromValues(e[0], e[1], e[2]);
            i.normalize(n, n),
            i.normalize(r, r);
            var o = i.dot(n, r);
            return o > 1 ? 0 : Math.acos(o)
        }
        ,
        i.str = function(t) {
            return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = e[0]
              , s = e[1]
              , l = e[2];
            return Math.abs(n - a) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(a)) && Math.abs(i - s) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("9d", [], !0, function(t, e, n) {
        var r = {};
        r.EPSILON = 1e-6,
        r.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array,
        r.RANDOM = Math.random,
        r.ENABLE_SIMD = !1,
        r.SIMD_AVAILABLE = r.ARRAY_TYPE === Float32Array && "SIMD"in this,
        r.USE_SIMD = r.ENABLE_SIMD && r.SIMD_AVAILABLE,
        r.setMatrixArrayType = function(t) {
            r.ARRAY_TYPE = t
        }
        ;
        var i = Math.PI / 180;
        return r.toRadian = function(t) {
            return t * i
        }
        ,
        r.equals = function(t, e) {
            return Math.abs(t - e) <= r.EPSILON * Math.max(1, Math.abs(t), Math.abs(e))
        }
        ,
        n.exports = r,
        n.exports
    }),
    System.registerDynamic("a3", ["9d"], !0, function(t, e, n) {
        var r = t("9d")
          , i = {};
        return i.create = function() {
            var t = new r.ARRAY_TYPE(4);
            return t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            t[3] = 0,
            t
        }
        ,
        i.clone = function(t) {
            var e = new r.ARRAY_TYPE(4);
            return e[0] = t[0],
            e[1] = t[1],
            e[2] = t[2],
            e[3] = t[3],
            e
        }
        ,
        i.fromValues = function(t, e, n, i) {
            var o = new r.ARRAY_TYPE(4);
            return o[0] = t,
            o[1] = e,
            o[2] = n,
            o[3] = i,
            o
        }
        ,
        i.copy = function(t, e) {
            return t[0] = e[0],
            t[1] = e[1],
            t[2] = e[2],
            t[3] = e[3],
            t
        }
        ,
        i.set = function(t, e, n, r, i) {
            return t[0] = e,
            t[1] = n,
            t[2] = r,
            t[3] = i,
            t
        }
        ,
        i.add = function(t, e, n) {
            return t[0] = e[0] + n[0],
            t[1] = e[1] + n[1],
            t[2] = e[2] + n[2],
            t[3] = e[3] + n[3],
            t
        }
        ,
        i.subtract = function(t, e, n) {
            return t[0] = e[0] - n[0],
            t[1] = e[1] - n[1],
            t[2] = e[2] - n[2],
            t[3] = e[3] - n[3],
            t
        }
        ,
        i.sub = i.subtract,
        i.multiply = function(t, e, n) {
            return t[0] = e[0] * n[0],
            t[1] = e[1] * n[1],
            t[2] = e[2] * n[2],
            t[3] = e[3] * n[3],
            t
        }
        ,
        i.mul = i.multiply,
        i.divide = function(t, e, n) {
            return t[0] = e[0] / n[0],
            t[1] = e[1] / n[1],
            t[2] = e[2] / n[2],
            t[3] = e[3] / n[3],
            t
        }
        ,
        i.div = i.divide,
        i.ceil = function(t, e) {
            return t[0] = Math.ceil(e[0]),
            t[1] = Math.ceil(e[1]),
            t[2] = Math.ceil(e[2]),
            t[3] = Math.ceil(e[3]),
            t
        }
        ,
        i.floor = function(t, e) {
            return t[0] = Math.floor(e[0]),
            t[1] = Math.floor(e[1]),
            t[2] = Math.floor(e[2]),
            t[3] = Math.floor(e[3]),
            t
        }
        ,
        i.min = function(t, e, n) {
            return t[0] = Math.min(e[0], n[0]),
            t[1] = Math.min(e[1], n[1]),
            t[2] = Math.min(e[2], n[2]),
            t[3] = Math.min(e[3], n[3]),
            t
        }
        ,
        i.max = function(t, e, n) {
            return t[0] = Math.max(e[0], n[0]),
            t[1] = Math.max(e[1], n[1]),
            t[2] = Math.max(e[2], n[2]),
            t[3] = Math.max(e[3], n[3]),
            t
        }
        ,
        i.round = function(t, e) {
            return t[0] = Math.round(e[0]),
            t[1] = Math.round(e[1]),
            t[2] = Math.round(e[2]),
            t[3] = Math.round(e[3]),
            t
        }
        ,
        i.scale = function(t, e, n) {
            return t[0] = e[0] * n,
            t[1] = e[1] * n,
            t[2] = e[2] * n,
            t[3] = e[3] * n,
            t
        }
        ,
        i.scaleAndAdd = function(t, e, n, r) {
            return t[0] = e[0] + n[0] * r,
            t[1] = e[1] + n[1] * r,
            t[2] = e[2] + n[2] * r,
            t[3] = e[3] + n[3] * r,
            t
        }
        ,
        i.distance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1]
              , i = e[2] - t[2]
              , o = e[3] - t[3];
            return Math.sqrt(n * n + r * r + i * i + o * o)
        }
        ,
        i.dist = i.distance,
        i.squaredDistance = function(t, e) {
            var n = e[0] - t[0]
              , r = e[1] - t[1]
              , i = e[2] - t[2]
              , o = e[3] - t[3];
            return n * n + r * r + i * i + o * o
        }
        ,
        i.sqrDist = i.squaredDistance,
        i.length = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2]
              , i = t[3];
            return Math.sqrt(e * e + n * n + r * r + i * i)
        }
        ,
        i.len = i.length,
        i.squaredLength = function(t) {
            var e = t[0]
              , n = t[1]
              , r = t[2]
              , i = t[3];
            return e * e + n * n + r * r + i * i
        }
        ,
        i.sqrLen = i.squaredLength,
        i.negate = function(t, e) {
            return t[0] = -e[0],
            t[1] = -e[1],
            t[2] = -e[2],
            t[3] = -e[3],
            t
        }
        ,
        i.inverse = function(t, e) {
            return t[0] = 1 / e[0],
            t[1] = 1 / e[1],
            t[2] = 1 / e[2],
            t[3] = 1 / e[3],
            t
        }
        ,
        i.normalize = function(t, e) {
            var n = e[0]
              , r = e[1]
              , i = e[2]
              , o = e[3]
              , a = n * n + r * r + i * i + o * o;
            return a > 0 && (a = 1 / Math.sqrt(a),
            t[0] = n * a,
            t[1] = r * a,
            t[2] = i * a,
            t[3] = o * a),
            t
        }
        ,
        i.dot = function(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
        }
        ,
        i.lerp = function(t, e, n, r) {
            var i = e[0]
              , o = e[1]
              , a = e[2]
              , s = e[3];
            return t[0] = i + r * (n[0] - i),
            t[1] = o + r * (n[1] - o),
            t[2] = a + r * (n[2] - a),
            t[3] = s + r * (n[3] - s),
            t
        }
        ,
        i.random = function(t, e) {
            return e = e || 1,
            t[0] = r.RANDOM(),
            t[1] = r.RANDOM(),
            t[2] = r.RANDOM(),
            t[3] = r.RANDOM(),
            i.normalize(t, t),
            i.scale(t, t, e),
            t
        }
        ,
        i.transformMat4 = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = e[3];
            return t[0] = n[0] * r + n[4] * i + n[8] * o + n[12] * a,
            t[1] = n[1] * r + n[5] * i + n[9] * o + n[13] * a,
            t[2] = n[2] * r + n[6] * i + n[10] * o + n[14] * a,
            t[3] = n[3] * r + n[7] * i + n[11] * o + n[15] * a,
            t
        }
        ,
        i.transformQuat = function(t, e, n) {
            var r = e[0]
              , i = e[1]
              , o = e[2]
              , a = n[0]
              , s = n[1]
              , l = n[2]
              , u = n[3]
              , c = u * r + s * o - l * i
              , f = u * i + l * r - a * o
              , p = u * o + a * i - s * r
              , h = -a * r - s * i - l * o;
            return t[0] = c * u + h * -a + f * -l - p * -s,
            t[1] = f * u + h * -s + p * -a - c * -l,
            t[2] = p * u + h * -l + c * -s - f * -a,
            t[3] = e[3],
            t
        }
        ,
        i.forEach = function() {
            var t = i.create();
            return function(e, n, r, i, o, a) {
                var s, l;
                for (n || (n = 4),
                r || (r = 0),
                l = i ? Math.min(i * n + r, e.length) : e.length,
                s = r; s < l; s += n)
                    t[0] = e[s],
                    t[1] = e[s + 1],
                    t[2] = e[s + 2],
                    t[3] = e[s + 3],
                    o(t, t, a),
                    e[s] = t[0],
                    e[s + 1] = t[1],
                    e[s + 2] = t[2],
                    e[s + 3] = t[3];
                return e
            }
        }(),
        i.str = function(t) {
            return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }
        ,
        i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }
        ,
        i.equals = function(t, e) {
            var n = t[0]
              , i = t[1]
              , o = t[2]
              , a = t[3]
              , s = e[0]
              , l = e[1]
              , u = e[2]
              , c = e[3];
            return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - l) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(o - u) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(u)) && Math.abs(a - c) <= r.EPSILON * Math.max(1, Math.abs(a), Math.abs(c))
        }
        ,
        n.exports = i,
        n.exports
    }),
    System.registerDynamic("a5", ["9d", "9c", "9e", "a0", "9f", "a1", "a4", "a2", "a3"], !0, function(t, e, n) {
        return e.glMatrix = t("9d"),
        e.mat2 = t("9c"),
        e.mat2d = t("9e"),
        e.mat3 = t("a0"),
        e.mat4 = t("9f"),
        e.quat = t("a1"),
        e.vec2 = t("a4"),
        e.vec3 = t("a2"),
        e.vec4 = t("a3"),
        n.exports
    }),
    System.registerDynamic("48", ["a5"], !0, function(t, e, n) {
        return n.exports = t("a5"),
        n.exports
    }),
    System.registerDynamic("a6", ["9b", "48"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            var e = {
                alpha: !1,
                premultipliedAlpha: !1
            }
              , n = t.getContext("webgl", e) || t.getContext("experimental-webgl", e);
            if (!n)
                throw new Error("Failed to create WebGL context");
            return n
        }
        function i(t, e, n, r, i, o) {
            return void 0 === r && (r = 1),
            void 0 === i && (i = 0),
            void 0 === o && (o = 0),
            s.mat4.identity(t),
            s.mat4.translate(t, t, s.vec3.fromValues(-1, 1, 0)),
            s.mat4.scale(t, t, s.vec3.fromValues(2 / e, -2 / n, 1)),
            s.mat4.scale(t, t, s.vec3.fromValues(r, r, 1)),
            s.mat4.translate(t, t, s.vec3.fromValues(i, o, 0)),
            t
        }
        function o(t) {
            return a(t, "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tattribute vec2 position;\n\t\tattribute vec2 texcoords;\n\t\tattribute vec4 vertexColor;\n\n\t\tuniform mat4 transform;\n\t\tuniform vec4 lighting;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\ttextureCoord = texcoords;\n\t\t\tvColor = vertexColor * lighting;\n\t\t\tgl_Position = transform * vec4(position, 0, 1);\n\t\t}\n\t", "\n\t\t#ifdef GL_ES\n\t\tprecision mediump float;\n\t\t#endif\n\n\t\tuniform sampler2D sampler1;\n\n\t\tvarying vec2 textureCoord;\n\t\tvarying vec4 vColor;\n\n\t\tvoid main() {\n\t\t\tgl_FragColor = texture2D(sampler1, vec2(textureCoord.x, textureCoord.y)) * vColor;\n\t\t}\n\t")
        }
        var a = t("9b")
          , s = t("48");
        return e.getWebGLContext = r,
        e.createViewMatrix = i,
        e.createSpriteShader = o,
        n.exports
    }),
    System.registerDynamic("42", ["22"], !0, function(t, e, n) {
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
        var a = t("22");
        return e.resizeCanvas = r,
        e.resizeCanvasToElementSize = i,
        e.createOrResizeCanvas = o,
        n.exports
    }),
    System.registerDynamic("rollbar config", [], !0, function(t, e, n) {
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
    }),
    System.registerDynamic("a8", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t.target && /^(input|textarea|select)$/i.test(t.target.tagName)
        }
        var i = function() {
            function t(t) {
                this.manager = t
            }
            return t.prototype.initialize = function() {
                var t = this;
                this.initialized || (this.initialized = !0,
                window.addEventListener("keydown", function(e) {
                    !r(e) && t.manager.setValue(e.keyCode, 1) && (e.preventDefault(),
                    e.stopPropagation())
                }),
                window.addEventListener("keyup", function(e) {
                    t.manager.setValue(e.keyCode, 0) && (e.preventDefault(),
                    e.stopPropagation())
                }),
                window.addEventListener("blur", function(e) {
                    t.manager.clear()
                }))
            }
            ,
            t.prototype.update = function() {}
            ,
            t.prototype.draw = function() {}
            ,
            t
        }();
        return e.KeyboardController = i,
        n.exports
    }),
    System.registerDynamic("a9", [], !0, function(t, e, n) {
        "use strict";
        var r = [1002, 1004, 1003]
          , i = function() {
            function t(t) {
                this.manager = t
            }
            return t.prototype.initialize = function() {
                var t = this;
                if (!this.initialized) {
                    this.initialized = !0;
                    var e = document.getElementById("canvas");
                    e.addEventListener("mousemove", function(e) {
                        t.manager.setValue(1e3, Math.floor(e.clientX)),
                        t.manager.setValue(1001, Math.floor(e.clientY))
                    }),
                    e.addEventListener("mousedown", function(e) {
                        t.manager.setValue(r[e.button], 1)
                    }),
                    e.addEventListener("mouseup", function(e) {
                        t.manager.setValue(r[e.button], 0)
                    }),
                    e.addEventListener("contextmenu", function(t) {
                        t.preventDefault(),
                        t.stopPropagation()
                    }),
                    window.addEventListener("blur", function() {
                        t.manager.setValue(1002, 0)
                    })
                }
            }
            ,
            t.prototype.update = function() {}
            ,
            t.prototype.draw = function() {}
            ,
            t
        }();
        return e.MouseController = i,
        n.exports
    }),
    System.registerDynamic("aa", ["22"], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            for (var n = 0; n < t.changedTouches.length; ++n) {
                var r = t.changedTouches.item(n);
                if (r.identifier === e)
                    return r
            }
            return null
        }
        var i = t("22")
          , o = function() {
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
            return t.prototype.initialize = function() {
                var t = this;
                if (!this.initialized) {
                    this.initialized = !0,
                    this.origin = document.getElementById("touch-origin"),
                    this.position = document.getElementById("touch-position");
                    var e = document.getElementById("canvas");
                    e.addEventListener("touchstart", function(e) {
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
                    e.addEventListener("touchmove", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        var n = r(e, t.touchId);
                        n && (t.touchCurrent = {
                            x: n.clientX,
                            y: n.clientY
                        },
                        t.updateInput())
                    }),
                    e.addEventListener("touchend", function(e) {
                        e.preventDefault(),
                        e.stopPropagation();
                        var n = r(e, t.touchId);
                        n && (t.touchIsDrag || (t.manager.setValue(1e3, t.touchStart.x),
                        t.manager.setValue(1001, t.touchStart.y),
                        t.manager.setValue(1002, 1)),
                        t.resetTouch())
                    }),
                    window.addEventListener("blur", function() {
                        return t.resetTouch()
                    })
                }
            }
            ,
            t.prototype.update = function() {}
            ,
            t.prototype.draw = function() {
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
            t.prototype.resetTouch = function() {
                this.touchId = -1,
                this.touchStart = this.touchCurrent = {
                    x: 0,
                    y: 0
                },
                this.touchIsDrag = !1,
                this.updateInput()
            }
            ,
            t.prototype.updateInput = function() {
                var t = this.touchStart.y - this.touchCurrent.y
                  , e = this.touchStart.x - this.touchCurrent.x
                  , n = Math.atan2(t, e)
                  , r = Math.sqrt(t * t + e * e);
                r > 20 ? (this.touchIsDrag = !0,
                this.manager.setValue(2e3, -Math.cos(n)),
                this.manager.setValue(2001, -Math.sin(n))) : (this.manager.setValue(2e3, 0),
                this.manager.setValue(2001, 0))
            }
            ,
            t
        }();
        return e.TouchController = o,
        n.exports
    }),
    System.registerDynamic("ab", ["<lodash core passthrough>"], !0, function(t, e, n) {
        "use strict";
        var r = t("<lodash core passthrough>")
          , i = .2
          , o = function() {
            function t(t) {
                this.manager = t
            }
            return t.prototype.initialize = function() {
                var t = this;
                this.initialized || (this.initialized = !0,
                this.scanGamepads(),
                window.addEventListener("gamepadconnected", function(e) {
                    t.scanGamepads()
                }),
                window.addEventListener("gamepaddisconnected", function(e) {
                    t.gamepad = null
                }))
            }
            ,
            t.prototype.update = function() {
                var t = this.gamepad;
                if (t) {
                    var e = "(null) (null) (Vendor: 045e Product: 0289)" === t.id
                      , n = e ? 4 : 3;
                    this.manager.setValue(2e3, Math.abs(t.axes[0]) > i ? t.axes[0] : 0),
                    this.manager.setValue(2001, Math.abs(t.axes[1]) > i ? t.axes[1] : 0),
                    this.manager.setValue(3003, t.buttons[n].pressed ? 1 : 0)
                }
            }
            ,
            t.prototype.draw = function() {}
            ,
            t.prototype.scanGamepads = function() {
                this.gamepad = r.find(navigator.getGamepads(), function(t) {
                    return !!t
                })
            }
            ,
            t
        }();
        return e.GamePadController = o,
        n.exports
    }),
    System.registerDynamic("ac", ["<lodash core passthrough>", "a8", "a9", "aa", "ab"], !0, function(t, e, n) {
        "use strict";
        var r = t("<lodash core passthrough>")
          , i = t("a8")
          , o = t("a9")
          , a = t("aa")
          , s = t("ab")
          , l = function() {
            function t() {
                this.inputs = [],
                this.actions = []
            }
            return Object.defineProperty(t.prototype, "axisX", {
                get: function() {
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
                get: function() {
                    var t = this.getRange(2001)
                      , e = this.getState(38, 87, 3012)
                      , n = this.getState(40, 83, 3013)
                      , i = t + (e ? -1 : n ? 1 : 0);
                    return r.clamp(i, -1, 1)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.initialize = function() {
                this.controllers = [new i.KeyboardController(this), new o.MouseController(this), new a.TouchController(this), new s.GamePadController(this)],
                this.controllers.forEach(function(t) {
                    return t.initialize()
                })
            }
            ,
            t.prototype.update = function() {
                this.controllers.forEach(function(t) {
                    return t.update()
                })
            }
            ,
            t.prototype.draw = function() {
                this.controllers.forEach(function(t) {
                    return t.draw()
                })
            }
            ,
            t.prototype.onPressed = function(t, e) {
                this.onAction(t, function(t, n) {
                    1 === n && e()
                })
            }
            ,
            t.prototype.onReleased = function(t, e) {
                this.onAction(t, function(t, n) {
                    0 === n && e()
                })
            }
            ,
            t.prototype.isPressed = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e - 0] = arguments[e];
                return this.getState.apply(this, t)
            }
            ,
            t.prototype.onAction = function(t, e) {
                var n = this
                  , r = Array.isArray(t) ? t : [t];
                r.forEach(function(t) {
                    n.actions[t] || (n.actions[t] = []),
                    n.actions[t].push(e)
                })
            }
            ,
            t.prototype.getAction = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                    e[n - 0] = arguments[n];
                return e.reduce(function(e, n) {
                    var r = !!t.inputs[n];
                    return t.inputs[n] = 0,
                    e || r
                }, !1)
            }
            ,
            t.prototype.getState = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                    e[n - 0] = arguments[n];
                return e.some(function(e) {
                    return !!t.inputs[e]
                })
            }
            ,
            t.prototype.getRange = function() {
                for (var t = this, e = [], n = 0; n < arguments.length; n++)
                    e[n - 0] = arguments[n];
                return e.reduce(function(e, n) {
                    return e + (t.inputs[n] || 0)
                }, 0)
            }
            ,
            t.prototype.setValue = function(t, e) {
                return !((this.inputs[t] || 0) === e || (this.inputs[t] = e,
                !this.actions[t])) && (this.actions[t].forEach(function(n) {
                    return n(t, e)
                }),
                !0)
            }
            ,
            t.prototype.clear = function() {
                this.inputs = []
            }
            ,
            t
        }();
        return e.InputManager = l,
        n.exports
    }),
    System.registerDynamic("ad", ["<lodash core passthrough>", "35", "24"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            for (var e = t % d, n = 24 * e / d, r = 1; r < h.length; r++)
                if (h[r] >= n) {
                    var i = h[r - 1]
                      , o = h[r]
                      , l = p[r - 1]
                      , u = p[r];
                    return a.default.lerp(l, u, (n - i) / (o - i))
                }
            return s.WHITE
        }
        function i(t) {
            var e = t % d
              , n = 1440
              , r = e * n / d
              , i = r % 60
              , a = Math.floor(r / 60);
            return o.padStart(a.toFixed(), 2, "0") + ":" + o.padStart(i.toFixed(), 2, "0")
        }
        var o = t("<lodash core passthrough>")
          , a = t("35")
          , s = t("24")
          , l = "ffffff"
          , u = "d4ab64"
          , c = "3e489e"
          , f = "cfcc7e"
          , p = [c, c, f, l, l, u, c, c].map(a.default.parse)
          , h = [0, 4, 4.75, 5.5, 18.5, 19.25, 20, 24]
          , d = 288e4;
        return e.getLight = r,
        e.getTime = i,
        n.exports
    }),
    System.registerDynamic("ae", ["48", "22", "21", "2b", "2c", "49", "24", "54", "56", "57", "74", "a6", "20", "3b", "42", "rollbar config", "ponytownapp settings", "ac", "ad"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return 2 === t ? f.ADMIN_COLOR : 1 === t ? f.SYSTEM_COLOR : f.WHITE
        }
        function i(t) {
            t.player && t.player.tes && t.player.tes()
        }
        var o = t("48")
          , a = t("22")
          , s = t("21")
          , l = t("2b")
          , u = t("2c")
          , c = t("49")
          , f = t("24")
          , p = t("54")
          , h = t("56")
          , d = t("57")
          , m = t("74")
          , v = t("a6")
          , g = t("20")
          , y = t("3b")
          , b = t("42")
          , _ = t("rollbar config")
          , w = t("ponytownapp settings")
          , x = t("ac")
          , $ = t("ad")
          , E = function() {
            function t() {
                this.map = new u.Map(0,0),
                this.scale = a.getPixelRatio() > 1 ? 3 : 2,
                this.baseTime = 0,
                this.camera = new c.Camera,
                this.failedToCreateWebGL = !1,
                this.input = new x.InputManager,
                this.timeSize = 0,
                this.lastStats = 0,
                this.sent = 0,
                this.recv = 0,
                this.textJump = 0,
                this.hideText = !1,
                this.viewMatrix = o.mat4.create(),
                this.initialized = !1
            }
            return t.prototype.changeScale = function() {
                this.scale = this.scale % 4 + 1
            }
            ,
            t.prototype.load = function() {
                return this.loadPromise || (this.loadPromise = y.loadSpriteSheets(g.spriteSheets, "/images/"))
            }
            ,
            t.prototype.init = function() {
                var t = this;
                if (!this.initialized && (this.initialized = !0,
                this.canvas = document.getElementById("canvas"),
                this.stats = document.getElementById("stats"),
                this.clock = document.getElementById("clock"),
                this.input.initialize(),
                this.input.onReleased([80, 3003], function() {
                    return t.changeScale()
                }),
                this.input.onPressed(13, function() {
                    return t.onChat()
                }),
                this.input.onPressed(27, function() {
                    return t.onCancel()
                }),
                this.input.onPressed(191, function() {
                    return t.onCommand()
                }),
                this.input.onPressed(113, function() {
                    return t.hideText = !t.hideText
                }),
                this.resizeCanvas(),
                window.addEventListener("resize", function() {
                    return t.resizeCanvas()
                }),
                !this.gl)) {
                    this.gl = v.getWebGLContext(this.canvas),
                    this.spriteShader = v.createSpriteShader(this.gl),
                    this.spriteBatch = new p.SpriteBatch(this.gl),
                    m.createTexturesForSpriteSheets(this.gl, g.spriteSheets),
                    this.spriteBatch.rectSprite = g.pixel,
                    this.button = new h.SpriteButton(g.bubble,2,2,2,2),
                    this.font = new d.SpriteFont(g.font),
                    this.font.addEmoticon(":apple:", "🍎", g.apple.color),
                    this.font.addEmoticon(":heart:", "❤", g.heartemote),
                    this.font.addEmoticon(":pumpkin:", "🎃", g.pumpkinemote),
                    this.font.addEmoticon(":pizza:", "🍕", g.pizzaemote),
                    this.font.addEmoticon(":rock:", "⽯", g.rockemote),
                    this.font.addEmoticon(":face:", "ツ"),
                    this.font.addEmoticon(":derp:", "シ");
                    var e = 0 | this.gl.getParameter(this.gl.MAX_VERTEX_ATTRIBS);
                    w.account ? _.configureUser({
                        id: w.account.id,
                        username: w.account.name,
                        custom: {
                            attribs: e
                        }
                    }) : _.configureUser({
                        id: "unknown",
                        username: "unknown",
                        custom: {
                            attribs: e
                        }
                    })
                }
            }
            ,
            t.prototype.release = function() {
                this.socket && (this.socket.disconnect(),
                this.socket = null )
            }
            ,
            t.prototype.update = function(t) {
                if (this.socket && this.socket.isConnected) {
                    var e = this.camera
                      , n = this.player
                      , r = this.map;
                    if (i(this),
                    this.input.update(),
                    e.w = Math.round(this.canvas.width / this.scale),
                    e.h = Math.round(this.canvas.height / this.scale),
                    n && r) {
                        var o = this.input.axisX
                          , l = this.input.axisY
                          , u = a.length(o, l)
                          , c = u < .5 || this.input.isPressed(16)
                          , f = a.vectorToDir(o, l)
                          , p = o || l ? a.dirToVector(f) : {
                            x: 0,
                            y: 0
                        }
                          , h = o || l ? c ? 1 : 2 : 0
                          , d = a.flagsToSpeed(h)
                          , m = p.x * d
                          , v = p.y * d;
                        if (n.vx !== m || n.vy !== v) {
                            var g = a.encodeMovement(n.x, n.y, f, h)
                              , y = g[0]
                              , b = g[1];
                            this.socket.server.update(y, b)
                        }
                        if (n.vx = m,
                        n.vy = v,
                        e.update(n, r),
                        this.input.getAction(1002)) {
                            var _ = this.scale / a.getPixelRatio()
                              , w = e.screenToWorld({
                                x: this.input.getRange(1e3) / _,
                                y: this.input.getRange(1001) / _
                            })
                              , x = r.pickEntity(w);
                            x ? this.socket.server.interact(x.id) : this.socket.server.changeTile(0 | w.x, 0 | w.y)
                        }
                        r.update(t);
                        var $ = n.x * s.tileWidth
                          , E = n.y * s.tileHeight;
                        r.forEachEntity(function(t) {
                            t.coverBounds && (t.coverLifted = a.containsPoint(t.x * s.tileWidth, t.y * s.tileHeight, t.coverBounds, $, E))
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
            t.prototype.draw = function(t) {
                var e = this;
                if (this.gl) {
                    var n = this.gl
                      , r = Math.round(this.scale)
                      , i = $.getLight(this.getTime());
                    if (n.viewport(0, 0, n.canvas.width, n.canvas.height),
                    n.clearColor(f.BG_COLOR.floatR, f.BG_COLOR.floatG, f.BG_COLOR.floatB, 1),
                    n.clear(n.COLOR_BUFFER_BIT),
                    n.disable(n.DEPTH_TEST),
                    n.enable(n.BLEND),
                    n.blendEquation(n.FUNC_ADD),
                    n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA),
                    v.createViewMatrix(this.viewMatrix, this.canvas.width, this.canvas.height, r, -this.camera.x, -this.camera.y),
                    this.spriteBatch.begin(this.spriteShader),
                    this.spriteShader.uniforms.transform = this.viewMatrix,
                    this.spriteShader.uniforms.lighting = i.toFloatArray(),
                    this.map && this.map.draw(this.spriteBatch, this.camera),
                    this.spriteBatch.end(),
                    this.spriteBatch.begin(this.spriteShader),
                    this.spriteShader.uniforms.transform = v.createViewMatrix(this.viewMatrix, this.canvas.width, this.canvas.height, r),
                    this.spriteShader.uniforms.lighting = [1, 1, 1, 1],
                    !this.hideText) {
                        var o = this.scale / a.getPixelRatio()
                          , s = this.camera.screenToWorld({
                            x: this.input.getRange(1e3) / o,
                            y: this.input.getRange(1001) / o
                        });
                        this.map.forEachRegion(function(t) {
                            t.entities.forEach(function(t) {
                                if (t !== e.player && t.name && t.bounds && a.contains(t.x, t.y, t.bounds, s)) {
                                    var n = e.camera.worldToScreen(t);
                                    e.drawNamePlate(e.spriteBatch, t.name, n.x, n.y - 60)
                                }
                                if (t.says) {
                                    var n = e.camera.worldToScreen(t);
                                    e.drawSpeechBaloon(e.spriteBatch, t.says, n.x, n.y - 66)
                                }
                            })
                        })
                    }
                    this.socket && this.socket.isConnected || this.drawMessage(this.spriteBatch, "Connecting..."),
                    this.spriteBatch.end(),
                    this.input.draw();
                    var u = Date.now();
                    if (u - this.lastStats > 1e3) {
                        var c = this.sent.toFixed()
                          , p = this.recv.toFixed()
                          , h = this.map ? this.map.entitiesDrawn : 0
                          , d = this.map ? this.map.getTotalEntities() : 0
                          , m = this.map ? this.map.getTotalEntities(function(t) {
                            return t instanceof l.Pony
                        }) : 0;
                        this.stats.textContent = t.toFixed(0) + " fps " + c + "/" + p + " kb/s " + m + " ponies (" + h + "/" + d + ")",
                        this.lastStats = u,
                        this.clock.textContent = $.getTime(this.getTime())
                    }
                }
            }
            ,
            t.prototype.getTime = function() {
                return this.baseTime + Date.now()
            }
            ,
            t.prototype.resizeCanvas = function() {
                var t = window.innerWidth
                  , e = window.innerHeight
                  , n = a.getPixelRatio()
                  , r = Math.round(t * n)
                  , i = Math.round(e * n);
                b.resizeCanvas(this.canvas, r, i)
            }
            ,
            t.prototype.drawMessage = function(t, e) {
                var n = 100
                  , r = Math.round((this.camera.h - n) / 2);
                t.drawRect(f.GRAY, 0, r, this.camera.w, n),
                this.font.drawTextAligned(t, e, f.WHITE, {
                    x: 0,
                    y: r,
                    w: this.camera.w,
                    h: n
                }, "center", "middle")
            }
            ,
            t.prototype.drawNamePlate = function(t, e, n, r) {
                var i = this.font.measureText(e)
                  , o = n - Math.round(i.w / 2)
                  , a = r - i.h + 8;
                this.font.drawText(t, e, f.BLACK, o, a)
            }
            ,
            t.prototype.drawSpeechBaloon = function(t, e, n, i) {
                var o = e.message
                  , l = e.type
                  , u = e.timer
                  , c = this.font.measureText(o);
                if (a.intersect(0, 0, this.camera.w, this.camera.h, n - c.w / 2, i - c.h / 2, c.w, c.h)) {
                    var p = .2
                      , h = (s.SAYS_TIME - u) / p
                      , d = u / p
                      , m = [3, 2, 1, 0, -1, 0]
                      , v = [-4, -3, -2, -1]
                      , y = h * m.length
                      , b = d * v.length
                      , _ = a.clamp(Math.round(y), 0, m.length - 1)
                      , w = a.clamp(Math.round(b), 0, v.length);
                    i += w < v.length ? v[w] : m[_];
                    var x = Math.min(h, d, 1)
                      , $ = 4
                      , E = n - Math.round(c.w / 2)
                      , S = i - c.h;
                    t.globalAlpha = .6 * x,
                    this.button.draw(t, f.BLACK, E - $, S - $, c.w + 2 * $, c.h + 2 * $),
                    t.drawSprite(g.nipple, f.BLACK, n - Math.round(g.nipple.w / 2), i + $),
                    t.globalAlpha = x,
                    this.font.drawText(t, o, r(l), E, S),
                    t.globalAlpha = 1
                }
            }
            ,
            t
        }();
        return Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = E,
        n.exports
    }),
    System.registerDynamic("2d", ["ae"], !0, function(t, e, n) {
        "use strict";
        var r, i = t("ae");
        return Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = {
            get game() {
                return r ? r : r = new i.default
            }
        },
        n.exports
    }),
    System.registerDynamic("af", [], !0, function(t, e, n) {
        return n.exports = '<div uib-dropdown is-open="vm.dropdownOpen" class="settings-box"><span id="clock" class="settings-clock">00:00</span><i uib-dropdown-toggle class="fa fa-fw fa-gear game-button"></i><ul uib-dropdown-menu ng-if="vm.dropdownOpen" class="dropdown-menu pull-right"><li ng-mouseup="$event.stopPropagation(); $event.preventDefault();" ng-click="$event.stopPropagation(); $event.preventDefault();"><a ng-click="vm.changeScale()"><i class="fa fa-fw fa-search"></i> Change scale (x{{vm.scale}})</a></li><li class="divider"></li><li><a ng-click="vm.leave()"><i class="fa fa-fw fa-sign-out"></i> Leave</a></li></ul></div>',
        n.exports
    }),
    System.registerDynamic("b0", ["2d", "af"], !0, function(t, e, n) {
        "use strict";
        var r = t("2d")
          , i = r.default.game
          , o = function() {
            function t(t, e) {
                this.$timeout = t,
                this.gameService = e
            }
            return Object.defineProperty(t.prototype, "scale", {
                get: function() {
                    return i.scale
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.$onInit = function() {
                var t = this
                  , e = document.getElementById("canvas");
                e.addEventListener("touchstart", function() {
                    t.dropdownOpen && t.$timeout(function() {
                        return t.dropdownOpen = !1
                    }, 0)
                })
            }
            ,
            t.prototype.leave = function() {
                this.gameService.leave()
            }
            ,
            t.prototype.changeScale = function() {
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
            template: t("af")
        },
        n.exports
    }),
    System.registerDynamic("b1", [], !0, function(t, e, n) {
        return n.exports = '<li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li>',
        n.exports
    }),
    System.registerDynamic("b2", ["b1"], !0, function(t, e, n) {
        "use strict";
        var r = function() {
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
            template: t("b1")
        },
        n.exports
    }),
    System.registerDynamic("b3", [], !0, function(t, e, n) {
        return n.exports = '<nav class="navbar navbar-inverse"><div class="navbar-header navbar-main"><button ng-click="vm.menuExpanded = !vm.menuExpanded" class="navbar-toggle collapsed"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a ng-if="vm.logo" href="/" ag-active-link class="main-logo-small hidden-xs"><img src="/images/logo-small.png"></a></div><div uib-collapse="!vm.menuExpanded" class="collapse navbar-collapse"><form ng-if="!vm.model.account" class="navbar-form navbar-right"><div uib-dropdown class="button-group"><button uib-dropdown-toggle class="btn btn-default">Sign in <span class="caret"></span></button><ul uib-dropdown-menu><li ng-repeat="p in vm.providers"><a ng-href="{{p.url}}" target="_self"><i ng-class="p.icon" class="fa fa-fw"></i> {{p.name}}</a></li></ul></div></form><ul class="nav navbar-nav navbar-right"><ng-transclude></ng-transclude><li ag-active-link ng-repeat="i in vm.items" class="navbar-link"><a ng-href="{{i.href}}">{{i.name}}</a></li><li ng-if="vm.model.account" uib-dropdown><a uib-dropdown-toggle class="cursor-pointer">{{vm.model.account.name}} <span class="caret"></span></a><ul uib-dropdown-menu><li><a href="/account">Account settings</a></li><li><a href="/auth/sign-out" target="_self" class="cursor-pointer">Sign out</a></li></ul></li></ul></div></nav>',
        n.exports
    }),
    System.registerDynamic("b4", ["ponytownapp settings", "b3"], !0, function(t, e, n) {
        "use strict";
        var r = t("ponytownapp settings")
          , i = function() {
            function t(t) {
                this.model = t,
                this.items = [],
                this.providers = r.oauthProviders.filter(function(t) {
                    return !t.disabled
                })
            }
            return t.$inject = ["model"],
            t
        }()
          , o = function() {
            function t() {}
            return t.prototype.$onInit = function() {
                this.menuBar.items.push(this)
            }
            ,
            t.prototype.$onDestroy = function() {
                this.menuBar.items.splice(this.menuBar.items.indexOf(this), 1)
            }
            ,
            t
        }();
        return e.menuBar = {
            transclude: !0,
            bindings: {
                logo: "<"
            },
            controller: i,
            controllerAs: "vm",
            template: t("b3")
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
    }),
    System.registerDynamic("b5", [], !0, function(t, e, n) {
        return n.exports = '<div class="sign-in-box center-block"><div class="text-center"><p class="lead">Sign in with your social site account</p><div class="sign-in-box-providers"><a ng-repeat="p in vm.providers" ng-href="{{p.url}}" target="_self" title="{{p.name}}" ng-style="{ borderBottomColor: p.disabled ? \'#666\' : p.color }" ng-class="{ disabled: p.disabled }" class="btn btn-lg btn-provider"><i ng-class="p.icon" class="fa fa-fw fa-lg"></i></a></div></div></div>',
        n.exports
    }),
    System.registerDynamic("b6", ["ponytownapp settings", "b5"], !0, function(t, e, n) {
        "use strict";
        var r = t("ponytownapp settings")
          , i = function() {
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
            template: t("b5")
        },
        n.exports
    }),
    System.registerDynamic("b7", [], !0, function(t, e, n) {
        return n.exports = '<div class="play-box"><div uib-dropdown class="form-group btn-group dropdown"><button ng-if="!vm.joining" ng-click="vm.play()" ng-disabled="!vm.canPlay" type="button" class="btn btn-lg btn-success play-box-btn"><span ng-if="vm.server"><strong>{{vm.label || \'Play\'}}</strong> on<span> {{vm.server.name}}</span></span><span ng-if="!vm.server" class="text-faded">select server to play</span></button><button ng-if="vm.joining" ng-click="vm.cancel()" type="button" class="btn btn-lg btn-success play-box-btn"><i class="fa fa-spinner fa-spin"></i> Cancel</button><button uib-dropdown-toggle class="btn btn-lg btn-success"><span class="caret"></span></button><ul uib-dropdown-menu style="width: 100%;" class="dropdown-menu"><li ng-repeat="s in vm.servers"><a ng-click="vm.server = s"><div ng-if="s.offline" class="pull-right text-unsafe">offline</div><div ng-if="!s.offline" class="pull-right text-muted">online ({{s.online}})</div><strong>{{s.name}}</strong><div class="text-muted text-wrap">{{s.desc}}</div></a></li></ul></div><div ng-if="vm.server.offline" class="form-group"><div class="alert alert-info">Selected server is offline, try again later</div></div><div ng-if="vm.offline" class="form-group"><div class="alert alert-info">Server is offline, try again later</div></div><div ng-if="vm.invalidVersion &amp;&amp; !vm.offline" class="form-group"><div class="alert alert-info">Your client version is outdated, <a ng-click="vm.reload()" class="alert-link">reload</a> to be able to play.</div></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div ng-if="vm.server" class="form-group text-left"><h4>Server rules</h4><p class="text-muted">{{vm.server.desc}}</p></div></div>',
        n.exports
    }),
    System.registerDynamic("b8", ["22", "ponytownapp settings", "b7"], !0, function(t, e, n) {
        "use strict";
        var r = t("22")
          , i = t("ponytownapp settings")
          , o = function() {
            function t(t, e, n) {
                this.$location = t,
                this.gameService = e,
                this.model = n,
                this.handleError = r.errorHandler(this)
            }
            return Object.defineProperty(t.prototype, "server", {
                get: function() {
                    return this.gameService.server
                },
                set: function(t) {
                    this.gameService.server = t
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "servers", {
                get: function() {
                    return this.gameService.servers
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "offline", {
                get: function() {
                    return this.gameService.offline
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "invalidVersion", {
                get: function() {
                    return this.gameService.version && this.gameService.version !== i.version
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "joining", {
                get: function() {
                    return this.gameService.joining
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "canPlay", {
                get: function() {
                    return this.server && this.gameService.canPlay;
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.play = function() {
                var t = this;
                return this.error = null ,
                this.model.savePony(this.model.pony).then(function(e) {
                    return t.gameService.join(e.id)
                }).catch(this.handleError)
            }
            ,
            t.prototype.cancel = function() {
                this.gameService.leave()
            }
            ,
            t.prototype.reload = function() {
                location.reload()
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
            template: t("b7")
        },
        n.exports
    }),
    System.registerDynamic("ponytown init", ["<bluebird passthrough>", "amd momentjs passthrough", "rollbar config", "ponytownapp settings", "game service", "30", "32", "34", "36", "38", "3a", "3d", "3f", "40", "41", "46", "b0", "b2", "b4", "b6", "b8"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            s.account && a.configureUser({
                id: s.account.id,
                username: s.account.name
            }),
            t.run(["$rootScope", function(t) {
                i.setScheduler(function(e) {
                    t.$evalAsync(e)
                })
            }
            ]),
            t.config(["$uibTooltipProvider", function(t) {
                t.options({
                    appendToBody: !0
                })
            }
            ]),
            t.filter("fromNow", function() {
                var t = function(t, e) {
                    return o(t).fromNow(e)
                };
                return t.$stateful = !0,
                t
            }),
            t.service("gameService", l.GameService),
            t.service("model", u.Model),
            t.service("applyCallback", ["$rootScope", function(t) {
                return function(e) {
                    t.$$phase ? e() : t.$apply(e)
                }
            }
            ]),
            t.directive("agDrag", c.default),
            t.directive("agActiveLink", ["$location", function(t) {
                return {
                    restrict: "A",
                    link: function(e, n, r) {
                        function i() {
                            var e = r.href || o.getAttribute("href");
                            e === t.absUrl().replace(/^https?:\/\/[^\/]+/, "") ? n.addClass("active") : n.removeClass("active")
                        }
                        var o = r.href ? null : n[0].children.item(0);
                        e.$on("$routeChangeSuccess", i),
                        i()
                    }
                }
            }
            ]),
            t.directive("agAutoFocus", function() {
                return {
                    restrict: "A",
                    link: function(t, e) {
                        setTimeout(function() {
                            return e[0].focus()
                        }, 100)
                    }
                }
            }),
            t.directive("a", function() {
                return {
                    restrict: "E",
                    link: function(t, e, n) {
                        !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                        e[0].setAttribute("rel", "noopener noreferrer"))
                    }
                }
            }),
            t.component("colorPicker", f.default),
            t.component("checkBox", p.default),
            t.component("fillOutline", h.default),
            t.component("spriteBox", d.default),
            t.component("spriteSelection", m.default),
            t.component("spriteSetSelection", v.default),
            t.component("bitmapBox", g.default),
            t.component("characterPreview", y.default),
            t.component("chatBox", b.default),
            t.component("settingsBox", _.default),
            t.component("accountButton", w.default),
            t.component("menuBar", x.menuBar),
            t.component("menuItem", x.menuItem),
            t.component("signInBox", $.default),
            t.component("playBox", E.default)
        }
        var i = t("<bluebird passthrough>")
          , o = t("amd momentjs passthrough")
          , a = t("rollbar config")
          , s = t("ponytownapp settings")
          , l = t("game service")
          , u = t("30")
          , c = t("32")
          , f = t("34")
          , p = t("36")
          , h = t("38")
          , d = t("3a")
          , m = t("3d")
          , v = t("3f")
          , g = t("40")
          , y = t("41")
          , b = t("46")
          , _ = t("b0")
          , w = t("b2")
          , x = t("b4")
          , $ = t("b6")
          , E = t("b8");
        return e.init = r,
        n.exports
    }),
    System.registerDynamic("ba", [], !0, function(t, e, n) {
        return n.exports = '<div ng-init="vm.init()" class="app"><div ng-style="{ display: vm.playing ? \'block\' : \'none\' }" class="app-game"><canvas id="canvas"></canvas><span id="stats"></span><settings-box></settings-box><chat-box></chat-box><div id="touch-origin"></div><div id="touch-position"></div></div><div ng-if="!vm.playing" class="app-cover fadeview"><div class="container"><menu-bar logo="true"><menu-item href="/" name="Home"></menu-item><menu-item href="/about" name="About"></menu-item><menu-item ng-if="vm.model.account" href="/character" name="Characters"></menu-item></menu-bar><div><div ng-view class="app-view"></div></div><footer class="app-footer clearfix"><div class="pull-left text-muted text-nowrap">version <b>0.13.2-alpha</b></div><div class="pull-right text-muted text-nowrap">&copy; 2016 <a href="mailto:agamnentzar&#64;gmail.com" class="text-muted">Agamnentzar</a> | <a href="http://agamnentzar.deviantart.com/" title="DeviantArt" class="text-muted"><i class="fa fa-deviantart"></i></a> <a href="http://agamnentzar.tumblr.com/" title="Tumblr" class="text-muted"><i class="fa fa-tumblr"></i></a> <a href="https://twitter.com/Agamnentzar" title="Twitter" class="text-muted"><i class="fa fa-twitter"></i></a> <a href="https://github.com/Agamnentzar" title="Github" class="text-muted"><i class="fa fa-github"></i></a></div></footer></div></div></div>',
        n.exports
    }),
    System.registerDynamic("44", ["20", "3b"], !0, function(t, e, n) {
        "use strict";
        function r() {
            return i || (i = a.loadSpriteSheets(o.spriteSheets, "/images/"))
        }
        var i, o = t("20"), a = t("3b");
        return e.loadSpriteSheets = r,
        n.exports
    }),
    System.registerDynamic("bb", ["<lodash core passthrough>", "21", "22", "43", "31", "20", "44", "47", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        var r = t("<lodash core passthrough>")
          , i = t("21")
          , o = t("22")
          , a = t("43")
          , s = t("31")
          , l = t("20")
          , u = t("44")
          , c = t("47")
          , f = t("ponytownapp settings")
          , p = l.ponyNoses[0]
          , h = function() {
            function t(t, e, n, r, s) {
                var u = this;
                this.$http = e,
                this.$location = n,
                this.gameService = r,
                this.model = s,
                this.maxNameLength = i.PLAYER_NAME_MAX_LENGTH,
                this.state = a.createDefaultPonyState(),
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
                this.frontHooves = [null , [[l.ponyFetlocksFrontStand[0]]]],
                this.backHooves = [null , [[l.ponyFetlocksBackStand[0]]]],
                this.animations = c.animations,
                this.activeAnimation = 0,
                this.muzzles = l.ponyNoses.map(function(t) {
                    return {
                        fill: null ,
                        outline: t.muzzle,
                        extra: t.mouth
                    }
                }),
                this.freckles = l.ponyFreckles.map(function(t) {
                    return t ? {
                        fill: t,
                        outline: p.muzzle
                    } : null
                }),
                this.fangs = [null , {
                    fill: null ,
                    outline: p.muzzle,
                    extra: p.fangs
                }],
                this.loaded = !1,
                this.playAnimation = !0,
                this.cmSize = i.CM_SIZE,
                this.deleting = !1,
                this.nextBlink = 0,
                this.blinkFrames = a.BLINK_FRAMES,
                this.blinkFrame = -1,
                this.handleError = o.errorHandler(this),
                this.destroyed = !1,
                t.$on("$destroy", function() {
                    return u.destroy()
                })
            }
            return Object.defineProperty(t.prototype, "customOutlines", {
                get: function() {
                    return this.pony.customOutlines
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "ponies", {
                get: function() {
                    return this.model.ponies
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pony", {
                get: function() {
                    return this.model.pony
                },
                set: function(t) {
                    this.model.selectPony(t)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "activeTab", {
                get: function() {
                    return 0 | parseInt(localStorage.getItem("character-active-tab"), 10)
                },
                set: function(t) {
                    localStorage.setItem("character-active-tab", t)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "baseHairColor", {
                get: function() {
                    return this.pony.mane && this.pony.mane.fills && this.pony.mane.fills[0]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "baseCoatColor", {
                get: function() {
                    return this.pony.coatFill
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "canExport", {
                get: function() {
                    return f.debug
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.init = function() {
                var t = this;
                this.model.account || this.$location.url("/");
                var e = Date.now();
                return u.loadSpriteSheets().then(function() {
                    t.destroyed || (t.loaded = !0,
                    t.interval = setInterval(function() {
                        var n = Date.now();
                        t.update(n - e),
                        e = n
                    }, 1e3 / 24))
                })
            }
            ,
            t.prototype.destroy = function() {
                this.destroyed = !0,
                clearInterval(this.interval)
            }
            ,
            t.prototype.update = function(t) {
                var e = Date.now();
                this.state.animation = this.animations[this.activeAnimation],
                this.playAnimation && (this.state.animationFrame = (this.state.animationFrame + 1) % this.state.animation.frames),
                this.blinkFrame === -1 ? this.nextBlink < e && (this.blinkFrame = 0) : (this.blinkFrame++,
                this.blinkFrame >= this.blinkFrames.length && (this.nextBlink = e + 2e3 * Math.random() + 3e3,
                this.blinkFrame = -1)),
                this.state.blinkFrame = this.blinkFrame === -1 ? 1 : this.blinkFrames[this.blinkFrame]
            }
            ,
            t.prototype.clearCM = function() {
                r.fill(this.pony.cm, "")
            }
            ,
            t.prototype.eyeColorLockChanged = function(t) {
                t && (this.pony.eyeColorLeft = this.pony.eyeColorRight)
            }
            ,
            t.prototype.eyeOpennessChanged = function(t) {
                t && (this.pony.eyeOpennessLeft = this.pony.eyeOpennessRight)
            }
            ,
            Object.defineProperty(t.prototype, "canNew", {
                get: function() {
                    return this.ponies.length < i.PONY_LIMIT
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.new = function() {
                this.deleting = !1,
                this.pony = s.createDefaultPony()
            }
            ,
            t.prototype.select = function(t) {
                t && (this.deleting = !1,
                this.pony = t)
            }
            ,
            Object.defineProperty(t.prototype, "canSave", {
                get: function() {
                    return !this.model.saving && !!this.pony && !!this.pony.name
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.save = function() {
                return this.error = null ,
                this.deleting = !1,
                this.model.savePony(this.pony).catch(this.handleError)
            }
            ,
            Object.defineProperty(t.prototype, "canRevert", {
                get: function() {
                    var t = this;
                    return !!this.pony.id && this.ponies.some(function(e) {
                        return e.id === t.pony.id
                    })
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.revert = function() {
                this.select(o.findById(this.ponies, this.pony.id))
            }
            ,
            Object.defineProperty(t.prototype, "canDelete", {
                get: function() {
                    return !!this.pony.id
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.delete = function() {
                return this.error = null ,
                this.deleting = !1,
                this.model.removePony(this.pony).catch(this.handleError)
            }
            ,
            t.prototype.export = function() {
                var t = 80
                  , e = 80
                  , n = this.animations.reduce(function(t, e) {
                    return t + e.frames
                }, 0)
                  , r = o.createCanvas(t * n, e)
                  , i = r.getContext("2d")
                  , l = s.toRenderInfo(this.pony)
                  , u = 0;
                this.animations.forEach(function(n) {
                    for (var r = 0; r < n.frames; r++,
                    u++) {
                        var o = {
                            animation: n,
                            animationFrame: r,
                            blinkFrame: 1
                        };
                        a.drawPony2D(i, l, o, u * t + t / 2, e - 10)
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
        e.default = h,
        n.exports
    }),
    System.registerDynamic("bc", ["<lodash core passthrough>", "21", "22"], !0, function(t, e, n) {
        "use strict";
        var r = t("<lodash core passthrough>")
          , i = t("21")
          , o = t("22")
          , a = function() {
            function t(t, e, n) {
                var r = this;
                this.$location = e,
                this.model = n,
                this.nameMinLength = i.ACCOUNT_NAME_MIN_LENGTH,
                this.nameMaxLength = i.ACCOUNT_NAME_MAX_LENGTH,
                this.settings = {},
                this.handleError = o.errorHandler(this),
                t.$watchCollection("[vm.settings.filterSwearWords, vm.settings.filterCyrillic]", function() {
                    return r.saveSettings()
                })
            }
            return t.prototype.init = function() {
                var t = this.model.account;
                t ? (this.settings = r.clone(t.settings),
                this.data = {
                    name: t.name
                }) : this.$location.url("/")
            }
            ,
            t.prototype.submit = function() {
                this.error = null ,
                this.model.updateAccount(this.data).catch(this.handleError)
            }
            ,
            t.prototype.saveSettings = function() {
                r.isEqual(this.settings, this.model.account.settings) || this.model.saveSettings(this.settings).catch(this.handleError)
            }
            ,
            t.$inject = ["$scope", "$location", "model"],
            t
        }();
        return Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = a,
        n.exports
    }),
    System.registerDynamic("39", ["35"], !0, function(t, e, n) {
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
    }),
    System.registerDynamic("31", ["<lodash core passthrough>", "20", "22", "39", "21", "35"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return T.mergeWith({}, a(), T.cloneDeep(t), function(t, e) {
                if (null == e)
                    return t
            })
        }
        function i(t, e, n) {
            void 0 === e && (e = !0),
            void 0 === n && (n = "gold");
            var r = [n, "dodgerblue", "limegreen", "orchid", "crimson", "aquamarine"]
              , i = r.map(C.fillToOutline);
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
            return T.range(0, I.CM_SIZE * I.CM_SIZE).map(function() {
                return ""
            })
        }
        function a() {
            return {
                id: null ,
                name: "",
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
                cm: o(),
                cmFlip: !1,
                customOutlines: !1
            }
        }
        function s(t) {
            return O.default.parseWithAlpha(t, 1)
        }
        function l(t) {
            return s(C.colorToFar(t))
        }
        function u(t) {
            return l(t && t[0] ? t[0] : "black")
        }
        function c(t) {
            return O.default.parse(t)
        }
        function f(t) {
            return t ? t.map(s) : null
        }
        function p(t) {
            return t ? {
                type: t.type,
                pattern: t.pattern,
                fills: f(t.fills),
                outlines: f(t.outlines),
                lockFills: t.lockFills,
                lockOutlines: t.lockOutlines
            } : null
        }
        function h(t) {
            return {
                name: t.name,
                horn: p(t.horn),
                wings: p(t.wings),
                frontHooves: p(t.frontHooves),
                backHooves: p(t.backHooves),
                mane: p(t.mane),
                backMane: p(t.backMane),
                tail: p(t.tail),
                facialHair: p(t.facialHair),
                headAccessory: p(t.headAccessory),
                earAccessory: p(t.earAccessory),
                faceAccessory: p(t.faceAccessory),
                neckAccessory: p(t.neckAccessory),
                coatFill: s(t.coatFill),
                coatOutline: s(t.coatOutline),
                lockCoatOutline: t.lockCoatOutline,
                darkCoatFill: l(t.coatFill),
                darkCoatOutline: l(t.coatOutline),
                eyelashes: t.eyelashes,
                eyeColorLeft: s(t.eyeColorLeft),
                eyeColorRight: s(t.eyeColorRight),
                eyeWhites: s(t.eyeWhites),
                eyeOpennessLeft: t.eyeOpennessLeft,
                eyeOpennessRight: t.eyeOpennessRight,
                eyeshadow: t.eyeshadow,
                eyeshadowColor: s(t.eyeshadowColor),
                lockEyes: t.lockEyes,
                lockEyeColor: t.lockEyeColor,
                fangs: t.fangs,
                muzzle: t.muzzle,
                freckles: t.freckles,
                frecklesColor: s(t.frecklesColor),
                cm: t.cm && t.cm.map(c),
                cmFlip: t.cmFlip,
                darkFrontHoovesFill: u(t.frontHooves && t.frontHooves.fills),
                darkFrontHoovesOutline: u(t.frontHooves && t.frontHooves.outlines),
                darkBackHoovesFill: u(t.backHooves && t.backHooves.fills),
                darkBackHoovesOutline: u(t.backHooves && t.backHooves.outlines),
                customOutlines: t.customOutlines
            }
        }
        function d(t) {}
        function m(t) {
            return t.map(function(t) {
                return t ? t.map(function(t) {
                    return t.length
                }) : [0]
            })
        }
        function v(t) {
            return t ? O.default.parse(t).toHexRGB() : ""
        }
        function g(t) {
            return Object.keys(t).forEach(function(e) {
                null == t[e] && delete t[e]
            }),
            t
        }
        function y(t) {
            return t ? 1 : 0
        }
        function b(t) {
            return !!+t
        }
        function _(t, e) {
            return t.slice(0, e).map(y).join(" ")
        }
        function w(t) {
            return t && t.split ? t.split(" ").map(b) : null
        }
        function x(t, e) {
            return t.slice(0, e).map(v).join(" ")
        }
        function $(t) {
            return t && t.split ? t.split(" ") : null
        }
        function E(t, e, n) {
            if (void 0 === n && (n = !0),
            !t || n && 0 === t.type)
                return null ;
            var r = e ? m(e) : null
              , i = r ? D.at(D.at(r, t.type), t.pattern) : 6;
            return [t.type, t.pattern, x(t.fills, i), x(t.outlines, i), _(t.lockFills, i), _(t.lockOutlines, i)]
        }
        function S(t) {
            return t ? {
                type: t[0],
                pattern: t[1],
                fills: $(t[2]),
                outlines: $(t[3]),
                lockFills: w(t[4]),
                lockOutlines: w(t[5])
            } : null
        }
        function M(t) {
            var e = {
                name: t.name,
                h: E(t.horn, A.ponyHorns),
                w: E(t.wings, A.ponyWings),
                fh: E(t.frontHooves, null ),
                bh: E(t.backHooves, null ),
                m: E(t.mane, A.ponyManes, !1),
                bm: E(t.backMane, A.ponyBackManes, !1),
                t: E(t.tail, A.ponyTails, !1),
                fac: E(t.facialHair, A.ponyFacialHair),
                ha: E(t.headAccessory, A.ponyHeadAccessories),
                ea: E(t.earAccessory, A.ponyEarAccessories),
                fa: E(t.faceAccessory, A.ponyFaceAccessories),
                na: E(t.neckAccessory, A.ponyNeckAccessories),
                cf: v(t.coatFill),
                co: v(t.coatOutline),
                lco: y(t.lockCoatOutline),
                el: t.eyelashes,
                ecl: v(t.eyeColorLeft),
                ecr: v(t.eyeColorRight),
                ew: v(t.eyeWhites),
                eol: t.eyeOpennessLeft,
                eor: t.eyeOpennessRight,
                es: y(t.eyeshadow),
                esc: v(t.eyeshadowColor),
                le: y(t.lockEyes),
                lec: y(t.lockEyeColor),
                fan: t.fangs,
                mu: t.muzzle,
                fr: t.freckles,
                frc: t.freckles ? v(t.frecklesColor) : null ,
                cm: t.cm && t.cm.some(function(t) {
                    return !!t
                }) ? T.dropRightWhile(t.cm.map(v), function(t) {
                    return !t
                }) : null ,
                cmf: y(t.cmFlip),
                col: y(t.customOutlines)
            };
            return g(e)
        }
        function k(t) {
            var e = {
                id: t.id,
                name: t.name,
                lastUsed: t.lastUsed,
                horn: S(t.h),
                wings: S(t.w),
                frontHooves: S(t.fh),
                backHooves: S(t.bh),
                mane: S(t.m),
                backMane: S(t.bm),
                tail: S(t.t),
                facialHair: S(t.fac),
                headAccessory: S(t.ha),
                earAccessory: S(t.ea),
                faceAccessory: S(t.fa),
                neckAccessory: S(t.na),
                coatFill: t.cf,
                coatOutline: t.co,
                lockCoatOutline: b(t.lco),
                eyelashes: t.el,
                eyeColorLeft: t.ecl,
                eyeColorRight: t.ecr,
                eyeWhites: t.ew,
                eyeOpennessLeft: t.eol,
                eyeOpennessRight: t.eor,
                eyeshadow: b(t.es),
                eyeshadowColor: t.esc,
                lockEyes: b(t.le),
                lockEyeColor: b(t.lec),
                fangs: t.fan,
                muzzle: t.mu,
                freckles: t.fr,
                frecklesColor: t.frc,
                cm: t.cm,
                cmFlip: b(t.cmf),
                customOutlines: b(t.col)
            };
            return r(e)
        }
        var T = t("<lodash core passthrough>")
          , A = t("20")
          , D = t("22")
          , C = t("39")
          , I = t("21")
          , O = t("35");
        return e.fixPony = r,
        e.createSpriteSet = i,
        e.createDefaultCM = o,
        e.createDefaultPony = a,
        e.toRenderInfo = h,
        e.randomizePony = d,
        e.compressPonyInfo = M,
        e.decompressPonyInfo = k,
        n.exports
    }),
    System.registerDynamic("24", ["35"], !0, function(t, e, n) {
        "use strict";
        var r = t("35");
        return e.WHITE = r.default.parse("white"),
        e.BLACK = r.default.parse("black"),
        e.ORANGE = r.default.parse("orange"),
        e.BLUE = r.default.parse("blue"),
        e.GRAY = r.default.parse("#444"),
        e.RED = r.default.parse("red"),
        e.BG_COLOR = r.default.parse("LightGreen"),
        e.ADMIN_COLOR = r.default.parse("HotPink"),
        e.SYSTEM_COLOR = r.default.parse("#999"),
        e.SHADOW_COLOR = new r.default(0,0,0,.3),
        e.SHINES_COLOR = new r.default(255,255,255,.4),
        n.exports
    }),
    System.registerDynamic("bd", [], !0, function(t, e, n) {
        var r = new Int8Array(4)
          , i = new Int32Array(r.buffer,0,1)
          , o = new Float32Array(r.buffer,0,1)
          , a = function() {};
        return a.intBitsToFloat = function(t) {
            return i[0] = t,
            o[0]
        }
        ,
        a.floatToIntBits = function(t) {
            return o[0] = t,
            i[0]
        }
        ,
        a.intToFloatColor = function(t) {
            return a.intBitsToFloat(4278190079 & t)
        }
        ,
        a.colorToFloat = function(t, e, n, r) {
            var i = r << 24 | n << 16 | e << 8 | t;
            return a.intToFloatColor(i)
        }
        ,
        a.isPowerOfTwo = function(t) {
            return 0 === (t & t - 1)
        }
        ,
        a.nextPowerOfTwo = function(t) {
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
    }),
    System.registerDynamic("be", ["bd"], !0, function(t, e, n) {
        return n.exports = t("bd"),
        n.exports
    }),
    System.registerDynamic("35", ["be"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            var e = (0 | t).toString(16);
            return 2 === e.length ? e : "0" + e
        }
        var i = t("be")
          , o = function() {
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
                get: function() {
                    return this.r / 255
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "floatG", {
                get: function() {
                    return this.g / 255
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "floatB", {
                get: function() {
                    return this.b / 255
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "floatA", {
                get: function() {
                    return this.a
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.toFloat = function(t) {
                return void 0 === t && (t = 1),
                i.colorToFloat(this.r, this.g, this.b, this.a * t * 255)
            }
            ,
            t.prototype.toFloatArray = function() {
                return [this.floatR, this.floatG, this.floatB, this.floatA]
            }
            ,
            t.prototype.toHexRGB = function() {
                return r(this.r) + r(this.g) + r(this.b)
            }
            ,
            t.prototype.toHexRGBA = function() {
                return r(this.r) + r(this.g) + r(this.b) + r(255 * this.a)
            }
            ,
            t.prototype.toRGB = function() {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
            }
            ,
            t.prototype.toRGBA = function() {
                return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
            }
            ,
            t.prototype.complementary = function() {
                var e = this.hsva();
                return e.h += e.h >= 180 ? -180 : 180,
                t.fromHsvaObject(e)
            }
            ,
            t.prototype.css = function() {
                return 1 === this.a ? "#" + this.toHexRGB() : this.toRGBA()
            }
            ,
            t.prototype.hsva = function(e) {
                return t.rgb2hsv(this.r, this.g, this.b, this.a, e)
            }
            ,
            t.prototype.equal = function(t) {
                return !!t && this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a
            }
            ,
            t.prototype.darken = function(t) {
                this.r *= t,
                this.g *= t,
                this.b *= t
            }
            ,
            t.compare = function(t, e) {
                if (null === t && null === e)
                    return 0;
                if (null == t || null == e)
                    return 1;
                var n = t.hsva()
                  , r = e.hsva();
                return .25 * (Math.abs(n.h - r.h) / 360) + .25 * Math.abs(n.s - r.s) + .25 * Math.abs(n.v - r.v) + .25 * Math.abs(n.a - r.a)
            }
            ,
            t.lerp = function(e, n, r) {
                var i = r
                  , o = 1 - r;
                return new t(e.r * o + n.r * i,e.g * o + n.g * i,e.b * o + n.b * i,e.a * o + n.a * i)
            }
            ,
            t.fromHsva = function(e, n, r, i) {
                var o = t.hsv2rgb(e, n, r, i);
                return new t(o.r,o.g,o.b,o.a)
            }
            ,
            t.fromHsvaObject = function(e) {
                return t.fromHsva(e.h, e.s, e.v, e.a)
            }
            ,
            t.parse = function(e) {
                if ("string" != typeof e)
                    return new t(0,0,0,0);
                if (e = e.trim().toLowerCase(),
                "" === e || "none" === e || "transparent" === e)
                    return new t(0,0,0,0);
                e = t.names[e] || e;
                var n = /(\d+)[ ,]+(\d+)[ ,]+(\d+)([ ,]+(\d*\.?\d+))?/.exec(e);
                if (n)
                    return new t(parseInt(n[1], 10),parseInt(n[2], 10),parseInt(n[3], 10),n[5] ? parseFloat(n[5]) : 1);
                e = e.replace(/^#+/, "");
                var r, i, o, a;
                return 3 === e.length ? (r = 17 * parseInt(e.charAt(0), 16),
                i = 17 * parseInt(e.charAt(1), 16),
                o = 17 * parseInt(e.charAt(2), 16),
                a = 1) : (r = parseInt(e.substr(0, 2), 16),
                i = parseInt(e.substr(2, 2), 16),
                o = parseInt(e.substr(4, 2), 16),
                a = e.length >= 8 ? parseInt(e.substr(6, 2), 16) / 255 : 1),
                new t(r,i,o,a)
            }
            ,
            t.parseWithAlpha = function(e, n) {
                var r = t.parse(e);
                return r.a = +n,
                r
            }
            ,
            t.rgb2hex = function(t, e, n, i) {
                return r(t) + r(e) + r(n) + r(255 * i)
            }
            ,
            t.rgb2hsv = function(t, e, n, r, i) {
                void 0 === i && (i = 0),
                t /= 255,
                e /= 255,
                n /= 255,
                i /= 360;
                var o = Math.max(t, e, n)
                  , a = Math.min(t, e, n)
                  , s = o
                  , l = o - a
                  , u = 0 === o ? 0 : l / o;
                if (o !== a) {
                    switch (o) {
                    case t:
                        i = (e - n) / l + (e < n ? 6 : 0);
                        break;
                    case e:
                        i = (n - t) / l + 2;
                        break;
                    case n:
                        i = (t - e) / l + 4
                    }
                    i /= 6
                }
                return {
                    h: 360 * i,
                    s: u,
                    v: s,
                    a: r
                }
            }
            ,
            t.hsv2rgb = function(t, e, n, r) {
                t = Math.max(0, Math.min(360, 360 === t ? 0 : t)),
                e = Math.max(0, Math.min(1, e)),
                n = Math.max(0, Math.min(1, n));
                var i = n
                  , o = n
                  , a = n;
                if (0 !== e) {
                    t /= 60;
                    var s = Math.floor(t)
                      , l = t - s
                      , u = n * (1 - e)
                      , c = n * (1 - e * l)
                      , f = n * (1 - e * (1 - l));
                    switch (s) {
                    case 0:
                        i = n,
                        o = f,
                        a = u;
                        break;
                    case 1:
                        i = c,
                        o = n,
                        a = u;
                        break;
                    case 2:
                        i = u,
                        o = n,
                        a = f;
                        break;
                    case 3:
                        i = u,
                        o = c,
                        a = n;
                        break;
                    case 4:
                        i = f,
                        o = u,
                        a = n;
                        break;
                    default:
                        i = n,
                        o = u,
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
            t.h2rgb = function(t) {
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
            t.random = function() {
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
    }),
    System.registerDynamic("lodash core", ["@empty"], !0, libraries.lodash),
    System.registerDynamic("<lodash core passthrough>", ["lodash core"], !0, function(t, e, n) {
        return n.exports = t("lodash core"),
        n.exports
    }),
    System.registerDynamic("21", [], !0, function(t, e, n) {
        "use strict";
        return e.PONY_SPEED_TROT = 4,
        e.PONY_SPEED_WALK = 2,
        e.SAYS_TIME = 6,
        e.REGION_SIZE = 20,
        e.MAP_SIZE = 3,
        e.CLOUD_COUNT = 10,
        e.CM_SIZE = 5,
        e.SAY_MAX_LENGTH = 64,
        e.PLAYER_NAME_MAX_LENGTH = 20,
        e.ACCOUNT_NAME_MIN_LENGTH = 1,
        e.ACCOUNT_NAME_MAX_LENGTH = 32,
        e.PONY_LIMIT = 16,
        e.frameTime = 24,
        e.tileWidth = 32,
        e.tileHeight = 24,
        e.tileCols = 4,
        e.tileRows = 8,
        e.debug = "undefined" == typeof localStorage ? {
            showHelpers: !1
        } : localStorage,
        n.exports
    }),
    System.registerDynamic("22", ["<bluebird passthrough>", "<lodash core passthrough>", "21"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return new RegExp("^" + G.escapeRegExp((t || "").trim()) + "$","i")
        }
        function i(t, e) {
            return (t & e) === e
        }
        function o(t, e) {
            return t ? t[a(0 | e, 0, t.length - 1)] : null
        }
        function a(t, e, n) {
            return t > e ? t < n ? t : n : e
        }
        function s(t, e) {
            return t.find(function(t) {
                return t.id === e
            })
        }
        function l(t, e) {
            return t.find(function(t) {
                return t.name === e
            })
        }
        function u(t, e) {
            if (t)
                for (var n = -1; (n = t.indexOf(e)) !== -1; )
                    t.splice(n, 1)
        }
        function c(t, e) {
            return !!G.remove(t, function(t) {
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
        function d(t, e, n, r) {
            var i = n.x / X.tileWidth + t
              , o = n.y / X.tileHeight + e
              , a = n.w / X.tileWidth
              , s = n.h / X.tileHeight;
            return r.x > i && r.x < i + a && r.y > o && r.y < o + s
        }
        function m(t, e, n, r, i) {
            var o = n.x + t
              , a = n.y + e
              , s = n.w
              , l = n.h;
            return r > o && r < o + s && i > a && i < a + l
        }
        function v(t, e) {
            return Math.sqrt(t * t + e * e)
        }
        function g(t, e) {
            var n = t.x - e.x
              , r = t.y - e.y;
            return v(n, r)
        }
        function y(t, e) {
            if (!t.bounds || !e.bounds)
                return !1;
            var n = t.x + t.bounds.x
              , r = t.y + t.bounds.y
              , i = e.x + e.bounds.x
              , o = e.y + e.bounds.y;
            return x(n, r, t.bounds.w, t.bounds.h, i, o, e.bounds.w, e.bounds.h)
        }
        function b(t, e) {
            return x(t.x, t.y, t.w, t.h, e.x, e.y, e.w, e.h)
        }
        function _(t, e) {
            var n = Math.min(t.x, e.x)
              , r = Math.min(t.y, e.y);
            return {
                x: n,
                y: r,
                w: Math.max(t.x + t.w, e.x + e.w) - n,
                h: Math.max(t.y + t.h, e.y + e.h) - r
            }
        }
        function w(t, e, n, r, i, o) {
            return x(t + n.x, e + n.y, n.w, n.h, r + o.x, i + o.y, o.w, o.h)
        }
        function x(t, e, n, r, i, o, a, s) {
            return t <= i + a && t + n >= i && e <= o + s && e + r >= o
        }
        function $(t) {
            return t >= 55296 && t <= 56319
        }
        function E(t, e) {
            return ((1023 & t) << 10) + (1023 & e) + 65536
        }
        function S(t, e) {
            void 0 === e && (e = !1);
            for (var n = e ? K : Z, r = "", i = 0; i < t; i++)
                r += n[Math.random() * n.length | 0];
            return r
        }
        function M(t) {
            return function(e) {
                t.error = e.message
            }
        }
        function k(t) {
            throw new Error(t.data || (403 === t.status ? "Access denied" : "Server is offline"))
        }
        function T(t) {
            return W.resolve(t).catch(k).then(function(t) {
                return t.data
            })
        }
        function A() {
            return "undefined" != typeof window ? window.devicePixelRatio || 1 : 1
        }
        function D(t, e) {
            var n = document.createElement("canvas");
            return n.width = t,
            n.height = e,
            n
        }
        function C(t) {
            return new W(function(e, n) {
                var r = new Image;
                r.addEventListener("load", function() {
                    return e(r)
                }),
                r.addEventListener("error", function() {
                    return n(new Error("Failed to load image: " + t));
                }),
                r.src = t
            }
            )
        }
        function I(t) {
            var e = 3 & t;
            return 2 === e ? X.PONY_SPEED_TROT : 1 === e ? X.PONY_SPEED_WALK : 0
        }
        function O(t) {
            var e = J[(0 | t) % J.length];
            return {
                x: e[0],
                y: e[1]
            }
        }
        function R(t, e) {
            var n = Math.atan2(t, -e);
            return Math.round((n < 0 ? n + et : n) * nt) % J.length
        }
        function P(t, e, n, r) {
            var i = Math.floor(100 * a(t, 0, 1e5)) | n << 24
              , o = Math.floor(100 * a(e, 0, 1e5)) | r << 24;
            return [i ^ Q, o ^ tt]
        }
        function F(t, e) {
            t ^= Q,
            e ^= tt;
            var n = (16777215 & t) / 100
              , r = (16777215 & e) / 100
              , i = t >> 24 & 255
              , o = e >> 24 & 255;
            return [n, r, i, o]
        }
        function j(t, e) {
            return !(t < 0) && (t > 0 || e)
        }
        function N(t) {
            var e, n;
            t.set = function() {
                e = t.x,
                n = t.y
            }
            ,
            t.tes = function() {
                t.x = e,
                t.y = n
            }
            ,
            t.set()
        }
        function L(t) {
            var e, n = !1, r = W.resolve(t.load()).then(function() {
                if (n)
                    throw new Error("cancelled");
                t.init();
                var r = performance.now()
                  , i = r
                  , o = 0
                  , a = 0;
                e = requestAnimationFrame(function n(s) {
                    e = requestAnimationFrame(n),
                    o++,
                    s - i > 1e3 && (a = 1e3 * o / (s - i),
                    o = 0,
                    i = s),
                    t.update((s - r) / 1e3),
                    t.draw(a),
                    r = s
                })
            }), i = function() {
                cancelAnimationFrame(e),
                n = !0
            };
            return {
                promise: r,
                cancel: i
            }
        }
        function U(t) {
            "imageSmoothingEnabled"in t ? t.imageSmoothingEnabled = !1 : (t.webkitImageSmoothingEnabled = !1,
            t.mozImageSmoothingEnabled = !1,
            t.msImageSmoothingEnabled = !1)
        }
        function B(t, e) {
            t && ("transform"in t.style ? t.style.transform = e : t.style.webkitTransform = e)
        }
        function V(t) {
            return !!t.pointerType
        }
        function H(t) {
            return !!t.touches
        }
        function z(t) {
            return H(t) ? 0 : t.button
        }
        function Y(t) {
            return H(t) ? t.touches[0].pageX : t.pageX
        }
        function q(t) {
            return H(t) ? t.touches[0].pageY : t.pageY
        }
        var W = t("<bluebird passthrough>")
          , G = t("<lodash core passthrough>")
          , X = t("21")
          , Z = "abcdefghijklmnopqrstuvwxyz0123456789_"
          , K = Z + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        e.matchString = r,
        e.hasFlag = i,
        e.at = o,
        e.clamp = a,
        e.findById = s,
        e.findByName = l,
        e.remove = u,
        e.removeById = c,
        e.randomInt = f,
        e.randomItem = p,
        e.normalize = h,
        e.contains = d,
        e.containsPoint = m,
        e.length = v,
        e.distance = g,
        e.entitiesIntersect = y,
        e.rectsIntersect = b,
        e.addRects = _,
        e.collidersIntersect = w,
        e.intersect = x,
        e.isSurrogate = $,
        e.fromSurrogate = E,
        e.randomString = S,
        e.errorHandler = M,
        e.handleReject = k,
        e.toPromise = T,
        e.getPixelRatio = A,
        e.createCanvas = D,
        e.loadImage = C;
        var J = [[0, -1], [.5, -1], [1, -1], [1, -.5], [1, 0], [1, .5], [1, 1], [.5, 1], [0, 1], [-.5, 1], [-1, 1], [-1, .5], [-1, 0], [-1, -.5], [-1, -1], [-.5, -1]]
          , Q = 63540507
          , tt = 1026711136
          , et = 2 * Math.PI
          , nt = J.length / et;
        return e.flagsToSpeed = I,
        e.dirToVector = O,
        e.vectorToDir = R,
        e.encodeMovement = P,
        e.decodeMovement = F,
        e.isFacingRight = j,
        e.setupSetTes = N,
        e.start = L,
        e.disableImageSmoothing = U,
        e.setTransform = B,
        e.isPointer = V,
        e.isTouch = H,
        e.getButton = z,
        e.getX = Y,
        e.getY = q,
        n.exports
    }),
    System.registerDynamic("3b", ["<bluebird passthrough>", "35", "22"], !0, function(t, e, n) {
        "use strict";
        function r(t, e) {
            var n = Object.keys(t).reduce(function(e, n) {
                var r = t[n];
                if (r) {
                    var i = e[r.src] || [];
                    i.push(r),
                    e[r.src] = i
                }
                return e
            }, {});
            return u.map(Object.keys(n), function(t) {
                return f.loadImage(e + t).then(function(e) {
                    return n[t].forEach(function(t) {
                        return t.img = e
                    })
                })
            })
        }
        function i(t, e) {
            return f.loadImage(e + t.src).then(function(e) {
                t.img = e,
                t.sprites.filter(function(t) {
                    return !!t
                }).forEach(function(t) {
                    return t.img = e
                })
            })
        }
        function o(t, e) {
            return u.map(t, function(t) {
                return i(t, e)
            }).then(function() {})
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
        function l(t, e, n, r, i) {
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
                var l = t.globalAlpha;
                t.globalAlpha = l * a.a,
                t.drawImage(o.canvas, 0, 0, e.w, e.h, r + e.ox, i + e.oy, e.w, e.h),
                t.globalAlpha = l
            }
        }
        var u = t("<bluebird passthrough>")
          , c = t("35")
          , f = t("22");
        e.loadSprites = r,
        e.loadSpriteSheets = o,
        e.drawSprite = a;
        var p;
        return e.drawColoredSprite = l,
        n.exports
    }),
    System.registerDynamic("c0", [], !0, function(t, e, n) {
        return n.exports = {
            "pony.png": "pony-584584d43b.png",
            "tiles.png": "tiles-1147a10312.png"
        },
        n.exports
    }),
    System.registerDynamic("20", ["c0"], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return t ? {
                x: t[0],
                y: t[1],
                w: t[2],
                h: t[3],
                ox: t[4],
                oy: t[5],
                src: o
            } : null
        }
        var i = t("c0")
          , o = i["pony.png"]
          , a = [[380, 269, 9, 7, 31, 28], [286, 283, 12, 6, 29, 30], [511, 108, 1, 1, 38, 28], null , [397, 269, 8, 7, 31, 28], [298, 283, 12, 6, 29, 30], [495, 289, 7, 4, 33, 30], [389, 131, 9, 5, 32, 30], [331, 283, 9, 6, 31, 29], [262, 283, 12, 6, 29, 30], [176, 284, 7, 5, 32, 28], [511, 144, 1, 1, 40, 30], [132, 277, 4, 7, 31, 28], [474, 293, 4, 4, 29, 32], [372, 283, 7, 6, 33, 28], [62, 289, 8, 5, 33, 30], [371, 269, 9, 7, 31, 28], [286, 283, 12, 6, 29, 30], [479, 289, 8, 4, 31, 28], null , [502, 283, 4, 6, 31, 29], [0, 290, 6, 4, 29, 32], [131, 289, 6, 5, 34, 28], [24, 290, 6, 4, 35, 30], [380, 269, 9, 7, 31, 28], [286, 283, 12, 6, 29, 30], [511, 108, 1, 1, 38, 28], null , [397, 269, 8, 7, 31, 28], [298, 283, 12, 6, 29, 30], [495, 289, 7, 4, 33, 30], [389, 131, 9, 5, 32, 30], [331, 283, 9, 6, 31, 29], [262, 283, 12, 6, 29, 30], [176, 284, 7, 5, 32, 28], [511, 144, 1, 1, 40, 30], [132, 277, 4, 7, 31, 28], [474, 293, 4, 4, 29, 32], [372, 283, 7, 6, 33, 28], [62, 289, 8, 5, 33, 30], [371, 269, 9, 7, 31, 28], [286, 283, 12, 6, 29, 30], [479, 289, 8, 4, 31, 28], null , [502, 283, 4, 6, 31, 29], [0, 290, 6, 4, 29, 32], [131, 289, 6, 5, 34, 28], [24, 290, 6, 4, 35, 30], [53, 211, 8, 15, 35, 26], [409, 210, 10, 15, 34, 28], [82, 178, 2, 1, 37, 26], null , [95, 225, 8, 14, 35, 27], [68, 225, 9, 14, 34, 29], [462, 250, 8, 11, 35, 26], [236, 197, 5, 11, 39, 28], [296, 261, 10, 8, 31, 27], [239, 261, 12, 8, 30, 28], [439, 261, 8, 8, 31, 27], [502, 261, 7, 8, 30, 28], [20, 284, 4, 6, 37, 29], [76, 270, 5, 7, 37, 29], [358, 289, 4, 5, 32, 28], [251, 289, 5, 5, 31, 29], [511, 108, 1, 1, 35, 28], [511, 144, 1, 1, 33, 29], [0, 294, 4, 4, 32, 29], [430, 293, 5, 4, 31, 30], [374, 289, 4, 5, 32, 29], [56, 270, 5, 7, 31, 29], [185, 294, 3, 3, 33, 29], [334, 289, 4, 5, 31, 29], [173, 294, 4, 3, 32, 31], [425, 293, 5, 4, 31, 32], [116, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [409, 251, 13, 9, 28, 20], [160, 239, 16, 12, 26, 19], [27, 226, 20, 13, 21, 22], [103, 225, 8, 14, 20, 22], [139, 284, 14, 5, 27, 28], [428, 208, 6, 1, 27, 33], [74, 294, 8, 3, 33, 30], [57, 294, 9, 3, 33, 31], [136, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [65, 239, 19, 12, 22, 21], null , [486, 208, 12, 15, 21, 20], [151, 180, 15, 17, 20, 19], [176, 239, 15, 12, 25, 21], [336, 207, 15, 15, 26, 19], [495, 261, 7, 8, 34, 25], [83, 261, 9, 9, 33, 25], [176, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [46, 239, 19, 12, 22, 22], null , [509, 23, 3, 11, 21, 24], [413, 225, 6, 14, 20, 22], [308, 223, 11, 14, 23, 20], [366, 210, 11, 15, 24, 19], [372, 239, 10, 12, 29, 21], [399, 210, 10, 15, 30, 19], [139, 261, 7, 9, 34, 23], [190, 251, 7, 10, 35, 23], [116, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [409, 251, 13, 9, 28, 20], [160, 239, 16, 12, 26, 19], [27, 226, 20, 13, 21, 22], [103, 225, 8, 14, 20, 22], [139, 284, 14, 5, 27, 28], [428, 208, 6, 1, 27, 33], [74, 294, 8, 3, 33, 30], [57, 294, 9, 3, 33, 31], [136, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [65, 239, 19, 12, 22, 21], null , [486, 208, 12, 15, 21, 20], [151, 180, 15, 17, 20, 19], [176, 239, 15, 12, 25, 21], [336, 207, 15, 15, 26, 19], [495, 261, 7, 8, 34, 25], [83, 261, 9, 9, 33, 25], [176, 197, 20, 15, 21, 20], [378, 177, 22, 17, 20, 19], [46, 239, 19, 12, 22, 22], null , [509, 23, 3, 11, 21, 24], [413, 225, 6, 14, 20, 22], [308, 223, 11, 14, 23, 20], [366, 210, 11, 15, 24, 19], [372, 239, 10, 12, 29, 21], [399, 210, 10, 15, 30, 19], [139, 261, 7, 9, 34, 23], [190, 251, 7, 10, 35, 23], [0, 179, 20, 17, 21, 23], [26, 139, 22, 21, 20, 22], [233, 283, 15, 6, 26, 23], [222, 261, 17, 8, 25, 22], [295, 223, 13, 14, 21, 25], [271, 192, 5, 15, 20, 25], [256, 223, 13, 14, 22, 26], [204, 239, 12, 12, 22, 31], [420, 293, 5, 4, 34, 27], [428, 208, 6, 1, 34, 31], [149, 289, 6, 5, 35, 26], [330, 294, 2, 2, 40, 30], [84, 239, 19, 12, 22, 23], [136, 212, 21, 14, 21, 22], [213, 294, 9, 2, 28, 23], [124, 284, 15, 5, 26, 22], [183, 283, 18, 6, 22, 24], [389, 251, 20, 9, 21, 24], [53, 251, 19, 10, 22, 25], [202, 261, 20, 8, 22, 28], [418, 289, 10, 4, 31, 27], [499, 106, 12, 3, 30, 29], [309, 294, 4, 2, 37, 29], [274, 294, 5, 2, 37, 30], [258, 250, 16, 11, 25, 21], [111, 226, 18, 13, 24, 20], [222, 251, 5, 10, 25, 21], [230, 237, 9, 13, 24, 20], [478, 250, 7, 11, 27, 21], [0, 240, 5, 12, 30, 21], [153, 261, 6, 9, 32, 22], [216, 251, 6, 10, 33, 22], [398, 106, 5, 6, 36, 25], [479, 269, 6, 7, 36, 25], [5, 239, 21, 12, 21, 21], [68, 211, 25, 14, 19, 20], [201, 283, 17, 6, 25, 21], [181, 261, 21, 8, 23, 20], [33, 284, 21, 5, 21, 23], [207, 277, 24, 6, 19, 23], [231, 277, 21, 6, 21, 26], [183, 277, 24, 6, 19, 27], [108, 284, 16, 5, 26, 28], [73, 284, 19, 5, 24, 29], [222, 294, 8, 2, 34, 29], [201, 294, 12, 2, 31, 30], [26, 239, 20, 12, 28, 20], [93, 211, 22, 14, 27, 19], [104, 277, 4, 7, 28, 25], [384, 251, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [474, 237, 6, 13, 30, 19], [92, 261, 8, 9, 35, 22], [424, 250, 10, 11, 35, 21], [321, 283, 10, 6, 38, 25], [263, 261, 11, 8, 38, 24], [323, 131, 22, 22, 20, 22], [338, 106, 23, 25, 18, 21], [353, 269, 9, 7, 33, 22], [340, 283, 9, 6, 32, 21], [491, 237, 21, 12, 20, 23], [177, 212, 19, 14, 18, 22], [0, 161, 20, 18, 22, 26], [440, 209, 11, 15, 21, 31], [366, 207, 9, 3, 33, 29], [422, 259, 2, 1, 32, 31], [103, 294, 6, 3, 36, 30], [256, 294, 6, 2, 34, 31], [157, 212, 20, 14, 20, 24], [336, 191, 22, 16, 19, 23], [392, 283, 6, 6, 34, 25], [193, 269, 6, 8, 35, 24], [25, 262, 7, 8, 27, 24], [147, 251, 8, 10, 27, 23], [341, 236, 10, 13, 20, 25], [498, 208, 12, 15, 19, 24], [164, 277, 4, 7, 24, 32], [0, 252, 5, 9, 23, 32], [324, 294, 3, 2, 24, 32], [511, 7, 1, 3, 23, 32], [511, 141, 1, 2, 27, 32], null , [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [168, 277, 4, 7, 24, 32], [177, 261, 4, 9, 23, 32], [422, 251, 2, 4, 25, 34], null , [120, 178, 2, 2, 24, 32], [511, 7, 1, 3, 23, 32], [327, 294, 3, 2, 25, 32], null , [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [172, 277, 4, 7, 24, 32], [177, 261, 4, 9, 23, 32], [511, 146, 1, 1, 27, 32], null , null , [511, 147, 1, 1, 23, 34], [326, 247, 4, 2, 24, 32], [511, 106, 1, 2, 23, 32], [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [162, 251, 7, 10, 25, 33], [391, 239, 9, 12, 24, 32], [509, 54, 3, 3, 27, 33], [353, 294, 5, 1, 27, 32], [176, 251, 7, 10, 25, 33], [444, 250, 9, 11, 24, 33], [244, 154, 11, 20, 20, 31], [0, 139, 13, 22, 19, 30], null , [511, 144, 1, 1, 31, 32], [362, 269, 9, 7, 21, 31], [53, 261, 11, 9, 20, 30], [417, 39, 5, 16, 21, 35], [84, 160, 8, 19, 19, 33], [330, 289, 4, 5, 20, 46], [330, 230, 3, 6, 19, 46], [23, 196, 7, 16, 24, 32], [39, 179, 5, 16, 27, 33], [472, 155, 20, 19, 21, 20], [301, 131, 22, 22, 20, 19], [409, 251, 13, 9, 28, 20], [160, 239, 16, 12, 26, 19], [47, 226, 20, 13, 21, 22], [103, 225, 8, 14, 20, 22], [319, 269, 13, 7, 27, 28], [248, 283, 14, 6, 27, 30], [495, 289, 7, 4, 33, 30], [33, 289, 10, 5, 32, 30], [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [383, 158, 20, 19, 21, 20], [345, 131, 22, 22, 20, 19], [20, 179, 19, 17, 22, 21], [511, 144, 1, 1, 40, 30], [486, 208, 12, 15, 21, 20], [151, 180, 15, 17, 20, 19], [333, 222, 15, 14, 25, 21], [136, 180, 15, 17, 26, 19], [100, 261, 8, 9, 33, 25], [129, 251, 9, 10, 33, 25], [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [492, 155, 20, 19, 21, 20], [367, 131, 22, 22, 20, 19], [122, 239, 19, 12, 22, 22], null , [509, 23, 3, 11, 21, 24], [413, 225, 6, 14, 20, 22], [308, 223, 11, 14, 23, 20], [366, 210, 11, 15, 24, 19], [493, 223, 10, 14, 29, 21], [220, 180, 11, 17, 29, 19], [169, 251, 7, 10, 34, 23], [5, 251, 7, 11, 35, 23], [384, 289, 3, 5, 24, 34], [506, 283, 4, 6, 23, 35], [216, 197, 20, 15, 21, 20], [400, 177, 22, 17, 20, 19], [409, 251, 13, 9, 28, 20], [160, 239, 16, 12, 26, 19], [47, 226, 20, 13, 21, 22], [103, 225, 8, 14, 20, 22], [319, 269, 13, 7, 27, 28], [248, 283, 14, 6, 27, 30], [495, 289, 7, 4, 33, 30], [33, 289, 10, 5, 32, 30], [156, 197, 20, 15, 21, 20], [44, 178, 22, 17, 20, 19], [103, 239, 19, 12, 22, 21], [511, 144, 1, 1, 40, 30], [486, 208, 12, 15, 21, 20], [151, 180, 15, 17, 20, 19], [333, 222, 15, 14, 25, 21], [136, 180, 15, 17, 26, 19], [100, 261, 8, 9, 33, 25], [129, 251, 9, 10, 33, 25], [196, 197, 20, 15, 21, 20], [400, 177, 22, 17, 20, 19], [122, 239, 19, 12, 22, 22], null , [509, 23, 3, 11, 21, 24], [413, 225, 6, 14, 20, 22], [308, 223, 11, 14, 23, 20], [366, 210, 11, 15, 24, 19], [493, 223, 10, 14, 29, 21], [220, 180, 11, 17, 29, 19], [169, 251, 7, 10, 34, 23], [5, 251, 7, 11, 35, 23], [48, 139, 22, 20, 21, 23], [277, 131, 24, 22, 20, 22], [218, 283, 15, 6, 26, 23], [222, 261, 17, 8, 25, 22], [295, 223, 13, 14, 21, 25], [271, 192, 5, 15, 20, 25], [282, 223, 13, 14, 22, 26], [204, 239, 12, 12, 22, 31], [95, 225, 8, 14, 35, 27], [77, 225, 9, 14, 34, 29], [462, 250, 8, 11, 35, 26], [236, 197, 5, 11, 39, 28], [183, 251, 7, 10, 25, 33], [470, 250, 8, 11, 25, 33], [141, 239, 19, 12, 22, 23], [115, 212, 21, 14, 21, 22], [213, 294, 9, 2, 28, 23], [124, 284, 15, 5, 26, 22], [183, 283, 18, 6, 22, 24], [389, 251, 20, 9, 21, 24], [53, 251, 19, 10, 22, 25], [202, 261, 20, 8, 22, 28], [306, 261, 10, 8, 31, 27], [251, 261, 12, 8, 30, 28], [20, 284, 4, 6, 37, 29], [50, 277, 5, 7, 37, 29], [258, 250, 16, 11, 25, 21], [111, 226, 18, 13, 24, 20], [222, 251, 5, 10, 25, 21], [230, 237, 9, 13, 24, 20], [478, 250, 7, 11, 27, 21], [0, 240, 5, 12, 30, 21], [153, 261, 6, 9, 32, 22], [216, 251, 6, 10, 33, 22], [398, 106, 5, 6, 36, 25], [479, 269, 6, 7, 36, 25], [424, 238, 21, 12, 21, 21], [0, 212, 25, 14, 19, 20], [201, 283, 17, 6, 25, 21], [181, 261, 21, 8, 23, 20], [33, 284, 21, 5, 21, 23], [207, 277, 24, 6, 19, 23], [231, 277, 21, 6, 21, 26], [183, 277, 24, 6, 19, 27], [92, 284, 16, 5, 26, 28], [54, 284, 19, 5, 24, 29], [408, 289, 10, 4, 32, 29], [474, 53, 12, 4, 31, 30], [26, 239, 20, 12, 28, 20], [93, 211, 22, 14, 27, 19], [104, 277, 4, 7, 28, 25], [384, 251, 5, 10, 27, 23], [508, 12, 4, 11, 31, 20], [474, 237, 6, 13, 30, 19], [92, 261, 8, 9, 35, 22], [424, 250, 10, 11, 35, 21], [321, 283, 10, 6, 38, 25], [263, 261, 11, 8, 38, 24], [442, 133, 22, 22, 20, 22], [315, 106, 23, 25, 18, 21], [353, 269, 9, 7, 33, 22], [340, 283, 9, 6, 32, 21], [491, 237, 21, 12, 20, 23], [177, 212, 19, 14, 18, 22], [0, 161, 20, 18, 22, 26], [440, 209, 11, 15, 21, 31], [48, 294, 9, 3, 33, 29], [334, 289, 4, 5, 31, 29], [428, 289, 10, 4, 32, 30], [438, 289, 9, 4, 31, 32], [454, 32, 20, 27, 20, 24], [486, 0, 22, 29, 19, 23], [392, 283, 6, 6, 34, 25], [193, 269, 6, 8, 35, 24], [25, 262, 7, 8, 27, 24], [147, 251, 8, 10, 27, 23], [341, 236, 10, 13, 20, 25], [498, 208, 12, 15, 19, 24], [417, 39, 5, 16, 21, 35], [84, 160, 8, 19, 19, 33], [330, 289, 4, 5, 20, 46], [330, 230, 3, 6, 19, 46], [23, 196, 7, 16, 24, 32], [39, 179, 5, 16, 27, 33], [33, 251, 5, 11, 39, 35], [378, 225, 7, 14, 38, 33], [510, 287, 2, 4, 40, 37], [399, 289, 3, 5, 38, 37], [262, 269, 4, 8, 39, 38], [478, 293, 4, 4, 39, 43], [405, 289, 3, 5, 41, 35], [456, 224, 4, 10, 41, 33], [43, 251, 5, 11, 39, 35], [378, 225, 7, 14, 38, 33], [241, 180, 3, 8, 40, 37], null , [38, 251, 5, 11, 39, 35], [385, 225, 7, 14, 38, 33], [50, 262, 3, 7, 41, 36], [258, 269, 4, 8, 40, 37], [485, 250, 5, 11, 39, 35], [378, 225, 7, 14, 38, 33], [509, 34, 3, 10, 40, 36], null , [48, 251, 5, 11, 39, 35], [399, 225, 7, 14, 38, 33], [509, 192, 3, 8, 40, 38], [451, 70, 3, 10, 40, 37], [347, 249, 7, 12, 36, 37], [86, 225, 9, 14, 35, 36], [461, 276, 5, 7, 36, 40], [197, 251, 7, 10, 35, 37], [210, 251, 6, 10, 37, 37], [317, 294, 4, 2, 36, 46], [379, 251, 5, 10, 38, 39], [334, 294, 2, 2, 37, 48], [442, 121, 3, 8, 40, 41], [0, 226, 5, 14, 39, 36], [404, 136, 15, 22, 37, 22], [22, 115, 17, 24, 36, 21], [37, 209, 2, 2, 41, 26], [470, 293, 4, 4, 40, 25], [136, 294, 5, 3, 42, 22], [316, 261, 10, 8, 39, 21], [37, 209, 2, 2, 41, 26], [470, 293, 4, 4, 40, 25], [74, 261, 9, 9, 43, 24], [313, 237, 7, 13, 46, 23], [299, 237, 7, 13, 44, 25], [424, 232, 3, 6, 48, 35], [312, 250, 11, 11, 37, 28], [209, 226, 12, 13, 36, 28], [248, 269, 5, 8, 37, 36], [204, 251, 6, 10, 36, 35], [12, 251, 7, 11, 40, 33], [266, 237, 9, 13, 39, 32], [197, 294, 2, 3, 43, 37], null , [443, 283, 5, 6, 42, 33], [326, 249, 7, 12, 41, 32], [197, 294, 2, 3, 43, 37], null , [19, 251, 7, 11, 40, 33], [257, 237, 9, 13, 39, 32], [373, 251, 6, 10, 40, 34], [408, 239, 8, 12, 39, 33], [453, 283, 5, 6, 40, 38], [4, 262, 7, 8, 39, 37], [51, 195, 10, 16, 37, 29], [244, 174, 12, 18, 36, 28], [159, 261, 6, 9, 41, 29], [416, 239, 8, 12, 40, 28], [340, 249, 7, 12, 37, 33], [248, 237, 9, 13, 36, 33], [280, 208, 14, 15, 30, 35], [296, 173, 16, 18, 29, 34], [351, 236, 10, 13, 30, 35], [388, 210, 11, 15, 29, 34], [25, 212, 12, 14, 30, 35], [326, 173, 13, 18, 29, 34], [230, 223, 13, 14, 30, 36], [415, 194, 13, 16, 30, 35], [165, 261, 4, 9, 40, 37], [333, 249, 7, 12, 38, 36], [480, 237, 6, 13, 37, 32], [37, 211, 8, 15, 36, 31], [160, 277, 4, 7, 39, 32], [199, 269, 6, 8, 38, 31], [181, 294, 4, 3, 39, 37], [18, 290, 6, 4, 38, 36], [435, 293, 5, 4, 37, 40], [463, 289, 8, 4, 36, 40], [12, 290, 6, 4, 37, 41], [70, 289, 8, 5, 36, 41], [97, 138, 13, 22, 48, 42], [54, 115, 15, 24, 47, 41], [165, 284, 11, 5, 48, 42], [305, 269, 14, 7, 47, 41], [87, 251, 11, 10, 48, 44], [288, 250, 13, 11, 47, 45], [389, 194, 13, 16, 48, 48], [256, 192, 15, 16, 47, 49], [320, 237, 6, 13, 48, 50], [419, 210, 8, 15, 47, 50], [498, 133, 13, 22, 48, 42], [69, 115, 15, 24, 47, 41], [442, 155, 10, 20, 48, 43], [511, 10, 1, 2, 47, 47], [84, 138, 13, 22, 48, 42], [262, 131, 15, 23, 47, 41], [462, 155, 10, 20, 48, 44], [110, 138, 12, 21, 47, 44], [13, 139, 13, 22, 48, 42], [54, 115, 15, 24, 47, 41], [358, 153, 13, 20, 48, 43], null , [419, 136, 13, 22, 48, 42], [39, 115, 15, 24, 47, 41], [339, 173, 13, 18, 48, 46], [460, 206, 2, 2, 60, 61], [482, 223, 11, 14, 48, 42], [376, 194, 13, 16, 47, 41], [483, 283, 5, 6, 48, 42], [349, 283, 8, 6, 47, 41], [43, 289, 10, 5, 49, 44], [335, 261, 9, 8, 51, 43], [108, 261, 8, 9, 49, 47], [228, 269, 5, 8, 53, 49], [191, 294, 2, 3, 51, 50], [27, 284, 3, 6, 50, 49], [471, 223, 11, 14, 48, 42], [376, 194, 13, 16, 47, 41], [119, 251, 10, 10, 48, 44], null , [437, 224, 10, 14, 48, 42], [402, 194, 13, 16, 47, 41], [274, 261, 11, 8, 48, 45], [343, 269, 10, 7, 50, 47], [319, 223, 11, 14, 48, 42], [434, 193, 13, 16, 47, 41], [330, 236, 11, 13, 48, 43], [511, 144, 1, 1, 50, 49], [460, 223, 11, 14, 48, 42], [447, 193, 13, 16, 47, 41], [453, 250, 9, 11, 48, 45], [511, 144, 1, 1, 55, 48], [361, 239, 11, 12, 47, 43], [294, 208, 13, 15, 46, 42], [412, 260, 11, 9, 47, 43], [191, 239, 13, 12, 46, 42], [109, 251, 10, 10, 47, 44], [332, 269, 11, 7, 46, 48], [116, 261, 8, 9, 48, 46], [326, 261, 9, 8, 47, 48], [416, 283, 6, 6, 49, 47], [132, 261, 7, 9, 48, 48], [451, 80, 3, 3, 51, 48], [417, 55, 5, 5, 49, 48], [345, 153, 13, 20, 47, 42], [389, 136, 15, 22, 46, 41], [153, 284, 12, 5, 47, 42], [252, 277, 14, 6, 46, 41], [269, 223, 13, 14, 47, 45], [241, 192, 15, 16, 46, 45], [428, 209, 12, 15, 47, 47], [307, 208, 13, 15, 46, 48], [155, 251, 7, 10, 47, 49], [124, 277, 4, 7, 51, 53], [0, 261, 4, 9, 48, 50], [326, 237, 4, 10, 47, 50], [454, 59, 19, 24, 47, 42], [424, 86, 21, 26, 46, 41], [48, 159, 14, 19, 52, 42], [361, 106, 21, 25, 46, 41], [244, 131, 18, 23, 47, 43], [511, 10, 1, 2, 46, 47], [464, 133, 17, 22, 47, 44], [276, 173, 20, 18, 46, 49], [331, 153, 14, 20, 48, 46], [299, 153, 17, 20, 47, 47], [499, 83, 13, 23, 47, 42], [382, 106, 16, 25, 46, 41], [487, 289, 8, 4, 47, 42], [310, 283, 11, 6, 46, 41], [389, 260, 12, 9, 47, 44], [274, 250, 14, 11, 46, 44], [110, 159, 12, 19, 48, 46], [195, 180, 14, 17, 47, 48], [445, 175, 9, 18, 50, 47], [312, 173, 14, 18, 48, 48], [30, 284, 3, 6, 50, 48], [323, 250, 3, 7, 50, 49], null , [378, 173, 5, 4, 29, 38], [511, 108, 1, 1, 33, 41], null , [266, 289, 5, 5, 29, 38], [511, 108, 1, 1, 32, 42], null , [482, 293, 4, 4, 29, 38], [511, 108, 1, 1, 32, 42], null , [246, 289, 5, 5, 29, 38], [511, 108, 1, 1, 32, 42], [509, 275, 2, 1, 31, 42], [378, 173, 5, 4, 29, 38], [511, 108, 1, 1, 33, 41], [321, 294, 3, 2, 31, 41], [378, 173, 5, 4, 29, 38], [511, 108, 1, 1, 33, 41], null , [465, 293, 5, 4, 29, 38], [511, 108, 1, 1, 33, 42], [442, 129, 3, 4, 35, 34], [422, 255, 2, 4, 28, 34], [488, 283, 5, 6, 34, 33], [4, 284, 4, 6, 27, 33], [361, 236, 2, 3, 35, 35], [473, 80, 1, 3, 29, 35], [511, 143, 1, 1, 39, 35], [511, 143, 1, 1, 26, 35], [30, 290, 3, 3, 35, 35], [361, 236, 2, 3, 28, 35], [191, 289, 5, 5, 34, 34], [318, 289, 4, 5, 27, 34], [361, 236, 2, 3, 35, 35], [473, 80, 1, 3, 29, 35], [511, 143, 1, 1, 39, 35], [511, 143, 1, 1, 26, 35], [432, 156, 3, 2, 35, 36], [98, 193, 2, 2, 28, 36], [455, 293, 5, 4, 34, 35], [490, 293, 4, 4, 27, 35], [98, 193, 2, 2, 35, 36], [511, 139, 1, 2, 29, 36], [511, 143, 1, 1, 39, 35], [511, 143, 1, 1, 26, 35], [50, 269, 3, 1, 35, 37], [82, 178, 2, 1, 28, 37], [141, 294, 5, 3, 34, 36], [456, 234, 4, 3, 27, 36], [82, 178, 2, 1, 35, 37], [511, 108, 1, 1, 29, 37], [511, 143, 1, 1, 39, 36], [511, 143, 1, 1, 26, 36], null , null , [294, 294, 5, 2, 34, 37], [116, 195, 4, 2, 27, 37], null , null , [511, 143, 1, 1, 39, 37], [511, 143, 1, 1, 26, 37], null , null , [289, 294, 5, 2, 34, 37], [313, 294, 4, 2, 27, 37], null , null , [511, 143, 1, 1, 39, 37], [511, 143, 1, 1, 26, 37], [274, 283, 12, 6, 27, 33], [379, 283, 7, 6, 29, 33], [28, 294, 11, 3, 27, 39], [285, 261, 11, 8, 27, 34], [511, 108, 1, 1, 36, 40], [511, 108, 1, 1, 27, 40], [12, 284, 4, 6, 30, 27], [181, 269, 6, 8, 29, 25], [390, 289, 3, 5, 31, 28], [493, 283, 5, 6, 30, 27], [357, 283, 8, 6, 38, 48], [344, 261, 9, 8, 38, 47], [20, 161, 6, 16, 32, 54], [8, 196, 8, 16, 31, 55], [61, 195, 10, 16, 42, 54], [422, 177, 12, 17, 41, 54], [358, 191, 18, 16, 31, 41], [100, 178, 20, 17, 30, 41], [172, 226, 13, 13, 27, 31], [351, 207, 15, 15, 26, 30], [173, 261, 4, 9, 40, 28], [367, 251, 6, 10, 39, 27], [306, 289, 4, 5, 27, 28], [491, 269, 6, 7, 26, 27], [266, 269, 39, 7, 22, 66], [445, 86, 6, 17, 32, 53], [454, 175, 8, 18, 31, 53], [435, 156, 6, 17, 34, 53], [504, 174, 8, 18, 33, 53], [115, 115, 7, 18, 35, 52], [26, 160, 9, 19, 34, 52], [30, 196, 7, 16, 35, 51], [286, 191, 9, 17, 34, 51], [61, 211, 7, 15, 35, 51], [107, 195, 9, 16, 34, 51], [371, 225, 7, 14, 35, 51], [451, 209, 9, 15, 34, 51], [428, 194, 6, 14, 35, 52], [45, 211, 8, 15, 34, 52], [306, 237, 7, 13, 34, 53], [447, 224, 9, 14, 33, 53], [462, 237, 6, 13, 34, 53], [363, 225, 8, 14, 33, 53], [491, 249, 6, 12, 33, 53], [275, 237, 8, 13, 32, 53], [26, 251, 7, 11, 31, 52], [382, 239, 9, 12, 30, 52], [400, 239, 8, 12, 30, 51], [427, 224, 10, 14, 29, 50], [221, 226, 9, 13, 29, 51], [377, 210, 11, 15, 28, 50], [209, 180, 11, 17, 27, 51], [365, 173, 13, 18, 26, 51], [462, 175, 10, 17, 28, 52], [472, 174, 12, 18, 27, 52], [304, 191, 8, 17, 30, 53], [100, 160, 10, 18, 29, 53], [129, 226, 15, 13, 42, 51], [196, 212, 17, 14, 41, 51], [39, 195, 12, 16, 42, 51], [181, 180, 14, 17, 41, 51], [231, 180, 10, 17, 42, 50], [256, 174, 12, 18, 41, 50], [328, 191, 8, 17, 42, 49], [435, 175, 10, 18, 41, 49], [312, 191, 8, 17, 42, 49], [484, 174, 10, 18, 41, 49], [320, 191, 8, 17, 42, 49], [494, 174, 10, 18, 41, 49], [268, 174, 8, 18, 42, 50], [74, 159, 10, 19, 41, 50], [92, 160, 8, 19, 42, 51], [266, 154, 10, 20, 41, 51], [504, 57, 8, 19, 42, 51], [432, 136, 10, 20, 41, 51], [35, 160, 9, 19, 42, 51], [255, 154, 11, 20, 41, 51], [452, 155, 10, 20, 42, 50], [474, 32, 12, 21, 41, 50], [371, 153, 12, 20, 42, 49], [403, 39, 14, 21, 41, 49], [62, 159, 12, 19, 42, 49], [70, 139, 14, 20, 41, 49], [352, 173, 13, 18, 42, 49], [420, 158, 15, 19, 41, 49], [348, 222, 15, 14, 42, 50], [81, 196, 17, 15, 41, 50], [144, 226, 15, 13, 42, 51], [213, 212, 17, 14, 41, 51], [279, 294, 5, 2, 32, 68], [230, 294, 7, 2, 31, 69], [279, 294, 5, 2, 32, 69], [230, 294, 7, 2, 31, 70], [250, 294, 6, 2, 34, 69], [66, 294, 8, 3, 33, 69], [445, 293, 5, 4, 37, 67], [124, 289, 7, 5, 36, 67], [510, 218, 2, 5, 40, 63], [8, 284, 4, 6, 39, 63], [510, 218, 2, 5, 40, 62], [460, 200, 2, 6, 41, 62], [510, 218, 2, 5, 41, 60], [460, 200, 2, 6, 42, 60], [510, 213, 2, 5, 39, 62], [37, 196, 2, 7, 40, 61], [510, 213, 2, 5, 39, 62], [37, 196, 2, 7, 40, 61], [381, 289, 3, 5, 37, 62], [458, 283, 5, 6, 36, 62], [510, 213, 2, 5, 37, 61], [112, 277, 4, 7, 36, 60], [161, 294, 4, 3, 32, 61], [143, 289, 6, 5, 31, 60], [161, 294, 4, 3, 31, 61], [6, 290, 6, 4, 30, 61], [299, 294, 5, 2, 29, 63], [6, 290, 6, 4, 29, 62], [304, 294, 5, 2, 27, 67], [435, 173, 7, 2, 26, 68], [279, 294, 5, 2, 28, 68], [237, 294, 7, 2, 27, 69], [279, 294, 5, 2, 30, 69], [230, 294, 7, 2, 29, 70], [250, 294, 6, 2, 46, 68], [66, 294, 8, 3, 45, 68], [510, 283, 2, 4, 55, 61], [8, 284, 4, 6, 54, 60], [24, 284, 3, 6, 51, 62], [148, 277, 4, 7, 51, 62], [450, 293, 5, 4, 47, 64], [365, 283, 7, 6, 46, 63], [284, 294, 5, 2, 45, 65], [414, 293, 6, 4, 45, 64], [156, 294, 5, 3, 45, 64], [97, 294, 6, 3, 44, 65], [408, 293, 6, 4, 44, 63], [110, 289, 7, 5, 43, 63], [109, 294, 6, 3, 43, 66], [447, 289, 8, 4, 42, 66], [244, 294, 6, 2, 43, 69], [66, 294, 8, 3, 42, 69], [244, 294, 6, 2, 43, 69], [66, 294, 8, 3, 42, 69], [244, 294, 6, 2, 44, 69], [66, 294, 8, 3, 43, 69], [20, 177, 6, 2, 46, 69], [471, 289, 8, 4, 45, 68], [131, 294, 5, 3, 48, 67], [155, 289, 6, 5, 48, 66], [396, 289, 3, 5, 51, 64], [330, 223, 3, 7, 52, 63], [387, 289, 3, 5, 52, 63], [509, 261, 3, 7, 53, 62], [378, 289, 3, 5, 54, 60], [509, 268, 3, 7, 55, 59], [323, 257, 2, 4, 55, 61], [0, 284, 4, 6, 54, 60], [336, 294, 10, 1, 27, 38], [16, 294, 12, 3, 26, 37], null , [4, 294, 12, 3, 26, 37], null , [346, 294, 7, 1, 28, 38], [39, 294, 9, 3, 27, 37], null , [82, 178, 2, 1, 43, 31], null , [510, 291, 2, 3, 43, 30], null , [98, 193, 2, 2, 43, 30], null , [227, 246, 2, 4, 43, 30], null , [271, 289, 5, 5, 41, 31], null , [511, 108, 1, 1, 43, 33], null , [316, 153, 15, 20, 39, 20], [481, 133, 17, 22, 38, 19], [474, 57, 30, 26, 26, 17], [422, 32, 32, 28, 25, 16], [236, 208, 15, 15, 41, 18], [403, 158, 17, 19, 40, 16], [283, 237, 8, 13, 43, 17], null , [72, 251, 15, 10, 41, 19], null , [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [251, 208, 15, 15, 41, 17], [82, 179, 16, 17, 41, 16], [239, 237, 9, 13, 41, 20], [71, 195, 10, 16, 40, 19], [159, 226, 13, 13, 43, 18], null , [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [320, 208, 13, 15, 43, 17], [66, 178, 16, 17, 41, 16], [239, 237, 9, 13, 41, 20], [71, 195, 10, 16, 40, 19], [301, 250, 11, 11, 41, 19], [165, 294, 4, 3, 49, 28], [403, 86, 21, 26, 26, 17], [486, 29, 23, 28, 25, 16], [490, 109, 22, 24, 32, 12], [427, 60, 24, 26, 31, 11], [398, 112, 22, 24, 32, 12], [475, 83, 24, 26, 31, 11], [434, 250, 10, 11, 38, 19], [216, 239, 11, 12, 38, 19], [0, 115, 22, 24, 32, 12], [291, 106, 24, 25, 31, 12], [434, 250, 10, 11, 38, 19], [216, 239, 11, 12, 38, 19], [420, 112, 22, 24, 32, 12], [451, 83, 24, 26, 31, 11], [473, 208, 13, 15, 41, 12], [166, 180, 15, 17, 40, 11], [445, 238, 11, 12, 38, 18], [197, 226, 12, 13, 38, 18], [185, 226, 12, 13, 40, 15], [243, 223, 13, 14, 39, 15], [266, 208, 14, 15, 32, 21], [120, 180, 16, 17, 31, 20], [468, 109, 22, 24, 32, 12], [403, 60, 24, 26, 31, 11], [434, 250, 10, 11, 38, 19], [216, 239, 11, 12, 38, 19], [460, 208, 13, 15, 40, 12], [276, 191, 10, 17, 42, 11], [90, 294, 7, 3, 31, 46], [53, 289, 9, 5, 30, 45], [111, 225, 3, 1, 31, 48], [146, 294, 5, 3, 30, 47], [262, 294, 6, 2, 32, 46], [455, 289, 8, 4, 31, 45], [392, 225, 7, 14, 31, 45], [295, 191, 9, 17, 30, 44], [456, 237, 6, 13, 32, 46], [16, 196, 7, 16, 31, 45], [354, 249, 7, 12, 31, 45], [503, 223, 9, 14, 30, 44], [44, 160, 4, 11, 34, 46], [486, 237, 5, 13, 33, 45], [508, 0, 3, 12, 33, 47], [419, 225, 5, 14, 32, 47], [494, 293, 4, 4, 31, 46], [410, 283, 6, 6, 30, 45], [169, 261, 4, 9, 34, 45], [361, 251, 6, 10, 33, 44], [406, 225, 7, 14, 31, 45], [98, 195, 9, 16, 30, 44], [468, 237, 6, 13, 32, 46], [0, 196, 8, 16, 31, 45], [230, 212, 6, 11, 32, 46], [291, 237, 8, 13, 31, 45], [509, 44, 3, 10, 32, 47], [507, 249, 5, 12, 31, 46], [195, 294, 2, 3, 36, 46], [78, 289, 8, 5, 31, 45], [451, 60, 3, 10, 32, 47], [502, 249, 5, 12, 31, 46], [195, 294, 2, 3, 36, 46], [78, 289, 8, 5, 31, 45], [510, 207, 2, 6, 32, 50], [44, 171, 4, 7, 31, 49], [332, 294, 2, 2, 33, 47], [498, 293, 4, 4, 32, 46], [195, 294, 2, 3, 36, 46], [78, 289, 8, 5, 31, 45], [511, 145, 1, 1, 33, 50], [486, 293, 4, 4, 31, 49], [376, 191, 2, 3, 32, 51], [370, 289, 4, 5, 31, 50], [376, 191, 2, 3, 32, 53], [502, 293, 4, 4, 31, 52], [511, 139, 1, 2, 33, 55], [241, 188, 3, 4, 32, 54], [442, 112, 3, 9, 32, 47], [497, 249, 5, 12, 31, 46], [195, 294, 2, 3, 36, 46], [78, 289, 8, 5, 31, 45], [37, 203, 2, 6, 32, 51], [385, 261, 4, 8, 31, 49], [511, 108, 1, 1, 31, 45], [363, 222, 3, 3, 30, 44], [244, 106, 47, 25, 48, 151], [403, 0, 19, 39, 63, 122], [0, 0, 122, 115, 17, 9], [462, 192, 47, 16, 48, 161], [122, 106, 122, 74, 14, 122], [124, 261, 8, 9, 0, 0], [82, 294, 8, 3, 0, 7], [277, 153, 22, 20, 0, 0], [5, 226, 22, 13, 0, 9], [84, 115, 31, 23, 0, 0], [227, 250, 31, 11, 0, 14], [187, 269, 6, 8, 0, 0], [447, 261, 8, 8, 0, 0], [487, 261, 8, 8, 0, 0], [412, 269, 7, 7, 0, 0], [454, 269, 7, 7, 0, 0], [11, 262, 7, 8, 0, 0], [18, 262, 7, 8, 0, 0], [506, 293, 4, 4, 0, 2], [369, 261, 8, 8, 0, 0], [404, 283, 6, 6, 0, 1], [377, 261, 8, 8, 0, 0], [423, 261, 8, 8, 0, 0], [44, 262, 6, 8, 0, 0], [463, 261, 8, 8, 0, 0], [471, 261, 8, 8, 0, 0], [479, 261, 8, 8, 0, 0], [433, 269, 7, 7, 0, 0], [440, 269, 7, 7, 0, 0], [38, 262, 6, 8, 0, 0], [485, 269, 6, 7, 0, 0], [504, 76, 8, 7, 0, 0], [455, 261, 8, 8, 0, 0], [115, 294, 6, 3, 0, 4], [353, 261, 8, 8, 0, 0], [503, 269, 6, 7, 0, 0], [0, 270, 6, 7, 0, 0], [117, 289, 7, 5, 0, 1], [115, 133, 7, 5, 0, 1], [502, 289, 7, 4, 0, 2], [102, 289, 8, 5, 0, 1], [86, 289, 8, 5, 0, 1], [94, 289, 8, 5, 0, 1], [473, 73, 1, 7, 0, 0], [177, 294, 4, 3, 0, 0], [506, 276, 5, 7, 0, 0], [0, 277, 5, 7, 0, 0], [25, 277, 5, 7, 0, 0], [30, 277, 5, 7, 0, 0], [199, 294, 2, 3, 0, 0], [140, 277, 4, 7, 0, 0], [100, 277, 4, 7, 0, 0], [169, 294, 4, 3, 0, 2], [291, 289, 5, 5, 0, 1], [473, 80, 1, 3, 0, 5], [271, 207, 5, 1, 0, 3], [511, 139, 1, 2, 0, 5], [60, 277, 5, 7, 0, 0], [121, 270, 5, 7, 0, 0], [85, 277, 5, 7, 0, 0], [366, 276, 5, 7, 0, 0], [11, 270, 5, 7, 0, 0], [45, 277, 5, 7, 0, 0], [66, 270, 5, 7, 0, 0], [311, 276, 5, 7, 0, 0], [46, 270, 5, 7, 0, 0], [416, 276, 5, 7, 0, 0], [491, 276, 5, 7, 0, 0], [508, 23, 1, 6, 0, 1], [473, 66, 1, 7, 0, 1], [156, 277, 4, 7, 0, 0], [440, 293, 5, 4, 0, 2], [152, 277, 4, 7, 0, 0], [21, 270, 5, 7, 0, 0], [467, 269, 6, 7, 0, 0], [61, 270, 5, 7, 0, 0], [146, 270, 5, 7, 0, 0], [106, 270, 5, 7, 0, 0], [176, 270, 5, 7, 0, 0], [171, 270, 5, 7, 0, 0], [451, 276, 5, 7, 0, 0], [466, 276, 5, 7, 0, 0], [126, 270, 5, 7, 0, 0], [333, 208, 3, 7, 0, 0], [5, 277, 5, 7, 0, 0], [141, 270, 5, 7, 0, 0], [40, 277, 5, 7, 0, 0], [95, 277, 5, 7, 0, 0], [90, 277, 5, 7, 0, 0], [121, 270, 5, 7, 0, 0], [80, 277, 5, 7, 0, 0], [75, 277, 5, 7, 0, 0], [70, 277, 5, 7, 0, 0], [65, 277, 5, 7, 0, 0], [101, 270, 5, 7, 0, 0], [55, 277, 5, 7, 0, 0], [35, 277, 5, 7, 0, 0], [20, 277, 5, 7, 0, 0], [81, 270, 5, 7, 0, 0], [15, 277, 5, 7, 0, 0], [10, 277, 5, 7, 0, 0], [333, 215, 3, 7, 0, 0], [501, 276, 5, 7, 0, 0], [180, 277, 3, 7, 0, 0], [126, 294, 5, 3, 0, 0], [271, 207, 5, 1, 0, 7], [193, 294, 2, 3, 0, 0], [226, 289, 5, 5, 0, 2], [496, 276, 5, 7, 0, 0], [206, 289, 5, 5, 0, 2], [486, 276, 5, 7, 0, 0], [181, 289, 5, 5, 0, 2], [108, 277, 4, 7, 0, 0], [438, 283, 5, 6, 0, 2], [476, 276, 5, 7, 0, 0], [511, 0, 1, 7, 0, 0], [253, 269, 5, 8, 0, 0], [176, 277, 4, 7, 0, 0], [460, 193, 2, 7, 0, 0], [166, 289, 5, 5, 0, 2], [161, 289, 5, 5, 0, 2], [201, 289, 5, 5, 0, 2], [463, 283, 5, 6, 0, 2], [448, 283, 5, 6, 0, 2], [211, 289, 5, 5, 0, 2], [221, 289, 5, 5, 0, 2], [227, 239, 3, 7, 0, 0], [276, 289, 5, 5, 0, 2], [281, 289, 5, 5, 0, 2], [296, 289, 5, 5, 0, 2], [236, 289, 5, 5, 0, 2], [433, 283, 5, 6, 0, 2], [301, 289, 5, 5, 0, 2], [116, 277, 4, 7, 0, 0], [473, 59, 1, 7, 0, 0], [120, 277, 4, 7, 0, 0], [268, 294, 6, 2, 0, 0], [286, 289, 5, 5, 0, 2], [243, 269, 5, 8, 0, 0], [446, 276, 5, 7, 0, 0], [441, 276, 5, 7, 0, 0], [436, 276, 5, 7, 0, 0], [431, 276, 5, 7, 0, 0], [426, 276, 5, 7, 0, 0], [421, 276, 5, 7, 0, 0], [411, 276, 5, 7, 0, 1], [406, 276, 5, 7, 0, 0], [166, 270, 5, 7, 0, 0], [401, 276, 5, 7, 0, 0], [509, 200, 3, 7, 0, 0], [396, 276, 5, 7, 0, 0], [98, 179, 2, 7, 0, 0], [381, 276, 5, 7, 0, 0], [376, 276, 5, 7, 0, 0], [371, 276, 5, 7, 0, 0], [216, 289, 5, 5, 0, 2], [6, 270, 5, 7, 0, 0], [361, 276, 5, 7, 0, 0], [356, 276, 5, 7, 0, 0], [351, 276, 5, 7, 0, 0], [346, 276, 5, 7, 0, 0], [341, 276, 5, 7, 0, 0], [238, 269, 5, 8, 0, 0], [336, 276, 5, 7, 0, 0], [331, 276, 5, 7, 0, 0], [428, 283, 5, 6, 0, 2], [326, 276, 5, 7, 0, 0], [321, 276, 5, 7, 0, 0], [188, 294, 3, 3, 0, 2], [233, 269, 5, 8, 0, 0], [316, 276, 5, 7, 0, 0], [98, 186, 2, 7, 0, 0], [306, 276, 5, 7, 0, 0], [301, 276, 5, 7, 0, 0], [296, 276, 5, 7, 0, 0], [291, 276, 5, 7, 0, 0], [478, 283, 5, 6, 0, 0], [473, 283, 5, 6, 0, 0], [286, 276, 5, 7, 0, 0], [383, 153, 6, 5, 0, 1], [151, 294, 5, 3, 0, 3], [281, 276, 5, 7, 0, 0], [223, 269, 5, 8, 0, 0], [511, 133, 1, 6, 0, 1], [176, 289, 5, 5, 0, 1], [171, 289, 5, 5, 0, 1], [61, 270, 5, 7, 0, 0], [231, 289, 5, 5, 0, 2], [276, 276, 5, 7, 0, 0], [271, 276, 5, 7, 0, 0], [266, 276, 5, 7, 0, 0], [350, 289, 4, 5, 0, 2], [128, 277, 4, 7, 0, 0], [402, 289, 3, 5, 0, 2], [217, 269, 6, 8, 0, 0], [468, 283, 5, 6, 0, 2], [171, 270, 5, 7, 0, 0], [181, 289, 5, 5, 0, 2], [171, 270, 5, 7, 0, 0], [166, 270, 5, 7, 0, 0], [161, 270, 5, 7, 0, 0], [186, 289, 5, 5, 0, 2], [11, 270, 5, 7, 0, 0], [314, 289, 4, 5, 0, 2], [156, 270, 5, 7, 0, 0], [346, 289, 4, 5, 0, 2], [151, 270, 5, 7, 0, 0], [136, 277, 4, 7, 0, 0], [141, 270, 5, 7, 0, 0], [342, 289, 4, 5, 0, 2], [136, 270, 5, 7, 0, 0], [338, 289, 4, 5, 0, 2], [405, 269, 7, 7, 0, 0], [196, 289, 5, 5, 0, 2], [126, 270, 5, 7, 0, 0], [310, 289, 4, 5, 0, 2], [121, 270, 5, 7, 0, 0], [201, 289, 5, 5, 0, 2], [116, 270, 5, 7, 0, 0], [322, 289, 4, 5, 0, 2], [111, 270, 5, 7, 0, 0], [498, 283, 4, 6, 0, 2], [106, 270, 5, 7, 0, 0], [206, 289, 5, 5, 0, 2], [101, 270, 5, 7, 0, 0], [393, 289, 3, 5, 0, 2], [96, 270, 5, 7, 0, 0], [16, 284, 4, 6, 0, 2], [91, 270, 5, 7, 0, 0], [86, 270, 5, 7, 0, 1], [81, 270, 5, 7, 0, 0], [236, 289, 5, 5, 0, 2], [211, 269, 6, 8, 0, 0], [422, 283, 6, 6, 0, 2], [71, 270, 5, 7, 0, 0], [326, 289, 4, 5, 0, 2], [447, 269, 7, 7, 0, 0], [241, 289, 5, 5, 0, 2], [361, 261, 8, 8, 0, 0], [386, 283, 6, 6, 0, 2], [51, 270, 5, 7, 0, 0], [256, 289, 5, 5, 0, 2], [473, 269, 6, 7, 0, 0], [137, 289, 6, 5, 0, 2], [144, 277, 4, 7, 0, 0], [366, 289, 4, 5, 0, 2], [36, 270, 5, 7, 0, 0], [362, 289, 4, 5, 0, 2], [461, 269, 6, 7, 0, 0], [261, 289, 5, 5, 0, 2], [26, 270, 5, 7, 0, 0], [354, 289, 4, 5, 0, 2], [32, 262, 6, 8, 0, 0], [445, 103, 6, 6, 0, 2], [16, 270, 5, 7, 0, 0], [16, 270, 5, 7, 0, 0], [205, 269, 6, 8, 0, 0], [398, 283, 6, 6, 0, 2], [481, 276, 5, 7, 0, 0], [471, 276, 5, 7, 0, 0], [456, 276, 5, 7, 0, 0], [456, 276, 5, 7, 0, 0], [391, 276, 5, 7, 0, 0], [391, 276, 5, 7, 0, 0], [386, 276, 5, 7, 0, 0], [386, 276, 5, 7, 0, 0], [497, 269, 6, 7, 0, 0], [424, 225, 3, 7, 0, 0], [131, 270, 5, 7, 0, 0], [426, 269, 7, 7, 0, 0], [41, 270, 5, 7, 0, 0], [31, 270, 5, 7, 0, 0], [419, 269, 7, 7, 0, 0], [454, 0, 32, 32, 0, 0], [422, 0, 32, 32, 0, 0], [122, 0, 281, 106, 0, 0], [431, 261, 8, 8, 0, 1], [121, 294, 5, 3, 0, 0], [460, 293, 5, 4, 0, 0], [511, 108, 1, 1, 0, 0], [146, 261, 7, 9, 0, 0], [64, 261, 10, 9, 0, 0], [389, 269, 8, 7, 0, 1], [445, 109, 23, 24, 0, 0], [98, 251, 11, 10, 0, 1], [138, 251, 9, 10, 1, 2], [98, 251, 11, 10, 0, 1], [401, 260, 11, 9, 0, 1]]
          , s = a.map(r);
        return e.ponyFrontManes = [null , [[{
            fill: s[0],
            outline: s[1]
        }], [, {
            fill: s[2],
            outline: s[3]
        }, {
            fill: s[4],
            outline: s[5]
        }, {
            fill: s[6],
            outline: s[7]
        }], [{
            fill: s[8],
            outline: s[9]
        }, {
            fill: s[10],
            outline: s[11]
        }], [, {
            fill: s[12],
            outline: s[13]
        }, {
            fill: s[14],
            outline: s[15]
        }], [{
            fill: s[16],
            outline: s[17]
        }, {
            fill: s[18],
            outline: s[19]
        }], [, , {
            fill: s[20],
            outline: s[21]
        }, {
            fill: s[22],
            outline: s[23]
        }]], [[{
            fill: s[24],
            outline: s[25]
        }], [, {
            fill: s[26],
            outline: s[27]
        }, {
            fill: s[28],
            outline: s[29]
        }, {
            fill: s[30],
            outline: s[31]
        }], [{
            fill: s[32],
            outline: s[33]
        }, {
            fill: s[34],
            outline: s[35]
        }], [, {
            fill: s[36],
            outline: s[37]
        }, {
            fill: s[38],
            outline: s[39]
        }], [{
            fill: s[40],
            outline: s[41]
        }, {
            fill: s[42],
            outline: s[43]
        }], [, , {
            fill: s[44],
            outline: s[45]
        }, {
            fill: s[46],
            outline: s[47]
        }]], [[{
            fill: s[48],
            outline: s[49]
        }], [{
            fill: s[50],
            outline: s[51]
        }, , , {
            fill: s[52],
            outline: s[53]
        }, {
            fill: s[54],
            outline: s[55]
        }]], [[{
            fill: s[56],
            outline: s[57]
        }], [, , , {
            fill: s[58],
            outline: s[59]
        }, {
            fill: s[60],
            outline: s[61]
        }]], [], [[{
            fill: s[62],
            outline: s[63]
        }], [, , , {
            fill: s[64],
            outline: s[65]
        }, {
            fill: s[66],
            outline: s[67]
        }]], [], [[{
            fill: s[68],
            outline: s[69]
        }], [, , , {
            fill: s[70],
            outline: s[71]
        }, {
            fill: s[72],
            outline: s[73]
        }]], []],
        e.ponyTopManes = [null , [[{
            fill: s[74],
            outline: s[75]
        }], [{
            fill: s[76],
            outline: s[77]
        }, {
            fill: s[78],
            outline: s[79]
        }, {
            fill: s[80],
            outline: s[81]
        }, {
            fill: s[82],
            outline: s[83]
        }], [{
            fill: s[84],
            outline: s[85]
        }, {
            fill: s[86],
            outline: s[87]
        }], [{
            fill: s[88],
            outline: s[89]
        }, {
            fill: s[90],
            outline: s[91]
        }, {
            fill: s[92],
            outline: s[93]
        }], [{
            fill: s[94],
            outline: s[95]
        }, {
            fill: s[96],
            outline: s[97]
        }], [{
            fill: s[98],
            outline: s[99]
        }, {
            fill: s[100],
            outline: s[101]
        }, {
            fill: s[102],
            outline: s[103]
        }, {
            fill: s[104],
            outline: s[105]
        }]], [[{
            fill: s[106],
            outline: s[107]
        }], [{
            fill: s[108],
            outline: s[109]
        }, {
            fill: s[110],
            outline: s[111]
        }, {
            fill: s[112],
            outline: s[113]
        }, {
            fill: s[114],
            outline: s[115]
        }], [{
            fill: s[116],
            outline: s[117]
        }, {
            fill: s[118],
            outline: s[119]
        }], [{
            fill: s[120],
            outline: s[121]
        }, {
            fill: s[122],
            outline: s[123]
        }, {
            fill: s[124],
            outline: s[125]
        }], [{
            fill: s[126],
            outline: s[127]
        }, {
            fill: s[128],
            outline: s[129]
        }], [{
            fill: s[130],
            outline: s[131]
        }, {
            fill: s[132],
            outline: s[133]
        }, {
            fill: s[134],
            outline: s[135]
        }, {
            fill: s[136],
            outline: s[137]
        }]], [[{
            fill: s[138],
            outline: s[139]
        }], [{
            fill: s[140],
            outline: s[141]
        }, {
            fill: s[142],
            outline: s[143]
        }, {
            fill: s[144],
            outline: s[145]
        }, {
            fill: s[146],
            outline: s[147]
        }, {
            fill: s[148],
            outline: s[149]
        }]], [[{
            fill: s[150],
            outline: s[151]
        }], [{
            fill: s[152],
            outline: s[153]
        }, {
            fill: s[154],
            outline: s[155]
        }, {
            fill: s[156],
            outline: s[157]
        }, {
            fill: s[158],
            outline: s[159]
        }, {
            fill: s[160],
            outline: s[161]
        }]], [[{
            fill: s[162],
            outline: s[163]
        }], [{
            fill: s[164],
            outline: s[165]
        }, {
            fill: s[166],
            outline: s[167]
        }, {
            fill: s[168],
            outline: s[169]
        }, {
            fill: s[170],
            outline: s[171]
        }]], [[{
            fill: s[172],
            outline: s[173]
        }], [{
            fill: s[174],
            outline: s[175]
        }, {
            fill: s[176],
            outline: s[177]
        }, {
            fill: s[178],
            outline: s[179]
        }, {
            fill: s[180],
            outline: s[181]
        }, {
            fill: s[182],
            outline: s[183]
        }]], [[{
            fill: s[184],
            outline: s[185]
        }], [{
            fill: s[186],
            outline: s[187]
        }, {
            fill: s[188],
            outline: s[189]
        }, {
            fill: s[190],
            outline: s[191]
        }, {
            fill: s[192],
            outline: s[193]
        }]], [[{
            fill: s[194],
            outline: s[195]
        }], [{
            fill: s[196],
            outline: s[197]
        }, {
            fill: s[198],
            outline: s[199]
        }, {
            fill: s[200],
            outline: s[201]
        }, {
            fill: s[202],
            outline: s[203]
        }, {
            fill: s[204],
            outline: s[205]
        }]], [[{
            fill: s[206],
            outline: s[207]
        }], [{
            fill: s[208],
            outline: s[209]
        }, {
            fill: s[210],
            outline: s[211]
        }, {
            fill: s[212],
            outline: s[213]
        }]]],
        e.ponyBehindManes = [null , [[{
            fill: s[214],
            outline: s[215]
        }], [, {
            fill: s[216],
            outline: s[217]
        }, {
            fill: s[218],
            outline: s[219]
        }, , {
            fill: s[220],
            outline: s[221]
        }], [{
            fill: s[222],
            outline: s[223]
        }, {
            fill: s[224],
            outline: s[225]
        }], [{
            fill: s[226],
            outline: s[227]
        }, {
            fill: s[228],
            outline: s[229]
        }, , {
            fill: s[230],
            outline: s[231]
        }], [{
            fill: s[232],
            outline: s[233]
        }, {
            fill: s[234],
            outline: s[235]
        }], [{
            fill: s[236],
            outline: s[237]
        }, {
            fill: s[238],
            outline: s[239]
        }, , , {
            fill: s[240],
            outline: s[241]
        }]], [], [[{
            fill: s[242],
            outline: s[243]
        }], [, , {
            fill: s[244],
            outline: s[245]
        }, , , {
            fill: s[246],
            outline: s[247]
        }]], [], [], [], [], [], [[{
            fill: s[248],
            outline: s[249]
        }], [, {
            fill: s[250],
            outline: s[251]
        }, {
            fill: s[252],
            outline: s[253]
        }, {
            fill: s[254],
            outline: s[255]
        }, {
            fill: s[256],
            outline: s[257]
        }, {
            fill: s[258],
            outline: s[259]
        }]]],
        e.ponyManes = [null , [[{
            fill: s[260],
            outline: s[261]
        }], [{
            fill: s[262],
            outline: s[263]
        }, {
            fill: s[264],
            outline: s[265]
        }, {
            fill: s[266],
            outline: s[267]
        }, {
            fill: s[268],
            outline: s[269]
        }, {
            fill: s[270],
            outline: s[271]
        }], [{
            fill: s[272],
            outline: s[273]
        }, {
            fill: s[274],
            outline: s[275]
        }], [{
            fill: s[276],
            outline: s[277]
        }, {
            fill: s[278],
            outline: s[279]
        }, {
            fill: s[280],
            outline: s[281]
        }, {
            fill: s[282],
            outline: s[283]
        }], [{
            fill: s[284],
            outline: s[285]
        }, {
            fill: s[286],
            outline: s[287]
        }], [{
            fill: s[288],
            outline: s[289]
        }, {
            fill: s[290],
            outline: s[291]
        }, {
            fill: s[292],
            outline: s[293]
        }, {
            fill: s[294],
            outline: s[295]
        }, {
            fill: s[296],
            outline: s[297]
        }]], [[{
            fill: s[298],
            outline: s[299]
        }], [{
            fill: s[300],
            outline: s[301]
        }, {
            fill: s[302],
            outline: s[303]
        }, {
            fill: s[304],
            outline: s[305]
        }, {
            fill: s[306],
            outline: s[307]
        }], [{
            fill: s[308],
            outline: s[309]
        }, {
            fill: s[310],
            outline: s[311]
        }], [{
            fill: s[312],
            outline: s[313]
        }, {
            fill: s[314],
            outline: s[315]
        }, {
            fill: s[316],
            outline: s[317]
        }], [{
            fill: s[318],
            outline: s[319]
        }, {
            fill: s[320],
            outline: s[321]
        }], [{
            fill: s[322],
            outline: s[323]
        }, {
            fill: s[324],
            outline: s[325]
        }, {
            fill: s[326],
            outline: s[327]
        }, {
            fill: s[328],
            outline: s[329]
        }]], [[{
            fill: s[330],
            outline: s[331]
        }], [{
            fill: s[332],
            outline: s[333]
        }, {
            fill: s[334],
            outline: s[335]
        }, {
            fill: s[336],
            outline: s[337]
        }, {
            fill: s[338],
            outline: s[339]
        }, {
            fill: s[340],
            outline: s[341]
        }, {
            fill: s[342],
            outline: s[343]
        }]], [[{
            fill: s[344],
            outline: s[345]
        }], [{
            fill: s[346],
            outline: s[347]
        }, {
            fill: s[348],
            outline: s[349]
        }, {
            fill: s[350],
            outline: s[351]
        }, {
            fill: s[352],
            outline: s[353]
        }, {
            fill: s[354],
            outline: s[355]
        }]], [[{
            fill: s[356],
            outline: s[357]
        }], [{
            fill: s[358],
            outline: s[359]
        }, {
            fill: s[360],
            outline: s[361]
        }, {
            fill: s[362],
            outline: s[363]
        }, {
            fill: s[364],
            outline: s[365]
        }]], [[{
            fill: s[366],
            outline: s[367]
        }], [{
            fill: s[368],
            outline: s[369]
        }, {
            fill: s[370],
            outline: s[371]
        }, {
            fill: s[372],
            outline: s[373]
        }, {
            fill: s[374],
            outline: s[375]
        }, {
            fill: s[376],
            outline: s[377]
        }]], [[{
            fill: s[378],
            outline: s[379]
        }], [{
            fill: s[380],
            outline: s[381]
        }, {
            fill: s[382],
            outline: s[383]
        }, {
            fill: s[384],
            outline: s[385]
        }, {
            fill: s[386],
            outline: s[387]
        }]], [[{
            fill: s[388],
            outline: s[389]
        }], [{
            fill: s[390],
            outline: s[391]
        }, {
            fill: s[392],
            outline: s[393]
        }, {
            fill: s[394],
            outline: s[395]
        }, {
            fill: s[396],
            outline: s[397]
        }, {
            fill: s[398],
            outline: s[399]
        }]], [[{
            fill: s[400],
            outline: s[401]
        }], [{
            fill: s[402],
            outline: s[403]
        }, {
            fill: s[404],
            outline: s[405]
        }, {
            fill: s[406],
            outline: s[407]
        }, {
            fill: s[408],
            outline: s[409]
        }, {
            fill: s[410],
            outline: s[411]
        }, {
            fill: s[412],
            outline: s[413]
        }]]],
        e.ponyBackFrontManes = [null , [[{
            fill: s[414],
            outline: s[415]
        }], [{
            fill: s[416],
            outline: s[417]
        }, {
            fill: s[418],
            outline: s[419]
        }, {
            fill: s[420],
            outline: s[421]
        }], [{
            fill: s[422],
            outline: s[423]
        }, {
            fill: s[424],
            outline: s[425]
        }], [{
            fill: s[426],
            outline: s[427]
        }, {
            fill: s[428],
            outline: s[429]
        }], [{
            fill: s[430],
            outline: s[431]
        }, {
            fill: s[432],
            outline: s[433]
        }], [{
            fill: s[434],
            outline: s[435]
        }, {
            fill: s[436],
            outline: s[437]
        }]], [], [[{
            fill: s[438],
            outline: s[439]
        }], [{
            fill: s[440],
            outline: s[441]
        }, {
            fill: s[442],
            outline: s[443]
        }, {
            fill: s[444],
            outline: s[445]
        }, {
            fill: s[446],
            outline: s[447]
        }]], [], [], [], []],
        e.ponyBackBehindManes = [null , [], [[{
            fill: s[448],
            outline: s[449]
        }, {
            fill: s[450],
            outline: s[451]
        }], [{
            fill: s[452],
            outline: s[453]
        }, {
            fill: s[454],
            outline: s[455]
        }, {
            fill: s[456],
            outline: s[457]
        }, {
            fill: s[458],
            outline: s[459]
        }, {
            fill: s[460],
            outline: s[461]
        }, {
            fill: s[462],
            outline: s[463]
        }]], [], [[{
            fill: s[464],
            outline: s[465]
        }, {
            fill: s[466],
            outline: s[467]
        }], [{
            fill: s[468],
            outline: s[469]
        }, {
            fill: s[470],
            outline: s[471]
        }, {
            fill: s[472],
            outline: s[473]
        }, {
            fill: s[474],
            outline: s[475]
        }, {
            fill: s[476],
            outline: s[477]
        }]], [[{
            fill: s[478],
            outline: s[479]
        }], [{
            fill: s[480],
            outline: s[481]
        }, {
            fill: s[482],
            outline: s[483]
        }]], [[{
            fill: s[484],
            outline: s[485]
        }], [{
            fill: s[486],
            outline: s[487]
        }, {
            fill: s[488],
            outline: s[489]
        }, {
            fill: s[490],
            outline: s[491]
        }, {
            fill: s[492],
            outline: s[493]
        }]], [[{
            fill: s[494],
            outline: s[495]
        }], [{
            fill: s[496],
            outline: s[497]
        }, {
            fill: s[498],
            outline: s[499]
        }, {
            fill: s[500],
            outline: s[501]
        }, {
            fill: s[502],
            outline: s[503]
        }]]],
        e.ponyBackManes = [null , [[{
            fill: s[414],
            outline: s[415]
        }], [{
            fill: s[416],
            outline: s[417]
        }, {
            fill: s[418],
            outline: s[419]
        }, {
            fill: s[420],
            outline: s[421]
        }], [{
            fill: s[422],
            outline: s[423]
        }, {
            fill: s[424],
            outline: s[425]
        }], [{
            fill: s[426],
            outline: s[427]
        }, {
            fill: s[428],
            outline: s[429]
        }], [{
            fill: s[430],
            outline: s[431]
        }, {
            fill: s[432],
            outline: s[433]
        }], [{
            fill: s[434],
            outline: s[435]
        }, {
            fill: s[436],
            outline: s[437]
        }]], [[{
            fill: s[448],
            outline: s[449]
        }, {
            fill: s[450],
            outline: s[451]
        }], [{
            fill: s[452],
            outline: s[453]
        }, {
            fill: s[454],
            outline: s[455]
        }, {
            fill: s[456],
            outline: s[457]
        }, {
            fill: s[458],
            outline: s[459]
        }, {
            fill: s[460],
            outline: s[461]
        }, {
            fill: s[462],
            outline: s[463]
        }]], [[{
            fill: s[438],
            outline: s[439]
        }], [{
            fill: s[440],
            outline: s[441]
        }, {
            fill: s[442],
            outline: s[443]
        }, {
            fill: s[444],
            outline: s[445]
        }, {
            fill: s[446],
            outline: s[447]
        }]], [[{
            fill: s[464],
            outline: s[465]
        }, {
            fill: s[466],
            outline: s[467]
        }], [{
            fill: s[468],
            outline: s[469]
        }, {
            fill: s[470],
            outline: s[471]
        }, {
            fill: s[472],
            outline: s[473]
        }, {
            fill: s[474],
            outline: s[475]
        }, {
            fill: s[476],
            outline: s[477]
        }]], [[{
            fill: s[478],
            outline: s[479]
        }], [{
            fill: s[480],
            outline: s[481]
        }, {
            fill: s[482],
            outline: s[483]
        }]], [[{
            fill: s[484],
            outline: s[485]
        }], [{
            fill: s[486],
            outline: s[487]
        }, {
            fill: s[488],
            outline: s[489]
        }, {
            fill: s[490],
            outline: s[491]
        }, {
            fill: s[492],
            outline: s[493]
        }]], [[{
            fill: s[494],
            outline: s[495]
        }], [{
            fill: s[496],
            outline: s[497]
        }, {
            fill: s[498],
            outline: s[499]
        }, {
            fill: s[500],
            outline: s[501]
        }, {
            fill: s[502],
            outline: s[503]
        }]]],
        e.ponyTails = [null , [[{
            fill: s[504],
            outline: s[505]
        }], [{
            fill: s[506],
            outline: s[507]
        }, {
            fill: s[508],
            outline: s[509]
        }, {
            fill: s[510],
            outline: s[511]
        }, {
            fill: s[512],
            outline: s[513]
        }], [{
            fill: s[514],
            outline: s[515]
        }, {
            fill: s[516],
            outline: s[517]
        }], [{
            fill: s[518],
            outline: s[519]
        }, {
            fill: s[520],
            outline: s[521]
        }], [{
            fill: s[522],
            outline: s[523]
        }, {
            fill: s[524],
            outline: s[525]
        }], [{
            fill: s[526],
            outline: s[527]
        }, {
            fill: s[528],
            outline: s[529]
        }]], [[{
            fill: s[530],
            outline: s[531]
        }], [{
            fill: s[532],
            outline: s[533]
        }, {
            fill: s[534],
            outline: s[535]
        }, {
            fill: s[536],
            outline: s[537]
        }, {
            fill: s[538],
            outline: s[539]
        }], [{
            fill: s[540],
            outline: s[541]
        }, {
            fill: s[542],
            outline: s[543]
        }], [{
            fill: s[544],
            outline: s[545]
        }, {
            fill: s[546],
            outline: s[547]
        }], [{
            fill: s[548],
            outline: s[549]
        }, {
            fill: s[550],
            outline: s[551]
        }], [{
            fill: s[552],
            outline: s[553]
        }, {
            fill: s[554],
            outline: s[555]
        }]], [[{
            fill: s[556],
            outline: s[557]
        }], [{
            fill: s[558],
            outline: s[559]
        }, {
            fill: s[560],
            outline: s[561]
        }, {
            fill: s[562],
            outline: s[563]
        }, {
            fill: s[564],
            outline: s[565]
        }, {
            fill: s[566],
            outline: s[567]
        }]], [[{
            fill: s[568],
            outline: s[569]
        }], [{
            fill: s[570],
            outline: s[571]
        }, {
            fill: s[572],
            outline: s[573]
        }, {
            fill: s[574],
            outline: s[575]
        }, {
            fill: s[576],
            outline: s[577]
        }, {
            fill: s[578],
            outline: s[579]
        }]], [[{
            fill: s[580],
            outline: s[581]
        }], [{
            fill: s[582],
            outline: s[583]
        }, {
            fill: s[584],
            outline: s[585]
        }, {
            fill: s[586],
            outline: s[587]
        }, {
            fill: s[588],
            outline: s[589]
        }]], [[{
            fill: s[590],
            outline: s[591]
        }], [{
            fill: s[592],
            outline: s[593]
        }, {
            fill: s[594],
            outline: s[595]
        }, {
            fill: s[596],
            outline: s[597]
        }, {
            fill: s[598],
            outline: s[599]
        }, {
            fill: s[600],
            outline: s[601]
        }]]],
        e.ponyNoses = [{
            mouth: s[602],
            muzzle: s[603],
            fangs: s[604]
        }, {
            mouth: s[605],
            muzzle: s[606],
            fangs: s[607]
        }, {
            mouth: s[608],
            muzzle: s[609],
            fangs: s[610]
        }, {
            mouth: s[611],
            muzzle: s[612],
            fangs: s[613]
        }, {
            mouth: s[614],
            muzzle: s[615],
            fangs: s[616]
        }, {
            mouth: s[617],
            muzzle: s[618],
            fangs: s[619]
        }, {
            mouth: s[620],
            muzzle: s[621],
            fangs: s[622]
        }],
        e.ponyEyeLeft = [null , {
            fill: s[623],
            line: s[625],
            iris: s[627],
            lashes: s[629]
        }, {
            fill: s[631],
            line: s[633],
            iris: s[635],
            lashes: s[637]
        }, {
            fill: s[639],
            line: s[641],
            iris: s[643],
            lashes: s[645]
        }, {
            fill: s[647],
            line: s[649],
            iris: s[651],
            lashes: s[653]
        }, {
            fill: s[655],
            line: s[657],
            iris: s[659],
            lashes: s[661]
        }, {
            fill: s[663],
            line: s[665],
            iris: s[667],
            lashes: s[669]
        }],
        e.ponyEyeRight = [null , {
            fill: s[624],
            line: s[626],
            iris: s[628],
            lashes: s[630]
        }, {
            fill: s[632],
            line: s[634],
            iris: s[636],
            lashes: s[638]
        }, {
            fill: s[640],
            line: s[642],
            iris: s[644],
            lashes: s[646]
        }, {
            fill: s[648],
            line: s[650],
            iris: s[652],
            lashes: s[654]
        }, {
            fill: s[656],
            line: s[658],
            iris: s[660],
            lashes: s[662]
        }, {
            fill: s[664],
            line: s[666],
            iris: s[668],
            lashes: s[670]
        }],
        e.ponyFreckles = [null , s[673], s[674], s[675], s[676]],
        e.ponyHorns = [null , [[{
            fill: s[677],
            outline: s[678]
        }]], [[{
            fill: s[679],
            outline: s[680]
        }]]],
        e.ponyWings = [null , [[{
            fill: s[681],
            outline: s[682]
        }]]],
        e.ponyLegFrontStand = [{
            fill: s[683],
            outline: s[684]
        }],
        e.ponyLegBackStand = [{
            fill: s[685],
            outline: s[686]
        }],
        e.ponyLegFrontTrot = [{
            fill: s[696],
            outline: s[697]
        }, {
            fill: s[698],
            outline: s[699]
        }, {
            fill: s[700],
            outline: s[701]
        }, {
            fill: s[702],
            outline: s[703]
        }, {
            fill: s[704],
            outline: s[705]
        }, {
            fill: s[706],
            outline: s[707]
        }, {
            fill: s[708],
            outline: s[709]
        }, {
            fill: s[710],
            outline: s[711]
        }, {
            fill: s[712],
            outline: s[713]
        }, {
            fill: s[714],
            outline: s[715]
        }, {
            fill: s[716],
            outline: s[717]
        }, {
            fill: s[718],
            outline: s[719]
        }, {
            fill: s[720],
            outline: s[721]
        }, {
            fill: s[722],
            outline: s[723]
        }, {
            fill: s[724],
            outline: s[725]
        }, {
            fill: s[726],
            outline: s[727]
        }],
        e.ponyLegBackTrot = [{
            fill: s[728],
            outline: s[729]
        }, {
            fill: s[730],
            outline: s[731]
        }, {
            fill: s[732],
            outline: s[733]
        }, {
            fill: s[734],
            outline: s[735]
        }, {
            fill: s[736],
            outline: s[737]
        }, {
            fill: s[738],
            outline: s[739]
        }, {
            fill: s[740],
            outline: s[741]
        }, {
            fill: s[742],
            outline: s[743]
        }, {
            fill: s[744],
            outline: s[745]
        }, {
            fill: s[746],
            outline: s[747]
        }, {
            fill: s[748],
            outline: s[749]
        }, {
            fill: s[750],
            outline: s[751]
        }, {
            fill: s[752],
            outline: s[753]
        }, {
            fill: s[754],
            outline: s[755]
        }, {
            fill: s[756],
            outline: s[757]
        }, {
            fill: s[758],
            outline: s[759]
        }],
        e.ponyBobsBodyTrot = [{
            x: 0,
            y: 1
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 1
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: 0
        }],
        e.ponyBobsHeadTrot = [{
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 0,
            y: -1
        }, {
            x: 0,
            y: 0
        }],
        e.ponyFetlocksFrontStand = [{
            fill: s[760],
            outline: s[761]
        }],
        e.ponyFetlocksFrontTrot = [{
            fill: s[762],
            outline: s[763]
        }, {
            fill: s[764],
            outline: s[765]
        }, {
            fill: s[766],
            outline: s[767]
        }, {
            fill: s[768],
            outline: s[769]
        }, {
            fill: s[770],
            outline: s[771]
        }, {
            fill: s[772],
            outline: s[773]
        }, {
            fill: s[774],
            outline: s[775]
        }, {
            fill: s[776],
            outline: s[777]
        }, {
            fill: s[778],
            outline: s[779]
        }, {
            fill: s[780],
            outline: s[781]
        }, {
            fill: s[782],
            outline: s[783]
        }, {
            fill: s[784],
            outline: s[785]
        }, {
            fill: s[786],
            outline: s[787]
        }, {
            fill: s[788],
            outline: s[789]
        }, {
            fill: s[790],
            outline: s[791]
        }, {
            fill: s[792],
            outline: s[793]
        }],
        e.ponyFetlocksBackStand = [{
            fill: s[794],
            outline: s[795]
        }],
        e.ponyFetlocksBackTrot = [{
            fill: s[796],
            outline: s[797]
        }, {
            fill: s[798],
            outline: s[799]
        }, {
            fill: s[800],
            outline: s[801]
        }, {
            fill: s[802],
            outline: s[803]
        }, {
            fill: s[804],
            outline: s[805]
        }, {
            fill: s[806],
            outline: s[807]
        }, {
            fill: s[808],
            outline: s[809]
        }, {
            fill: s[810],
            outline: s[811]
        }, {
            fill: s[812],
            outline: s[813]
        }, {
            fill: s[814],
            outline: s[815]
        }, {
            fill: s[816],
            outline: s[817]
        }, {
            fill: s[818],
            outline: s[819]
        }, {
            fill: s[820],
            outline: s[821]
        }, {
            fill: s[822],
            outline: s[823]
        }, {
            fill: s[824],
            outline: s[825]
        }, {
            fill: s[826],
            outline: s[827]
        }],
        e.ponyFaceAccessories = [null , [[{
            fill: s[829],
            outline: s[830],
            extra: s[828]
        }]], [[{
            fill: s[831],
            outline: s[832]
        }]], [[{
            fill: s[834],
            outline: s[835],
            extra: s[833]
        }]]],
        e.ponyEarAccessories = [null , [[{
            fill: s[836],
            outline: s[837]
        }]], [[{
            fill: s[838],
            outline: s[839]
        }]], [[{
            fill: s[840],
            outline: s[841]
        }]], [[{
            fill: s[842],
            outline: s[843]
        }]], [[{
            fill: s[844],
            outline: s[845]
        }, {
            fill: s[846],
            outline: s[847]
        }]]],
        e.ponyHeadAccessories = [null , [[{
            fill: s[848],
            outline: s[849]
        }]], [[{
            fill: s[850],
            outline: s[851]
        }], [{
            fill: s[852],
            outline: s[853]
        }, {
            fill: s[854],
            outline: s[855]
        }, {
            fill: s[856],
            outline: s[857]
        }, {
            fill: s[858],
            outline: s[859]
        }], [{
            fill: s[860],
            outline: s[861]
        }, {
            fill: s[862],
            outline: s[863]
        }, {
            fill: s[864],
            outline: s[865]
        }, {
            fill: s[866],
            outline: s[867]
        }], [{
            fill: s[868],
            outline: s[869]
        }, {
            fill: s[870],
            outline: s[871]
        }, {
            fill: s[872],
            outline: s[873]
        }, {
            fill: s[874],
            outline: s[875]
        }]], [[{
            fill: s[876],
            outline: s[877]
        }], [{
            fill: s[878],
            outline: s[879]
        }, {
            fill: s[880],
            outline: s[881]
        }], [{
            fill: s[882],
            outline: s[883]
        }, {
            fill: s[884],
            outline: s[885]
        }, {
            fill: s[886],
            outline: s[887]
        }], [{
            fill: s[888],
            outline: s[889]
        }, {
            fill: s[890],
            outline: s[891]
        }, {
            fill: s[892],
            outline: s[893]
        }, {
            fill: s[894],
            outline: s[895]
        }], [{
            fill: s[896],
            outline: s[897]
        }, {
            fill: s[898],
            outline: s[899]
        }, {
            fill: s[900],
            outline: s[901]
        }]]],
        e.ponyNeckAccessories = [null , [[{
            fill: s[902],
            outline: s[903]
        }], [{
            fill: s[904],
            outline: s[905]
        }, {
            fill: s[906],
            outline: s[907]
        }]], [[{
            fill: s[908],
            outline: s[909]
        }], [{
            fill: s[910],
            outline: s[911]
        }, {
            fill: s[912],
            outline: s[913]
        }], [{
            fill: s[914],
            outline: s[915]
        }, {
            fill: s[916],
            outline: s[917]
        }, {
            fill: s[918],
            outline: s[919]
        }, {
            fill: s[920],
            outline: s[921]
        }], [{
            fill: s[922],
            outline: s[923]
        }, {
            fill: s[924],
            outline: s[925]
        }]], [[{
            fill: s[926],
            outline: s[927]
        }], [{
            fill: s[928],
            outline: s[929]
        }, {
            fill: s[930],
            outline: s[931]
        }], [{
            fill: s[932],
            outline: s[933]
        }, {
            fill: s[934],
            outline: s[935]
        }, {
            fill: s[936],
            outline: s[937]
        }], [{
            fill: s[938],
            outline: s[939]
        }, {
            fill: s[940],
            outline: s[941]
        }, {
            fill: s[942],
            outline: s[943]
        }, {
            fill: s[944],
            outline: s[945]
        }, {
            fill: s[946],
            outline: s[947]
        }, {
            fill: s[948],
            outline: s[949]
        }], [{
            fill: s[950],
            outline: s[951]
        }, {
            fill: s[952],
            outline: s[953]
        }, {
            fill: s[954],
            outline: s[955]
        }]]],
        e.ponyFacialHair = [null , [[{
            fill: s[956],
            outline: s[957]
        }]]],
        e.font = [{
            code: 0,
            sprite: s[969]
        }, {
            code: 9786,
            sprite: s[970]
        }, {
            code: 9787,
            sprite: s[971]
        }, {
            code: 9829,
            sprite: s[972]
        }, {
            code: 9830,
            sprite: s[973]
        }, {
            code: 9827,
            sprite: s[974]
        }, {
            code: 9824,
            sprite: s[975]
        }, {
            code: 8226,
            sprite: s[976]
        }, {
            code: 9688,
            sprite: s[977]
        }, {
            code: 9675,
            sprite: s[978]
        }, {
            code: 9689,
            sprite: s[979]
        }, {
            code: 9794,
            sprite: s[980]
        }, {
            code: 9792,
            sprite: s[981]
        }, {
            code: 9834,
            sprite: s[982]
        }, {
            code: 9835,
            sprite: s[983]
        }, {
            code: 9788,
            sprite: s[984]
        }, {
            code: 9658,
            sprite: s[985]
        }, {
            code: 9668,
            sprite: s[986]
        }, {
            code: 8597,
            sprite: s[987]
        }, {
            code: 8252,
            sprite: s[988]
        }, {
            code: 182,
            sprite: s[989]
        }, {
            code: 167,
            sprite: s[990]
        }, {
            code: 9644,
            sprite: s[991]
        }, {
            code: 8616,
            sprite: s[992]
        }, {
            code: 8593,
            sprite: s[993]
        }, {
            code: 8595,
            sprite: s[994]
        }, {
            code: 8594,
            sprite: s[995]
        }, {
            code: 8592,
            sprite: s[996]
        }, {
            code: 8735,
            sprite: s[997]
        }, {
            code: 8596,
            sprite: s[998]
        }, {
            code: 9650,
            sprite: s[999]
        }, {
            code: 9660,
            sprite: s[1e3]
        }, {
            code: 33,
            sprite: s[1001]
        }, {
            code: 34,
            sprite: s[1002]
        }, {
            code: 35,
            sprite: s[1003]
        }, {
            code: 36,
            sprite: s[1004]
        }, {
            code: 37,
            sprite: s[1005]
        }, {
            code: 38,
            sprite: s[1006]
        }, {
            code: 39,
            sprite: s[1007]
        }, {
            code: 40,
            sprite: s[1008]
        }, {
            code: 41,
            sprite: s[1009]
        }, {
            code: 42,
            sprite: s[1010]
        }, {
            code: 43,
            sprite: s[1011]
        }, {
            code: 44,
            sprite: s[1012]
        }, {
            code: 45,
            sprite: s[1013]
        }, {
            code: 46,
            sprite: s[1014]
        }, {
            code: 47,
            sprite: s[1015]
        }, {
            code: 48,
            sprite: s[1016]
        }, {
            code: 49,
            sprite: s[1017]
        }, {
            code: 50,
            sprite: s[1018]
        }, {
            code: 51,
            sprite: s[1019]
        }, {
            code: 52,
            sprite: s[1020]
        }, {
            code: 53,
            sprite: s[1021]
        }, {
            code: 54,
            sprite: s[1022]
        }, {
            code: 55,
            sprite: s[1023]
        }, {
            code: 56,
            sprite: s[1024]
        }, {
            code: 57,
            sprite: s[1025]
        }, {
            code: 58,
            sprite: s[1026]
        }, {
            code: 59,
            sprite: s[1027]
        }, {
            code: 60,
            sprite: s[1028]
        }, {
            code: 61,
            sprite: s[1029]
        }, {
            code: 62,
            sprite: s[1030]
        }, {
            code: 63,
            sprite: s[1031]
        }, {
            code: 64,
            sprite: s[1032]
        }, {
            code: 65,
            sprite: s[1033]
        }, {
            code: 66,
            sprite: s[1034]
        }, {
            code: 67,
            sprite: s[1035]
        }, {
            code: 68,
            sprite: s[1036]
        }, {
            code: 69,
            sprite: s[1037]
        }, {
            code: 70,
            sprite: s[1038]
        }, {
            code: 71,
            sprite: s[1039]
        }, {
            code: 72,
            sprite: s[1040]
        }, {
            code: 73,
            sprite: s[1041]
        }, {
            code: 74,
            sprite: s[1042]
        }, {
            code: 75,
            sprite: s[1043]
        }, {
            code: 76,
            sprite: s[1044]
        }, {
            code: 77,
            sprite: s[1045]
        }, {
            code: 78,
            sprite: s[1046]
        }, {
            code: 79,
            sprite: s[1047]
        }, {
            code: 80,
            sprite: s[1048]
        }, {
            code: 81,
            sprite: s[1049]
        }, {
            code: 82,
            sprite: s[1050]
        }, {
            code: 83,
            sprite: s[1051]
        }, {
            code: 84,
            sprite: s[1052]
        }, {
            code: 85,
            sprite: s[1053]
        }, {
            code: 86,
            sprite: s[1054]
        }, {
            code: 87,
            sprite: s[1055]
        }, {
            code: 88,
            sprite: s[1056]
        }, {
            code: 89,
            sprite: s[1057]
        }, {
            code: 90,
            sprite: s[1058]
        }, {
            code: 91,
            sprite: s[1059]
        }, {
            code: 92,
            sprite: s[1060]
        }, {
            code: 93,
            sprite: s[1061]
        }, {
            code: 94,
            sprite: s[1062]
        }, {
            code: 95,
            sprite: s[1063]
        }, {
            code: 96,
            sprite: s[1064]
        }, {
            code: 97,
            sprite: s[1065]
        }, {
            code: 98,
            sprite: s[1066]
        }, {
            code: 99,
            sprite: s[1067]
        }, {
            code: 100,
            sprite: s[1068]
        }, {
            code: 101,
            sprite: s[1069]
        }, {
            code: 102,
            sprite: s[1070]
        }, {
            code: 103,
            sprite: s[1071]
        }, {
            code: 104,
            sprite: s[1072]
        }, {
            code: 105,
            sprite: s[1073]
        }, {
            code: 106,
            sprite: s[1074]
        }, {
            code: 107,
            sprite: s[1075]
        }, {
            code: 108,
            sprite: s[1076]
        }, {
            code: 109,
            sprite: s[1077]
        }, {
            code: 110,
            sprite: s[1078]
        }, {
            code: 111,
            sprite: s[1079]
        }, {
            code: 112,
            sprite: s[1080]
        }, {
            code: 113,
            sprite: s[1081]
        }, {
            code: 114,
            sprite: s[1082]
        }, {
            code: 115,
            sprite: s[1083]
        }, {
            code: 116,
            sprite: s[1084]
        }, {
            code: 117,
            sprite: s[1085]
        }, {
            code: 118,
            sprite: s[1086]
        }, {
            code: 119,
            sprite: s[1087]
        }, {
            code: 120,
            sprite: s[1088]
        }, {
            code: 121,
            sprite: s[1089]
        }, {
            code: 122,
            sprite: s[1090]
        }, {
            code: 123,
            sprite: s[1091]
        }, {
            code: 124,
            sprite: s[1092]
        }, {
            code: 125,
            sprite: s[1093]
        }, {
            code: 126,
            sprite: s[1094]
        }, {
            code: 8962,
            sprite: s[1095]
        }, {
            code: 199,
            sprite: s[1096]
        }, {
            code: 252,
            sprite: s[1097]
        }, {
            code: 233,
            sprite: s[1098]
        }, {
            code: 226,
            sprite: s[1099]
        }, {
            code: 228,
            sprite: s[1100]
        }, {
            code: 224,
            sprite: s[1101]
        }, {
            code: 229,
            sprite: s[1102]
        }, {
            code: 231,
            sprite: s[1103]
        }, {
            code: 234,
            sprite: s[1104]
        }, {
            code: 235,
            sprite: s[1105]
        }, {
            code: 232,
            sprite: s[1106]
        }, {
            code: 239,
            sprite: s[1107]
        }, {
            code: 238,
            sprite: s[1108]
        }, {
            code: 236,
            sprite: s[1109]
        }, {
            code: 196,
            sprite: s[1110]
        }, {
            code: 197,
            sprite: s[1111]
        }, {
            code: 201,
            sprite: s[1112]
        }, {
            code: 230,
            sprite: s[1113]
        }, {
            code: 198,
            sprite: s[1114]
        }, {
            code: 244,
            sprite: s[1115]
        }, {
            code: 246,
            sprite: s[1116]
        }, {
            code: 242,
            sprite: s[1117]
        }, {
            code: 251,
            sprite: s[1118]
        }, {
            code: 249,
            sprite: s[1119]
        }, {
            code: 255,
            sprite: s[1120]
        }, {
            code: 214,
            sprite: s[1121]
        }, {
            code: 220,
            sprite: s[1122]
        }, {
            code: 248,
            sprite: s[1123]
        }, {
            code: 163,
            sprite: s[1124]
        }, {
            code: 216,
            sprite: s[1125]
        }, {
            code: 215,
            sprite: s[1126]
        }, {
            code: 402,
            sprite: s[1127]
        }, {
            code: 225,
            sprite: s[1128]
        }, {
            code: 237,
            sprite: s[1129]
        }, {
            code: 243,
            sprite: s[1130]
        }, {
            code: 250,
            sprite: s[1131]
        }, {
            code: 241,
            sprite: s[1132]
        }, {
            code: 209,
            sprite: s[1133]
        }, {
            code: 170,
            sprite: s[1134]
        }, {
            code: 186,
            sprite: s[1135]
        }, {
            code: 191,
            sprite: s[1136]
        }, {
            code: 174,
            sprite: s[1137]
        }, {
            code: 172,
            sprite: s[1138]
        }, {
            code: 189,
            sprite: s[1139]
        }, {
            code: 188,
            sprite: s[1140]
        }, {
            code: 161,
            sprite: s[1141]
        }, {
            code: 171,
            sprite: s[1142]
        }, {
            code: 187,
            sprite: s[1143]
        }, {
            code: 1040,
            sprite: s[1144]
        }, {
            code: 1072,
            sprite: s[1145]
        }, {
            code: 1041,
            sprite: s[1146]
        }, {
            code: 1073,
            sprite: s[1147]
        }, {
            code: 1042,
            sprite: s[1148]
        }, {
            code: 1074,
            sprite: s[1149]
        }, {
            code: 1043,
            sprite: s[1150]
        }, {
            code: 1075,
            sprite: s[1151]
        }, {
            code: 1044,
            sprite: s[1152]
        }, {
            code: 1076,
            sprite: s[1153]
        }, {
            code: 1045,
            sprite: s[1154]
        }, {
            code: 1077,
            sprite: s[1155]
        }, {
            code: 1025,
            sprite: s[1156]
        }, {
            code: 1105,
            sprite: s[1157]
        }, {
            code: 1046,
            sprite: s[1158]
        }, {
            code: 1078,
            sprite: s[1159]
        }, {
            code: 1047,
            sprite: s[1160]
        }, {
            code: 1079,
            sprite: s[1161]
        }, {
            code: 1048,
            sprite: s[1162]
        }, {
            code: 1080,
            sprite: s[1163]
        }, {
            code: 1049,
            sprite: s[1164]
        }, {
            code: 1081,
            sprite: s[1165]
        }, {
            code: 1050,
            sprite: s[1166]
        }, {
            code: 1082,
            sprite: s[1167]
        }, {
            code: 1051,
            sprite: s[1168]
        }, {
            code: 1083,
            sprite: s[1169]
        }, {
            code: 1052,
            sprite: s[1170]
        }, {
            code: 1084,
            sprite: s[1171]
        }, {
            code: 1053,
            sprite: s[1172]
        }, {
            code: 1085,
            sprite: s[1173]
        }, {
            code: 1054,
            sprite: s[1174]
        }, {
            code: 1086,
            sprite: s[1175]
        }, {
            code: 1055,
            sprite: s[1176]
        }, {
            code: 1087,
            sprite: s[1177]
        }, {
            code: 1056,
            sprite: s[1178]
        }, {
            code: 1088,
            sprite: s[1179]
        }, {
            code: 1057,
            sprite: s[1180]
        }, {
            code: 1089,
            sprite: s[1181]
        }, {
            code: 1058,
            sprite: s[1182]
        }, {
            code: 1090,
            sprite: s[1183]
        }, {
            code: 1059,
            sprite: s[1184]
        }, {
            code: 1091,
            sprite: s[1185]
        }, {
            code: 1060,
            sprite: s[1186]
        }, {
            code: 1092,
            sprite: s[1187]
        }, {
            code: 1061,
            sprite: s[1188]
        }, {
            code: 1093,
            sprite: s[1189]
        }, {
            code: 1062,
            sprite: s[1190]
        }, {
            code: 1094,
            sprite: s[1191]
        }, {
            code: 1063,
            sprite: s[1192]
        }, {
            code: 1095,
            sprite: s[1193]
        }, {
            code: 1064,
            sprite: s[1194]
        }, {
            code: 1096,
            sprite: s[1195]
        }, {
            code: 1065,
            sprite: s[1196]
        }, {
            code: 1097,
            sprite: s[1197]
        }, {
            code: 1066,
            sprite: s[1198]
        }, {
            code: 1098,
            sprite: s[1199]
        }, {
            code: 1067,
            sprite: s[1200]
        }, {
            code: 1099,
            sprite: s[1201]
        }, {
            code: 1068,
            sprite: s[1202]
        }, {
            code: 1100,
            sprite: s[1203]
        }, {
            code: 1069,
            sprite: s[1204]
        }, {
            code: 1101,
            sprite: s[1205]
        }, {
            code: 1070,
            sprite: s[1206]
        }, {
            code: 1102,
            sprite: s[1207]
        }, {
            code: 1071,
            sprite: s[1208]
        }, {
            code: 1103,
            sprite: s[1209]
        }, {
            code: 260,
            sprite: s[1210]
        }, {
            code: 261,
            sprite: s[1211]
        }, {
            code: 262,
            sprite: s[1212]
        }, {
            code: 263,
            sprite: s[1213]
        }, {
            code: 280,
            sprite: s[1214]
        }, {
            code: 281,
            sprite: s[1215]
        }, {
            code: 323,
            sprite: s[1216]
        }, {
            code: 324,
            sprite: s[1217]
        }, {
            code: 346,
            sprite: s[1218]
        }, {
            code: 347,
            sprite: s[1219]
        }, {
            code: 377,
            sprite: s[1220]
        }, {
            code: 378,
            sprite: s[1221]
        }, {
            code: 379,
            sprite: s[1222]
        }, {
            code: 380,
            sprite: s[1223]
        }, {
            code: 321,
            sprite: s[1224]
        }, {
            code: 322,
            sprite: s[1225]
        }, {
            code: 211,
            sprite: s[1226]
        }, {
            code: 12484,
            sprite: s[1227]
        }, {
            code: 362,
            sprite: s[1228]
        }, {
            code: 363,
            sprite: s[1229]
        }, {
            code: 12471,
            sprite: s[1230]
        }],
        e.butterfly = [s[1242], s[1243], s[1244], s[1245]],
        e.ponyEyeshadow = s[671],
        e.ponyEyeshadowShine = s[672],
        e.ponyBody = {
            fill: s[687],
            outline: s[688]
        },
        e.ponyHead = {
            fill: s[689],
            outline: s[690]
        },
        e.ponyEar = {
            fill: s[691],
            outline: s[692]
        },
        e.ponyEar2 = {
            fill: s[693],
            outline: s[694]
        },
        e.ponyShadow = s[695],
        e.tree = {
            stump: s[958],
            trunk: s[959],
            crown: s[960],
            stumpShadow: s[961],
            shadow: s[962]
        },
        e.apple = {
            color: s[963],
            shadow: s[964]
        },
        e.pumpkin = {
            color: s[965],
            shadow: s[966]
        },
        e.rock = {
            color: s[967],
            shadow: s[968]
        },
        e.bubble = s[1231],
        e.bubble2 = s[1232],
        e.cloud = s[1233],
        e.heartemote = s[1234],
        e.nipple = s[1235],
        e.nipple2 = s[1236],
        e.pixel = s[1237],
        e.pizzaemote = s[1238],
        e.pumpkinemote = s[1239],
        e.rockemote = s[1240],
        e.sign = s[1241],
        e.tileSheet = i["tiles.png"],
        e.tileSprite = {
            x: 0,
            y: 0,
            w: 32,
            h: 24,
            ox: 0,
            oy: 0
        },
        e.spriteSheets = [{
            src: o,
            sprites: s
        }, {
            src: e.tileSheet,
            sprites: [e.tileSprite]
        }],
        n.exports
    }),
    System.registerDynamic("47", ["20"], !0, function(t, e, n) {
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
            frontHooves: [null , r.ponyFetlocksFrontStand],
            backHooves: [null , r.ponyFetlocksBackStand]
        },
        e.trot = {
            name: "trot",
            frames: 16,
            framesShift: 8,
            headBobs: r.ponyBobsHeadTrot,
            bodyBobs: r.ponyBobsBodyTrot,
            frontLegs: r.ponyLegFrontTrot,
            backLegs: r.ponyLegBackTrot,
            frontHooves: [null , r.ponyFetlocksFrontTrot],
            backHooves: [null , r.ponyFetlocksBackTrot]
        },
        e.animations = [e.stand, e.trot],
        n.exports
    }),
    System.registerDynamic("43", ["21", "22", "24", "20", "3b", "47"], !0, function(t, e, n) {
        "use strict";
        function r() {
            return {
                animation: y.stand,
                animationFrame: 0,
                blinkFrame: 1
            }
        }
        function i(t, n, r, i, s, u) {
            var f = r.animation
              , p = r.animationFrame % f.frames
              , h = (r.animationFrame + f.framesShift) % f.frames
              , g = d.at(f.headBobs, p)
              , y = d.at(f.bodyBobs, p)
              , b = d.at(f.frontHooves, n.frontHooves && n.frontHooves.type)
              , _ = d.at(f.backHooves, n.backHooves && n.backHooves.type);
            i -= e.PONY_WIDTH / 2,
            s -= e.PONY_HEIGHT;
            var w = i + y.x
              , x = s + y.y
              , $ = i + g.x
              , E = s + g.y
              , S = i - 3
              , M = s - 1;
            t.drawSprite(v.ponyShadow, m.SHADOW_COLOR, i, s),
            l(t, v.ponyBackBehindManes, n.backMane, $, E),
            n.mane && n.mane.type ? l(t, v.ponyHeadAccessories, n.headAccessory, $, E) : l(t, v.ponyHeadAccessories, n.headAccessory, $ - 1, E + 4),
            a(t, d.at(f.frontLegs, h), n.darkCoatFill, n.darkCoatOutline, S, M),
            a(t, d.at(b, h), n.darkFrontHoovesFill, n.darkFrontHoovesOutline, S, M),
            a(t, d.at(f.backLegs, h), n.darkCoatFill, n.darkCoatOutline, S, M),
            a(t, d.at(_, h), n.darkBackHoovesFill, n.darkBackHoovesOutline, S, M),
            l(t, v.ponyTails, n.tail, w, x),
            a(t, v.ponyBody, n.coatFill, n.coatOutline, w, x),
            a(t, d.at(f.frontLegs, p), n.coatFill, n.coatOutline, i, s),
            n.frontHooves && n.frontHooves.fills && n.frontHooves.outlines && a(t, d.at(b, p), n.frontHooves.fills[0], n.frontHooves.outlines[0], i, s),
            a(t, d.at(f.backLegs, p), n.coatFill, n.coatOutline, i, s),
            n.backHooves && n.backHooves.fills && n.backHooves.outlines && a(t, d.at(_, p), n.backHooves.fills[0], n.backHooves.outlines[0], i, s),
            c(t, n.cm, w + 43, x + 49, u && n.cmFlip),
            l(t, v.ponyWings, n.wings, w, x),
            l(t, v.ponyNeckAccessories, n.neckAccessory, w, x),
            o(t, n, $, E, r.blinkFrame, u)
        }
        function o(t, e, n, r, i, o) {
            void 0 === i && (i = 1),
            l(t, v.ponyBehindManes, e.mane, n, r),
            a(t, v.ponyEar2, e.coatFill, e.coatOutline, n, r),
            a(t, v.ponyHead, e.coatFill, e.coatOutline, n, r),
            l(t, v.ponyFacialHair, e.facialHair, n, r);
            var s = d.at(v.ponyNoses, e.muzzle);
            t.drawSprite(s.mouth, m.WHITE, n, r),
            t.drawSprite(s.muzzle, e.coatOutline, n, r),
            e.fangs && t.drawSprite(s.fangs, m.WHITE, n, r);
            var c = 0 | e.freckles;
            o && 3 === c ? c = 4 : o && 4 === c && (c = 3),
            t.drawSprite(d.at(v.ponyFreckles, c), e.frecklesColor, n, r),
            e.eyeshadow && (t.drawSprite(v.ponyEyeshadow, e.eyeshadowColor, n, r),
            t.drawSprite(v.ponyEyeshadowShine, m.SHINES_COLOR, n, r));
            var f = o ? e.eyeColorRight : e.eyeColorLeft
              , p = o ? e.eyeColorLeft : e.eyeColorRight
              , h = o ? e.eyeOpennessRight : e.eyeOpennessLeft
              , g = o ? e.eyeOpennessLeft : e.eyeOpennessRight;
            u(t, d.at(v.ponyEyeLeft, Math.max(i, h)), e, f, n, r),
            u(t, d.at(v.ponyEyeRight, Math.max(i, g)), e, p, n, r),
            l(t, v.ponyBackFrontManes, e.backMane, n, r),
            l(t, v.ponyTopManes, e.mane, n, r),
            l(t, v.ponyHorns, e.horn, n, r),
            a(t, v.ponyEar, e.coatFill, e.coatOutline, n, r),
            l(t, v.ponyFaceAccessories, e.faceAccessory, n, r),
            l(t, v.ponyEarAccessories, e.earAccessory, n, r),
            l(t, v.ponyFrontManes, e.mane, n, r)
        }
        function a(t, e, n, r, i, o) {
            e && e.fill && t.drawSprite(e.fill, n, i, o),
            e && e.outline && t.drawSprite(e.outline, r, i, o),
            e && e.extra && t.drawSprite(e.extra, m.WHITE, i, o)
        }
        function s(t, e, n, r, i, o) {
            e && e.forEach(function(e, s) {
                return a(t, e, d.at(n, s), d.at(r, s), i, o)
            })
        }
        function l(t, e, n, r, i) {
            if (n) {
                var o = d.at(e, n.type);
                o && s(t, d.at(o, n.pattern), n.fills, n.outlines, r, i)
            }
        }
        function u(t, e, n, r, i, o) {
            e && (t.drawSprite(e.fill, n.eyeWhites, i, o),
            t.drawSprite(e.iris, r, i, o),
            t.drawSprite(e.line, m.BLACK, i, o),
            n.eyelashes && t.drawSprite(e.lashes, n.coatOutline, i, o))
        }
        function c(t, e, n, r, i) {
            if (e)
                for (var o = 0; o < h.CM_SIZE; o++)
                    for (var a = 0; a < h.CM_SIZE; a++) {
                        var s = i ? e[h.CM_SIZE - a - 1 + o * h.CM_SIZE] : e[a + o * h.CM_SIZE];
                        s && t.drawRect(s, n + a, r + o, 1, 1)
                    }
        }
        function f(t, e, n, r, o, a) {
            void 0 === a && (a = !1);
            try {
                i({
                    drawSprite: function(e, n, r, i) {
                        g.drawColoredSprite(t, e, n ? n.css() : "white", r, i)
                    },
                    drawRect: function(e, n, r, i, o) {
                        t.fillStyle = e ? e.css() : "white",
                        t.fillRect(n, r, i, o)
                    }
                }, e, n, r, o, a)
            } catch (t) {
                console.error(t)
            }
        }
        function p(t, e, n, r, o, a) {
            void 0 === a && (a = !1);
            try {
                i(t, e, n, r, o, a)
            } catch (t) {
                console.error(t)
            }
        }
        var h = t("21")
          , d = t("22")
          , m = t("24")
          , v = t("20")
          , g = t("3b")
          , y = t("47");
        return e.PONY_WIDTH = 80,
        e.PONY_HEIGHT = 70,
        e.BLINK_FRAMES = [2, 6, 6, 4, 2],
        e.createDefaultPonyState = r,
        e.drawPony2D = f,
        e.drawPonyGL = p,
        n.exports
    }),
    System.registerDynamic("c1", ["21", "31", "43", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        var r = t("21")
          , i = t("31")
          , o = t("43")
          , a = t("ponytownapp settings")
          , s = function() {
            function t(t, e, n) {
                this.$location = t,
                this.gameService = e,
                this.model = n,
                this.maxNameLength = r.PLAYER_NAME_MAX_LENGTH,
                this.state = o.createDefaultPonyState(),
                this.authError = a.errorMessage
            }
            return Object.defineProperty(t.prototype, "joining", {
                get: function() {
                    return this.gameService.joining
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "pony", {
                get: function() {
                    return this.model.pony
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "ponies", {
                get: function() {
                    return this.model.ponies
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "canNew", {
                get: function() {
                    return this.ponies.length < r.PONY_LIMIT
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.new = function() {
                this.model.selectPony(i.createDefaultPony()),
                this.$location.url("/character")
            }
            ,
            t.prototype.select = function(t) {
                this.model.selectPony(t)
            }
            ,
            t.$inject = ["$location", "gameService", "model"],
            t
        }();
        return Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = s,
        n.exports
    }),
    System.registerDynamic("c2", [], !0, function(t, e, n) {
        return n.exports = '<div class="text-center heading"><img src="/images/logo.png" width="574" height="130" class="hidden-xs"><img src="/images/logo-small.png" width="287" height="65" class="hidden-lg hidden-md hidden-sm"></div><div class="center-block home-content"><div class="form-group"><sign-in-box ng-if="!vm.model.account"></sign-in-box></div><div ng-if="vm.authError" class="form-group"><div class="alert alert-danger">{{vm.authError}}</div></div><div ng-if="vm.model.account" class="form"><div class="form-group"><div class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" ng-disabled="vm.joining" class="form-control text-center"><div class="input-group-btn"><a href="/character" ng-class="{ disabled: vm.joining }" class="btn btn-default">edit</a><div uib-dropdown style="width: auto;" class="btn-group"><button type="button" ng-disabled="!vm.ponies.length || vm.joining" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="i in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(i)">{{i.name}}</a></li><li ng-if="vm.canNew"><a href="#" ng-click="vm.new()" class="text-center"><em>new pony</em></a></li></ul></div></div></div></div><div class="form-group"><character-preview pony="vm.pony" state="vm.state"></character-preview></div><div class="form-group text-center"><play-box></play-box></div></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div>',
        n.exports
    }),
    System.registerDynamic("c3", [], !0, function(t, e, n) {
        return n.exports = '<h1>About</h1><div class="row"><div class="col-md-6"><p class="lead">A game of ponies building a town\n</p><h2>Keyboard shortcuts</h2><ul><li><b>movement </b> - <kbd><i class="fa fa-arrow-up"></i></kbd> <kbd><i class="fa fa-arrow-left"></i></kbd> <kbd><i class="fa fa-arrow-down"></i></kbd> <kbd><i class="fa fa-arrow-right"></i></kbd> or <kbd><b>W</b></kbd> <kbd><b>A</b></kbd> <kbd><b>S</b></kbd> <kbd><b>D</b></kbd></li><li><b>chat</b><ul><li><kbd><b>enter</b></kbd> to open chat box and send a message</li><li><kbd><b>esc</b></kbd> to cancel the message</li></ul></li><li><b>zoom (1x, 2x, 3x, 4x) </b> - <kbd><b>P</b></kbd></li><li><b>change lighting (day, sunset, night) </b> - <kbd><b>T</b></kbd></li><li><b>hide all text</b> - <kbd><b>F2</b></kbd></li><li><b>fullscreen</b> - <kbd><b>F11</b></kbd></li></ul><h2>Emotes</h2><p>You can use emotes in chat by typings their name surrounded by colons <samp>:apple:</samp>\nor by using unicode characters assigned to them. Available emotes:\n</p><ul><li>:face: - ツ</li><li>:derp: - シ</li><li>:heart: - ❤</li><li>:rock: - ⽯</li><li>:apple: - 🍎</li><li>:pizza: - 🍕</li><li>:pumpkin: - 🎃</li></ul><h2>Technology</h2><p>The entire game is written in <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a>,\na typed superset of JavaScript that compiles to plain JavaScript.\nServer side code is running on <a href="https://nodejs.org/en/" target="_blank">Node.js</a> server with WebSockets for communication.\nUser interface is built using <a href="https://angularjs.org/" target="_blank">Angular.js</a> framework and \nthe game itself is using WebGL for rendering graphics.\n</p><h2>The Team</h2><h3 id="agamnentzar">Agamnentzar</h3>\n<p><a href="http://agamnentzar.deviantart.com/">deviantart</a> | <a href="http://agamnentzar.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Designer</li>\n<li>Programmer</li>\n<li>Artist</li>\n</ul>\n<h3 id="shino">Shino</h3>\n<p><a href="http://shinodage.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="chiramii-chan">Chiramii-chan</h3>\n<p><a href="http://chiramii-chan.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="velenor">Velenor</h3>\n<p><a href="http://lovepaddles.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<h3 id="disastral">Disastral</h3>\n<p><a href="http://askdisastral.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<h3 id="cyberpon3">CyberPon3</h3>\n<p><a href="http://cyberpon3.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Programmer</li>\n</ul>\n<h2>Other contributors</h2><p><strong>OtakuAP</strong> - <a href="http://otakuap.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n<li>Animator</li>\n</ul>\n<p><strong>Velvet-Frost</strong> - <a href="http://velvet-frost.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Jet7Wave</strong> - <a href="http://jetwave.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Meno</strong> - <a href="http://menojar.deviantart.com/">deviantart</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n<p><strong>Lalieri</strong> - <a href="http://lalieri.tumblr.com/">tumblr</a></p>\n<ul>\n<li>Artist</li>\n</ul>\n</div><div class="col-md-6"><h2>Changelog</h2><h4 id="v0-13-2">v0.13.2</h4>\n<ul>\n<li>Adjusted day-night cycle length and night darkness intensity</li>\n<li>Adjusted dead zone for gamepads</li>\n<li>Added slow walking with <kbd>shift</kbd> key</li>\n<li>Fixed disconnect issues on mobile devices</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-13-1">v0.13.1</h4>\n<ul>\n<li>Fixed multiple servers not connecting properly</li>\n</ul>\n<h4 id="v0-13-0">v0.13.0</h4>\n<ul>\n<li>Added touch and gamepad controls</li>\n<li>Added day-night cycle</li>\n<li>Added game time clock</li>\n<li>Added option to leave game without having to reload the page</li>\n<li>Added support for multiple servers</li>\n<li>Fixed horn outlines</li>\n<li>Fixed zoom repeating when holding zoom key</li>\n<li>Fixed getting logged out when closing browser</li>\n</ul>\n<h4 id="v0-12-1">v0.12.1</h4>\n<ul>\n<li>Added back lighting test shortcut <kbd>T</kbd></li>\n<li>Added keyboard shortcut <kbd>F2</kbd> for hiding all text messages</li>\n<li>Fixed issue with setting color and opennes independently for left and right eye</li>\n<li>Fixed issue with incorrect pony name text placement</li>\n<li>Fixed being able to spawn inside a tree</li>\n</ul>\n<h4 id="v0-12-0">v0.12.0</h4>\n<ul>\n<li>Added trees</li>\n<li>Added pumpkins</li>\n<li>Added eyeshadow</li>\n<li>Added hats</li>\n<li>Added tie</li>\n<li>Added reading glasses</li>\n<li>Added flower ear accessory</li>\n<li>Added new face markings</li>\n<li>Added new emotes</li>\n<li>Changed map design</li>\n<li>Fixed head accessories placement without hair</li>\n<li>Fixed not being able to set 6th color on 2nd mane</li>\n</ul>\n<h4 id="v0-11-4">v0.11.4</h4>\n<ul>\n<li>Added new scarf pattern</li>\n<li>Improved rendering performance</li>\n<li>Fixed not being able to see name of a pony when they are saying something</li>\n<li>Fixed issues with server restart</li>\n<li>Fixed fetlocks in trot animation</li>\n<li>Fixed issues with font and emote spacing</li>\n</ul>\n<h4 id="v0-11-3">v0.11.3</h4>\n<ul>\n<li>Added scarf accessory</li>\n<li>Added option for hiding all chat messages with russian text</li>\n<li>Added list of rules and in-development notice</li>\n<li>Fixed some issues with chat messages</li>\n<li>Fixed multiple issues with manes</li>\n<li>Fixed issue with fetlocks</li>\n</ul>\n<h4 id="v0-11-2">v0.11.2</h4>\n<ul>\n<li>Added announcements support</li>\n<li>Added hide background switch for pony creator</li>\n<li>Removed stones from the spawning area</li>\n</ul>\n<h4 id="v0-11-1">v0.11.1</h4>\n<ul>\n<li>Added polish characters to pixel font</li>\n<li>Fixed sign-in with facebook</li>\n<li>Fixed cancelling character edit</li>\n<li>Fixed clouds</li>\n<li>Fixed spelling mistake</li>\n<li>Fixed buttmark position</li>\n</ul>\n<h4 id="v0-11-0">v0.11.0</h4>\n<ul>\n<li>Reworked sign-in and account system</li>\n<li>Added cyrillic characters to pixel font</li>\n<li>Added logos</li>\n<li>Added optional swear filter</li>\n<li>Added more mane styles</li>\n<li>Improved networking performance</li>\n</ul>\n<h4 id="v0-10-1">v0.10.1</h4>\n<ul>\n<li>Fixed connection resetting every 10 seconds when not in game</li>\n</ul>\n<h4 id="v0-10-0">v0.10.0</h4>\n<ul>\n<li>Added back butterflies</li>\n<li>Improved networking performance</li>\n<li>Fixed not initialized errors</li>\n<li>Fixed deleting character not updating character list</li>\n<li>Fixed cursor and camera offset errors on screens with high pixel density</li>\n<li>Fixed styling issue in chat box</li>\n</ul>\n<h4 id="v0-9-8">v0.9.8</h4>\n<ul>\n<li>Improved connection performance</li>\n<li>Fixed issues with chat box focus on Safari and Edge</li>\n</ul>\n<h4 id="v0-9-7">v0.9.7</h4>\n<ul>\n<li>Added chat buttons</li>\n<li>Improved connection performance</li>\n<li>Fixed automatically signing in after signing up for new account</li>\n<li>Fixed character name not saving if joining the game from home screen</li>\n</ul>\n<h4 id="v0-9-6">v0.9.6</h4>\n<ul>\n<li>Added logging off after 15 minutes of no activity</li>\n<li>Improved performance of joining to the game</li>\n<li>Fixed multiple issues with character creator on IE11</li>\n</ul>\n<h4 id="v0-9-5">v0.9.5</h4>\n<ul>\n<li>Fixed non-flippable buttmarks</li>\n<li>Fixed some rate limiting issues</li>\n</ul>\n<h4 id="v0-9-4">v0.9.4</h4>\n<ul>\n<li>Removed ability to log into the same character multiple times</li>\n<li>Added back rocks</li>\n<li>Added displaying of WegGL initialization error</li>\n</ul>\n<h4 id="v0-9-3">v0.9.3</h4>\n<ul>\n<li>Removed rocks</li>\n</ul>\n<h4 id="v0-9-2">v0.9.2</h4>\n<ul>\n<li>Removed butterflies</li>\n<li>Removed debug code</li>\n</ul>\n<h4 id="v0-9-1">v0.9.1</h4>\n<ul>\n<li>Fixed issue with rendering when value is out of range</li>\n</ul>\n<h4 id="v0-9-0">v0.9.0</h4>\n<ul>\n<li>Added shading to trot animation</li>\n<li>Added new mane styles</li>\n<li>Added mane color patterns</li>\n<li>Added option for non-flippable butt marks</li>\n<li>Added account system</li>\n<li>Added saving characters on server side</li>\n<li>Fixed eye colors switching sides  when turning left and right</li>\n<li>Fixed performance issues with rendering</li>\n<li>Fixed shader code not working on some low end devices</li>\n<li>Fixed errors when character has invalid values set for sprite types</li>\n<li>Fixed being able to use transparency for character colors</li>\n<li>Fixed chat not limiting characters properly</li>\n</ul>\n<h4 id="v0-8-0">v0.8.0</h4>\n<ul>\n<li>Added character customization in game</li>\n<li>Added eye blinking</li>\n<li>Added character selection on home screen</li>\n</ul>\n<h4 id="v0-7-0">v0.7.0</h4>\n<ul>\n<li>Removed spawn command</li>\n<li>Added character creation prototype</li>\n</ul>\n<h4 id="v0-6-1">v0.6.1</h4>\n<ul>\n<li>Fixed mouse not working in the game</li>\n</ul>\n<h4 id="v0-6-0">v0.6.0</h4>\n<ul>\n<li>Added AFK indicator</li>\n<li>Updated styles</li>\n<li>Fixed wrong cursor position on retina displays and zommed in pages</li>\n<li>Fixed emoticon parsing</li>\n<li>Fixed issue on mobile devices</li>\n</ul>\n<h4 id="v0-5-0">v0.5.0</h4>\n<ul>\n<li>Added butterfies</li>\n<li>Added apples</li>\n<li>Added apple emote to chat</li>\n<li>Fixed login form not displaying on mobile safari</li>\n</ul>\n</div></div>',
        n.exports
    }),
    System.registerDynamic("c4", [], !0, function(t, e, n) {
        return n.exports = '<div ng-init="vm.init()" class="row"><div class="col-md-6 text-center"><div style="max-width: 400px; margin: auto;" class="input-group"><input type="text" ng-model="vm.pony.name" placeholder="name of your character" maxlength="{{vm.maxNameLength}}" autofocus class="form-control text-center"><div class="input-group-btn"><button type="button" ng-click="vm.new()" ng-disabled="!vm.canNew" class="btn btn-default">new</button><div uib-dropdown class="btn-group"><button type="button" ng-disabled="!vm.ponies.length" uib-dropdown-toggle class="btn btn-default"><span class="caret"></span></button><ul uib-dropdown-menu class="dropdown-menu-right"><li ng-repeat="p in vm.ponies | orderBy:\'name\' track by $index"><a href="#" ng-click="vm.select(p)">{{p.name}}</a></li></ul></div><button type="button" ng-if="!vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = true" title="delete pony" class="btn btn-danger"><i class="fa fa-trash"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.deleting = false" uib-tooltip="cancel" class="btn btn-danger"><i class="fa fa-fw fa-times"></i></button><button type="button" ng-if="vm.deleting" ng-disabled="!vm.canDelete" ng-click="vm.delete()" uib-tooltip="confirm delete" class="btn btn-success"><i class="fa fa-fw fa-check"></i></button></div></div><div style="margin: 30px 0 20px 0;" class="text-center"><character-preview pony="vm.pony" state="vm.state" no-background="vm.noBackground"></character-preview></div><div class="form-group text-center"><button ng-disabled="!vm.canRevert" ng-click="vm.revert()" class="btn btn-lg btn-default">Revert</button> <button ng-disabled="!vm.canSave" ng-click="vm.save()" class="btn btn-lg btn-default">Save</button></div><div style="max-width: 400px;" class="center-block"><play-box label="Save and Play" error="vm.error"></play-box></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>General rules</h4><ul class="text-muted"><li>Be kind to others</li><li>Don\'t spam</li><li>Don\'t modify the game with hacks or scripts</li><li>Don\'t encourage spamming or hacking</li></ul></div><div style="max-width: 400px;" class="rules center-block text-left"><h4>Notice</h4><p class="text-muted">This game is very early in development. There might be bugs and occasional downtimes.</p><p class="text-muted">Please do not redistribute any of the game files or code.</p></div></div><div style="min-height: 500px;" class="col-md-6"><uib-tabset type="pills" active="vm.activeTab" ng-if="vm.loaded"><uib-tab heading="body"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">General options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.pony.customOutlines" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">allow custom outlines</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Animation</label></div><div class="col-sm-8"><div class="btn-group"><label ng-repeat="a in ::vm.animations" ng-model="vm.activeAnimation" uib-btn-radio="::$index" class="btn btn-primary">{{::a.name}}</label></div> <button ng-if="vm.canExport" ng-click="vm.export()" class="btn btn-default">export</button></div></div><div class="row form-group"><div class="col-sm-4"><check-box icon="fa-play" checked="vm.playAnimation" class="lock-box"></check-box><label class="control-label">Frame</label></div><div class="col-sm-8"><input type="number" ng-model="vm.state.animationFrame" ng-disabled="vm.playAnimation" min="0" class="form-control"></div></div><hr><fill-outline label="Body color" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" outline-locked="vm.pony.lockCoatOutline" outline-hidden="!vm.customOutlines"></fill-outline><hr><sprite-set-selection label="Horn" base="vm.baseCoatColor" set="vm.pony.horn" sets="::vm.horns" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Wings" base="vm.baseCoatColor" set="vm.pony.wings" sets="::vm.wings" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Front hooves" base="vm.baseCoatColor" set="vm.pony.frontHooves" sets="::vm.frontHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><sprite-set-selection label="Back hooves" base="vm.baseCoatColor" set="vm.pony.backHooves" sets="::vm.backHooves" outline-hidden="!vm.customOutlines" compact="true"></sprite-set-selection><hr><div class="row form-group"><div class="col-sm-12 text-center"><label class="control-label text-muted">Butt mark</label></div></div><div class="row form-group"><div class="col-sm-7"><button ng-click="vm.clearCM()" title="Clear all" class="btn btn-primary"><i class="fa fa-fw fa-trash"></i></button> <div class="btn-group"><label ng-model="vm.brushType" uib-btn-radio="\'eraser\'" title="Eraser" class="btn btn-primary"><i class="fa fa-fw fa-eraser"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'eyedropper\'" title="Eyedropper" class="btn btn-primary"><i class="fa fa-fw fa-eyedropper"></i></label><label ng-model="vm.brushType" uib-btn-radio="\'brush\'" title="Brush" class="btn btn-primary"><i class="fa fa-fw fa-paint-brush"></i></label></div></div><div class="col-sm-5"><color-picker color="vm.brush"></color-picker></div></div><div class="row form-group"><div class="col-sm-12 text-center"><bitmap-box bitmap="vm.pony.cm" tool="vm.brushType" color="vm.brush" width="::vm.cmSize" height="::vm.cmSize"></bitmap-box></div></div><div class="row form-group"><div class="col-sm-12 text-center"><check-box icon="fa-check" checked="vm.pony.cmFlip"></check-box><label style="margin-left: 10px; vertical-align: top;" class="form-control-static text-muted">don\'t flip mark on the other side</label></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Other options</label></div><div class="col-sm-8"><div class="clearfix"><check-box icon="fa-check" checked="vm.noBackground" class="pull-left"></check-box><label style="margin-left: 10px;" class="form-control-static text-muted">hide background</label></div></div></div></div></div></uib-tab><uib-tab heading="mane"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Mane" base="vm.baseHairColor" set="vm.pony.mane" sets="::vm.manes" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Back mane" base="vm.baseHairColor" set="vm.pony.backMane" sets="::vm.backManes" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="tail"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Tail" base="vm.baseHairColor" set="vm.pony.tail" sets="::vm.tails" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="face"><div class="panel container-fluid character-tab"><div class="form-horizontal"><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eyelashes</label></div><div class="col-sm-8"><div class="btn-group"><label ng-model="vm.pony.eyelashes" uib-btn-radio="0" class="btn btn-primary">no</label><label ng-model="vm.pony.eyelashes" uib-btn-radio="1" class="btn btn-primary">yes</label></div></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorRight" changed="vm.eyeColorLockChanged(vm.pony.lockEyeColor)"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyeColor" icon="fa-lock" changed="vm.eyeColorLockChanged($value)" class="lock-box"></check-box><label class="control-label">Eye color (left)</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeColorLeft" is-disabled="vm.pony.lockEyeColor"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Eye whites color</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeWhites"></color-picker></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.lockEyes" icon="fa-lock" changed="vm.eyeOpennessChanged($value)" class="lock-box"></check-box><label class="control-label">Eye openness</label></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessRight" min="1" max="6" step="1" ng-change="vm.eyeOpennessChanged(vm.pony.lockEyes)" class="form-control"></div><div class="col-sm-4 col-xs-6"><input type="number" ng-model="vm.pony.eyeOpennessLeft" min="1" max="6" step="1" ng-disabled="vm.pony.lockEyes" class="form-control"></div></div><div class="row form-group"><div class="col-sm-4"><check-box checked="vm.pony.eyeshadow" icon="fa-check" class="lock-box"></check-box><label class="control-label">Eyeshadow</label></div><div class="col-sm-8"><color-picker color="vm.pony.eyeshadowColor" is-disabled="!vm.pony.eyeshadow"></color-picker></div></div><hr><div class="row form-group"><div class="col-sm-4"><label class="control-label">Expression</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.muzzle" sprites="vm.muzzles" fill="vm.pony.coatFill" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Fangs</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.fangs" sprites="vm.fangs" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings</label></div><div class="col-sm-8"><sprite-selection selected="vm.pony.freckles" sprites="vm.freckles" fill="vm.pony.frecklesColor" outline="vm.pony.coatOutline" circle="vm.pony.coatFill"></sprite-selection></div></div><div class="row form-group"><div class="col-sm-4"><label class="control-label">Markings color</label></div><div class="col-sm-8"><color-picker color="vm.pony.frecklesColor" is-disabled="!vm.pony.freckles"></color-picker></div></div><hr><sprite-set-selection label="Facial hair" base="vm.baseHairColor" set="vm.pony.facialHair" sets="::vm.facialHair" outline-hidden="!vm.customOutlines"></sprite-set-selection></div></div></uib-tab><uib-tab heading="other"><div class="panel container-fluid character-tab"><div class="form-horizontal"><sprite-set-selection label="Head accessories" set="vm.pony.headAccessory" sets="::vm.headAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Ear accessories" set="vm.pony.earAccessory" sets="::vm.earAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Face accessories" set="vm.pony.faceAccessory" sets="::vm.faceAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection><hr><sprite-set-selection label="Neck accessories" set="vm.pony.neckAccessory" sets="::vm.neckAccessories" outline-hidden="!vm.customOutlines" non-lockable="true"></sprite-set-selection></div></div></uib-tab></uib-tabset></div></div>',
        n.exports
    }),
    System.registerDynamic("c5", [], !0, function(t, e, n) {
        return n.exports = '<div ng-init="vm.init()"><h1>Account settings</h1></div><div class="row"><div class="col-md-6"><form name="form" ng-submit="vm.submit()" style="max-width: 400px;" class="form"><div class="form-group"><h3>Account details</h3></div><div class="form-group"><label for="account-name" class="control-label">name</label><input id="account-name" type="text" ng-model="vm.data.name" required maxlength="{{vm.nameMaxLength}}" class="form-control"></div><div ng-if="vm.error" class="form-group"><div class="alert alert-danger">{{vm.error}}</div></div><div class="form-group"><button type="submit" ng-disabled="form.$pristine || form.$invalid || form.$pending" class="btn btn-primary">Save</button></div></form></div><div class="col-md-6"><div class="form form-horizontal"><div class="form-group row"><div class="col-xs-12"><h3>Game settings</h3></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">bad word filter</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterSwearWords" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div><div class="form-group row"><div class="col-xs-6"><label class="control-label">hide all messages with russian text</label></div><div class="col-xs-6 btn-group"><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="true" class="btn btn-primary">ON</label><label ng-model="vm.settings.filterCyrillic" uib-btn-radio="false" class="btn btn-primary">OFF</label></div></div></div></div><div class="row"><div class="col-xs-12"><a href="/" style="max-width: 200px; margin-top: 50px;" class="btn btn-lg btn-primary btn-block center-block"><i class="fa fa-angle-double-left"></i> Back to game</a></div></div></div>',
        n.exports
    }),
    System.registerDynamic("ponytown app controller", ["<angular route passthrough>", "<angular animate passthrough>", "Angular UI bootstrap", "<angular passthrough>", "ponytown init", "ba", "bb", "bc", "c1", "c2", "c3", "c4", "c5"], !0, function(t, e, n) {
        "use strict";
        t("<angular route passthrough>"),
        t("<angular animate passthrough>"),
        t("Angular UI bootstrap");
        var r = t("<angular passthrough>")
          , i = t("ponytown init");
        e.app = r.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap"]),
        i.init(e.app),
        e.app.directive("a", function() {
            return {
                restrict: "E",
                link: function(t, e, n) {
                    !n.target && n.href && /^https?:/.test(n.href) && (e[0].setAttribute("target", "_blank"),
                    e[0].setAttribute("rel", "noopener noreferrer"))
                }
            }
        });
        var o = function() {
            function t(t, e) {
                this.gameService = t,
                this.model = e
            }
            return Object.defineProperty(t.prototype, "playing", {
                get: function() {
                    return this.gameService.playing
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.init = function() {
                var t = document.getElementById("music");
                t && (t.volume = .15)
            }
            ,
            t.$inject = ["gameService", "model"],
            t
        }();
        e.app.component("ponyTownApp", {
            controller: o,
            controllerAs: "vm",
            template: t("ba")
        });
        var a = t("bb")
          , s = t("bc")
          , l = t("c1");
        return e.app.config(["$routeProvider", "$locationProvider", function(e, n) {
            n.html5Mode(!0),
            e.when("/", {
                template: t("c2"),
                controller: l.default,
                controllerAs: "vm"
            }).when("/about", {
                template: t("c3"),
                controller: function() {},
                controllerAs: "vm"
            }).when("/character", {
                template: t("c4"),
                controller: a.default,
                controllerAs: "vm"
            }).when("/account", {
                template: t("c5"),
                controller: s.default,
                controllerAs: "vm"
            }).otherwise({
                redirectTo: "/"
            })
        }
        ]),
        n.exports
    }),
    System.registerDynamic("bluebird js", [], !1, function(e, i, o) {
        var a = System.get("@@global-helpers").prepareGlobal(o.id, null , null );
        libraries.bluebird();
        return a()
    }),
    System.registerDynamic("<bluebird passthrough>", ["bluebird js"], !0, function(t, e, n) {
        return n.exports = t("bluebird js"),
        n.exports
    }),
    System.registerDynamic("angular", [], !1, function(e, n, r) {
        var i = System.get("@@global-helpers").prepareGlobal(r.id, "angular", null );
		libraries.angular()
        return i()
    }),
    System.registerDynamic("<angular passthrough>", ["angular"], !0, function(t, e, n) {
        return n.exports = t("angular"),
        n.exports
    });
    System.registerDynamic("ponytownapp settings", [], !0, function(t, e, n) {
        "use strict";
        function r(t) {
            return "undefined" != typeof document ? document.body.getAttribute(t) : null
        }
        return e.debug = JSON.parse(r("data-debug")),
        e.version = r("data-version") || null ,
        e.account = JSON.parse(r("data-account") || "null"),
        e.oauthProviders = JSON.parse(r("data-oauth-providers") || "[]"),
        e.errorMessage = r("data-error-message") || null ,
        n.exports
    });
    System.registerDynamic("main", ["amd es6-shims passthrough", "toBlobShim", "CanvasContext2DEllipseShim", "ponytown app controller", "<bluebird passthrough>", "<angular passthrough>", "ponytownapp settings"], !0, function(t, e, n) {
        "use strict";
        t("amd es6-shims passthrough"),
        t("toBlobShim"),
        t("CanvasContext2DEllipseShim"),
        t("ponytown app controller");
        var r = t("<bluebird passthrough>")
          , i = t("<angular passthrough>")
          , o = t("ponytownapp settings");
        return r.config({
            warnings: !1,
            longStackTraces: o.debug
        }),
        i.element().ready(function() {
            return i.bootstrap(document, ["app"])
        }),
        n.exports
    })
}