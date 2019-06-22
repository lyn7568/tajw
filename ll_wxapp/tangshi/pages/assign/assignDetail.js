var n = getApp();

Page({
    data: {},
    onLoad: function(s) {
        var t = this;
        t.data.sid = s.sid, n.util.request({
            url: "wmall/store/assign/mine",
            data: {
                sid: s.sid
            },
            success: function(s) {
                var a = s.data.message;
                0 == a.errno ? t.setData(a.message) : -1e3 == a.errno && n.util.toast(a.message, "redirect:/tangshi/pages/assign/assign?sid=" + t.data.sid, 1e3);
            }
        });
    },
    onJsEvent: function(s) {
        n.util.jsEvent(s);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad({
            sid: this.data.store.id
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});