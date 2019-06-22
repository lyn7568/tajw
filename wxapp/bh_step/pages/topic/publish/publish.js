var _tools = require("../../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

Page({
    data: {
        picHeight: "",
        popular_id: "",
        select_topic: "",
        imgs: [],
        allocation: "",
        topic_image_number: 9
    },
    onLoad: function(t) {
        that = this, wx.createSelectorQuery().select(".addPic").boundingClientRect(function(t) {
            that.setData({
                picHeight: t.width
            });
        }).exec(), t.popular_id && that.setData({
            popular_id: t.popular_id
        });
    },
    onReady: function() {},
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topic",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
            }
        }), that.data.popular_id && _tools2.default.request({
            method: "get",
            url: "entry/wxapp/topicInfo",
            data: {
                token: wx.getStorageSync("token"),
                id: that.data.popular_id
            },
            success: function(t) {
                that.setData({
                    select_topic: t.info.topic
                });
            }
        });
    },
    selectTopic: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index;
        this.setData({
            popular_id: a,
            select_topic: this.data.popular[e]
        });
    },
    delselect: function() {
        this.setData({
            popular_id: "",
            select_topic: ""
        });
    },
    delImage: function(t) {
        var a = t.currentTarget.dataset.index;
        that.data.imgs.splice(a, 1), that.setData({
            imgs: that.data.imgs
        });
    },
    bindinpt: function(t) {
        this.data.allocation = t.detail.value;
    },
    release: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/release",
            data: {
                token: wx.getStorageSync("token"),
                popular_id: that.data.popular_id,
                allocation: that.data.allocation,
                imgs: that.data.imgs
            },
            success: function(t) {
                wx.navigateTo({
                    url: "/bh_step/pages/topic/index/index"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: that.data.share.text,
            path: that.data.share.path
        };
    },
    addImg: function() {
        var e = this;
        e.data.imgs.length >= e.data.topic_image_number ? wx.showToast({
            icon: "none",
            title: "最多只能上传" + e.data.topic_image_number + "张图"
        }) : wx.chooseImage({
            count: 1,
            success: function(t) {
                var a = [];
                console.log(e.data.imgs), e.data.imgs && (a = e.data.imgs), t.tempFiles.forEach(function(t) {}), 
                _tools2.default.upload(t.tempFiles[0].path, function(t) {
                    a.push(t.info), e.setData({
                        imgs: a
                    });
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});