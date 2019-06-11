// Page({
//   data: {
//     employ: '',
//     mobile: '',
//     Column: [{
//       namekey: '我的明信片',
//       namevalue: 'C1',
//       url: '../myPage/mingxinpian'
//     }, {
//       namekey: '我的设置',
//       namevalue: 'C2',
//       url: ''
//     }, {
//       namekey: '修改密码',
//       namevalue: 'C3',
//       url: '../myPage/padupdate'
//     }, {
//       namekey: '公司信息',
//       namevalue: 'C4',
//       url: '../myPage/gongsixinxi'
//     }, {
//       namekey: '我的帮助',
//       namevalue: 'C5',
//       url: ''
//     }, {
//       namekey: '退出登录',
//       namevalue: 'C6',
//       url: ''
//     }]
//   },


//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     var em = wx.getStorageSync('employ');
//     var mo = wx.getStorageSync('mobile');
//     this.setData({
//       employ: em,
//       mobile: mo
//     });
//     wx.setNavigationBarTitle({
//       title: '个人中心'
//     })
//   },

//   tuilogin: function() {
//     wx.showToast({
//       title: '退出成功',
//       icon: 'none',
//       duration: 2000
//     })
//     wx.clearStorage()
//     wx.clearStorageSync()
//     wx.navigateTo({
//       url: '/pages/login/login',
//     })

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {
//     if (res.from === 'button') {
//       // 来自页面内转发按钮
//       console.log(res.target)
//     }
//     return {
//       title: 'Me平台',
//       path: '/pages/yingyong/yingyong',
//       success: function (res) {
//         // 转发成功
//       },
//       fail: function (res) {
//         // 转发失败
//       }
//     }
//   }
// })
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    employ: '',
    mobile: '',
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function() {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    OutLogin(e) {
     
          wx.showToast({
            title: '退出成功',
            icon: 'none',
            duration: 2000
          })
          wx.clearStorage()
          wx.clearStorageSync()
          wx.navigateTo({
            url: '../../LoginHome/Login',
          })
       
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    onLoad: function(options) {
      var em = wx.getStorageSync('employ');
      var mo = wx.getStorageSync('mobile');
      this.setData({
        employ: em,
        mobile: mo
      });
      wx.setNavigationBarTitle({
        title: '个人中心'
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})