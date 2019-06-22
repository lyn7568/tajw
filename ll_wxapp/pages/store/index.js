var t = getApp();

Page({
    data: {
        activityStatus: !1,
        shareData: {
            title: "",
            path: "",
            success: function() {},
            fail: function() {}
        }
    },
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "wmall/store/index",
            data: {
                sid: a.sid
            },
            success: function(t) {
                var a = t.data.message.message.store, s = t.data.message.message.activity;
                if (s.num || (e.data.activityStatus = !0), e.setData({
                    store: a,
                    activity: s,
                    activityStatus: e.data.activityStatus
                }), e.data.shareData.title = a.title, e.data.shareData.path = "/pages/store/goods?sid=" + a.id, 
                wx.setNavigationBarTitle({
                    title: e.data.store.title
                }), a.data.wxapp) {
                    var i = a.data.wxapp.extPages.pages_store_goods.navigationBarBackgroundColor;
                    wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: i
                    }), e.setData({
                        bgColor: i
                    });
                }
            }
        });
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    onFavor: function(a) {
        var e = this, s = a.currentTarget.dataset.sid, i = e.data.store;
        if (e.data.store.is_favorite) r = "cancal"; else var r = "star";
        var o = {
            id: s,
            type: r
        };
        t.util.request({
            url: "wmall/member/op/favorite",
            data: o,
            success: function(a) {
                0 == a.data.message.errno ? "star" == r ? (t.util.toast("添加收藏成功"), i.is_favorite = !i.is_favorite, 
                e.setData({
                    store: i
                })) : (t.util.toast("取消收藏成功"), i.is_favorite = !i.is_favorite, e.setData({
                    store: i
                })) : t.util.toast(a.data.message.message);
            }
        });
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    },
    onImg: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        if (console.log(e), "service" == e) s = a.data.store.qualification.service.thumb; else if ("business" == e) s = a.data.store.qualification.business.thumb; else if ("more1" == e) s = a.data.store.qualification.more1.thumb; else var s = a.data.store.qualification.more2.thumb;
        var i = [ s ];
        wx.previewImage({
            urls: i
        });
    }
});