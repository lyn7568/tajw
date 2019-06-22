var t = getApp();

Page({
    data: {
        isAgree: !1,
        isSelect: !1,
        showCoupon: !1,
        total_fee: 0,
        no_discount_part: 0,
        sum: 0,
        interim: 0,
        final_fee: 0,
        couponNum: 0,
        legal: 0,
        showCouponPrice: !1,
        showNum: !1,
        coupons: [],
        activityCoupon: [],
        submit: !1
    },
    onLoad: function(t) {
        this.data.sid = t.sid, this.setData({
            sid: t.sid
        });
    },
    onUnload: function() {},
    bindAgreeChange: function(t) {
        this.setData({
            isAgree: !this.data.isAgree
        });
    },
    onTotalfee: function(t) {
        var a = t.detail.value, o = this;
        a || (a = 0), o.setData({
            total_fee: a,
            isSelect: !1,
            activityCoupon: []
        }), o.calculate(), o.requestCoupons();
    },
    noDiscountPart: function(t) {
        var a = t.detail.value, o = this;
        a || (a = 0), o.setData({
            no_discount_part: a,
            isSelect: !1,
            activityCoupon: []
        }), o.calculate(), o.requestCoupons();
    },
    showCoupon: function() {
        if (!this.data.showNum) return !1;
        this.setData({
            showCoupon: !this.data.showCoupon
        });
    },
    selectCoupon: function(t) {
        var a = this, o = a.data.coupons, e = t.currentTarget.dataset.id;
        o[e].selected = !o[e].selected, a.setData({
            activityCoupon: o[e],
            showCoupon: !1,
            coupons: o,
            isSelect: !0
        }), a.calculate();
    },
    noUse: function() {
        var t = this;
        t.setData({
            activityCoupon: [],
            showCoupon: !1,
            isSelect: !0
        }), t.calculate(), t.requestCoupons();
    },
    calculate: function() {
        var t = this, a = parseFloat(t.data.total_fee), o = parseFloat(t.data.no_discount_part);
        if (t.setData({
            submit: !1,
            legal: 0,
            showCouponPrice: !1,
            interim: a,
            final_fee: a
        }), t.data.isSelect || t.setData({
            couponNum: 0
        }), isNaN(o) && (o = 0), o > a) return wx.showToast({
            title: "超出消费总额",
            icon: "loading"
        }), !1;
        var e = (a - o).toFixed(2);
        if (t.setData({
            sum: e
        }), a) {
            var s = t.data.activityCoupon, i = parseFloat(s.condition);
            if (s.id > 0 && i <= e) {
                var n = (a - parseFloat(s.discount)).toFixed(2);
                t.setData({
                    showNum: !0,
                    showCouponPrice: !0,
                    interim: n,
                    final_fee: n
                });
            }
            t.setData({
                submit: !0
            });
        }
        t.setData({
            legal: 1
        });
    },
    requestCoupons: function() {
        var a = this, o = {
            sid: a.data.sid,
            sum: a.data.sum
        };
        t.util.request({
            url: "wmall/store/paybill/coupon",
            showLoading: !1,
            data: o,
            success: function(t) {
                var o = t.data.message.message, e = t.data.message.num;
                o && e > 0 && a.setData({
                    coupons: o,
                    couponNum: e,
                    showNum: !0
                });
            }
        });
    },
    onSubmit: function() {
        var a = this;
        if (!a.data.submit) return wx.showToast({
            title: "请输入金额",
            icon: "loading"
        }), !1;
        var o = {
            sid: a.data.sid || 3,
            total_fee: a.data.total_fee,
            no_discount_part: a.data.no_discount_part,
            couponId: a.data.activityCoupon.id
        };
        t.util.request({
            url: "wmall/store/paybill/index",
            showLoading: !1,
            data: o,
            success: function(a) {
                var o = a.data.message;
                if (o.errno) return t.util.toast(o.message, ""), !1;
                var e = o.message;
                wx.showToast({
                    title: "下单成功",
                    success: function() {
                        wx.navigateTo({
                            url: "../public/pay?order_id=" + e + "&order_type=paybill"
                        });
                    }
                });
            }
        });
    },
    onReady: function() {}
});