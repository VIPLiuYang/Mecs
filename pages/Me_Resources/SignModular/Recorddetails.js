var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangqing: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var carid = options.cardId
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData1 = {
      uuid: uuid, //设备id
      appid: appid, //
      cardId: Number(carid),
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostCardRecordDetail', tempData1, function(data) {
      var shuju = data.RspData.cardrecorddetail[0];
      this11.setData({
        xiangqing: shuju,
      })
    })


  },
})