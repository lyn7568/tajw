var tabbarList = [{
  "pagePath": "bh_step/pages/index/index",
  "text": "首页",
  "iconPath": "/bh_step/images/home_icon.png",
  "selectedIconPath": "/bh_step/images/home_icon_down.png"
},
{
  "pagePath": "bh_step/pages/goodsconvert/goodsconvert",
  "text": "步数换礼",
  "iconPath": "/bh_step/images/exchange_icon.png",
  "selectedIconPath": "/bh_step/images/exchange_icon_down.png"
},
{
  "pagePath": "bh_step/pages/my/my",
  "text": "我的",
  "iconPath": "/bh_step/images/my_icon.png",
  "selectedIconPath": "/bh_step/images/my_icon_down.png"
}]
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    activeIdx: {
      type: Number,
      value: 0
    },
    // auth: {
    //   type: Number,
    //   value: 0,
    //   observer: 'onAuthChanged'
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbarList: tabbarList,
    // _auth: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e) {
      const {
        idx,
        path
      } = e.currentTarget.dataset

      if (idx === this.data.activeIdx) {
        this.trigger('refresh')
        return
      }
      if (idx === 0) {
        wx.switchTab({
          url: `/${path}`,
        })
      } else {
        wx.redirectTo({
          url: `/${path}`,
        })
      }
    },
    // onAuthChanged(newVal) {
    //   wx.setStorageSync('__com-tabbar-auth', newVal)
    //   this.setData({
    //     _auth: newVal
    //   })
    // },
    trigger(eventName, value = {}, info) {
      if (!eventName) {
        throw new TypeError('没有自定义事件名')
      }
      this.triggerEvent(eventName, value)
      console.log(`发送 ${eventName} 事件,携带的值为 ${typeof value === 'object' ? JSON.stringify(value) : value} ${info ? '   ---   ' + info : ''}`)
    }
  },
  // ready() { },
  // /** 权限显示 */
  // pageLifetimes: {
  //   show: function () {
  //     console.log('show')
  //     this.setData({
  //       _auth: wx.getStorageSync('__com-tabbar-auth')
  //     })
  //   }
  // }
})