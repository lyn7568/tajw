var t = getApp();

Page({
    data: {
        goods_id: 0,
        type: ""
    },
    onLoad: function(e) {
        var a = this;
        e && e.goods_id && e.type && (a.data.goods_id = e.goods_id, a.data.type = e.type), 
        t.util.request({
            url: "gohome/poster/index",
            data: {
                goods_id: a.data.goods_id,
                type: a.data.type
            },
            success: function(e) {
                var s = e.data.message;
                if (s.errno) return t.util.toast(s.message), !1;
                a.setData(s.message);
            }
        });
    },
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    }
});