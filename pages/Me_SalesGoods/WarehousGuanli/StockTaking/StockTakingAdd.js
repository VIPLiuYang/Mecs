// pages/Me_SalesGoods/Purchase/PurchaseAdd.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gxshang: '',
    dates: '',
    cangku: [],
    cangkuno: [],
    accountIndex: 0,
    retarray:[]
  },
  showTopTips: function (e) {
    
    var arr = this.data.retarray
    var xmls = '<?xml version="1.0" encoding="utf-8"?><root>';
    for (var i = 0; i < arr.length; i++) {
      xmls += '<node ProNo="' + arr[i]["<proNo>k__BackingField"] + '" zmNum="' + arr[i]["<zmNum>k__BackingField"] + '" sjNum="' + arr[i]["<sjNum>k__BackingField"] + '" avgPrice="' + arr[i]["<avgPrice>k__BackingField"]+'" />';
    }
    xmls += '</root>';
    var cangno = this.data.cangkuno[this.data.accountIndex]
    var cang = this.data.cangku[this.data.accountIndex]
    var content = e.detail.value.content; //备注
    var riqi = this.data.dates;
    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      ckpbaseNo: cangno, //仓库编号
      pbaseName: cang, //盘点名称
      pdDate: riqi, //调拨日期
      Reamrk: content, //备注
      xml: xmls,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostInventory', tempData, function (data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_SalesGoods/WarehousGuanli/StockTaking/StockTaking',
        })
      } else {

        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  pandian:function(e){
    var pbno = e.currentTarget.dataset.pbno;

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pbaseNo: pbno,
      pagesize: 999,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostStartInventory', tempData, function (data) {
    
      var liebiao = data.RspData.startinventorylist;
    
      this11.setData({
        retarray: liebiao
      })

    })


    
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },

 
  //  点击日期组件确定事件  
  bindDateChange: function (e) {

    this.setData({
      dates: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pagesize: 10,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;
    var ck = [];
    var bianhao = [];
    comm.unitWebsitePro('PostWarehouseList', tempData, function (data) {
      var liebiao = data.RspData.warehouselist;
      for (var i = 0; i < liebiao.length; i++) {
        ck.push(liebiao[i]["<pbaserName>k__BackingField"]);
        bianhao.push(liebiao[i]["<pbaseNo>k__BackingField"]);
      }
      this11.setData({
        cangku: ck,
        cangkuno: bianhao
      })
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