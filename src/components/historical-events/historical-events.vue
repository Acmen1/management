<template>
  <div>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="100" class="page-list" />
    <Modal v-model="modal11" fullscreen title="Fullscreen Modal">
      <div>This is a fullscreen modal</div>
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
        modal11: false,
        columns7: [
          {
            title: '活动名称',
            key: 'activityName'
          },
          {
            title: '开始时间',
            key: 'createTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
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
        data6: []
      }
    },
    methods: {
      show (index) {
        console.log(this.data6[index].activityId)
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
        that.data6 = data.data
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
</style>
