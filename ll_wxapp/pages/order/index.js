var a = getApp();

Page(function(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}({
    data: {
        orders: {
            loaded: 0,
            empty: 0,
            data: []
        }
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onFinishMealPay: function() {
        wx.showModal({
            title: "",
            content: "您的支付方式为餐后支付，请到商家收银台付款",
            success: function(a) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this;
        if (-1 == t.data.min) return !1;
        a.util.request({
            url: "wmall/order/index",
            data: {
                min: t.data.min
            },
            success: function(a) {
                var e = t.data.orders.data.concat(a.data.message.message);
                t.data.orders.data = e, e.length || (t.data.orders.empty = 1);
                var n = a.data.message.min;
                n || (n = -1), (-1 == n || e.length < 20) && (t.data.orders.loaded = 1), t.setData({
                    orders: t.data.orders,
                    min: n,
                    config_mall: a.data.message.config_mall,
                    errander_status: a.data.message.errander_status,
                    showloading: !1
                });
            }
        });
    },
    onShareAppMessage: function() {}
}, "onPullDownRefresh", function() {
    var a = this;
    a.data.min = 0, a.data.orders = {
        loaded: 0,
        empty: 0,
        data: []
    }, a.onReachBottom(), wx.stopPullDownRefresh();
}));