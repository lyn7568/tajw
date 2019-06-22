var t = getApp();

Page({
    data: {
        markers: []
    },
    onLoad: function(e) {
        var a = this;
        a.data.id = e.id, t.util.request({
            url: "errander/order/location",
            data: {
                id: a.data.id
            },
            success: function(e) {
                var n = e.data.message;
                return n.errno ? (t.util.toast(n.message), !1) : 3 == n.message.order.status ? (t.util.toast("订单已完成!"), 
                !1) : (a.setData(n.message), void setInterval(function() {
                    a.onRefresh();
                }, 3e4));
            }
        });
    },
    onRefresh: function() {
        var e = this;
        t.util.request({
            url: "system/common/deliveryer/location",
            data: {
                id: e.data.order.deliveryer_id
            },
            success: function(a) {
                var n = a.data.message;
                if (n.errno) return t.util.toast(n.message), !1;
                var o = {
                    latitude: n.message.location_x,
                    longitude: n.message.location_y
                };
                e.data.points[0] = o, e.data.markers[0].latitude = o.latitude, e.data.markers[0].longitude = o.longitude, 
                e.setData({
                    markers: e.data.markers,
                    points: e.data.points
                });
            }
        });
    },
    onQuestion: function() {
        wx.showModal({
            content: "要获取最新位置，请点击刷新按钮；如果配送员远离您，那可能是正在为更早下单的用户配送，请耐心等待~",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});