var _tools = require("../../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

Page({
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        userName: "",
        folder: [ !1, !1 ],
        autograph: ""
    },
    onLoad: function(t) {
        that = this;
    },
    folder: function(t) {
        var e = t.currentTarget.id, a = this.data.folder[e];
        this.data.folder[e] = !a, console.log(this.data.folder), this.setData({
            folder: this.data.folder
        });
    },
    onReady: function() {},
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicEdit",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
    },
    preserve: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicEdit",
            data: {
                token: wx.getStorageSync("token"),
                op: "edit",
                autograph: that.data.autograph
            },
            success: function(t) {
                wx.navigateTo({
                    url: "/bh_step/pages/topic/my/my"
                });
            }
        });
    },
    bindinpt: function(t) {
        this.data.autograph = t.detail.value;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: that.data.share.text,
            path: that.data.share.path
        };
    }
});