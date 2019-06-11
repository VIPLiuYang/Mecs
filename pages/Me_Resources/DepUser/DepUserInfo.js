// // pages/qixin/qixin.js
var comm = require('../../../utils/PublicProtocol.js');
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     typename: '公司企信',
//     tongxunlu: [],
//     show: '1',
//     dept: [],
//     toView: ''
//   },

//   scrollToViewFn(e) {
//     var _id = e.currentTarget.dataset.idd;
//     this.setData({
//       toView: _id
//     });
//     // this.toView = _id;
//     // this.$apply();
//   },
//   tong: function(e) {
//     var zhi = e.currentTarget.dataset.id
//     var this11 = this;
//     this11.setData({
//       show: zhi
//     })

//   },
//   clickLine: function(e) {
//     var depname = e.currentTarget.dataset.depname
//     var list = this.data.dept;

//     // for (var i = 0, len = list.length; i < len; ++i) {
//     //   if (list[i]["depename:"] == depname) {
//     //     for (var j = 0, leng = list[i].deptEmp.length; j < leng; ++j) {
//     //       list[i].deptEmp[j].show='show'
//     //     }
//     //   } else {
//     //     for (var z = 0, lengs = list[i].deptEmp.length; z < lengs; ++z) {
//     //       list[i].deptEmp[z].show = ''
//     //     }
//     //   }
//     // }

//     for (var i = 0, len = list.length; i < len; ++i) {
//       if (list[i]["depename:"] == depname) {
//         if (list[i].show == 'show') {
//           list[i].show = ''
//         } else {
//           list[i].show = 'show'
//         }
//       } else {
//         list[i].show = ''
//       }
//     }


//     this.setData({
//       dept: list
//     });
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     wx.setNavigationBarTitle({
//       title: '公司企信'
//     })
//     var appid = wx.getStorageSync('appid');
//     var uuid = wx.getStorageSync('uuid');
//     var utoken = wx.getStorageSync('utoken');
//     var tempData = {
//       uuid: uuid, //设备id
//       appid: appid, //
//       utoken: utoken
//     }
//     var liebiao = []
//     var this11 = this;
//     comm.unitWebsitePro('PostEmploytel', tempData, function(data) {
//       liebiao = JSON.parse(data.RspData.Employtel)
//       //去key值 然后根据key值 去value值
//       // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
//       // liebiao = liebiao[0][key];
//       this11.setData({
//         tongxunlu: liebiao
//       })

//     })

//     comm.unitWebsitePro('PostDept', tempData, function(data) {
//       bumen = JSON.parse(data.RspData.Dept)
//       //去key值 然后根据key值 去value值
//       // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
//       // liebiao = liebiao[0][key];

//       // for (var j = 0; j < bumen.length;j++){
//       //   for (var z = 0; z < bumen[j].deptEmp.length; z++) {
//       //     bumen[j].deptEmp[z].show = ''
//       //   }
//       // }
//       for (var j = 0; j < bumen.length; j++) {
//         bumen[j].show = ''
//       }

//       this11.setData({
//         dept: bumen
//       })

//     })

//   }



var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["通讯录", "部门"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
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
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.setNavigationBarTitle({
      title: '公司企信'
    })
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
  calling: function (e) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
 

tabClick: function(e) {
  this.setData({
    sliderOffset: e.currentTarget.offsetLeft,
    activeIndex: e.currentTarget.id
  });
}

});