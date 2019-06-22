var e = getApp(), a = require("../../static/js/utils/underscore.js");

Page({
    data: {
        address: [],
        nodata: !1
    },
    onLoad: function(e) {
        var t = this;
        if (e) {
            var r = {
                sid: 0,
                channel: "",
                erranderId: 0,
                input: ""
            };
            r = a.extend(r, e), t.setData(r);
        }
        t.onReachBottom();
    },
    onJsEvent: function(a) {
        e.util.jsEvent(a);
    },
    onReady: function() {},
    onReachBottom: function() {
        var a = this, t = {
            sid: a.data.sid,
            erranderId: a.data.erranderId
        };
        e.util.request({
            url: "wmall/member/address",
            data: t,
            success: function(e) {
                var t = e.data.message.message;
                (a.data.sid > 0 || a.data.erranderId > 0) && (t.available.length > 0 || t.dis_available.length > 0) || !a.data.sid && !a.data.erranderId && t.length > 0 ? a.data.nodata = !1 : a.data.nodata = !0, 
                a.setData({
                    address: t,
                    showNodata: a.data.nodata,
                    config: e.data.message.config
                });
            }
        });
    },
    onSelectAddress: function(t) {
        var r = t.currentTarget.dataset.id, d = t.currentTarget.dataset.available, n = this;
        if (!n.data.sid && !n.data.erranderId) return !1;
        if (!d) return e.util.toast("该地址不在商家配送范围内"), !1;
        if ("errander" == n.data.channel) {
            (s = e.util.getStorageSync("errander.extra")) && (s = "buy" == n.data.input ? a.extend(s, {
                buyaddress_id: r
            }) : a.extend(s, {
                acceptaddress_id: r
            })), e.util.setStorageSync("errander.extra", s);
            i = "/pages/paotui/diy?id=" + n.data.erranderId;
            return e.util.jump2url(i, "navigateTo"), !1;
        }
        var s = e.util.getStorageSync("order.extra");
        s && (s = a.extend(s, {
            address_id: r
        })), e.util.setStorageSync("order.extra", s);
        var i = "/pages/order/create?sid=" + n.data.sid;
        e.util.jump2url(i, "navigateTo");
    },
    onUseWxAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(r) {
                var d = {
                    sid: t.data.sid,
                    channel: t.data.channel,
                    erranderId: t.data.erranderId,
                    realname: r.userName,
                    mobile: r.telNumber,
                    provinceName: r.provinceName,
                    cityName: r.cityName,
                    countyName: r.countyName,
                    detailInfo: r.detailInfo,
                    address: r.provinceName + r.cityName + r.countyName + r.detailInfo
                };
                e.util.request({
                    method: "POST",
                    url: "wmall/member/address/wxaddress_add",
                    data: d,
                    success: function(r) {
                        var n = r.data.message;
                        if (!t.data.channel || "" == t.data.channel || "undefined" == t.data.channel) return n.errno ? (e.util.toast(n.message), 
                        !1) : void t.onPullDownRefresh();
                        if ("takeout" == t.data.channel) if (-1e3 == n.errno) wx.showModal({
                            title: "",
                            content: "亲,您的地址已超出商家的配送范围了",
                            confirmText: "调整地址",
                            confirmColor: "#ff2d4b",
                            cancelText: "仍然保存",
                            success: function(a) {
                                a.confirm ? wx.hideModal() : a.cancel && (d.force = 1, e.util.request({
                                    method: "POST",
                                    url: "wmall/member/address/wxaddress_add",
                                    data: d,
                                    success: function(a) {
                                        var r = "/pages/order/create?sid=" + t.data.sid;
                                        e.util.jump2url(r, "navigateTo");
                                    }
                                }));
                            }
                        }); else {
                            if (n.errno) return e.util.toast(n.message), !1;
                            (s = e.util.getStorageSync("order.extra")) && (s = a.extend(s, {
                                address_id: n.message
                            })), e.util.setStorageSync("order.extra", s);
                            i = "/pages/order/create?sid=" + t.data.sid;
                            e.util.jump2url(i, "navigateTo");
                        } else if ("errander" == t.data.channel) if (-1e3 == n.errno) wx.showModal({
                            title: "",
                            content: "亲,您的地址已超出跑腿的服务范围了",
                            confirmText: "调整地址",
                            confirmColor: "red",
                            cancelText: "仍然保存",
                            success: function(a) {
                                a.confirm ? wx.hideModal() : a.cancel && (d.force = 1, e.util.request({
                                    method: "POST",
                                    url: "wmall/member/address/wxaddress_add",
                                    data: d,
                                    success: function(a) {
                                        var r = "/pages/paotui/diy?id=" + t.data.erranderId;
                                        e.util.jump2url(r, "navigateTo");
                                    }
                                }));
                            }
                        }); else {
                            if (n.errno) return e.util.toast(n.message), !1;
                            var s = e.util.getStorageSync("errander.extra");
                            s && (s = "buy" == t.data.input ? a.extend(s, {
                                buyaddress_id: n.message
                            }) : a.extend(s, {
                                acceptaddress_id: n.message
                            })), e.util.setStorageSync("errander.extra", s);
                            var i = "/pages/paotui/diy?id=" + t.data.erranderId;
                            e.util.jump2url(i, "navigateTo");
                        }
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "系统信息",
                    content: "使用微信通讯地址失败，请重新授权后使用",
                    showCancel: !1,
                    complete: function() {
                        wx.getSetting({
                            success: function(e) {
                                e.authSetting["scope.address"] || wx.openSetting();
                            }
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {},
    onPullDownRefresh: function() {
        var e = this;
        e.data.min = 0, e.data.address = [], e.onReachBottom(), wx.stopPullDownRefresh();
    }
});