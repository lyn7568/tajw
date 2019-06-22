var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var $this, app = getApp();

function suspension(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/suspension",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData({
                suspension: t.info,
                my_currency: t.info.my_currency,
                today: t.info.toady
            });
        }
    });
}

function bag_share(e) {
    _tools2.default.request({
        method: "get",
        url: "entry/wxapp/shareBag",
        data: {
            token: wx.getStorageSync("token")
        },
        success: function(t) {
            e.setData({
                bag_share: t.info,
                bag_unlock: !0
            });
        }
    });
}

function load(e) {
    var t = wx.getStorageSync("task");
    t ? (2e4 < Date.parse(new Date()) - t.time ? _tools2.default.request({
        method: "get",
        url: "entry/wxapp/taskComplete",
        data: {
            token: wx.getStorageSync("token"),
            task_id: t.id
        },
        success: function(t) {
            e.setData({
                activated: !0,
                isTask: !1
            }), suspension(e);
        }
    }) : wx.showModal({
        title: "温馨提示",
        content: "需要超过20秒才能获得奖励哦",
        showCancel: !1,
        success: function(t) {}
    }), wx.removeStorageSync("task")) : suspension(e);
    wx.getWeRunData({
        success: function(t) {
            setTimeout(function() {
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/updateStep",
                    data: {
                        token: wx.getStorageSync("token"),
                        encryptedData: t.encryptedData,
                        iv: t.iv
                    },
                    success: function(t) {
                        suspension(e);
                    }
                });
            }, 1e3);
        }
    });
}

function compareV(t, e) {
    if (t && e) {
        for (var a = t.split("."), s = e.split("."), i = Math.min(a.length, s.length), o = 0, n = 0; o < i && 0 == (n = parseInt(a[o]) - parseInt(s[o])); ) o++;
        return 0 <= (n = 0 != n ? n : a.length - s.length);
    }
    return console.log("版本号不能为空"), !1;
}

Page({
    data: {
        sigin: "",
        remind: 0,
        bgShow: !1,
        isBag: !1,
        suspension: "",
        share_text: "",
        share_image: "",
        share_tpye: 1,
        parent_id: 0,
        goods_id: 0,
        dialogState: 1,
        giveShow: !1,
        give_status: 1,
        cut_step: 0,
        activated: !1,
        author_show: 2,
        mydialog: "",
        ad_pop: 0,
        receive_bg: 1,
        is_receive: 1,
        activation: "",
        showAddMeBtn: !0,
        guide_add_applet: "",
        sDKVersion: 0,
        videoAd: "",
        task_index: 0
    },
    onLoad: function(t) {
        if ($this = this, t.scene && ($this.data.parent_id = decodeURIComponent(t.scene), 
        wx.setStorageSync("parent_id", $this.data.parent_id)), t.parent_id && (wx.setStorageSync("parent_id", t.parent_id), 
        $this.data.parent_id = t.parent_id), t.topic) {
            var e = t.source_id ? t.source_id : 0, a = "/bh_step/pages/topic/index/index";
            return 2 == t.topic ? a = "/bh_step/pages/topic/topicDetail/topicDetail?id=" + e : 3 == t.topic ? a = "/bh_step/pages/topic/detail/detail?id=" + e : 4 == t.topic && (a = "/bh_step/pages/topic/user/user?id=" + e), 
            void wx.navigateTo({
                url: a
            });
        }
        var s = app.siteInfo.siteroot.replace(/app\/index.php/, "") + app.img_url;
        this.setData({
            img_url: s,
            mydialog: s + "/wechat/mydialog.png",
            add_new_icon: s + "/add_new_icon.png"
        }), t.share_tpye && (wx.setStorageSync("share_tpye", t.share_tpye), $this.data.share_tpye = t.share_tpye), 
        t.goods_id && (wx.setStorageSync("goods_id", t.goods_id), $this.data.goods_id = t.goods_id), 
        t.activation && (this.data.activation = t.activation);
    },
    videoAdShow: function() {
        var e = this;
        this.data.videoAd && (compareV(wx.getSystemInfoSync().SDKVersion, "2.0.4") ? (this.data.videoAd.show(), 
        this.data.videoAd.onClose(function(t) {
            e.data.videoAd && (e.data.videoAd.offClose(), (t && t.isEnded || void 0 === t) && _tools2.default.request({
                method: "get",
                url: "entry/wxapp/taskComplete",
                data: {
                    token: wx.getStorageSync("token"),
                    task_id: $this.data.suspension.videoAd.id,
                    form: 1
                },
                success: function(t) {
                    suspension($this);
                }
            }));
        })) : wx.showModal({
            title: "提示",
            mask: !0,
            content: "您的微信版本过低,暂时不支持",
            showCancel: !1
        }));
    },
    onShow: function() {
        var t = {
            token: wx.getStorageSync("token"),
            activation: this.data.activation
        };
        0 < $this.data.goods_id && $this.data.parent_id && 3 == $this.data.share_tpye && (t.goods_id = $this.data.goods_id, 
        t.parent_id = $this.data.parent_id), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/index",
            data: t,
            success: function(t) {
                ($this.setData(t.info), t.info.adUnitId) && (compareV(wx.getSystemInfoSync().SDKVersion, "2.0.4") && wx.createRewardedVideoAd && ($this.data.videoAd = wx.createRewardedVideoAd({
                    adUnitId: t.info.adUnitId
                })));
                $this.setData({
                    remind: t.info.bag.is_remind
                }), wx.setNavigationBarTitle({
                    title: t.info.xcx_title
                }), $this.setData({
                    invitation: t.info.invitation
                }), $this.setData({
                    my_currency: t.info.member.currency
                }), $this.setData({
                    share: t.info.share
                }), $this.setData({
                    member_id: t.info.member.id
                }), $this.setData({
                    give_step: t.info.give_step,
                    giveShow: !0
                }), wx.getStorageSync("showAddMeFlag" + t.info.time) || $this.setData({
                    showAddMeBtn: !0
                }), 1 != t.info.bag.bag_remind_switch || wx.getStorageSync("remind_switch" + t.info.time) || (wx.setStorageSync("remind_switch" + t.info.time, 1), 
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/bgRemind",
                    data: {
                        token: wx.getStorageSync("token")
                    },
                    success: function(t) {
                        $this.setData({
                            remind: 1
                        });
                    }
                })), !wx.getStorageSync("ad_pop" + t.info.time) && 1 != $this.data.author_show && t.info.advertisement.ad_pop && ($this.setData({
                    ad_pop: 1
                }), wx.setStorageSync("ad_pop" + t.info.time, 1)), load($this);
            }
        });
    },
    web_jump: function(t) {
        wx.navigateTo({
            url: "../web/web?path=" + t.currentTarget.dataset.path
        });
    },
    onClickAddToMinProgramCloseBtn: function() {
        wx.setStorageSync("showAddMeFlag" + this.data.time, !0), this.setData({
            showAddMeBtn: !1
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
                    suspension($this);
                }
            });
        } else console.log("用户拒绝了");
    },
    receive: function(t) {
        if (1 == this.data.is_receive) {
            this.data.is_receive = 2;
            var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.source, s = wx.createInnerAudioContext();
            s.autoplay = !0, s.src = this.data.img_url + "/coin.mp3", console.log(s.src), s.onPlay(function() {
                console.log("开始播放");
            }), s.onError(function(t) {
                console.log(t.errMsg), console.log(t.errCode);
            }), _tools2.default.request({
                method: "get",
                url: "entry/wxapp/receive",
                data: {
                    token: wx.getStorageSync("token"),
                    id: e,
                    formid: t.detail.formId
                },
                success: function(t) {
                    $this.data.is_receive = 1, 2 != t.status ? (3 == a && wx.navigateTo({
                        url: "../sigin/sigin"
                    }), suspension($this)) : wx.showModal({
                        title: "提示",
                        mask: !0,
                        content: t.info,
                        showCancel: !1
                    });
                }
            });
        }
    },
    showBg: function() {
        console.log($this.data.is_bag), 0 != $this.data.bag.is_bag || $this.data.bgShow ? bag_share($this) : $this.setData({
            bgShow: !0
        });
    },
    gotoClosePop: function() {
        $this.setData({
            bag_unlock: !1
        });
    },
    receive_bg: function(t) {
        if (1 != this.data.receive_bg) return !1;
        this.data.receive_bg = 2;
        var e = {
            frequency: t.currentTarget.dataset.index,
            token: wx.getStorageSync("token")
        };
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/bag",
            data: e,
            success: function(t) {
                $this.data.receive_bg = 1, 2 == t.status ? t.info == "您的" + $this.data.currency_name + "不足" ? wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: t.info,
                    showCancel: !1,
                    confirmText: "获取",
                    success: function(t) {
                        wx.navigateTo({
                            url: "../task/task"
                        });
                    }
                }) : wx.showModal({
                    title: "提示",
                    mask: !0,
                    content: t.info,
                    showCancel: !1
                }) : ($this.data.bag.is_bag = 1, $this.setData({
                    bag: $this.data.bag
                }), 1 < e.frequency ? bag_share($this) : $this.setData({
                    isBag: !0,
                    bgShow: !1,
                    bag_cash: t.info
                }));
            }
        });
    },
    showBagShare: function() {
        $this.setData({
            bgShow: !1,
            isBag: !1
        }), bag_share($this);
    },
    onCloseClick: function() {
        this.setData({
            bgShow: !1,
            isBag: !1,
            giveShow: !1
        });
    },
    hide: function() {
        $this.setData({
            bgShow: !1,
            isBag: !1
        });
    },
    onReady: function() {},
    onHide: function() {},
    bgRemind: function() {
        var e = $this.data.remind ? 1 : 2;
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/bgRemind",
            data: {
                token: wx.getStorageSync("token"),
                type: e
            },
            success: function(t) {
                $this.setData({
                    remind: 1 == e ? 0 : 1
                });
            }
        });
    },
    tapcut: function() {
        var t = {
            token: wx.getStorageSync("token"),
            goods_id: this.data.goods_id,
            parent_id: this.data.parent_id
        };
        console.log(141515), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/give",
            data: t,
            success: function(t) {
                $this.setData({
                    give_status: 2
                }), $this.setData({
                    cut_step: t.info
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        if (console.log(t), null != t.target && "bag" == t.target.dataset.type) var e = $this.data.share.bag.share_text, a = $this.data.share.bag.share_image, s = "bh_step/pages/index/index?share_tpye=2&parent_id=" + $this.data.member_id; else e = $this.data.share.ordinary.share_text, 
        a = $this.data.share.ordinary.share_image, s = "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id;
        return {
            title: e,
            path: s,
            imageUrl: a,
            success: function(t) {
                t.errMsg;
            }
        };
    },
    bindsuccess: function() {
        var t = this.data.suspension.task[this.data.task_index].id, e = {
            id: t,
            time: Date.parse(new Date())
        };
        wx.setStorageSync("task", e), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/taskClick",
            data: {
                token: wx.getStorageSync("token"),
                task_id: t
            },
            success: function(t) {}
        });
    },
    bindfail: function() {
        console.log(45454545);
    },
    goToH5: function() {
        var t = this.data.suspension.task[this.data.task_index].id, e = {
            id: t,
            time: Date.parse(new Date())
        };
        wx.setStorageSync("task", e), wx.navigateTo({
            url: "../web/web?path=" + $this.data.suspension.task[this.data.task_index].path
        }), _tools2.default.request({
            method: "get",
            url: "entry/wxapp/taskClick",
            data: {
                token: wx.getStorageSync("token"),
                task_id: t
            },
            success: function(t) {}
        });
    },
    clickAD: function() {
        var e = this.data.suspension.task[this.data.task_index].id, t = {
            id: e,
            time: Date.parse(new Date())
        };
        wx.setStorageSync("task", t), wx.navigateToMiniProgram({
            appId: $this.data.suspension.task[this.data.task_index].appid,
            path: $this.data.suspension.task[this.data.task_index].path,
            extraData: {},
            envVersion: "release",
            success: function(t) {
                _tools2.default.request({
                    method: "get",
                    url: "entry/wxapp/taskClick",
                    data: {
                        token: wx.getStorageSync("token"),
                        task_id: e
                    },
                    success: function(t) {}
                });
            },
            fail: function(t) {
                wx.removeStorageSync("task");
            }
        });
    },
    showdialog: function(t) {
        this.setData({
            task_index: t.target.dataset.index
        }), this.setData({
            isTask: !0,
            activated: !1
        });
    },
    closedialog: function() {
        this.setData({
            isTask: !1
        }), this.setData({
            isshow_sigin: !1
        }), this.setData({
            author_show: !1
        }), this.setData({
            ad_pop: 0
        });
    },
    showSigin: function() {
        wx.navigateTo({
            url: "../sigin/sigin"
        });
    },
    sendPushTime: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/signinRemind",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                $this.data.sigin.is_remind = 1, $this.setData({
                    sigin: $this.data.sigin
                });
            }
        });
    },
    advjump: function(t) {
        var e = t.currentTarget.dataset.type;
        if ("upper" == e) var a = t.currentTarget.dataset.index, s = this.data.advertisement.upper[a]; else if ("ad_pop" == e) s = this.data.advertisement.ad_pop; else s = this.data.advertisement.home_middle;
        2 == s.type && wx.navigateTo({
            url: s.path,
            fail: function(t) {
                wx.switchTab({
                    url: s.path
                });
            }
        });
    },
    goodsDetails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.etype, s = 2 == a || 3 == a ? "../goods/goods?id=" : "../currencyGoods/currencyGoods?id=";
        wx.navigateTo({
            url: s + e
        });
    },
    shareGoods: function() {
        var t = this.data.give_step.goods.id;
        wx.navigateTo({
            url: "../goods/goods?id=" + t
        });
    },
    gotoproblem: function() {
        wx.navigateTo({
            url: "../question/question?a=currency"
        });
    }
});