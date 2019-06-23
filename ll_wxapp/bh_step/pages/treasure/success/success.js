var that, tools = require("../../../../util/tools.js");

Page({
    data: {
        share_text: "",
        share_image: "",
        member_id: 0,
        id: 0,
        record: []
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
            url: "entry/wxapp/treasureSuccess",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.id
            },
            success: function(t) {
                that.setData(t.info);
            }
        });
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
    },
    jumptreasure: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    }
});