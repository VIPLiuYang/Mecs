var comm = require('../../../utils/PublicProtocol.js');
Page({

        /**
         * 页面的初始数据
         */
        data: {
          shuju: [],
          liebiao: []
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
          var id = options.id;
          var appid = wx.getStorageSync('appid');
          var uuid = wx.getStorageSync('uuid');
          var utoken = wx.getStorageSync('utoken');
          var tempData = {
            uuid: uuid, //设备id
            appid: appid, //
            id: id,
            utoken: utoken
          }
          var this11 = this;
          comm.unitWebsitePro('PostNoticeDetail', tempData, function (data) {
            debugger
            var shuju = data.RspData.noticedetail[0];
            var liebiao = data.RspData.employsee;
            this11.setData({
              shuju: shuju,
              liebiao: liebiao
            })
          })


        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})