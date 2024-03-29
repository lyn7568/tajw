function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

for (var e = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), r = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8
}, n = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
}, o = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
}, a = {
    PATTERN_POSITION_TABLE: [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function(t) {
        for (var e = t << 10; a.getBCHDigit(e) - a.getBCHDigit(a.G15) >= 0; ) e ^= a.G15 << a.getBCHDigit(e) - a.getBCHDigit(a.G15);
        return (t << 10 | e) ^ a.G15_MASK;
    },
    getBCHTypeNumber: function(t) {
        for (var e = t << 12; a.getBCHDigit(e) - a.getBCHDigit(a.G18) >= 0; ) e ^= a.G18 << a.getBCHDigit(e) - a.getBCHDigit(a.G18);
        return t << 12 | e;
    },
    getBCHDigit: function(t) {
        for (var e = 0; 0 != t; ) e++, t >>>= 1;
        return e;
    },
    getPatternPosition: function(t) {
        return a.PATTERN_POSITION_TABLE[t - 1];
    },
    getMask: function(t, e, r) {
        switch (t) {
          case o.PATTERN000:
            return (e + r) % 2 == 0;

          case o.PATTERN001:
            return e % 2 == 0;

          case o.PATTERN010:
            return r % 3 == 0;

          case o.PATTERN011:
            return (e + r) % 3 == 0;

          case o.PATTERN100:
            return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;

          case o.PATTERN101:
            return e * r % 2 + e * r % 3 == 0;

          case o.PATTERN110:
            return (e * r % 2 + e * r % 3) % 2 == 0;

          case o.PATTERN111:
            return (e * r % 3 + (e + r) % 2) % 2 == 0;

          default:
            throw new Error("bad maskPattern:" + t);
        }
    },
    getErrorCorrectPolynomial: function(t) {
        for (var e = new g([ 1 ], 0), r = 0; r < t; r++) e = e.multiply(new g([ 1, i.gexp(r) ], 0));
        return e;
    },
    getLengthInBits: function(t, e) {
        if (1 <= e && e < 10) switch (t) {
          case r.MODE_NUMBER:
            return 10;

          case r.MODE_ALPHA_NUM:
            return 9;

          case r.MODE_8BIT_BYTE:
          case r.MODE_KANJI:
            return 8;

          default:
            throw new Error("mode:" + t);
        } else if (e < 27) switch (t) {
          case r.MODE_NUMBER:
            return 12;

          case r.MODE_ALPHA_NUM:
            return 11;

          case r.MODE_8BIT_BYTE:
            return 16;

          case r.MODE_KANJI:
            return 10;

          default:
            throw new Error("mode:" + t);
        } else {
            if (!(e < 41)) throw new Error("type:" + e);
            switch (t) {
              case r.MODE_NUMBER:
                return 14;

              case r.MODE_ALPHA_NUM:
                return 13;

              case r.MODE_8BIT_BYTE:
                return 16;

              case r.MODE_KANJI:
                return 12;

              default:
                throw new Error("mode:" + t);
            }
        }
    },
    getLostPoint: function(t) {
        for (var e = t.getModuleCount(), r = 0, n = 0; n < e; n++) for (l = 0; l < e; l++) {
            for (var o = 0, a = t.isDark(n, l), i = -1; i <= 1; i++) if (!(n + i < 0 || e <= n + i)) for (var s = -1; s <= 1; s++) l + s < 0 || e <= l + s || 0 == i && 0 == s || a == t.isDark(n + i, l + s) && o++;
            o > 5 && (r += 3 + o - 5);
        }
        for (n = 0; n < e - 1; n++) for (l = 0; l < e - 1; l++) {
            var u = 0;
            t.isDark(n, l) && u++, t.isDark(n + 1, l) && u++, t.isDark(n, l + 1) && u++, t.isDark(n + 1, l + 1) && u++, 
            0 != u && 4 != u || (r += 3);
        }
        for (n = 0; n < e; n++) for (l = 0; l < e - 6; l++) t.isDark(n, l) && !t.isDark(n, l + 1) && t.isDark(n, l + 2) && t.isDark(n, l + 3) && t.isDark(n, l + 4) && !t.isDark(n, l + 5) && t.isDark(n, l + 6) && (r += 40);
        for (l = 0; l < e; l++) for (n = 0; n < e - 6; n++) t.isDark(n, l) && !t.isDark(n + 1, l) && t.isDark(n + 2, l) && t.isDark(n + 3, l) && t.isDark(n + 4, l) && !t.isDark(n + 5, l) && t.isDark(n + 6, l) && (r += 40);
        for (var h = 0, l = 0; l < e; l++) for (n = 0; n < e; n++) t.isDark(n, l) && h++;
        return r += 10 * (Math.abs(100 * h / e / e - 50) / 5);
    }
}, i = {
    glog: function(t) {
        if (t < 1) throw new Error("glog(" + t + ")");
        return i.LOG_TABLE[t];
    },
    gexp: function(t) {
        for (;t < 0; ) t += 255;
        for (;t >= 256; ) t -= 255;
        return i.EXP_TABLE[t];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
}, s = 0; s < 8; s++) i.EXP_TABLE[s] = 1 << s;

for (var u = 8; u < 256; u++) i.EXP_TABLE[u] = i.EXP_TABLE[u - 4] ^ i.EXP_TABLE[u - 5] ^ i.EXP_TABLE[u - 6] ^ i.EXP_TABLE[u - 8];

for (var h = 0; h < 255; h++) i.LOG_TABLE[i.EXP_TABLE[h]] = h;

var l = function() {
    function n(e) {
        t(this, n), this.mode = r.MODE_8BIT_BYTE, this.data = e, this.parsedData = [];
        for (var o = 0, a = this.data.length; o < a; o++) {
            var i = [], s = this.data.charCodeAt(o);
            s > 65536 ? (i[0] = 240 | (1835008 & s) >>> 18, i[1] = 128 | (258048 & s) >>> 12, 
            i[2] = 128 | (4032 & s) >>> 6, i[3] = 128 | 63 & s) : s > 2048 ? (i[0] = 224 | (61440 & s) >>> 12, 
            i[1] = 128 | (4032 & s) >>> 6, i[2] = 128 | 63 & s) : s > 128 ? (i[0] = 192 | (1984 & s) >>> 6, 
            i[1] = 128 | 63 & s) : i[0] = s, this.parsedData.push(i);
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length !== this.data.length && (this.parsedData.unshift(191), 
        this.parsedData.unshift(187), this.parsedData.unshift(239));
    }
    return e(n, [ {
        key: "getLength",
        value: function(t) {
            return this.parsedData.length;
        }
    }, {
        key: "write",
        value: function(t) {
            for (var e = 0, r = this.parsedData.length; e < r; e++) t.put(this.parsedData[e], 8);
        }
    } ]), n;
}(), f = function() {
    function r(e, n) {
        t(this, r), this.typeNumber = e, this.errorCorrectLevel = n, this.modules = null, 
        this.moduleCount = 0, this.dataCache = null, this.dataList = [];
    }
    return e(r, [ {
        key: "addData",
        value: function(t) {
            var e = new l(t);
            this.dataList.push(e), this.dataCache = null;
        }
    }, {
        key: "isDark",
        value: function(t, e) {
            if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
            return this.modules[t][e];
        }
    }, {
        key: "getModuleCount",
        value: function() {
            return this.moduleCount;
        }
    }, {
        key: "make",
        value: function() {
            this.makeImpl(!1, this.getBestMaskPattern());
        }
    }, {
        key: "makeImpl",
        value: function(t, e) {
            this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
            for (var n = 0; n < this.moduleCount; n++) {
                this.modules[n] = new Array(this.moduleCount);
                for (var o = 0; o < this.moduleCount; o++) this.modules[n][o] = null;
            }
            this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), 
            this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), 
            this.setupTimingPattern(), this.setupTypeInfo(t, e), this.typeNumber >= 7 && this.setupTypeNumber(t), 
            null == this.dataCache && (this.dataCache = r.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), 
            this.mapData(this.dataCache, e);
        }
    }, {
        key: "setupPositionProbePattern",
        value: function(t, e) {
            for (var r = -1; r <= 7; r++) if (!(t + r <= -1 || this.moduleCount <= t + r)) for (var n = -1; n <= 7; n++) e + n <= -1 || this.moduleCount <= e + n || (this.modules[t + r][e + n] = 0 <= r && r <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= n && n <= 4);
        }
    }, {
        key: "getBestMaskPattern",
        value: function() {
            for (var t = 0, e = 0, r = 0; r < 8; r++) {
                this.makeImpl(!0, r);
                var n = a.getLostPoint(this);
                (0 == r || t > n) && (t = n, e = r);
            }
            return e;
        }
    }, {
        key: "setupTimingPattern",
        value: function() {
            for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
            for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
        }
    }, {
        key: "setupPositionAdjustPattern",
        value: function() {
            for (var t = a.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var r = 0; r < t.length; r++) {
                var n = t[e], o = t[r];
                if (null == this.modules[n][o]) for (var i = -2; i <= 2; i++) for (var s = -2; s <= 2; s++) this.modules[n + i][o + s] = -2 == i || 2 == i || -2 == s || 2 == s || 0 == i && 0 == s;
            }
        }
    }, {
        key: "setupTypeNumber",
        value: function(t) {
            for (var e = a.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = !t && 1 == (e >> r & 1);
            for (var n = 0; n < 18; n++) this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = !t && 1 == (e >> n & 1);
        }
    }, {
        key: "setupTypeInfo",
        value: function(t, e) {
            for (var r = this.errorCorrectLevel << 3 | e, n = a.getBCHTypeInfo(r), o = 0; o < 15; o++) {
                var i = !t && 1 == (n >> o & 1);
                o < 6 ? this.modules[o][8] = i : o < 8 ? this.modules[o + 1][8] = i : this.modules[this.moduleCount - 15 + o][8] = i;
            }
            for (var s = 0; s < 15; s++) {
                var u = !t && 1 == (n >> s & 1);
                s < 8 ? this.modules[8][this.moduleCount - s - 1] = u : s < 9 ? this.modules[8][15 - s - 1 + 1] = u : this.modules[8][15 - s - 1] = u;
            }
            this.modules[this.moduleCount - 8][8] = !t;
        }
    }, {
        key: "mapData",
        value: function(t, e) {
            for (var r = -1, n = this.moduleCount - 1, o = 7, i = 0, s = this.moduleCount - 1; s > 0; s -= 2) for (6 == s && s--; ;) {
                for (var u = 0; u < 2; u++) if (null == this.modules[n][s - u]) {
                    var h = !1;
                    i < t.length && (h = 1 == (t[i] >>> o & 1)), a.getMask(e, n, s - u) && (h = !h), 
                    this.modules[n][s - u] = h, -1 == --o && (i++, o = 7);
                }
                if ((n += r) < 0 || this.moduleCount <= n) {
                    n -= r, r = -r;
                    break;
                }
            }
        }
    } ]), r;
}();

f.PAD0 = 236, f.PAD1 = 17, f.createData = function(t, e, r) {
    for (var n = c.getRSBlocks(t, e), o = new d(), i = 0; i < r.length; i++) {
        var s = r[i];
        o.put(s.mode, 4), o.put(s.getLength(), a.getLengthInBits(s.mode, t)), s.write(o);
    }
    for (var u = 0, h = 0; h < n.length; h++) u += n[h].dataCount;
    if (o.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * u + ")");
    for (o.getLengthInBits() + 4 <= 8 * u && o.put(0, 4); o.getLengthInBits() % 8 != 0; ) o.putBit(!1);
    for (;;) {
        if (o.getLengthInBits() >= 8 * u) break;
        if (o.put(f.PAD0, 8), o.getLengthInBits() >= 8 * u) break;
        o.put(f.PAD1, 8);
    }
    return f.createBytes(o, n);
}, f.createBytes = function(t, e) {
    for (var r = 0, n = 0, o = 0, i = new Array(e.length), s = new Array(e.length), u = 0; u < e.length; u++) {
        var h = e[u].dataCount, l = e[u].totalCount - h;
        n = Math.max(n, h), o = Math.max(o, l), i[u] = new Array(h);
        for (var f = 0; f < i[u].length; f++) i[u][f] = 255 & t.buffer[f + r];
        r += h;
        var c = a.getErrorCorrectPolynomial(l), d = new g(i[u], c.getLength() - 1).mod(c);
        s[u] = new Array(c.getLength() - 1);
        for (var v = 0; v < s[u].length; v++) {
            var m = v + d.getLength() - s[u].length;
            s[u][v] = m >= 0 ? d.get(m) : 0;
        }
    }
    for (var p = 0, E = 0; E < e.length; E++) p += e[E].totalCount;
    for (var _ = new Array(p), T = 0, k = 0; k < n; k++) for (var L = 0; L < e.length; L++) k < i[L].length && (_[T++] = i[L][k]);
    for (var y = 0; y < o; y++) for (var D = 0; D < e.length; D++) y < s[D].length && (_[T++] = s[D][y]);
    return _;
};

var g = function() {
    function r(e, n) {
        if (t(this, r), void 0 == e.length) throw new Error(e.length + "/" + n);
        for (var o = 0; o < e.length && 0 == e[o]; ) o++;
        this.num = new Array(e.length - o + n);
        for (var a = 0; a < e.length - o; a++) this.num[a] = e[a + o];
    }
    return e(r, [ {
        key: "get",
        value: function(t) {
            return this.num[t];
        }
    }, {
        key: "getLength",
        value: function() {
            return this.num.length;
        }
    }, {
        key: "multiply",
        value: function(t) {
            for (var e = new Array(this.getLength() + t.getLength() - 1), n = 0; n < this.getLength(); n++) for (var o = 0; o < t.getLength(); o++) e[n + o] ^= i.gexp(i.glog(this.get(n)) + i.glog(t.get(o)));
            return new r(e, 0);
        }
    }, {
        key: "mod",
        value: function(t) {
            if (this.getLength() - t.getLength() < 0) return this;
            for (var e = i.glog(this.get(0)) - i.glog(t.get(0)), n = new Array(this.getLength()), o = 0; o < this.getLength(); o++) n[o] = this.get(o);
            for (var a = 0; a < t.getLength(); a++) n[a] ^= i.gexp(i.glog(t.get(a)) + e);
            return new r(n, 0).mod(t);
        }
    } ]), r;
}(), c = function e(r, n) {
    t(this, e), this.totalCount = r, this.dataCount = n;
};

c.RS_BLOCK_TABLE = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], 
c.getRSBlocks = function(t, e) {
    var r = c.getRsBlockTable(t, e);
    if (!r) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
    for (var n = r.length / 3, o = [], a = 0; a < n; a++) for (var i = r[3 * a], s = r[3 * a + 1], u = r[3 * a + 2], h = 0; h < i; h++) o.push(new c(s, u));
    return o;
}, c.getRsBlockTable = function(t, e) {
    switch (e) {
      case n.L:
        return c.RS_BLOCK_TABLE[4 * (t - 1)];

      case n.M:
        return c.RS_BLOCK_TABLE[4 * (t - 1) + 1];

      case n.Q:
        return c.RS_BLOCK_TABLE[4 * (t - 1) + 2];

      case n.H:
        return c.RS_BLOCK_TABLE[4 * (t - 1) + 3];

      default:
        return;
    }
};

var d = function() {
    function r() {
        t(this, r), this.buffer = [], this.length = 0;
    }
    return e(r, [ {
        key: "get",
        value: function(t) {
            var e = Math.floor(t / 8);
            return 1 == (this.buffer[e] >>> 7 - t % 8 & 1);
        }
    }, {
        key: "put",
        value: function(t, e) {
            for (var r = 0; r < e; r++) this.putBit(1 == (t >>> e - r - 1 & 1));
        }
    }, {
        key: "getLengthInBits",
        value: function() {
            return this.length;
        }
    }, {
        key: "putBit",
        value: function(t) {
            var e = Math.floor(this.length / 8);
            this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), 
            this.length++;
        }
    } ]), r;
}(), v = function() {
    function r(e, n) {
        t(this, r), this._opts = n, this._el = e, this._ctx = wx.createCanvasContext(e);
    }
    return e(r, [ {
        key: "draw",
        value: function(t) {
            var e = this._ctx, r = this._opts, n = t.getModuleCount(), o = r.width / n, a = r.height / n, i = Math.round(o), s = Math.round(a);
            this.clear();
            for (var u = 0; u < n; u++) for (var h = 0; h < n; h++) {
                var l = t.isDark(u, h), f = h * o, g = u * a;
                e.setStrokeStyle(l ? r.colorDark : r.colorLight), e.setLineWidth(1), e.setFillStyle(l ? r.colorDark : r.colorLight), 
                e.fillRect(f, g, o, a), e.strokeRect(Math.floor(f) + .5, Math.floor(g) + .5, i, s), 
                e.strokeRect(Math.ceil(f) - .5, Math.ceil(g) - .5, i, s);
            }
            e.draw(), this._bIsPainted = !0;
        }
    }, {
        key: "clear",
        value: function() {
            this._ctx.clearRect(0, 0, this._opts.width, this._opts.height);
        }
    } ]), r;
}(), m = function() {
    function r(t, e) {
        for (var r = 1, a = o(t), i = [ [ 17, 14, 11, 7 ], [ 32, 26, 20, 14 ], [ 53, 42, 32, 24 ], [ 78, 62, 46, 34 ], [ 106, 84, 60, 44 ], [ 134, 106, 74, 58 ], [ 154, 122, 86, 64 ], [ 192, 152, 108, 84 ], [ 230, 180, 130, 98 ], [ 271, 213, 151, 119 ], [ 321, 251, 177, 137 ], [ 367, 287, 203, 155 ], [ 425, 331, 241, 177 ], [ 458, 362, 258, 194 ], [ 520, 412, 292, 220 ], [ 586, 450, 322, 250 ], [ 644, 504, 364, 280 ], [ 718, 560, 394, 310 ], [ 792, 624, 442, 338 ], [ 858, 666, 482, 382 ], [ 929, 711, 509, 403 ], [ 1003, 779, 565, 439 ], [ 1091, 857, 611, 461 ], [ 1171, 911, 661, 511 ], [ 1273, 997, 715, 535 ], [ 1367, 1059, 751, 593 ], [ 1465, 1125, 805, 625 ], [ 1528, 1190, 868, 658 ], [ 1628, 1264, 908, 698 ], [ 1732, 1370, 982, 742 ], [ 1840, 1452, 1030, 790 ], [ 1952, 1538, 1112, 842 ], [ 2068, 1628, 1168, 898 ], [ 2188, 1722, 1228, 958 ], [ 2303, 1809, 1283, 983 ], [ 2431, 1911, 1351, 1051 ], [ 2563, 1989, 1423, 1093 ], [ 2699, 2099, 1499, 1139 ], [ 2809, 2213, 1579, 1219 ], [ 2953, 2331, 1663, 1273 ] ], s = 0, u = i.length; s <= u; s++) {
            var h = 0;
            switch (e) {
              case n.L:
                h = i[s][0];
                break;

              case n.M:
                h = i[s][1];
                break;

              case n.Q:
                h = i[s][2];
                break;

              case n.H:
                h = i[s][3];
            }
            if (a <= h) break;
            r++;
        }
        if (r > i.length) throw new Error("Too long data");
        return r;
    }
    function o(t) {
        var e = encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return e.length + (e.length != t ? 3 : 0);
    }
    var a = function() {
        function n(e, r) {
            if (t(this, n), this._opts = {
                width: 300,
                height: 225,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: n.correctLevel.H
            }, "string" == typeof r && (r = {
                text: r
            }), r) for (var o in r) r.hasOwnProperty(o) && (this._opts[o] = r[o]);
            this._el = e, this._QRCode = null, this._drawing = new v(this._el, this._opts), 
            this._opts.text && this.makeCode(this._opts.text);
        }
        return e(n, [ {
            key: "makeCode",
            value: function(t) {
                this._QRCode = new f(r(t, this._opts.correctLevel), this._opts.correctLevel), this._QRCode.addData(t), 
                this._QRCode.make(), this._drawing.draw(this._QRCode);
            }
        }, {
            key: "clear",
            value: function() {
                this._drawing.clear();
            }
        } ]), n;
    }();
    return a.correctLevel = n, a;
}();

exports.default = m;