// pages/renyuanhetong/renyuanhetong.js
var comm = require('../../../utils/PublicProtocol.js');
const app = getApp();
var tempDatatwo = ""
var tempData = ""; //POST参数定义
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    date: "2016-09-01",
    date2: "2016-09-01",
    shuju: [],
    rowcount: 0,
    word: '', //搜索框内容 
    pagecount: 0,
    CustomBar: app.globalData.CustomBar, //手机信息
    fenye: 0,
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDateChange2: function(e) {
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

  add: function() {
    wx.navigateTo({
      url: '../Purchase/PurchaseAdd',
    })
  },
  mingxi: function(e) {
    var id = e.currentTarget.dataset.can;
    wx.navigateTo({
      url: '../Purchase/PurchaseDetail?hid='+id,
    })
  },
  shenpi: function (e) {
    var hid = e.currentTarget.dataset.hid;
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      hid: hid,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostInventoryListTrial', tempData, function (data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '审批成功',
          icon: 'succes',
          duration: 1000
        })
        this.onLoad();
      } else {
        wx.showToast({
          title: '审批失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  clicksearch: function (e) {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    if (this.data.word == '' || this.data.word == null || this.data.word == undefined) {

     this.onLoad()
    } else {
      var tempData = {
        uuid: uuid, //设备id
        appid: appid,
        dotype: 'list',
        supplieName: this.data.word,
        pagesize: 10,
        pageindex: 1,
        utoken: utoken
      }
      var this11 = this;

      comm.unitWebsitePro('PostInventoryList', tempData, function (data) {
        var hangshu = data.RspData.RowCount
        var yeshu = data.RspData.PageCount
        this11.setData({
          fenye: 0
        })
        var liebiao = data.RspData.inventorylist;
        if (yeshu > 0) {
          this11.setData({
            fenye: this11.data.fenye + 1
          })
        }
        this11.setData({
          shuju: liebiao,
          rowcount: hangshu,
          pagecount: yeshu,
        })
      })


    }
   
  },
  // 获取搜索框内容
  cxsearch: function (e) {
    this.setData({
      word: e.detail.value
    });
    this.setData({
      cxsearch: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   wx.setNavigationBarTitle({
     title: '进货入库',
   })

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list',
      pagesize: 10,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostInventoryList', tempData, function (data) {
      var hangshu = data.RspData.RowCount
      var yeshu = data.RspData.PageCount

      var liebiao = data.RspData.inventorylist;
      if (yeshu > 0) {
        this11.setData({
          fenye: this11.data.fenye + 1
        })
      }
      this11.setData({
        shuju: liebiao,
        rowcount: hangshu,
        pagecount: yeshu,
      })
    })

  },

  fenye: function(e) {
    var nowpage = e.currentTarget.dataset.shu;
    if (nowpage == this.data.pagecount) {
      wx.showToast({
        title: '已是最后一页',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        fenye: nowpage + 1
      })

      var appid = wx.getStorageSync('appid');
      var uuid = wx.getStorageSync('uuid');
      var utoken = wx.getStorageSync('utoken');
      if (this.data.word == '' || this.data.word == null || this.data.word == undefined){

        tempDatatwo = {
          uuid: uuid, //设备id
          appid: appid, //
          dotype: 'list',
          pagesize: 10,
          pageindex: this.data.fenye,
          utoken: utoken,
        }
      }else{
        tempDatatwo = {
          uuid: uuid, //设备id
          appid: appid, //
          dotype: 'list',
          supplieName: this.data.word,
          pagesize: 10,
          pageindex: this.data.fenye,
          utoken: utoken,
        }

      }
      
      var this11 = this;

      comm.unitWebsitePro('PostInventoryList', tempDatatwo, function (data) {
        var hangshu = data.RspData.RowCount
        var yeshu = data.RspData.PageCount

        var liebiao = data.RspData.inventorylist;


        var nowlie = this11.data.shuju;
        var nowleijia = nowlie.concat(liebiao)
        this11.setData({
          shuju: nowleijia
        })
      })


      
    }
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