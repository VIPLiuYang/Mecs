//var security = require("../utils/security.js");


//发送对应的接口协议，根据页面传送的data
var unitWebsitePro = function (name, data, callback) {
  wxPost('http://api.ip165.com/api/Data/'+name, JSON.stringify(data), callback);
}


 //生成随机数
var random = function () {
   var i = Math.random() * (999999 - 100000) + 100000;
  var j = parseInt(i, 10).toString(); 
  return j;
} 
/** 
 * wx.request调用接口
 * @param {Object} url 路径
 * @param {Object} data 数据
 * @param {Object} callback 回调
 */
var wxPost = function (url, data, callback) {
  console.log('wx.request-Url:', url);
  console.log('wx.request-Data:', data);
  wx.request({
    url: url,
    data: data,
    header: { 'Content-Type': 'application/json' },
    method: 'POST',
    success: function (res) {
      console.log('wx.request-Success:', res.data);
      if (res.data.RspCode=="0006"){
        wx.showToast({
          title: '登录日期已过期(限制二小时)',
          icon: 'none',
          duration: 2000
        })
        wx.clearStorage()
        wx.clearStorageSync()
        wx.navigateTo({
          url: '/pages/LoginHome/Login',
        })

      }
      callback(res.data);
    },
    fail:function(res){
      callback({
        RspCode: 404,
        RspData: null,
        RspTxt: "网络连接失败,请重新尝试一下"
      });
    }
  })

 
}
/** 
 * wx.request RSA公钥加密
 * @param {Object} Exponent 模数
 * @param {Object} Modulus 指数
 * @param {Object} data 待加密数据
 */
var RSAencrypted = function (exponent, modulus,data) {
  //BigInt.setMaxDigits(131);
  //var key = new RSA.RSAKeyPair(exponent, '', modulus);
  //return comm.RSA.encryptedString(key, data);
  var key = security.RSAUtils.getKeyPair(exponent, "", modulus);
  return security.RSAUtils.encryptedString(key, data);
} 
 




module.exports = {
  getRequestUrl: "http://58.56.9.133:4188/api/Data/" ,
  unitWebsitePro: unitWebsitePro,
  random: random,
  RSAencrypted: RSAencrypted
} 




