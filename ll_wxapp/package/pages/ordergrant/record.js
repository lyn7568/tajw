var a = getApp();

Page({
    data: {
        records: [],
        min: 0,
        showNodata: !1
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onReachBottom: function() {
        var n = this;
        if (-1 == n.data.min) return !1;
        console.log("++++++++++"), a.util.request({
            url: "ordergrant/record",
            data: {
                min: n.data.min
            },
            success: function(a) {
                var o = a.data.message.min;
                console.log(a.data.message.message);
                var t = n.data.records.concat(a.data.message.message);
                if (!t.length) return n.setData({
                    showNodata: !0
                }), !1;
                n.setData({
                    records: t,
                    min: o
                }), a.data.message.min || (n.data.min = -1);
            }
        });
    },
    onPullDownRefresh: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});