var t = getApp();

Page({
    data: {
        diy: {
            data: {}
        },
        selectedtab: "coupon",
        is_grant: 0
    },
    onLoad: function(a) {
        var e = this;
        if (a && a.scene) {
            var o = decodeURIComponent(a.scene), n = (o = o.split(":"))[1];
            a.sid = n;
        }
        e.data.options = a, t.util.request({
            url: "wmall/store/home/index",
            data: {
                sid: e.data.options.sid || 3
            },
            success: function(a) {
                var o = a.data.message;
                o.errno && t.util.toast(o.message), e.data.diy.data = o.message.homepage;
                var n = o.message.homepage.items;
                for (var s in n) "richtext" == n[s].id && t.WxParse.wxParse("richtext." + s, "html", n[s].params.content, e, 5);
                e.setData({
                    diy: e.data.diy
                }), wx.setNavigationBarTitle({
                    title: e.data.diy.data.page.title
                }), wx.setNavigationBarColor({
                    frontColor: e.data.diy.data.page.navigationtextcolor,
                    backgroundColor: e.data.diy.data.page.navigationbackground
                });
            }
        }), t.util.setNavigator(t.navigator.list, {
            bottom: "80px"
        });
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    getCoupon: function(a) {
        var e = this;
        t.util.request({
            url: "wmall/channel/coupon/get",
            data: {
                sid: a.target.dataset.sid
            },
            success: function(a) {
                0 == a.data.message.errno ? (t.util.toast(a.data.message.message), e.setData({
                    is_grant: 1
                })) : t.util.toast("领取失败");
            }
        });
    },
    onScrollTo: function(t) {
        var a = t.currentTarget.dataset.scrollid;
        this.setData({
            scrollToId: a,
            selectedtab: a
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