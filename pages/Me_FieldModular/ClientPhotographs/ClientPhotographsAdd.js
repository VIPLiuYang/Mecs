// 引用百度地图微信小程序JSAPI模块   
var bmap = require('../../../libs/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象  

var comm = require('../../../utils/PublicProtocol.js');
var appid = wx.getStorageSync('appid'); //获取缓存中APPID
var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID
var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
const app = getApp();
Page({

        /**
         * 页面的初始数据
         */
        data: {
                files: [],//图片信息
                ak: "EdWIlpQDhrLErhtkPEI7kiFEawElVT2R", //ak  
                markers: [],
                longitude: '',   //经度  
                latitude: '',    //纬度  
                address: '',     //地址  
                cityInfo: {},     //城市信息
                    dates: '',
          ryno: '', //客户选择编号
          ryname: '', //客户选择名称
        },
  tianjia: function () {
    wx.navigateTo({
      url: '/pages/Me_PublicPage/CustomChoice/CustomChoice',
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {

    this.setData({
      dates: e.detail.value
    })
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
        chooseImage: function (e) {
                var that = this;
                wx.chooseImage({
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                                var tempFilePaths = res.tempFilePaths
                                wx.uploadFile({
                                        url: 'http://api.ip165.com/api/Data/SaveImages',
                                        filePath: tempFilePaths[0],
                                        name: 'file',
                                        header: {
                                                'content-type': 'multipart/form-data',
                                                'utoken': 'MXu8ycByYPKlk483A39NlHJxXA0=' //如果需要token的话要传
                                        },
                                        formData: {
                                                //utoken: 'MXu8ycByYPKlk483A39NlHJxXA0='
                                        },
                                        success: function (res) {
                                                var a = JSON.parse(res.data)
                                                wx.hideLoading();
                                                wx.showToast({
                                                        title: '上传成功',
                                                        icon: 'succes',
                                                        duration: 1000,
                                                        mask: true
                                                })
                                                console.log(a);
                                        },
                                        fail: function () {
                                        }
                                })



                                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                                that.setData({
                                        files: that.data.files.concat(res.tempFilePaths)
                                });
                        }
                })
        },
        previewImage: function (e) {
                wx.previewImage({
                        current: e.currentTarget.id, // 当前显示图片的http链接
                        urls: this.data.files // 需要预览的图片http链接列表
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                var that = this;
                /* 获取定位地理位置 */
                // 新建bmap对象   
                var BMap = new bmap.BMapWX({
                        ak: that.data.ak
                });
                var fail = function (data) {
                        console.log(data);
                };
                var success = function (data) {
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
        },
        //添加日报事件
        showTopTips: function (e) {
                var tempData = {
                        uuid: uuid, //设备id
                        appid: appid, //
                        dotype: 'add', //操作类型
                        type: '0',//添加类型
                        point: '', //点
                        address: '', //位置
                        Photo1: '',
                        Photo2: '',
                        Photo3: '',
                        content: e.detail.value.dailyContent,
                        planContent: e.detail.value.plan,
                        allContent: e.detail.value.summary,
                        wxPaiZhao:'',
                        utoken: utoken
                }
                comm.unitWebsitePro('PostDailyList', tempData, function (data) {
                        if (data.RspCode == "0000") { //添加成功  
                                wx.showToast({
                                        title: '添加成功',
                                        icon: 'success',
                                        duration: 1000
                                });
                                wx.navigateTo({
                                        url: '/pages/Me_Office/DailyManage/MyDaily/MyDaily',
                                })
                        } else {
                                wx.showToast({ //添加失败
                                        title: '添加失败',
                                        icon: 'error',
                                        duration: 1000
                                });
                        }
                })
        },
        //刷新下拉页面函数
        onPullDownRefresh: function () {
                wx.stopPullDownRefresh();
        },
        // 用户点击右上角分享 
        onShareAppMessage: function () {
                if (res.from === 'button') {
                        // 来自页面内转发按钮
                        console.log(res.target)
                }
                return {
                        title: 'Me平台',
                        path: '/pages/yingyong/yingyong',
                        success: function (res) {
                                // 转发成功
                        },
                        fail: function (res) {
                                // 转发失败
                        }
                }
        }
})