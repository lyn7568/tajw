var t = getApp();

Page({
    data: {
        getCode: !0,
        code: {
            text: "获取验证码",
            downcount: 60
        },
        submitting: !1
    },
    onLoad: function(e) {
        var a = this;
        t.util.request({
            url: "wmall/store/settle",
            success: function(e) {
                -1 != e.data.message.errno ? -1e3 == e.data.message.errno ? wx.redirectTo({
                    url: "application"
                }) : a.setData(e.data.message.message) : t.util.toast(e.data.message.message);
            }
        });
    },
    onMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    onSelectAgent: function(t) {
        var e = t.detail.value;
        this.setData({
            agent: this.data.agents[e]
        });
    },
    getCode: function() {
        var e = this, a = e.data.code;
        if (!e.data.getCode) return !1;
        if (!e.data.mobile) return t.util.toast("手机号不能为空"), !1;
        if (!t.util.isMobile(e.data.mobile)) return t.util.toast("手机号格式错误"), !1;
        var s = {
            mobile: e.data.mobile
        };
        t.util.request({
            url: "system/common/code",
            data: s,
            success: function(s) {
                var i = s.data.message;
                if (i.errno) return t.util.toast(i.message), !1;
                a.text = a.downcount + "秒后重新获取", e.setData({
                    code: a,
                    getCode: !1
                });
                var o = setInterval(function() {
                    a.downcount--, a.downcount <= 0 ? (clearInterval(o), a.text = "获取验证码", a.downcount = 60, 
                    e.setData({
                        getCode: !0
                    })) : a.text = a.downcount + "秒后重新获取", e.setData({
                        code: a
                    });
                }, 1e3);
                t.util.toast("验证码发送成功, 请注意查收");
            }
        });
    },
    onSubmit: function(e) {
        var a = this;
        if (a.data.submitting) return !1;
        if (!e.detail.value.mobile) return t.util.toast("手机号不能为空"), !1;
        if (!t.util.isMobile(e.detail.value.mobile)) return t.util.toast("手机号格式错误"), !1;
        if (1 == a.data.status && !e.detail.value.code) return t.util.toast("请输入短信验证码"), 
        !1;
        if (!e.detail.value.password) return t.util.toast("密码不能为空"), !1;
        var s = e.detail.value.password.length;
        if (s < 8 || s > 20) return t.util.toast("请输入8-20位密码"), !1;
        if (!/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(e.detail.value.password)) return t.util.toast("密码必须由数字和字母组合"), 
        !1;
        if (!e.detail.value.repassword) return t.util.toast("请重复输入密码"), !1;
        if (e.detail.value.password != e.detail.value.repassword) return t.util.toast("两次密码输入不一致"), 
        !1;
        if (!e.detail.value.title) return t.util.toast("请输入姓名"), !1;
        var i = 0;
        if (a.data.isagent > 0 && !(i = a.data.agent.id)) return t.util.toast("请选择所属区域"), 
        !1;
        var o = {
            mobile: e.detail.value.mobile,
            code: e.detail.value.code,
            password: e.detail.value.password,
            repassword: e.detail.value.repassword,
            title: e.detail.value.title,
            agentid: i
        };
        a.data.submitting = !0, t.util.request({
            url: "wmall/store/settle",
            data: o,
            method: "POST",
            success: function(e) {
                -1e3 == e.data.message.errno ? (t.util.toast(e.data.message.message), a.onLoad()) : (t.util.toast(e.data.message.message), 
                e.data.message.errno && (a.data.submitting = !1));
            }
        });
    }
});