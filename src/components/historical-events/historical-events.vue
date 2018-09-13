<template>
  <div>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="100" class="page-list" />
    <Modal v-model="modal11" fullscreen title="活动详情">
      <div>
        <div>
          <div>活动名称：1111111</div>
          <div>开始时间：1111111</div>
          <div>结束时间：1111111</div>
        </div>
        <div>
          活动规则：5555555
        </div>
      </div>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          投票记录
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people" />
          充值记录
        </MenuItem>
      </Menu>
      <Table border :columns="columns10" :data="data10"></Table>
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
        theme1: 'light',
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
        data6: [],
        columns10: [
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
        data10: [
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
