// pages/renyuanliebiao/fuzeren/fuzeren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["通讯录", "部门"],
    activeIndex: 0,
    sliderOffset: 1,
    sliderLeft: 0,
    leftbindcolor: 'bindbackcolo',
    rightbindcolor: '',
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