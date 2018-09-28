<template>
  <div>
    <Table border :columns="historicalTitle" :data="historicalArr"></Table>
    <Page :total="100" class="page-list" />
    <Modal v-model="details" fullscreen footer-hide title="活动详情">
      <div class="his-title">
        <div class="his-title-name">
          <div>活动名称：{{contentArr.activityName}}</div>
          <div>开始时间：{{formatDate(new Date(contentArr.startTime), 'yyyy-MM-dd hh:mm')}}</div>
          <div>结束时间：{{formatDate(new Date(contentArr.endTime), 'yyyy-MM-dd hh:mm')}}</div>
        </div>
        <div class="his-title-img">
          <p>活动规则:</p>
          <span class="forimg" v-for="src in contentArr.pic">
            <img :src="src" alt="">
          </span>
        </div>
      </div>
      <Menu mode="horizontal" theme="light" active-name="1" @on-select="onSelect">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          投票记录
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-bookmarks" />
          充值记录
        </MenuItem>
      </Menu>
      <Table v-if="onSelectShow == 1" border :columns="voteTitle" :data="voteArr"></Table>
      <Table v-if="onSelectShow == 2" border :columns="topUpTitle" :data="topUpArr"></Table>
    </Modal>
    <Modal title="查看大图" v-model="imgShow">
      <img :src="imgSrc" v-if="imgShow" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'historical-events',
    components: {
    },
    data () {
      return {
        imgSrc: '',
        imgShow: false,
        onSelectShow: 1,
        details: false,
        historicalTitle: [
          {
            title: '活动名称',
            key: 'activityName'
          },
          {
            title: '开始时间',
            key: 'startTime',
            render: (h, params) => {
              return h('div', this.formatDate(new Date(params.row.startTime), 'yyyy-MM-dd hh:mm')
              )
            }
          },
          {
            title: '结束时间',
            key: 'endTime',
            render: (h, params) => {
              return h('div', this.formatDate(new Date(params.row.endTime), 'yyyy-MM-dd hh:mm')
              )
            }
          },
          {
            title: '参加人数',
            key: 'activityTakeCount'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.details = true
                      this.detailsShow(params.index)
                    }
                  }
                }, '查看详情')
              ])
            }
          }
        ],
        historicalArr: [],
        voteTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            content: 'mingch'
          },
          {
            title: '名字',
            key: 'name'
          },
          {
            title: '人气',
            key: 'totalVotes'
          },
          {
            title: '海报',
            key: 'pic',
            render: (h, params) => {
              let arr = []
              for (let i = 0; i < params.row.pic.length; i++) {
                let img = h('img', {
                  props: {},
                  attrs: { src: params.row.pic[i] },
                  style: {
                    width: '90px',
                    height: '90px',
                    float: 'left',
                    margin: '5px 5px 5px 0px'
                  },
                  on: {
                    click: (e) => {
                      this.show(e)
                    }
                  }
                })
                arr.push(img)
              }
              return h('div', arr)
            }
          },
          {
            title: '个人介绍',
            key: 'description'
          }
        ],
        voteArr: [],
        topUpTitle: [
          {
            title: '订单号',
            key: 'orderId'
          },
          {
            title: '金额(元)',
            key: 'orderMoney',
            render: (h, params) => {
              return h('div', '¥' + params.row.orderMoney
              )
            }
          },
          {
            title: '充值时间',
            key: 'createTime',
            render: (h, params) => {
              return h('div', this.formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm')
              )
            }
          }
        ],
        topUpArr: [],
        contentArr: ''
      }
    },
    methods: {
      detailsShow (index) {
        this.contentArr = this.historicalArr[index]
        let activityId = qs.stringify({
          activityId: this.historicalArr[index].activityId
        })
        this.$axios({
          method: 'POST',
          url: '/api/user/apply/findAllOrRank',
          data: activityId
        }).then((res) => {
          let data = res.data.data.list
          this.voteArr = data
        }).catch((err) => {
          console.log(err)
        })
        this.$axios({
          method: 'POST',
          url: '/api/vote/order/selectByActivityId',
          data: activityId
        }).then((res) => {
          let data = res.data.data.list
          this.topUpArr = data
        }).catch((err) => {
          console.log(err)
        })
      },
      onSelect (name) {
        this.onSelectShow = name
      },
      show (e) {
        this.imgSrc = e.target.src
        this.imgShow = true
      },
      formatDate (date, fmt) {
        let o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    },
    mounted () {
      let that = this
      this.$axios({
        method: 'POST',
        url: '/api/sys/activity/listActivity',
        data: {
          pagNum: 1,
          pagSize: 1
        },
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        }
      }).then((res) => {
        let data = res.data
        that.historicalArr = data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
</script>
<style lang="less">
  .count-style{
    font-size: 50px;
  }
  .page-list{
    float: right;
    margin: 20px 60px;
  }
  .his-title{
    height: 180px;
    overflow: hidden;
    .his-title-name{
      width: 30%;
    }
    .his-title-img{
      width: 70%;
      .forimg{
        float: left;
      }
    }
    div{
      float: left;
      font-size: 18px;
      div{
        width: 100%;
        height: 60px;
        float: left;
        line-height: 60px;
      }
      p{
        height: 100%;
        float: left;
        margin-right: 10px;
      }
      img{
        width: 160px;
        height: 180px;
        float: left;
        margin-right: 10px;
      }
    }
  }
</style>
