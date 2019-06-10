// pages/Me_SalesGoods/WarehousGuanli/WaitingOrders/WaitingOrders.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    rowcount: 0,
    pagecount: 0,
    fenye: 0,
    date: "2016-09-01",
    date2: "2016-09-01",
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },

  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //重置按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../CustomerOrders/CustomerOrdersAdd',
    })
  },
  mingxi: function () {

    wx.navigateTo({
      url: '../CustomerOrders/CustomerOrdersDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户订单',
    })
  },

  fenye: function (e) {
    var nowpage = e.currentTarget.dataset.shu;
    if (nowpage == this.data.pagecount) {
      wx.showToast({
        title: '已是最后一页',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        fenye: nowpage + 1
      })


    }
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