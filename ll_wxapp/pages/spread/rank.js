var a = getApp();

Page({
    data: {
        list: [],
        showLoading: !1,
        showNodata: !1
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onReachBottom: function() {
        var t = this;
        if (-1 == t.data.min) return !1;
        this.setData({
            showloading: !0
        }), a.util.request({
            url: "spread/rank",
            data: {
                min: t.data.min
            },
            success: function(a) {
                var e = a.data.message.message;
                t.setData({
                    rank: e.rank,
                    member: e.member,
                    count: e.count,
                    final_fee: e.final_fee,
                    count_final_fee: e.count_final_fee
                });
                var n = t.data.list.concat(e.list);
                if (!n.length) return t.setData({
                    showLoading: !1,
                    showNodata: !0
                }), !1;
                t.setData({
                    list: n,
                    min: a.data.message.min
                }), a.data.message.min || (t.data.min = -1), t.setData({
                    showLoading: !1
                }), console.log(t.data);
            }
        });
    }
});