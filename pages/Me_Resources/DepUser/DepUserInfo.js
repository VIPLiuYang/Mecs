var comm = require('../../../utils/PublicProtocol.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
Page({
  data: {
    tabs: ["通讯录", "部门"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    typename: '公司企信',
    tongxunlu: [],
    show: '1',
    dept: [],
    toView: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true
  },
  scrollToViewFn(e) {
    var _id = e.currentTarget.dataset.idd;
    this.setData({
      toView: _id
    });
    // this.toView = _id;
    // this.$apply();
  },
  tong: function (e) {
    var zhi = e.currentTarget.dataset.id
    var this11 = this;
    this11.setData({
      show: zhi
    })

  },
  clickLine: function (e) {
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
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    let list = [];
    for (let i = 0; i < 26; i++) {
      list[i] = String.fromCharCode(65 + i)
    }
    this.setData({
      list: list,
      listCur: list[0]
    })


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
    comm.unitWebsitePro('PostEmploytel', tempData, function (data) {
      liebiao = JSON.parse(data.RspData.Employtel)
      //去key值 然后根据key值 去value值
      // var key = Object.keys(liebiao[0])   //sort() 对keys值进行排序
      // liebiao = liebiao[0][key];
      this11.setData({
        tongxunlu: liebiao
      })

    })

    comm.unitWebsitePro('PostDept', tempData, function (data) {

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
  onReady() {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },
  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.list[e.target.id],
    })
  },
  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 20);
      this.setData({
        listCur: that.data.list[num]
      })
    };
  },
  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },
  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.list;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: list[i],
          movableY: i * 20
        })
        return false
      }
    }
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


  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }

});