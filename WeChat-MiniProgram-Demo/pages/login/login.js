let isNavigating = false;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    pageCur:'login',
    login: {
      show: false,
      line: false,
      avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    }
 
 
 
  },

 
// 登录监听
chooseAvatar(e) {
  this.setData({
    login: {
      show: true,
      line:true,
      avatar: e.detail.avatarUrl,
    }
  })
},
 
// 基本信息
basicClick() {
  wx.navigateTo({
    url: '/pages/basic_information/basic_information',
  })
},
 
 // 匿名反馈
 feedbackClick() {
  console.log('匿名反馈监听');
},
// 关于我们
aboutClick() {
  console.log('关于我们监听');
},
 
// 退出监听
exitClick() {
  let that = this;
  wx.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success(res) {
      if (res.confirm) {
        that.setData({
          login: {
            show: false,
            avatar: 'https://img0.baidu.com/it/u=3204281136,1911957924&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
          }
        })
      }
    }
  })
  
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
  }
})