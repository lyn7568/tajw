var a = getApp();

Page({
    data: {
        cateid: 0,
        records: {
            page: 1,
            psize: 15,
            empty: !1,
            loaded: !1,
            data: []
        },
        navs: []
    },
    onLoad: function(a) {
        var t = this;
        a && a.cateid && (t.data.cateid = a.cateid), t.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        t.data.records.loaded || a.util.request({
            url: "kanjia/activity/index",
            data: {
                page: t.data.records.page,
                psize: t.data.records.psize,
                cateid: t.data.cateid
            },
            success: function(e) {
                var d = e.data.message;
                if (d.errno) return a.util.toast(d.message), !1;
                d = d.message, t.data.records.data = t.data.records.data.concat(d.records), t.data.records.data.length || (t.data.records.empty = !0), 
                d.records && d.records.length < t.data.records.psize && (t.data.records.loaded = !0), 
                t.data.records.page++, t.setData({
                    records: t.data.records
                }), wx.setNavigationBarTitle({
                    title: d.category.title
                });
            }
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.records = {
            page: 1,
            psize: 15,
            empty: !1,
            loaded: !1,
            data: []
        }, a.onReachBottom(), wx.stopPullDownRefresh();
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    }
});