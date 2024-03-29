(0, require("../common/component").VantComponent)({
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            this.child.push(t), this.updateTabs(this.data.tabs.concat(t.data));
        },
        unlinked: function(t) {
            var e = this.child.indexOf(t), i = this.data.tabs;
            i.splice(e, 1), this.child.splice(e, 1), this.updateTabs(i);
        }
    },
    props: {
        color: String,
        lineWidth: {
            type: Number,
            value: -1
        },
        active: {
            type: Number,
            value: 0
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .2
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1
    },
    watch: {
        swipeThreshold: function() {
            this.setData({
                scrollable: this.child.length > this.data.swipeThreshold
            });
        },
        color: "setLine",
        lineWidth: "setLine",
        active: "setActiveTab"
    },
    beforeCreate: function() {
        this.child = [];
    },
    mounted: function() {
        this.setLine(), this.scrollIntoView();
    },
    methods: {
        updateTabs: function(t) {
            t = t || this.data.tabs, this.setData({
                tabs: t,
                scrollable: t.length > this.data.swipeThreshold
            }), this.setActiveTab();
        },
        trigger: function(t, e) {
            this.$emit(t, {
                index: e,
                title: this.data.tabs[e].title
            });
        },
        onTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.data.tabs[e].disabled ? this.trigger("disabled", e) : (this.trigger("click", e), 
            this.setActive(e));
        },
        setActive: function(t) {
            t !== this.data.active && (this.trigger("change", t), this.setData({
                active: t
            }), this.setActiveTab());
        },
        setLine: function() {
            var t = this;
            if ("line" === this.data.type) {
                var e = this.data, i = e.color, a = e.active, n = e.duration, s = e.lineWidth;
                this.getRect(".van-tab", !0).then(function(e) {
                    var c = e[a], r = -1 !== s ? s : c.width / 2, h = e.slice(0, a).reduce(function(t, e) {
                        return t + e.width;
                    }, 0);
                    h += (c.width - r) / 2, t.setData({
                        lineStyle: "\n            width: " + r + "px;\n            background-color: " + i + ";\n            -webkit-transform: translateX(" + h + "px);\n            -webkit-transition-duration: " + n + "s;\n            transform: translateX(" + h + "px);\n            transition-duration: " + n + "s;\n          "
                    });
                });
            }
        },
        setActiveTab: function() {
            var t = this;
            this.child.forEach(function(e, i) {
                var a = {
                    active: i === t.data.active
                };
                a.active && (a.inited = !0), a.active !== e.data.active && e.setData(a);
            }), this.setData({}, function() {
                t.setLine(), t.scrollIntoView();
            });
        },
        scrollIntoView: function() {
            var t = this;
            this.data.scrollable && this.getRect(".van-tab", !0).then(function(e) {
                var i = e[t.data.active], a = e.slice(0, t.data.active).reduce(function(t, e) {
                    return t + e.width;
                }, 0), n = i.width;
                t.getRect(".van-tabs__nav").then(function(e) {
                    var i = e.width;
                    t.setData({
                        scrollLeft: a - (i - n) / 2
                    });
                });
            });
        }
    }
});