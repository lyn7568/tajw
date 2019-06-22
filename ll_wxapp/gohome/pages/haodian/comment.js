var a = getApp();

Page({
    data: {
        sid: 0,
        islegal: !1,
        files: [],
        note: "",
        haodianStar: 5
    },
    onLoad: function(t) {
        var s = this;
        t && t.sid && (s.data.sid = t.sid), a.util.request({
            url: "haodian/comment/index",
            data: {
                sid: s.data.sid
            },
            success: function(t) {
                var e = t.data.message;
                if (e.errno) return a.util.toast(e.message), !1;
                e = e.message, s.setData({
                    store: e.store,
                    islegal: !0
                });
            }
        });
    },
    onChange: function(a) {
        this.setData({
            haodianStar: a.detail
        });
    },
    onNote: function(a) {
        this.setData({
            note: a.detail.value
        });
    },
    onSubmit: function() {
        var t = this;
        if (t.data.islegal) if (t.data.note) {
            t.setData({
                islegal: !1
            });
            var s = {
                sid: t.data.sid,
                note: t.data.note,
                haodianStar: t.data.haodianStar,
                thumbs: JSON.stringify(t.data.files)
            };
            a.util.request({
                url: "haodian/comment/post",
                data: s,
                success: function(s) {
                    var e = s.data.message;
                    if (e.errno) return a.util.toast(e.message), !1;
                    a.util.toast("评价成功", "/gohome/pages/haodian/detail?sid=" + t.data.sid, 1500);
                }
            });
        } else a.util.toast("评论内容不能为空");
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    }
});