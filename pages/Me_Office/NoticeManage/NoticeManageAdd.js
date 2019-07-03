var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["一般事务通知", "放假通知", "投票", "公司新闻"],
    accountIndex: 0,
    retarray: [],
    check: 0
  },
  showTopTips: function(e) {
    var zhi = "";
    if (this.data.check == 1) {
      var arr = this.data.retarray
      if (arr.length == 0) {
        wx.showToast({
          title: '请选择员工',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //拼接编号（,）
      var arr = this.data.retarray;
      for (var i = 0; i < arr.length; i++) {
        zhi += arr[i].employno + ",";
      }
      zhi = zhi.substring(0, zhi.length - 1)
      

    }

    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      ggtitle: e.detail.value.title,
      type: this.data.accounts[this.data.accountIndex],
      contenttext: e.detail.value.content,
      islimit: this.data.check,
      employNo: zhi,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostNoticeList', tempData, function(data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_Office/NoticeManage/NoticeManage',
        })
      } else {

        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
  },
  bindAccountChange: function(e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },
  checked: function(e) {
    var zhi = e.currentTarget.dataset.ch;
    if (zhi == 0) {
      this.setData({
        check: 1
      })
    } else {
      this.setData({
        check: 0
      })
    }
  },
  radiochange: function(e) {
    console.log('radio发生change事件，携带的value值为：', e.detail.value)
  },
  prodect: function() {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/SelectEmploy/SelectEmploy',
    })
  },
  del: function(e) {
    var rowindex = e.currentTarget.dataset.xb;
    var arr = this.data.retarray;
    var leibiao = arr.filter((ele, index) => {
      return index != rowindex
    })

    this.setData({
      retarray: leibiao
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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