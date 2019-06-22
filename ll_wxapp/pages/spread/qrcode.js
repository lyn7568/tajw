Page({
    data: {
        showloading: !1
    },
    onLoad: function() {
        var a = this;
        app.util.request({
            url: "spread/poster/qrcode",
            success: function(e) {
                if (e.data.message.errno) return app.util.toast(e.data.message.message), !1;
                a.setData(e.data.message);
            }
        });
    },
    onJsEvent: function(a) {
        app.util.jsEvent(a);
    },
    onShareAppMessage: function() {}
});