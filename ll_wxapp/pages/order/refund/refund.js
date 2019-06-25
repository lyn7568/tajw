var a = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        e && e.id && (t.data.id = e.id), a.util.request({
            url: "wmall/order/index/refund",
            data: {
                id: t.data.id
            },
            success: function(e) {
                var s = e.data.message;
                if (s.errno) return a.util.toast(s.message), !1;
                s = s.message, t.setData({
                    refunds: s.refunds
                });
            }
        });
    }
});