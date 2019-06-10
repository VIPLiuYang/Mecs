// pages/Me_SalesGoods/ProductSelection/ProductSelection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    accounts: ["仓库一", "仓库二", "历下仓库", "历城", "仓库三", "11", "22", "wt"],
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    var checkboxItems = this.data.checkboxItems, accountIndex = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {

      
        if (checkboxItems[i].name == e.currentTarget.dataset.can) {
          checkboxItems[i].accountIndex = e.detail.value;
          break;
        }
    
    }

    this.setData({
      checkboxItems: checkboxItems
    });
    // this.setData({
    //   accountIndex: e.detail.value
    // })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      checkboxItems[i].accountIndex = 0;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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