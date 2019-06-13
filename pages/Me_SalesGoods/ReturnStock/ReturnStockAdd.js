// pages/Me_SalesGoods/Purchase/PurchaseAdd.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gxshang: '',
    dates: '',
    ryname: '',
    ryno: '',
    retarray: []
  },
  tianjia: function () {

    wx.navigateTo({
      url: '/pages/Me_PublicPage/SupplierList/SupplierList',
    })
  },
  showTopTips: function (e) {
    // var Cno = e.detail.value.cno; //合同编号
    // var Ctype = this.data.accounts[this.data.accountIndex]; //合同类型
    // var EmployNo = this.data.ygno; //员工编号
    // var Employ = this.data.ygname; //员工姓名
    // var Ctime = this.data.dates; //签订日期
    // var Stime = this.data.startdate; //开始日期
    // var Etime = this.data.enddate; //结束日期
    // var DealMan = e.detail.value.dealMan; //经办人
    // var Content = e.detail.value.content; //合同摘要

    var arr = this.data.retarray
    if (arr.length == 0) {
      wx.showToast({
        title: '请选择产品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var xmls = '<?xml version="1.0" encoding="utf-8"?><root>';
    for (var i = 0; i < arr.length; i++) {
      xmls += '<node  ProNo="' + arr[i]["<proNo>k__BackingField"] + '" ckNum="' + arr[i].count + '" price="' + arr[i].price + '" />';
    }
    xmls += '</root>';
    // var diaochu = this.data.cangkuno[this.data.accountIndex]
    // var diaoru = this.data.cangkuno[this.data.accountIndextwo]
    // var fahuo = e.detail.value.fahuo; //发货人
    // var shouhuo = e.detail.value.shouhuo; //收货人
    // var content = e.detail.value.content; //备注
    // var riqi = this.data.dates;
    debugger
    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      supplierNo: this.data.ryno,
      operateTime: this.data.dates,
      remark: e.detail.value.content,
      xml: xmls,
      utoken: utoken
    }
    var this11 = this;
    debugger
    comm.unitWebsitePro('PostRetreatList', tempData, function (data) {
      debugger
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_SalesGoods/ReturnStock/ReturnStock',
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
  tianjia: function () {

    wx.navigateTo({
      url: '/pages/Me_PublicPage/SupplierList/SupplierList',
    })
  },
  prodect: function () {
    debugger
    var no = this.data.ryno;
    var name = this.data.ryname;
    if (no == '') {
      wx.showToast({
        title: '请先选择客户',
        icon: 'none',
        duration: 1000
      })
    } else {
      // wx.navigateTo({
      //   url: '/pages/Me_SalesGoods/WarehousGuanli/StockProductSelect/StockProductSelectTwo?pbno=' + no + '&pbname=' + name + '',
      // })
      wx.navigateTo({
        url: '/pages/Me_PublicPage/StockProductSelect/StockProductSelectTwo?pbno=' + no + '&pbname=' + name + '',
      })
    }



  },
  del: function (e) {
    debugger
    var rowindex = e.currentTarget.dataset.xb;
    var arr = this.data.retarray;
    var leibiao = arr.filter((ele, index) => {
      return index != rowindex
    })

    this.setData({
      retarray: leibiao
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