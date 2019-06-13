// pages/Me_SalesGoods/ProductSelection/ProductSelection.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju: []

  },
  baocun:function(){
    var checkboxItems = this.data.shuju
    var retarray=[]
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i]['<checked>k__BackingField'] == true){
        retarray.push(checkboxItems[i]);

     }
    }
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];  //上一个页面
    var info = prevPage.data.ygname //取上页data里的数据也可以修改
    console.log(retarray);
    prevPage.setData({
      retarray: retarray
    })//设置数据
    wx.navigateBack(-1);

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.shuju,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i]['<checked>k__BackingField'] = false;
      
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i]["<ProductId>k__BackingField"] == values[j]) {
          checkboxItems[i]['<checked>k__BackingField'] = true;
          break;
        }
      }
    }

    this.setData({
      shuju: checkboxItems
    });
  },

  inputchange: function(e) {
    var checkboxItems = this.data.shuju,
      values = e.detail.value;

    var pid = e.currentTarget.dataset.can;
    var type = e.currentTarget.dataset.can2;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i]["<ProductId>k__BackingField"] == pid) {
        if (type == "count") {
          checkboxItems[i].count = values
        } else {
          checkboxItems[i].price = values
        }
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
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pbaseNo: options.pbno,
      pagesize: 999,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;
    debugger;
    comm.unitWebsitePro('PostCkProductList', tempData, function(data) {
      debugger;

      var liebiao = data.RspData.ckproductlist;

      for (var i = 0; i < liebiao.length; i++) {
        liebiao[i]['<checked>k__BackingField'] = false;
        liebiao[i].count = 0;
        liebiao[i].price = 0;
      }

      this11.setData({
        shuju: liebiao,
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