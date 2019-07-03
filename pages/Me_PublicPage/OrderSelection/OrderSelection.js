// pages/Me_SalesGoods/ProductSelection/ProductSelection.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: [],
    cangku: [],
    cangkuno: []
  },
  baocun: function() {
    var checkboxItems = this.data.shuju
    var retarray = []
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i]['<checked>k__BackingField'] == true) {
        retarray.push(checkboxItems[i]);

      }
    }
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var prevPage = pages[pages.length - 2]; //上一个页面
    var info = prevPage.data.ygname //取上页data里的数据也可以修改
    console.log(retarray);
    prevPage.setData({
      retarray: retarray
    }) //设置数据
    wx.navigateBack(-1);

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.shuju,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i]['<checked>k__BackingField'] = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i]["<detailId>k__BackingField"] == values[j]) {
          checkboxItems[i]['<checked>k__BackingField'] = true;
          break;
        }
      }
    }

    this.setData({
      shuju: checkboxItems
    });
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    var checkboxItems = this.data.shuju,
      accountIndex = e.detail.value;
    var name = this.data.cangku[e.detail.value];
    var bh = this.data.cangkuno[e.detail.value];
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {

      if (checkboxItems[i]['<detailId>k__BackingField'] == e.currentTarget.dataset.can) {
        checkboxItems[i].accountIndex = e.detail.value;
        checkboxItems[i].cangkuno = bh;
        checkboxItems[i].cangkuname = name;
        break;
      }
    }
    this.setData({
      shuju: checkboxItems
    });
    // this.setData({
    //   accountIndex: e.detail.value
    // })
  },

  inputchange: function(e) {
    var checkboxItems = this.data.shuju,
      values = e.detail.value;

    var pid = e.currentTarget.dataset.can;

    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i]["<detailId>k__BackingField"] == pid) {
        checkboxItems[i].count = values;

        break;
      }
    }

    this.setData({
      shuju: checkboxItems
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var khno = options.pbno //获取编号
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      cusNo: khno,
      pagesize: 999,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostRetreatOrderList', tempData, function(data) {

      var liebiao = data.RspData.retreatorderlist;
      if (liebiao != null) {
        for (var i = 0; i < liebiao.length; i++) {
          liebiao[i]['<checked>k__BackingField'] = false;
          liebiao[i].count = 0;
          liebiao[i].accountIndex = 0;
          liebiao[i].cangkuno = "CK1804080001";
          liebiao[i].cangkuname = "仓库一";
        }

        this11.setData({
          shuju: liebiao,
        })
      }
    })

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