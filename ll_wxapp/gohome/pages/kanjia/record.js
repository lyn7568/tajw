var a = getApp();

Page({
    data: {
        records: {
            page: 1,
            psize: 15,
            empty: !1,
            loaded: !1,
            data: []
        }
    },
    onLoad: function() {
        this.onReachBottom();
    },
    onReachBottom: function() {
        var e = this;
        e.data.records.loaded || a.util.request({
            url: "kanjia/record/index",
            data: {
                page: e.data.records.page,
                psize: e.data.records.psize,
                status: 1
            },
            success: function(t) {
                var r = t.data.message;
                if (r.errno) return a.util.toast(r.message), !1;
                r = r.message, e.data.records.data = e.data.records.data.concat(r.records), e.data.records.data.length || (e.data.records.empty = !0), 
                r.records && r.records.length < e.data.records.psize && (e.data.records.loaded = !0), 
                e.data.records.page++, e.setData({
                    records: e.data.records
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
    onJsEvent: function(e) {
        a.util.jsEvent(e);
    }
});