var utils = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    show: '',
    pics: [],
    gerder:'男',
    description:'',
    name:'',
    phone:'',
    information:''
  },
  onLoad: function (option) {
    this.signUp()
  },
  //判断有无报名
  signUp:function(){
    let url = app.globalData.url + '/miniApi/apply/isApply';
    let openId = wx.getStorageSync('openid')
    utils.http(url, 'GET', {openId: openId}, (res) => {
      if(res.data == "500"){
        wx.setNavigationBarTitle({
          title: '我要报名'
        })
        this.setData({
          show: true
        })
      } else if (res.data == "200") {
        wx.setNavigationBarTitle({
          title: '取消报名'
        })
        this.setData({
          show: false
        })
        this.PersonalInformation()
      }
    })
  },
  //多张图片上传
  choose: function () {//这里是选取图片的方法
    var that = this;
    wx.chooseImage ({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        that.setData({
          pics: imgsrc
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  uploadimg: function () {//这里触发图片上传的方法
    let that = this;
    var pics = this.data.pics;
    if (this.data.name == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000//持续的时间
      })
      return
    } else if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1000//持续的时间
      })
      return
    } else if(this.data.description == "") {
      wx.showToast({
        title: '请输入个人介绍',
        icon: 'none',
        duration: 1000//持续的时间
      })
      return
    } else if (pics == "") {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 1000//持续的时间
      })
      return
    }
    let srcArr = []
    utils.uploadimg({
      url: app.globalData.url + '/miniApi/picture/uploadOne',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    },(resp) => {
      let data = JSON.parse(resp.data)
      srcArr.push(data.data)
      if (pics.length == srcArr.length){
        that.wantToSignUp(srcArr)
      }
    });
  },
  //获取性别
  gerderChange: function (e) {
     this.setData({
       gerder: e.detail.value
     }) 
  },
  //获取介绍
  description:function (e){
    this.setData({
      description: e.detail.value
    })
  },
  //获取姓名
  name:function (e){
    this.setData({
      name: e.detail.value
    })
  },
  //获取手机号
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  //我要报名
  wantToSignUp: function (srcArr) {
    let url = app.globalData.url + '/miniApi/apply/add';
    let openId = wx.getStorageSync('openid');
    let activityId = wx.getStorageSync('activityId');
    utils.http(url, 'PUT', { 
      activityId: activityId,
      description: this.data.description,
      gerder: this.data.gerder,
      name: this.data.name,
      openId: openId,
      phone: this.data.phone,
      pic: srcArr
     }, (res) => {
      console.log(res)
    })
  },
  //获取个人信息
  PersonalInformation:function(){
    let url = app.globalData.url + '/miniApi/apply/findUserApply';
    let openId = wx.getStorageSync('openid');
    utils.http(url, 'GET', { openId: openId }, (res) => {
      this.setData({
        information:res.data
      })
    })
  },
  //预览图片
  biggerImg:function(e){
    let imgarr = this.data.information[0].pic
    wx.previewImage({
      urls: imgarr
    })
  },
  //取消报名
  cancel:function(e){
    let id = e.currentTarget.dataset.id;
    let url = app.globalData.url + '/miniApi/apply/cancel?id=' + id;
    utils.http(url, 'DELETE', '', (res) => {
      // if(){

      // }
    })
  }
})