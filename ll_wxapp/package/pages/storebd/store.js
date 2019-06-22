var t = getApp();

Page({
    data: {
        stores: {
            page: 1,
            psize: 15,
            loaded: !1,
            empty: !1,
            data: []
        }
    },
    onLoad: function() {
        this.onReachBottom();
    },
    onReachBottom: function() {
        var a = this;
        a.data.stores.loaded || t.util.request({
            url: "storebd/store",
            data: {
                page: a.data.stores.page,
                psize: a.data.stores.psize
            },
            success: function(s) {
                var e = s.data.message;
                if (e.errno) return t.util.toast(e.message), !1;
                e = e.message, a.data.stores.data = a.data.stores.data.concat(e.stores), a.data.stores.data.length || (a.data.stores.empty = !0), 
                e.stores && e.stores.length < a.data.stores.psize && (a.data.stores.loaded = !0), 
                a.data.stores.page++, a.setData({
                    stores: a.data.stores
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.stores = {
            page: 1,
            psize: 15,
            loaded: !1,
            empty: !1,
            data: []
        }, t.onReachBottom(), wx.stopPullDownRefresh();
    }
});