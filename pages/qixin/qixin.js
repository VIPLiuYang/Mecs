// pages/qixin/qixin.js
var comm = require('../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: '公司企信',
    tongxunlu: [],
    show: '1',
    dept: [],
    toView: ''
  },

  scrollToViewFn(e) {
    var _id = e.currentTarget.dataset.idd;
    this.setData({
      toView: _id
    });
    // this.toView = _id;
    // this.$apply();
  },
  tong: function(e) {
    var zhi = e.currentTarget.dataset.id
    var this11 = this;
    this11.setData({
      show: zhi
    })

  },
  clickLine: function(e) {
    var depname = e.currentTarget.dataset.depname
    var list = this.data.dept;

    // for (var i = 0, len = list.length; i < len; ++i) {
    //   if (list[i]["depename:"] == depname) {
    //     for (var j = 0, leng = list[i].deptEmp.length; j < leng; ++j) {
    //       list[i].deptEmp[j].show='show'
    //     }
    //   } else {
    //     for (var z = 0, lengs = list[i].deptEmp.length; z < lengs; ++z) {
    //       list[i].deptEmp[z].show = ''
    //     }
    //   }
    // }

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i]["depename:"] == depname) {
        if (list[i].show == 'show') {
          list[i].show = ''
        } else {
          list[i].show = 'show'
        }
      } else {
        list[i].show = ''
      }
    }


    this.setData({
      dept: list
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
      appid: appid, //
      utoken: utoken
    }
    var liebiao = []
    var this11 = this;
    comm.unitWebsitePro('PostEmploytel', tempData, function(data) {
      liebiao = JSON.parse(data.RspData.Employtel)
      //去key值 然后根据key值 去value值
      // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
      // liebiao = liebiao[0][key];
      this11.setData({
        tongxunlu: liebiao
      })

    })

    comm.unitWebsitePro('PostDept', tempData, function(data) {
      bumen = JSON.parse(data.RspData.Dept)
      //去key值 然后根据key值 去value值
      // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
      // liebiao = liebiao[0][key];

      // for (var j = 0; j < bumen.length;j++){
      //   for (var z = 0; z < bumen[j].deptEmp.length; z++) {
      //     bumen[j].deptEmp[z].show = ''
      //   }
      // }
      for (var j = 0; j < bumen.length; j++) {
        bumen[j].show = ''
      }

      this11.setData({
        dept: bumen
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