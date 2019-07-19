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
    var strarr = options.can;
    var arr=JSON.parse(strarr);
    this.setData({
      xiangqing: arr[0],
    })
console.log(arr)


  },
})