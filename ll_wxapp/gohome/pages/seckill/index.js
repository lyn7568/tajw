var a = getApp();

Page({
    data: {
        records: {
            page: 1,
            psize: 15,
            empty: !1,
            loaded: !1,
            data: []
        },
        navs: [],
        failedTipsStatus: !1
    },
    onLoad: function() {
        this.onReachBottom();
    },
    onReachBottom: function() {
        var e = this;
        e.data.records.loaded || a.util.request({
            url: "seckill/goods/index",
            data: {
                page: e.data.records.page,
                psize: e.data.records.psize
            },
            success: function(t) {
                var s = t.data.message;
                if (s.errno) return 41200 == s.errno ? void e.setData({
                    failedTipsStatus: !0,
                    failedTips: {
                        type: "message",
                        tips: s.message,
                        btnText: "切换地址",
                        link: "/pages/home/location?from=seckill",
                        img: "http://cos.lalawaimai.com/we7_wmall/wxapp/store_no_con.png"
                    }
                }) : (a.util.toast(s.message), !1);
                s = s.message, e.data.records.data = e.data.records.data.concat(s.records), e.data.records.data.length || (e.data.records.empty = !0), 
                s.records && s.records.length < e.data.records.psize && (e.data.records.loaded = !0), 
                e.data.records.page++, e.setData({
                    records: e.data.records,
                    navs: s.navs
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