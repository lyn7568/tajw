var a = getApp();

Page({
    data: {
        orders: {
            page: 1,
            psize: 15,
            loaded: !1,
            empty: !1,
            data: []
        }
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.orders = {
            page: 1,
            psize: 15,
            loaded: 0,
            empty: 0,
            data: []
        }, a.onReachBottom(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var e = this;
        if (e.data.orders.loaded) return !1;
        a.util.request({
            url: "mealRedpacket/meal/mealorder",
            data: {
                page: e.data.orders.page,
                psize: e.data.orders.psize
            },
            success: function(t) {
                var r = t.data.message;
                if (r.errno) return a.util.toast(r.message), !1;
                var d = r.message.orders;
                e.data.orders.data = e.data.orders.data.concat(d), d.length < e.data.orders.psize && (e.data.orders.loaded = !0), 
                0 == e.data.orders.data.length && (e.data.orders.empty = !0), e.data.orders.page++, 
                e.setData({
                    orders: e.data.orders
                });
            }
        });
    },
    onJsEvent: function(e) {
        a.util.jsEvent(e);
    }
});