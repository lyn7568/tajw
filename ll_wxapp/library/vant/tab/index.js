(0, require("../common/component").VantComponent)({
    relation: {
        name: "tabs",
        type: "ancestor"
    },
    props: {
        title: String,
        disabled: Boolean
    },
    data: {
        inited: !1,
        active: !1
    },
    watch: {
        title: "update",
        disabled: "update"
    },
    methods: {
        update: function() {
            var t = this.getRelationNodes("../tabs/index")[0];
            t && t.updateTabs();
        }
    }
});