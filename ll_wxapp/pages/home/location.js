var a = getApp();

Page({
    data: {
        showSearch: !1
    },
    onLoad: function(e) {
        var o = this;
        e.from && (o.data.from = e.from), a.util.getLocation(function(a) {
            var e = a.data.message.message;
            o.setData({
                location: e.address,
                location_x: e.location_x,
                location_y: e.location_y,
                pois: e.pois.slice(0, 10)
            });
        }), a.util.request({
            url: "wmall/home/location/index",
            success: function(a) {
                var a = a.data.message.message;
                o.setData({
                    addresses: a
                });
            }
        });
    },
    onInput: function(e) {
        var o = this, t = e.detail.value;
        if (!t) return o.setData({
            showSearch: !1
        }), !1;
        a.util.request({
            url: "system/common/map/suggestion",
            data: {
                key: t
            },
            success: function(a) {
                var e = a.data.message.message;
                e.length > 0 && o.setData({
                    searchAddress: e,
                    showSearch: !0
                });
            }
        });
    },
    onChooseAddress: function(e) {
        var o = this, t = e.currentTarget.dataset;
        if (!t.x || !t.y) return a.util.toast("该地址无效"), !1;
        t.onshow = 1, a.util.setStorageSync("location", t, 300);
        var s = "./index";
        "paotui" == o.data.from ? s = "../paotui/guide" : "gohome" == o.data.from ? s = "/gohome/pages/home/index" : "tongcheng" == o.data.from ? s = "/gohome/pages/tongcheng/index" : "haodian" == o.data.from ? s = "/gohome/pages/haodian/index" : "kanjia" == o.data.from ? s = "/gohome/pages/kanjia/index" : "seckill" == o.data.from ? s = "/gohome/pages/seckill/index" : "pintuan" == o.data.from && (s = "/gohome/pages/pintuan/index"), 
        wx.switchTab({
            url: s,
            fail: function(a) {
                "switchTab:fail can not switch to no-tabBar page" != a.errMsg && "switchTab:fail:can not switch to non-TabBar page" != a.errMsg || wx.redirectTo({
                    url: s
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    }
});