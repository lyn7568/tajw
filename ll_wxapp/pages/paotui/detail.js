var a = getApp();

Page({
    data: {
        showStatus: !1
    },
    onLoad: function(e) {
        var s = this;
        a.util.request({
            url: "errander/order/detail",
            data: {
                id: e.id
            },
            success: function(a) {
                s.setData({
                    order: a.data.message.message.order,
                    deliveryer: a.data.message.message.deliveryer,
                    logs: a.data.message.message.logs,
                    minid: a.data.message.message.minid,
                    maxid: a.data.message.message.maxid,
                    show_location: a.data.message.message.show_location
                });
            }
        });
    },
    chooseStatus: function() {
        this.setData({
            showStatus: !this.data.showStatus
        });
    },
    onJsEvent: function(e) {
        a.util.jsEvent(e);
    },
    onShowImage: function(e) {
        a.util.showImage(e);
    },
    onReachBottom: function() {}
});