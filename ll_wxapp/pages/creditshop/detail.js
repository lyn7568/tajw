var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../static/js/utils/qrcode.js")), t = getApp();

Page({
    data: {},
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    },
    onLoad: function(e) {
        var n = this;
        t.util.request({
            url: "creditshop/order/detail",
            data: {
                order_id: e.id
            },
            success: function(e) {
                var e = e.data.message.message;
                n.setData({
                    order: e
                }, function() {
                    n.newQrcode(n.data.order.qrcode);
                });
            }
        });
    },
    newQrcode: function(t) {
        new e.default("canvas", {
            text: t,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: e.default.correctLevel.H
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