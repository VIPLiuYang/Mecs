var wxCharts = require('../../../utils/wxcharts.js');
var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
var app = getApp();
var columnChart = null;
var cishi = 0;
var shuzu = [15, 20, 45, 37, 55];
var chartData = {
  main: {
    title: '考勤报表',
    categories: ['正常', '迟到', '早退', '未签', '缺勤']
  }
};
Page({
  data: {
    chartTitle: '考勤报表',
    isMainChartDisplay: true,
  },

  onReady: function(e) {
    var that = this;
    var tempData = {
      uuid: wx.getStorageSync('uuid'), //设备id
      appid: wx.getStorageSync('appid'), //
      dotype: 'form', //操作类型
      utoken: wx.getStorageSync('utoken')
    }
    comm.unitWebsitePro('PostAttenDance', tempData, function(data) {
      var arr = [];
      var ZhengChang = Number(data.RspData.report[0]["<ZhengChang>k__BackingField"])
      var ChiDao = Number(data.RspData.report[0]["<ChiDao>k__BackingField"])
      var ZaoTui = Number(data.RspData.report[0]["<ZaoTui>k__BackingField"])
      var WeiQian = Number(data.RspData.report[0]["<WeiQian>k__BackingField"])
      var QueQin = Number(data.RspData.report[0]["<QueQin>k__BackingField"])
      arr.push(ZhengChang)
      arr.push(ChiDao)
      arr.push(ZaoTui)
      arr.push(WeiQian)
      arr.push(QueQin)
      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }

      columnChart = new wxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        animation: true,
        categories: chartData.main.categories,
        series: [{
          name: '考勤报表',
          data: arr,
        }],
        yAxis: {
          title: 'hello',
          min: 0
        },
        xAxis: {
          disableGrid: false,
          type: 'calibration'
        },
        extra: {
          column: {
            width: 15
          }
        },
        width: windowWidth,
        height: 200,
      });

    })
   
  }
});