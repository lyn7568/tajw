var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var that, app = getApp();

Page({
    data: {
        pointList: [],
        prizeList: [],
        color1: "#BA52ED",
        color2: "#3FC1C9",
        prizeSelectColor: "orange",
        prizeDefaultColor: "white",
        prizeIndex: 0,
        isRunning: !1,
        prizeImgs: [ "../../imgs/HOU.png", "../../imgs/BOS.png", "../../imgs/CHI.png", "../../imgs/CLE.png", "../../imgs/GSW.png", "../../imgs/LAC.png", "../../imgs/LAL.png", "../../imgs/OKC.png", "../../imgs/SAS.png" ],
        inPrize: [],
        inPrizeIndex: 0,
        isPrizeShow: !1,
        isPrizeRule: !1,
        address: !1
    },
    onShow: function() {
        _tools2.default.request({
            method: "get",
            url: "entry/wxapp/turntable",
            data: {
                token: wx.getStorageSync("token")
            },
            success: function(t) {
                that.setData(t.info);
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
                }), that.setData(t.info);
            }
        });
    },
    onLoad: function() {
        for (var t = that = this, e = 7.5, i = 7.5, a = [], n = 0; n < 24; n++) {
            if (0 === n) e = i = 15; else if (n < 6) i = 7.5, e += 102.5; else if (6 == n) i = 15, 
            e = 620; else if (n < 12) i += 94, e = 620; else if (12 == n) i = 565, e = 620; else if (n < 18) i = 570, 
            e -= 102.5; else if (18 == n) i = 565, e = 15; else {
                if (!(n < 24)) return;
                i -= 94, e = 7.5;
            }
            a.push({
                topPoint: i,
                leftPoint: e
            });
        }
        this.setData({
            pointList: a
        }), setInterval(function() {
            "#BA52ED" === t.data.color1 ? t.setData({
                color1: "#3FC1C9",
                color2: "#BA52ED"
            }) : t.setData({
                color1: "#BA52ED",
                color2: "#3FC1C9"
            });
        }, 800);
        for (var o = [], s = 0, r = 46, l = 0; l < 8; l++) {
            0 === l ? (s = 10, r = 5) : l < 3 ? (s = s, r += 186) : l < 5 ? (r = r, s += 156) : l < 7 ? (r -= 186, 
            s = s) : l < 8 && (r = r, s -= 156);
            var u = t.data.prizeImgs[l];
            o.push({
                topPrize: s,
                leftPrize: r,
                prizeImg: u
            });
        }
        console.log(o), t.setData({
            prizeList: o
        });
    },
    startGame: function() {
        if (!0 !== this.data.isRunning) {
            this.setData({
                isRunning: !0
            });
            var n = this;
            _tools2.default.request({
                method: "get",
                url: "entry/wxapp/prize",
                data: {
                    token: wx.getStorageSync("token")
                },
                success: function(t) {
                    if (1 != t.status) return wx.showToast({
                        icon: "none",
                        title: t.info
                    }), void n.setData({
                        isRunning: !1
                    });
                    for (var e in n.data.turntable) n.data.turntable[e].id == t.info && n.setData({
                        inPrizeIndex: e,
                        inPrize: n.data.turntable[e]
                    });
                    var i = 0, a = setInterval(function() {
                        i += 30;
                        var t = n.data.prizeIndex % 8;
                        n.setData({
                            prizeIndex: t
                        }), 900 <= i && n.data.inPrizeIndex == t && (clearInterval(a), n.onShow(), n.setData({
                            isPrizeShow: !0,
                            isRunning: !1
                        })), n.data.prizeIndex++;
                    }, 200 + i);
                }
            });
        }
    },
    onClose: function() {
        this.setData({
            isPrizeShow: !1,
            isPrizeRule: !1
        });
    },
    onRuleShow: function() {
        this.setData({
            isPrizeRule: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: that.data.share_text,
            imageUrl: that.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + that.data.member.id
        };
    },
    gotoLog: function() {
        wx.navigateTo({
            url: "../turntableLog/turntableLog"
        });
    }
});