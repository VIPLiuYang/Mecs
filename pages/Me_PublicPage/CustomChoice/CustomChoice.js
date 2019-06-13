// pages/xuanzepage/xuanzerenyuan/xuanzerenyuan.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bianhao: '',
    name: '',
    shuju: [],
    bianhao: '',
    name: '',
    phone: '',
    address:''
  },
  fontcolor: function(e) {
    var canshu = e.currentTarget.dataset.eo;
    var shuju = this.data.shuju;
    for (var j = 0; j < shuju.length; j++) {
      if (shuju[j]["<CustomNo>k__BackingField"] == canshu) {
        this.setData({
          bianhao: shuju[j]["<CustomNo>k__BackingField"],
          name: shuju[j]["<Custom>k__BackingField"],
          phone: shuju[j]["<mobile>k__BackingField"],
          address: shuju[j]["<address>k__BackingField"],
        })
        shuju[j].show = 'yanse';
      } else {
        shuju[j].show = '';
      }

    }
    this.setData({
      shuju: shuju
    })

  },
  baocun: function() {
    // var pages = getCurrentPages();
    // var Page = pages[pages.length - 1];//当前页
    // var prevPage = pages[pages.length - 2];  //上一个页面
    // var info = prevPage.data.ygname //取上页data里的数据也可以修改
    // prevPage.setData({
    //   ygname: this.data.name,
    //   ygno: this.data.bianhao
    // })//设置数据
    // wx.navigateBack(-1);

    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var prevPage = pages[pages.length - 2]; //上一个页面
    var info = prevPage.data.ygname //取上页data里的数据也可以修改
    prevPage.setData({
      ryname: this.data.name,
      ryno: this.data.bianhao,
      phone:this.data.phone,
      address:this.data.address
    }) //设置数据
    wx.navigateBack(-1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '选择员工'
    })

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pagesize: 999,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostCustomerList', tempData, function(data) {
      debugger;

      var liebiao = data.RspData.customerlist;

      for (var i = 0; i < liebiao.length; i++) {
        liebiao[i].show = '';
      }

      this11.setData({
        shuju: liebiao,
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