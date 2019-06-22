var n = getApp();

Page({
    data: {},
    onLoad: function() {
        var o = this;
        n.util.request({
            url: "spread/commission",
            success: function(n) {
                var t = n.data.message;
                o.setData(t.message);
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