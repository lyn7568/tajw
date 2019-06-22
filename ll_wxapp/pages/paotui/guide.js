var t = getApp();

Page({
    data: {
        showText: !0,
        home: {},
        getLocationStatus: !0
    },
    onChangeShowText: function() {
        var t = this;
        t.setData({
            showText: !t.data.showText
        });
    },
    onJsEvent: function(o) {
        t.util.jsEvent(o);
    },
    onLoad: function(o) {
        var a = this;
        t.util.request({
            url: "errander/guide/index",
            data: {
                forceLocation: 1
            },
            success: function(o) {
                if (-1 == (o = o.data.message).errno) return t.util.toast(o.message, ""), !1;
                if (-2 == o.errno) return a.setData({
                    getLocationStatus: !1
                }), !1;
                var n = o.message;
                a.setData({
                    home: n.data
                }), wx.setNavigationBarTitle({
                    title: n.data.page.title
                }), wx.setNavigationBarColor({
                    frontColor: n.data.page.navigationtextcolor,
                    backgroundColor: n.data.page.navigationbackground
                });
            }
        });
    },
    onGoodsInfo: function(t) {
        this.setData({
            "extra.note": t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});