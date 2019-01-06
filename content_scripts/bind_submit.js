/*
 * jsrsasign(jwths) 7.2.0 (2017-05-21) (c) 2010-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */

/*
yahoo-min.js
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if (typeof YAHOO == "undefined" || !YAHOO) { var YAHOO = {}; } YAHOO.namespace = function () { var b = arguments, g = null, e, c, f; for (e = 0; e < b.length; e = e + 1) { f = ("" + b[e]).split("."); g = YAHOO; for (c = (f[0] == "YAHOO") ? 1 : 0; c < f.length; c = c + 1) { g[f[c]] = g[f[c]] || {}; g = g[f[c]]; } } return g; }; YAHOO.log = function (d, a, c) { var b = YAHOO.widget.Logger; if (b && b.log) { return b.log(d, a, c); } else { return false; } }; YAHOO.register = function (a, f, e) { var k = YAHOO.env.modules, c, j, h, g, d; if (!k[a]) { k[a] = { versions: [], builds: [] }; } c = k[a]; j = e.version; h = e.build; g = YAHOO.env.listeners; c.name = a; c.version = j; c.build = h; c.versions.push(j); c.builds.push(h); c.mainClass = f; for (d = 0; d < g.length; d = d + 1) { g[d](c); } if (f) { f.VERSION = j; f.BUILD = h; } else { YAHOO.log("mainClass is undefined for module " + a, "warn"); } }; YAHOO.env = YAHOO.env || { modules: [], listeners: [] }; YAHOO.env.getVersion = function (a) { return YAHOO.env.modules[a] || null; }; YAHOO.env.parseUA = function (d) { var e = function (i) { var j = 0; return parseFloat(i.replace(/\./g, function () { return (j++ == 1) ? "" : "."; })); }, h = navigator, g = { ie: 0, opera: 0, gecko: 0, webkit: 0, chrome: 0, mobile: null, air: 0, ipad: 0, iphone: 0, ipod: 0, ios: null, android: 0, webos: 0, caja: h && h.cajaVersion, secure: false, os: null }, c = d || (navigator && navigator.userAgent), f = window && window.location, b = f && f.href, a; g.secure = b && (b.toLowerCase().indexOf("https") === 0); if (c) { if ((/windows|win32/i).test(c)) { g.os = "windows"; } else { if ((/macintosh/i).test(c)) { g.os = "macintosh"; } else { if ((/rhino/i).test(c)) { g.os = "rhino"; } } } if ((/KHTML/).test(c)) { g.webkit = 1; } a = c.match(/AppleWebKit\/([^\s]*)/); if (a && a[1]) { g.webkit = e(a[1]); if (/ Mobile\//.test(c)) { g.mobile = "Apple"; a = c.match(/OS ([^\s]*)/); if (a && a[1]) { a = e(a[1].replace("_", ".")); } g.ios = a; g.ipad = g.ipod = g.iphone = 0; a = c.match(/iPad|iPod|iPhone/); if (a && a[0]) { g[a[0].toLowerCase()] = g.ios; } } else { a = c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/); if (a) { g.mobile = a[0]; } if (/webOS/.test(c)) { g.mobile = "WebOS"; a = c.match(/webOS\/([^\s]*);/); if (a && a[1]) { g.webos = e(a[1]); } } if (/ Android/.test(c)) { g.mobile = "Android"; a = c.match(/Android ([^\s]*);/); if (a && a[1]) { g.android = e(a[1]); } } } a = c.match(/Chrome\/([^\s]*)/); if (a && a[1]) { g.chrome = e(a[1]); } else { a = c.match(/AdobeAIR\/([^\s]*)/); if (a) { g.air = a[0]; } } } if (!g.webkit) { a = c.match(/Opera[\s\/]([^\s]*)/); if (a && a[1]) { g.opera = e(a[1]); a = c.match(/Version\/([^\s]*)/); if (a && a[1]) { g.opera = e(a[1]); } a = c.match(/Opera Mini[^;]*/); if (a) { g.mobile = a[0]; } } else { a = c.match(/MSIE\s([^;]*)/); if (a && a[1]) { g.ie = e(a[1]); } else { a = c.match(/Gecko\/([^\s]*)/); if (a) { g.gecko = 1; a = c.match(/rv:([^\s\)]*)/); if (a && a[1]) { g.gecko = e(a[1]); } } } } } } return g; }; YAHOO.env.ua = YAHOO.env.parseUA(); (function () { YAHOO.namespace("util", "widget", "example"); if ("undefined" !== typeof YAHOO_config) { var b = YAHOO_config.listener, a = YAHOO.env.listeners, d = true, c; if (b) { for (c = 0; c < a.length; c++) { if (a[c] == b) { d = false; break; } } if (d) { a.push(b); } } } })(); YAHOO.lang = YAHOO.lang || {}; (function () {
	var f = YAHOO.lang, a = Object.prototype, c = "[object Array]", h = "[object Function]", i = "[object Object]", b = [], g = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;", "`": "&#x60;" }, d = ["toString", "valueOf"], e = {
		isArray: function (j) { return a.toString.apply(j) === c; }, isBoolean: function (j) { return typeof j === "boolean"; }, isFunction: function (j) { return (typeof j === "function") || a.toString.apply(j) === h; }, isNull: function (j) { return j === null; }, isNumber: function (j) { return typeof j === "number" && isFinite(j); }, isObject: function (j) { return (j && (typeof j === "object" || f.isFunction(j))) || false; }, isString: function (j) { return typeof j === "string"; }, isUndefined: function (j) { return typeof j === "undefined"; }, _IEEnumFix: (YAHOO.env.ua.ie) ? function (l, k) { var j, n, m; for (j = 0; j < d.length; j = j + 1) { n = d[j]; m = k[n]; if (f.isFunction(m) && m != a[n]) { l[n] = m; } } } : function () { }, escapeHTML: function (j) { return j.replace(/[&<>"'\/`]/g, function (k) { return g[k]; }); }, extend: function (m, n, l) { if (!n || !m) { throw new Error("extend failed, please check that " + "all dependencies are included."); } var k = function () { }, j; k.prototype = n.prototype; m.prototype = new k(); m.prototype.constructor = m; m.superclass = n.prototype; if (n.prototype.constructor == a.constructor) { n.prototype.constructor = n; } if (l) { for (j in l) { if (f.hasOwnProperty(l, j)) { m.prototype[j] = l[j]; } } f._IEEnumFix(m.prototype, l); } }, augmentObject: function (n, m) { if (!m || !n) { throw new Error("Absorb failed, verify dependencies."); } var j = arguments, l, o, k = j[2]; if (k && k !== true) { for (l = 2; l < j.length; l = l + 1) { n[j[l]] = m[j[l]]; } } else { for (o in m) { if (k || !(o in n)) { n[o] = m[o]; } } f._IEEnumFix(n, m); } return n; }, augmentProto: function (m, l) { if (!l || !m) { throw new Error("Augment failed, verify dependencies."); } var j = [m.prototype, l.prototype], k; for (k = 2; k < arguments.length; k = k + 1) { j.push(arguments[k]); } f.augmentObject.apply(this, j); return m; }, dump: function (j, p) { var l, n, r = [], t = "{...}", k = "f(){...}", q = ", ", m = " => "; if (!f.isObject(j)) { return j + ""; } else { if (j instanceof Date || ("nodeType" in j && "tagName" in j)) { return j; } else { if (f.isFunction(j)) { return k; } } } p = (f.isNumber(p)) ? p : 3; if (f.isArray(j)) { r.push("["); for (l = 0, n = j.length; l < n; l = l + 1) { if (f.isObject(j[l])) { r.push((p > 0) ? f.dump(j[l], p - 1) : t); } else { r.push(j[l]); } r.push(q); } if (r.length > 1) { r.pop(); } r.push("]"); } else { r.push("{"); for (l in j) { if (f.hasOwnProperty(j, l)) { r.push(l + m); if (f.isObject(j[l])) { r.push((p > 0) ? f.dump(j[l], p - 1) : t); } else { r.push(j[l]); } r.push(q); } } if (r.length > 1) { r.pop(); } r.push("}"); } return r.join(""); }, substitute: function (x, y, E, l) { var D, C, B, G, t, u, F = [], p, z = x.length, A = "dump", r = " ", q = "{", m = "}", n, w; for (; ;) { D = x.lastIndexOf(q, z); if (D < 0) { break; } C = x.indexOf(m, D); if (D + 1 > C) { break; } p = x.substring(D + 1, C); G = p; u = null; B = G.indexOf(r); if (B > -1) { u = G.substring(B + 1); G = G.substring(0, B); } t = y[G]; if (E) { t = E(G, t, u); } if (f.isObject(t)) { if (f.isArray(t)) { t = f.dump(t, parseInt(u, 10)); } else { u = u || ""; n = u.indexOf(A); if (n > -1) { u = u.substring(4); } w = t.toString(); if (w === i || n > -1) { t = f.dump(t, parseInt(u, 10)); } else { t = w; } } } else { if (!f.isString(t) && !f.isNumber(t)) { t = "~-" + F.length + "-~"; F[F.length] = p; } } x = x.substring(0, D) + t + x.substring(C + 1); if (l === false) { z = D - 1; } } for (D = F.length - 1; D >= 0; D = D - 1) { x = x.replace(new RegExp("~-" + D + "-~"), "{" + F[D] + "}", "g"); } return x; }, trim: function (j) {
			try { return j.replace(/^\s+|\s+$/g, ""); } catch (k) {
				return j;
			}
		}, merge: function () { var n = {}, k = arguments, j = k.length, m; for (m = 0; m < j; m = m + 1) { f.augmentObject(n, k[m], true); } return n; }, later: function (t, k, u, n, p) { t = t || 0; k = k || {}; var l = u, s = n, q, j; if (f.isString(u)) { l = k[u]; } if (!l) { throw new TypeError("method undefined"); } if (!f.isUndefined(n) && !f.isArray(s)) { s = [n]; } q = function () { l.apply(k, s || b); }; j = (p) ? setInterval(q, t) : setTimeout(q, t); return { interval: p, cancel: function () { if (this.interval) { clearInterval(j); } else { clearTimeout(j); } } }; }, isValue: function (j) { return (f.isObject(j) || f.isString(j) || f.isNumber(j) || f.isBoolean(j)); }
	}; f.hasOwnProperty = (a.hasOwnProperty) ? function (j, k) { return j && j.hasOwnProperty && j.hasOwnProperty(k); } : function (j, k) { return !f.isUndefined(j[k]) && j.constructor.prototype[k] !== j[k]; }; e.augmentObject(f, e, true); YAHOO.util.Lang = f; f.augment = f.augmentProto; YAHOO.augment = f.augmentProto; YAHOO.extend = f.extend;
})(); YAHOO.register("yahoo", YAHOO, { version: "2.9.0", build: "2800" });

/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var CryptoJS = CryptoJS || (function (e, g) { var a = {}; var b = a.lib = {}; var j = b.Base = (function () { function n() { } return { extend: function (p) { n.prototype = this; var o = new n(); if (p) { o.mixIn(p) } if (!o.hasOwnProperty("init")) { o.init = function () { o.$super.init.apply(this, arguments) } } o.init.prototype = o; o.$super = this; return o }, create: function () { var o = this.extend(); o.init.apply(o, arguments); return o }, init: function () { }, mixIn: function (p) { for (var o in p) { if (p.hasOwnProperty(o)) { this[o] = p[o] } } if (p.hasOwnProperty("toString")) { this.toString = p.toString } }, clone: function () { return this.init.prototype.extend(this) } } }()); var l = b.WordArray = j.extend({ init: function (o, n) { o = this.words = o || []; if (n != g) { this.sigBytes = n } else { this.sigBytes = o.length * 4 } }, toString: function (n) { return (n || h).stringify(this) }, concat: function (t) { var q = this.words; var p = t.words; var n = this.sigBytes; var s = t.sigBytes; this.clamp(); if (n % 4) { for (var r = 0; r < s; r++) { var o = (p[r >>> 2] >>> (24 - (r % 4) * 8)) & 255; q[(n + r) >>> 2] |= o << (24 - ((n + r) % 4) * 8) } } else { for (var r = 0; r < s; r += 4) { q[(n + r) >>> 2] = p[r >>> 2] } } this.sigBytes += s; return this }, clamp: function () { var o = this.words; var n = this.sigBytes; o[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8); o.length = e.ceil(n / 4) }, clone: function () { var n = j.clone.call(this); n.words = this.words.slice(0); return n }, random: function (p) { var o = []; for (var n = 0; n < p; n += 4) { o.push((e.random() * 4294967296) | 0) } return new l.init(o, p) } }); var m = a.enc = {}; var h = m.Hex = { stringify: function (p) { var r = p.words; var o = p.sigBytes; var q = []; for (var n = 0; n < o; n++) { var s = (r[n >>> 2] >>> (24 - (n % 4) * 8)) & 255; q.push((s >>> 4).toString(16)); q.push((s & 15).toString(16)) } return q.join("") }, parse: function (p) { var n = p.length; var q = []; for (var o = 0; o < n; o += 2) { q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << (24 - (o % 8) * 4) } return new l.init(q, n / 2) } }; var d = m.Latin1 = { stringify: function (q) { var r = q.words; var p = q.sigBytes; var n = []; for (var o = 0; o < p; o++) { var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255; n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (p) { var n = p.length; var q = []; for (var o = 0; o < n; o++) { q[o >>> 2] |= (p.charCodeAt(o) & 255) << (24 - (o % 4) * 8) } return new l.init(q, n) } }; var c = m.Utf8 = { stringify: function (n) { try { return decodeURIComponent(escape(d.stringify(n))) } catch (o) { throw new Error("Malformed UTF-8 data") } }, parse: function (n) { return d.parse(unescape(encodeURIComponent(n))) } }; var i = b.BufferedBlockAlgorithm = j.extend({ reset: function () { this._data = new l.init(); this._nDataBytes = 0 }, _append: function (n) { if (typeof n == "string") { n = c.parse(n) } this._data.concat(n); this._nDataBytes += n.sigBytes }, _process: function (w) { var q = this._data; var x = q.words; var n = q.sigBytes; var t = this.blockSize; var v = t * 4; var u = n / v; if (w) { u = e.ceil(u) } else { u = e.max((u | 0) - this._minBufferSize, 0) } var s = u * t; var r = e.min(s * 4, n); if (s) { for (var p = 0; p < s; p += t) { this._doProcessBlock(x, p) } var o = x.splice(0, s); q.sigBytes -= r } return new l.init(o, r) }, clone: function () { var n = j.clone.call(this); n._data = this._data.clone(); return n }, _minBufferSize: 0 }); var f = b.Hasher = i.extend({ cfg: j.extend(), init: function (n) { this.cfg = this.cfg.extend(n); this.reset() }, reset: function () { i.reset.call(this); this._doReset() }, update: function (n) { this._append(n); this._process(); return this }, finalize: function (n) { if (n) { this._append(n) } var o = this._doFinalize(); return o }, blockSize: 512 / 32, _createHelper: function (n) { return function (p, o) { return new n.init(o).finalize(p) } }, _createHmacHelper: function (n) { return function (p, o) { return new k.HMAC.init(n, o).finalize(p) } } }); var k = a.algo = {}; return a }(Math));
/*
CryptoJS v3.1.2 x64-core-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function (g) { var a = CryptoJS, f = a.lib, e = f.Base, h = f.WordArray, a = a.x64 = {}; a.Word = e.extend({ init: function (b, c) { this.high = b; this.low = c } }); a.WordArray = e.extend({ init: function (b, c) { b = this.words = b || []; this.sigBytes = c != g ? c : 8 * b.length }, toX32: function () { for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) { var e = b[d]; a.push(e.high); a.push(e.low) } return h.create(a, this.sigBytes) }, clone: function () { for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++)c[d] = c[d].clone(); return b } }) })();

/*
CryptoJS v3.1.2 cipher-core.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
CryptoJS.lib.Cipher || function (u) {
	var g = CryptoJS, f = g.lib, k = f.Base, l = f.WordArray, q = f.BufferedBlockAlgorithm, r = g.enc.Base64, v = g.algo.EvpKDF, n = f.Cipher = q.extend({
		cfg: k.extend(), createEncryptor: function (a, b) { return this.create(this._ENC_XFORM_MODE, a, b) }, createDecryptor: function (a, b) { return this.create(this._DEC_XFORM_MODE, a, b) }, init: function (a, b, c) { this.cfg = this.cfg.extend(c); this._xformMode = a; this._key = b; this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, process: function (a) {
			this._append(a);
			return this._process()
		}, finalize: function (a) { a && this._append(a); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (a) { return { encrypt: function (b, c, d) { return ("string" == typeof c ? s : j).encrypt(a, b, c, d) }, decrypt: function (b, c, d) { return ("string" == typeof c ? s : j).decrypt(a, b, c, d) } } }
	}); f.StreamCipher = n.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var m = g.mode = {}, t = function (a, b, c) {
		var d = this._iv; d ? this._iv = u : d = this._prevBlock; for (var e =
			0; e < c; e++)a[b + e] ^= d[e]
	}, h = (f.BlockCipherMode = k.extend({ createEncryptor: function (a, b) { return this.Encryptor.create(a, b) }, createDecryptor: function (a, b) { return this.Decryptor.create(a, b) }, init: function (a, b) { this._cipher = a; this._iv = b } })).extend(); h.Encryptor = h.extend({ processBlock: function (a, b) { var c = this._cipher, d = c.blockSize; t.call(this, a, b, d); c.encryptBlock(a, b); this._prevBlock = a.slice(b, b + d) } }); h.Decryptor = h.extend({
		processBlock: function (a, b) {
			var c = this._cipher, d = c.blockSize, e = a.slice(b, b + d); c.decryptBlock(a,
				b); t.call(this, a, b, d); this._prevBlock = e
		}
	}); m = m.CBC = h; h = (g.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4)e.push(d); c = l.create(e, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; f.BlockCipher = n.extend({
		cfg: n.cfg.extend({ mode: m, padding: h }), reset: function () {
			n.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1;
			this._mode = c.call(a, this, b && b.words)
		}, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
	}); var p = f.CipherParams = k.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), m = (g.format = {}).OpenSSL = {
		stringify: function (a) {
			var b = a.ciphertext; a = a.salt;
			return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
		}, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = l.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return p.create({ ciphertext: a, salt: c }) }
	}, j = f.SerializableCipher = k.extend({
		cfg: k.extend({ format: m }), encrypt: function (a, b, c, d) {
			d = this.cfg.extend(d); var e = a.createEncryptor(c, d); b = e.finalize(b); e = e.cfg; return p.create({
				ciphertext: b, key: c, iv: e.iv, algorithm: a, mode: e.mode, padding: e.padding,
				blockSize: a.blockSize, formatter: d.format
			})
		}, decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
	}), g = (g.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = l.random(8)); a = v.create({ keySize: b + c }).compute(a, d); c = l.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return p.create({ key: a, iv: c, salt: d }) } }, s = f.PasswordBasedCipher = j.extend({
		cfg: j.cfg.extend({ kdf: g }), encrypt: function (a,
			b, c, d) { d = this.cfg.extend(d); c = d.kdf.execute(c, a.keySize, a.ivSize); d.iv = c.iv; a = j.encrypt.call(this, a, b, c.key, d); a.mixIn(c); return a }, decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt); d.iv = c.iv; return j.decrypt.call(this, a, b, c.key, d) }
	})
}();

/*
CryptoJS v3.1.2 enc-base64.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
	var h = CryptoJS, j = h.lib.WordArray; h.enc.Base64 = {
		stringify: function (b) { var e = b.words, f = b.sigBytes, c = this._map; b.clamp(); b = []; for (var a = 0; a < f; a += 3)for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++)b.push(c.charAt(d >>> 6 * (3 - g) & 63)); if (e = c.charAt(64)) for (; b.length % 4;)b.push(e); return b.join("") }, parse: function (b) {
			var e = b.length, f = this._map, c = f.charAt(64); c && (c = b.indexOf(c), -1 != c && (e = c)); for (var c = [], a = 0, d = 0; d <
				e; d++)if (d % 4) { var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4), h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4); c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4); a++ } return j.create(c, a)
		}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	}
})();

/*
CryptoJS v3.1.2 sha1-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
	var k = CryptoJS, b = k.lib, m = b.WordArray, l = b.Hasher, d = [], b = k.algo.SHA1 = l.extend({
		_doReset: function () { this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]) }, _doProcessBlock: function (n, p) {
			for (var a = this._hash.words, e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
				if (16 > c) d[c] = n[p + c] | 0; else { var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16]; d[c] = g << 1 | g >>> 31 } g = (e << 5 | e >>> 27) + b + d[c]; g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^
					j) - 899497514); b = j; j = h; h = f << 30 | f >>> 2; f = e; e = g
			} a[0] = a[0] + e | 0; a[1] = a[1] + f | 0; a[2] = a[2] + h | 0; a[3] = a[3] + j | 0; a[4] = a[4] + b | 0
		}, _doFinalize: function () { var b = this._data, d = b.words, a = 8 * this._nDataBytes, e = 8 * b.sigBytes; d[e >>> 5] |= 128 << 24 - e % 32; d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296); d[(e + 64 >>> 9 << 4) + 15] = a; b.sigBytes = 4 * d.length; this._process(); return this._hash }, clone: function () { var b = l.clone.call(this); b._hash = this._hash.clone(); return b }
	}); k.SHA1 = l._createHelper(b); k.HmacSHA1 = l._createHmacHelper(b)
})();

/*
CryptoJS v3.1.2 sha256-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function (k) {
	for (var g = CryptoJS, h = g.lib, v = h.WordArray, j = h.Hasher, h = g.algo, s = [], t = [], u = function (q) { return 4294967296 * (q - (q | 0)) | 0 }, l = 2, b = 0; 64 > b;) { var d; a: { d = l; for (var w = k.sqrt(d), r = 2; r <= w; r++)if (!(d % r)) { d = !1; break a } d = !0 } d && (8 > b && (s[b] = u(k.pow(l, 0.5))), t[b] = u(k.pow(l, 1 / 3)), b++); l++ } var n = [], h = h.SHA256 = j.extend({
		_doReset: function () { this._hash = new v.init(s.slice(0)) }, _doProcessBlock: function (q, h) {
			for (var a = this._hash.words, c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {
				if (16 > e) n[e] =
					q[h + e] | 0; else { var m = n[e - 15], p = n[e - 2]; n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16] } m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e]; p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b); l = j; j = g; g = f; f = k + m | 0; k = b; b = d; d = c; c = m + p | 0
			} a[0] = a[0] + c | 0; a[1] = a[1] + d | 0; a[2] = a[2] + b | 0; a[3] = a[3] + k | 0; a[4] = a[4] + f | 0; a[5] = a[5] + g | 0; a[6] = a[6] + j | 0; a[7] = a[7] + l | 0
		}, _doFinalize: function () {
			var d = this._data, b = d.words, a = 8 * this._nDataBytes, c = 8 * d.sigBytes;
			b[c >>> 5] |= 128 << 24 - c % 32; b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296); b[(c + 64 >>> 9 << 4) + 15] = a; d.sigBytes = 4 * b.length; this._process(); return this._hash
		}, clone: function () { var b = j.clone.call(this); b._hash = this._hash.clone(); return b }
	}); g.SHA256 = j._createHelper(h); g.HmacSHA256 = j._createHmacHelper(h)
})(Math);

/*
CryptoJS v3.1.2 sha512-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
	function a() { return d.create.apply(d, arguments) } for (var n = CryptoJS, r = n.lib.Hasher, e = n.x64, d = e.Word, T = e.WordArray, e = n.algo, ea = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317),
	a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291,
		2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899),
	a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470,
		3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)], v = [], w = 0; 80 > w; w++)v[w] = a(); e = e.SHA512 = r.extend({
			_doReset: function () { this._hash = new T.init([new d.init(1779033703, 4089235720), new d.init(3144134277, 2227873595), new d.init(1013904242, 4271175723), new d.init(2773480762, 1595750129), new d.init(1359893119, 2917565137), new d.init(2600822924, 725511199), new d.init(528734635, 4215389547), new d.init(1541459225, 327033209)]) }, _doProcessBlock: function (a, d) {
				for (var f = this._hash.words,
					F = f[0], e = f[1], n = f[2], r = f[3], G = f[4], H = f[5], I = f[6], f = f[7], w = F.high, J = F.low, X = e.high, K = e.low, Y = n.high, L = n.low, Z = r.high, M = r.low, $ = G.high, N = G.low, aa = H.high, O = H.low, ba = I.high, P = I.low, ca = f.high, Q = f.low, k = w, g = J, z = X, x = K, A = Y, y = L, U = Z, B = M, l = $, h = N, R = aa, C = O, S = ba, D = P, V = ca, E = Q, m = 0; 80 > m; m++) {
					var s = v[m]; if (16 > m) var j = s.high = a[d + 2 * m] | 0, b = s.low = a[d + 2 * m + 1] | 0; else {
						var j = v[m - 15], b = j.high, p = j.low, j = (b >>> 1 | p << 31) ^ (b >>> 8 | p << 24) ^ b >>> 7, p = (p >>> 1 | b << 31) ^ (p >>> 8 | b << 24) ^ (p >>> 7 | b << 25), u = v[m - 2], b = u.high, c = u.low, u = (b >>> 19 | c << 13) ^ (b <<
							3 | c >>> 29) ^ b >>> 6, c = (c >>> 19 | b << 13) ^ (c << 3 | b >>> 29) ^ (c >>> 6 | b << 26), b = v[m - 7], W = b.high, t = v[m - 16], q = t.high, t = t.low, b = p + b.low, j = j + W + (b >>> 0 < p >>> 0 ? 1 : 0), b = b + c, j = j + u + (b >>> 0 < c >>> 0 ? 1 : 0), b = b + t, j = j + q + (b >>> 0 < t >>> 0 ? 1 : 0); s.high = j; s.low = b
					} var W = l & R ^ ~l & S, t = h & C ^ ~h & D, s = k & z ^ k & A ^ z & A, T = g & x ^ g & y ^ x & y, p = (k >>> 28 | g << 4) ^ (k << 30 | g >>> 2) ^ (k << 25 | g >>> 7), u = (g >>> 28 | k << 4) ^ (g << 30 | k >>> 2) ^ (g << 25 | k >>> 7), c = ea[m], fa = c.high, da = c.low, c = E + ((h >>> 14 | l << 18) ^ (h >>> 18 | l << 14) ^ (h << 23 | l >>> 9)), q = V + ((l >>> 14 | h << 18) ^ (l >>> 18 | h << 14) ^ (l << 23 | h >>> 9)) + (c >>> 0 < E >>> 0 ? 1 :
						0), c = c + t, q = q + W + (c >>> 0 < t >>> 0 ? 1 : 0), c = c + da, q = q + fa + (c >>> 0 < da >>> 0 ? 1 : 0), c = c + b, q = q + j + (c >>> 0 < b >>> 0 ? 1 : 0), b = u + T, s = p + s + (b >>> 0 < u >>> 0 ? 1 : 0), V = S, E = D, S = R, D = C, R = l, C = h, h = B + c | 0, l = U + q + (h >>> 0 < B >>> 0 ? 1 : 0) | 0, U = A, B = y, A = z, y = x, z = k, x = g, g = c + b | 0, k = q + s + (g >>> 0 < c >>> 0 ? 1 : 0) | 0
				} J = F.low = J + g; F.high = w + k + (J >>> 0 < g >>> 0 ? 1 : 0); K = e.low = K + x; e.high = X + z + (K >>> 0 < x >>> 0 ? 1 : 0); L = n.low = L + y; n.high = Y + A + (L >>> 0 < y >>> 0 ? 1 : 0); M = r.low = M + B; r.high = Z + U + (M >>> 0 < B >>> 0 ? 1 : 0); N = G.low = N + h; G.high = $ + l + (N >>> 0 < h >>> 0 ? 1 : 0); O = H.low = O + C; H.high = aa + R + (O >>> 0 < C >>> 0 ? 1 : 0); P = I.low = P + D;
				I.high = ba + S + (P >>> 0 < D >>> 0 ? 1 : 0); Q = f.low = Q + E; f.high = ca + V + (Q >>> 0 < E >>> 0 ? 1 : 0)
			}, _doFinalize: function () { var a = this._data, d = a.words, f = 8 * this._nDataBytes, e = 8 * a.sigBytes; d[e >>> 5] |= 128 << 24 - e % 32; d[(e + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296); d[(e + 128 >>> 10 << 5) + 31] = f; a.sigBytes = 4 * d.length; this._process(); return this._hash.toX32() }, clone: function () { var a = r.clone.call(this); a._hash = this._hash.clone(); return a }, blockSize: 32
		}); n.SHA512 = r._createHelper(e); n.HmacSHA512 = r._createHmacHelper(e)
})();

/*
CryptoJS v3.1.2 sha384-min.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
	var c = CryptoJS, a = c.x64, b = a.Word, e = a.WordArray, a = c.algo, d = a.SHA512, a = a.SHA384 = d.extend({ _doReset: function () { this._hash = new e.init([new b.init(3418070365, 3238371032), new b.init(1654270250, 914150663), new b.init(2438529370, 812702999), new b.init(355462360, 4144912697), new b.init(1731405415, 4290775857), new b.init(2394180231, 1750603025), new b.init(3675008525, 1694076839), new b.init(1203062813, 3204075428)]) }, _doFinalize: function () { var a = d._doFinalize.call(this); a.sigBytes -= 16; return a } }); c.SHA384 =
		d._createHelper(a); c.HmacSHA384 = d._createHmacHelper(a)
})();

/*
CryptoJS v3.1.2 hmac.js
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
	var c = CryptoJS, k = c.enc.Utf8; c.algo.HMAC = c.lib.Base.extend({
		init: function (a, b) { a = this._hasher = new a.init; "string" == typeof b && (b = k.parse(b)); var c = a.blockSize, e = 4 * c; b.sigBytes > e && (b = a.finalize(b)); b.clamp(); for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, j = g.words, d = 0; d < c; d++)h[d] ^= 1549556828, j[d] ^= 909522486; f.sigBytes = g.sigBytes = e; this.reset() }, reset: function () { var a = this._hasher; a.reset(); a.update(this._iKey) }, update: function (a) { this._hasher.update(a); return this }, finalize: function (a) {
			var b =
				this._hasher; a = b.finalize(a); b.reset(); return b.finalize(this._oKey.clone().concat(a))
		}
	})
})();

/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var b64pad = "="; function hex2b64(d) { var b; var e; var a = ""; for (b = 0; b + 3 <= d.length; b += 3) { e = parseInt(d.substring(b, b + 3), 16); a += b64map.charAt(e >> 6) + b64map.charAt(e & 63) } if (b + 1 == d.length) { e = parseInt(d.substring(b, b + 1), 16); a += b64map.charAt(e << 2) } else { if (b + 2 == d.length) { e = parseInt(d.substring(b, b + 2), 16); a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4) } } if (b64pad) { while ((a.length & 3) > 0) { a += b64pad } } return a } function b64tohex(f) { var d = ""; var e; var b = 0; var c; var a; for (e = 0; e < f.length; ++e) { if (f.charAt(e) == b64pad) { break } a = b64map.indexOf(f.charAt(e)); if (a < 0) { continue } if (b == 0) { d += int2char(a >> 2); c = a & 3; b = 1 } else { if (b == 1) { d += int2char((c << 2) | (a >> 4)); c = a & 15; b = 2 } else { if (b == 2) { d += int2char(c); d += int2char(a >> 2); c = a & 3; b = 3 } else { d += int2char((c << 2) | (a >> 4)); d += int2char(a & 15); b = 0 } } } } if (b == 1) { d += int2char(c << 2) } return d } function b64toBA(e) { var d = b64tohex(e); var c; var b = new Array(); for (c = 0; 2 * c < d.length; ++c) { b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16) } return b };
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var dbits; var canary = 244837814094590; var j_lm = ((canary & 16777215) == 15715070); function BigInteger(e, d, f) { if (e != null) { if ("number" == typeof e) { this.fromNumber(e, d, f) } else { if (d == null && "string" != typeof e) { this.fromString(e, 256) } else { this.fromString(e, d) } } } } function nbi() { return new BigInteger(null) } function am1(f, a, b, e, h, g) { while (--g >= 0) { var d = a * this[f++] + b[e] + h; h = Math.floor(d / 67108864); b[e++] = d & 67108863 } return h } function am2(f, q, r, e, o, a) { var k = q & 32767, p = q >> 15; while (--a >= 0) { var d = this[f] & 32767; var g = this[f++] >> 15; var b = p * d + g * k; d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823); o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30); r[e++] = d & 1073741823 } return o } function am3(f, q, r, e, o, a) { var k = q & 16383, p = q >> 14; while (--a >= 0) { var d = this[f] & 16383; var g = this[f++] >> 14; var b = p * d + g * k; d = k * d + ((b & 16383) << 14) + r[e] + o; o = (d >> 28) + (b >> 14) + p * g; r[e++] = d & 268435455 } return o } if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) { BigInteger.prototype.am = am2; dbits = 30 } else { if (j_lm && (navigator.appName != "Netscape")) { BigInteger.prototype.am = am1; dbits = 26 } else { BigInteger.prototype.am = am3; dbits = 28 } } BigInteger.prototype.DB = dbits; BigInteger.prototype.DM = ((1 << dbits) - 1); BigInteger.prototype.DV = (1 << dbits); var BI_FP = 52; BigInteger.prototype.FV = Math.pow(2, BI_FP); BigInteger.prototype.F1 = BI_FP - dbits; BigInteger.prototype.F2 = 2 * dbits - BI_FP; var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz"; var BI_RC = new Array(); var rr, vv; rr = "0".charCodeAt(0); for (vv = 0; vv <= 9; ++vv) { BI_RC[rr++] = vv } rr = "a".charCodeAt(0); for (vv = 10; vv < 36; ++vv) { BI_RC[rr++] = vv } rr = "A".charCodeAt(0); for (vv = 10; vv < 36; ++vv) { BI_RC[rr++] = vv } function int2char(a) { return BI_RM.charAt(a) } function intAt(b, a) { var d = BI_RC[b.charCodeAt(a)]; return (d == null) ? -1 : d } function bnpCopyTo(b) { for (var a = this.t - 1; a >= 0; --a) { b[a] = this[a] } b.t = this.t; b.s = this.s } function bnpFromInt(a) { this.t = 1; this.s = (a < 0) ? -1 : 0; if (a > 0) { this[0] = a } else { if (a < -1) { this[0] = a + this.DV } else { this.t = 0 } } } function nbv(a) { var b = nbi(); b.fromInt(a); return b } function bnpFromString(h, c) { var e; if (c == 16) { e = 4 } else { if (c == 8) { e = 3 } else { if (c == 256) { e = 8 } else { if (c == 2) { e = 1 } else { if (c == 32) { e = 5 } else { if (c == 4) { e = 2 } else { this.fromRadix(h, c); return } } } } } } this.t = 0; this.s = 0; var g = h.length, d = false, f = 0; while (--g >= 0) { var a = (e == 8) ? h[g] & 255 : intAt(h, g); if (a < 0) { if (h.charAt(g) == "-") { d = true } continue } d = false; if (f == 0) { this[this.t++] = a } else { if (f + e > this.DB) { this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f; this[this.t++] = (a >> (this.DB - f)) } else { this[this.t - 1] |= a << f } } f += e; if (f >= this.DB) { f -= this.DB } } if (e == 8 && (h[0] & 128) != 0) { this.s = -1; if (f > 0) { this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f } } this.clamp(); if (d) { BigInteger.ZERO.subTo(this, this) } } function bnpClamp() { var a = this.s & this.DM; while (this.t > 0 && this[this.t - 1] == a) { --this.t } } function bnToString(c) { if (this.s < 0) { return "-" + this.negate().toString(c) } var e; if (c == 16) { e = 4 } else { if (c == 8) { e = 3 } else { if (c == 2) { e = 1 } else { if (c == 32) { e = 5 } else { if (c == 4) { e = 2 } else { return this.toRadix(c) } } } } } var g = (1 << e) - 1, l, a = false, h = "", f = this.t; var j = this.DB - (f * this.DB) % e; if (f-- > 0) { if (j < this.DB && (l = this[f] >> j) > 0) { a = true; h = int2char(l) } while (f >= 0) { if (j < e) { l = (this[f] & ((1 << j) - 1)) << (e - j); l |= this[--f] >> (j += this.DB - e) } else { l = (this[f] >> (j -= e)) & g; if (j <= 0) { j += this.DB; --f } } if (l > 0) { a = true } if (a) { h += int2char(l) } } } return a ? h : "0" } function bnNegate() { var a = nbi(); BigInteger.ZERO.subTo(this, a); return a } function bnAbs() { return (this.s < 0) ? this.negate() : this } function bnCompareTo(b) { var d = this.s - b.s; if (d != 0) { return d } var c = this.t; d = c - b.t; if (d != 0) { return (this.s < 0) ? -d : d } while (--c >= 0) { if ((d = this[c] - b[c]) != 0) { return d } } return 0 } function nbits(a) { var c = 1, b; if ((b = a >>> 16) != 0) { a = b; c += 16 } if ((b = a >> 8) != 0) { a = b; c += 8 } if ((b = a >> 4) != 0) { a = b; c += 4 } if ((b = a >> 2) != 0) { a = b; c += 2 } if ((b = a >> 1) != 0) { a = b; c += 1 } return c } function bnBitLength() { if (this.t <= 0) { return 0 } return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM)) } function bnpDLShiftTo(c, b) { var a; for (a = this.t - 1; a >= 0; --a) { b[a + c] = this[a] } for (a = c - 1; a >= 0; --a) { b[a] = 0 } b.t = this.t + c; b.s = this.s } function bnpDRShiftTo(c, b) { for (var a = c; a < this.t; ++a) { b[a - c] = this[a] } b.t = Math.max(this.t - c, 0); b.s = this.s } function bnpLShiftTo(j, e) { var b = j % this.DB; var a = this.DB - b; var g = (1 << a) - 1; var f = Math.floor(j / this.DB), h = (this.s << b) & this.DM, d; for (d = this.t - 1; d >= 0; --d) { e[d + f + 1] = (this[d] >> a) | h; h = (this[d] & g) << b } for (d = f - 1; d >= 0; --d) { e[d] = 0 } e[f] = h; e.t = this.t + f + 1; e.s = this.s; e.clamp() } function bnpRShiftTo(g, d) { d.s = this.s; var e = Math.floor(g / this.DB); if (e >= this.t) { d.t = 0; return } var b = g % this.DB; var a = this.DB - b; var f = (1 << b) - 1; d[0] = this[e] >> b; for (var c = e + 1; c < this.t; ++c) { d[c - e - 1] |= (this[c] & f) << a; d[c - e] = this[c] >> b } if (b > 0) { d[this.t - e - 1] |= (this.s & f) << a } d.t = this.t - e; d.clamp() } function bnpSubTo(d, f) { var e = 0, g = 0, b = Math.min(d.t, this.t); while (e < b) { g += this[e] - d[e]; f[e++] = g & this.DM; g >>= this.DB } if (d.t < this.t) { g -= d.s; while (e < this.t) { g += this[e]; f[e++] = g & this.DM; g >>= this.DB } g += this.s } else { g += this.s; while (e < d.t) { g -= d[e]; f[e++] = g & this.DM; g >>= this.DB } g -= d.s } f.s = (g < 0) ? -1 : 0; if (g < -1) { f[e++] = this.DV + g } else { if (g > 0) { f[e++] = g } } f.t = e; f.clamp() } function bnpMultiplyTo(c, e) { var b = this.abs(), f = c.abs(); var d = b.t; e.t = d + f.t; while (--d >= 0) { e[d] = 0 } for (d = 0; d < f.t; ++d) { e[d + b.t] = b.am(0, f[d], e, d, 0, b.t) } e.s = 0; e.clamp(); if (this.s != c.s) { BigInteger.ZERO.subTo(e, e) } } function bnpSquareTo(d) { var a = this.abs(); var b = d.t = 2 * a.t; while (--b >= 0) { d[b] = 0 } for (b = 0; b < a.t - 1; ++b) { var e = a.am(b, a[b], d, 2 * b, 0, 1); if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) { d[b + a.t] -= a.DV; d[b + a.t + 1] = 1 } } if (d.t > 0) { d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1) } d.s = 0; d.clamp() } function bnpDivRemTo(n, h, g) { var w = n.abs(); if (w.t <= 0) { return } var k = this.abs(); if (k.t < w.t) { if (h != null) { h.fromInt(0) } if (g != null) { this.copyTo(g) } return } if (g == null) { g = nbi() } var d = nbi(), a = this.s, l = n.s; var v = this.DB - nbits(w[w.t - 1]); if (v > 0) { w.lShiftTo(v, d); k.lShiftTo(v, g) } else { w.copyTo(d); k.copyTo(g) } var p = d.t; var b = d[p - 1]; if (b == 0) { return } var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0); var A = this.FV / o, z = (1 << this.F1) / o, x = 1 << this.F2; var u = g.t, s = u - p, f = (h == null) ? nbi() : h; d.dlShiftTo(s, f); if (g.compareTo(f) >= 0) { g[g.t++] = 1; g.subTo(f, g) } BigInteger.ONE.dlShiftTo(p, f); f.subTo(d, d); while (d.t < p) { d[d.t++] = 0 } while (--s >= 0) { var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z); if ((g[u] += d.am(0, c, g, s, 0, p)) < c) { d.dlShiftTo(s, f); g.subTo(f, g); while (g[u] < --c) { g.subTo(f, g) } } } if (h != null) { g.drShiftTo(p, h); if (a != l) { BigInteger.ZERO.subTo(h, h) } } g.t = p; g.clamp(); if (v > 0) { g.rShiftTo(v, g) } if (a < 0) { BigInteger.ZERO.subTo(g, g) } } function bnMod(b) { var c = nbi(); this.abs().divRemTo(b, null, c); if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) { b.subTo(c, c) } return c } function Classic(a) { this.m = a } function cConvert(a) { if (a.s < 0 || a.compareTo(this.m) >= 0) { return a.mod(this.m) } else { return a } } function cRevert(a) { return a } function cReduce(a) { a.divRemTo(this.m, null, a) } function cMulTo(a, c, b) { a.multiplyTo(c, b); this.reduce(b) } function cSqrTo(a, b) { a.squareTo(b); this.reduce(b) } Classic.prototype.convert = cConvert; Classic.prototype.revert = cRevert; Classic.prototype.reduce = cReduce; Classic.prototype.mulTo = cMulTo; Classic.prototype.sqrTo = cSqrTo; function bnpInvDigit() { if (this.t < 1) { return 0 } var a = this[0]; if ((a & 1) == 0) { return 0 } var b = a & 3; b = (b * (2 - (a & 15) * b)) & 15; b = (b * (2 - (a & 255) * b)) & 255; b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535; b = (b * (2 - a * b % this.DV)) % this.DV; return (b > 0) ? this.DV - b : -b } function Montgomery(a) { this.m = a; this.mp = a.invDigit(); this.mpl = this.mp & 32767; this.mph = this.mp >> 15; this.um = (1 << (a.DB - 15)) - 1; this.mt2 = 2 * a.t } function montConvert(a) { var b = nbi(); a.abs().dlShiftTo(this.m.t, b); b.divRemTo(this.m, null, b); if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) { this.m.subTo(b, b) } return b } function montRevert(a) { var b = nbi(); a.copyTo(b); this.reduce(b); return b } function montReduce(a) { while (a.t <= this.mt2) { a[a.t++] = 0 } for (var c = 0; c < this.m.t; ++c) { var b = a[c] & 32767; var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM; b = c + this.m.t; a[b] += this.m.am(0, d, a, c, 0, this.m.t); while (a[b] >= a.DV) { a[b] -= a.DV; a[++b]++ } } a.clamp(); a.drShiftTo(this.m.t, a); if (a.compareTo(this.m) >= 0) { a.subTo(this.m, a) } } function montSqrTo(a, b) { a.squareTo(b); this.reduce(b) } function montMulTo(a, c, b) { a.multiplyTo(c, b); this.reduce(b) } Montgomery.prototype.convert = montConvert; Montgomery.prototype.revert = montRevert; Montgomery.prototype.reduce = montReduce; Montgomery.prototype.mulTo = montMulTo; Montgomery.prototype.sqrTo = montSqrTo; function bnpIsEven() { return ((this.t > 0) ? (this[0] & 1) : this.s) == 0 } function bnpExp(h, j) { if (h > 4294967295 || h < 1) { return BigInteger.ONE } var f = nbi(), a = nbi(), d = j.convert(this), c = nbits(h) - 1; d.copyTo(f); while (--c >= 0) { j.sqrTo(f, a); if ((h & (1 << c)) > 0) { j.mulTo(a, d, f) } else { var b = f; f = a; a = b } } return j.revert(f) } function bnModPowInt(b, a) { var c; if (b < 256 || a.isEven()) { c = new Classic(a) } else { c = new Montgomery(a) } return this.exp(b, c) } BigInteger.prototype.copyTo = bnpCopyTo; BigInteger.prototype.fromInt = bnpFromInt; BigInteger.prototype.fromString = bnpFromString; BigInteger.prototype.clamp = bnpClamp; BigInteger.prototype.dlShiftTo = bnpDLShiftTo; BigInteger.prototype.drShiftTo = bnpDRShiftTo; BigInteger.prototype.lShiftTo = bnpLShiftTo; BigInteger.prototype.rShiftTo = bnpRShiftTo; BigInteger.prototype.subTo = bnpSubTo; BigInteger.prototype.multiplyTo = bnpMultiplyTo; BigInteger.prototype.squareTo = bnpSquareTo; BigInteger.prototype.divRemTo = bnpDivRemTo; BigInteger.prototype.invDigit = bnpInvDigit; BigInteger.prototype.isEven = bnpIsEven; BigInteger.prototype.exp = bnpExp; BigInteger.prototype.toString = bnToString; BigInteger.prototype.negate = bnNegate; BigInteger.prototype.abs = bnAbs; BigInteger.prototype.compareTo = bnCompareTo; BigInteger.prototype.bitLength = bnBitLength; BigInteger.prototype.mod = bnMod; BigInteger.prototype.modPowInt = bnModPowInt; BigInteger.ZERO = nbv(0); BigInteger.ONE = nbv(1);
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour() { this.i = 0; this.j = 0; this.S = new Array() } function ARC4init(d) { var c, a, b; for (c = 0; c < 256; ++c) { this.S[c] = c } a = 0; for (c = 0; c < 256; ++c) { a = (a + this.S[c] + d[c % d.length]) & 255; b = this.S[c]; this.S[c] = this.S[a]; this.S[a] = b } this.i = 0; this.j = 0 } function ARC4next() { var a; this.i = (this.i + 1) & 255; this.j = (this.j + this.S[this.i]) & 255; a = this.S[this.i]; this.S[this.i] = this.S[this.j]; this.S[this.j] = a; return this.S[(a + this.S[this.i]) & 255] } Arcfour.prototype.init = ARC4init; Arcfour.prototype.next = ARC4next; function prng_newstate() { return new Arcfour() } var rng_psize = 256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var rng_state; var rng_pool; var rng_pptr; function rng_seed_int(a) { rng_pool[rng_pptr++] ^= a & 255; rng_pool[rng_pptr++] ^= (a >> 8) & 255; rng_pool[rng_pptr++] ^= (a >> 16) & 255; rng_pool[rng_pptr++] ^= (a >> 24) & 255; if (rng_pptr >= rng_psize) { rng_pptr -= rng_psize } } function rng_seed_time() { rng_seed_int(new Date().getTime()) } if (rng_pool == null) { rng_pool = new Array(); rng_pptr = 0; var t; if (window !== undefined && (window.crypto !== undefined || window.msCrypto !== undefined)) { var crypto = window.crypto || window.msCrypto; if (crypto.getRandomValues) { var ua = new Uint8Array(32); crypto.getRandomValues(ua); for (t = 0; t < 32; ++t) { rng_pool[rng_pptr++] = ua[t] } } else { if (navigator.appName == "Netscape" && navigator.appVersion < "5") { var z = window.crypto.random(32); for (t = 0; t < z.length; ++t) { rng_pool[rng_pptr++] = z.charCodeAt(t) & 255 } } } } while (rng_pptr < rng_psize) { t = Math.floor(65536 * Math.random()); rng_pool[rng_pptr++] = t >>> 8; rng_pool[rng_pptr++] = t & 255 } rng_pptr = 0; rng_seed_time() } function rng_get_byte() { if (rng_state == null) { rng_seed_time(); rng_state = prng_newstate(); rng_state.init(rng_pool); for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) { rng_pool[rng_pptr] = 0 } rng_pptr = 0 } return rng_state.next() } function rng_get_bytes(b) { var a; for (a = 0; a < b.length; ++a) { b[a] = rng_get_byte() } } function SecureRandom() { } SecureRandom.prototype.nextBytes = rng_get_bytes;
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var jsonParse = (function () { var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)"; var j = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))'; var i = '(?:"' + j + '*")'; var d = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + i + ")", "g"); var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"); var g = { '"': '"', "/": "/", "\\": "\\", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t" }; function h(l, m, n) { return m ? g[m] : String.fromCharCode(parseInt(n, 16)) } var c = new String(""); var a = "\\"; var f = { "{": Object, "[": Array }; var b = Object.hasOwnProperty; return function (u, q) { var p = u.match(d); var x; var v = p[0]; var l = false; if ("{" === v) { x = {} } else { if ("[" === v) { x = [] } else { x = []; l = true } } var t; var r = [x]; for (var o = 1 - l, m = p.length; o < m; ++o) { v = p[o]; var w; switch (v.charCodeAt(0)) { default: w = r[0]; w[t || w.length] = +(v); t = void 0; break; case 34: v = v.substring(1, v.length - 1); if (v.indexOf(a) !== -1) { v = v.replace(k, h) } w = r[0]; if (!t) { if (w instanceof Array) { t = w.length } else { t = v || c; break } } w[t] = v; t = void 0; break; case 91: w = r[0]; r.unshift(w[t || w.length] = []); t = void 0; break; case 93: r.shift(); break; case 102: w = r[0]; w[t || w.length] = false; t = void 0; break; case 110: w = r[0]; w[t || w.length] = null; t = void 0; break; case 116: w = r[0]; w[t || w.length] = true; t = void 0; break; case 123: w = r[0]; r.unshift(w[t || w.length] = {}); t = void 0; break; case 125: r.shift(); break } } if (l) { if (r.length !== 1) { throw new Error() } x = x[0] } else { if (r.length) { throw new Error() } } if (q) { var s = function (C, B) { var D = C[B]; if (D && typeof D === "object") { var n = null; for (var z in D) { if (b.call(D, z) && D !== C) { var y = s(D, z); if (y !== void 0) { D[z] = y } else { if (!n) { n = [] } n.push(z) } } } if (n) { for (var A = n.length; --A >= 0;) { delete D[n[A]] } } } return q.call(C, B, D) }; x = s({ "": x }, "") } return x } })();
/*! base64x-1.1.11 (c) 2012-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var KJUR; if (typeof KJUR == "undefined" || !KJUR) { KJUR = {} } if (typeof KJUR.lang == "undefined" || !KJUR.lang) { KJUR.lang = {} } KJUR.lang.String = function () { }; function Base64x() { } function stoBA(d) { var b = new Array(); for (var c = 0; c < d.length; c++) { b[c] = d.charCodeAt(c) } return b } function BAtos(b) { var d = ""; for (var c = 0; c < b.length; c++) { d = d + String.fromCharCode(b[c]) } return d } function BAtohex(b) { var e = ""; for (var d = 0; d < b.length; d++) { var c = b[d].toString(16); if (c.length == 1) { c = "0" + c } e = e + c } return e } function stohex(a) { return BAtohex(stoBA(a)) } function stob64(a) { return hex2b64(stohex(a)) } function stob64u(a) { return b64tob64u(hex2b64(stohex(a))) } function b64utos(a) { return BAtos(b64toBA(b64utob64(a))) } function b64tob64u(a) { a = a.replace(/\=/g, ""); a = a.replace(/\+/g, "-"); a = a.replace(/\//g, "_"); return a } function b64utob64(a) { if (a.length % 4 == 2) { a = a + "==" } else { if (a.length % 4 == 3) { a = a + "=" } } a = a.replace(/-/g, "+"); a = a.replace(/_/g, "/"); return a } function hextob64u(a) { if (a.length % 2 == 1) { a = "0" + a } return b64tob64u(hex2b64(a)) } function b64utohex(a) { return b64tohex(b64utob64(a)) } var utf8tob64u, b64utoutf8; if (typeof Buffer === "function") { utf8tob64u = function (a) { return b64tob64u(new Buffer(a, "utf8").toString("base64")) }; b64utoutf8 = function (a) { return new Buffer(b64utob64(a), "base64").toString("utf8") } } else { utf8tob64u = function (a) { return hextob64u(uricmptohex(encodeURIComponentAll(a))) }; b64utoutf8 = function (a) { return decodeURIComponent(hextouricmp(b64utohex(a))) } } function utf8tob64(a) { return hex2b64(uricmptohex(encodeURIComponentAll(a))) } function b64toutf8(a) { return decodeURIComponent(hextouricmp(b64tohex(a))) } function utf8tohex(a) { return uricmptohex(encodeURIComponentAll(a)) } function hextoutf8(a) { return decodeURIComponent(hextouricmp(a)) } function hextorstr(c) { var b = ""; for (var a = 0; a < c.length - 1; a += 2) { b += String.fromCharCode(parseInt(c.substr(a, 2), 16)) } return b } function rstrtohex(c) { var a = ""; for (var b = 0; b < c.length; b++) { a += ("0" + c.charCodeAt(b).toString(16)).slice(-2) } return a } function hextob64(a) { return hex2b64(a) } function hextob64nl(b) { var a = hextob64(b); var c = a.replace(/(.{64})/g, "$1\r\n"); c = c.replace(/\r\n$/, ""); return c } function b64nltohex(b) { var a = b.replace(/[^0-9A-Za-z\/+=]*/g, ""); var c = b64tohex(a); return c } function hextoArrayBuffer(d) { if (d.length % 2 != 0) { throw "input is not even length" } if (d.match(/^[0-9A-Fa-f]+$/) == null) { throw "input is not hexadecimal" } var b = new ArrayBuffer(d.length / 2); var a = new DataView(b); for (var c = 0; c < d.length / 2; c++) { a.setUint8(c, parseInt(d.substr(c * 2, 2), 16)) } return b } function ArrayBuffertohex(b) { var d = ""; var a = new DataView(b); for (var c = 0; c < b.byteLength; c++) { d += ("00" + a.getUint8(c).toString(16)).slice(-2) } return d } function zulutomsec(n) { var l, j, m, e, f, i, b, k; var a, h, g, c; c = n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/); if (c) { a = c[1]; l = parseInt(a); if (a.length === 2) { if (50 <= l && l < 100) { l = 1900 + l } else { if (0 <= l && l < 50) { l = 2000 + l } } } j = parseInt(c[2]) - 1; m = parseInt(c[3]); e = parseInt(c[4]); f = parseInt(c[5]); i = parseInt(c[6]); b = 0; h = c[7]; if (h !== "") { g = (h.substr(1) + "00").substr(0, 3); b = parseInt(g) } return Date.UTC(l, j, m, e, f, i, b) } throw "unsupported zulu format: " + n } function zulutosec(a) { var b = zulutomsec(a); return ~~(b / 1000) } function zulutodate(a) { return new Date(zulutomsec(a)) } function datetozulu(g, e, f) { var b; var a = g.getUTCFullYear(); if (e) { if (a < 1950 || 2049 < a) { throw "not proper year for UTCTime: " + a } b = ("" + a).slice(-2) } else { b = ("000" + a).slice(-4) } b += ("0" + (g.getUTCMonth() + 1)).slice(-2); b += ("0" + g.getUTCDate()).slice(-2); b += ("0" + g.getUTCHours()).slice(-2); b += ("0" + g.getUTCMinutes()).slice(-2); b += ("0" + g.getUTCSeconds()).slice(-2); if (f) { var c = g.getUTCMilliseconds(); if (c !== 0) { c = ("00" + c).slice(-3); c = c.replace(/0+$/g, ""); b += "." + c } } b += "Z"; return b } function uricmptohex(a) { return a.replace(/%/g, "") } function hextouricmp(a) { return a.replace(/(..)/g, "%$1") } function encodeURIComponentAll(a) { var d = encodeURIComponent(a); var b = ""; for (var c = 0; c < d.length; c++) { if (d[c] == "%") { b = b + d.substr(c, 3); c = c + 2 } else { b = b + "%" + stohex(d[c]) } } return b } function newline_toUnix(a) { a = a.replace(/\r\n/mg, "\n"); return a } function newline_toDos(a) { a = a.replace(/\r\n/mg, "\n"); a = a.replace(/\n/mg, "\r\n"); return a } KJUR.lang.String.isInteger = function (a) { if (a.match(/^[0-9]+$/)) { return true } else { if (a.match(/^-[0-9]+$/)) { return true } else { return false } } }; KJUR.lang.String.isHex = function (a) { if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) { return true } else { return false } }; KJUR.lang.String.isBase64 = function (a) { a = a.replace(/\s+/g, ""); if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) { return true } else { return false } }; KJUR.lang.String.isBase64URL = function (a) { if (a.match(/[+/=]/)) { return false } a = b64utob64(a); return KJUR.lang.String.isBase64(a) }; KJUR.lang.String.isIntegerArray = function (a) { a = a.replace(/\s+/g, ""); if (a.match(/^\[[0-9,]+\]$/)) { return true } else { return false } }; function hextoposhex(a) { if (a.length % 2 == 1) { return "0" + a } if (a.substr(0, 1) > "7") { return "00" + a } return a } function intarystrtohex(b) { b = b.replace(/^\s*\[\s*/, ""); b = b.replace(/\s*\]\s*$/, ""); b = b.replace(/\s*/g, ""); try { var c = b.split(/,/).map(function (g, e, h) { var f = parseInt(g); if (f < 0 || 255 < f) { throw "integer not in range 0-255" } var d = ("00" + f.toString(16)).slice(-2); return d }).join(""); return c } catch (a) { throw "malformed integer array string: " + a } } var strdiffidx = function (c, a) { var d = c.length; if (c.length > a.length) { d = a.length } for (var b = 0; b < d; b++) { if (c.charCodeAt(b) != a.charCodeAt(b)) { return b } } if (c.length != a.length) { return d } return -1 };
/*! crypto-1.1.12.js (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) { KJUR = {} } if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) { KJUR.crypto = {} } KJUR.crypto.Util = new function () { this.DIGESTINFOHEAD = { sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", ripemd160: "3021300906052b2403020105000414", }; this.DEFAULTPROVIDER = { md5: "cryptojs", sha1: "cryptojs", sha224: "cryptojs", sha256: "cryptojs", sha384: "cryptojs", sha512: "cryptojs", ripemd160: "cryptojs", hmacmd5: "cryptojs", hmacsha1: "cryptojs", hmacsha224: "cryptojs", hmacsha256: "cryptojs", hmacsha384: "cryptojs", hmacsha512: "cryptojs", hmacripemd160: "cryptojs", MD5withRSA: "cryptojs/jsrsa", SHA1withRSA: "cryptojs/jsrsa", SHA224withRSA: "cryptojs/jsrsa", SHA256withRSA: "cryptojs/jsrsa", SHA384withRSA: "cryptojs/jsrsa", SHA512withRSA: "cryptojs/jsrsa", RIPEMD160withRSA: "cryptojs/jsrsa", MD5withECDSA: "cryptojs/jsrsa", SHA1withECDSA: "cryptojs/jsrsa", SHA224withECDSA: "cryptojs/jsrsa", SHA256withECDSA: "cryptojs/jsrsa", SHA384withECDSA: "cryptojs/jsrsa", SHA512withECDSA: "cryptojs/jsrsa", RIPEMD160withECDSA: "cryptojs/jsrsa", SHA1withDSA: "cryptojs/jsrsa", SHA224withDSA: "cryptojs/jsrsa", SHA256withDSA: "cryptojs/jsrsa", MD5withRSAandMGF1: "cryptojs/jsrsa", SHA1withRSAandMGF1: "cryptojs/jsrsa", SHA224withRSAandMGF1: "cryptojs/jsrsa", SHA256withRSAandMGF1: "cryptojs/jsrsa", SHA384withRSAandMGF1: "cryptojs/jsrsa", SHA512withRSAandMGF1: "cryptojs/jsrsa", RIPEMD160withRSAandMGF1: "cryptojs/jsrsa", }; this.CRYPTOJSMESSAGEDIGESTNAME = { md5: CryptoJS.algo.MD5, sha1: CryptoJS.algo.SHA1, sha224: CryptoJS.algo.SHA224, sha256: CryptoJS.algo.SHA256, sha384: CryptoJS.algo.SHA384, sha512: CryptoJS.algo.SHA512, ripemd160: CryptoJS.algo.RIPEMD160 }; this.getDigestInfoHex = function (a, b) { if (typeof this.DIGESTINFOHEAD[b] == "undefined") { throw "alg not supported in Util.DIGESTINFOHEAD: " + b } return this.DIGESTINFOHEAD[b] + a }; this.getPaddedDigestInfoHex = function (h, a, j) { var c = this.getDigestInfoHex(h, a); var d = j / 4; if (c.length + 22 > d) { throw "key is too short for SigAlg: keylen=" + j + "," + a } var b = "0001"; var k = "00" + c; var g = ""; var l = d - b.length - k.length; for (var f = 0; f < l; f += 2) { g += "ff" } var e = b + g + k; return e }; this.hashString = function (a, c) { var b = new KJUR.crypto.MessageDigest({ alg: c }); return b.digestString(a) }; this.hashHex = function (b, c) { var a = new KJUR.crypto.MessageDigest({ alg: c }); return a.digestHex(b) }; this.sha1 = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "sha1", prov: "cryptojs" }); return b.digestString(a) }; this.sha256 = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "sha256", prov: "cryptojs" }); return b.digestString(a) }; this.sha256Hex = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "sha256", prov: "cryptojs" }); return b.digestHex(a) }; this.sha512 = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "sha512", prov: "cryptojs" }); return b.digestString(a) }; this.sha512Hex = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "sha512", prov: "cryptojs" }); return b.digestHex(a) } }; KJUR.crypto.Util.md5 = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "md5", prov: "cryptojs" }); return b.digestString(a) }; KJUR.crypto.Util.ripemd160 = function (a) { var b = new KJUR.crypto.MessageDigest({ alg: "ripemd160", prov: "cryptojs" }); return b.digestString(a) }; KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom(); KJUR.crypto.Util.getRandomHexOfNbytes = function (b) { var a = new Array(b); KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a); return BAtohex(a) }; KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function (a) { return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a), 16) }; KJUR.crypto.Util.getRandomHexOfNbits = function (d) { var c = d % 8; var a = (d - c) / 8; var b = new Array(a + 1); KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b); b[0] = (((255 << c) & 255) ^ 255) & b[0]; return BAtohex(b) }; KJUR.crypto.Util.getRandomBigIntegerOfNbits = function (a) { return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a), 16) }; KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function (b) { var a = b.bitLength(); while (1) { var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a); if (b.compareTo(c) != -1) { return c } } }; KJUR.crypto.Util.getRandomBigIntegerMinToMax = function (e, b) { var c = e.compareTo(b); if (c == 1) { throw "biMin is greater than biMax" } if (c == 0) { return e } var a = b.subtract(e); var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a); return d.add(e) }; KJUR.crypto.MessageDigest = function (c) { var b = null; var a = null; var d = null; this.setAlgAndProvider = function (g, f) { g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g); if (g !== null && f === undefined) { f = KJUR.crypto.Util.DEFAULTPROVIDER[g] } if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") { try { this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create() } catch (e) { throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e } this.updateString = function (h) { this.md.update(h) }; this.updateHex = function (h) { var i = CryptoJS.enc.Hex.parse(h); this.md.update(i) }; this.digest = function () { var h = this.md.finalize(); return h.toString(CryptoJS.enc.Hex) }; this.digestString = function (h) { this.updateString(h); return this.digest() }; this.digestHex = function (h) { this.updateHex(h); return this.digest() } } if (":sha256:".indexOf(g) != -1 && f == "sjcl") { try { this.md = new sjcl.hash.sha256() } catch (e) { throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e } this.updateString = function (h) { this.md.update(h) }; this.updateHex = function (i) { var h = sjcl.codec.hex.toBits(i); this.md.update(h) }; this.digest = function () { var h = this.md.finalize(); return sjcl.codec.hex.fromBits(h) }; this.digestString = function (h) { this.updateString(h); return this.digest() }; this.digestHex = function (h) { this.updateHex(h); return this.digest() } } }; this.updateString = function (e) { throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName }; this.updateHex = function (e) { throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName }; this.digest = function () { throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName }; this.digestString = function (e) { throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName }; this.digestHex = function (e) { throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName }; if (c !== undefined) { if (c.alg !== undefined) { this.algName = c.alg; if (c.prov === undefined) { this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName] } this.setAlgAndProvider(this.algName, this.provName) } } }; KJUR.crypto.MessageDigest.getCanonicalAlgName = function (a) { if (typeof a === "string") { a = a.toLowerCase(); a = a.replace(/-/, "") } return a }; KJUR.crypto.MessageDigest.getHashLength = function (c) { var b = KJUR.crypto.MessageDigest; var a = b.getCanonicalAlgName(c); if (b.HASHLENGTH[a] === undefined) { throw "not supported algorithm: " + c } return b.HASHLENGTH[a] }; KJUR.crypto.MessageDigest.HASHLENGTH = { md5: 16, sha1: 20, sha224: 28, sha256: 32, sha384: 48, sha512: 64, ripemd160: 20 }; KJUR.crypto.Mac = function (d) { var f = null; var c = null; var a = null; var e = null; var b = null; this.setAlgAndProvider = function (k, i) { k = k.toLowerCase(); if (k == null) { k = "hmacsha1" } k = k.toLowerCase(); if (k.substr(0, 4) != "hmac") { throw "setAlgAndProvider unsupported HMAC alg: " + k } if (i === undefined) { i = KJUR.crypto.Util.DEFAULTPROVIDER[k] } this.algProv = k + "/" + i; var g = k.substr(4); if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") { try { var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g]; this.mac = CryptoJS.algo.HMAC.create(j, this.pass) } catch (h) { throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h } this.updateString = function (l) { this.mac.update(l) }; this.updateHex = function (l) { var m = CryptoJS.enc.Hex.parse(l); this.mac.update(m) }; this.doFinal = function () { var l = this.mac.finalize(); return l.toString(CryptoJS.enc.Hex) }; this.doFinalString = function (l) { this.updateString(l); return this.doFinal() }; this.doFinalHex = function (l) { this.updateHex(l); return this.doFinal() } } }; this.updateString = function (g) { throw "updateString(str) not supported for this alg/prov: " + this.algProv }; this.updateHex = function (g) { throw "updateHex(hex) not supported for this alg/prov: " + this.algProv }; this.doFinal = function () { throw "digest() not supported for this alg/prov: " + this.algProv }; this.doFinalString = function (g) { throw "digestString(str) not supported for this alg/prov: " + this.algProv }; this.doFinalHex = function (g) { throw "digestHex(hex) not supported for this alg/prov: " + this.algProv }; this.setPassword = function (h) { if (typeof h == "string") { var g = h; if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) { g = rstrtohex(h) } this.pass = CryptoJS.enc.Hex.parse(g); return } if (typeof h != "object") { throw "KJUR.crypto.Mac unsupported password type: " + h } var g = null; if (h.hex !== undefined) { if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) { throw "Mac: wrong hex password: " + h.hex } g = h.hex } if (h.utf8 !== undefined) { g = utf8tohex(h.utf8) } if (h.rstr !== undefined) { g = rstrtohex(h.rstr) } if (h.b64 !== undefined) { g = b64tohex(h.b64) } if (h.b64u !== undefined) { g = b64utohex(h.b64u) } if (g == null) { throw "KJUR.crypto.Mac unsupported password type: " + h } this.pass = CryptoJS.enc.Hex.parse(g) }; if (d !== undefined) { if (d.pass !== undefined) { this.setPassword(d.pass) } if (d.alg !== undefined) { this.algName = d.alg; if (d.prov === undefined) { this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName] } this.setAlgAndProvider(this.algName, this.provName) } } }; KJUR.crypto.Signature = function (o) { var q = null; var n = null; var r = null; var c = null; var l = null; var d = null; var k = null; var h = null; var p = null; var e = null; var b = -1; var g = null; var j = null; var a = null; var i = null; var f = null; this._setAlgNames = function () { var s = this.algName.match(/^(.+)with(.+)$/); if (s) { this.mdAlgName = s[1].toLowerCase(); this.pubkeyAlgName = s[2].toLowerCase() } }; this._zeroPaddingOfSignature = function (x, w) { var v = ""; var t = w / 4 - x.length; for (var u = 0; u < t; u++) { v = v + "0" } return v + x }; this.setAlgAndProvider = function (u, t) { this._setAlgNames(); if (t != "cryptojs/jsrsa") { throw "provider not supported: " + t } if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) { try { this.md = new KJUR.crypto.MessageDigest({ alg: this.mdAlgName }) } catch (s) { throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s } this.init = function (w, x) { var y = null; try { if (x === undefined) { y = KEYUTIL.getKey(w) } else { y = KEYUTIL.getKey(w, x) } } catch (v) { throw "init failed:" + v } if (y.isPrivate === true) { this.prvKey = y; this.state = "SIGN" } else { if (y.isPublic === true) { this.pubKey = y; this.state = "VERIFY" } else { throw "init failed.:" + y } } }; this.initSign = function (v) { if (typeof v.ecprvhex == "string" && typeof v.eccurvename == "string") { this.ecprvhex = v.ecprvhex; this.eccurvename = v.eccurvename } else { this.prvKey = v } this.state = "SIGN" }; this.initVerifyByPublicKey = function (v) { if (typeof v.ecpubhex == "string" && typeof v.eccurvename == "string") { this.ecpubhex = v.ecpubhex; this.eccurvename = v.eccurvename } else { if (v instanceof KJUR.crypto.ECDSA) { this.pubKey = v } else { if (v instanceof RSAKey) { this.pubKey = v } } } this.state = "VERIFY" }; this.initVerifyByCertificatePEM = function (v) { var w = new X509(); w.readCertPEM(v); this.pubKey = w.subjectPublicKeyRSA; this.state = "VERIFY" }; this.updateString = function (v) { this.md.updateString(v) }; this.updateHex = function (v) { this.md.updateHex(v) }; this.sign = function () { this.sHashHex = this.md.digest(); if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") { var v = new KJUR.crypto.ECDSA({ curve: this.eccurvename }); this.hSign = v.signHex(this.sHashHex, this.ecprvhex) } else { if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") { this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen) } else { if (this.prvKey instanceof RSAKey && this.pubkeyAlgName == "rsa") { this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName) } else { if (this.prvKey instanceof KJUR.crypto.ECDSA) { this.hSign = this.prvKey.signWithMessageHash(this.sHashHex) } else { if (this.prvKey instanceof KJUR.crypto.DSA) { this.hSign = this.prvKey.signWithMessageHash(this.sHashHex) } else { throw "Signature: unsupported public key alg: " + this.pubkeyAlgName } } } } } return this.hSign }; this.signString = function (v) { this.updateString(v); return this.sign() }; this.signHex = function (v) { this.updateHex(v); return this.sign() }; this.verify = function (v) { this.sHashHex = this.md.digest(); if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") { var w = new KJUR.crypto.ECDSA({ curve: this.eccurvename }); return w.verifyHex(this.sHashHex, v, this.ecpubhex) } else { if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsaandmgf1") { return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen) } else { if (this.pubKey instanceof RSAKey && this.pubkeyAlgName == "rsa") { return this.pubKey.verifyWithMessageHash(this.sHashHex, v) } else { if (this.pubKey instanceof KJUR.crypto.ECDSA) { return this.pubKey.verifyWithMessageHash(this.sHashHex, v) } else { if (this.pubKey instanceof KJUR.crypto.DSA) { return this.pubKey.verifyWithMessageHash(this.sHashHex, v) } else { throw "Signature: unsupported public key alg: " + this.pubkeyAlgName } } } } } } } }; this.init = function (s, t) { throw "init(key, pass) not supported for this alg:prov=" + this.algProvName }; this.initVerifyByPublicKey = function (s) { throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName }; this.initVerifyByCertificatePEM = function (s) { throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName }; this.initSign = function (s) { throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName }; this.updateString = function (s) { throw "updateString(str) not supported for this alg:prov=" + this.algProvName }; this.updateHex = function (s) { throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName }; this.sign = function () { throw "sign() not supported for this alg:prov=" + this.algProvName }; this.signString = function (s) { throw "digestString(str) not supported for this alg:prov=" + this.algProvName }; this.signHex = function (s) { throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName }; this.verify = function (s) { throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName }; this.initParams = o; if (o !== undefined) { if (o.alg !== undefined) { this.algName = o.alg; if (o.prov === undefined) { this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName] } else { this.provName = o.prov } this.algProvName = this.algName + ":" + this.provName; this.setAlgAndProvider(this.algName, this.provName); this._setAlgNames() } if (o.psssaltlen !== undefined) { this.pssSaltLen = o.psssaltlen } if (o.prvkeypem !== undefined) { if (o.prvkeypas !== undefined) { throw "both prvkeypem and prvkeypas parameters not supported" } else { try { var q = new RSAKey(); q.readPrivateKeyFromPEMString(o.prvkeypem); this.initSign(q) } catch (m) { throw "fatal error to load pem private key: " + m } } } } }; KJUR.crypto.Cipher = function (a) { }; KJUR.crypto.Cipher.encrypt = function (e, f, d) { if (f instanceof RSAKey && f.isPublic) { var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d); if (c === "RSA") { return f.encrypt(e) } if (c === "RSAOAEP") { return f.encryptOAEP(e, "sha1") } var b = c.match(/^RSAOAEP(\d+)$/); if (b !== null) { return f.encryptOAEP(e, "sha" + b[1]) } throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d } else { throw "Cipher.encrypt: unsupported key or algorithm" } }; KJUR.crypto.Cipher.decrypt = function (e, f, d) { if (f instanceof RSAKey && f.isPrivate) { var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d); if (c === "RSA") { return f.decrypt(e) } if (c === "RSAOAEP") { return f.decryptOAEP(e, "sha1") } var b = c.match(/^RSAOAEP(\d+)$/); if (b !== null) { return f.decryptOAEP(e, "sha" + b[1]) } throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d } else { throw "Cipher.decrypt: unsupported key or algorithm" } }; KJUR.crypto.Cipher.getAlgByKeyAndName = function (b, a) { if (b instanceof RSAKey) { if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) { return a } if (a === null || a === undefined) { return "RSA" } throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a } throw "getAlgByKeyAndName: not supported algorithm name: " + a }; KJUR.crypto.OID = new function () { this.oidhex2name = { "2a864886f70d010101": "rsaEncryption", "2a8648ce3d0201": "ecPublicKey", "2a8648ce380401": "dsa", "2a8648ce3d030107": "secp256r1", "2b8104001f": "secp192k1", "2b81040021": "secp224r1", "2b8104000a": "secp256k1", "2b81040023": "secp521r1", "2b81040022": "secp384r1", "2a8648ce380403": "SHA1withDSA", "608648016503040301": "SHA224withDSA", "608648016503040302": "SHA256withDSA", } };
/*! jws-3.3.6 (c) 2013-2017 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
if (typeof KJUR == "undefined" || !KJUR) { KJUR = {} } if (typeof KJUR.jws == "undefined" || !KJUR.jws) { KJUR.jws = {} } KJUR.jws.JWS = function () { var a = KJUR.jws.JWS; this.parseJWS = function (e, h) { if ((this.parsedJWS !== undefined) && (h || (this.parsedJWS.sigvalH !== undefined))) { return } var g = e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/); if (g == null) { throw "JWS signature is not a form of 'Head.Payload.SigValue'." } var i = g[1]; var c = g[2]; var j = g[3]; var l = i + "." + c; this.parsedJWS = {}; this.parsedJWS.headB64U = i; this.parsedJWS.payloadB64U = c; this.parsedJWS.sigvalB64U = j; this.parsedJWS.si = l; if (!h) { var f = b64utohex(j); var d = parseBigInt(f, 16); this.parsedJWS.sigvalH = f; this.parsedJWS.sigvalBI = d } var b = b64utoutf8(i); var k = b64utoutf8(c); this.parsedJWS.headS = b; this.parsedJWS.payloadS = k; if (!a.isSafeJSONString(b, this.parsedJWS, "headP")) { throw "malformed JSON string for JWS Head: " + b } } }; KJUR.jws.JWS.sign = function (a, i, c, m, l) { var k = KJUR.jws.JWS; var q, e, j; if (typeof i != "string" && typeof i != "object") { throw "spHeader must be JSON string or object: " + i } if (typeof i == "object") { e = i; q = JSON.stringify(e) } if (typeof i == "string") { q = i; if (!k.isSafeJSONString(q)) { throw "JWS Head is not safe JSON string: " + q } e = k.readSafeJSONString(q) } j = c; if (typeof c == "object") { j = JSON.stringify(c) } if ((a == "" || a == null) && e.alg !== undefined) { a = e.alg } if ((a != "" && a != null) && e.alg === undefined) { e.alg = a; q = JSON.stringify(e) } if (a !== e.alg) { throw "alg and sHeader.alg doesn't match: " + a + "!=" + e.alg } var d = null; if (k.jwsalg2sigalg[a] === undefined) { throw "unsupported alg name: " + a } else { d = k.jwsalg2sigalg[a] } var b = utf8tob64u(q); var g = utf8tob64u(j); var o = b + "." + g; var n = ""; if (d.substr(0, 4) == "Hmac") { if (m === undefined) { throw "mac key shall be specified for HS* alg" } var h = new KJUR.crypto.Mac({ alg: d, prov: "cryptojs", pass: m }); h.updateString(o); n = h.doFinal() } else { if (d.indexOf("withECDSA") != -1) { var p = new KJUR.crypto.Signature({ alg: d }); p.init(m, l); p.updateString(o); hASN1Sig = p.sign(); n = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig) } else { if (d != "none") { var p = new KJUR.crypto.Signature({ alg: d }); p.init(m, l); p.updateString(o); n = p.sign() } } } var f = hextob64u(n); return o + "." + f }; KJUR.jws.JWS.verify = function (p, t, j) { var m = KJUR.jws.JWS; var q = p.split("."); var d = q[0]; var l = q[1]; var b = d + "." + l; var r = b64utohex(q[2]); var i = m.readSafeJSONString(b64utoutf8(q[0])); var h = null; var s = null; if (i.alg === undefined) { throw "algorithm not specified in header" } else { h = i.alg; s = h.substr(0, 2) } if (j != null && Object.prototype.toString.call(j) === "[object Array]" && j.length > 0) { var c = ":" + j.join(":") + ":"; if (c.indexOf(":" + h + ":") == -1) { throw "algorithm '" + h + "' not accepted in the list" } } if (h != "none" && t === null) { throw "key shall be specified to verify." } if (typeof t == "string" && t.indexOf("-----BEGIN ") != -1) { t = KEYUTIL.getKey(t) } if (s == "RS" || s == "PS") { if (!(t instanceof RSAKey)) { throw "key shall be a RSAKey obj for RS* and PS* algs" } } if (s == "ES") { if (!(t instanceof KJUR.crypto.ECDSA)) { throw "key shall be a ECDSA obj for ES* algs" } } if (h == "none") { } var n = null; if (m.jwsalg2sigalg[i.alg] === undefined) { throw "unsupported alg name: " + h } else { n = m.jwsalg2sigalg[h] } if (n == "none") { throw "not supported" } else { if (n.substr(0, 4) == "Hmac") { var k = null; if (t === undefined) { throw "hexadecimal key shall be specified for HMAC" } var g = new KJUR.crypto.Mac({ alg: n, pass: t }); g.updateString(b); k = g.doFinal(); return r == k } else { if (n.indexOf("withECDSA") != -1) { var f = null; try { f = KJUR.crypto.ECDSA.concatSigToASN1Sig(r) } catch (o) { return false } var e = new KJUR.crypto.Signature({ alg: n }); e.init(t); e.updateString(b); return e.verify(f) } else { var e = new KJUR.crypto.Signature({ alg: n }); e.init(t); e.updateString(b); return e.verify(r) } } } }; KJUR.jws.JWS.parse = function (g) { var c = g.split("."); var b = {}; var f, e, d; if (c.length != 2 && c.length != 3) { throw "malformed sJWS: wrong number of '.' splitted elements" } f = c[0]; e = c[1]; if (c.length == 3) { d = c[2] } b.headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(f)); b.payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(e)); b.headerPP = JSON.stringify(b.headerObj, null, "  "); if (b.payloadObj == null) { b.payloadPP = b64utoutf8(e) } else { b.payloadPP = JSON.stringify(b.payloadObj, null, "  ") } if (d !== undefined) { b.sigHex = b64utohex(d) } return b }; KJUR.jws.JWS.verifyJWT = function (d, j, l) { var h = KJUR.jws.JWS; var i = d.split("."); var c = i[0]; var g = i[1]; var m = c + "." + g; var k = b64utohex(i[2]); var f = h.readSafeJSONString(b64utoutf8(c)); var e = h.readSafeJSONString(b64utoutf8(g)); if (f.alg === undefined) { return false } if (l.alg === undefined) { throw "acceptField.alg shall be specified" } if (!h.inArray(f.alg, l.alg)) { return false } if (e.iss !== undefined && typeof l.iss === "object") { if (!h.inArray(e.iss, l.iss)) { return false } } if (e.sub !== undefined && typeof l.sub === "object") { if (!h.inArray(e.sub, l.sub)) { return false } } if (e.aud !== undefined && typeof l.aud === "object") { if (typeof e.aud == "string") { if (!h.inArray(e.aud, l.aud)) { return false } } else { if (typeof e.aud == "object") { if (!h.includedArray(e.aud, l.aud)) { return false } } } } var b = KJUR.jws.IntDate.getNow(); if (l.verifyAt !== undefined && typeof l.verifyAt === "number") { b = l.verifyAt } if (l.gracePeriod === undefined || typeof l.gracePeriod !== "number") { l.gracePeriod = 0 } if (e.exp !== undefined && typeof e.exp == "number") { if (e.exp + l.gracePeriod < b) { return false } } if (e.nbf !== undefined && typeof e.nbf == "number") { if (b < e.nbf - l.gracePeriod) { return false } } if (e.iat !== undefined && typeof e.iat == "number") { if (b < e.iat - l.gracePeriod) { return false } } if (e.jti !== undefined && l.jti !== undefined) { if (e.jti !== l.jti) { return false } } if (!KJUR.jws.JWS.verify(d, j, l.alg)) { return false } return true }; KJUR.jws.JWS.includedArray = function (b, a) { var d = KJUR.jws.JWS.inArray; if (b === null) { return false } if (typeof b !== "object") { return false } if (typeof b.length !== "number") { return false } for (var c = 0; c < b.length; c++) { if (!d(b[c], a)) { return false } } return true }; KJUR.jws.JWS.inArray = function (d, b) { if (b === null) { return false } if (typeof b !== "object") { return false } if (typeof b.length !== "number") { return false } for (var c = 0; c < b.length; c++) { if (b[c] == d) { return true } } return false }; KJUR.jws.JWS.jwsalg2sigalg = { HS256: "HmacSHA256", HS384: "HmacSHA384", HS512: "HmacSHA512", RS256: "SHA256withRSA", RS384: "SHA384withRSA", RS512: "SHA512withRSA", ES256: "SHA256withECDSA", ES384: "SHA384withECDSA", PS256: "SHA256withRSAandMGF1", PS384: "SHA384withRSAandMGF1", PS512: "SHA512withRSAandMGF1", none: "none", }; KJUR.jws.JWS.isSafeJSONString = function (c, b, d) { var e = null; try { e = jsonParse(c); if (typeof e != "object") { return 0 } if (e.constructor === Array) { return 0 } if (b) { b[d] = e } return 1 } catch (a) { return 0 } }; KJUR.jws.JWS.readSafeJSONString = function (b) { var c = null; try { c = jsonParse(b); if (typeof c != "object") { return null } if (c.constructor === Array) { return null } return c } catch (a) { return null } }; KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function (b) { var a = b.match(/^[^.]+\.[^.]+\.([^.]+)$/); if (a == null) { throw "JWS signature is not a form of 'Head.Payload.SigValue'." } return a[1] }; KJUR.jws.JWS.getJWKthumbprint = function (d) { if (d.kty !== "RSA" && d.kty !== "EC" && d.kty !== "oct") { throw "unsupported algorithm for JWK Thumprint" } var a = "{"; if (d.kty === "RSA") { if (typeof d.n != "string" || typeof d.e != "string") { throw "wrong n and e value for RSA key" } a += '"e":"' + d.e + '",'; a += '"kty":"' + d.kty + '",'; a += '"n":"' + d.n + '"}' } else { if (d.kty === "EC") { if (typeof d.crv != "string" || typeof d.x != "string" || typeof d.y != "string") { throw "wrong crv, x and y value for EC key" } a += '"crv":"' + d.crv + '",'; a += '"kty":"' + d.kty + '",'; a += '"x":"' + d.x + '",'; a += '"y":"' + d.y + '"}' } else { if (d.kty === "oct") { if (typeof d.k != "string") { throw "wrong k value for oct(symmetric) key" } a += '"kty":"' + d.kty + '",'; a += '"k":"' + d.k + '"}' } } } var b = rstrtohex(a); var c = KJUR.crypto.Util.hashHex(b, "sha256"); var e = hextob64u(c); return e }; KJUR.jws.IntDate = {}; KJUR.jws.IntDate.get = function (a) { if (a == "now") { return KJUR.jws.IntDate.getNow() } else { if (a == "now + 1hour") { return KJUR.jws.IntDate.getNow() + 60 * 60 } else { if (a == "now + 1day") { return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 } else { if (a == "now + 1month") { return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 30 } else { if (a == "now + 1year") { return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 365 } else { if (a.match(/Z$/)) { return KJUR.jws.IntDate.getZulu(a) } else { if (a.match(/^[0-9]+$/)) { return parseInt(a) } } } } } } } throw "unsupported format: " + a }; KJUR.jws.IntDate.getZulu = function (a) { return zulutosec(a) }; KJUR.jws.IntDate.getNow = function () { var a = ~~(new Date() / 1000); return a }; KJUR.jws.IntDate.intDate2UTCString = function (a) { var b = new Date(a * 1000); return b.toUTCString() }; KJUR.jws.IntDate.intDate2Zulu = function (e) { var i = new Date(e * 1000); var h = ("0000" + i.getUTCFullYear()).slice(-4); var g = ("00" + (i.getUTCMonth() + 1)).slice(-2); var b = ("00" + i.getUTCDate()).slice(-2); var a = ("00" + i.getUTCHours()).slice(-2); var c = ("00" + i.getUTCMinutes()).slice(-2); var f = ("00" + i.getUTCSeconds()).slice(-2); return h + g + b + a + c + f + "Z" };
// From: https://jwt.io/js/jwt.js

; (function () {

	var object =
		typeof exports != 'undefined' ? exports :
			typeof self != 'undefined' ? self : // #8: web workers
				$.global; // #31: ExtendScript

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
		this.message = message;
	}
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	// encoder
	// [https://gist.github.com/999166] by [https://github.com/nignag]
	object.btoa || (
		object.btoa = function (input) {
			var str = String(input);
			for (
				// initialize result and counter
				var block, charCode, idx = 0, map = chars, output = '';
				// if the next str index does not exist:
				//   change the mapping table to "="
				//   check if d has no fractional digits
				str.charAt(idx | 0) || (map = '=', idx % 1);
				// "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
				output += map.charAt(63 & block >> 8 - idx % 1 * 8)
			) {
				charCode = str.charCodeAt(idx += 3 / 4);
				if (charCode > 0xFF) {
					throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
				}
				block = block << 8 | charCode;
			}
			return output;
		});

	// decoder
	// [https://gist.github.com/1020396] by [https://github.com/atk]
	(
		object.atob = function (input) {
			var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
			if (str.length % 4 == 1) {
				throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
			}
			for (
				// initialize result and counters
				var bc = 0, bs, buffer, idx = 0, output = '';
				// get next character
				buffer = str.charAt(idx++);
				// character found in table? initialize bit storage and add its ascii value;
				~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
					// and if not first of each 4 characters,
					// convert the first 8 bits to one ascii character
					bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
			) {
				// try to find character in table (0-63, not found => -1)
				buffer = chars.indexOf(buffer);
			}
			return output;
		});

}());


// XXX Hack to prevent hextorstr function used by JWS send a string instead of
// a Word Array. On this way, no string decoding needs to take place and Crypto
// takes care of everything.
// Note that it should not affect the other algorithms as hextorstr is exclusively
// used on Hmac family (that invokes CryptoJS library).
window.hextorstr = function (c) {
	return window.CryptoJS.enc.Hex.parse(c);
};


//this is used to parse base64
function url_base64_decode(str) {
	var output = str.replace(/-/g, '+').replace(/_/g, '/');
	switch (output.length % 4) {
		case 0:
			break;
		case 2:
			output += '==';
			break;
		case 3:
			output += '=';
			break;
		default:
			throw 'Illegal base64url string!';
	}
	var result = window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
	try {
		return decodeURIComponent(escape(result));
	} catch (err) {
		return result;
	}
}

window.decode = function (base64json) {
	var json = null, error = null;
	try {
		json = url_base64_decode(base64json);
		json = JSON.stringify(JSON.parse(json), undefined, 2);
	} catch (e) {
		error = e;
	}
	return { result: json, error: error };
};

window.sign = function (algorithm, header, payload, key, isSecretBase64Encoded) {
	var value = '', error = null, headerAsJSON, payloadAsJSON;

	try {
		headerAsJSON = JSON.stringify(JSON.parse(header));
	} catch (e) {
		error = { result: null, error: { cause: e, who: ['header'] } };
	}
	try {
		payloadAsJSON = JSON.stringify(JSON.parse(payload));
	} catch (e) {
		if (error) {
			error.error.who.push('payload');
		} else {
			error = { result: null, error: { cause: e, who: ['payload'] } };
		}
	}

	if (error) {
		return error;
	}

	if (algorithm === 'HS256') {
		if (isSecretBase64Encoded) {
			try {
				key = window.b64utob64(key);
				key = window.CryptoJS.enc.Base64.parse(key).toString();
			} catch (e) {
				return { result: '', error: e };
			}
		} else {
			key = window.CryptoJS.enc.Latin1.parse(key).toString();
		}
	}

	try {
		value = KJUR.jws.JWS.sign(algorithm, headerAsJSON, payloadAsJSON, key);
	} catch (e) {
		error = e;
	}

	return { result: value, error: error };
};

window.isValidBase64String = function (s) {
	try {
		s = window.b64utob64(s);
		window.CryptoJS.enc.Base64.parse(s).toString();
		return true;
	} catch (e) {
		return false;
	}
};

window.verify = function (algorithm, value, key, isSecretBase64Encoded) {

	var result = '', error = null;

	if (algorithm === 'HS256') {
		if (isSecretBase64Encoded) {
			try {
				key = window.b64utob64(key);
				key = window.CryptoJS.enc.Base64.parse(key).toString();
			} catch (e) {
				return { result: '', error: e };
			}
		} else {
			key = window.CryptoJS.enc.Latin1.parse(key).toString();
		}
	}

	try {
		result = KJUR.jws.JWS.verify(value, key);
	} catch (e) {
		error = e;
	}

	return { result: result, error: error };
};

(function () {
	/**
	 * Check and set a global guard variable.
	 * If this content script is injected into the same page again,
	 * it will do nothing next time.
	 */
	console.log('bind_submit.js');
	window.setTimeout(function () {
		console.log('timeout completed, binding');
		document.querySelector("#pressforward-nt__button-container button#submit-button").addEventListener("click", (e) => {
			//document.addEventListener("click", (e) => {
			window.setTimeout(function () {
				console.log("clicked. submitting from bind_submit.js");
				console.log('Submitting to PressForward');

				var verify = window.document.getElementById('pressforward-nt__input-verify').value;
				chrome.storage.local.get(['ki'], function (result) {
					console.log('retrieving private key', result);
					var privateKey = result.ki;
					console.log('Verification for encoded ', verify);
					var test = window.verify('HS256', verify, result.ki, false);
					if (true !== test.result) {
						console.log('pfnt: Verification failed');
						return false;
					} else {
						console.log('pfnt: Verification passed');
					}
					var parts = verify.split('.');
					console.log('pfnt: msg parts ', parts);
					var dateMsg = window.decode(parts[1]);
					console.log(dateMsg);
					var datetimeCheck = window.decode(parts[1]); // JSON.parse();
					console.log('final', datetimeCheck);
					var createdDate = new Date(datetimeCheck.date);
					var currentDate = new Date();
					var maxDate = currentDate.valueOf() - (60000 * 15);
					var datetimeDiff = maxDate - createdDate;
					var maxDiff = (60000 * 15);
					if (datetimeDiff > maxDiff) {
						console.log('pfnt: Datetime Invalid, longer than 15 min');
						return false;
					} else {
						console.log('pfnt: Datetime conditional passed - diff is ', datetimeDiff);
					}
					let publish = true;
					let submitObject = {};
					submitObject.post_title = window.document.getElementById('pressforward-nt__inputfield__title').value;
					submitObject.item_author = window.document.getElementById('pressforward-nt__inputfield__byline').value;
					submitObject.content = window.document.getElementById('nominateText').innerHTML;
					//submitObject.item_feat_img = window.pfMetaData.image;
					submitObject.post_tags = window.document.querySelector('#pressforward-nt__preview-tags-container input').value;

					submitObject.extensionMode = true;
					console.log('Collect submit object');
					submitObject = JSON.parse(window.document.getElementById('pressforward-nt__input-data').value);
					console.log('Submit Object', submitObject);
					if (publish) {
						submitObject.publish = 'Last Step';
						submitObject.post_status = 'publish';
					}
					// Perhaps encode this plus date with the private key to make sure that the window the plugin added is what is sending the data?
					console.log('Retrieve public key');
					chrome.storage.local.get(['ku'], function (nextResult) {
						console.log('pfnt: public key ready', nextResult);
						var publicKey = nextResult.ku;
						submitObject.user_key = publicKey;
						var encodedDateObject = window.sign('HS256', '{ "typ": "JWT", "alg": "HS256" }', '{ "date": "' + (~~(new Date().valueOf() / 1000)) + '" }', privateKey, false);
						submitObject.verify = encodedDateObject.result;
						//console.log(submitObject);
						console.log('submitObject = ', submitObject);
						console.log('extensionID = ', window.localStorage.getItem('extensionID'));
						console.log('sending message');
						let response = chrome.runtime.sendMessage(window.localStorage.getItem('extensionID'), submitObject, function (res) {
							console.log('PFNT Message Sent');
							console.log(res);
						});
						console.log('response from sendMessage', response);
					});
				});
			}, 5000);
		});
	}, 4000);
})();