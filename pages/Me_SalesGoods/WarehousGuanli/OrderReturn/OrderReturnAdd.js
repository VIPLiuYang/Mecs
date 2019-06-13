// pages/Me_SalesGoods/Purchase/PurchaseAdd.js
var comm = require('../../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gxshang: '',
    dates: '',
    Del: null,
    ygname: '',
    ryno: '', //客户选择编号
    ryname: '', //客户选择名称
    retarray: '',
    phone: '',
    address: ''
  },
  showTopTips: function (e) {
    // var Cno = e.detail.value.cno; //合同编号
    // var Ctype = this.data.accounts[this.data.accountIndex]; //合同类型
    // var Etime = this.data.enddate; //结束日期
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
      xmls += '<node orderItemId="' + arr[i]["<detailId>k__BackingField"] + '" ProNo="' + arr[i]["<productNo>k__BackingField"] + '" rkpbaseNo="' + arr[i].cangkuname + '" rkNum="' + arr[i].count + '" cbPrice="' + arr[i]["<cbPrice>k__BackingField"] + '" dgPrice="' + arr[i]["<buyPrice>k__BackingField"] + '"/>'; 
    }
    xmls += '</root>';
    debugger
    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      customname: this.data.ryname,
      khNo:this.data.ryno,
      khPhone: this.data.phone,
      rkDate: this.data.dates,
      remark: e.detail.value.content,
      xml: xmls,
      utoken: utoken
    }
    var this11 = this;
    debugger
    comm.unitWebsitePro('PostRetreatOrder', tempData, function (data) {
      debugger
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_SalesGoods/WarehousGuanli/OrderReturn/OrderReturn',
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
  tianjia: function() {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/CustomChoice/CustomChoice',
    })
  },
  mobileInput(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '输入的为空',
        icon: 'none',
        duration: 1500
      })
    } else if (e.detail.value.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })

    } else {
      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
      this.setData({
        Del: e.detail.value
      })
    }
  },


  prodect: function() {
    debugger
    var no = this.data.ryno;
    if (no == '') {
      wx.showToast({
        title: '请先选择客户',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '/pages/Me_PublicPage/OrderSelection/OrderSelection?pbno='+no,
      })
    }
  },
  //  点击日期组件确定事件  
  bindDateChange: function(e) {

    this.setData({
      dates: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '客户订单添加',
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