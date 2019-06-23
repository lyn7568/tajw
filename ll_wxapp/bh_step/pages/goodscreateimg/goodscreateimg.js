var _tools = require("../../../util/tools.js"), _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var $this, app = getApp();

function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("./modules/base-canvas-palette.js")), n = e(require("../../../util/wx-promisify/wx-promisify.js")), d = e(require("./modules/handle-create-img.js")), h = ((0, 
n.default)(wx.getSetting), 0), p = 0;

Page({
    data: {
        isShowOpensettingDialog: !1,
        template: {},
        creatScuess: !1,
        share_text: "",
        share_image: "",
        img_url: "",
        isIphoneX: !1,
        id: 0,
        goodsImg: "",
        goodsName: "",
        goodsPrice: "",
        head: "",
        money: 0
    },
    onLoad: function(e) {
        $this = this, _tools2.default.request({
            method: "get",
            url: "entry/wxapp/poster",
            data: {
                token: wx.getStorageSync("token"),
                id: e.id
            },
            success: function(e) {
                $this.setData(e.info), console.log("=======生成图片收到的参数========"), $this.data.goodsImg = e.info.goods.cover_image, 
                $this.data.goodsName = e.info.goods.goods_name, $this.data.goodsPrice = e.info.goods.original_price, 
                $this.data.money = 0 < e.info.goods.money ? e.info.goods.money : 0, $this.handleSaveBtnClick();
            }
        }), wx.getSystemInfo({
            success: function(e) {
                if ("ios" == e.platform) {
                    $this.setData({
                        isIphone: !0
                    });
                    -1 < e.model.indexOf("iPhone X") && $this.setData({
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
            success: function(e) {
                wx.setNavigationBarTitle({
                    title: e.info.xcx_title
                }), $this.setData(e.info);
            }
        });
    },
    saveImgBtnClick: function() {
        wx.saveImageToPhotosAlbum({
            filePath: $this.imagePath,
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    handleSaveBtnClick: function() {
        wx.showLoading({
            title: "正在生成图片",
            mask: !0
        }), d.default.doCreateImg(this);
        try {
            getApp().sensors.track("XMClick", {
                ck_module: "保存图片",
                page: "步数日志"
            });
        } catch (e) {}
    },
    careteImg: function() {
        var e = this;
        wx.showLoading({
            title: "图片生成中",
            mask: !0
        }), e.setData({
            template: new t.default({
                bgImg: "https://img.xmiles.cn/bubuzhuan/goods-share-img-bg-2.png",
                logo: "https://img.xmiles.cn/bubuzhuan/goods-share-img-logo.png",
                goodsImg: e.data.goodsImg,
                userIcon: e.data.member.head,
                qrCodeImg: e.data.member.head,
                inviteTip: "我用" + e.data.money + "元兑换这个宝贝，扫码来一起领",
                goodsName: e.data.goodsName,
                goodsPrice: "价值 ￥" + e.data.goodsPrice
            }).palette()
        });
    },
    onImgOK: function(e) {
        console.log(e), console.log(0x650e124ef1c7), this.imagePath = e.detail.path, console.log(e), 
        this.setData({
            creatScuess: !0
        }), wx.hideLoading();
    },
    imgErr: function(e) {
        console.log(e), console.log(22222222222222), this.handleError();
    },
    onShow: function() {},
    openSettingBtnClick: function() {
        this.setData({
            isShowOpensettingDialog: !1
        });
    },
    onShareAppMessage: function() {
        return console.log("bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id), 
        {
            title: $this.data.share_text,
            imageUrl: $this.data.share_image,
            path: "bh_step/pages/index/index?share_tpye=1&parent_id=" + $this.data.member_id
        };
    },
    handleError: function() {
        wx.hideLoading(), wx.showToast({
            title: "失败了，请重试",
            icon: "none"
        });
    }
});