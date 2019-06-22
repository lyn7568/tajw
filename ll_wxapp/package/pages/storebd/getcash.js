var t = getApp();

Page({
    data: {
        fee: 0
    },
    onLoad: function() {
        var e = this;
        t.util.request({
            url: "storebd/getcash/application",
            data: {},
            success: function(a) {
                var s = a.data.message;
                if (s.errno) return t.util.toast(s.message), !1;
                s = s.message, e.setData(s);
            }
        });
    },
    getcashInput: function(t) {
        var e = t.detail.value;
        e || (e = 0), this.setData({
            fee: e
        });
    },
    onSubmit: function() {
        var e = this;
        if (e.data.fee <= 0) return t.util.toast("请填写提现金额"), !1;
        t.util.request({
            url: "storebd/getcash/application",
            data: {
                fee: e.data.fee
            },
            method: "POST",
            success: function(e) {
                var a = e.data.message;
                if (a.errno) return t.util.toast(a.message), !1;
                t.util.toast("申请提现成功", "/package/pages/storebd/index", 1500);
            }
        });
    }
});