var n = getApp();

Page({
    data: {
        showNoData: !1,
        comments: [],
        shareData: {
            title: "",
            path: "",
            success: function() {},
            fail: function() {}
        }
    },
    onLoad: function(n) {
        this.onReachBottom();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var a = this;
        if (console.log("+++++++++++"), console.log(a.data.min), -1 == a.data.min) return !1;
        var t = {
            min: a.data.min
        };
        n.util.request({
            url: "ordergrant/share",
            data: t,
            success: function(n) {
                var t = a.data.comments.concat(n.data.message.message);
                if (!t.length) return a.setData({
                    showNoData: !0
                }), !1;
                var o = n.data.message.min;
                a.setData({
                    min: o,
                    comments: t
                }), n.data.message.min || (a.data.min = -1), console.log("------------------"), 
                console.log(o);
            }
        });
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    },
    onJsEvent: function(a) {
        n.util.jsEvent(a);
    }
});