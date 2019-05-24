var comm = require('../../utils/PublicProtocol.js'); //引用post公共函数
var appid = wx.getStorageSync('appid'); //获取缓存中APPID
var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID
var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
var pageindex = 1; //获取的页码
var Flag = 0; //0刷新，1加载更多
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isxs: false, //是否显示加载更多
    isyw: true, //是否显示暂无数据
    cardrecordlist: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //修改标题
    wx.setNavigationBarTitle({
      title: '我的打卡记录'
    })
    wx.hideLoading()
    this.getlist(); 
  },
  clickgd:function(){//加载更多
    Flag = 1; //0刷新，1加载更多
    this.getlist();
  },
  //获取数据列表
  getlist: function() {
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      isboss: '0', //是否领导
      pagesize: 10, //每页条数
      pageindex: pageindex, //页码
      utoken: utoken
    }
    var that = this;
    comm.unitWebsitePro('PostCardRecordList', tempData, function(data) {
      if (data.RspCode == "0000") { //正常 
        if (Flag==0){
          that.setData({
            cardrecordlist: data.RspData.cardrecordlist, //绑定数据列表
            isxs: true //显示加载更多
          });
        }else{
          that.setData({//加载更多数组拼接
            cardrecordlist: that.data.cardrecordlist.concat(data.RspData.cardrecordlist),  
            isxs: true  
          });
        }
        pageindex++;
      } else { //暂无数据
        that.setData({
          isyw: false //显示暂无数据标签
        });
      }
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