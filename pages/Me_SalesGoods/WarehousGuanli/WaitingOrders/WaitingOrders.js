// pages/Me_SalesGoods/WarehousGuanli/WaitingOrders/WaitingOrders.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rowcount: 0,
    pagecount: 0,
    fenye: 0,
    shuju:[]
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '待出订单',
    })
debugger
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pagesize: 10,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostOutOrder', tempData, function(data) {
      debugger
      var hangshu = data.RspData.RowCount
      var yeshu = data.RspData.PageCount

      var liebiao = data.RspData.outorderlist;
      if (yeshu > 0) {
        this11.setData({
          fenye: this11.data.fenye + 1
        })
      }
      this11.setData({
        shuju: liebiao,
        rowcount: hangshu,
        pagecount: yeshu,
      })

    })
  },
  mingxi: function(e) {
    var id = e.currentTarget.dataset.hid;
    wx.navigateTo({
      url: '../WaitingOrders/WaitingOrdersDetail?hid='+id,
    })
  },
  fenye: function(e) {
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


      var appid = wx.getStorageSync('appid');
      var uuid = wx.getStorageSync('uuid');
      var utoken = wx.getStorageSync('utoken');
      var tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        pagesize: 10,
        pageindex: this.data.fenye,
        utoken: utoken,
      }
      var this11 = this;

      comm.unitWebsitePro('PostOutOrder', tempData, function(data) {
        var hangshu = data.RspData.RowCount
        var yeshu = data.RspData.PageCount

        var liebiao = data.RspData.outorderlist;


        var nowlie = this11.data.shuju;
        var nowleijia = nowlie.concat(liebiao)
        this11.setData({
          shuju: nowleijia
        })

      })

    }
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