var _util = require("../we7/resource/js/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp(), request = function(o) {
  console.log(o), o.data.version = app.siteStep.siteVersion, app.utilStep.request({
        method: o.method || "get",
        url: o.url,
        data: o.data,
        cachetime: 0,
        showLoading: !1,
        success: function(e) {
            var t = e.data.status;
            -1 == t ? login(o) : 0 == t ? wx.showModal({
                title: "提示",
                mask: !0,
                content: e.data.info,
                showCancel: !1
            }) : -2 == t ? validateAuthorize(o) : o.success(e.data);
        },
        fail: function() {}
    });
}, login = function(a) {
    wx.login({
        success: function(e) {
            var t = wx.getStorageSync("parent_id"), o = wx.getStorageSync("goods_id"), n = wx.getStorageSync("share_tpye");
            request({
                method: "get",
                url: "entry/wxapp/login",
                data: {
                    code: e.code,
                    parent_id: t,
                    goods_id: o,
                    share_tpye: n
                },
                success: function(e) {
                  console.log(e)
                    if (wx.setStorageSync("token", e.info.token), null != a) return a.data.token = e.info.token, 
                    void request(a);
                }
            });
        },
        fail: function() {}
    });
}, validateAuthorize = function t(o) {
    wx.showModal({
        title: "提示",
        content: "asjjasjsajjsjjsaj",
        showCancel: !1,
        success: function(e) {
            wx.openSetting({
                success: function(e) {
                    e.authSetting["scope.werun"] ? null != o && wx.getWeRunData({
                        success: request(o)
                    }) : t();
                }
            });
        }
    });
}, upload = function(e) {
    var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : function(e) {}, t = _util2.default.url("entry/wxapp/upload"), n = getCurrentPages();
    n.length && (n = n[getCurrentPages().length - 1]) && n.__route__ && (t = t + "&m=" + n.__route__.split("/")[0]), 
    wx.uploadFile({
        url: t,
        filePath: e,
        name: "file",
        header: {},
        formData: {},
        success: function(e) {
            console.log(99999999999), console.log(e);
            var t = JSON.parse(e.data);
            o(t);
        },
        fail: function(e) {
            wx.hideLoading(), getApp().showToast("上传失败");
        }
    });
};

module.exports = {
    request: request,
    upload: upload
};