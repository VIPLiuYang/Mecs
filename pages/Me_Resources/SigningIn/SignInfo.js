// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../../libs/bmap-wx.min.js');
var wxMarkerData = []; //定位成功回调对象  

var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
var appid = wx.getStorageSync('appid'); //获取缓存中APPID
var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID
var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
const app = getApp();
Page({
  // 页面的初始数据 
  data: {
    files: [], //图片信息
    ak: "EdWIlpQDhrLErhtkPEI7kiFEawElVT2R", //ak  
    markers: [],
    longitude: '', //经度  
    latitude: '', //纬度  
    address: '', //地址  
    cityInfo: {}, //城市信息 
    bcid: '',
    tupian: ''
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://api.ip165.com/api/Data/SaveImages',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            //utoken: 'MXu8ycByYPKlk483A39NlHJxXA0='
          },
          success: function(res) {
            var a = JSON.parse(res.data)
            wx.hideLoading();
            wx.showToast({
              title: '上传成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            console.log(a);
            that.setData({
              tupian: a
            })
          },
          fail: function() {}
        })



        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function(data) {
      console.log(data);
    };
    var success = function(data) {
      //返回数据内，已经包含经纬度  
      console.log(data);
      //使用wxMarkerData获取数据  
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内  
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });

    //签到 签退 必须首先初始化 获取到bcid  调用接口用到
    var tempData = {
      uuid: wx.getStorageSync('uuid'), //设备id
      appid: wx.getStorageSync('appid'), //
      dotype: 'show', //操作类型
      utoken: wx.getStorageSync('utoken')
    }
    comm.unitWebsitePro('PostAttenDance', tempData, function(data) {
      if (data.RspCode == "0000") { //打卡成功  

        var now = new Date();
        var hours = now.getHours();
        var min = now.getMinutes();
        if (hours > 12 || (hours == 12 && min > 0)) {
          that.setData({
            bcid: data.RspData.Show["1"]["<Id>k__BackingField"]
          })
        } else {
          that.setData({
            bcid: data.RspData.Show["0"]["<Id>k__BackingField"]
          })
        }

      } else {
        wx.showToast({
          title: '初始化失败',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      }
    })


  },

  //签到
  start: function() {

    if (this.data.tupian == "") {
      wx.showToast({ //打卡失败
        title: '请选择图片',
        icon: 'none',
        duration: 1000
      });
      return
    }
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      dotype: 'start', //操作类型
      point: '', //点
      address: '', //位置
      Photo: this.data.tupian,
      bcid: this.data.bcid.toString(),
      isout: '',
      wxPaiZhao: '',
      utoken: utoken
    }
    comm.unitWebsitePro('PostAttenDance', tempData, function(data) {
      if (data.RspCode == "0000") { //打卡成功  
        wx.showToast({
          title: '签到成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
        wx.navigateTo({
          url: '/pages/Me_Resources/SigningIn/SignInfo',
        })
      } else {
        wx.showToast({ //打卡失败
          title: data.RspTxt,
          icon: 'none',
          duration: 1000
        });
      }
    })
  },
  //签退
  end: function() {
    if (this.data.tupian == "") {
      wx.showToast({ //打卡失败
        title: '请选择图片',
        icon: 'none',
        duration: 1000
      });
      return
    }
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      dotype: 'end', //操作类型
      point: '', //点
      address: '', //位置
      Photo: this.data.tupian,
      bcid: this.data.bcid.toString(),
      isout: '',
      wxPaiZhao: '',
      utoken: utoken
    }
    comm.unitWebsitePro('PostAttenDance', tempData, function(data) {
      debugger
      if (data.RspCode == "0000") { //打卡成功  
        wx.showToast({
          title: data.RspTxt,
          icon: 'succes',
          duration: 2000,
          mask: true
        });
        wx.navigateTo({
          url: '/pages/Me_Resources/SigningIn/SignInfo',
        })
      } else {
        wx.showToast({ //打卡失败
          title: data.RspTxt,
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  //刷新下拉页面函数
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  // 用户点击右上角分享 
  onShareAppMessage: function() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Me平台',
      path: '/pages/yingyong/yingyong',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})