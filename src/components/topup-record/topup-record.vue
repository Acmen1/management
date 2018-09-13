<template>
  <div>
    <Table border :columns="columns7" :data="data6"></Table>
  </div>
</template>

<script>
  export default {
    name: 'topup-record',
    components: {
    },
    data () {
      return {
        columns7: [
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
    }
  }
</script>
<style lang="less">
  .count-style{
    font-size: 50px;
  }
</style>
