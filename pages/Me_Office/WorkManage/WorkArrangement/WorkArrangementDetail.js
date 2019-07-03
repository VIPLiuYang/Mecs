var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: [],
    liebiao: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      dotype: 'detail',
      id: id,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostWorkDetail', tempData, function(data) {
      //详情数据
      var shuju = data.RspData.workdetail[0];
      //批复详细
      var liebiao = data.RspData.replylist;
      this11.setData({
        shuju: shuju,
        liebiao: liebiao
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