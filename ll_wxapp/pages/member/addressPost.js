var a = getApp(), e = require("../../static/js/utils/underscore.js");

Page({
    data: {
        address: {
            id: 0,
            sid: 0,
            sex: "先生",
            address: "点击选择"
        },
        submiting: 0
    },
    onChooseLocation: function(e) {
        var t = this;
        a.util.setStorageSync("address", t.data.address), wx.chooseLocation({
            success: function(e) {
                t.data.address = a.util.getStorageSync("address"), t.data.address.location_x = e.latitude, 
                t.data.address.location_y = e.longitude, t.data.address.address = e.name, t.setData({
                    address: t.data.address
                });
            },
            cancel: function(e) {
                a.util.toast("取消后不能选择位置");
            }
        });
    },
    onFormChange: function(e) {
        var t = this, s = e.currentTarget.dataset.type;
        t.data.address[s] = e.detail.value, a.util.setStorageSync("address", t.data.address);
    },
    onLoad: function(e) {
        var t = this, s = t.data.address.id = e.id;
        if ((t.data.address.sid = e.sid) > 0 && (e.channel = "takeout"), t.data.options = e, 
        s) {
            var d = {
                id: s,
                sid: e.sid
            };
            a.util.request({
                url: "wmall/member/address/post",
                data: d,
                success: function(a) {
                    var e = a.data.message.message;
                    e.sid = t.data.address.sid, t.setData({
                        address: e,
                        id: s
                    });
                }
            });
        }
    },
    onSubmit: function(t) {
        var s = this;
        if (1 == s.data.submiting) return !1;
        var d = t.detail.value;
        if (!s.data.address.location_x) return a.util.toast("收货地址不能为空"), !1;
        if (!d.realname) return a.util.toast("联系人不能为空"), !1;
        if (!d.mobile) return a.util.toast("手机号不能为空"), !1;
        s.data.submiting = 1;
        var r = {
            id: s.data.address.id,
            sid: s.data.address.sid,
            channel: s.data.options.channel,
            flag: 1,
            sex: d.sex,
            number: d.number,
            realname: d.realname,
            mobile: d.mobile,
            address: s.data.address.address,
            location_x: s.data.address.location_x,
            location_y: s.data.address.location_y
        };
        a.util.request({
            method: "POST",
            url: "wmall/member/address/post",
            data: r,
            success: function(t) {
                s.data.submiting = 0;
                var d = t.data.message;
                if (!s.data.options.channel || "" == s.data.options.channel || "undefined" == s.data.options.channel) return d.errno ? (a.util.toast(d.message), 
                !1) : void a.util.jump2url("/pages/member/address");
                if ("takeout" == s.data.options.channel) if (-1e3 == d.errno) wx.showModal({
                    title: "",
                    content: "亲,您的地址已超出商家的配送范围了",
                    confirmText: "调整地址",
                    confirmColor: "#ff2d4b",
                    cancelText: "仍然保存",
                    success: function(e) {
                        e.confirm ? wx.hideModal() : e.cancel && (r.force = 1, a.util.request({
                            method: "POST",
                            url: "wmall/member/address/post",
                            data: r,
                            success: function(e) {
                                wx.removeStorageSync("address");
                              var t = "/pages/order/create/create?sid=" + s.data.address.sid;
                                a.util.jump2url(t, "navigateTo");
                            }
                        }));
                    }
                }); else {
                    if (d.errno) return a.util.toast(d.message), !1;
                    wx.removeStorageSync("address"), (i = a.util.getStorageSync("order.extra")) && (i = e.extend(i, {
                        address_id: d.message
                    })), a.util.setStorageSync("order.extra", i);
                  n = "/pages/order/create/create?sid=" + s.data.address.sid;
                    a.util.jump2url(n, "navigateTo");
                } else if ("errander" == s.data.options.channel) if (-1e3 == d.errno) wx.showModal({
                    title: "",
                    content: "亲,您的地址已超出跑腿的服务范围了",
                    confirmText: "调整地址",
                    confirmColor: "red",
                    cancelText: "仍然保存",
                    success: function(e) {
                        e.confirm ? wx.hideModal() : e.cancel && (r.force = 1, a.util.request({
                            method: "POST",
                            url: "wmall/member/address/post",
                            data: r,
                            success: function(e) {
                                wx.removeStorageSync("address");
                                var t = "/pages/paotui/diy?id=" + s.data.options.erranderId;
                                a.util.jump2url(t, "navigateTo");
                            }
                        }));
                    }
                }); else {
                    if (d.errno) return a.util.toast(d.message), !1;
                    wx.removeStorageSync("address");
                    var i = a.util.getStorageSync("errander.extra");
                    i && (i = "buy" == s.data.options.input ? e.extend(i, {
                        buyaddress_id: d.message
                    }) : e.extend(i, {
                        acceptaddress_id: d.message
                    })), a.util.setStorageSync("errander.extra", i);
                    var n = "/pages/paotui/diy?id=" + s.data.options.erranderId;
                    a.util.jump2url(n, "navigateTo");
                }
            }
        });
    },
    onDel: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确定删除该地址么",
            success: function(t) {
                if (t.confirm) {
                    var s = {
                        id: e.data.id
                    };
                    a.util.request({
                        url: "wmall/member/address/del",
                        data: s,
                        success: function(e) {
                            0 == e.data.message.errno && a.util.jump2url("/pages/member/address");
                        }
                    });
                }
            }
        });
    }
});