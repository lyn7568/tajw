var a = getApp();

Page({
    data: {
        coupons: [],
        showloading: !1,
        showNodata: !1,
        shareData: {
            title: "领券中心",
            path: "/pages/channel/coupon",
            success: function() {},
            fail: function() {}
        }
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
            url: "wmall/channel/coupon/list",
            data: {
                min: t.data.min
            },
            success: function(a) {
                var n = t.data.coupons.concat(a.data.message.message);
                if (!n.length) return t.setData({
                    showNodata: !0,
                    showloading: !1
                }), !1;
                t.setData({
                    coupons: n,
                    min: a.data.message.min
                }), a.data.message.min || (t.data.min = -1), t.setData({
                    showloading: !1
                });
            }
        });
    },
    getCoupon: function(t) {
        var n = this, s = n.data.coupons, o = t.currentTarget.dataset.sid, e = t.currentTarget.dataset.id;
        a.util.request({
            url: "wmall/channel/coupon/get",
            data: {
                sid: o
            },
            success: function(a) {
                wx.showToast({
                    title: "领取成功",
                    icon: "success"
                }), s[e].get = !s[e].get, n.setData({
                    coupons: s
                });
            }
        });
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    },
    onPullDownRefresh: function() {
        var a = this;
        a.data.min = 0, a.data.coupons = [], a.onReachBottom(), wx.stopPullDownRefresh();
    }
});