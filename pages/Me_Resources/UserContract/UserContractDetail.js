// pages/renyuanhetong/renyuanhetongdetailed.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bianhao: '',
    xiangqing: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '人员合同详情',
    })

    var bianhao = options.Con;

    this.setData({
      bianhao: bianhao
    })
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      Cno: bianhao,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostEmpContractDetail', tempData, function(data) {
      
      var xiangxiziliao = data.RspData.empcontractdetail[0];
      this11.setData({
        xiangqing: xiangxiziliao
      })

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