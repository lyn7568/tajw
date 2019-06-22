var n = getApp();

Page({
    data: {
        showshare: !1
    },
    onLoad: function(e) {
        var o = this;
        n.util.request({
            url: "spread/index",
            success: function(n) {
                var e = n.data.message;
                -1e3 == e.errno ? wx.redirectTo({
                    url: "register",
                    fail: function(n) {
                        console.log("=============="), console.info(n);
                    }
                }) : (o.setData(e.message), wx.setNavigationBarTitle({
                    title: e.message.basic.menu_name
                }));
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
    onShareAppMessage: function() {},
    onToggleStatus: function() {
        var n = this;
        n.setData({
            showshare: !n.data.showshare
        });
    }
});