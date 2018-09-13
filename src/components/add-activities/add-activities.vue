<template>
  <div>
    <div class="add-act">
      活动名称：
      <Input v-model="activityName" placeholder="请输入活动名称" style="width: 300px" />
    </div>
    <div class="add-act">
      活动时间：
      <DatePicker v-model="startTime" type="datetime" format="yyyy-MM-dd HH:mm" :options="DisableTime" placeholder="活动开始时间" style="width: 200px"></DatePicker>
      <DatePicker v-model="endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="活动结束时间" style="width: 200px"></DatePicker>
    </div>
    <div class="add-act">
      第一档购买金额：
      <Input v-model="firstMoney" placeholder="请输入购买金额" style="width: 300px" />
      票数比例：
      <Input v-model="firstRatio" placeholder="请输入票数比例" style="width: 300px" />
    </div>
    <div class="add-act">
      第二档购买金额：
      <Input v-model="secondMoney" placeholder="请输入购买金额" style="width: 300px" />
      票数比例：
      <Input v-model="secondRatio" placeholder="请输入票数比例" style="width: 300px" />
    </div>
    <div class="add-act">
      第三档购买金额：
      <Input v-model="thirdMoney" placeholder="请输入购买金额" style="width: 300px" />
      票数比例：
      <Input v-model="thirdRatio" placeholder="请输入票数比例" style="width: 300px" />
    </div>
    <div class="add-act">
      <div>活动规则</div>
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        multiple
        type="drag"
        accept="image/*"
        action="//47.97.110.121:8080/miniApi/picture/uploadOne"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="查看大图" v-model="visible">
        <img :src="imgName" v-if="visible" style="width: 100%">
      </Modal>
    </div>
    <div><Button class="act-release" @click="actRelease" type="success">发布活动</Button></div>
  </div>
</template>

<script>
  export default {
    name: 'add-activities',
    data () {
      return {
        DisableTime: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        startTime: '',
        endTime: '',
        activityName: '',
        firstMoney: '',
        firstRatio: '',
        secondMoney: '',
        secondRatio: '',
        thirdMoney: '',
        thirdRatio: '',
        pic: [],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    methods: {
      handleView (url) {
        this.imgName = url
        this.visible = true
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        this.$axios({
          method: 'POST',
          url: '/api/miniApi/picture/delete',
          data: {
            fileKey: file.url
          },
          headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
          }
        }).then((res) => {
          console.log(res.data)
          let data = res.data
          if (data.code === 200) {
            this.pic.splice(this.pic.indexOf(file), 1)
            console.log(this.pic)
            this.$Message.success('删除成功')
          } else {
            this.$Message.error('删除失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSuccess (res, file) {
        file.url = file.response.msg
        this.$Message.success('上传成功')
        this.pic.push(file.response.msg)
        console.log(this.pic)
      },
      actRelease () {
        this.inputCon()
      },
      inputCon () {
        if (!this.activityName) {
          this.$Message.warning('请输入活动名称')
          return
        } else if (!this.startTime) {
          this.$Message.warning('请输入活动开始时间')
          return
        } else if (!this.endTime) {
          this.$Message.warning('请输入活动结束时间')
          return
        } else if (!this.firstMoney) {
          this.$Message.warning('请输入第一档金额')
          return
        } else if (!this.firstRatio) {
          this.$Message.warning('请输入第一档票数比例')
          return
        } else if (!this.secondMoney) {
          this.$Message.warning('请输入第二档金额')
          return
        } else if (!this.secondRatio) {
          this.$Message.warning('请输入第二档金票数比例')
          return
        } else if (!this.thirdMoney) {
          this.$Message.warning('请输入第三档金额')
          return
        } else if (!this.thirdRatio) {
          this.$Message.warning('请输入第三档金票数比例')
          return
        } else if (!this.pic) {
          this.$Message.warning('请上传活动规则图片')
          return
        }
        this.$axios({
          method: 'POST',
          url: '/api/sys/activity/addActivity',
          data: {
            activityName: this.activityName,
            startTime: this.startTime,
            endTime: this.endTime,
            firstMoney: this.firstMoney,
            firstRatio: this.firstRatio,
            secondMoney: this.secondMoney,
            secondRatio: this.secondRatio,
            thirdMoney: this.thirdMoney,
            thirdRatio: this.thirdRatio,
            pic: this.pic
          },
          headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
          }
        }).then((res) => {
          let data = res.data
          if (data.code === 200) {
            this.$Message.success('添加成功')
          } else {
            this.$Message.error(data.msg)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    }
  }
</script>
<style lang="less">
  .add-act{
    margin: 20px 30px;
  }
  .act-release{
    width: 200px;
    margin: 20px 0 60px 30px;
  }
  .count-style{
    font-size: 50px;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
