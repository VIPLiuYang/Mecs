// pages/memorycenter-list/memorycenter-list.js
var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选中的
    selectedHidden: true,
    animationHidden: true,
    selectedItem: {},
    // 几个结果
    resultHidden: true,
    datalists: [],
    dataArray: {},
    currentTop: 0,
    scrollTop: 48
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始赋值
    //树状 数据 查询
    var appid = wx.getStorageSync('appid'); //获取缓存中APPID
    var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID 
    var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
    var tempData = {
      uuid: uuid, //设备id
      appid: appid, //
      dotype: 'tree', //树
      utoken: utoken
    }
    var that = this;
    comm.unitWebsitePro('PostLocation', tempData, function (data) {
    debugger
      var shuju = data.RspData.treelist
      that.setData({
        datalists: shuju
      });
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 选择一列
  selectList: function (e) {
    debugger
   // var zhi=e.currentTarget.dataset.item.userlist
    if (e.currentTarget.dataset.item != null && e.currentTarget.dataset.item != undefined) { 
    let top = 38;
    // if (e.currentTarget.dataset.item.level != 1) {
    //   top = 96;
    // }
    this.setData({
      currentTop: e.currentTarget.offsetTop + top,
      selectedHidden: false,
      animationHidden: true,
      selectedItem: e.currentTarget.dataset.item
    });

    this.setData({
      currentTop: 48,
      animationHidden: false,
      scrollTop: 96
    });
    
    setTimeout(res => {
      this.setData({
        datalists: e.currentTarget.dataset.item.treelist
      });
    }, 200);
    }
  },
  // 列表返回上一级
  backTap: function () {
    if (this.data.selectedItem.level == 1) {
      this.setData({
        scrollTop: 48,
        selectedHidden: true,
        datalists: this.data.dataArray.treelist
      })
    } else {
      let id = this.data.selectedItem.id;
      let tempData = this.findParent(this.data.dataArray, id);
      this.setData({
        datalists: tempData.children,
        selectedItem: tempData
      })
    }
  },
  //递归找父级
  findParent: function (data, id) {
    for (let i = 0; i < data.children.length; i++) {
      if (data.children[i].id == id) {
        return data;
      } else {
        let childrenData = this.findParent(data.children[i], id);
        if (childrenData != null) {
          return childrenData;
        }
      }
    }
    return null;
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