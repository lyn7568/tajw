var e = getApp();

Page({
    data: {
        agreement: !1
    },
    onLoad: function(t) {
        var a = this;
        e.util.request({
            url: "ordergrant/index",
            success: function(t) {
                console.log("======================"), console.log(t.data.message);
                var n = t.data.message;
                e.WxParse.wxParse("richtext", "html", n.message.config_ordergrant.agreement, a, 5), 
                a.setData(n.message);
            }
        });
    },
    onRewardClick: function(t) {
        var a = this;
        e.util.request({
            url: "ordergrant/index",
            success: function(e) {
                console.log(e.data.message);
                var t = e.data.message;
                a.setData(t.message);
            }
        });
    },
    onShowAgreement: function() {
        console.log("++++++++++++++++++++++++");
        var e = this, t = e.data.agreement;
        e.setData({
            agreement: !e.data.agreement
        }), console.log(t);
    },
    onDayClick: function(t) {
        console.log(t.currentTarget.dataset);
        var a = t.currentTarget.dataset, n = a.day, o = a.grant, s = new Date().getDate(), r = n - s;
        console.log("++++++++++++"), console.log(s);
        var g = {
            grant: o,
            difference: r
        };
        e.util.request({
            url: "ordergrant/index/next",
            data: g,
            success: function(t) {
                e.util.toast(t.data.message.message);
            }
        });
    },
    onGetReward: function(t) {
        var a = this;
        console.log("*************"), console.log(t);
        var n = t.target.dataset, o = n.days, s = n.type, r = n.status, g = n.index;
        if (console.log(r), !s || !o) return e.util.toast("您还没有达到领取该奖励的条件", "", "1000"), 
        !1;
        var c = {
            days: o,
            type: s
        };
        e.util.request({
            url: "ordergrant/index/get",
            data: c,
            method: "POST",
            success: function(t) {
                e.util.toast(t.data.message.message), console.log("++++++++++------------"), console.log(a.data.config_ordergrant.all[g].status), 
                1 == r && (1 == s ? (a.data.config_ordergrant.continuous[g].status = 2, a.setData({
                    config_ordergrant: a.data.config_ordergrant
                })) : 2 == s && (a.data.config_ordergrant.all[g].status = 2, a.setData({
                    config_ordergrant: a.data.config_ordergrant
                })));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});