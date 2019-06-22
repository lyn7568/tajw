var e = getApp();

Page({
    data: {
        checkbox: 0,
        status: 0
    },
    onLoad: function() {
        var t = this;
        e.util.request({
            url: "spread/register/index",
            success: function(s) {
                var a = s.data.message;
                -1e3 == a.errno ? e.util.jump2url("pages/spread/index") : -1001 == a.errno ? e.util.imessage(a.message, "switchTab:/pages/home/index", "info") : t.setData(a.message);
            }
        });
    },
    onReady: function() {},
    onChange: function(e) {
        var t = e.detail.value;
        t = 1 != t ? 0 : 1, this.setData({
            checkbox: t
        });
    },
    onApplication: function(t) {
        var s = this, a = t.detail.value;
        if (!a.realname) return e.util.toast("姓名不能为空"), !1;
        var o = a.mobile;
        if (!o) return e.util.toast("手机号不能为空"), !1;
        if (!e.util.isMobile(o)) return e.util.toast("手机号格式错误"), !1;
        if (1 == s.data.configRelate.open_protocol && 0 == s.data.checkbox) return e.util.toast("请同意推广协议"), 
        !1;
        var i = {
            name: a.realname,
            mobile: a.mobile,
            reg: /^[01][345678][0-9]{9}$/
        };
        e.util.request({
            url: "spread/register/application",
            data: i,
            success: function(e) {
                -1e3 == e.data.message.errno ? (wx.showToast({
                    title: "恭喜您已成为推广员",
                    icon: "success"
                }), wx.redirectTo({
                    url: "index"
                })) : (wx.showToast({
                    title: "您已成功提交申请,等待管理员审核",
                    icon: "success"
                }), s.onLoad());
            }
        });
    },
    onSubmit: function() {
        console.log(1212);
        var t = this;
        e.util.request({
            url: "spread/register/index",
            method: "POST",
            success: function(e) {
                console.log(e), -1e3 == e.data.message.errno ? (wx.showToast({
                    title: "恭喜您已成为推广员",
                    icon: "success"
                }), wx.redirectTo({
                    url: "index"
                })) : (console.log(9999), t.onLoad());
            }
        });
    }
});