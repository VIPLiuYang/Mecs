// pages/Me_SalesGoods/WarehousGuanli/WaitingOrders/WaitingOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rowcount: 0,
    pagecount: 0,
    fenye: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '待出订单',
    })
  },
  mingxi: function () {

    wx.navigateTo({
      url: '../WaitingOrders/WaitingOrdersDetail',
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