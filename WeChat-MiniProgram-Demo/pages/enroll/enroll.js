// pages/enroll/enroll.js
const app = getApp();
const util = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 定义变量用来存储input输入的值
    username:"",
    password:"",
    passwordAck:"",
    email:"",
    phoneNumber:"",
    role:""
  },
  signin:function(e){
    //关闭当前页面，返回上一页面或多级页面。
    wx.navigateBack({
      // 返回上 1 页
      delta: 1
    })
  },
  // 注册
  regist:function(e){
    var that = this;
    if(that.data.username == ''){
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.password == ''){
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.passwordAck == ''){
      wx.showModal({
        title: '提示',
        content: '请再次输入密码',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.passwordAck != that.data.password){
      wx.showModal({
        title: '提示',
        content: '两次密码输入不一致',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.email == ''){
      wx.showModal({
        title: '提示',
        content: '请输入邮箱',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.phoneNumber == ''){
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.phoneNumber.length != 11){
      wx.showModal({
        title: '提示',
        content: '手机号位数不正确，请重新输入',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.phoneNumber.length != 11){
      wx.showModal({
        title: '提示',
        content: '手机号不合法',
        showCancel:false,
        success (res) {
        }
      })
    }else if(that.data.role == ''){
      wx.showModal({
        title: '提示',
        content: '请输入角色',
        showCancel:false,
        success (res) {
        }
      })
    }else{
      console.log("注册成功");
      wx.showModal({
        title: '提示',
        content: '注册成功！',
        showCancel:false,
        success (res) {
        }
      })
      wx.request({
        url: util.basePath + '/register.php', 
        method:"POST",
        data: {
          'username':e.detail.value.username,
          'password':e.detail.value.password,
          'email':e.detail.value.email,
          'phone':e.detail.value.phone,
          'role':e.detail.value.role,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'  
        },
        success (res) {
          console.log(res.data);
        }
      })
    }
  },
  // 每当 input 发生改变，触发这个方法
  usernameInput:function(e){
    // 获取 input 输入框的值
    this.data.username = e.detail.value;
  },
  passwordInput:function(e){
    // 获取 input 输入框的值
    this.data.password = e.detail.value;
  },
  passwordInputAck:function(e){
    // 获取 input 输入框的值
    this.data.passwordAck = e.detail.value;
  },
  emailInput:function(e){
    // 获取 input 输入框的值
    this.data.email = e.detail.value;
  },
  phoneNumberInput:function(e){
    // 获取 input 输入框的值
    this.data.phoneNumber = e.detail.value;
  },
  roleInput:function(e){
    // 获取 input 输入框的值
    this.data.role = e.detail.value;
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
