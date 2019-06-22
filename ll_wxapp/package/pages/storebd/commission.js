var t = getApp();

Page({
    data: {},
    onLoad: function() {
        var s = this;
        t.util.request({
            url: "storebd/index/commission",
            data: {},
            success: function(e) {
                var a = e.data.message;
                if (a.errno) return t.util.toast(a.message), !1;
                a = a.message, s.setData(a);
            }
        });
    },
    onJsEvent: function(s) {
        t.util.jsEvent(s);
    }
});