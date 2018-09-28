<template>
  <div>
    <Table border :columns="votingTitle" :data="votingList"></Table>
    <Modal title="查看大图" v-model="imgShow">
      <img :src="imgSrc" v-if="imgShow" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'voting-record',
    components: {
    },
    data () {
      return {
        imgSrc: '',
        imgShow: false,
        votingTitle: [
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
        votingList: []
      }
    },
    methods: {
      show (e) {
        this.imgSrc = e.target.src
        this.imgShow = true
      }
    },
    mounted () {
      let that = this
      let activityId = qs.stringify({
        activityId: 29
      })
      this.$axios({
        method: 'POST',
        url: '/api/user/apply/findAllOrRank',
        data: activityId
      }).then((res) => {
        let data = res.data.data.list
        that.votingList = data
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
