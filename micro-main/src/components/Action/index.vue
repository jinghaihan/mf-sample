<template>
  <div class="action-container">
    <a-icon class="action-icon" type="poweroff" title="退出登录" v-if="needToLogin"></a-icon>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>

export default {
  components: {
    // HelloWorld: () => window.microApp.core.getRemoteModule('micro_sample', './HelloWorld')
    HelloWorld: () => import('micro_sample/HelloWorld')
  },
  data () {
    return {
      needToLogin: window.microApp.getCustomConfig('needToLogin')
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .action-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
</style>
