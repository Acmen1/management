<template>
  <div>
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>

<script>
  export default {
    name: 'voting-record',
    components: {
    },
    data () {
      return {
        columns7: [
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
        data6: [
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
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1)
      }
    }
  }
</script>
<style lang="less">
  .count-style{
    font-size: 50px;
  }
</style>
