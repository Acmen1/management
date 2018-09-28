<template>
  <div>
    <Table border :columns="detailsTitle" :data="detailsList"></Table>
    <Modal title="查看大图" v-model="imgShow">
      <img :src="imgSrc" v-if="imgShow" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        imgSrc: '',
        imgShow: false,
        detailsList: [],
        detailsTitle: [
          {
            title: '名字',
            key: 'name'
          },
          {
            title: '报名时间',
            key: 'applyTime',
            render: (h, params) => {
              return h('div', this.formatDate(new Date(params.row.applyTime), 'yyyy-MM-dd hh:mm')
              )
            }
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
            title: '手机号',
            key: 'phone'
          },
          {
            title: '个人介绍',
            key: 'description'
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.through(params.index)
                    }
                  }
                }, '通过验证'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.notThrough(params.index)
                    }
                  }
                }, '不合格')
              ])
            }
          }
        ]
      }
    },
    methods: {
      show (e) {
        this.imgSrc = e.target.src
        this.imgShow = true
      },
      remove (index) {
        this.data6.splice(index, 1)
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
      through (index) {
        let id = qs.stringify({
          id: this.detailsList[index].id
        })
        this.$axios({
          method: 'POST',
          url: '/api/user/apply/pass',
          data: id
        }).then((res) => {
          let data = res.data
          if (data.code === 200) {
            this.$Message.success('验证成功')
            this.detailsList.splice(index, 1)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      notThrough (index) {
        let id = qs.stringify({
          id: this.detailsList[index].id
        })
        this.$axios({
          method: 'POST',
          url: '/api/user/apply/fail',
          data: id
        }).then((res) => {
          let data = res.data
          if (data.code === 200) {
            this.$Message.error('验证未通过')
            this.detailsList.splice(index, 1)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted () {
      let that = this
      let activityId = qs.stringify({
        activityId: 29
      })
      this.$axios({
        method: 'POST',
        url: '/api/user/apply/selectByActivityId',
        data: activityId
      }).then((res) => {
        let data = res.data.data.list
        that.detailsList = data
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
</style>
