var a = getApp();

Page({
    data: {},
    onLoad: function() {
        var e = this;
        a.util.request({
            url: "spread/getCash/application",
            success: function(a) {
                console.log(a);
                var t = a.data.message;
                e.setData(t.message), e.setData({
                    channel: "credit"
                });
            }
        });
    },
    onInput: function(a) {
        var e = this, t = a.detail.value;
        t <= 0 && (t = 0), e.setData({
            fee: t
        });
    },
    onRadioChange: function(a) {
        var e = this, t = a.detail.value;
        e.setData({
            channel: t
        });
    },
    onSubmit: function() {
        var e = this, t = e.data.fee;
        if (!t) return a.util.toast("请填写提现金额"), !1;
        var s = e.data.channel;
        if (!s) return a.util.toast("请选择提现渠道"), !1;
        var n = {
            status: 1,
            fee: t,
            channel: s
        };
        a.util.request({
            url: "spread/getCash/application",
            data: n,
            success: function(e) {
                0 == e.data.message.errno ? a.util.toast(e.data.message.message, "./getCashLog") : (a.util.toast(e.data.message.message), 
                -1e3 == e.data.message.errno && wx.redirectTo({
                    url: "../member/profile"
                }));
            }
        });
    }
});