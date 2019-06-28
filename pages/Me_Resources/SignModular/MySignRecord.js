var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数

var pageindex = 1; //获取的页码
var Flag = 0; //0刷新，1加载更多
Page({
  /**
   * 页面的初始数据
   */


  
  data: {
    isxs: false, //是否显示加载更多
    isyw: true, //是否显示暂无数据
    cardrecordlist: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
    wx.setNavigationBarTitle({//修改标题
      title: '我的打卡记录'
    })
    wx.hideLoading()
    var Flag = 0; //0刷新，1加载更多
    this.getlist(); 
  },
  clickgd:function(){//加载更多
    Flag = 1; //0刷新，1加载更多
    this.getlist();
  },
  //获取数据列表
  getlist: function() {
          var appid = wx.getStorageSync('appid'); //获取缓存中APPID
          var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID 
          var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      isboss: '0', //是否领导
      pagesize: 10, //每页条数
      pageindex: pageindex, //页码
      utoken: utoken
    }
    var that = this;
    comm.unitWebsitePro('PostCardRecordList', tempData, function(data) {
      if (data.RspCode == "0000") { //正常  
        if (Flag==0){
          that.setData({
            cardrecordlist: data.RspData.cardrecordlist, //绑定数据列表
            isxs: true //显示加载更多
          });
        }else{
          that.setData({//加载更多数组拼接
            cardrecordlist: that.data.cardrecordlist.concat(data.RspData.cardrecordlist), 
            isxs: true  
          });
        }
        pageindex++;
      } else { //暂无数据
        that.setData({
          isyw: false //显示暂无数据标签
        });
      }
    })
  },

        //列表详情
mingxi: function (e) {
        var cardId = e.currentTarget.dataset.cardId; //获取打卡ID
                wx.navigateTo({ //页面跳转
                        url: '/pages/Me_Resources/SignModular/Recorddetails?cardId=' + cardId,
                })
},

  onUnload: function() {//页面返回时恢复默认
    pageindex = 1; //获取的页码
    Flag = 1; //0刷新，1加载更多
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
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