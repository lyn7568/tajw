Component({
    properties: {
        swiperItemList: {
            type: Array,
            value: [],
            observer: function(t, e) {
                t != e && this.setData({
                    swiperItemList: t
                });
            }
        },
        imgUrl: null
    },
    data: {
        swiperItemList: [],
        imgUrl: null,
        current: 0
    },
    methods: {
        swiperchange: function(t) {
            this.setData({
                current: t.detail.current
            });
        }
    }
});