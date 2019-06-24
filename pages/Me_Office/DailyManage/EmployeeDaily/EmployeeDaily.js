var comm = require('../../../../utils/PublicProtocol.js'); //引用post公共函数
const app = getApp();
var pageindex = 1; //获取的页码
var Flag = 0; //0刷新，1加载更多
var tempData = ""; //POST参数定义


Page({
        //页面的初始数据 
        data: {
                StatusBar: app.globalData.StatusBar, //手机信息
                CustomBar: app.globalData.CustomBar, //手机信息
                word: '', //搜索框内容 
                htlist: [],
                isxs: false, //是否显示加载更多
                isyw: true, //是否显示暂无数据
                hiddenmodalput: true,
        },
        //点击按钮弹出指定的hiddenmodalput弹出框
        modalinput: function () {
                this.setData({
                        hiddenmodalput: !this.data.hiddenmodalput
                })
        },
        bindDateChange: function (e) {
                this.setData({
                        date: e.detail.value
                })
        },
        bindDateChange2: function (e) {
                this.setData({
                        date: e.detail.value
                })
        },

        //取消按钮
        cancel: function () {
                this.setData({
                        hiddenmodalput: true
                });
        },
        //批复按钮
        confirm: function () {
                this.setData({
                        hiddenmodalput: true
                })
        },

        onUnload: function () {//页面返回时恢复默认
                pageindex = 1; //获取的页码
                Flag = 1; //0刷新，1加载更多
        },


        // 获取搜索框内容
        cxsearch: function (e) {
                this.setData({
                        word: e.detail.value
                });
                this.setData({
                        cxsearch: true
                });
        },

        //列表详情
        mingxi: function (e) {
                var Cno = e.currentTarget.dataset.cno; //获取通知公告编号
                wx.navigateTo({ //页面跳转
                        url: '/pages/Me_Office/DailyManage/EmployeeDaily/EmployeeDailyDetail?Con=' + Cno,
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

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