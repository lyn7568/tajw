var n = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = this;
        n.util.request({
            url: "freeLunch/freeLunch/partake_success",
            data: {},
            success: function(e) {
                var o = e.data.message;
                if (o.errno) return n.util.toast(o.message), !1;
                t.setData(o.message);
            }
        });
    },
    onJsEvent: function(e) {
        n.util.jsEvent(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});