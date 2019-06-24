App({
    onLaunch: function() {
        console.log("=================onLaunch==================");
    },
    onShow: function() {
        console.log("=================onShow==================");
    },
    onHide: function() {},
    util: require("static/js/utils/util.js"),
    utilStep: require("we7/resource/js/util.js"),
    siteStep: require("sitestep.js"),
    WxParse: require("./library/wxParse/wxParse.js"),
    ext: {
        siteMain: {
            uniacid: "2",
            acid: "2",
            siteroot: "https://wmxcx.tzxfw.com/app/wxapp.php",
            sitebase: "https://wmxcx.tzxfw.com/app",
            module: "we7_wmall",
            version: "8.0"
        },
        diy: {
            home: 0
        }
    },
    navigator: {
        list: [ {
            link: "pages/home/index",
            icon: "icon-home"
        }, {
            link: "pages/order/index",
            icon: "icon-order"
        }, {
            link: "pages/member/mine",
            icon: "icon-mine"
        } ],
        position: {
            bottom: "80px"
        }
    }
});