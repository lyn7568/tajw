var t = getApp();

Page({
    data: {
        theme: t.util.getStorageSync("theme"),
        is_use_diy: 1,
        address: "定位中。。。",
        showNodata: !1,
        config: {
            version: 2
        },
        superRedpacket: {
            is_show: !1
        },
        topSearchBar: !1,
        shareData: {
            title: "",
            path: "/pages/home/index",
            success: function() {},
            fail: function() {}
        },
        store: {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 0
        },
        storeExtra: {
            condition: {
                order: "",
                mode: "",
                dis: ""
            },
            filter_title: "综合排序",
            multiple: !1,
            filter: !1
        },
        danmu: 1,
        dialog: {
            dialogGuide: !0
        },
        diy: {
            data: {}
        },
        has_diy_guide: !1,
        selectedtab: "coupon",
        is_grant: 0
    },
    onToggleDiscount: function(t) {
        var a = t.currentTarget.dataset;
        "waimai_stores" == a.type ? (this.data.diy.data.items[a.diyindex].data[a.index].activity.is_show_all = !this.data.diy.data.items[a.diyindex].data[a.index].activity.is_show_all, 
        this.setData({
            "diy.data.items": this.data.diy.data.items
        })) : (this.data.store.data[a.index].activity.is_show_all = !this.data.store.data[a.index].activity.is_show_all, 
        this.setData({
            "store.data": this.data.store.data
        }));
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    onGetIndex: function() {
        var a = this, e = t.util.getStorageSync("location");
        if (e) {
            var o = {
                lat: e.x,
                lng: e.y,
                forceOauth: 1
            }, s = a.data.options;
            if (s && s.scene) {
                var i = decodeURIComponent(s.scene);
                i = i.split(":"), o.code = i[1];
            }
            a.setData({
                "store.loading": 1
            }), t.util.request({
                url: "wmall/home/index/index",
                data: o,
                success: function(e) {
                    var s = e.data.message;
                    if (s.errno) return t.util.toast(s.message), !1;
                    if (2 != (s = s.message).config.version) {
                        a.data.store.loading = 0, a.data.store.data = s.stores.stores, s.stores.pagetotal <= a.data.store.page && (a.data.store.loaded = 1, 
                        a.data.store.data.length || (a.data.store.empty = 1)), a.data.store.page++, s.store = a.data.store, 
                        s.superRedpacket = {};
                        var i = s.superRedpacketData;
                        if (i && 0 == i.errno && i.message.page && (s.superRedpacket = {
                            is_show: !0,
                            type: i.message.type || "",
                            page: i.message.page,
                            redpackets: i.message.redpackets
                        }), 1 == s.is_use_diy) {
                            var r = s.diy.data.items;
                            for (var d in r) "richtext" == r[d].id && t.WxParse.wxParse("richtext." + d, "html", r[d].params.content, a, 5);
                            a.data.richtext && (s.richtext = a.data.richtext), a.data.shareData.title = s.config.title, 
                            wx.setNavigationBarTitle({
                                title: s.config.title
                            }), s.config_wxapp.diy && 1 == s.config_wxapp.diy.use_diy_home && wx.setNavigationBarColor({
                                frontColor: s.diy.data.page.navigationtextcolor,
                                backgroundColor: s.diy.data.page.navigationbackground
                            }), setInterval(function() {
                                a.setData({
                                    danmu: !a.data.danmu
                                });
                            }, 2500);
                            var n = s.diy.guide;
                            n && (n && "everytime" == n.params.show_setting && t.util.getStorageSync("storage") && (a.setData({
                                has_diy_guide: !0
                            }), t.util.setStorageSync("storage", {}, 0)), s.storage = t.util.getStorageSync("storage"), 
                            !n || "interval" != n.params.show_setting || s.storage && s.storage.storageGuide || t.util.setStorageSync("storage", {
                                storageGuide: 1
                            }, 60 * n.params.interval_time));
                        }
                        if (!a.data.has_diy_guide) {
                            var l = s.guide;
                            l && "everytime" == l.params.show_setting && t.util.getStorageSync("storage") && t.util.setStorageSync("storage", {}, 0), 
                            s.storage = t.util.getStorageSync("storage"), !l || "interval" != l.params.show_setting || s.storage && s.storage.storageGuide || t.util.setStorageSync("storage", {
                                storageGuide: 1
                            }, 60 * l.params.interval_time);
                        }
                        if (a.setData(s), o.code) if (s.spread && 0 == s.spread.errno) {
                            var g = s.spread.message.nickname + "向您推荐了" + a.data.config.title + ",快去下单吧!";
                            t.util.toast(g);
                        } else t.util.toast(s.spread.message);
                    } else {
                        if ("home" == s.config.store_url) {
                            a.data.diy.data = s.homepage;
                            var c = s.homepage.items;
                            for (var d in c) "richtext" == c[d].id && t.WxParse.wxParse("richtext." + d, "html", c[d].params.content, a, 5);
                            return a.setData({
                                diy: a.data.diy
                            }), wx.setNavigationBarTitle({
                                title: a.data.diy.data.page.title
                            }), void wx.setNavigationBarColor({
                                frontColor: a.data.diy.data.page.navigationtextcolor,
                                backgroundColor: a.data.diy.data.page.navigationbackground
                            });
                        }
                        wx.redirectTo({
                            url: "../store/goods?sid=" + s.config.default_sid
                        });
                    }
                }
            });
        } else t.util.toast("获取位置失败,请重新进入小程序");
    },
    onGetStore: function(a) {
        var e = this;
        if (1 == e.data.is_use_diy && 0 == e.data.diy.is_has_allstore) return !1;
        if (a && (e.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 0
        }), 1 == e.data.store.loaded) return !1;
        if (1 == e.data.store.loading) return !1;
        e.setData({
            "store.loading": 1
        });
        var o = t.util.getStorageSync("location"), s = {
            lat: o.x,
            lng: o.y,
            condition: JSON.stringify(e.data.storeExtra.condition),
            page: e.data.store.page,
            psize: e.data.store.psize,
            forceLocation: 1
        };
        t.util.request({
            url: "wmall/home/index/store",
            data: s,
            success: function(t) {
                e.data.store.loading = 0;
                var a = t.data.message.message;
                e.data.store.data = e.data.store.data.concat(a.stores), a.pagetotal <= e.data.store.page && (e.data.store.loaded = 1, 
                e.data.store.data.length || (e.data.store.empty = 1)), e.data.store.page++, e.data.store.loaded || a.stores.length ? e.setData({
                    store: e.data.store
                }) : e.onGetStore();
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        e.data.options = a, t.util.setStorageSync("onloadHome", 1);
        var o = t.util.getStorageSync("location");
        o && o.x ? (e.setData({
            location: o
        }), e.onGetIndex()) : t.util.getLocation(function(a) {
            var o = a.data.message.message;
            e.setData({
                location: o
            }), o = {
                address: o.address,
                x: o.latitude,
                y: o.longitude
            }, t.util.setStorageSync("location", o, 600), e.onGetIndex();
        });
    },
    onReachBottom: function() {
        this.onGetStore();
    },
    onHide: function() {
        t.util.removeStorageSync("onloadHome");
    },
    onShow: function() {
        var a = this;
        if (1 == t.util.getStorageSync("location").onshow) return a.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 0
        }, a.onLoad(), !1;
        1 != t.util.getStorageSync("onloadHome") && t.util.request({
            url: "wmall/home/index/cart",
            showLoading: !1,
            success: function(t) {
                var e = t.data.message.message.cart_sum;
                a.setData({
                    cart_sum: e
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 0
        }, t.onLoad(), wx.stopPullDownRefresh();
    },
    onMultiple: function() {
        this.setData({
            "storeExtra.multiple": !this.data.storeExtra.multiple,
            topSearchBar: !this.data.topSearchBar
        });
    },
    onFilter: function() {
        this.setData({
            "storeExtra.filter": !this.data.storeExtra.filter,
            topSearchBar: !this.data.topSearchBar
        });
    },
    onOrderby: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        if ("order" == e) {
            var o = t.currentTarget.dataset.order;
            "svipRedpacket" == o ? a.setData({
                "storeExtra.condition.dis": o
            }) : (a.setData({
                "storeExtra.condition.order": o,
                "storeExtra.multiple": !1,
                showNodata: !1
            }), "sailed" != o && "distance" != o ? a.setData({
                "storeExtra.filter_title": t.currentTarget.dataset.title
            }) : a.setData({
                "storeExtra.filter_title": "综合排序"
            }));
        } else {
            if ("discounts" == e) {
                var s = t.currentTarget.dataset.dis;
                return a.data.storeExtra.condition.dis == s && (s = ""), a.setData({
                    "storeExtra.condition.dis": s
                }), !1;
            }
            if ("mode" == e) {
                var i = t.currentTarget.dataset.mode;
                return a.data.storeExtra.condition.mode == i && (i = ""), a.setData({
                    "storeExtra.condition.mode": i
                }), !1;
            }
            "clear" == e ? a.setData({
                "storeExtra.condition.dis": "",
                "storeExtra.condition.order": "",
                "storeExtra.condition.mode": "",
                "storeExtra.filter": !1,
                "storeExtra.filter_title": "综合排序"
            }) : "finish" == e && a.setData({
                "storeExtra.filter": !1,
                showNodata: !1
            });
        }
        a.onGetStore(!0);
    },
    onCloseRedpacket: function() {
        this.setData({
            "superRedpacket.is_show": !1
        });
    },
    onPageScroll: function(t) {
        var a = this;
        t.scrollTop > 200 ? a.setData({
            topSearchBar: !0
        }) : a.setData({
            topSearchBar: !1
        });
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
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});