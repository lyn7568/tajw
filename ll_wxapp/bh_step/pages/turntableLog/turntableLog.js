var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function order(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/turntableLog",
        data: {
            token: wx.getStorageSync("token"),
            p: e.data.p
        },
        success: function(t) {
            e.setData({
                orders: t.info
            });
        }
    });
}

Page({
    data: {
        p: 1,
        orderStatus: {
            1: "FA2828",
            2: "FF8E00",
            3: "26BCC5",
            4: "909090"
        },
        share_text: "",
        share_image: "",
        isShowPop: !1,
        order_explain: "",
        service_image: ""
    },
    onLoad: function(t) {
        this.setData({
          img_url: app.siteStep.sitebase + app.siteStep.img_url
        }), this.setData({
            attention: this.data.img_url + "/step2gift/attention.png"
        }), $this = this;
    },
    goToGuide: function(t) {
        this.setData({
            isShowPop: !0,
            order_explain: t.currentTarget.dataset.order_explain,
            service_image: t.currentTarget.dataset.service_image
        });
    },
    closePop: function() {
        this.setData({
            isShowPop: !1
        });
    },
    addAddress: function() {
        wx.navigateTo({
            url: "/bh_step/pages/address/address"
        });
    },
    onReady: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image,currency_name"
            },
            success: function(t) {
                $this.setData(t.info);
            }
        });
    },
    onShow: function() {
        order(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
        {
            title: $this.data.share_text,
            imageUrl: $this.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
        };
    },
    nagativeToIndex: function() {
        wx.navigateTo({
            url: "/bh_step/pages/lottery/lottery"
        });
    },
    copy: function(t) {
        var e = t.currentTarget.dataset.value;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功"
                }), o.sensors.track("XMClick", {
                    ck_module: "复制运单号",
                    contentid: "",
                    page: "订单页面"
                });
            }
        });
    }
});