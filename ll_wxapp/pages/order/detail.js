var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../static/js/utils/qrcode.js")), a = getApp();

Page({
    data: {
        showStatus: !1,
        onShowSuperredpacket: !1,
        zhezhaoShow: !1,
        shareData: {
            title: "",
            path: "",
            desc: "",
            imageUrl: "",
            success: function() {},
            fail: function() {}
        }
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onLoad: function(t) {
        var e = this, s = t.id;
        e.data.options = t, e.setData({
            id: s
        }), a.util.request({
            url: "wmall/order/index/detail",
            data: {
                id: s,
                forceOauth: 1
            },
            success: function(t) {
                if (t.data.message.errno) return a.util.toast(t.data.message.message), !1;
                var s = t.data.message.message;
                0 == s.activityed.length && (s.activityed = !1);
                var o = s.order_status[s.order.status].text;
                if (e.setData({
                    detail: s,
                    status: o
                }, function() {
                    e.newQrcode(e.data.detail.qrcode);
                }), e.data.detail.share.sharedata) {
                    var i = e.data.detail.share.sharedata;
                    e.data.shareData = {
                        title: i.title,
                        desc: i.desc,
                        imageUrl: i.imgUrl,
                        path: i.link,
                        success: function() {},
                        fail: function() {}
                    };
                }
            }
        }), a.util.setNavigator(a.navigator.list, {
            bottom: "80px"
        });
    },
    chooseStatus: function() {
        this.setData({
            showStatus: !this.data.showStatus
        });
    },
    onToggleSuperredpacket: function(t) {
        this.setData({
            onShowSuperredpacket: !this.data.onShowSuperredpacket
        }), t.currentTarget.dataset.force && this.onToggleZhezhao();
    },
    onToggleZhezhao: function() {
        this.setData({
            zhezhaoShow: !this.data.zhezhaoShow
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.onLoad(t.data.options), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    },
    onFinishMealPay: function() {
        wx.showModal({
            title: "",
            content: "您的支付方式为餐后支付，请到商家收银台付款",
            success: function(t) {}
        });
    },
    newQrcode: function(a) {
        new t.default("canvas", {
            text: a,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: t.default.correctLevel.H
        });
    }
});