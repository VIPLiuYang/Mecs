//app.js  

App({
  onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  
    if (wx.cloud) {
      // wx.cloud.init({
      //   traceUser: true
      // })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  
 

  
  globalData: {
   
  }
})