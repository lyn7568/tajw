var n = getApp();

Page({
    data: {
        user: []
    },
    onLoad: function(e) {
        var o = this;
        n.util.request({
            url: "wmall/member/profile",
            success: function(e) {
                var t = e.data.message.message, s = n.util.getExtConfigSync();
              s.siteStep.version || (s.siteStep.version = "8.0"), o.setData({
                    user: t,
                    ext: s
                });
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