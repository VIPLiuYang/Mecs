// pages/yingyong/yingyong.js
require('../../../utils/PublicProtocol.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: "scaleToFill",
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    xingzhengbangong: [],
   
  },
  tiaozhuan: function(e) {
    var options = e.currentTarget.dataset.postid


    wx.navigateTo({
      url: '../../LoginHome/Home/AllChildMenu?menu=' + JSON.stringify(options),
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    wx.showLoading({
      title: '登录中...',
    })
    var array = this.data.arr
    for (let i = 1; i < 2; i++) {
      array.push("../../../images/index/" + i + ".png")
    }
    this.setData({
      arr: array
    })
    var zhi = wx.getStorageSync('Menu')
    var jsonzhi = JSON.parse(zhi);
    this.setData({
      xingzhengbangong: jsonzhi
    })
     wx.hideLoading()

   


    // var xzb = this.data.xingzhengbangong
    // for (var i = 0; i < zhi.length; i++) {
    //   var fmenuid = zhi[i]["<Fmenuid>k__BackingField"]
    //   var parentid = zhi[i]["<parentid>k__BackingField"]
    //   var alterMenuName = zhi[i]["<alterMenuName>k__BackingField"]
    //   var menuName = zhi[i]["<MenuName>k__BackingField"]
    //   var menutype = zhi[i]["<menutype>k__BackingField"]
    //   var wechatico = zhi[i]["<wechatico>k__BackingField"]
    //   var wechaturl = zhi[i]["<wechaturl>k__BackingField"]
    //   if (wechaturl == 0) {
    //     wechaturl = "";
    //   }

    //   if (menutype == "1" && parentid != 0) {

    //     xzb.push({ picname: wechatico, name: alterMenuName, url: wechaturl });

    //   }
    // }


    // this.setData({ xingzhengbangong: xzb })
  },
  /**
   * 
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();

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