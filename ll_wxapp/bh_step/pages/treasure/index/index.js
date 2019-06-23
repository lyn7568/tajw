var that, e, i, a, tools = require("../../../../util/tools.js"), c = 0;

Page({
    data: {
        share_text: "",
        share_image: "",
        marginLeft: 0,
        displayType: "block",
        scrollTime: 0,
        selectIndex: 0,
        scrollViewHeight: 0,
        ending_period_list: [],
        running_period_list: []
    },
    animationfinish: function(t) {
        this.setData({
            scrollViewHeight: 0 == this.data.selectIndex ? 270 * this.data.running_period_list.length : 0 < this.data.ending_period_list.length ? 270 * this.data.ending_period_list.length : 600
        });
    },
    swiperChange: function(t) {
        this.setData({
            selectIndex: t.detail.current
        });
    },
    btnClick: function(t) {
        this.setData({
            selectIndex: t.currentTarget.id
        });
    },
    onLoad: function(t) {
        that = this;
        var e = wx.getSystemInfoSync().screenWidth;
        this.setData({
            marginLeft: e
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
            url: "entry/wxapp/treasure",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info), that.animationfinish();
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
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/detail?id=" + e
        });
    },
    noMove: function() {}
});