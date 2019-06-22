var a = getApp();

Page({
    data: {
        orders: [],
        showloading: !1,
        showNodata: !1,
        status: -1,
        num: -1
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onSubmit: function(a) {
        var t = this, s = a.currentTarget.dataset.status;
        t.setData({
            status: s,
            num: s,
            frquency: 1
        }), t.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.frquency) t.setData({
            frquency: 0,
            orders: [],
            min: 0
        }); else if (-1 == t.data.min) return !1;
        this.setData({
            showloading: !0
        });
        var s = {
            min: t.data.min,
            status: t.data.status
        };
        a.util.request({
            url: "spread/order/index",
            data: s,
            success: function(a) {
                var s = t.data.orders.concat(a.data.message.message);
                if (!s.length) return t.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                t.setData({
                    orders: s,
                    min: a.data.message.min
                }), a.data.message.min || (t.data.min = -1), t.setData({
                    showloading: !1,
                    showNodata: !1
                });
            }
        });
    }
});