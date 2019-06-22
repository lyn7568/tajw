var t = getApp();

Page({
    data: {
        store_id: 0,
        thumbs: [],
        tempThumbs: []
    },
    onLoad: function(e) {
        var s = this;
        if (!e.sid) return t.util.toast("参数错误"), !1;
        t.util.request({
            url: "wmall/store/report/index",
            data: {
                sid: e.sid
            },
            success: function(e) {
                var i = e.data.message;
                i.errno ? t.util.toast(i.message) : (s.data.store_id = i.message.store.id, s.setData({
                    reports: i.message.reasons,
                    store_title: i.message.store.title,
                    member_mobile: i.message.member.mobile
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onSubmit: function(e) {
        var s = this, i = e.detail.value;
        if (!i.title) return t.util.toast("投诉类型不能为空", "", 1e3), !1;
        if (!i.note) return t.util.toast("描述信息不能为空", "", 1e3), !1;
        var a = s.data.thumbs;
        if (a.length > 0) for (var o = 0; o < a.length; o++) {
            var n = {
                image: a[o].filename || a[o].image,
                url: ""
            };
            s.data.tempThumbs.push(n);
        }
        var r = s.data.tempThumbs;
        if (!i.mobile) return t.util.toast("手机号码不能为空", "", 1e3), !1;
        i.sid = s.data.store_id, t.util.request({
            url: "wmall/store/report/post",
            data: {
                sid: i.sid,
                title: i.title,
                note: i.note,
                thumbs: JSON.stringify(r),
                mobile: i.mobile,
                formid: e.detail.formId
            },
            success: function(e) {
                var s = e.data.message;
                if (t.util.toast(s.message), s.errno) return !1;
                t.util.toast("投诉成功", "./index?sid=" + i.sid, 1e3);
            }
        });
    },
    onJsEvent: function(e) {
        t.util.jsEvent(e);
    }
});