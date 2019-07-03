// pages/xuanzepage/xuanzerenyuan/xuanzerenyuan.js
var comm = require('../../../utils/PublicProtocol.js');
var array = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dept: [],
    bianhao: '',
    name: '',
    retarray: []
  },
  baocun: function() {
    var pages = getCurrentPages();
    var Page = pages[pages.length - 1]; //当前页
    var prevPage = pages[pages.length - 2]; //上一个页面
    // var info = prevPage.data.ygname //取上页data里的数据也可以修改
    var array1 = [];
    for (var j = 0; j < bumen.length; j++) {
      for (var z = 0; z < bumen[j].deptEmp.length; z++) {
        if (bumen[j].deptEmp[z].checked == "true") {
          array1.push(bumen[j].deptEmp[z])
        }
      }
    }

    prevPage.setData({
      retarray: array1
    }) //设置数据
    wx.navigateBack(-1);
  },


  checkboxChange: function(e) {
    var values = e.detail.value
    var bumen = this.data.dept;
    for (var j = 0; j < bumen.length; j++) {
      for (var z = 0; z < bumen[j].deptEmp.length; z++) {
        bumen[j].deptEmp[z].checked = '';
        for (var x = 0, lenJ = values.length; x < lenJ; ++x) {
          if (bumen[j].deptEmp[z].employno == values[x]) {
            bumen[j].deptEmp[z].checked = 'true';
            break;
          }
        }
      }
    }

    this.setData({
      dept: bumen
    })

  },

  // fontcolor: function(e) {
  //   var canshu = e.currentTarget.dataset.eo;
  //   var bumen = this.data.dept;
  //   for (var j = 0; j < bumen.length; j++) {
  //     for (var z = 0; z < bumen[j].deptEmp.length; z++) {
  //       if (bumen[j].deptEmp[z].employno == canshu) {

  //         this.setData({
  //           bianhao: bumen[j].deptEmp[z].employno,
  //           name: bumen[j].deptEmp[z].Employ
  //         })
  //         bumen[j].deptEmp[z].show = 'yanse';
  //       } else {
  //         bumen[j].deptEmp[z].show = '';
  //       }

  //     }
  //   }
  //   this.setData({
  //     dept: bumen
  //   })

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '选择员工'
    })
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostDept', tempData, function(data) {
      bumen = JSON.parse(data.RspData.Dept)
      //去key值 然后根据key值 去value值
      // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
      // liebiao = liebiao[0][key];

      for (var j = 0; j < bumen.length; j++) {
        for (var z = 0; z < bumen[j].deptEmp.length; z++) {
          bumen[j].deptEmp[z].checked = ''
        }
      }
      // for (var j = 0; j < bumen.length; j++) {
      //   bumen[j].show = ''
      // }

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