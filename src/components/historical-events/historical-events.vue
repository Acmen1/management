<template>
  <div>
    <Table border :columns="historicalTitle" :data="historicalArr"></Table>
    <Page :total="100" class="page-list" />
    <Modal v-model="details" fullscreen footer-hide title="活动详情">
      <div class="his-title">
        <div class="his-title-name">
          <div>活动名称：1111111</div>
          <div>开始时间：1111111</div>
          <div>结束时间：1111111</div>
        </div>
        <div class="his-title-img">
          <p>活动规则:</p>
          <img src="./../../assets/images/login-bg.jpg" alt="">
          <img src="./../../assets/images/login-bg.jpg" alt="">
          <img src="./../../assets/images/login-bg.jpg" alt="">
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
  </div>
</template>

<script>
  export default {
    name: 'historical-events',
    components: {
    },
    data () {
      return {
        onSelectShow: 1,
        details: false,
        historicalTitle: [
          {
            title: '活动名称',
            key: 'activityName'
          },
          {
            title: '开始时间',
            key: 'createTime',
            render: (h, params) => {
              return h('div', this.formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm')
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
                      this.modal11 = true
                      this.show(params.index)
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
            title: '名字',
            key: 'name'
          },
          {
            title: '人气',
            key: 'age'
          },
          {
            title: '名次',
            key: 'address'
          },
          {
            title: '海报',
            key: 'address'
          },
          {
            title: '个人介绍',
            key: 'address'
          }
        ],
        voteArr: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ],
        topUpTitle: [
          {
            title: '订单号',
            key: 'name'
          },
          {
            title: '金额',
            key: 'age'
          },
          {
            title: '充值时间',
            key: 'address'
          }
        ],
        topUpArr: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },
    methods: {
      show (index) {
        console.log(this.data6[index].activityId)
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
      },
      onSelect (name) {
        this.onSelectShow = name
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
