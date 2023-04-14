<template>
  <div>
    <!-- 首页 -->
    首页
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      token: Math.random().toString()
    }
  },
  created () {
    this.addListener()
  },
  beforeDestroy () {
    this.removeListener()
  },
  activated () {
    this.addListener()
  },
  deactivated () {
    this.removeListener()
  },
  methods: {
    watchRouteParams () {
      window.microApp.$router.on(this.$route.path, function (params) {
        console.log(params)
      })
    },
    watchEvent () {
      window.microApp.$broadcast.on('boradcastFromHelloWorld', this.token, function (params) {
        console.log(params)
      })
    },
    addListener () {
      this.watchRouteParams()
      this.watchEvent()
    },
    removeListener () {
      window.microApp.$router.off(this.$route.path)
      window.microApp.$broadcast.off('boradcastFromHelloWorld', this.token)
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
