var n = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var o = this;
        n.util.request({
            url: "freeLunch/freeLunch/rule",
            data: {},
            success: function(e) {
                console.log(e);
                var t = e.data.message.message.agreement;
                n.WxParse.wxParse("agreement", "html", t, o, 0);
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