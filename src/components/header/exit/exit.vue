<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar style="background-color: #87d068" icon="ios-person"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick (name) {
        console.log('退出')
      }
    }
  }
</script>

<style scoped>
  .user-avator-dropdown{
    float: right;
  }
</style>
