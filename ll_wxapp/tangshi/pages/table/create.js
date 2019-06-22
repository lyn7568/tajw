var t = getApp(), a = require("../../../static/js/utils/underscore.js");

Page({
    data: {
        showAddress: !1,
        showRedpacket: !1,
        showCoupon: !1,
        extra: {}
    },
    onLoad: function(e) {
        var o = this;
        o.data.sid = e.sid, o.data.table_id = e.table_id;
        var s = t.util.getStorageSync("order.extra") || {};
        o.data.table_id || (o.data.table_id = s.table_id);
        var r = {
            sid: e.sid,
            extra: s
        };
        t.util.request({
            url: "wmall/store/table/create",
            data: r,
            success: function(r) {
                r = (r = r.data.message).message, o.data.extra = a.extend(s, {
                    note: r.order.note,
                    invoice_id: r.order.invoiceId,
                    table_id: o.data.table_id
                }), o.setData({
                    store: r.store,
                    cart: r.cart,
                    activityed: r.activityed,
                    coupons: r.coupons,
                    redPackets: r.redPackets,
                    order: a.extend(r.order, e),
                    islegal: r.islegal,
                    extra: o.data.extra
                }), t.util.setStorageSync("order.extra", o.data.extra);
            }
        });
    },
    onOrderSubmit: function() {
        var a = this;
        if (!a.data.islegal) return !1;
        a.data.islegal = !1, a.setData({
            islegal: a.data.islegal
        });
        var e = t.util.getStorageSync("order.extra") || {}, o = {
            sid: a.data.sid,
            table_id: a.data.table_id,
            extra: e
        };
        t.util.request({
            url: "wmall/store/table/submit",
            data: o,
            success: function(a) {
                if ((a = a.data.message).errno) return t.util.toast(a.message, ""), !1;
                var e = a.message;
                return wx.showToast({
                    title: "下单成功",
                    success: function() {
                        wx.removeStorageSync("order"), wx.navigateTo({
                            url: "../../../pages/public/pay?order_id=" + e + "&order_type=takeout"
                        });
                    }
                }), !1;
            }
        });
    },
    onCalculate: function() {
        var a = this, e = {
            sid: a.data.sid,
            extra: a.data.extra
        };
        t.util.request({
            url: "wmall/store/table/create",
            data: e,
            success: function(e) {
                var o = {
                    activityed: (e = (e = e.data.message).message).activityed,
                    order: e.order
                };
                a.setData(o), t.util.setStorageSync("order.extra", a.data.extra);
            }
        });
    },
    onChangeInput: function(a) {
        var e = this, o = a.target.dataset.key, s = a.detail.value;
        e.data.extra[o] = s, e.setData(e.data.extra), t.util.setStorageSync("order.extra", e.data.extra);
    },
    onSelectCoupon: function(t) {
        var a = this;
        a.data.extra.coupon_id = t.currentTarget.dataset.id, a.setData({
            extra: a.data.extra,
            showCoupon: !1
        }), a.onCalculate();
    },
    onSelectRedpacket: function(t) {
        var a = this;
        a.data.extra.redpacket_id = t.currentTarget.dataset.id, a.setData({
            extra: a.data.extra,
            showRedpacket: !1
        }), a.onCalculate();
    },
    onToggleCoupon: function() {
        if (!this.data.coupons.length) return !1;
        this.setData({
            showCoupon: !this.data.showCoupon
        });
    },
    onToggleRedpacket: function() {
        var t = this;
        if (!t.data.redPackets.length) return !1;
        t.setData({
            showRedpacket: !t.data.showRedpacket
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("监听页面显示");
    },
    onHide: function() {
        console.log("监听页面隐藏");
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    submit: function() {
        wx.navigateTo({
            url: "detail"
        });
    },
    chooseRedpacket: function() {
        this.setData({
            showRedpacket: !this.data.showRedpacket
        }), console.log(this.data.showRedpacket);
    },
    chooseCoupon: function() {
        this.setData({
            showCoupons: !this.data.showCoupons
        }), console.log(this.data.showCoupons);
    }
});