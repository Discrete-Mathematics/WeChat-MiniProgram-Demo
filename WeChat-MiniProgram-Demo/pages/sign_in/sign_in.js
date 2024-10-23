// pages/login/login.js
const app = getApp();
const util = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // 点击“注册”后触发 enroll 方法，跳转到 enroll 模块
  enroll: function (e) {
  	// 发起网络请求
    wx.navigateTo({
	  // 开发者服务器接口地址
      url: '/pages/enroll/enroll',
    })
  },

	// 点击登录按钮后，触发此login方法
  login: function (e) {
    var me = this;
    // 获取前台form表单传递过来的信息，
    // e.detail.value.xxx：xxx为name属性的值
    var formObject = e.detail.value;
    console.log(e.detail);
    var username = formObject.username;
    var password = formObject.password;
    console.log("username..." + username);
    console.log("password....." + password);
    // 发起网络请求
    wx.request({
      url: util.basePath + '/login.php', 
      // 声明请求方式为 POST 请求
      method: 'POST',
      // 向后台传递的数据：用户名、密码（通过e.detail.value.xxx获取input输入框输入的值）
      data: {
        'username': e.detail.value.username,
        'password': e.detail.value.password
      },
      // POST请求，则header声明为如下：
      // 若为 GET请求，则header内声明为'content-type': 'application/json'
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // 接口请求成功的返回数据
      success(res) {
        console.log(res.data);
        // 如果后台返回的数据为 "普通用户登录成功"，则跳转到用户首页
        if ("普通用户登录成功" == res.data) {
          wx.navigateTo({
            url: '../index/index'
          })
        } else if ("管理员登录成功" == res.data) {
        // 如果后台返回的数据为 "普通用户登录成功"，则跳转到管理员首页
          wx.navigateTo({
            url: '../index/index'
          })
        } else if ("用户名或密码错误" == res.data) {
        // 如果后台返回的数据为 "用户名或密码错误"，则模态弹框，然后跳转到登录界面
          wx.showModal({
            title: '提示',
            content: '用户名或密码错误',
            showCancel: "false",
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.navigateTo({
                  url: '../sign_in/sign_in'
                })
              }
            }
          })
        }

      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
