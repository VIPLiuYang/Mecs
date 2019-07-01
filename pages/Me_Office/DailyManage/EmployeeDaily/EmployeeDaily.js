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
    isxs: false, //是否显示加载更多
    hiddenmodalput: true,
    shuju: [],
    type: '',
    id: '',
    content: '',
    ribaoid: '',
    show: false //控制 暂无数据 是否显示
  },
  dianzan: function (e) {
    var id = e.currentTarget.dataset.id;
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var candata = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'fabulous',
      id: Number(id),
      utoken: utoken
    }

    var this1 = this;
    comm.unitWebsitePro('PostFabulousReply', candata, function (data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: data.RspTxt,
          icon: 'succes',
          duration: 1000
        })

      } else {

        wx.showToast({
          title: data.RspTxt,
          icon: 'none',
          duration: 2000
        })
      }
    })
    this.onLoad()
  },

  neitong: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  //点击按钮弹出指定的hiddenmodalput弹出框
  tkReply: function (e) {
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    var ribaoid = e.currentTarget.dataset.ribaoid;
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      type: type,
      id: id,
      ribaoid: ribaoid
    })
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

  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var candata = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'reply',
      id: this.data.ribaoid,
      replyType: this.data.type,
      replyContentID: Number(this.data.id),
      replyContent: this.data.content,
      utoken: utoken
    }

    var this1 = this;
    comm.unitWebsitePro('PostFabulousReply', candata, function (data) {
      var bool = data.RspCode;
      if (bool == "0000") {
        wx.showToast({
          title: '回复成功',
          icon: 'succes',
          duration: 1000
        })

      } else {

        wx.showToast({
          title: '回复失败',
          icon: 'none',
          duration: 2000
        })
      }

    })
    this.onLoad()

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
    var can = e.currentTarget.dataset.can; //获取通知公告编号
    var arrstr = JSON.stringify(can);
    wx.navigateTo({ //页面跳转
      url: '/pages/Me_Office/DailyManage/MyDaily/MyDailyDetail?can=' + arrstr,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'list',
      isboss: 0,
      pagesize: 10,
      pageindex: 1,
      utoken: utoken
    }
    this.GetList()
    wx.hideLoading()
  },
  //查询按钮
  clicksearch: function (e) {
    wx.showLoading({
      title: '请稍等',
    })
    //获取缓存中的数据
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    pageindex = 1; //获取的页码
    Flag = 0; //0刷新，1加载更多 
    if (this.data.word == "") {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: 0,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } else {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: 0,
        name: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }
    this.GetList(); //获取人员合同列表
    wx.hideLoading()
  },
  //获取人员列表
  GetList: function (e) {
    var this1 = this;
    comm.unitWebsitePro('PostDailyList', tempData, function (data) {
      if (data.RspCode == "0000") { //正常 

        for (var i = 0; i < data.RspData.stafdailylist.length; i++) {
          if (data.RspData.stafdailylist[i]["photo1"] != null && data.RspData.stafdailylist[i]["photo1"] != "") //头像为空不执行拼接
          {
            data.RspData.stafdailylist[i]["photo1"] = "http://mecs.ip165.com/" + data.RspData.stafdailylist[i]["photo1"];
          }
          if (data.RspData.stafdailylist[i]["photo2"] != null && data.RspData.stafdailylist[i]["photo2"] != "") //头像为空不执行拼接
          {
            data.RspData.stafdailylist[i]["photo2"] = "http://mecs.ip165.com/" + data.RspData.stafdailylist[i]["photo2"];
          }
          if (data.RspData.stafdailylist[i]["photo3"] != null && data.RspData.stafdailylist[i]["photo3"] != "") //头像为空不执行拼接
          {
            data.RspData.stafdailylist[i]["photo3"] = "http://mecs.ip165.com/" + data.RspData.stafdailylist[i]["photo3"];
          }
          if (data.RspData.stafdailylist[i]["touxiang"] != null && data.RspData.stafdailylist[i]["touxiang"] != "") //头像为空不执行拼接
          {
            data.RspData.stafdailylist[i]["touxiang"] = "http://mecs.ip165.com/" + data.RspData.stafdailylist[i]["touxiang"];
          }

        }
        if (Flag == 0) {
          this1.setData({
            shuju: data.RspData.stafdailylist, //绑定数据列表
            isxs: true, //显示加载更多
            show: false
          });
        } else {
          this1.setData({ //加载更多数组拼接
            shuju: this1.data.shuju.concat(data.RspData.stafdailylist),
            isxs: true,
            show: false
          });
        }
        pageindex++;
      } else { //暂无数据
        if (Flag == 1) {
          wx.showToast({
            title: '已是最后一页',
            icon: 'none',
            duration: 2000
          })
          this1.setData({
            isxs: false,
          });
        } else {
          this1.setData({
            shuju: [],
            isxs: false,
            show: true
          });
        }
      }
    })
  },

  //分页
  clickgd: function () {
    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    if (this.data.word == "") {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: 0,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    } else {
      tempData = {
        uuid: uuid, //设备id
        appid: appid, //
        dotype: 'list',
        isboss: 0,
        name: this.data.word,
        pagesize: 10,
        pageindex: pageindex,
        utoken: utoken,
      };
    }

    Flag = 1; //0刷新，1加载更多
    this.GetList(); //获取人员列表
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
    pageindex = 1; //获取的页码
    Flag = 0; //0刷新，1加载更多
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