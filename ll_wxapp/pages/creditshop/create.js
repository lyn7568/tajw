var e = getApp();

Page({
    data: {
        goods_id: "",
        goods_type: "",
        username: "",
        mobile: "",
        islegal: !1
    },
    onLoad: function(o) {
        console.log(o);
        var a = this;
        a.data.goods_id = o.goods_id, e.util.request({
            url: "creditshop/order/create",
            data: {
                goods_id: o.goods_id
            },
            success: function(e) {
                var e = e.data.message.message;
                a.data.goods_type = e.type, a.setData({
                    good: e,
                    islegal: !a.data.islegal
                });
            }
        });
    },
    onOrderSubmit: function() {
        var o = this;
        if ("goods" == o.data.goods_type) {
            if (!o.data.username) return e.util.toast("请输入姓名", ""), !1;
            if (!o.data.mobile) return e.util.toast("请输入联系方式", ""), !1;
        }
        o.data.islegal = !1, o.setData({
            islegal: o.data.islegal
        }), e.util.request({
            url: "creditshop/order/submit",
            data: {
                goods_id: o.data.goods_id,
                username: o.data.username,
                mobile: o.data.mobile
            },
            success: function(o) {
                if ((o = o.data.message).errno) return e.util.toast(o.message, ""), !1;
                var a = o.message.order_id, t = "./detail?id=" + a;
                return "pay" == o.message.redirect && (t = "../public/pay?order_id=" + a + "&order_type=creditshop"), 
                wx.showToast({
                    title: "兑换成功",
                    success: function() {
                        wx.redirectTo({
                            url: t
                        });
                    }
                }), !1;
            }
        });
    },
    onInput: function(e) {
        console.log(e);
        var o = this;
        "username" == e.currentTarget.id ? o.setData({
            username: e.detail.value
        }) : o.setData({
            mobile: e.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("监听页面显示");
    },
    onHide: function() {
        console.log("监听页面隐藏");
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});