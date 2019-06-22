var a = getApp();

Page({
    data: {
        down: [],
        showloading: !1,
        showNodata: !1,
        status: "spread1",
        spreadid: "spread1"
    },
    onLoad: function(a) {
        this.onReachBottom();
    },
    onSubmit: function(a) {
        var e = this, t = a.currentTarget.dataset.spreadid;
        e.setData({
            spreadid: t,
            status: t,
            click: 1
        }), e.onReachBottom();
    },
    onReachBottom: function() {
        var e = this;
        if (1 == e.data.click) e.setData({
            down: [],
            click: 0,
            min: 0
        }); else if (-1 == e.data.min) return !1;
        e.setData({
            showloading: !0
        });
        var t = {
            min: e.data.min,
            spreadid: e.data.spreadid
        };
        a.util.request({
            url: "spread/down/index",
            data: t,
            success: function(a) {
                var t = a.data.message.message, s = e.data.down.concat(t.members);
                if (!s.length) return e.setData({
                    showNodata: !0,
                    showloading: !1,
                    level1: t.level1,
                    level2: t.level2
                }), !1;
                e.setData({
                    level1: t.level1,
                    level2: t.level2,
                    down: s,
                    min: a.data.message.min
                }), a.data.message.min || (e.data.min = -1), e.setData({
                    showloading: !1,
                    showNodata: !1
                });
            }
        });
    }
});