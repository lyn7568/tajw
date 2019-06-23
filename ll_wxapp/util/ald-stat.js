var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(n, o) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : n.Ald = o();
}(void 0, function() {
    function o(n) {
        this.app = n;
    }
    function e(n) {
        q = n, this.aldstat = new o(this), y("app", "launch");
    }
    function a(n) {
        if (N = (q = n).query.ald_share_src, B = n.query.aldsrc || "", n.query.ald_share_src, 
        I = Date.now(), R = Date.now(), !Y) {
            M = "" + Date.now() + Math.floor(1e7 * Math.random()), H = !1;
            try {
                wx.setStorageSync("ald_ifo", !1);
            } catch (n) {}
        }
        Y = !1, 0 !== T && 3e5 < Date.now() - T && (P = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        R = Date.now()), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
            shareTicket: n.shareTicket,
            success: function(n) {
                F = n, v("event", "ald_share_click", JSON.stringify(n));
            }
        }) : n.query.ald_share_src && v("event", "ald_share_click", 1), "" === j && wx.getSetting({
            withCredentials: !0,
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        var o = g();
                        j = n, o.ufo = w(n), L = t(n.userInfo.avatarUrl.split("/")), p(o);
                    }
                });
            }
        }), y("app", "show");
    }
    function r() {
        T = Date.now(), "" === j && wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(n) {
                        L = t((j = n).userInfo.avatarUrl.split("/"));
                        var o = g();
                        o.ufo = w(n), p(o);
                    }
                });
            }
        }), y("app", "hide");
    }
    function i(n) {
        C++, v("event", "ald_error_message", n);
    }
    function s(n) {
        W = n;
    }
    function c() {
        K = this.route, z = Date.now(), Q = X = 0;
    }
    function u() {
        n("page", "hide"), V = this.route;
    }
    function l() {
        n("page", "unload"), V = this.route;
    }
    function f() {
        X++;
    }
    function h() {
        Q++;
    }
    function d(n) {
        var o = function(n) {
            if (-1 == n.indexOf("?")) return "";
            var t = {};
            return n.split("?")[1].split("&").forEach(function(n) {
                var o = n.split("=")[1];
                t[n.split("=")[0]] = o;
            }), t;
        }(n.path), t = {};
        for (var e in q.query) "ald_share_src" === e && (t[e] = q.query[e]);
        var a = "";
        if (a = -1 == n.path.indexOf("?") ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", 
        "" !== o) for (var e in o) t[e] = o[e];
        for (var r in t.ald_share_src ? -1 == t.ald_share_src.indexOf(O) && t.ald_share_src.length < 200 && (t.ald_share_src = t.ald_share_src + "," + O) : t.ald_share_src = O, 
        t) -1 == r.indexOf("ald") && (a += r + "=" + t[r] + "&");
        return n.path = a + "ald_share_src=" + t.ald_share_src, v("event", "ald_share_status", n), 
        n;
    }
    function p(t) {
        var e = t, a = 0, r = 0;
        !function o(n) {
            r++, n ? ((t = {}).et = Date.now(), t.at = M, t.uu = O, t.v = D, t.ak = e.ak, t.life = e.life, 
            t.ev = e.ev, t.err = "err", t.status = a) : (k++, t.at = M, t.et = Date.now(), t.uu = O, 
            t.v = D, t.ak = x.app_key, t.wsr = q, t.oifo = H, t.rq_c = k), wx.request({
                url: "https://" + b + ".aldwx.com/d.html",
                data: t,
                header: {
                    AldStat: "MiniApp-Stat",
                    waid: x.appid || "",
                    wst: x.appsecret || "",
                    se: A || "",
                    op: U || "",
                    img: L
                },
                method: "GET",
                success: function(n) {
                    a = n.statusCode, 200 != n.statusCode && r <= 3 && o("errorsend");
                },
                fail: function() {
                    r <= 3 && o("errorsend");
                }
            });
        }();
    }
    function g() {
        var n = {};
        for (var o in J) n[o] = J[o];
        return n;
    }
    function t(n) {
        for (var o = "", t = 0; t < n.length; t++) n[t].length > o.length && (o = n[t]);
        return o;
    }
    function w(n) {
        var o = {};
        for (var t in n) "rawData" != t && "errMsg" != t && (o[t] = n[t]);
        return o;
    }
    function y(n, o) {
        var t = g();
        t.ev = n, t.life = o, t.ec = C, t.st = E, B && (t.qr = B, t.sr = B), N && (t.usr = N), 
        "launch" !== o && (t.ahs = P), "hide" === o && (t.hdr = Date.now() - R, t.dr = Date.now() - I, 
        t.ifo = !!H), p(t);
    }
    function n(n, o) {
        var t = g();
        t.ev = n, t.st = Date.now(), t.life = o, t.pp = K, t.pc = V, t.dr = Date.now() - E, 
        t.ndr = Date.now() - z, t.rc = X, t.bc = Q, t.ahs = P, W && "{}" != JSON.stringify(W) && (t.ag = W), 
        B && (t.qr = B, t.sr = B), N && (t.usr = N), G || (K, G = !0, t.ifp = G, t.fp = K), 
        p(t);
    }
    function v(n, o, t) {
        var e = g();
        e.ev = n, e.tp = o, e.st = E, t && (e.ct = t), p(e);
    }
    function S(n, o, t) {
        if (n[o]) {
            var e = n[o];
            n[o] = function(n) {
                t.call(this, n, o), e.call(this, n);
            };
        } else n[o] = function(n) {
            t.call(this, n, o);
        };
    }
    var _, m, x = require("./ald-stat-conf"), D = "7.0.0", b = "log", M = "" + Date.now() + Math.floor(1e7 * Math.random()), P = "" + Date.now() + Math.floor(1e7 * Math.random()), R = "", I = 0, T = 0, A = "", U = "", L = "", k = 0, q = "", H = "", O = function() {
        var o = "";
        try {
            o = wx.getStorageSync("aldstat_uuid");
        } catch (n) {
            o = "uuid_getstoragesync";
        }
        if (o) H = !1; else {
            o = function() {
                function n() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                }
                return n() + n() + n() + n() + n() + n() + n() + n();
            }(), H = !0;
            try {
                wx.setStorageSync("aldstat_uuid", o), wx.setStorageSync("ald_ifo", !0);
            } catch (o) {
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return o;
    }(), E = Date.now(), N = "", B = "", C = 0, F = "", j = "", J = {}, G = !1, K = "", V = "", W = "", z = "", Q = 0, X = 0, Y = !0;
    wx.request({
        url: "https://" + b + ".aldwx.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(n) {
            200 === n.statusCode && (n.data.version != D && console.warn("您的SDK不是最新版本，请尽快升级！"), 
            n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error));
        }
    });
    try {
        var Z = wx.getSystemInfoSync();
        J.br = Z.brand, J.pm = Z.model, J.pr = Z.pixelRatio, J.ww = Z.windowWidth, J.wh = Z.windowHeight, 
        J.lang = Z.language, J.wv = Z.version, J.wvv = Z.platform, J.wsdk = Z.SDKVersion, 
        J.sv = Z.system;
    } catch (o) {}
    return wx.getNetworkType({
        success: function(n) {
            J.nt = n.networkType;
        }
    }), wx.getSetting({
        success: function(n) {
            n.authSetting["scope.userLocation"] ? wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    J.lat = n.latitude, J.lng = n.longitude, J.spd = n.speed;
                }
            }) : x.getLocation && wx.getLocation({
                type: "wgs84",
                success: function(n) {
                    J.lat = n.latitude, J.lng = n.longitude, J.spd = n.speed;
                }
            });
        }
    }), o.prototype.debug = function(n) {
        v("debug", "0", n);
    }, o.prototype.warn = function(n) {
        v("warn", "1", n);
    }, o.prototype.sendEvent = function(n, o) {
        if ("" !== n && "string" == typeof n && n.length <= 255) if ("string" == typeof o && o.length <= 255) v("event", n, o); else if ("object" == (void 0 === o ? "undefined" : _typeof(o))) {
            if (255 <= JSON.stringify(o).length) return void console.error("自定义事件参数不能超过255个字符");
            v("event", n, JSON.stringify(o));
        } else void 0 === o ? v("event", n, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符"); else console.error("事件名称必须为String类型且不能超过255个字符");
    }, o.prototype.sendSession = function(n) {
        if ("" !== n && n) if ("" !== x.appid && "" !== x.appsecret) {
            A = n;
            var o = g();
            o.st = Date.now(), o.tp = "session", o.ct = "session", o.ev = "event", "" === j ? wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(n) {
                            o.ufo = w(n), L = t(n.userInfo.avatarUrl.split("/")), "" !== F && (o.gid = F), p(o);
                        }
                    }) : "" !== F ? (o.gid = F, p(o)) : console.warn("用户未授权");
                }
            }) : (o.ufo = j, "" !== F && (o.gid = F), p(o));
        } else console.error("请在配置文件中填写小程序的appid和appsecret！"); else console.error("请传入从后台获取的session_key");
    }, o.prototype.sendOpenid = function(n) {
        if ("" !== n && n) {
            U = n;
            var o = g();
            o.st = Date.now(), o.tp = "openid", o.ev = "event", o.ct = "openid", p(o);
        } else console.error("openID不能为空");
    }, x.plugin ? {
        App: function(o) {
            var n = {};
            for (var t in o) "onLaunch" !== t && "onShow" !== t && "onHide" !== t && "onError" !== t && "onPageNotFound" !== t && "onUnlaunch" !== t && (n[t] = o[t]);
            n.onLaunch = function(n) {
                e.call(this, n), "function" == typeof o.onLaunch && o.onLaunch.call(this, n);
            }, n.onShow = function(n) {
                a.call(this, n), o.onShow && "function" == typeof o.onShow && o.onShow.call(this, n);
            }, n.onHide = function() {
                r.call(this), o.onHide && "function" == typeof o.onHide && o.onHide.call(this);
            }, n.onError = function(n) {
                i.call(this, n), o.onError && "function" == typeof o.onError && o.onError.call(this, n);
            }, n.onUnlaunch = function() {
                o.onUnlaunch && "function" == typeof o.onUnlaunch && o.onUnlaunch.call(this);
            }, n.onPageNotFound = function(n) {
                o.onPageNotFound && "function" == typeof o.onPageNotFound && o.onPageNotFound.call(this, n);
            }, App(n);
        },
        Page: function(t) {
            var n = {};
            for (var o in t) "onLoad" !== o && "onReady" !== o && "onShow" !== o && "onHide" !== o && "onUnload" !== o && "onPullDownRefresh" !== o && "onReachBottom" !== o && "onShareAppMessage" !== o && "onPageScroll" !== o && "onTabItemTap" !== o && (n[o] = t[o]);
            n.onLoad = function(n) {
                s.call(this, n), "function" == typeof t.onLoad && t.onLoad.call(this, n);
            }, n.onShow = function(n) {
                c.call(this), "function" == typeof t.onShow && t.onShow.call(this, n);
            }, n.onHide = function(n) {
                u.call(this), "function" == typeof t.onHide && t.onHide.call(this, n);
            }, n.onUnload = function(n) {
                l.call(this), "function" == typeof t.onUnload && t.onUnload.call(this, n);
            }, n.onReady = function(n) {
                t.onReady && "function" == typeof t.onReady && t.onReady.call(this, n);
            }, n.onReachBottom = function(n) {
                h(), t.onReachBottom && "function" == typeof t.onReachBottom && t.onReachBottom.call(this, n);
            }, n.onPullDownRefresh = function(n) {
                f(), t.onPullDownRefresh && "function" == typeof t.onPullDownRefresh && t.onPullDownRefresh.call(this, n);
            }, n.onPageScroll = function(n) {
                t.onPageScroll && "function" == typeof t.onPageScroll && t.onPageScroll.call(this, n);
            }, n.onTabItemTap = function(n) {
                t.onTabItemTap && "function" == typeof t.onTabItemTap && t.onTabItemTap.call(this, n);
            }, t.onShareAppMessage && "function" == typeof t.onShareAppMessage && (n.onShareAppMessage = function(n) {
                var o = t.onShareAppMessage.call(this, n);
                return void 0 === o ? (o = {}).path = this.route : void 0 === o.path && (o.path = this.route), 
                d.call(this, o);
            }), Page(n);
        }
    } : (_ = App, m = Page, App = function(n) {
        S(n, "onLaunch", e), S(n, "onShow", a), S(n, "onHide", r), S(n, "onError", i), _(n);
    }, void (Page = function(n) {
        var t = n.onShareAppMessage;
        S(n, "onLoad", s), S(n, "onUnload", l), S(n, "onShow", c), S(n, "onHide", u), S(n, "onReachBottom", h), 
        S(n, "onPullDownRefresh", f), null != t && (n.onShareAppMessage = function(n) {
            if (void 0 !== t) {
                var o = t.call(this, n);
                return void 0 === o ? (o = {}).path = this.route : void 0 === o.path && (o.path = this.route), 
                d(o);
            }
        }), m(n);
    }));
});