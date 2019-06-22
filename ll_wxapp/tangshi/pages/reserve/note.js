var e = getApp(), t = require("../../../static/js/utils/underscore.js");

Page({
    data: {
        invoiceId: 0
    },
    onLoad: function(a) {
        var i = this;
        i.data.sid = a.sid, e.util.request({
            url: "wmall/store/reserve/note",
            data: {
                sid: a.sid
            },
            success: function(s) {
                var o = s.data.message.message, n = {
                    order_note: o.store.order_note,
                    invoice_status: o.store.invoice_status,
                    invoiceId: a.invoiceId,
                    sid: o.store.id
                };
                (n = t.extend(n, e.util.getStorageSync("reserve.note"))).invoice_status && (n.invoices = o.invoices), 
                i.setData(n);
            }
        });
    },
    onNote: function(e) {
        this.setData({
            note: e.detail.value
        });
    },
    onChooseInvoice: function(e) {
        var t = this, a = e.currentTarget.dataset.id;
        t.setData({
            invoiceId: a
        });
    },
    onChooseLabel: function(e) {
        var t = this, a = t.data.note;
        a || (a = ""), a = a + " " + e.currentTarget.dataset.note, t.setData({
            note: a
        });
    },
    onSubmit: function(a) {
        var i = this, s = {
            note: i.data.note,
            invoiceId: i.data.invoiceId
        }, o = e.util.getStorageSync("reserve.extra");
        o && (o = t.extend(o, s)), e.util.setStorageSync("reserve.extra", o), e.util.setStorageSync("reserve.note", s), 
        wx.redirectTo({
            url: "./create?sid=" + i.data.sid
        });
    }
});