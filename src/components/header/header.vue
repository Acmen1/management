<template>
    <div>
      <Header :style="{padding: 0}" class="layout-header-bar">
        <Icon class="tag-silder" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px'}" type="md-menu" size="24"></Icon>
        <router-title></router-title>
        <Exit></Exit>
        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
      </Header>
    </div>
</template>

<script>
  import Fullscreen from './fullscreen'
  import Exit from './exit'
  import RouterTitle from './router-title'
  export default {
    data () {
      return {
        isCollapsed: false,
        isFullscreen: false
      }
    },
    components: {
      Fullscreen,
      Exit,
      RouterTitle
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
    }
  }
</script>

<style scoped>
  .ivu-layout-header{
    background: #fff;
  }
  .layout-header-bar{
    overflow: hidden;
  }
  .tag-silder{
    float: left;
  }
</style>
