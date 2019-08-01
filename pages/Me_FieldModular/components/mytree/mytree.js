// pages/components/mytree/mytree.js

var comm = require('../../../../utils/PublicProtocol.js'); //引用post公共函数
Component({
  properties: {
    model: Object,
  },
  data: {
    open: false,
    isBranch: false,
  },

  methods: {
    toggle: function (e) {
      if (this.data.isBranch) {
        this.setData({
          open: !this.data.open,
        })
      }
    },
    tapItem: function (e) {
      var itemid = e.currentTarget.dataset.itemid;
      console.log('组件里点击的id: ' + itemid);
      this.triggerEvent('tapitem', { itemid: itemid }, { bubbles: true, composed: true });
    }
  },

  ready: function (e) {


    // var zhi = this.data.model

    // 初始赋值
    //树状 数据 查询
    // var appid = wx.getStorageSync('appid'); //获取缓存中APPID
    // var uuid = wx.getStorageSync('uuid'); //获取缓存中设备ID 
    // var utoken = wx.getStorageSync('utoken'); //获取缓存中用户utoken
    // var tempData = {
    //   uuid: uuid, //设备id
    //   appid: appid, //
    //   dotype: 'tree', //树
    //   utoken: utoken
    // }
    // var that = this;
    // comm.unitWebsitePro('PostLocation', tempData, function (data) {
  
    //   var shuju = data.RspData.treelist
    //   that.setData({
    //     model: shuju
    //   });
    
    //   console.log(shuju);
    // })
    this.setData({
      isBranch: Boolean(this.data.model && this.data.model.length),
    });

    
  },
})