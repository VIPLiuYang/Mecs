// pages/renyuanliebiao/renyuanliebiao.js
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    shuju: [],
    // rowcount: 0,
    // pagecount: 0,
    // fenye: 0
    bianhao: '',
    name: ''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  baocun: function () {
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var prevPage = pages[pages.length - 2]; //上一个页面
    var info = prevPage.data.ygname //取上页data里的数据也可以修改
    prevPage.setData({
      ryname: this.data.name,
      ryno: this.data.bianhao
    }) //设置数据
    wx.navigateBack(-1);
  },
  fontcolor: function (e) {
    var canshu = e.currentTarget.dataset.eo;
    var shuju = this.data.shuju;
    for (var j = 0; j < shuju.length; j++) {
      if (shuju[j]["<sno>k__BackingField"] == canshu) {
        this.setData({
          bianhao: shuju[j]["<sno>k__BackingField"],
          name: shuju[j]["<sname>k__BackingField"],
        })
        shuju[j].show = 'yanse';
      } else {
        shuju[j].show = '';
      }

    }
    this.setData({
      shuju: shuju
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '人员列表',
    })

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      pagesize: 999,
      pageindex: 1,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostSupplierList', tempData, function (data) {

      var liebiao = data.RspData.supplierlist;

      for (var i = 0; i < liebiao.length; i++) {
        liebiao[i].show = '';
      }

      this11.setData({
        shuju: liebiao,
      })

    })

  },


  // fenye: function (e) {
  //   var nowpage = e.currentTarget.dataset.shu;
  //   if (nowpage == this.data.pagecount) {
  //     wx.showToast({
  //       title: '已是最后一页',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   } else {
  //     this.setData({
  //       fenye: nowpage + 1
  //     })

     
  //   }
  // },
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