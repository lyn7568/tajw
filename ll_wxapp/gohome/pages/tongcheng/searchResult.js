var a = getApp();

Page({
    data: {
        records: {
            page: 1,
            psize: 10,
            empty: !1,
            loaded: !1,
            data: []
        }
    },
    onLoad: function(a) {
        this.data.options = a, this.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        t.data.records.loaded || a.util.request({
            url: "tongcheng/index/search",
            data: {
                keyword: t.data.options.keyword,
                page: t.data.records.page,
                psize: t.data.records.psize
            },
            success: function(e) {
                var d = e.data.message;
                if (d.errno) return a.util.toast(d.message), !1;
                d = d.message, t.data.records.data = t.data.records.data.concat(d.informations), 
                d.informations.length < t.data.records.psize && (t.data.records.loaded = !0, t.data.records.data.length || (t.data.records.empty = !0)), 
                t.data.records.page++, t.setData({
                    records: t.data.records
                });
            }
        });
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    }
});