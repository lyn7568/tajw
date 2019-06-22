var a = getApp();

Page({
    data: {
        luckiers: {
            loaded: 0,
            empty: 0,
            data: []
        }
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this;
        if (-1 == t.data.min) return !1;
        a.util.request({
            url: "freeLunch/freeLunch/luckier",
            data: {
                min: t.data.min
            },
            success: function(a) {
                console.log(a);
                var e = t.data.luckiers.data.concat(a.data.message.message);
                t.data.luckiers.data = e, e.length || (t.data.luckiers.empty = 1);
                var n = a.data.message.min;
                !n && e.length > 0 && (t.data.luckiers.loaded = 1), n || (n = -1), console.log(t.data.luckiers), 
                t.setData({
                    luckiers: t.data.luckiers,
                    min: n
                });
            }
        });
    },
    onShareAppMessage: function() {},
    onPullDownRefresh: function() {
        var a = this;
        a.data.min = 0, a.data.luckiers = {
            loaded: 0,
            empty: 0,
            data: []
        }, a.onReachBottom(), wx.stopPullDownRefresh();
    }
});