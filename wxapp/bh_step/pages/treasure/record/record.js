var that, tools = require("../../../../util/tools.js");

Page({
    data: {
        share_text: "",
        share_image: "",
        member_id: 0,
        id: 0,
        record: [],
        treasure: []
    },
    onLoad: function(t) {
        (that = this).data.id = t.id;
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
                that.setData(t.info);
            }
        });
    },
    onShow: function() {
        tools.request({
            method: "get",
            url: "entry/wxapp/treasureLog",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
    },
    onHide: function() {},
    copy: function(t) {
        var e = t.currentTarget.dataset.value;
        wx.setClipboardData({
            data: e,
            success: function() {
                wx.showToast({
                    title: "复制成功",
                    mask: "none"
                });
            }
        });
    },
    gotoDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/bh_step/pages/treasure/detail/detail?id=" + e
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    gotoTreasure: function() {
        wx.switchTab({
            url: "/bh_step/pages/treasure/index/index"
        });
    },
    addAddress: function() {
        wx.navigateTo({
            url: "/bh_step/pages/address/address"
        });
    },
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id), 
        {
            title: that.data.share_text,
            imageUrl: that.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member_id
        };
    },
    jumptreasure: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    }
});