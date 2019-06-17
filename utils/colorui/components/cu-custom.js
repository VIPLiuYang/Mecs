const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    }, 
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    goUrl: {            // icon点击跳转路径，默认回退
      type: String,
      value: ''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome(e){
      wx.reLaunch({
        url: '/pages/yingyong/yingyong',
      })
    },
    //隐藏弹框
    _iconLeftTap() { 
      if (this.data.goUrl != '' && this.data.goUrl != undefined) {
        wx.navigateTo({
          url: this.data.goUrl
        })
      } else {
        wx.navigateBack();
      }
    },
  }
})
module.exports = {
  
}