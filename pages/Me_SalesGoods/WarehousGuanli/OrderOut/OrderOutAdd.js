// pages/Me_SalesGoods/Purchase/PurchaseAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gxshang: '',
    dates: '',
    jine: 0,
    Del: null,
    Deltwo: null,
    ygname: '',
  },
  tianjia: function () {
    wx.navigateTo({
      url: '/pages/xuanzepage/CustomChoice/CustomChoice',
    })
  },
  mobileInput(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '输入的为空',
        icon: 'none',
        duration: 1500
      })
    } else if (e.detail.value.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })

    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
      this.setData({
        Del: e.detail.value
      })
    }
  },
  mobileInputtwo(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '输入的为空',
        icon: 'none',
        duration: 1500
      })
    } else if (e.detail.value.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })

    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
      this.setData({
        Del: e.detail.value
      })
    }
  },
  
 
  prodect: function () {
    wx.navigateTo({
      url: '/pages/Me_SalesGoods/WarehousGuanli/OrderSelection/OrderSelection',
    })

  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {

    this.setData({
      dates: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户订单添加',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})