var utils = require('../../../utils/util.js');
var app = getApp();
Page({

  data: {
    maskShow: false,
    optionsImg: 0,
    contentData:''
  },

  onLoad: function (options) {
    let url = app.globalData.url + '/miniApi/apply/findUserApply'
    utils.http(url, 'GET', {id:options.id}, (res) => {
      this.setData({
        contentData: res.data
      })
    })
  },

  //投人气
  btnSentiment: function (event) {
    this.maskShow()
  },
  //控制蒙版层
  maskShow: function (event) {
    this.setData({
      maskShow: !this.data.maskShow
    })
  },
  //充值金额
  topUp: function (event) {
    const index = parseInt(event.currentTarget.dataset.index);
    this.setData({
      optionsImg: index
    })
  }
})