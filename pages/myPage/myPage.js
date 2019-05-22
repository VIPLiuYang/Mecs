Page({
  data: {
    employ: '',
    mobile: '',
    Column: [{
      namekey: '我的明信片',
      namevalue: 'C1',
      url: '../myPage/mingxinpian'
    }, {
      namekey: '我的设置',
      namevalue: 'C2',
      url: ''
    }, {
      namekey: '修改密码',
      namevalue: 'C3',
      url: '../myPage/padupdate'
    }, {
      namekey: '公司信息',
      namevalue: 'C4',
      url: '../myPage/gongsixinxi'
    }, {
      namekey: '我的帮助',
      namevalue: 'C5',
      url: ''
    }, {
      namekey: '退出登录',
      namevalue: 'C6',
      url: ''
    }]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var em = wx.getStorageSync('employ');
    var mo = wx.getStorageSync('mobile');
    this.setData({
      employ: em,
      mobile: mo
    });
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },

  tuilogin: function() {
    wx.showToast({
      title: '退出成功',
      icon: 'none',
      duration: 2000
    })
    wx.clearStorage()
    wx.clearStorageSync()
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Me平台',
      path: '/pages/yingyong/yingyong',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})