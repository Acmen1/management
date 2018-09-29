<style lang="less">
  @import './../assets/css/login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录">
        <div class="login-name">
          <Input v-model="userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </div>
        <div class="login-pass">
          <Input type="password" v-model="password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="14" type="md-lock"></Icon>
            </span>
          </Input>
        </div>
        <div>
          <Button type="primary" @click="login" long>登录</Button>
        </div>
        <div class="form-con">
          <p class="login-tip">输入用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userName: 'admin',
        password: 'admin'
      }
    },
    methods: {
      login () {
        this.$axios({
          method: 'post',
          url: 'api/user/login',
          data: {
            username: this.userName,
            password: this.password
          },
          headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
          }
        }).then((res) => {
          let data = res.data
          if (data.code === 200) {
            this.$router.push('/index/registration-details')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
