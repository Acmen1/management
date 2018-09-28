var utils = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    curIndex: 0,
    optionsImg:0,
    maskShow:false,
    allEntries:'',
    rulesImg:'',
    allPlayes:'',
    alwaysPopular:'',
    activity:'',
    remainingVotes:'',
    num:'',
    totalId:''
  },
  onLoad: function () {
    this.accessToAll()
  },
  //获取全部参赛资料
  accessToAll:function(){
    let that = this
    let url = app.globalData.url + '/miniApi/apply/findAllOrRank'
    utils.http(url,'GET','',(res) => {
      this.setData({
        allEntries: res.data
      })
      wx.setStorageSync('activityId', res.data[0].activityId);
      that.alwaysPopular(res.data[0].activityId)
    })
  },
  //最新参赛
  latestEntry:function(){
    let url = app.globalData.url + '/miniApi/apply/findByReviewTime'
    utils.http(url, 'GET', '', (res) => {
      this.setData({
        allEntries: res.data
      })
    })
  },
  //活动规则
  activityRules:function(){
    let url = app.globalData.url + '/miniApi/apply/findActivity'
    utils.http(url, 'GET', '', (res) => {
      this.setData({
        rulesImg: res.data.pic,
        activity: res.data
      })
    })
  },
  //Tab切换
  bindTap(event) {
    const index = parseInt(event.currentTarget.dataset.index);
    if(index === 0){
      this.accessToAll
    } else if (index === 1){
      this.latestEntry()
    } else if (index === 2){
      this.accessToAll()
    } else {
      this.activityRules()
    }
    this.setData({
      curIndex: index
    })
  },
  //参赛选手，累计人气
  alwaysPopular:function(id){
    let url = app.globalData.url + '/miniApi/apply/findTotal'
    utils.http(url, 'GET', {activityId:id}, (res) => {
      this.setData({
        allPlayes: res.data.totalUsers,
        alwaysPopular: res.data.votes
      })
    })
  },
  //投人气
  btnSentiment:function(event){
    this.setData({
      totalId: event.currentTarget.dataset.id
    })
    this.maskShow();
    this.total();
    if (this.data.activity == ""){
      this.activityRules()
    } 
  },
  //控制蒙版层
  maskShow:function(event){
    this.setData({
      maskShow: !this.data.maskShow
    })
  },
  //充值金额
  topUp:function(event) {
    const index = parseInt(event.currentTarget.dataset.index);
    this.setData({
      optionsImg: index
    })
    if(index === 1){
      let orderMoney = this.data.activity.firstMoney
      let votePoll = this.data.activity.firstRatio
      // wx.showModal({ 
      //   title: '提示', 
      //   content: '这是一个模态弹窗', 
      //   success: function (res) { 
      //     if (res.confirm) {
      //        console.log('用户点击确定') 
      //     } else if (res.cancel) {
      //        console.log('用户点击取消') 
      //     } 
      //   }
      // })
      this.theOrder(orderMoney,votePoll)
    } else if (index === 2){
      let orderMoney = this.data.activity.secondMoney
      let votePoll = this.data.activity.secondRatio
      this.theOrder(orderMoney, votePoll)
    } else if (index === 3){
      let orderMoney = this.data.activity.thirdMoney
      let votePoll = this.data.activity.thirdRatio
      this.theOrder(orderMoney, votePoll)
    }
  },
  //跳转详情页
  pageJump:function(event){
    wx.navigateTo({
      url: './personal-details/personal-details?id=' + event.currentTarget.dataset.id
    });
  },
  //获取总票数
  total:function(){
    let url = app.globalData.url + '/miniApi/vote/freeVote'
    let openId = wx.getStorageSync('openid')
    utils.http(url, 'GET', { openId: openId  }, (res) => {
     this.setData({
       remainingVotes:res.data,
       num: res.data.totalTickets
     })
    })
  },
  //加票
  addCount() {
    let totalnum = this.data.remainingVotes.totalTickets;
    let num = this.data.num;
    if (num>=totalnum){
      wx.showToast({
        title: '达到余票最大值',
        icon: 'none',
        duration: 1000
      })
      return
    }
    num++;
    this.setData({
      num:num
    })
  },
  //减票
  minusCount() {
    let num = this.data.num;
    if (num >= 0) {
      wx.showToast({
        title: '不能少于1票',
        icon: 'none',
        duration: 1000
      })
      return
    }
    num--;
    this.setData({
      num: num
    })
  },
  //生成订单
  theOrder(orderMoney, votePoll){
    let url = app.globalData.url + '/miniApi/vote/voteOrder'
    let openId = wx.getStorageSync('openid')
    let activityId = wx.getStorageSync('activityId')
    utils.http(url, 'PUT', { openId: openId, activityId: activityId, orderMoney: orderMoney, votePoll: votePoll}, (res) => {
      console.log(res)
      wx.showModal({
        title: '充值',
        content: '您确定要充值吗',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    })
  },
  //提交人气
  castSentiment(){
    let url = app.globalData.url + '/miniApi/vote/clickVote'
    let openId = wx.getStorageSync('openid');
    let tickets = this.data.num;
    let totalId = this.data.totalId;
    utils.http(url, 'POST', { openId: openId, id: totalId, tickets: tickets }, (res) => {
      console.log(res)
    })
  }
})
