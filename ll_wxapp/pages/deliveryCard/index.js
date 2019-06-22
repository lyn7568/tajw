var e = getApp();

Page({
    data: {
        showAgreement: !1
    },
    onLoad: function(t) {
        var a = this;
        e.util.request({
            url: "deliveryCard/index",
            success: function(e) {
                a.setData(e.data.message.message), 1 == a.data.deliveryCard_setmeal_ok && wx.setNavigationBarTitle({
                    title: "会员中心"
                });
            }
        });
    },
    onShowAgreement: function() {
        this.setData({
            showAgreement: !this.data.showAgreement
        });
    }
});