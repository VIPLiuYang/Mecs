var comm = require('../../../../utils/PublicProtocol.js');
Page({

        /**
         * 页面的初始数据
         */
        data: {
        },
        //  点击日期组件确定事件  
        bindDateChange: function (e) {
                var cs = e.currentTarget.dataset.can
                if (cs == '1') {
                        this.setData({
                                dates: e.detail.value
                        })
                }
                if (cs == '2') {
                        this.setData({
                                startdate: e.detail.value
                        })
                }
                if (cs == '3') {
                        this.setData({
                                enddate: e.detail.value
                        })
                }
        },

        bindAccountChange: function (e) {
                console.log('picker account 发生选择改变，携带值为', e.detail.value);

                this.setData({
                        accountIndex: e.detail.value
                })
        },

        radiochange: function (e) {
                console.log('radio发生change事件，携带的value值为：', e.detail.value)
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