// pages/index/index.js
import constant from '../../common/constant';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  navChange_images(e) {  
    if (isNavigating) return; // 如果正在导航，则返回  
    isNavigating = true; // 设置正在导航状态  

    this.setData({  
        pageCur: e.currentTarget.dataset.cur  
    });  

    wx.navigateTo({  
        url: '/pages/index/index',  
        success: () => {  
            isNavigating = false; // 完成导航后解除锁定  
        },  
        fail: () => {  
            isNavigating = false; // 如果导航失败也解除锁定  
        }  
    });  
},

  navChange_AI(e) {  
      if (isNavigating) return; // 如果正在导航，则返回  
      isNavigating = true; // 设置正在导航状态  
  
      this.setData({  
          pageCur: e.currentTarget.dataset.cur  
      });  
  
      wx.navigateTo({  
          url: '/pages/AI/AI',  
          success: () => {  
              isNavigating = false; // 完成导航后解除锁定  
          },  
          fail: (error) => {  
              console.error('Navigation failed:', error);  
              isNavigating = false; // 如果导航失败也解除锁定  
          }  
      });  
  },

  navChange_watch(e) {  
    if (isNavigating) return; // 如果正在导航，则返回  
    isNavigating = true; // 设置正在导航状态  

    this.setData({  
        pageCur: e.currentTarget.dataset.cur  
    });  

    wx.navigateTo({  
        url: '/pages/watch/watch',  
        success: () => {  
            isNavigating = false; // 完成导航后解除锁定  
        },  
        fail: () => {  
            isNavigating = false; // 如果导航失败也解除锁定  
        }  
    }); 
  }, 

  navChange_login(e) {  
    if (isNavigating) return; // 如果正在导航，则返回  
    isNavigating = true; // 设置正在导航状态  

    this.setData({  
        pageCur: e.currentTarget.dataset.cur  
    });  

    wx.navigateTo({  
        url: '/pages/login/login',  
        success: () => {  
            isNavigating = false; // 完成导航后解除锁定  
        },  
        fail: () => {  
            isNavigating = false; // 如果导航失败也解除锁定  
        }  
    });  
  },
  uploadPhoto() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  }
})

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: constant.SERVER_URL + "/FileUploadServlet",
      filePath: path[0], 
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'session_token': wx.getStorageSync('session_token')
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = res.data
        page.setData({  //上传成功修改显示头像
          src: path[0]
        })
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
  }