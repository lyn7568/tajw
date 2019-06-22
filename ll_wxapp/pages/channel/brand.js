var a = getApp();

Page({
    data: {
        shareData: {
            title: "为您优选",
            path: "/pages/channel/brand",
            success: function() {},
            fail: function() {}
        }
    },
    onLoad: function(t) {
        var e = this;
        a.util.request({
            url: "wmall/channel/brand",
            data: {
                forceLocation: 1
            },
            success: function(a) {
                e.setData(a.data.message.message);
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});