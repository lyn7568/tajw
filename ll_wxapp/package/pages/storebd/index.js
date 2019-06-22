var t = getApp();

Page({
    data: {},
    onLoad: function() {
        var e = this;
        t.util.request({
            url: "storebd/index/index",
            data: {},
            success: function(a) {
                var i = a.data.message;
                if (i.errno) return t.util.toast(i.message), !1;
                (i = i.message).config.setting_meta_title && wx.setNavigationBarTitle({
                    title: i.config.setting_meta_title
                }), e.setData(i);
            }
        });
    },
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    }
});