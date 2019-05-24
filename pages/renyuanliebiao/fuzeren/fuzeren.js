// pages/renyuanliebiao/fuzeren/fuzeren.js
var comm = require('../../../utils/PublicProtocol.js');
var sliderWidth = 115;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["工作动态", "详细资料"],
    activeIndex: 0,
    sliderOffset: 1,
    sliderLeft: 0,
    leftbindcolor: 'bindbackcolo',
    rightbindcolor: '',
    dongtai:[],
    ziliao:[]
  },
  kehu: function() {
    wx.navigateTo({
      url: '/pages/renyuanliebiao/kehu/kehuliebiao',
    })

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  statcolor: function() {
    var zhi = this.data.leftbindcolor;
    if (zhi == "") {
      this.setData({
        leftbindcolor: 'bindbackcolo',
        rightbindcolor: ''
      });

    }
  },
  ziliaocolor: function() {
    var zhi = this.data.rightbindcolor;
    if (zhi == "") {
      this.setData({
        rightbindcolor: 'bindbackcolo',
        leftbindcolor: '',
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    wx.setNavigationBarTitle({
      title: '负责人',
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

var emo=options.emo;
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      employno: emo,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostUserDetail', tempData, function (data) {
debugger
      var gongzuodongtai = data.RspData.genjindongtai;
      var xiangxiziliao = data.RspData.userdetai[0];
      // for (var i = 0; i < liebiao.length; i++) {
      //   liebiao[i]["<touxiang>k__BackingField"] = "http://mecs.ip165.com/" + liebiao[i]["<touxiang>k__BackingField"];
      // }
     
      this11.setData({
       dongtai:gongzuodongtai,
       ziliao:xiangxiziliao
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