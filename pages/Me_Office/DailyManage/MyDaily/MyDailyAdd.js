var comm = require('../../../../utils/PublicProtocol.js');
Page({

        /**
         * 页面的初始数据
         */
        data: {
                imgList: [],
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
        ChooseImage() {
                wx.chooseImage({
                        count: 4, //默认9
                        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album'], //从相册选择
                        success: (res) => {
                                if (this.data.imgList.length != 0) {
                                        this.setData({
                                                imgList: this.data.imgList.concat(res.tempFilePaths)
                                        })
                                } else {
                                        this.setData({
                                                imgList: res.tempFilePaths
                                        })
                                }
                        }
                });
        },
        ViewImage(e) {
                wx.previewImage({
                        urls: this.data.imgList,
                        current: e.currentTarget.dataset.url
                });
        },
        DelImg(e) {
                wx.showModal({
                        title: '删除',
                        content: '确定要删除该图片吗？',
                        cancelText: '取消',
                        confirmText: '确定',
                        success: res => {
                                if (res.confirm) {
                                        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                                        this.setData({
                                                imgList: this.data.imgList
                                        })
                                }
                        }
                })
        },
        textareaAInput(e) {
                this.setData({
                        textareaAValue: e.detail.value
                })
        },
        textareaBInput(e) {
                this.setData({
                        textareaBValue: e.detail.value
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