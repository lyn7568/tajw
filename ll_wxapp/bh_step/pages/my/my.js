var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var $this, app = getApp();

Page({
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        isIphoneX: !1,
        contantus: !1,
        interstitialAd: ""
    },
    onLoad: function(t) {
        ($this = this).data.img_url = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url, 
        this.setData({
            img_url: $this.data.img_url,
            yundong: $this.data.img_url + "/yundong.png",
            dbjl: $this.data.img_url + "/dbjl.png"
        });
    },
    closePop: function() {
        this.setData({
            contantus: !1
        });
    },
    contantus: function() {
        this.setData({
            contantus: !0
        });
    },
    onReady: function() {
        wx.getSystemInfo({
            success: function(t) {
                if ("ios" == t.platform) {
                    $this.setData({
                        isIphone: !0
                    });
                    -1 < t.model.indexOf("iPhone X") && $this.setData({
                        isIphoneX: !0
                    });
                }
            }
        }), _tools2.default.request({
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
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/my",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                $this.setData(t.info), wx.createInterstitialAd && t.info.screen_ad && 2 == t.info.screen_switch && "" == $this.data.interstitialAd && ($this.data.interstitialAd = wx.createInterstitialAd({
                    adUnitId: t.info.screen_ad
                }), $this.data.interstitialAd.onError(function(t) {
                    console.log(t);
                }), $this.data.interstitialAd.show().catch(function(t) {
                    console.error(t);
                }));
            }
        });
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
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../task/task"
        });
    },
    showVoucher: function() {
        wx.navigateTo({
            url: "../voucher/voucher"
        });
    },
    gotoMyOrder: function() {
        wx.navigateTo({
            url: "../order/order"
        });
    },
    tapAdBanner: function() {
        wx.navigateTo({
            url: "../step-diary/step-diary"
        });
    },
    onGotUserInfo: function() {
        0 < this.data.friends_num && wx.navigateTo({
            url: "../firends/firends"
        });
    },
    gotoMyIncomeDetail: function() {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    gototreasure: function() {
        wx.navigateTo({
            url: "../treasure/record/record"
        });
    },
    gotoRanking: function() {
        wx.navigateTo({
            url: "../wealthRank/wealthRank"
        });
    },
    gotoproblem: function() {
        wx.navigateTo({
            url: "../question/question?a=questionList"
        });
    },
    getUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? _tools2.default.request({
            method: "get",
            url: "entry/wxapp/register",
            data: {
                token: wx.getStorageSync("token"),
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv
            },
            success: function(t) {
                $this.onShow();
            }
        }) : console.log("用户拒绝了");
    },
    advjump: function(t) {
        var e = t.currentTarget.dataset.index, n = this.data.jump[e];
        2 == n.type ? wx.navigateTo({
            url: n.path,
            fail: function(t) {
                wx.switchTab({
                    url: n.path
                });
            }
        }) : wx.navigateToMiniProgram({
            appId: n.appid,
            path: n.path,
            success: function(t) {
                console.log("success");
            },
            fail: function(t) {
                wx.showModal({
                    title: "",
                    content: t.errMsg,
                    showCancel: !1
                });
            }
        });
    },
    onGenQrc: function() {
        wx.scanCode({
            success: function(t) {
                var e, n = wx.getStorageSync("token"), o = (_defineProperty(e = {
                    trd_session: n
                }, "trd_session", n), _defineProperty(e, "voucher", t.result), e);
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/writeoff",
                    data: o,
                    success: function(t) {
                        wx.showToast({
                            title: "核销成功"
                        });
                    }
                });
            }
        });
    }
});