<style lang="less">
  @import './../assets/css/login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录">
        <div class="login-name">
          <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </div>
        <div class="login-pass">
          <Input type="password" v-model="form.password" placeholder="请输入密码">
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
        form: {
          userName: '2@qq.com',
          password: '123456'
        }
      }
    },
    methods: {
      login () {
        this.$axios({
          method: 'GET',
          url: 'api/user/login',
          data: {
            username: this.form.userName,
            password: this.form.password
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
  }
</script>

<style scoped>

</style>
