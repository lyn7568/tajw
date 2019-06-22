var e = getApp();

Page(function(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}({
    data: {
        stores: [],
        recommendStores: [],
        activityHeight: !1
    },
    onLoad: function(t) {
        var a = t.key ? t.key : "", s = this, o = {
            key: a,
            forceLocation: 1
        };
        s.setData({
            keyword: a
        }), e.util.request({
            url: "wmall/home/hunt/search",
            data: o,
            success: function(e) {
                var t = e.data.message.message.stores, a = e.data.message.message.recommendStores;
                0 == t.length && (t = !1), s.setData({
                    stores: t,
                    recommendStores: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onInput: function(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    onSearch: function() {
        var t = this;
        if (!t.data.keyword) return !1;
        var a = {
            key: t.data.keyword
        };
        e.util.request({
            url: "wmall/home/hunt/search",
            data: a,
            success: function(e) {
                var a = e.data.message.message.stores, s = e.data.message.message.recommendStores;
                0 == a.length && (a = !1), t.setData({
                    stores: a,
                    recommendStores: s
                }), console.log(t.data);
            }
        });
    },
    onToggleDiscount: function(e) {
        var t = e.currentTarget.dataset;
        this.data.stores[t.index].activity.is_show_all = !this.data.stores[t.index].activity.is_show_all, 
        this.setData({
            stores: this.data.stores
        });
    }
}, "onPullDownRefresh", function() {
    var e = this;
    e.data.store = [], e.data.recommendStores = [], e.onLoad({
        key: ""
    }), wx.stopPullDownRefresh();
}));