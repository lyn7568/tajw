var n = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        if (!t.id) return n.util.toast("参数错误"), !1;
        n.util.request({
            url: "spread/current/detail",
            data: {
                id: t.id
            },
            success: function(t) {
                var o = t.data.message.message;
                o.errno ? n.util.toast(o.message) : e.setData(o);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});