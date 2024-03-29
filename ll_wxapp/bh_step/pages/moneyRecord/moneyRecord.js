var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function imlist(a) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/moneyLog",
        data: {
            token: wx.getStorageSync("token"),
            p: a.data.p
        },
        success: function(t) {
            var e = t.info;
            1 < a.data.p && (e = a.data.data.concat(e)), a.setData({
                data: e
            }), t.info.length < 10 && a.setData({
                hasData: !0
            });
        }
    });
}

Page({
    data: {
        p: 1,
        share_text: "",
        share_image: ""
    },
    onLoad: function(t) {
        this.setData({
          img_url: app.siteStep.sitebase + app.siteStep.img_url
        }), $this = this;
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        imlist(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.isover || (this.data.p += 1, imlist(this));
    },
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
        {
            title: $this.data.share_text,
            imageUrl: $this.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
        };
    }
});