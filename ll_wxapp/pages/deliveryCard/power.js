var n = getApp();

Page({
    data: {},
    onLoad: function() {
        var o = this;
        n.util.request({
            url: "deliveryCard/index/power",
            success: function(n) {
                o.setData(n.data.message.message);
            }
        });
    },
    onToHome: function() {
        n.util.gohome();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});