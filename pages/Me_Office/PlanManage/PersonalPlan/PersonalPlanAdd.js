var comm = require('../../../../utils/PublicProtocol.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stime: '',
    etime: '',
  },
  showTopTips: function (e) {
    

    //调用添加接口
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      jhtitle: e.detail.value.title,
      Stime:this.data.stime,
      Etime:this.data.etime,
      jhcontent: e.detail.value.content,
      utoken: utoken
    }
    var this11 = this;
    comm.unitWebsitePro('PostMyPlanningList', tempData, function (data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '添加成功',
          icon: 'succes',
          duration: 1000
        })
        wx.navigateTo({
          url: '/pages/Me_Office/PlanManage/PersonalPlan/PersonalPlan',
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
  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    var cs = e.currentTarget.dataset.can
    if (cs == '1') {
      this.setData({
        stime: e.detail.value
      })
    }
    if (cs == '2') {
      this.setData({
        etime: e.detail.value
      })
    }
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