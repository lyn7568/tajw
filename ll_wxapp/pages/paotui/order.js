var a = getApp();

Page({
    data: {
        orders: [],
        showLoading: !1,
        showNodata: !1
    },
    onLoad: function(a) {
        var t = this;
        t.data.options = a, t.onReachBottom();
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onReachBottom: function() {
        var t = this;
        if (-1 == t.data.min) return !1;
        this.setData({
            showloading: !0
        }), a.util.request({
            url: "errander/order/list",
            data: {
                min: t.data.min
            },
            success: function(a) {
                var s = t.data.orders.concat(a.data.message.message);
                if (!s.length) return t.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                t.setData({
                    orders: s,
                    min: a.data.message.min,
                    order_status: a.data.message.order_status
                }), a.data.message.min || (t.data.min = -1), t.setData({
                    showloading: !1
                });
            }
        });
    }
});