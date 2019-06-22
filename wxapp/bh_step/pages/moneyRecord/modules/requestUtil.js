var e = require("./../../../utils/request.js").request;

module.exports = {
    requestRecordData: function(s, u) {
        e({
            funid: 69,
            data: {
                vPageNum: s,
                vPageSize: 15
            },
            success: function(e) {
                u && u.success(e);
            },
            fail: function(e) {
                u && u.fail(e);
            }
        });
    }
};