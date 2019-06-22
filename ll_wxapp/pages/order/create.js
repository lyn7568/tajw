var e = getApp(), a = require("../../static/js/utils/underscore.js");

Page({
    data: {
        showRedpacket: !1,
        showSvipRedpacket: !1,
        showCoupon: !1,
        buy_mealredpacket: 0,
        extra: {}
    },
    onLoad: function(t) {
        e.util.checkOauth();
        var d = this;
        d.data.sid = t.sid, d.data.is_buysvip = t.is_buysvip, d.data.is_pindan = t.is_pindan, 
        d.data.pindan_id = t.pindan_id;
        var r = e.util.getStorageSync("order.extra") || {}, i = {
            sid: t.sid,
            extra: r,
            is_buysvip: d.data.is_buysvip,
            is_pindan: d.data.is_pindan,
            pindan_id: d.data.pindan_id
        };
        e.util.request({
            url: "wmall/order/create/index",
            data: i,
            success: function(i) {
                if ((i = i.data.message).errno) return e.util.toast(i.message, "", 1e3), !1;
                i = i.message, d.data.extra = a.extend(r, {
                    predict_index: i.order.deliveryTimes.predict_index,
                    predict_time_cn: i.order.deliveryTimes.predict_time_cn,
                    predict_day_cn: i.order.deliveryTimes.predict_day_cn,
                    address_id: i.address.id,
                    order_type: i.order.order_type
                }), 1 == r.buy_mealredpacket && (d.data.buy_mealredpacket = 1), d.setData({
                    store: i.store,
                    cart: i.cart,
                    address: i.address,
                    addresses: i.addresses,
                    coupons: i.coupons,
                    redPackets: i.redPackets,
                    order: a.extend(i.order, t),
                    islegal: i.islegal,
                    mobile: i.mobile,
                    buy_mealredpacket: d.data.buy_mealredpacket,
                    config_takeout: i.config_takeout,
                    svip_redpacket: i.svip_redpacket,
                    is_pindan: d.data.is_pindan,
                    pindan_id: d.data.pindan_id
                }), e.util.setStorageSync("order.extra", d.data.extra), d.onCheckSendPrice(i.message, i.address);
            }
        });
    },
    onJsEvent: function(a) {
        e.util.jsEvent(a);
    },
    onOrderSubmit: function(a) {
        var t = this;
        if (2 == t.data.extra.order_type) {
            var d = a.detail.value.mobile;
            if (!d) return e.util.toast("请输入提货手机号", ""), !1;
            t.data.extra.mobile = d;
        }
        if (!(1 != t.data.extra.order_type && t.data.extra.order_type || t.data.extra.address_id || 2 == t.data.store.delivery_type)) return e.util.toast("请选择收货地址", ""), 
        !1;
        if (!t.data.islegal) return !1;
        t.data.islegal = !1, t.setData({
            islegal: t.data.islegal
        });
        var r = e.util.getStorageSync("order.extra") || {};
        2 == t.data.store.delivery_type && (r.order_type = 2), r.formId = a.detail.formId, 
        r.mobile = d, 1 != r.order_type && r.order_type || 1 != t.data.config_takeout.audit_accept_address ? t.onSubmitPost(r) : wx.showModal({
            title: "请确定您的收货信息",
            content: "收货地址：" + t.data.address.address + "， 手机号：" + t.data.address.mobile + "， 收货人：" + t.data.address.realname,
            success: function(e) {
                if (e.confirm) t.onSubmitPost(r); else if (e.cancel) return t.setData({
                    islegal: !0
                }), !1;
            }
        });
    },
    onSubmitPost: function(a) {
        var t = this, d = {
            sid: t.data.sid,
            extra: a,
            is_pindan: t.data.is_pindan,
            pindan_id: t.data.pindan_id
        };
        e.util.request({
            url: "wmall/order/create/submit",
            data: d,
            success: function(a) {
                if ((a = a.data.message).errno) return 1e3 == a.errno ? (e.util.toast(a.message, "../store/goods?sid=" + d.sid), 
                !1) : (e.util.toast(a.message, ""), !1);
                var t = a.message;
                return wx.showToast({
                    title: "下单成功",
                    success: function() {
                        wx.removeStorageSync("order"), wx.redirectTo({
                            url: "../public/pay?order_id=" + t + "&order_type=takeout"
                        });
                    }
                }), !1;
            }
        });
    },
    onCalculate: function() {
        var a = this, t = {
            sid: a.data.sid,
            extra: a.data.extra,
            is_buysvip: a.data.is_buysvip,
            is_pindan: a.data.is_pindan,
            pindan_id: a.data.pindan_id
        };
        e.util.request({
            url: "wmall/order/create/index",
            data: t,
            success: function(t) {
                var d = {
                    activityed: (t = (t = t.data.message).message).activityed,
                    address: t.address,
                    order: t.order,
                    islegal: t.islegal,
                    redPackets: t.redPackets,
                    cart: t.cart,
                    svip_redpacket: t.svip_redpacket
                };
                a.setData(d), e.util.setStorageSync("order.extra", a.data.extra), a.onCheckSendPrice(t.message, t.address);
            }
        });
    },
    onCheckSendPrice: function(a, t) {
        var d = this;
        if ("noReachSendPrice" == a.errno) {
            if (t) {
                var r = {
                    address: t.address,
                    x: t.location_x,
                    y: t.location_y
                };
                e.util.setStorageSync("location", r, 600);
            }
            return e.util.toast(a.message, "../store/goods?id=" + d.data.sid, 3e3), !1;
        }
        return !0;
    },
    onSelectDeliveryday: function(e) {
        var a = this;
        a.data.order.deliveryTimes.predict_day = e.currentTarget.dataset.id, a.data.order.deliveryTimes.predict_day_cn = e.currentTarget.dataset.id, 
        a.data.extra.predict_day_cn = e.currentTarget.dataset.id, a.setData({
            order: a.data.order
        });
    },
    onSelectDeliverytimes: function(e) {
        var a = this;
        a.data.order.deliveryTimes.predict_index = e.currentTarget.dataset.id, a.data.order.deliveryTimes.predict_time_cn = e.currentTarget.dataset.time, 
        a.data.extra.predict_index = e.currentTarget.dataset.id, a.data.extra.predict_time_cn = e.currentTarget.dataset.time, 
        a.setData({
            order: a.data.order,
            showTimes: !1
        }), a.onCalculate();
    },
    onSelectCoupon: function(e) {
        var a = this;
        a.data.extra.coupon_id = e.currentTarget.dataset.id, a.setData({
            extra: a.data.extra,
            showCoupon: !1
        }), a.onCalculate();
    },
    onSelectRedpacket: function(e) {
        var a = this;
        a.data.extra.redpacket_id = e.currentTarget.dataset.id, a.setData({
            extra: a.data.extra,
            showRedpacket: !1
        }), a.onCalculate();
    },
    onChangeOrderType: function(e) {
        var a = this;
        a.data.extra.order_type = e.currentTarget.dataset.type, a.setData({
            extra: a.data.extra
        }), a.onCalculate();
    },
    onToggleCoupon: function() {
        if (!this.data.coupons.length) return !1;
        this.setData({
            showCoupon: !this.data.showCoupon
        });
    },
    onToggleRedpacket: function() {
        var e = this;
        if (!e.data.redPackets.length && !e.data.svip_redpacket && e.data.svip_redpacket && !e.data.svip_redpacket.id) return !1;
        e.setData({
            showRedpacket: !e.data.showRedpacket
        });
    },
    onToggleTimes: function() {
        this.setData({
            showTimes: !this.data.showTimes
        });
    },
    onBuyMealredpacket: function() {
        var e = this;
        e.setData({
            buy_mealredpacket: !e.data.buy_mealredpacket
        }), e.data.buy_mealredpacket || e.setData({
            "extra.redpacket_id": 0
        }), e.data.extra.buy_mealredpacket = e.data.buy_mealredpacket, e.onCalculate();
    },
    onToggleSvipRedpacket: function() {
        var e = this;
        e.data.showSvipRedpacket = !e.data.showSvipRedpacket, e.setData({
            showSvipRedpacket: e.data.showSvipRedpacket
        });
    },
    onConfirmSvipExchange: function() {
        var a = this, t = a.data.svip_redpacket.id, d = a.data.svip_redpacket.take_status;
        "exchange" == d && (t = a.data.svip_redpacket.store_redpacket.id), e.util.request({
            url: "wmall/order/create/exchange",
            data: {
                id: t,
                sid: a.data.sid,
                oldid: a.data.svip_redpacket.exchange_id,
                discount: a.data.order.total_fee
            },
            success: function(t) {
                if ((t = t.data.message).errno) return e.util.toast(t.message), !1;
                var r = "领取成功";
                "exchange" == d && (r = "兑换成功"), e.util.toast(r), t = t.message, a.setData({
                    redPackets: t.redPackets,
                    svip_redpacket: t.svip_redpacket
                });
                var i = {
                    currentTarget: {
                        dataset: {
                            id: t.redpacket_id
                        }
                    }
                };
                a.onSelectRedpacket(i), "exchange" == d && a.onToggleSvipRedpacket();
            }
        });
    },
    onToggleBuysvip: function() {
        1 == this.data.is_buysvip ? this.data.is_buysvip = 0 : this.data.is_buysvip = 1, 
        this.onCalculate();
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