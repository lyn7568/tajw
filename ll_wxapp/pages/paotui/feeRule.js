var n = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var o = this;
        n.util.request({
            url: "errander/diy/feeRule",
            data: {
                id: e.id
            },
            success: function(n) {
                o.setData(n.data.message.message);
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