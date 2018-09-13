<template>
  <div>
    <Card>
      <Table border :columns="columns7" :data="data6"></Table>
    </Card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        columns7: [
          {
            title: '名字',
            key: 'name',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ])
            }
          },
          {
            title: '报名时间',
            key: 'age',
            width: 200
          },
          {
            title: '头像',
            key: 'address',
            render: (h, params) => {
              return h('div', {
                attrs: {
                  style: ''
                }
              }, [
                h('img', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  attrs: {
                    src: params.row.address
                  },
                  style: {
                    width: '90px',
                    height: '90px',
                    float: 'left',
                    margin: '5px 5px 5px 0px'
                  }
                }),
                h('img', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  attrs: {
                    src: params.row.address
                  },
                  style: {
                    width: '90px',
                    height: '90px',
                    float: 'left',
                    margin: '5px 5px 5px 0px'
                  }
                })
              ])
            }
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
                      this.show(params.index)
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
                      this.remove(params.index)
                    }
                  }
                }, '不合格')
              ])
            }
          }
        ],
        data6: [
          {
            name: 'John Brown',
            age: 18,
            address: require('./../../assets/images/login-bg.jpg')
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
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1)
      }
    },
    mounted () {
      axios({
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
        console.log(res)
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
