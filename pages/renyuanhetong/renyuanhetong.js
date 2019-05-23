// pages/renyuanhetong/renyuanhetong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: "人员合同",
    hiddenmodalput: true,
    date: "2016-09-01",
    date2: "2016-09-01",
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
 
  //重置按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认
  confirm: function() {
    this.setData({
      hiddenmodalput: true
    })
  },
  back: function() {

    wx.navigateBack()

  },
  add: function() {
    wx.navigateTo({
      url: '/pages/renyuanhetong/renyuanhetongadd?action=add',
    })
  },
  mingxi:function(){
    wx.navigateTo({
      url: '/pages/renyuanhetong/renyuanhetongdetailed',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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