var t = getApp();

Page({
    data: {},
    onShow: function() {
        t.util.checkOauth();
    },
    onLoad: function() {
        var a = this;
        t.util.request({
            url: "wmall/member/mine",
            success: function(e) {
                var i = e.data.message;
                if (i.errno) t.util.toast(i.message, "", 3e3); else {
                    if (1 != (i = i.message).is_use_diy) t.WxParse.wxParse("copyright", "html", i.config.mall.copyright, a, 0); else {
                        var o = i.diy.data.items;
                        for (var n in o) "richtext" == o[n].id && t.WxParse.wxParse("richtext." + n, "html", o[n].params.content, a, 5);
                        wx.setNavigationBarTitle({
                            title: i.diy.data.page.title
                        }), wx.setNavigationBarColor({
                            frontColor: i.diy.data.page.navigationtextcolor,
                            backgroundColor: i.diy.data.page.navigationbackground
                        });
                    }
                    a.setData(i);
                }
            }
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onJsEvent: function(a) {
        t.util.jsEvent(a);
    }
});