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
        url: "entry/wxapp/fans",
        data: {
            token: wx.getStorageSync("token"),
            type: a.data.type,
            member_id: a.data.member_id,
            p: a.data.p
        },
        success: function(t) {
            wx.setNavigationBarTitle({
                title: t.info.title
            });
            var e = t.info.list;
            1 < a.data.p && (e = a.data.list.concat(e)), a.setData(t.info), a.setData({
                list: e
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
        type: 1,
        member_id: 0,
        list: [],
        p: 1,
        isover: !1
    },
    onLoad: function(t) {
        (that = this).data.member_id = t.member_id, this.data.type = t.type;
    },
    onReady: function() {
        e(this);
    },
    onShow: function() {},
    bindinpt: function(t) {
        this.data.autograph = t.detail.value;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.isover || (this.data.p += 1, e(this));
    },
    onShareAppMessage: function() {
        return {
            title: that.data.share.text,
            path: that.data.share.path
        };
    }
});