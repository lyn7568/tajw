var _tools = require("../../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

function e(a) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/topicList",
        data: {
            token: wx.getStorageSync("token"),
            type: 3,
            p: a.data.p,
            topic_id: a.data.id
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
        share_text: "",
        share_image: "",
        img_url: "",
        userName: "",
        folder: [],
        p: 1,
        isover: !1,
        id: 0
    },
    gotoPublish: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/publish/publish?popular_id=" + that.data.id
        });
    },
    onLoad: function(t) {
        (that = this).data.id = t.id;
    },
    folder: function(t) {
        var e = t.currentTarget.id, a = this.data.folder[e];
        this.data.folder[e] = !a, console.log(this.data.folder), this.setData({
            folder: this.data.folder
        });
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicInfo",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData(t.info);
            }
        }), e(that);
    },
    onShow: function() {},
    onHide: function() {},
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
    onUnload: function() {},
    onPullDownRefresh: function() {},
    gotoDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/detail/detail?id=" + e
        });
    },
    gotoUser: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/user/user?id=" + e
        });
    },
    onReachBottom: function() {
        this.data.isover || (this.data.p += 1, e(this));
    },
    gotPublish: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/publish/publish"
        });
    },
    gotoEdit: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/edit/edit"
        });
    },
    gotoFans: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/bh_step/pages/topic/fans/fans?member_id=" + that.data.member.id + "&type=" + e
        });
    },
    deleteTopic: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/deleteTopic",
            data: {
                token: wx.getStorageSync("token"),
                id: e
            },
            success: function(t) {
                1 == t.status && (that.data.folder.splice(a, 1), that.setData({
                    folder: that.data.folder
                }));
            }
        });
    },
    cancelCollection: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/collection",
            data: {
                token: wx.getStorageSync("token"),
                id: e
            },
            success: function(t) {
                1 == t.status && (that.data.folder.splice(a, 1), that.setData({
                    folder: that.data.folder
                }));
            }
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
    switch: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            type: a,
            p: 1,
            folder: []
        }), e(that);
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
    }
});