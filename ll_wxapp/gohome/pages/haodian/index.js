var a = getApp();

Page({
    data: {
        address: "定位中。。。",
        topSearchBar: !1,
        shareData: {
            title: "",
            path: "/gohome/pages/haodian/index",
            success: function() {},
            fail: function() {}
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
        danmu: 1,
        dialog: {
            dialogGuide: !0
        },
        has_diy_guide: !1,
        showSearchSign: !1,
        getLocationStatus: !0
    },
    onLoad: function() {
        var t = this;
        a.util.request({
            url: "haodian/index/index",
            data: {
                psize: t.data.haodian.psize,
                orderby: t.data.haodianExtra.orderby,
                haodian_cid: t.data.haodianExtra.haodian_cid,
                haodian_child_id: t.data.haodianExtra.haodian_child_id,
                menufooter: 1,
                forceLocation: 1
            },
            success: function(d) {
                var i = d.data.message;
                if (i.errno) return -2 == i.errno ? (t.setData({
                    getLocationStatus: !1,
                    failedTips: {
                        tips: i.message,
                        link: "pages/home/location?from=haodian",
                        btnText: "手动搜索地址",
                        img: "http://cos.lalawaimai.com/we7_wmall/wxapp/store_no_con.png"
                    }
                }), !1) : (a.util.toast(i.message), !1);
                var o = d.data.global.share;
                o && (t.data.shareData.title = o.title, t.data.shareData.imageUrl = o.imgUrl), (i = i.message).diy.haodian && i.diy.haodian.category && (i.diy.haodianCategory = i.diy.haodian.category, 
                t.setData({
                    "haodianExtra.haodian_child_id": i.diy.haodian.haodian_child_id
                })), i.diy.haodian && i.diy.haodian.store && (t.data.haodian.data = i.diy.haodian.store, 
                t.data.haodian.loading = 0, i.diy.haodian.has_get_all && (t.data.haodian.loaded = 1), 
                0 == t.data.haodian.data.length && (t.data.haodian.empty = 1), delete i.diy.haodian, 
                i.diy.haodian = t.data.haodian);
                var e = {};
                i.diy.is_has_location && (e = a.util.getStorageSync("location")), i.location = e;
                var n = i.diy.data.items;
                for (var r in n) "richtext" == n[r].id && a.WxParse.wxParse("richtext." + r, "html", n[r].params.content, t, 5);
                t.data.richtext && (i.richtext = t.data.richtext), wx.setNavigationBarTitle({
                    title: i.diy.data.page.title
                }), wx.setNavigationBarColor({
                    frontColor: i.diy.data.page.navigationtextcolor,
                    backgroundColor: i.diy.data.page.navigationbackground
                }), setInterval(function() {
                    t.setData({
                        danmu: !t.data.danmu
                    });
                }, 2500);
                var h = i.diy.guide;
                h && (h && "everytime" == h.params.show_setting && a.util.getStorageSync("storage") && (t.setData({
                    has_diy_guide: !0
                }), a.util.setStorageSync("storage", {}, 0)), i.storage = a.util.getStorageSync("storage"), 
                !h || "interval" != h.params.show_setting || i.storage && i.storage.storageGuide || a.util.setStorageSync("storage", {
                    storageGuide: 1
                }, 60 * h.params.interval_time)), t.setData(i);
            }
        });
    },
    onPageScroll: function(a) {
        var t = this;
        a.scrollTop > 200 ? t.setData({
            topSearchBar: !0
        }) : t.setData({
            topSearchBar: !1
        });
    },
    onGetHaoDian: function(t) {
        var d = this;
        t && (d.data.haodian = {
            page: 1,
            psize: 10,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        }), d.data.haodian.loaded || a.util.request({
            url: "haodian/index/store",
            data: {
                page: d.data.haodian.page,
                psize: d.data.haodian.psize,
                orderby: d.data.haodianExtra.orderby,
                haodian_cid: d.data.haodianExtra.haodian_cid,
                haodian_child_id: d.data.haodianExtra.haodian_child_id
            },
            success: function(t) {
                var i = t.data.message;
                if (i.errno) return a.util.toast(i.message), !1;
                i = i.message, d.data.haodian.data = d.data.haodian.data.concat(i.store), i.store.length < d.data.haodian.psize && (d.data.haodian.loaded = !0, 
                d.data.haodian.data.length || (d.data.haodian.empty = !0)), d.data.haodian.page++, 
                d.setData({
                    "diy.haodian": d.data.haodian
                });
            }
        });
    },
    onChangeHaodianExtra: function(a) {
        var t = this, d = a.currentTarget.dataset.type;
        if ("filter" == d) t.setData({
            "popup.haodianSearch": !t.data.popup.haodianSearch
        }); else {
            if (d == t.data.haodianExtra.orderby) return;
            t.data.haodianExtra.orderby = d, t.data.haodianExtra.haodian_cid = 0, t.data.diy.haodianCategory && t.data.diy.haodianCategory.length > 0 && t.data.diy.haodianCategory[0].children.length > 0 && (t.data.haodianExtra.haodian_child_id = t.data.diy.haodianCategory[0].children[0].id), 
            t.data.haodianExtra.cIndexActive = 0, t.setData({
                haodianExtra: t.data.haodianExtra,
                showSearchSign: !1
            }), t.onGetHaoDian(!0);
        }
    },
    onClickHaodianParentCategory: function(a) {
        var t = this, d = a.detail.index;
        t.data.haodianExtra.cIndexActive = d, t.data.diy.haodianCategory.hasOwnProperty(d) && (t.data.haodianExtra.haodian_cid = t.data.diy.haodianCategory[d].id, 
        t.data.diy.haodianCategory[d].children.length > 0 && (t.data.haodianExtra.haodian_child_id = t.data.diy.haodianCategory[d].children[0].id)), 
        t.setData({
            haodianExtra: t.data.haodianExtra
        });
    },
    onClickHaodianChildCategory: function(a) {
        var t = this, d = a.detail;
        d && d.id && (t.data.haodianExtra.haodian_child_id = d.id, 0 == t.data.haodianExtra.haodian_cid && t.data.diy.haodianCategory && t.data.diy.haodianCategory.length > 0 && (t.data.haodianExtra.haodian_cid = t.data.diy.haodianCategory[0].id)), 
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
    onReachBottom: function() {
        this.onGetHaoDian();
    },
    onImgPreview: function(a) {
        var t = a.currentTarget.dataset.current, d = a.currentTarget.dataset.urls;
        wx.previewImage({
            current: t,
            urls: d
        });
    },
    onToggleInformationHeight: function(a) {
        var t = this, d = a.currentTarget.dataset.index;
        t.data.diy.tongcheng.data[d].showall = !t.data.diy.tongcheng.data[d].showall, t.setData({
            "diy.tongcheng.data": t.data.diy.tongcheng.data
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
    onPullDownRefresh: function() {
        var a = this;
        a.data.haodian = {
            page: 1,
            psize: 10,
            empty: !1,
            loaded: !1,
            data: []
        }, a.onLoad(), wx.stopPullDownRefresh();
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});