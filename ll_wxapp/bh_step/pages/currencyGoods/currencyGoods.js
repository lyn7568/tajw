var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

function goods(a) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/goods",
        data: {
            token: wx.getStorageSync("token"),
            id: a.data.id
        },
        success: function(t) {
            2 != t.info.goods.exchange_type && 3 != t.info.goods.exchange_type || wx.navigateTo({
                url: "../goods/goods?id=" + a.data.id
            }), wx.setNavigationBarTitle({
                title: t.info.goods.goods_name
            });
            for (var e = t.info.goods.invitation_list ? t.info.goods.invitation_list.length - 1 : 1, o = 0; o < t.info.goods.invitation_number; o++) e < o && (t.info.goods.invitation_list[o] = {
                member: {
                    nickname: "待邀请",
                    head: a.data.img_url + "/waitAdd.png"
                }
            });
            console.log(t.info.goods.invitation_list), a.setData(t.info);
        }
    });
}

function exchangeGoods(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/exchange",
        data: {
            token: wx.getStorageSync("token"),
            id: e.data.id
        },
        success: function(t) {
            2 == t.status ? wx.requestPayment({
                timeStamp: t.info.timeStamp,
                nonceStr: t.info.nonceStr,
                package: t.info.package,
                signType: t.info.signType,
                paySign: t.info.paySign,
                success: function(t) {
                    setTimeout(function() {
                        exchangeGoods(e);
                    }, 3e3);
                },
                fail: function(t) {
                    console.log(t);
                }
            }) : wx.navigateTo({
                url: "../order/order"
            });
        }
    });
}

Page({
    data: {
        id: 0,
        indicatorDots: !1,
        vertical: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        isScrollY: !0,
        current: 0,
        total: 0,
        isShowDialog: !1,
        isShowALLFriend: !1,
        goods: {},
        stepDetail: {},
        item: {},
        userLimitVO: {},
        oemType: "",
        oemId: "",
        productId: "",
        orderId: "",
        isEnoughCoin: !1,
        myCoin: 0,
        isShowInfo: !1,
        needToGetUserInfo: !1,
        authorizedUserInfo: {
            type: Boolean
        },
        isIphoneX: !1,
        isIphone: !1,
        from: "",
        isShowEmpty: !1,
        bgimage: "",
        is_qrcode: !1,
        author_show: 2,
        extra_info_tab: 1
    },
    onLoad: function(t) {
      var e = app.siteStep.sitebase + app.siteStep.img_url;
        if (this.setData({
            img_url: e
        }), this.setData({
            bgimage: e + "/step2gift/openFriend.png",
            waitAdd: e + "/waitAdd.png",
            mydialog: e + "/wechat/mydialog.png"
        }), that = this, t.scene) {
            var o = decodeURIComponent(t.scene).split("_");
            wx.setStorageSync("parent_id", o[0]), wx.setStorageSync("goods_id", o[1]), wx.setStorageSync("share_tpye", 4), 
            this.data.id = o[1], this.setData({
                is_qrcode: !0
            });
        }
        t.id && (this.data.id = t.id);
    },
    switchTab: function(t) {
        this.setData({
            extra_info_tab: t.target.dataset.extra
        });
    },
    onReady: function() {
        wx.getSystemInfo({
            success: function(t) {
                if ("ios" == t.platform) {
                    that.setData({
                        isIphone: !0
                    });
                    -1 < t.model.indexOf("iPhone X") && that.setData({
                        isIphoneX: !0
                    });
                }
            }
        });
    },
    onShow: function() {
        goods(that);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    swiperchange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    exchange: function() {
        1 != this.data.goods.type || this.data.address ? wx.showModal({
            title: "提示",
            content: "确定要兑换该商品",
            success: function(t) {
                t.confirm ? exchangeGoods(that) : t.cancel && console.log("用户点击取消");
            }
        }) : wx.navigateTo({
            url: "../address/address"
        });
    },
    gotoCreateShareImg: function() {
        wx.navigateTo({
            url: "../goodscreateimg/goodscreateimg?id=" + that.data.id
        });
    },
    onReachBottom: function() {},
    setAddress: function() {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.goods.share_title ? this.data.goods.share_title : "我在用[微信步数]换好礼,100%可领",
            imageUrl: that.data.goods.cover_image,
            path: "bh_step/pages/index/index?share_tpye=4&parent_id=" + that.data.member_id + "&goods_id=" + that.data.id
        };
    },
    closedialog: function() {
        this.setData({
            author_show: 2
        });
    },
    triggerALLFriend: function() {
        var t = !this.data.isShowALLFriend;
        if (t) var e = app.img_url + "/step2gift/packupFriend.png"; else e = app.img_url + "/step2gift/openFriend.png";
        this.setData({
            isShowALLFriend: t,
            bgimage: e
        });
    },
    getUserInfo: function(t) {
        if ("getUserInfo:ok" == t.detail.errMsg) {
            t.detail.userInfo;
            _tools2.default.request({
                method: "get",
                url: "entry/wxapp/register",
                data: {
                    token: wx.getStorageSync("token"),
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv
                },
                success: function(t) {
                    goods(that);
                }
            });
        } else console.log("用户拒绝了");
    }
});