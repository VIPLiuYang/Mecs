var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
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
    htlist: [],
    isxs: false, //是否显示加载更多
    isyw: true, //是否显示暂无数据
  },

  onUnload: function () {//页面返回时恢复默认
    pageindex = 1; //获取的页码
    Flag = 1; //0刷新，1加载更多
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


  //查询按钮
  clicksearch: function(e) {
    //获取缓存中的数据
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    pageindex = 1; //获取的页码
    tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list', //操作类型
      Cno: this.data.word, //查询条件
      pagesize: 10, //每页条数
      pageindex: pageindex, //页码
      utoken: utoken
    } 
    this.GetList(); //获取人员合同列表
  },

  //列表详情
  mingxi: function(e) {
    var Cno = e.currentTarget.dataset.cno; //获取合同编号
    wx.navigateTo({ //页面跳转
      url: '/pages/Me_Resources/UserContract/UserContractDetail?Con=' + Cno,
    })
  },

  //初始化函数
  onLoad: function(options) {
    var Flag = 0; //0刷新，1加载更多
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list', //操作类型
      pagesize: 10, //每页条数
      pageindex: pageindex, //页码
      utoken: utoken
    }
    this.GetList(); //获取人员合同列表
  },


  //获取人员合同列表
  GetList: function(e) {
    var prithis = this; 
    comm.unitWebsitePro('PostEmpContract', tempData, function(data) {
      if (data.RspCode == "0000") { //正常  
        if (Flag == 0) {
          prithis.setData({
            htlist: data.RspData.empcontract, //绑定数据列表
            isxs: true //显示加载更多
          });
        } else {
          prithis.setData({ //加载更多数组拼接
            htlist: prithis.data.htlist.concat(data.RspData.empcontract),
            isxs: true
          });
        }
        pageindex++;
      } else { //暂无数据
        prithis.setData({
          isyw: false //显示暂无数据标签
        }); 
      }
    })
  },


  //分页
  clickgd: function() {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list', //操作类型
      pagesize: 10, //每页条数
      pageindex: pageindex, //页码
      utoken: utoken
    }
    Flag = 1; //0刷新，1加载更多
    this.GetList(); //获取人员合同列表
  }
})