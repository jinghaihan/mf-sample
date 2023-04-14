<template>
  <div>
    <!-- 首页 -->
    首页
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    // HelloWorld: () => window.microApp.core.getRemoteModule('micro_sample', './HelloWorld')
    HelloWorld: () => import('micro_sample/HelloWorld')
  },
  created () {
    
  },
  activated () {

  },
  deactivated () {

  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  
</style>
