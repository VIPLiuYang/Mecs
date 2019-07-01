var comm = require('../../../../utils/PublicProtocol.js'); //引用post公共函数
const app = getApp();
var pageindex = 1; //获取的页码
var Flag = 0; //0刷新，1加载更多
var tempData = ""; //POST参数定义


Page({
  //页面的初始数据 
  data: {
    StatusBar: app.globalData.StatusBar, //手机信息
    CustomBar: app.globalData.CustomBar, //手机信息
    word: '', //搜索框内容 
    isxs: false, //是否显示加载更多
    shuju: [],
    show: false
  },

 

  // 获取搜索框内容
  cxsearch: function(e) {
    this.setData({
      word: e.detail.value
    });
    this.setData({
      cxsearch: true
    });
  },

  //列表详情
  mingxi: function(e) {
    var id = e.currentTarget.dataset.id; //获取通知公告编号
    wx.navigateTo({ //页面跳转
      url: '/pages/Me_Office/WorkManage/WorkArrangement/WorkArrangementDetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '请稍等',
    })
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list',
      isboss: '0',
      pagesize: 10,
      pageindex: 1,
      utoken: utoken
    }
    this.GetList()
    wx.hideLoading()
  },
  //查询按钮
  clicksearch: function (e) {
    wx.showLoading({
      title: '请稍等',
    })
    //获取缓存中的数据
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    pageindex = 1; //获取的页码
    Flag = 0; //0刷新，1加载更多 
    if (this.data.word == "") {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } else {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        title: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }
    this.GetList(); //获取人员合同列表
    wx.hideLoading()
  },
  //查询按钮
  clicksearch: function (e) {
    wx.showLoading({
      title: '请稍等',
    })
    //获取缓存中的数据
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    pageindex = 1; //获取的页码
    Flag = 0; //0刷新，1加载更多 
    if (this.data.word == "") {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } else {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        title: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }
    this.GetList(); //获取人员合同列表
    wx.hideLoading()
  },
  //获取人员列表
  GetList: function (e) {
    var this1 = this;
    comm.unitWebsitePro('PostWork', tempData, function (data) {
      if (data.RspCode == "0000") { //正常 
        if (Flag == 0) {
          this1.setData({
            shuju: data.RspData.worklist, //绑定数据列表
            isxs: true, //显示加载更多
            show: false
          });
        } else {
          this1.setData({ //加载更多数组拼接
            shuju: this1.data.shuju.concat(data.RspData.worklist),
            isxs: true,
            show: false
          });
        }
        pageindex++;
      } else { //暂无数据
        if (Flag == 1) {
          wx.showToast({
            title: '已是最后一页',
            icon: 'none',
            duration: 2000
          })
          this1.setData({
            isxs: false,
          });
        } else {
          this1.setData({
            shuju: [],
            isxs: false,
            show: true
          });
        }
      }
    })
  },

  //分页
  clickgd: function () {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    if (this.data.word == "") {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } else {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: '0',
        title: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }

    Flag = 1; //0刷新，1加载更多
    this.GetList(); //获取人员列表
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
    pageindex = 1; //获取的页码
    Flag = 0; //0刷新，1加载更多
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