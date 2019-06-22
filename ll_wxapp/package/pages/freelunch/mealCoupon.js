var a = getApp();

Page({
    data: {
        status: 0,
        participants_part: {
            loaded: 0,
            empty: 0,
            data: []
        },
        participants_prize: {
            loaded: 0,
            empty: 0,
            data: []
        },
        min_part: 0,
        min_prize: 0
    },
    onLoad: function(a) {
        var t = this;
        t.onGetParticipants(0), t.onGetParticipants(1);
    },
    onJsEvent: function(t) {
        a.util.jsEvent(t);
    },
    onChange: function(a) {
        var t = this, i = a.currentTarget.dataset.index;
        t.setData({
            status: i
        });
    },
    onSwiper: function(a) {
        var t = this, i = a.detail.current;
        t.setData({
            status: i
        });
    },
    onGetParticipants: function(t) {
        var i = this;
        if (0 == t && -1 == i.data.min_part) return !1;
        if (1 == t && -1 == i.data.min_prize) return !1;
        a.util.request({
            url: "freeLunch/mealCoupon",
            data: {
                status: t,
                min: t ? i.data.min_prize : i.data.min_part
            },
            success: function(a) {
                if (0 == t) {
                    n = i.data.participants_part.data.concat(a.data.message.message);
                    i.data.participants_part.data = n, n.length || (i.data.participants_part.empty = 1), 
                    (!(r = a.data.message.min) && n.length > 0 || r && n.length < 15) && (i.data.participants_part.loaded = 1), 
                    r || (r = -1), console.log("参与记录"), console.log(i.data.participants_part);
                    var e = Math.max(66 * n.length + 30, 450);
                    i.setData({
                        participants_part: i.data.participants_part,
                        activity: a.data.message.activity,
                        rewards: a.data.message.rewards,
                        min_part: r,
                        part_height: e
                    });
                } else {
                    var n = i.data.participants_prize.data.concat(a.data.message.message);
                    i.data.participants_prize.data = n, n.length || (i.data.participants_prize.empty = 1);
                    var r = a.data.message.min;
                    (!r && n.length > 0 || r && n.length < 15) && (i.data.participants_prize.loaded = 1), 
                    r || (r = -1);
                    var s = Math.max(66 * n.length + 30, 450);
                    console.log("中奖记录"), console.log(i.data.participants_prize), i.setData({
                        participants_prize: i.data.participants_prize,
                        activity: a.data.message.activity,
                        rewards: a.data.message.rewards,
                        min_prize: r,
                        prize_height: s
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var a = this;
        a.data.status = 0, a.data.participants_part = {
            loaded: 0,
            empty: 0,
            data: []
        }, a.data.participants_prize = {
            loaded: 0,
            empty: 0,
            data: []
        }, a.data.min_part = 0, a.data.min_prize = 0, a.onGetParticipants(0), a.onGetParticipants(1), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this;
        a.onGetParticipants(a.data.status);
    },
    onShareAppMessage: function() {}
});