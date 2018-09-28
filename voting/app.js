App({
  onLaunch: function() {
    //登录
    wx.login({
      success: res => {
        let code = res.code;
        wx.request({
          url: 'http://47.97.110.121:8081/wechat/user/login',
          method: 'GET',
          header: {
            'content-type': 'text/plain',
            'Accept': 'application/json'
          },
          data: {
            code: code
          },
          success: function(res) {
            if (res.statusCode === 200) {
              wx.setStorageSync('openid',res.data.openid);
            }
          }
        })
      }
    })
  },
  loginToken:function () {
    wx.request({
          url: 'http://47.97.110.121:8081/wechat/user/getToken',
          method: 'GET',
          header: {
            'content-type': 'text/plain'
          },
          success: function(res) {
            console.log(res)
            // that.globalData.message = res.data.message;
            // wx.setStorageSync('id_token', "Bearer " + res.data.data.id_token);
            // if (that.messageCallback) {
            //   that.messageCallback(res.data.message);
            // }
            // that.getPhoneNumber()
          }
    })
  },
  globalData: {
    url: 'http://47.97.110.121:8081',
    picArr:[]
  }
})