var comm = require('../../../utils/PublicProtocol.js'); //引用post公共函数
Page({
  data: {
    treeData: {
      text: '选择人员',
      id: 0,
      childMenus: [
        {
          text: 'Parent 1',
          id: 1,
          childMenus: [
            {
              text: 'Child 1',
              id: 2,
              childMenus: [
                {
                  text: 'Grandchild 1',
                  id: 3,
                },
                {
                  text: 'Grandchild 2',
                  id: 4,
                },
              ]
            },
            {
              text: 'Child 2',
              id: 5,
            }
          ]
        },
        {
          text: 'Parent 2',
          id: 6,
          childMenus: [
            {
              text: 'Child 1',
              id: 7,
            },
            {
              text: 'Child 2',
              id: 8,
            }
          ]
        }
      ]
    },
  },
  //事件处理函数
  tapItem: function (e) {
    console.log('index接收到的itemid: ' + e.detail.itemid);
  },

tz:function(){

wx.navigateTo({
  url: '/pages/search/search',
})
},

  onLoad: function () {
    // // 初始赋值
    // //树状 数据 查询
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
debugger
    
    var retval = comm.unitWebsiteProTwo('PostLocation', tempData)

    var  hhazhi=comm.str;
    debugger
    that.setData({
      treeData: retval.RspData.treelist
      });
   
    // comm.unitWebsitePro('PostLocation', tempData, function (data) {
    //   debugger
    //   var shuju = data.RspData.treelist
    //   that.setData({
    //     treeData: shuju
    //   });
    // })

  },
})