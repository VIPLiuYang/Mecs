var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
const app = getApp();
var rate = 0;
var canvasWidth = 0;
var canvasHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnCanvasData: {
      canvasId: 'columnCanvas',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.systemInfo);
    var systemInfo = app.systemInfo;
    rate = systemInfo.screenWidth / 750;
    var updateData = {};
    canvasWidth = systemInfo.screenWidth - rate * 64;
    canvasHeight = rate * 306 + rate * 44 + rate * 34 + rate * 22;

    var culumnYMax = 3;
    var culumnYMin = 0;
    updateData['columnCanvasData.canvasWidth'] = canvasWidth;
    updateData['columnCanvasData.axisPadd'] = {
      left: rate * 5,
      top: rate * 13,
      right: rate * 5
    };
    updateData['columnCanvasData.axisMargin'] = {
      bottom: rate * 34,
      left: rate * 26
    };
    updateData['columnCanvasData.yAxis.fontSize'] = rate * 22;
    updateData['columnCanvasData.yAxis.fontColor'] = '#637280';
    updateData['columnCanvasData.yAxis.lineColor'] = '#DCE0E6';
    updateData['columnCanvasData.yAxis.lineWidth'] = rate * 2;
    updateData['columnCanvasData.yAxis.dataWidth'] = rate * 62;
    updateData['columnCanvasData.yAxis.isShow'] = true;
    updateData['columnCanvasData.yAxis.isDash'] = true;
    updateData['columnCanvasData.yAxis.minData'] = culumnYMin;
    updateData['columnCanvasData.yAxis.maxData'] = culumnYMax;
    updateData['columnCanvasData.yAxis.padd'] = rate * 306 / (culumnYMax - culumnYMin);

    updateData['columnCanvasData.xAxis.dataHeight'] = rate * 26;
    updateData['columnCanvasData.xAxis.fontSize'] = rate * 22;
    updateData['columnCanvasData.xAxis.fontColor'] = '#637280';
    updateData['columnCanvasData.xAxis.lineColor'] = '#DCE0E6';
    updateData['columnCanvasData.xAxis.lineWidth'] = rate * 2;
    updateData['columnCanvasData.xAxis.padd'] = rate * 52;
    updateData['columnCanvasData.xAxis.dataWidth'] = rate * 64;
    updateData['columnCanvasData.xAxis.leftOffset'] = rate * 40;


    updateData['columnCanvasData.canvasHeight'] = canvasHeight;
    updateData['columnCanvasData.enableScroll'] = true;

    this.setData(updateData);
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

    var tempData = {
      uuid: wx.getStorageSync('uuid'), //设备id
      appid: wx.getStorageSync('appid'), //
      dotype: 'form', //操作类型
      utoken: wx.getStorageSync('utoken')
    }
    comm.unitWebsitePro('PostAttenDance', tempData, function(data) {
      debugger

      var arr = data.RspData.report
    })




    var updateData = {};

    var columnYMax = 3;
    var columnYMin = 0;

    updateData['columnCanvasData.yAxis.minData'] = columnYMin;
    updateData['columnCanvasData.yAxis.maxData'] = columnYMax;
    updateData['columnCanvasData.series'] = [{
      data: [1, 2, 3, 1.5, 2.5],
    }];
    updateData['columnCanvasData.xAxis.data'] = ['正常', '迟到', '早退', '未签', '缺勤'];
    updateData['columnCanvasData.yAxis.data'] = [{
        x: 0,
        y: 0,
        title: '0'
      },
      {
        x: 0,
        y: 0.5,
        title: '0.5'
      },
      {
        x: 0,
        y: 1,
        title: '1'
      },
      {
        x: 0,
        y: 1.5,
        title: '1.5'
      },
      {
        x: 0,
        y: 2,
        title: '2'
      },
      {
        x: 0,
        y: 2.5,
        title: '2.5'
      },
      {
        x: 0,
        y: 3,
        title: '3'
      }

    ];


    this.setData(updateData);
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
    console.log("122222");
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

  },


  onTouchHandler(e) {
    if (null == this.column_chart) {
      this.column_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchHandler(e);
  },
  onTouchMoveHandler(e) {
    if (null == this.column_chart) {
      this.column_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchMoveHandler(e);
  },
  onTouchEndHandler(e) {
    if (null == this.column_chart) {
      this.ccolumn_chart = this.selectComponent("#column-chart");
    }
    this.column_chart.onTouchEndHandler(e);
  },


})