App({
    onLaunch: function() {
        var e = wx.getUpdateManager();
        e.onCheckForUpdate(function(n) {
            console.log(n.hasUpdate);
        }), e.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(n) {
                    n.confirm && e.applyUpdate();
                }
            });
        }), e.onUpdateFailed(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本下载失败",
                showCancel: !1
            });
        });
    },
    onShow: function(n) {},
    onHide: function() {},
    onError: function(n) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    img_url: "addons/bh_step/template/image"
});