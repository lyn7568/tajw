var t = getApp();

Page({
    data: {
        theme: t.util.getStorageSync("theme"),
        filter_title: "综合排序",
        activityHeight: !1,
        showNodata: !1,
        shareData: {
            title: "",
            path: "/pages/home/index",
            success: function() {},
            fail: function() {}
        },
        condition: {
            order: "",
            mode: "",
            dis: ""
        },
        store: {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        }
    },
    onLoad: function(a) {
        var e = this;
        e.data.options = a, a.cid && (e.data.cid = a.cid), a.dis && (e.data.condition.dis = a.dis), 
        a.delivery_type && (e.data.delivery_type = a.delivery_type);
        var o = t.util.getStorageSync("location");
        o && o.x ? e.onGetInfo() : t.util.getLocation(function(a) {
            var o = a.data.message.message;
            o = {
                address: o.address,
                x: o.latitude,
                y: o.longitude
            }, t.util.setStorageSync("location", o, 300), e.onGetInfo();
        });
    },
    onGetStore: function(a) {
        var e = this;
        if (a && (e.data.store = {
            page: 1,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        }), 1 == e.data.store.loaded) return !1;
        e.setData({
            "store.loading": 1
        });
        var o = t.util.getStorageSync("location"), i = {
            lat: o.x,
            lng: o.y,
            condition: JSON.stringify(e.data.condition),
            cid: e.data.cid,
            delivery_type: e.data.delivery_type,
            page: e.data.store.page,
            psize: e.data.store.psize,
            forceLocation: 1
        };
        t.util.request({
            url: "wmall/home/index/store",
            data: i,
            success: function(t) {
                var a = t.data.message.message;
                e.data.store.data = e.data.store.data.concat(a.stores), a.pagetotal <= e.data.store.page && (e.data.store.loaded = 1, 
                e.data.store.loading = 0, e.data.store.data.length || (e.data.store.empty = 1)), 
                e.data.store.page++, e.setData({
                    store: e.data.store
                });
            }
        });
    },
    onGetInfo: function() {
        var a = this, e = t.util.getStorageSync("location");
        if (e) {
            var o = {
                lat: e.x,
                lng: e.y,
                cid: a.data.cid,
                delivery_type: a.data.delivery_type,
                condition: JSON.stringify(a.data.condition)
            };
            t.util.request({
                url: "wmall/home/search/index",
                data: o,
                success: function(t) {
                    var e = t.data.message.message;
                    a.data.store.data = e.stores.stores, e.stores.pagetotal <= a.data.store.page && (a.data.store.loaded = 1, 
                    a.data.store.data.length || (a.data.store.empty = 1)), a.data.store.page++, e.stores = a.data.store, 
                    a.setData({
                        store: e.stores,
                        discounts: e.discounts,
                        orderbys: e.orderbys,
                        carousel: e.carousel,
                        config: e.config
                    }), wx.setNavigationBarTitle({
                        title: e.carousel.title ? e.carousel.title : "全部商家"
                    }), a.data.shareData.title = e.config.title;
                }
            });
        } else t.util.toast("获取位置失败,请重新进入小程序");
    },
    onToggleDiscount: function(t) {
        var a = t.currentTarget.dataset, e = this.data.store.data;
        e[a.index].activity.is_show_all = !e[a.index].activity.is_show_all, this.setData({
            "store.data": e
        });
    },
    onReady: function() {},
    onReachBottom: function() {
        this.onGetStore();
    },
    onMultiple: function() {
        this.setData({
            multiple: !this.data.multiple
        });
    },
    onFilter: function() {
        this.setData({
            filter: !this.data.filter
        });
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    onOrderby: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        if ("order" == e) {
            var o = t.currentTarget.dataset.order;
            a.setData({
                "condition.order": o,
                multiple: !1,
                showNodata: !1
            }), "sailed" != o && "distance" != o ? a.setData({
                filter_title: t.currentTarget.dataset.title
            }) : a.setData({
                filter_title: "综合排序"
            });
        } else {
            if ("discounts" == e) {
                var i = t.currentTarget.dataset.dis;
                return a.data.condition.dis == i && (i = ""), a.setData({
                    "condition.dis": i
                }), !1;
            }
            if ("mode" == e) {
                var s = t.currentTarget.dataset.mode;
                return a.data.condition.mode == s && (s = ""), a.setData({
                    "condition.mode": s
                }), !1;
            }
            "clear" == e ? a.setData({
                "condition.dis": "",
                "condition.order": "",
                "condition.mode": "",
                filter: !1
            }) : "finish" == e && a.setData({
                filter: !1,
                showNodata: !1
            });
        }
        a.onGetStore(!0);
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        }, t.onLoad(t.data.options), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});