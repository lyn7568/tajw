var a = getApp();

Page({
    data: {
        store: {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: []
        },
        storeExtra: {
            condition: {
                order: "",
                mode: "",
                dis: ""
            },
            filter_title: "综合排序",
            multiple: !1,
            filter: !1,
            activityShowAll: !1
        },
        tongcheng: {
            page: 2,
            psize: 10,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        },
        haodian: {
            page: 2,
            psize: 10,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        },
        haodianExtra: {
            orderby: "distance",
            haodian_cid: 0,
            haodian_child_id: 0,
            cIndexActive: 0
        },
        popup: {
            haodianSearch: !1
        },
        dialog: {
            dialogGuide: !0
        },
        danmu: 1,
        showSearchSign: !1
    },
    onLoad: function(t) {
        var e = this;
        if (t && t.scene) {
            var d = decodeURIComponent(t.scene);
            d = d.split(":"), t.id = d[1];
        }
        e.data.options = t, a.util.request({
            url: "wxapp/diy",
            data: {
                id: t.id || 62
            },
            success: function(t) {
                var d = t.data.message;
                if (d.errno) return a.util.toast(d.message), !1;
                if (d.message.config_wxapp && d.message.config_wxapp.basic && 1 == d.message.config_wxapp.basic.audit_status) return wx.redirectTo({
                    url: "../store/goods?sid=" + d.message.config_wxapp.basic.default_sid
                }), !1;
                var i = d.message.diy.data.items;
                for (var o in i) "richtext" == i[o].id && a.WxParse.wxParse("richtext." + o, "html", i[o].params.content, e, 5);
                e.data.richtext && (d.message.richtext = e.data.richtext), setInterval(function() {
                    e.setData({
                        danmu: !e.data.danmu
                    });
                }, 2500);
                var n = d.message.diy.guide;
                if (n) {
                    n && "everytime" == n.params.show_setting && a.util.getStorageSync("storage") && a.util.setStorageSync("storage", {}, 0);
                    var s = a.util.getStorageSync("storage");
                    !n || "interval" != n.params.show_setting || s && s.storageGuide || a.util.setStorageSync("storage", {
                        storageGuide: 1
                    }, 60 * n.params.interval_time), e.setData({
                        storage: s
                    });
                }
                if (d.message.diy.tongcheng && d.message.diy.tongcheng.informationdata && (e.data.tongcheng.data = d.message.diy.tongcheng.informationdata, 
                e.data.tongcheng.loading = 0, d.message.diy.tongcheng.has_get_all && (e.data.tongcheng.loaded = 1), 
                0 == e.data.tongcheng.data.length && (e.data.tongcheng.empty = 1), delete d.message.diy.tongcheng, 
                d.message.diy.tongcheng = e.data.tongcheng), d.message.diy.haodian && (d.message.diy.haodianCategory = d.message.diy.haodian.category, 
                e.setData({
                    "haodianExtra.haodian_child_id": d.message.diy.haodian.haodian_child_id
                }), e.data.haodian.data = d.message.diy.haodian.store, e.data.haodian.loading = 0, 
                d.message.diy.haodian.has_get_all && (e.data.haodian.loaded = 1), 0 == e.data.haodian.data.length && (e.data.haodian.empty = 1), 
                delete d.message.diy.haodian, d.message.diy.haodian = e.data.haodian), e.setData(d.message), 
                1 == e.data.diy.is_has_location || 1 == e.data.diy.is_has_allstore) {
                    var r = a.util.getStorageSync("location");
                    r && r.x ? (e.setData({
                        location: r
                    }), e.onGetStore()) : a.util.getLocation(function(t) {
                        var d = t.data.message.message;
                        return e.setData({
                            location: d
                        }), d = {
                            address: d.address,
                            x: d.latitude,
                            y: d.longitude
                        }, a.util.setStorageSync("location", d, 600), e.onGetStore(), !1;
                    });
                }
                1 == e.data.diy.is_show_redpacket && a.util.request({
                    url: "superRedpacket/index",
                    showLoading: !1,
                    success: function(a) {
                        var t = a.data.message.message.page, d = a.data.message.message.redpackets;
                        a.data.message && 0 == a.data.message.errno && e.setData({
                            superRedpacket: !0,
                            page: t,
                            redpackets: d
                        });
                    }
                }), wx.setNavigationBarTitle({
                    title: e.data.diy.data.page.title
                }), wx.setNavigationBarColor({
                    frontColor: e.data.diy.data.page.navigationtextcolor,
                    backgroundColor: e.data.diy.data.page.navigationbackground
                });
            }
        });
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onGetStore: function(t) {
        var e = this;
        if (0 == e.data.diy.is_has_allstore) return !1;
        if (t && (e.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: []
        }), 1 == e.data.store.loaded) return !1;
        var d = a.util.getStorageSync("location"), i = {
            lat: d.x,
            lng: d.y,
            condition: JSON.stringify(e.data.storeExtra.condition),
            page: e.data.store.page,
            psize: e.data.store.psize,
            forceLocation: 1
        };
        a.util.request({
            url: "wxapp/diy/store",
            data: i,
            success: function(a) {
                var t = a.data.message.message;
                e.data.store.data = e.data.store.data.concat(t.stores), t.pagetotal <= e.data.store.page && (e.data.store.loaded = 1, 
                e.data.store.data.length || (e.data.store.empty = 1)), e.data.store.page++, e.setData({
                    store: e.data.store
                });
            }
        });
    },
    onToggleDiscount: function(a) {
        var t = a.currentTarget.dataset;
        "waimai_stores" == t.type ? (this.data.diy.data.items[t.diyindex].data[t.index].activity.is_show_all = !this.data.diy.data.items[t.diyindex].data[t.index].activity.is_show_all, 
        this.setData({
            "diy.data.items": this.data.diy.data.items
        })) : (this.data.store.data[t.index].activity.is_show_all = !this.data.store.data[t.index].activity.is_show_all, 
        this.setData({
            "store.data": this.data.store.data
        }));
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
    onOrderby: function(a) {
        var t = this, e = a.currentTarget.dataset.type;
        if ("order" == e) {
            var d = a.currentTarget.dataset.order;
            "svipRedpacket" == d ? t.setData({
                "storeExtra.condition.dis": d
            }) : (t.setData({
                "storeExtra.condition.order": d,
                "storeExtra.multiple": !1,
                showNodata: !1
            }), "sailed" != d && "distance" != d ? t.setData({
                "storeExtra.filter_title": a.currentTarget.dataset.title
            }) : t.setData({
                "storeExtra.filter_title": "综合排序"
            }));
        } else {
            if ("discounts" == e) {
                var i = a.currentTarget.dataset.dis;
                return t.data.storeExtra.condition.dis == i && (i = ""), t.setData({
                    "storeExtra.condition.dis": i
                }), !1;
            }
            if ("mode" == e) {
                var o = a.currentTarget.dataset.mode;
                return t.data.storeExtra.condition.mode == o && (o = ""), t.setData({
                    "storeExtra.condition.mode": o
                }), !1;
            }
            "clear" == e ? t.setData({
                "storeExtra.condition.dis": "",
                "storeExtra.condition.order": "",
                "storeExtra.condition.mode": "",
                "storeExtra.filter": !1
            }) : "finish" == e && t.setData({
                "storeExtra.filter": !1,
                showNodata: !1
            });
        }
        t.onGetStore(!0);
    },
    onCloseRedpacket: function() {
        this.setData({
            superRedpacket: !1
        });
    },
    onGetInformation: function() {
        var t = this;
        t.data.tongcheng.loaded || a.util.request({
            url: "gohome/home/information",
            data: {
                page: t.data.tongcheng.page,
                psize: t.data.tongcheng.psize
            },
            success: function(e) {
                var d = e.data.message;
                if (d.errno) return a.util.toast(d.message), !1;
                d = d.message, t.data.tongcheng.data = t.data.tongcheng.data.concat(d.informations), 
                d.informations.length < t.data.tongcheng.psize && (t.data.tongcheng.loaded = !0, 
                t.data.tongcheng.data.length || (t.data.tongcheng.empty = !0)), t.data.tongcheng.page++, 
                t.setData({
                    "diy.tongcheng": t.data.tongcheng
                });
            }
        });
    },
    onImgPreview: function(a) {
        var t = a.currentTarget.dataset.current, e = a.currentTarget.dataset.urls;
        wx.previewImage({
            current: t,
            urls: e
        });
    },
    onToggleInformationHeight: function(a) {
        var t = this, e = a.currentTarget.dataset.index;
        t.data.diy.tongcheng.data[e].showall = !t.data.diy.tongcheng.data[e].showall, t.setData({
            "diy.tongcheng.data": t.data.diy.tongcheng.data
        });
    },
    onGetHaoDian: function(t) {
        var e = this;
        t && (e.data.haodian = {
            page: 1,
            psize: 10,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        }), e.data.haodian.loaded || a.util.request({
            url: "haodian/index/store",
            data: {
                page: e.data.haodian.page,
                psize: e.data.haodian.psize,
                orderby: e.data.haodianExtra.orderby,
                haodian_cid: e.data.haodianExtra.haodian_cid,
                haodian_child_id: e.data.haodianExtra.haodian_child_id
            },
            success: function(t) {
                var d = t.data.message;
                if (d.errno) return a.util.toast(d.message), !1;
                d = d.message, e.data.haodian.data = e.data.haodian.data.concat(d.store), d.store.length < e.data.haodian.psize && (e.data.haodian.loaded = !0, 
                e.data.haodian.data.length || (e.data.haodian.empty = !0)), e.data.haodian.page++, 
                e.setData({
                    "diy.haodian": e.data.haodian
                });
            }
        });
    },
    onChangeHaodianExtra: function(a) {
        var t = this, e = a.currentTarget.dataset.type;
        if ("filter" == e) t.setData({
            "popup.haodianSearch": !t.data.popup.haodianSearch
        }); else {
            if (e == t.data.haodianExtra.orderby) return;
            t.data.haodianExtra.orderby = e, t.data.haodianExtra.haodian_cid = 0, t.data.diy.haodianCategory && t.data.diy.haodianCategory.length > 0 && t.data.diy.haodianCategory[0].children.length > 0 && (t.data.haodianExtra.haodian_child_id = t.data.diy.haodianCategory[0].children[0].id), 
            t.data.haodianExtra.cIndexActive = 0, t.setData({
                haodianExtra: t.data.haodianExtra,
                showSearchSign: !1
            }), t.onGetHaoDian(!0);
        }
    },
    onClickHaodianParentCategory: function(a) {
        var t = this, e = a.detail.index;
        t.data.haodianExtra.cIndexActive = e, t.data.diy.haodianCategory.hasOwnProperty(e) && (t.data.haodianExtra.haodian_cid = t.data.diy.haodianCategory[e].id, 
        t.data.diy.haodianCategory[e].children.length > 0 && (t.data.haodianExtra.haodian_child_id = t.data.diy.haodianCategory[e].children[0].id)), 
        t.setData({
            haodianExtra: t.data.haodianExtra
        });
    },
    onClickHaodianChildCategory: function(a) {
        var t = this, e = a.detail;
        e && e.id && (t.data.haodianExtra.haodian_child_id = e.id, 0 == t.data.haodianExtra.haodian_cid && t.data.diy.haodianCategory && t.data.diy.haodianCategory.length > 0 && (t.data.haodianExtra.haodian_cid = t.data.diy.haodianCategory[0].id)), 
        t.setData({
            haodianExtra: t.data.haodianExtra
        });
    },
    onHaodianCategoryConfirm: function() {
        var a = this;
        a.data.haodianExtra.haodian_child_id > 0 && 0 == a.data.haodianExtra.haodian_cid && a.data.diy.haodianCategory && a.data.diy.haodianCategory.length > 0 && (a.data.haodianExtra.haodian_cid = a.data.diy.haodianCategory[0].id), 
        a.setData({
            "popup.haodianSearch": !1,
            showSearchSign: !0
        }), a.onGetHaoDian(!0);
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.data.diy && 1 == t.data.diy.is_show_cart && a.util.request({
            url: "wmall/home/index/cart",
            showLoading: !1,
            success: function(a) {
                var e = a.data.message.message.cart_sum;
                t.setData({
                    cart_sum: e
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        this.data.diy.tongcheng ? a.data.tongcheng = {
            page: 1,
            psize: 10,
            empty: !1,
            loaded: !1,
            data: []
        } : this.data.diy.haodian ? (a.data.haodian = {
            page: 1,
            psize: 10,
            empty: !1,
            loaded: !1,
            data: []
        }, a.data.haodianExtra = {
            orderby: "distance",
            haodian_cid: 0,
            haodian_child_id: 0,
            cIndexActive: 0
        }, a.data.popup.haodianSearch = !1, a.data.showSearchSign = !1) : (a.data.store = {
            page: 1,
            psize: 20,
            loaded: 0,
            empty: 0,
            data: []
        }, a.data.storeExtra = {
            condition: {
                order: "",
                mode: "",
                dis: ""
            },
            filter_title: "综合排序",
            multiple: !1,
            filter: !1,
            activityShowAll: !1
        }), a.onLoad(a.data.options), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.diy.tongcheng ? this.onGetInformation() : this.data.diy.haodian ? this.onGetHaoDian() : this.onGetStore();
    },
    onPageScroll: function(a) {
        var t = this;
        a.scrollTop > 200 ? t.setData({
            topSearchBar: !0
        }) : t.setData({
            topSearchBar: !1
        });
    },
    onShareAppMessage: function() {}
});