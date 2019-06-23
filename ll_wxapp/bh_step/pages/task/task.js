var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function load(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/task",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            t.info.adUnitId && (compareV(wx.getSystemInfoSync().SDKVersion, "2.0.4") && (e.data.videoAd = wx.createRewardedVideoAd({
                adUnitId: t.info.adUnitId
            })));
            e.setData(t.info);
        }
    });
}

function compareV(t, e) {
    if (t && e) {
        for (var a = t.split("."), o = e.split("."), n = Math.min(a.length, o.length), i = 0, s = 0; i < n && 0 == (s = parseInt(a[i]) - parseInt(o[i])); ) i++;
        return 0 <= (s = 0 != s ? s : a.length - o.length);
    }
    return console.log("版本号不能为空"), !1;
}

Page({
    data: {
        share_text: "",
        share_image: "",
        img_url: "",
        videoAd: "",
        v_id: 0,
        v_is_complete: 0
    },
    onLoad: function(t) {
        $this = this;
        var e = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: e,
            task_icon1: e + "/step2gift/task_icon1.png",
            task_icon3: e + "/step2gift/phone.jpg",
            task_icon2: e + "/step2gift/task_icon2.png",
            task_icon4: e + "/step2gift/kefu.png",
            bc_img: e + "/wechat/coinview/bc.png",
            coin_img: e + "/step2gift/coin.png"
        });
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
        var t = wx.getStorageSync("task");
        (console.log(t), t) ? (2e4 < Date.parse(new Date()) - t.time ? _tools2.default.request({
            method: "get",
            url: "entry/wxapp/taskComplete",
            data: {
                token: wx.getStorageSync("token"),
                task_id: t.id,
                form: 1
            },
            success: function(t) {
                load($this);
            }
        }) : wx.showModal({
            title: "温馨提示",
            content: "需要超过20秒才能获得奖励哦",
            showCancel: !1,
            success: function(t) {}
        }), wx.removeStorageSync("task")) : load($this);
    },
    gotoCoinDetail: function() {
        wx.navigateTo({
            url: "../currencylog/currencylog"
        });
    },
    onHide: function() {},
    videoAdShow: function(t) {
        var e = this;
        if (this.data.videoAd) if (compareV(wx.getSystemInfoSync().SDKVersion, "2.0.4")) {
            var a = t.currentTarget.dataset.id, o = t.currentTarget.dataset.is_complete;
            this.setData({
                v_id: a,
                v_is_complete: o
            }), this.data.videoAd.show(), this.data.videoAd.onClose(function(t) {
                e.data.videoAd && (e.data.videoAd.offClose(), (t && t.isEnded || void 0 === t) && 0 == $this.data.v_is_complete && _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/taskComplete",
                    data: {
                        token: wx.getStorageSync("token"),
                        task_id: $this.data.v_id,
                        form: 1
                    },
                    success: function(t) {
                        load($this);
                    }
                }));
            });
        } else wx.showModal({
            title: "提示",
            mask: !0,
            content: "您的微信版本过低,暂时不支持",
            showCancel: !1
        });
    },
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
    bindsuccess: function(t) {
        var e = t.currentTarget.dataset.id;
        if (0 == t.currentTarget.dataset.is_complete) {
            var a = {
                id: e,
                time: Date.parse(new Date())
            };
            wx.setStorageSync("task", a), _tools2.default.request({
                method: "get",
                url: "entry/wxapp/taskClick",
                data: {
                    token: wx.getStorageSync("token"),
                    task_id: e
                },
                success: function(t) {}
            });
        }
    },
    gotoH5: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.is_complete;
        if (console.log(a), 0 == a) {
            var o = {
                id: e,
                time: Date.parse(new Date())
            };
            wx.setStorageSync("task", o);
        }
        var n = t.currentTarget.dataset.path;
        wx.navigateTo({
            url: "../web/web?path=" + n
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/taskClick",
            data: {
                token: wx.getStorageSync("token"),
                task_id: e
            },
            success: function(t) {}
        });
    },
    bindfail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.complete;
        console.log(e), console.log(a);
    },
    startTask: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.task[e], o = {
            id: this.data.task[e].id,
            time: Date.parse(new Date())
        };
        0 == a.is_complete && wx.setStorageSync("task", o), wx.navigateToMiniProgram({
            appId: a.appid,
            path: a.path,
            extraData: {},
            envVersion: "release",
            success: function(t) {},
            fail: function(t) {
                wx.removeStorageSync("task");
            }
        });
    },
    getPhoneNumber: function(t) {
        console.log(t), "getPhoneNumber:ok" == t.detail.errMsg && _tools2.default.request({
            method: "get",
            url: "entry/wxapp/bindPhone",
            data: {
                token: wx.getStorageSync("token"),
                encryptedData: t.detail.encryptedData,
                iv: t.detail.iv
            },
            success: function(t) {
                load($this);
            }
        });
    }
});