var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../static/js/utils/qrcode.js")), t = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(e) {
        var t = this;
        e && e.id && (t.data.id = e.id), t.onReachBottom();
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
    onReachBottom: function() {
        var e = this;
        t.util.request({
            url: "gohome/order/detail",
            data: {
                id: e.data.id
            },
            success: function(o) {
                var r = o.data.message;
                if (r.errno) return t.util.toast(r.message), !1;
                r = r.message, e.newQrcode(r.qrcode), e.setData({
                    order: r.order
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.onReachBottom(), wx.stopPullDownRefresh();
    },
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    }
});