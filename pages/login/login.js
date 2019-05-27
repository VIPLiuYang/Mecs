var comm = require('../../utils/PublicProtocol.js');//引用post公共函数
var rsa = require('../../utils/rsa/RSA.js');//RSA公钥加密函数
const app = getApp()
Page({ 
  data: {
    disabled: false,//登录按钮禁用
    no: '',//账号
    pwd: '',//密码
    cid: '',//企业ID
    noinput: false,
    pwdinput: false,
    cidinput: false,
  },
  // 获取cid数据
  cidinput: function(e) {
    this.setData({
      cid: e.detail.value
    });
    this.setData({
      cidinput: true
    });
    //验证是否输入
    if (this.data.noinput == true && this.data.pwdinput == true && this.data.cidinput == true) {
      this.setData({
        disabled: false//禁用按钮
      });
    }

  },
  // 获取用户名信息
  noinput: function(e) {
    this.setData({
      no: e.detail.value
    });
    this.setData({
      noinput: true
    });
    //验证是否输入
    if (this.data.noinput == true && this.data.pwdinput == true && this.data.cidinput == true) {
      this.setData({
        disabled: false
      });
    }

  },
  // 获取密码信息
  pwdinput: function(e) {
    this.setData({
      pwd: e.detail.value
    });
    this.setData({
      pwdinput: true
    });
     //验证是否输入
    if (this.data.noinput == true && this.data.pwdinput == true && this.data.cidinput == true) {
      this.setData({
        disabled: false
      });
    }
  },
  // form提交表单
  formSubmit: function(e) {
    wx.showLoading({
      title: '登录中...',
    })
    this.setData({
      disabled: true
    }); 
    var random = comm.random();//随机数代替设备ID
      var tempData = {
        uuid: random, //设备id
        appid: 'schtec', //
        shaketype: 'login'
      }
      //用户信息加密 第一次握手
      comm.unitWebsitePro('ShakeHand', tempData, function (data) {
        rsa.setMaxDigits(131);
        var key = new rsa.RSAKeyPair(data.RspData.Exponent, '', data.RspData.Modulus);
        var su = rsa.encryptedString(key, e.detail.value.no);//加密用户名
        var pw = rsa.encryptedString(key, e.detail.value.pwd);//加密密码
        var LogData = {
          uuid: random, //设备id
          appid: 'schtec', //
          shaketype: 'login',
          utp: '0',
          cid: e.detail.value.cid, 
          uid: su,
          pw: pw
        }
        //post登录接口
        comm.unitWebsitePro('Login', LogData, function (data) { 
          if (data.RspCode == "0000") {//正常，缓存用户信息
            wx.setStorageSync("appid", 'schtec')
            wx.setStorageSync("uuid", random)
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
              title: '服务器出现错误',
              icon: 'none',
              duration: 3000
            }) 
          } 
        });

      }); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideLoading()
    this.setData({
      disabled: false
    }); 
   
    var zhi = wx.getStorageSync('utoken')
    if (zhi != null && zhi != "" && zhi != undefined) {
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
    if (this.data.cid == '' ||this.data.no == '' || this.data.pwd == '') {
      this.setData({
        disabled: true
      });
    } else {
      this.setData({
        disabled: false
      });
    }
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