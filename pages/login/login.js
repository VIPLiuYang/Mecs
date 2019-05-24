// pages/login/login.js
var comm = require('../../utils/PublicProtocol.js');
var rsa = require('../../utils/rsa/RSA.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    qycid: '',
    userName: '',
    userPwd: ''
  },

  //获取用户输入的用户名
  qycidInput: function(e) {
    this.setData({
      qycid: e.detail.value
    })
  },

  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function(e) {
    this.setData({
      userPwd: e.detail.value
    })
  },


  check: function() {
    try {
      var qycid = this.data.qycid;
      var userName = this.data.userName;
      var userPwd = this.data.userPwd;
      if (qycid == "" || userName == "" || userPwd == "") {
        wx.showToast({
          title: '登陆信息不能为空',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      wx.showLoading({
        title: '登陆中',
      })


      //生成随机数
      var zhi = comm.random();
      var tempData = {
        uuid: zhi, //设备id
        appid: 'schtec', //
        shaketype: 'login'
      }
      comm.unitWebsitePro('ShakeHand', tempData, function(data) {
        rsa.setMaxDigits(131);
        var key = new rsa.RSAKeyPair(data.RspData.Exponent, '', data.RspData.Modulus);
        var su = rsa.encryptedString(key, userName);
        var pw = rsa.encryptedString(key, userPwd);
        var LogData = {
          uuid: zhi, //设备id
          appid: 'schtec', //
          shaketype: 'login',
          cid: qycid,
          utp: '0',
          uid: su,
          pw: pw
        }
        comm.unitWebsitePro('Login', LogData, function(data) {
          //console.log("返回的数据22222" + data.RspCode)
          if (data.RspCode == "0000") {  
            wx.setStorageSync("appid", 'schtec')
            wx.setStorageSync("uuid", zhi)
            wx.setStorageSync("cid", data.RspData.cid)
            wx.setStorageSync("username", data.RspData.UserName)
            wx.setStorageSync("employ", data.RspData.Employ)
            wx.setStorageSync("mobile", data.RspData.Mobile) 
            wx.setStorageSync("employNo", data.RspData.EmployNo)
            wx.setStorageSync("userRNo", data.RspData.UserRNo)
            wx.setStorageSync("DepartName", data.RspData.dpts[0]["<DepartName>k__BackingField"])
            wx.setStorageSync("Depid", data.RspData.dpts[0]["<id>k__BackingField"])
            wx.setStorageSync("utoken", data.RspData.utoken)
            wx.setStorageSync("Menu", data.RspData.Menu)
            wx.hideLoading()



            //跳转页面
            wx.reLaunch({
              url: '../yingyong/yingyong',
            })
          } else {
            wx.showToast({            
              title: '登录失败',
              icon: 'none',
                          duration: 2000        
            })
            wx.hideLoading()
          }

        });

      });

    } catch (error) {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      })
      wx.hideLoading()
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideLoading()   
    var zhi = wx.getStorageSync('utoken')
    if (zhi != null && zhi != "" && zhi !=undefined){
      wx.reLaunch({
        url: '../yingyong/yingyong',
      })
    }
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