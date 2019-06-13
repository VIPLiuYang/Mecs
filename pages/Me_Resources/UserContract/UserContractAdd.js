// pages/renyuanhetong/renyuanhetongadd.js
var util = require('../../../utils/util.js');
var comm = require('../../../utils/PublicProtocol.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ["劳动合同", "保密协议", "聘用合同", "其他"],
    accountIndex: 0,
    dates: '',
    startdate: '',
    enddate: '',
    ygname:'',
    ygno:''
  },


  tianjia:function(){
    wx.navigateTo({
      url: '/pages/Me_PublicPage/UserChoice/UserChoice',
    })
  },
  showTopTips:function(e){
    var Cno = e.detail.value.cno;	//合同编号
    var Ctype = this.data.accounts[this.data.accountIndex];	//合同类型
    var EmployNo = this.data.ygno;	//员工编号
    var Employ = this.data.ygname;	//员工姓名
    var Ctime = this.data.dates;	//签订日期
    var Stime=this.data.startdate;	//开始日期
    var Etime=this.data.enddate;	//结束日期
    var DealMan = e.detail.value.dealMan;	//经办人
    var Content=e.detail.value.content;	//合同摘要

    var appid = wx.getStorageSync('appid');
    var uuid = wx.getStorageSync('uuid');
    var utoken = wx.getStorageSync('utoken');
    var tempData = {
      uuid: uuid, //设备id
      appid: appid,
      dotype: 'add',
      Cno: Cno,
      Ctype: Ctype,
      EmployNo: EmployNo,
      Employ: Employ,
      Ctime: Ctime,
      Stime: Stime,
      Etime: Etime,
      DealMan: DealMan,
      Content: Content,
      utoken: utoken
    }
    var this11 = this;

    comm.unitWebsitePro('PostEmpContract', tempData, function (data) {

      var bool = data.RspCode;
if(bool=="0000"){
  wx.showToast({
    title: '添加成功',
    icon: 'succes',
    duration: 1000
  })
  wx.navigateTo({
    url: '/pages/Me_Resources/UserContract/UserContractList',
  })
}else{

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
   var cs= e.currentTarget.dataset.can
   if(cs=='1'){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取当前时间 
    //  var shijain = util.formatTime(new Date());
    //获取当前日期
    var shijain = util.formatDate(new Date());
    this.setData({
      dates: shijain,
      startdate: shijain,
      enddate: shijain
    })
   wx.setNavigationBarTitle({
     title: '人员合同添加',
   })
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