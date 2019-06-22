(0, require("../common/component").VantComponent)({
    relation: {
        name: "tabbar-item",
        type: "descendant",
        linked: function(t) {
            var e = this;
            this.data.items.push(t), setTimeout(function() {
                e.setActiveItem();
            });
        },
        unlinked: function(t) {
            var e = this;
            this.data.items = this.data.items.filter(function(e) {
                return e !== t;
            }), setTimeout(function() {
                e.setActiveItem();
            });
        }
    },
    props: {
        active: Number,
        fixed: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    data: {
        items: [],
        currentActive: -1
    },
    watch: {
        active: function(t) {
            this.setData({
                currentActive: t
            }), this.setActiveItem();
        }
    },
    created: function() {
        this.setData({
            currentActive: this.data.active
        });
    },
    methods: {
        setActiveItem: function() {
            var t = this;
            this.data.items.forEach(function(e, i) {
                e.setActive(i === t.data.currentActive);
            });
        },
        onChange: function(t) {
            var e = this.data.items.indexOf(t);
            e !== this.data.currentActive && -1 !== e && (this.$emit("change", e), this.setData({
                currentActive: e
            }), this.setActiveItem());
        }
    }
});