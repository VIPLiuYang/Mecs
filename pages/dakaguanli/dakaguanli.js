var comm = require('../../utils/PublicProtocol.js'); //引用post公共函数
var appid = wx.getStorageSync('appid'); //获取缓存中APPID
var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID
var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
const app = getApp();
Page({
  // 页面的初始数据 
  data: {
    files: []
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
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
    //修改标题
    wx.setNavigationBarTitle({
      title: '打卡记录'
    })
  },

  //开始打卡事件
  start: function() {
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      dotype: 'start', //操作类型
      point: '', //点
      address: '', //位置
      Photo1: '',
      Photo2: '',
      Photo3: '',
      Desc: '',
      utoken: utoken
    }
    comm.unitWebsitePro('PostCardRecord', tempData, function(data) {
      if (data.RspCode == "0000") { //打卡成功  
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 1000
        });
      } else {
        wx.showToast({ //打卡失败
          title: '打卡失败',
          icon: 'error',
          duration: 1000
        });
      }
    })
  },
  //结束打卡事件
  end: function() {
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 1000
    });
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