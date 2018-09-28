<template>
  <div>
    <Table border :columns="toupTitle" :data="toupList"></Table>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'topup-record',
    components: {
    },
    data () {
      return {
        toupTitle: [
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
        toupList: []
      }
    },
    mounted () {
      let that = this
      let activityId = qs.stringify({
        activityId: 29
      })
      this.$axios({
        method: 'POST',
        url: '/api/vote/order/selectByActivityId',
        data: activityId
      }).then((res) => {
        let data = res.data.data.list
        that.toupList = data
      }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
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
    }
  }
</script>
<style lang="less">
  .count-style{
    font-size: 50px;
  }
</style>
