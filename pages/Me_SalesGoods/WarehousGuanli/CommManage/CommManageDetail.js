// pages/Me_SalesGoods/WarehousGuanli/CommManage/CommManageDetail.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    xiangqing:[],
    pName:'',
    lingPrice:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //商品id
    var prid = options.id;

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      proid: prid,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostCommodityDetail', tempData, function (data) {
      var xiangxiziliao = JSON.parse(data.RspData.commoditydetail);
      var prod = xiangxiziliao.prodetail[0];
      //滚动图片
      var array = this11.data.arr
      // for (let i = 1; i < 2; i++) {
      array.push("http://mecs.ip165.com/"+prod.pro_pic);
      // }

      this11.setData({
        arr: array,
        pName: prod.pName,
        lingPrice: prod.lingPrice
      })

      // this11.setData({
      //   xiangqing: prod
      // })
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