var t = getApp();

Page({
    data: {
        current: [],
        showloading: !1,
        showNodata: !1,
        trade_type: 0,
        num: 0
    },
    onLoad: function(t) {
        this.onReachBottom();
    },
    onSubmit: function(t) {
        var a = this, e = t.currentTarget.dataset.value;
        a.setData({
            trade_type: e,
            num: e,
            status: 1
        }), a.onReachBottom();
    },
    onReachBottom: function() {
        var a = this;
        if (1 == a.data.status) a.setData({
            status: 0,
            min: 0,
            current: []
        }); else if (-1 == a.data.min) return !1;
        a.setData({
            showloading: !0
        }), t.util.request({
            url: "spread/current",
            data: {
                min: a.data.min,
                trade_type: a.data.trade_type
            },
            success: function(t) {
                var e = t.data.message.message.min, s = a.data.current.concat(t.data.message.message.current);
                if (!s.length) return a.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                a.setData({
                    current: s,
                    min: e
                }), t.data.message.message.min || (a.data.min = -1), a.setData({
                    showloading: !1,
                    showNodata: !1
                });
            }
        });
    }
});