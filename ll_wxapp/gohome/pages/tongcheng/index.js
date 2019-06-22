var t = getApp();

Page({
    data: {
        is_use_diy: 1,
        address: "定位中。。。",
        topSearchBar: !1,
        shareData: {
            title: "",
            path: "/gohome/pages/tongcheng/index",
            success: function() {},
            fail: function() {}
        },
        tongcheng: {
            page: 2,
            psize: 10,
            loaded: 0,
            empty: 0,
            data: [],
            loading: 1
        },
        danmu: 1,
        dialog: {
            dialogGuide: !0
        },
        has_diy_guide: !1,
        getLocationStatus: !0
    },
    onLoad: function() {
        var a = this;
        t.util.request({
            url: "tongcheng/index/index",
            data: {
                menufooter: 1,
                forceLocation: 1
            },
            success: function(e) {
                var n = e.data.message;
                if (n.errno) return -2 == n.errno ? (a.setData({
                    getLocationStatus: !1,
                    failedTips: {
                        tips: n.message,
                        link: "pages/home/location?from=gohome",
                        btnText: "手动搜索地址",
                        img: "http://cos.lalawaimai.com/we7_wmall/wxapp/store_no_con.png"
                    }
                }), !1) : (t.util.toast(n.message), !1);
                var o = e.data.global.share;
                o && (a.data.shareData.title = o.title, a.data.shareData.imageUrl = o.imgUrl), (n = n.message).diy.tongcheng && n.diy.tongcheng.informationdata && (a.data.tongcheng.data = n.diy.tongcheng.informationdata, 
                a.data.tongcheng.loading = 0, n.diy.tongcheng.has_get_all && (a.data.tongcheng.loaded = 1), 
                0 == a.data.tongcheng.data.length && (a.data.tongcheng.empty = 1), a.data.tongcheng.page++, 
                delete n.diy.tongcheng, n.diy.tongcheng = a.data.tongcheng);
                var i = {};
                n.diy.is_has_location && (i = t.util.getStorageSync("location")), n.location = i;
                var g = n.diy.data.items;
                for (var s in g) "richtext" == g[s].id && t.WxParse.wxParse("richtext." + s, "html", g[s].params.content, a, 5);
                a.data.richtext && (n.richtext = a.data.richtext), wx.setNavigationBarTitle({
                    title: n.diy.data.page.title
                }), wx.setNavigationBarColor({
                    frontColor: n.diy.data.page.navigationtextcolor,
                    backgroundColor: n.diy.data.page.navigationbackground
                }), setInterval(function() {
                    a.setData({
                        danmu: !a.data.danmu
                    });
                }, 2500);
                var d = n.diy.guide;
                d && (d && "everytime" == d.params.show_setting && t.util.getStorageSync("storage") && (a.setData({
                    has_diy_guide: !0
                }), t.util.setStorageSync("storage", {}, 0)), n.storage = t.util.getStorageSync("storage"), 
                !d || "interval" != d.params.show_setting || n.storage && n.storage.storageGuide || t.util.setStorageSync("storage", {
                    storageGuide: 1
                }, 60 * d.params.interval_time)), a.setData(n);
            }
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
    onGetInformation: function() {
        var a = this;
        a.data.tongcheng.loaded || t.util.request({
            url: "tongcheng/index/information",
            data: {
                page: a.data.tongcheng.page,
                psize: a.data.tongcheng.psize
            },
            success: function(e) {
                var n = e.data.message;
                if (n.errno) return t.util.toast(n.message), !1;
                n = n.message, a.data.tongcheng.data = a.data.tongcheng.data.concat(n.informations), 
                n.informations.length < a.data.tongcheng.psize && (a.data.tongcheng.loaded = !0, 
                a.data.tongcheng.data.length || (a.data.tongcheng.empty = !0)), a.data.tongcheng.page++, 
                a.setData({
                    "diy.tongcheng": a.data.tongcheng
                });
            }
        });
    },
    onReachBottom: function() {
        this.onGetInformation();
    },
    onImgPreview: function(t) {
        var a = t.currentTarget.dataset.current, e = t.currentTarget.dataset.urls;
        wx.previewImage({
            current: a,
            urls: e
        });
    },
    onToggleInformationHeight: function(t) {
        var a = this, e = t.currentTarget.dataset.index;
        a.data.diy.tongcheng.data[e].showall = !a.data.diy.tongcheng.data[e].showall, a.setData({
            "diy.tongcheng.data": a.data.diy.tongcheng.data
        });
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
    onPullDownRefresh: function() {
        var t = this;
        t.data.tongcheng = {
            page: 1,
            psize: 10,
            empty: !1,
            loaded: !1,
            data: []
        }, t.onLoad(), wx.stopPullDownRefresh();
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});