Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    debugger
    var arr = JSON.parse(options.can);
    if (arr[0]["photo1"] != null && arr[0]["photo1"] != "") //头像为空不执行拼接
    {
      arr[0]["photo1"] = "http://mecs.ip165.com/" + arr[0]["photo1"];
    }
    if (arr[0]["photo2"] != null && arr[0]["photo2"] != "") //头像为空不执行拼接
    {
      arr[0]["photo2"] = "http://mecs.ip165.com/" + arr[0]["photo2"];
    }
    if (arr[0]["photo3"] != null && arr[0]["photo3"] != "") //头像为空不执行拼接
    {
      arr[0]["photo3"] = "http://mecs.ip165.com/" + arr[0]["photo3"];
    }



    this.setData({
      shuju: arr
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