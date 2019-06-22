var n = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var e = this;
        n.util.request({
            url: "wmall/home/help/index",
            data: {},
            success: function(t) {
                var o = t.data.message;
                if (o.errno) return n.util.toast(o.message), !1;
                o = o.message, e.setData(o);
            }
        });
    },
    onJsEvent: function(t) {
        n.util.jsEvent(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});