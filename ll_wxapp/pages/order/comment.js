var t = getApp();

Page({
    data: {
        activeDelivery: [],
        goodsComment: [ "很差", "一般", "满意", "非常满意", "无可挑剔" ],
        tasteComment: [ "很差", "一般", "满意", "非常满意", "无可挑剔" ],
        packageComment: [ "很差", "一般", "满意", "非常满意", "无可挑剔" ],
        goodsStar: 0,
        tasteStar: 0,
        packageStar: 0,
        files: [],
        uploadImg: !1,
        comment: "",
        submit: !1
    },
    onLoad: function(a) {
        var e = this, s = a.id;
        t.util.request({
            url: "wmall/order/comment/index",
            data: {
                id: s
            },
            success: function(t) {
                var a = t.data.message.message;
                e.setData({
                    goodsList: a.goods,
                    deliveryer: a.deliveryer,
                    order: a.order,
                    store: a.store,
                    delivery: a.delivery
                }), console.log(e.data), e.setData({
                    id: s
                });
            }
        });
    },
    onReady: function() {},
    chooseTags: function(t) {
        var a = this, e = a.data.activeDelivery, s = t.currentTarget.dataset.id;
        1 == e.tags[s].selected ? e.tags[s].selected = 0 : e.tags[s].selected = 1, a.setData({
            activeDelivery: e
        });
    },
    onStarChange: function(t) {
        var a = this, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.type;
        if ("deliveryStar" == s) {
            var i = a.data.delivery[e];
            a.setData({
                activeDelivery: i
            });
        } else if ("goodsStar" == s) {
            var r = t.currentTarget.dataset.style;
            if ("goods" == r) o = a.data.goodsComment; else if ("taste" == r) o = a.data.tasteComment; else var o = a.data.packageComment;
            var d = o[e], c = e + 1;
            "goods" == r ? a.setData({
                goodsStar: c,
                goodsTitle: d
            }) : "taste" == r ? a.setData({
                tasteStar: c,
                tasteTitle: d
            }) : a.setData({
                packageStar: c,
                packageTitle: d
            });
        }
        a.data.activeDelivery.value && a.data.goodsStar && a.data.tasteStar && a.data.packageStar && a.setData({
            submit: !0
        }), console.log(a.data.submit);
    },
    onComment: function(t) {
        this.setData({
            comment: t.detail.value
        });
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    },
    favorOppose: function(t) {
        var a = this, e = a.data.goodsList, s = t.currentTarget.dataset.id;
        "favor" == t.currentTarget.dataset.type ? 0 == e[s].activity || 2 == e[s].activity ? e[s].activity = 1 : e[s].activity = 0 : 0 == e[s].activity || 1 == e[s].activity ? e[s].activity = 2 : e[s].activity = 0, 
        a.setData({
            goodsList: e
        });
    },
    onSubmit: function() {
        var a = this;
        if (!a.data.submit) return t.util.toast("请填写完整信息"), !1;
        for (var e = [], s = 0; s < a.data.activeDelivery.tags.length; s++) 1 == a.data.activeDelivery.tags[s].selected && e.push(a.data.activeDelivery.tags[s].name);
        var i = {
            id: a.data.id,
            note: a.data.comment,
            deliverScore: a.data.activeDelivery.value,
            goods_quality: a.data.goodsStar,
            tasteScore: a.data.tasteStar,
            packageScore: a.data.packageStar,
            thumbs: a.data.files,
            goods: a.data.goodsList,
            delivery_tags: e
        };
        t.util.request({
            url: "wmall/order/comment/post",
            data: i,
            success: function(e) {
                var s = e.data.message.message;
                t.util.toast(s, "/pages/order/detail?id=" + a.data.id);
            }
        });
    }
});