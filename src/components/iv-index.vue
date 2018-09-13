<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-layout-sider{
    overflow: hidden;
    background: #000;
  }
  .ivu-menu-dark{
    background: #000;
  }
  .ivu-menu-item{

    padding: 0px 18px;
  }
  .ivu-menu-item a{
    width: 100%;
    color: #fff;
    display: inline-block;
    padding: 20px 0;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    color: #fff !important;
  }
  .sider-img{
    width: 66%;
    height: 66px;
    margin-left: 17%;
    padding: 10px 0;
  }

  .layout-header-bar{
    overflow: hidden;
  }
  .tag-silder{
    float: left;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="64" width="256" v-model="isCollapsed" :style="{ height: '100vh'}">
        <img v-if="isCollapsed == false" class="sider-img" src="./../assets/images/logo.jpg" alt="">
        <img v-if="isCollapsed == true" class="sider-img" src="./../assets/images/logo-min.jpg" alt="">
        <Menu active-name=activenum  theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name=1>
            <router-link to="registration-details">
              <Icon type="ios-color-palette" />
              <span>报名详情</span>
            </router-link>
          </MenuItem>
          <MenuItem name=2>
            <router-link to="add-activities">
              <Icon type="md-add-circle" />
              <span>添加活动</span>
            </router-link>
          </MenuItem>
          <MenuItem name=3>
            <router-link to="historical-events">
              <Icon type="md-copy" />
              <span>历史活动</span>
            </router-link>
          </MenuItem>
          <MenuItem name=4>
            <router-link to="voting-record">
              <Icon type="ios-create" />
              <span>投票记录</span>
            </router-link>
          </MenuItem>
          <MenuItem name=5>
            <router-link to="topup-record">
              <Icon type="md-card" />
              <span>充值记录</span>
            </router-link>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon class="tag-silder" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px'}" type="md-menu" size="24"></Icon>
          <router-title>
            <p slot="routitle">{{routitle}}</p>
          </router-title>
          <Exit></Exit>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </Header>
        <con-text :style="{margin: '20px', background: '#fff', minHeight: '260px'}"/>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import Fullscreen from './header/fullscreen'
  import Exit from './header/exit'
  import RouterTitle from './header/router-title'
  import ConText from './con-text'
  export default {
    data () {
      return {
        isCollapsed: false,
        isFullscreen: false,
        routitle: '',
        activenum: Cookies.get('activenum')
      }
    },
    components: {
      Fullscreen,
      Exit,
      RouterTitle,
      ConText
    },
    create () {
      this.routitle = this.$route.meta.title
      this.activenum = this.$route.meta.num
    },
    computed: {
      rotateIcon () {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ]
      },
      menuitemClasses () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      collapsedSider () {
        this.$refs.side1.toggleCollapse()
      }
    },
    watch: {
      $route (to, from) {
        this.routitle = to.meta.title
        this.activenum = to.meta.num
      }
    }
  }
</script>
