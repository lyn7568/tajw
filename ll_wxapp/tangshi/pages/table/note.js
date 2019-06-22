var t = getApp(), e = require("../../../static/js/utils/underscore.js");

Page({
    data: {
        person: [ "1人", "2人", "3人" ],
        invoiceId: 0
    },
    onLoad: function(a) {
        var i = this;
        i.data.sid = a.sid, t.util.request({
            url: "wmall/store/table/note",
            data: {
                sid: a.sid
            },
            success: function(o) {
                var n = o.data.message.message, s = {
                    order_note: n.store.order_note,
                    invoice_status: n.store.invoice_status,
                    invoiceId: a.invoiceId,
                    sid: n.store.id
                };
                (s = e.extend(s, t.util.getStorageSync("order.note"))).invoice_status && (s.invoices = n.invoices), 
                i.setData(s);
            }
        });
    },
    onNote: function(t) {
        this.setData({
            note: t.detail.value
        });
    },
    onChooseInvoice: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        e.setData({
            invoiceId: a
        });
    },
    onChooseLabel: function(t) {
        var e = this, a = e.data.note;
        a || (a = ""), a = a + " " + t.currentTarget.dataset.note, e.setData({
            note: a
        });
    },
    onSubmit: function(a) {
        var i = this, o = {
            note: i.data.note,
            invoiceId: i.data.invoiceId
        }, n = t.util.getStorageSync("order.extra");
        n && (n = e.extend(n, o)), t.util.setStorageSync("order.extra", n), t.util.setStorageSync("order.note", o), 
        wx.redirectTo({
            url: "./create?sid=" + i.data.sid + "&table_id=" + n.table_id
        });
    }
});