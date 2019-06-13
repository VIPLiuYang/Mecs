// pages/Me_SalesGoods/Purchase/PurchaseAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gxshang: '',
    dates: '',
    accounts: ["未付款", "支付成功", "交易成功"],
    accountIndex: 0,
    accountstwo: ["现金", "支付宝", "微信", "pos机", "钱包"],
    accountIndextwo: 0,
    jine: 0,
    Del: null,
    ryno: '', //客户选择编号
    ryname: '', //客户选择名称
    retarray: '',
    phone:'',
    address:''
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
      xmls += '<node ProNo="' + arr[i]["<proNo>k__BackingField"] + '" dbNum="' + arr[i].count + '" price="' + arr[i].price + '" />';
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
      khNo:this.data.ryno,
      customerName:this.data.ryname,
      khPhone:this.data.phone,
      shouhuoren: e.detail.value.shouhuoren,
      shDate: this.data.dates,
      shAddr: this.data.address,
      remark: e.detail.value.content,
      orderType:'1',
      paymoney: this.data.jine,
      paystate:this.data.accounts[this.data.accountIndex],
      paymethod: this.data.accountstwo[this.data.accountIndextwo],
      khAddress:this.data.address,
      linkPhone: this.data.Del,
      xml: xmls,
      utoken: utoken
    }
    var this11 = this;
    debugger
    comm.unitWebsitePro('PostCustomOrder', tempData, function(data) {
      debugger
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_SalesGoods/WarehousGuanli/CustomerOrders/CustomerOrders',
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
  tianjia: function() {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/CustomChoice/CustomChoice',
    })
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
  moneypan(e) {
    if (/^(\d?)+(\.\d{0,4})?$/.test(e.detail.value)) {
      this.setData({
        jine: e.detail.value
      })
    } else {
      this.setData({
        jine: e.detail.value.substring(0, e.detail.value.length - 1)
      })
    }

    // var mobile = e.detail.value.replace(/[^/d]/g, '')

    // return mobile
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
    var no = this.data.ryno;
    var name = this.data.ryname;
    if (no == '') {
      wx.showToast({
        title: '请先选择客户',
        icon: 'none',
        duration: 1000
      })
    } else {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/StockProductSelect/StockProductSelectTwo?pbno=' + no + '&pbname=' + name + '',
    })
    }
    // wx.navigateTo({
    //   url: '/pages/Me_SalesGoods/WarehousGuanli/StockProductSelect/StockProductSelectTwo',
    // })

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