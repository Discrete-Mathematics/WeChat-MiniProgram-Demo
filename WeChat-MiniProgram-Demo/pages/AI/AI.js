let isNavigating = false;
var logData = [];
const util = {  
  // 模拟获取用户ID的函数  
  getUserID: function() {  
    // 在实际应用中，这里可能会从本地存储、API或其他来源获取用户ID  
    // 这里返回一个示例ID  
    return wx.getStorageSync('userID') || 'defaultUserID'; // 从本地存储获取用户ID  
  }  
};

Page({  
  data: {
    pageCur:"AI",
    restNum: 200,  
    imgs: [],  
    question: '', // 添加用于存储文本框内容的变量  
    answer: '' // 添加用于存储答案的变量  
  },  

  handleTextareaInput: function(e) {  
    this.setData({  
      restNum: 200 - e.detail.value.length,  
      question: e.detail.value // 保存文本框内容  
    });  
  },  

  uploadFile: function() {  
    var _this = this;  
    wx.showActionSheet({  
      itemList: ['从相册中选择', '拍照'],  
      itemColor: "#18b7ee",  
      success: function(res) {  
        if (!res.cancel) {  
          if (res.tapIndex == 0) {  
            _this.chooseWxImage('album');  
          } else if (res.tapIndex == 1) {  
            _this.chooseWxImage('camera');  
          }  
        }  
      }  
    });  
  },  

  chooseWxImage: function(type) {  
    var _this = this;  
    wx.chooseImage({  
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'],  
      sourceType: [type],  
      success: function(res) {  
        var imgsArr = _this.data.imgs;  
        imgsArr.push(res.tempFilePaths[0]);  

        _this.setData({  
          imgs: imgsArr  
        });  
      }  
    });  
  },  

  handleFormSubmit: function(e) { // 添加 e 参数  
    if (this.data.restNum === 200) {  
      wx.showToast({  
        title: '请填写内容',  
        icon: 'success',  
        duration: 2000  
      });  
      return;  
    }  
    var _this = this; // 保存对 Page 的引用  
    wx.showModal({  
      title: '提示',  
      content: '是否提交您的问题',  
      cancelColor: "#666",  
      confirmColor: '#17b6ed',  
      success: function(res) { // 修改为 res  
        if (res.confirm) { // 确认时执行提交逻辑  
          // 提交表单  
          var formData = {  
            uid: util.getUserID(), // 确保 util 已正确定义  
            user_name: e.detail.value.nick_name,  
            baby_sex: e.detail.value.baby_sex,  
            baby_age: e.detail.value.baby_age  
          };  
          console.log(formData);  
          app.apiFunc.upload_file(app.apiUrl.modify_user, _this.data.imgs[0], 'photos', formData, // 使用 imgs[0] 作为文件路径  
            function(res) {  
              console.log(res);  
            },  
            function() {}  
          );  
        }  
      }  
    });  
  },  

  upload_file: function(url, filePath, name, formData, success, fail) {  
    console.log('a=' + filePath);  
    wx.uploadFile({  
      url: rootUrl + url,  
      filePath: filePath,  
      name: name,  
      header: {  
        'content-type': 'multipart/form-data'  
      },  
      formData: formData,  
      success: function(res) {  
        console.log(res);  
        if (res.statusCode === 200 && !res.data.result_code) {  
          typeof success === "function" && success(res.data);  
        } else {  
          typeof fail === "function" && fail(res);  
        }  
      },  
      fail: function(res) {  
        console.log(res);  
        typeof fail === "function" && fail(res);  
      }  
    });  
  },  

  onLoad: function() {  
    this.fetchAnswer(); // 在页面加载时获取答案  
  },  

  fetchAnswer: function() {  
    var that = this; // 保持对 Page 的引用  
    wx.request({  
      url: 'http://127.0.0.1:5000/get_answer', // Flask 服务器的 URL  
      method: 'POST',  
      header: {  
        'Content-Type': 'application/json'  
      },  
      data: {  
        question: this.data.question // 发送的问题  
      },  
      success: function(res) {  
        that.setData({  
          answer: res.data // 更新页面上的答案  
        });  
        console.log(res.data); // 打印响应  
      },  
      fail: function(error) {  
        console.error(error); // 打印错误信息  
      }  
    });  
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

  // 若有按钮用以获取答案，可以加上以下方法  
  bindGetAnswer: function() {  
    this.fetchAnswer(); // 当按钮被点击时调用获取答案的函数  
  }  
});