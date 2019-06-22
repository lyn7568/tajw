var that, _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Page({
    data: {
        id: 0
    },
    onLoad: function(t) {
        this.data.id = t.id, that = this;
    },
    onReady: function() {},
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/challengeDetails",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData(t.info), wx.setNavigationBarTitle({
                    title: "挑战" + t.info.challenge.step_number + "步"
                });
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
    signup: function(t) {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/challengeSignup",
            data: {
                token: wx.getStorageSync("token"),
                formid: t.detail.formId,
                id: that.data.id
            },
            success: function(t) {
                that.onShow();
            }
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