function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../util/wx-promisify/wx-promisify.js")), s = e(require("./canvas-palette.js")), a = (0, 
t.default)(wx.saveImageToPhotosAlbum);

exports.default = {
    doCreateImg: function(e) {
        var o = e.data;
        e.setData({
            template: new s.default({
                bgImg: o.goods_share_img,
                logo: o.logo,
                goodsImg: o.goodsImg,
                userIcon: o.head,
                qrCodeImg: o.qrcodeUrl,
                inviteTip: "我用" + o.money + "元兑换这个宝贝，扫码来一起领",
                goodsName: o.goodsName,
                goodsPrice: "价值 ￥" + o.goodsPrice,
                xcx_title: o.xcx_title,
                money: o.money
            }).palette()
        });
    },
    createImgScuess: function(o, e) {
        o.imagePath = e.detail.path, wx.hideLoading(), console.log("=====生成图片成功========="), 
        a({
            filePath: o.imagePath
        }).then(function() {
            wx.showToast({
                title: "保存图片成功！",
                icon: "none"
            });
        }).catch(function(e) {
            console.log("保存图片失败了:" + JSON.stringify(e)), console.log(e), -1 != e.errMsg.indexOf("auth") && o.setData({
                requestAuthType: 2,
                isShowOpensettingDialog: !0
            });
        });
    },
    createImgFail: function(e) {
        wx.hideLoading(), wx.showToast({
            title: "生成图片失败",
            icon: "none"
        }), console.error("=======生成图片失败=======:" + JSON.stringify(e));
    }
};