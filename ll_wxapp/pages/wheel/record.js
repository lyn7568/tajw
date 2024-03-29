var a = getApp();

Page({
    data: {
        refresh: 0,
        status: -1,
        record: {
            page: 1,
            psize: 5,
            loaded: !1,
            loading: !1,
            list: []
        }
    },
    onLoad: function() {
        var t = this;
        return !t.data.record.loading && (1 == t.data.refresh && (t.data.record = {
            page: 1,
            psize: 5,
            loaded: !1,
            loading: !1,
            list: []
        }), !t.data.record.loaded && (t.data.record.loading = !0, t.setData({
            loading: !0
        }), void a.util.request({
            url: "wheel/activity/record",
            data: {
                status: t.data.status,
                page: t.data.record.page,
                psize: t.data.record.psize
            },
            success: function(e) {
                var r = e.data.message;
                if (r.errno) return a.util.toast(r.message), !1;
                t.data.record.loading = !1, t.data.record.list = t.data.record.list.concat(r.message.records), 
                r.message.records.length < t.data.record.psize && (t.data.record.loaded = !0), t.data.record.page++, 
                t.setData(t.data.record), t.data.refresh = 0;
            }
        })));
    },
    onGetPrize: function(t) {
        var e = this, r = t.target.dataset.id;
        a.util.request({
            url: "wheel/activity/status",
            data: {
                id: r
            },
            showLoading: !1,
            success: function(t) {
                var r = t.data.message;
                if (a.util.toast(r.message), r.errno) return !1;
                e.data.refresh = 1, e.onLoad();
            }
        });
    },
    onChangeStatus: function(a) {
        var t = this, e = a.target.dataset.status;
        t.data.status != e && (t.data.refresh = 1), t.setData({
            status: e
        }), t.onLoad();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.onLoad();
    },
    onShareAppMessage: function() {}
});