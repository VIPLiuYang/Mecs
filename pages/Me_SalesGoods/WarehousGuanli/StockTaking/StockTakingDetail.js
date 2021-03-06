// pages/Me_SalesGoods/Purchase/PurchaseDetail.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: [],
    liebiao: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '进货入库详情',
    })
    var id = options.hid;
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      hid: id,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostStartInventoryDetail', tempData, function (data) {
      var shuju = data.RspData.startInventorydetail[0];
      var liebiao = data.RspData.prioductlist;
      this11.setData({
        shuju: shuju,
        liebiao: liebiao
      })
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