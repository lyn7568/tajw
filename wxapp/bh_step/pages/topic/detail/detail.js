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
        url: "entry/wxapp/topicCommentList",
        data: {
            token: wx.getStorageSync("token"),
            p: a.data.p,
            id: a.data.id
        },
        success: function(t) {
            a.setData(t.info);
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
        type: 1,
        p: 1,
        isover: !1,
        id: 0,
        inputShow: !1,
        content: "",
        comment_id: 0,
        s: 1,
        placeholder: "说点什么吧"
    },
    onLoad: function(t) {
        (that = this).data.id = t.id;
    },
    folder: function(t) {
        var a = t.currentTarget.id, e = this.data.folder[a];
        this.data.folder[a] = !e, console.log(this.data.folder), this.setData({
            folder: this.data.folder
        });
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicMember",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
    },
    onShow: function() {
        e(that);
    },
    follow: function(t) {
        var a = that.data.detail.member.id;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/follow",
            data: {
                token: wx.getStorageSync("token"),
                member_id: a
            },
            success: function(t) {
                1 == t.status && (that.data.detail.follow = !0, that.setData({
                    detail: that.data.detail
                }));
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    bindfocus: function() {
        this.setData({
            inputShow: !0,
            comment_id: 0,
            placeholder: "说点什么吧"
        });
    },
    hideInputShow: function() {
        this.setData({
            inputShow: !1
        });
    },
    onReachBottom: function() {
        this.data.isover;
    },
    gotoTopicDetail: function(t) {
        var a = t.currentTarget.dataset.topic_id;
        wx.navigateTo({
            url: "/bh_step/pages/topic/topicDetail/topicDetail?id=" + a
        });
    },
    gotoUser: function() {
        wx.navigateTo({
            url: "/bh_step/pages/topic/user/user?id=" + that.data.detail.member_id
        });
    },
    bindinpt: function(t) {
        this.data.content = t.detail.value;
    },
    send: function() {
        1 == that.data.s && (that.data.s = 2, _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicComment",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id,
                content: that.data.content,
                comment_id: that.data.comment_id
            },
            success: function(t) {
                that.setData({
                    s: 1
                }), 1 == t.status && (that.setData({
                    inputShow: !1
                }), e(that));
            }
        }));
    },
    deleteTopic: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/deleteTopic",
            data: {
                token: wx.getStorageSync("token"),
                id: a
            },
            success: function(t) {
                1 == t.status && (that.data.folder.splice(e, 1), that.setData({
                    folder: that.data.folder
                }));
            }
        });
    },
    collection: function(t) {
        var a = that.data.id;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/collection",
            data: {
                token: wx.getStorageSync("token"),
                id: a
            },
            success: function(t) {
                1 == t.status && (that.data.detail.collection = t.info.collection, that.setData({
                    detail: that.data.detail
                }));
            }
        });
    },
    fabulous: function(t) {
        var a = that.data.id;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/fabulous",
            data: {
                token: wx.getStorageSync("token"),
                id: a
            },
            success: function(t) {
                1 == t.status && (that.data.detail.fabulous = t.info.fabulous, that.data.detail.fabulous_number = t.info.fabulous_number, 
                that.setData({
                    detail: that.data.detail
                }));
            }
        });
    },
    reply: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.name;
        that.setData({
            comment_id: a,
            placeholder: "回复" + e + ":",
            inputShow: !0
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
        var a = t.currentTarget.dataset.image;
        wx.previewImage({
            current: a,
            urls: that.data.detail.image
        });
    }
});