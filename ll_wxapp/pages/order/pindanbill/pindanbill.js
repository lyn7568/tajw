var a = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        t.id && (e.data.id = t.id), a.util.request({
            url: "wmall/order/index/pindan_detail",
            data: {
                id: e.data.id
            },
            success: function(t) {
                if ((d = t.data.message).errno) return a.util.toast(d.message), !1;
                var d = d.message;
                e.setData(d);
            }
        });
    }
});