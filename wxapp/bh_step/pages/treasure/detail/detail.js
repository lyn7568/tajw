var that, tools = require("../../../../util/tools.js");

function imlist(a) {
    tools.request({
        method: "get",
        url: "entry/wxapp/treasureCode",
        data: {
            token: wx.getStorageSync("token"),
            p: a.data.p,
            id: a.data.id
        },
        success: function(t) {
            var e = t.info;
            1 < a.data.p && (e = a.data.data.concat(e)), a.setData({
                data: e
            }), t.info.length < 10 ? a.setData({
                isover: !1
            }) : a.data.p++;
        }
    });
}

Page({
    data: {
        share_text: "",
        share_image: "",
        id: 0,
        purchase_show: !1,
        currentNun: 1,
        isClosing: !1,
        isRequest: 1,
        close_code: !1,
        p: 1,
        isover: !0,
        data: [],
        code: [],
        address: !1
    },
    onLoad: function(t) {
        (that = this).data.id = t.id;
    },
    hanleExchangeClick: function() {
        this.data.address, this.setData({
            purchase_show: !0
        });
    },
    handleClose: function() {
        this.setData({
            purchase_show: !1,
            isClosing: !0
        });
    },
    catchtouchmove: function() {},
    handleLessOne: function() {
        var t = this.data.currentNun + 1;
        this.setData({
            currentNun: t
        });
    },
    bindInputNum: function(t) {
        this.setData({
            currentNun: t.detail.value
        });
    },
    handleAddOne: function() {
        if (this.data.currentNun < 2) return !0;
        var t = this.data.currentNun - 1;
        this.setData({
            currentNun: t
        });
    },
    close: function() {
        this.setData({
            close_code: !1
        });
    },
    hindleLookNumber: function() {
        tools.request({
            method: "get",
            url: "entry/wxapp/myCode",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData({
                    close_code: !0,
                    code: t.info
                });
            }
        });
    },
    handleBuy: function() {
        if (1 != this.data.isRequest) return !0;
        this.data.isRequest = 2, tools.request({
            method: "get",
            url: "entry/wxapp/treasureBuy",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id,
                currentNun: that.data.currentNun
            },
            success: function(t) {
                that.data.isRequest = 1, 2 == t.status ? wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: t.info,
                    showCancel: !1
                }) : wx.navigateTo({
                    url: "../success/success?id=" + t.info
                });
            }
        });
    },
    onReady: function() {
        tools.request({
            method: "get",
            url: "entry/wxapp/config",
            data: {
                token: wx.getStorageSync("token"),
                key: "xcx_title,share_text,share_image"
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), that.setData(t.info);
            }
        });
    },
    onShow: function() {
        tools.request({
            method: "get",
            url: "entry/wxapp/treasureDetail",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData(t.info);
            }
        }), imlist(this);
    },
    handleSeeMoreRecord: function() {
        imlist(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id), 
        {
            title: that.data.share_text,
            imageUrl: that.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
        };
    }
});