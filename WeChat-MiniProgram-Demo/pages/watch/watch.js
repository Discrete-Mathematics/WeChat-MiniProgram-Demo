let isNavigating = false;
function getRandomColor () {
    let rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }
  
  Page({
    onReady: function (res) {
      this.videoContext = wx.createVideoContext('myVideo')
    },
    inputValue: '',
      data: {
    pageCur:"watch",
          src: '',
      danmuList: [
        {
          text: '第 1s 出现的弹幕',
          color: '#ff0000',
          time: 1
        },
        {
          text: '第 3s 出现的弹幕',
          color: '#ff00ff',
          time: 3
        }
      ]
      },
    bindInputBlur: function(e) {
      this.inputValue = e.detail.value
    },
      bindButtonTap: function() {  //视频下载
          var that = this
          wx.chooseVideo({
              sourceType: ['album', 'camera'],
              maxDuration: 60,
              camera: ['front','back'],
              success: function(res) {
                  that.setData({
                      src: res.tempFilePath
                  })
              }
          })
      },
    bindSendDanmu: function () {
      this.videoContext.sendDanmu({
        text: this.inputValue,
        color: getRandomColor()
      })
    },
      videoErrorCallback: function(e) {
        console.log('视频错误信息:');
        console.log(e.detail.errMsg);
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