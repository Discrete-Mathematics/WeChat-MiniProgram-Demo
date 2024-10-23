// pages/user/user.js  
const app = getApp();  

Page({  
  data: {  
    user: {  
      username: "",  
      phoneNumber: "",  
      QQNumber: ""  
    }  
  },  
  
  onLoad: function (options) {  
    // 假设用户信息存储在全局 app 的 user 对象中  
    const userInfo = app.globalData.user; // 更改为您存储用户信息的路径  
    if (userInfo) {  
      this.setData({  
        user: {  
          username: userInfo.username,  
          phoneNumber: userInfo.phoneNumber,  
          QQNumber: userInfo.QQNumber,  
        }  
      });  
    }  
  },  
  
  logout: function() {  
    // 处理退出登录的逻辑，如清除用户信息  
    app.globalData.user = {};  
    wx.navigateBack(); // 或跳转到登录页面  
  }  
});