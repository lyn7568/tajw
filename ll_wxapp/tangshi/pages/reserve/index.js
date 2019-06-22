var t = getApp();

Page({
    data: {
        extra: {
            dayIndex: 0
        }
    },
    onLoad: function(a) {
        var e = this;
        e.data.sid = a.sid || 3;
        var n = {
            sid: e.data.sid
        };
        t.util.request({
            url: "wmall/store/reserve/index",
            data: n,
            success: function(a) {
                if (0 != (a = a.data.message).errno) return t.util.toast(a.message), !1;
                e.setData(a.message);
            }
        });
        var d = wx.getSystemInfoSync().windowWidth;
        e.setData({
            window_Width: d
        });
    },
    onSelectDay: function(t) {
        var a = this, e = t.currentTarget.dataset.value, n = t.currentTarget.dataset.index, d = 33.333333333 * a.data.window_Width / 100;
        if (n >= 1 && n <= 4) var r = (n - 1) * d;
        a.setData({
            "extra.day": a.data.year + "-" + e,
            "extra.dayIndex": n,
            scroll_left: r
        });
    },
    onSelectTime: function(a) {
        var e = this, n = a.currentTarget.dataset.time, d = a.currentTarget.dataset.cid;
        e.setData({
            "extra.time": n,
            "extra.cid": d
        }), e.data.extra.day || (e.data.extra.day = e.data.year + "-" + e.data.days[e.data.extra.dayIndex].day), 
        t.util.setStorageSync("reserve.extra", e.data.extra), wx.navigateTo({
            url: "./create?sid=" + e.data.sid
        });
    },
    onSelectOutTime: function() {
        t.util.toast("该时间不能预定点餐");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});