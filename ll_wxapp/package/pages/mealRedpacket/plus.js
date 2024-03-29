var e = getApp();

Page({
    data: {
        sid: 0,
        redpackets: {},
        selectedIndex: 0,
        islegal: !0
    },
    onLoad: function(a) {
        var t = this;
        e.util.request({
            url: "mealRedpacket/plus",
            success: function(a) {
                var s = a.data.message;
                if (s.errno) return e.util.toast(s.message), !1;
                if (0 == s.message) return e.util.toast("暂无套餐红包Plus活动"), !1;
                t.data.redpackets = s.message.data.redpackets;
                for (var d in t.data.redpackets) {
                    t.data.selectedIndex = d;
                    break;
                }
                t.setData({
                    sid: s.message.id,
                    placeholder: s.message.data.placeholder,
                    redpackets: t.data.redpackets,
                    selectedIndex: t.data.selectedIndex,
                    old_price: t.data.redpackets[t.data.selectedIndex].old_price,
                    price: t.data.redpackets[t.data.selectedIndex].price
                });
            }
        });
    },
    onChooseMeal: function(e) {
        var a = this;
        a.data.selectedIndex = e.currentTarget.dataset.index, a.setData({
            selectedIndex: a.data.selectedIndex,
            old_price: a.data.redpackets[a.data.selectedIndex].old_price,
            price: a.data.redpackets[a.data.selectedIndex].price
        });
    },
    onOrderSubmit: function() {
        var a = this;
        if (!a.data.selectedIndex) return e.util.toast("请选择套餐", ""), !1;
        if (!a.data.islegal) return !1;
        a.data.islegal = !1, a.setData({
            islegal: a.data.islegal
        });
        var t = {
            sid: a.data.sid,
            meal_id: a.data.selectedIndex,
            final_fee: a.data.redpackets[a.data.selectedIndex].price
        };
        e.util.request({
            url: "mealRedpacket/plus/submit",
            data: t,
            success: function(a) {
                if ((a = a.data.message).errno) return 1e3 == a.errno ? (e.util.toast(a.message, "../store/goods?sid=" + t.sid), 
                !1) : (e.util.toast(a.message, ""), !1);
                var s = a.message;
                return wx.showToast({
                    title: "下单成功",
                    success: function() {
                        wx.navigateTo({
                            url: "../../../pages/public/pay?order_id=" + s + "&order_type=mealRedpacket_plus"
                        });
                    }
                }), !1;
            }
        });
    },
    onJsEvent: function(a) {
        e.util.jsEvent(a);
    }
});