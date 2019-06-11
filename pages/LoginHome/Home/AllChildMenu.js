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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = this.data.arr
    for (let i = 1; i < 2; i++) {
      array.push("../../../images/index/" + i + ".png")
    }
    this.setData({ arr: array })
    var menu=JSON.parse(options.menu)
    this.setData({ xingzhengbangong: menu })
  },

  tiaozhuan: function (e) {
    var options = e.currentTarget.dataset.postid


    wx.navigateTo({
      url: '../../LoginHome/Home/AllChildMenu?menu=' + JSON.stringify(options),
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
    wx.stopPullDownRefresh();
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