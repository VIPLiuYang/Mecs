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

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var _that = this;
    wx: wx.getSystemInfo({
      success: function (res) {
        _that.systemInfo = res;
      }
    });


  },
  
  /**
  * 系统信息
  */
  systemInfo: null,//系统信息

  
  globalData: {
   
  }
})