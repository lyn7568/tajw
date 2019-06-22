var that, _tools = require("../../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(a) {
    var t = 1 == a.data.tabIndex ? "topicList" : "myFollow";
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/" + t,
        data: {
            token: wx.getStorageSync("token"),
            type: 2,
            p: a.data.p
        },
        success: function(t) {
            var e = t.info.list;
            1 < a.data.p && (e = a.data.folder.concat(e)), a.setData({
                folder: e
            }), t.info.list.length < 10 && a.setData({
                isover: !0
            });
        }
    });
}

Page({
    data: {
        tabIndex: 1,
        isFixed: !1,
        p: 1,
        folder: [],
        isover: !1
    },
    onLoad: function(t) {
        that = this;
    },
    onReady: function() {
        e(that);
    },
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topic",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
    },
    gotoUser: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/user/user?id=" + e
        });
    },
    gotoTDetail: function(t) {
        var e = t.currentTarget.dataset.topic_id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/topicDetail/topicDetail?id=" + e
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        that.setData({
            p: 1,
            folder: []
        }), e(this);
    },
    onReachBottom: function() {},
    exactly: function() {
        this.data.isover || (this.data.p += 1, e(this));
    },
    gotoTopicDetail: function(t) {
        wx.navigateTo({
            url: "/bh_step/pages/topic/topicDetail/topicDetail?id=" + t.currentTarget.dataset.id
        });
    },
    onShareAppMessage: function() {
        return {
            title: that.data.share.text,
            path: that.data.share.path
        };
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset.image, a = t.currentTarget.dataset.index;
        wx.previewImage({
            current: e,
            urls: that.data.folder[a].image
        });
    },
    fabulous: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/fabulous",
            data: {
                token: wx.getStorageSync("token"),
                id: e
            },
            success: function(t) {
                1 == t.status && (that.data.folder[a].fabulous = t.info.fabulous, that.data.folder[a].fabulous_number = t.info.fabulous_number, 
                that.setData({
                    folder: that.data.folder
                }));
            }
        });
    },
    tabIndex: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(a), that.setData({
            p: 1,
            folder: [],
            tabIndex: a
        }), e(that);
    },
    collection: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/collection",
            data: {
                token: wx.getStorageSync("token"),
                id: e
            },
            success: function(t) {
                1 == t.status && (that.data.folder[a].collection = t.info.collection, that.setData({
                    folder: that.data.folder
                }));
            }
        });
    },
    follow: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/follow",
            data: {
                token: wx.getStorageSync("token"),
                member_id: e
            },
            success: function(t) {
                1 == t.status && (that.data.folder[a].follow = !0, that.setData({
                    folder: that.data.folder
                }));
            }
        });
    },
    gotoDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/detail/detail?id=" + e
        });
    },
    gotoPublish: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/publish/publish"
        });
    },
    gotoMy: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/my/my"
        });
    }
});