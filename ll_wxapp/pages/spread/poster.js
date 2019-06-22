var t = getApp();

Page({
    data: {
        showloading: !1,
        windowHeight: 0
    },
    onLoad: function() {
        var e = this;
        t.util.request({
            url: "spread/poster",
            success: function(a) {
                return a.data.message.errno ? (t.util.toast(a.data.message.message), !1) : (e.setData(a.data.message.message), 
                a.data.message.message.respon ? void 0 : (e.setData({
                    showloading: !0
                }), !1));
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight;
                e.setData({
                    windowHeight: a
                });
            }
        });
    },
    onImageLoad: function() {
        var t = this, e = t.data.windowHeight;
        t.setData({
            windowHeight: e
        });
    },
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    }
});