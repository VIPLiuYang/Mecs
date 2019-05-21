// pages/myPage/myPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employ: '',
    mobile: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var em = wx.getStorageSync('employ');
    var mo = wx.getStorageSync('mobile');
    this.setData({
      employ: em, mobile: mo
    });
  },
  diaozhuan:function(e){
    var can = e.currentTarget.dataset.name;
    if(can=='1'){
      wx.navigateTo({

        url: '../myPage/mingxinpian',
      })

    }
    if (can == '3') {
      wx.navigateTo({

        url: '../myPage/padupdate',
      })

    }
    if (can == '4') {
      wx.navigateTo({

        url: '../myPage/gongsixinxi',
      })

    }
    if (can == '5') {
      wx.showToast({
        title: '暂无帮助文档',
        icon: 'none',
        duration: 2000
      })

    }
  },
  tuilogin:function(){
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

  }
})