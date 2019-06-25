var e = getApp(), t = require("../../../static/js/utils/underscore.js");

Page({
    data: {
        person: [ "1人", "2人", "3人" ],
        person_num: 1,
        invoiceId: 0
    },
    onLoad: function(a) {
        var n = this;
        n.data.sid = a.sid, e.util.request({
            url: "wmall/order/create/note",
            data: {
                sid: a.sid
            },
            success: function(o) {
                var i = o.data.message.message, s = {
                    order_note: i.store.order_note,
                    invoice_status: i.store.invoice_status,
                    invoiceId: a.invoiceId
                };
                (s = t.extend(s, e.util.getStorageSync("order.note"))).sid = n.data.sid, s.invoice_status && (s.invoices = i.invoices), 
                n.setData(s);
            }
        });
    },
    bindChange: function(e) {
        console.log(e), this.setData({
            person_num: parseInt(e.detail.value) + 1
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
        var n = this, o = {
            note: n.data.note,
            invoiceId: n.data.invoiceId,
            person_num: n.data.person_num
        }, i = e.util.getStorageSync("order.extra");
        i && (i = t.extend(i, o)), e.util.setStorageSync("order.extra", i), e.util.setStorageSync("order.note", o), 
        wx.redirectTo({
            url: "/pages/order/create/create?sid=" + n.data.sid
        });
    }
});