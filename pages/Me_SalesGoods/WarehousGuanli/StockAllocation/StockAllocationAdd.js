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
    accountIndextwo: 0,
    retarray: []
  },
  del: function(e) {
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
  showTopTips: function(e) {
    // var Cno = e.detail.value.cno; //合同编号
    // var Ctype = this.data.accounts[this.data.accountIndex]; //合同类型
    // var EmployNo = this.data.ygno; //员工编号
    // var Employ = this.data.ygname; //员工姓名
    // var Ctime = this.data.dates; //签订日期
    // var Stime = this.data.startdate; //开始日期
    // var Etime = this.data.enddate; //结束日期
    // var DealMan = e.detail.value.dealMan; //经办人
    // var Content = e.detail.value.content; //合同摘要

    //拼接xml格式
    // var arr = [];
    // arr.push("<xml>");
    // for (var i = 0; i < 3; i++) {
    //   arr.push("<ProNo>");
    //   arr.push(i);
    //   arr.push("</ProNo>");

    //   arr.push("<dbNum>");
    //   arr.push(i);
    //   arr.push("</dbNum>");

    //   arr.push("<price>");
    //   arr.push(i);
    //   arr.push("</price>");

    //   arr.push("<chno>");
    //   arr.push(i);
    //   arr.push("</chno>");
    // }
    // arr.push("</xml>");
    // var xmlStr = arr.join('');
    // var zhi = xmlStr.toString();
    var arr = this.data.retarray
    var xmls = '<?xml version="1.0" encoding="utf-8"?><root>';
    for (var i = 0; i < arr.length; i++) {
      xmls += '<node ProNo="' + arr[i]["<proNo>k__BackingField"] + '" dbNum="' + arr[i].count + '" price="' + arr[i].price + '" />';
    }
    xmls += '</root>';
    var diaochu = this.data.cangkuno[this.data.accountIndex]
    var diaoru = this.data.cangkuno[this.data.accountIndextwo]
    var fahuo = e.detail.value.fahuo; //发货人
    var shouhuo = e.detail.value.shouhuo; //收货人
    var content = e.detail.value.content; //备注
    var riqi = this.data.dates;
    debugger
    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      dcpbaserNo: diaochu, //调出仓库编号
      drpbaserNo: diaoru, //调入仓库编号
      pdDate:riqi, //调拨日期
      faMan: fahuo, //发货人
      shouMan: shouhuo, //收货人
      remark: content, //备注
      xml: xmls,
      utoken: utoken
    }
    var this11 = this;
debugger
    comm.unitWebsitePro('PostAllocation', tempData, function(data) {
      debugger
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_SalesGoods/WarehousGuanli/StockAllocation/StockAllocation',
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
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAccountChangetwo: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndextwo: e.detail.value
    })
  },
  prodect: function() {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/StockProductSelect/StockProductSelect?pbno=' + this.data.cangkuno[this.data.accountIndex],
    })

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
    comm.unitWebsitePro('PostWarehouseList', tempData, function(data) {
      debugger
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