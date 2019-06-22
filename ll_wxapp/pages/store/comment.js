var t = getApp();

Page({
    data: {
        comments: [],
        showloading: !1,
        showNodata: !1,
        activityStatus: !1,
        shareData: {
            title: "",
            path: "",
            success: function() {},
            fail: function() {}
        }
    },
    onLoad: function(a) {
        var s = this;
        s.data.options = a, s.data.sid = a.sid, t.util.request({
            url: "wmall/store/goods/index",
            data: {
                sid: a.sid
            },
            success: function(t) {
                var t = t.data.message.message;
                if (s.data.store = t.store, t.store.activity.num || (s.data.activityStatus = !0), 
                s.setData({
                    store: t.store,
                    activityStatus: s.data.activityStatus
                }), s.data.shareData.title = t.store.title, s.data.shareData.path = "/pages/store/goods?sid=" + t.store.id, 
                wx.setNavigationBarTitle({
                    title: s.data.store.title
                }), t.store.data.wxapp) {
                    var a = t.store.data.wxapp.extPages.pages_store_goods.navigationBarBackgroundColor;
                    wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: a
                    }), s.setData({
                        bgColor: a
                    });
                }
            }
        }), s.onReachBottom();
    },
    onReachBottom: function() {
        var a = this;
        if (-1 == a.data.min) return !1;
        this.setData({
            showloading: !0
        }), t.util.request({
            url: "wmall/store/comment",
            data: {
                sid: a.data.sid,
                min: a.data.min
            },
            success: function(t) {
                var s = a.data.comments.concat(t.data.message.message.comments), e = t.data.message.message.stat;
                if (!s.length) return a.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                a.setData({
                    comments: s,
                    min: t.data.message.min,
                    stat: e
                }), t.data.message.min || (a.data.min = -1), a.setData({
                    showloading: !1
                });
            }
        });
    },
    onImg: function(t) {
        var a = this.data.comments[t.currentTarget.dataset.idx].thumbs, s = a[t.currentTarget.dataset.id];
        wx.previewImage({
            current: s,
            urls: a
        });
    },
    onFavor: function(a) {
        var s = this, e = a.currentTarget.dataset.sid, o = s.data.store;
        if (s.data.store.is_favorite) i = "cancal"; else var i = "star";
        var r = {
            id: e,
            type: i
        };
        t.util.request({
            url: "wmall/member/op/favorite",
            data: r,
            success: function(a) {
                0 == a.data.message.errno ? "star" == i ? (t.util.toast("添加收藏成功"), o.is_favorite = !o.is_favorite, 
                s.setData({
                    store: o
                })) : (t.util.toast("取消收藏成功"), o.is_favorite = !o.is_favorite, s.setData({
                    store: o
                })) : t.util.toast(a.data.message.message);
            }
        });
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});