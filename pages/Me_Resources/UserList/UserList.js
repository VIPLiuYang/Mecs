var comm = require('../../../utils/PublicProtocol.js');
const app = getApp();
var pageindex = 1; //获取的页码
var Flag = 0; //0刷新，1加载更多
var tempData = ""; //POST参数定义

Page({
  data: {
    StatusBar: app.globalData.StatusBar, //手机信息
    CustomBar: app.globalData.CustomBar, //手机信息
    word: '', //搜索框内容  
    Userlist: [],
    isxs: false, //是否显示加载更多
    isyw: false, //是否显示暂无数据
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
  onUnload: function () {//页面返回时恢复默认
    pageindex = 1; //获取的页码
    Flag = 1; //0刷新，1加载更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      pagesize: 10,
      pageindex: pageindex,
      utoken: utoken,
    }
    this.GetList(); //获取人员列表 
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
    if (this.data.word==""){
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }else{
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        employno: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } 
    this.GetList(); //获取人员合同列表
    wx.hideLoading()
  },

  //获取人员列表
  GetList: function(e) {  
    var prithis = this;
    comm.unitWebsitePro('PostUserList', tempData, function(data) {
      if (data.RspCode == "0000") { //正常 
        for (var i = 0; i < data.RspData.userlist.length; i++) {
          if (data.RspData.userlist[i]["<touxiang>k__BackingField"]!=null)//头像为空不执行拼接
          { 
            data.RspData.userlist[i]["<touxiang>k__BackingField"] = "http://mecs.ip165.com/" + data.RspData.userlist[i]["<touxiang>k__BackingField"];
          } 
        } 
        if (Flag == 0) {
          prithis.setData({
            Userlist: data.RspData.userlist, //绑定数据列表
            isxs: true //显示加载更多
          });
        } else {
          prithis.setData({ //加载更多数组拼接
            Userlist: prithis.data.Userlist.concat(data.RspData.userlist),
            isxs: true
          });
        }
        pageindex++;
      } else { //暂无数据
        prithis.setData({
          isyw: true, //显示暂无数据标签
          Userlist:"",
          isxs: false,
        });
      }
    })
  },
  //分页
  clickgd: function () {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      pagesize: 10,
      pageindex: pageindex,
      utoken: utoken,
    }
    Flag = 1; //0刷新，1加载更多
    this.GetList(); //获取人员列表
  } 
    
})