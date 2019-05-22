//app.js  wqf

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.showLoading({
      title: '加载中',
    })
  },

  
  globalData: {
   
  }
})