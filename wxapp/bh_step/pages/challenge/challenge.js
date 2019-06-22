var that, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Page({
    data: {},
    onLoad: function(t) {
        that = this;
    },
    onReady: function() {},
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/challenge",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
            }
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    gotohisory: function() {
        wx.navigateTo({
            url: "../challengeHisory/challengeHisory"
        });
    },
    signup: function(t) {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/formid",
            data: {
                token: wx.getStorageSync("token"),
                formid: t.detail.formId
            },
            success: function(t) {}
        }), wx.navigateTo({
            url: "../challengDetails/challengDetails?id=" + t.currentTarget.dataset.id
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: that.data.share_text,
            imageUrl: that.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
        };
    }
});