var a = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        a.util.request({
            url: "spread/order/detail",
            data: {
                id: e.id
            },
            success: function(a) {
                t.setData({
                    detail: a.data.message.message
                }), console.log(t.data);
            }
        });
    }
});