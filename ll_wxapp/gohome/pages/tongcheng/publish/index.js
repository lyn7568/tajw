var e = getApp();

Page({
    data: {
        onChildCategory: !1,
        failedTips: {
            type: "message",
            tips: "",
            btnText: "关闭",
            link: "/gohome/pages/tongcheng/index"
        },
        black_member: {
            status: !1
        }
    },
    onLoad: function() {
        var t = this;
        e.util.request({
            url: "tongcheng/publish/index",
            success: function(a) {
                var i = a.data.message;
                if (i.errno) return -1e3 == i.errno ? (t.data.black_member = i.message.black_member, 
                t.data.failedTips.tips = t.data.black_member.tip, void t.setData({
                    black_member: t.data.black_member,
                    failedTips: t.data.failedTips
                })) : (e.util.toast(i.message), !1);
                i = i.message, t.setData(i);
            }
        });
    },
    onPublish: function(t) {
        var a = t.currentTarget.dataset.id, i = this.data.categorys[a];
        if (i.child && i.child.length > 0) this.setData({
            categorySelected: i,
            onChildCategory: !0
        }); else {
            var s = i.parentid, n = i.id;
            0 == s && (s = i.id, n = 0), e.util.jump2url("/gohome/pages/tongcheng/publish/post?parentid=" + s + "&childid=" + n, "navigateTo");
        }
    },
    onChangeStatus: function() {
        this.setData({
            onChildCategory: !this.data.onChildCategory
        });
    },
    onReachBottom: function() {},
    onPullDownRefresh: function() {},
    onJsEvent: function(t) {
        e.util.jsEvent(t);
    }
});