var a = getApp();

Page({
    data: {
        redPackets: [],
        showloading: !1,
        showNodata: !1
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onReady: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this;
        if (console.log(t), -1 == t.data.min) return !1;
        this.setData({
            showloading: !0
        });
        var e = {
            min: t.data.min,
            status: 2
        };
        a.util.request({
            url: "wmall/member/redPacket",
            data: e,
            success: function(a) {
                var e = t.data.redPackets.concat(a.data.message.message);
                if (!e.length) return t.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                t.setData({
                    redPackets: e,
                    min: a.data.message.min
                }), a.data.message.min || (t.data.min = -1), t.setData({
                    showloading: !1
                });
            }
        });
    },
    onShareAppMessage: function() {}
});