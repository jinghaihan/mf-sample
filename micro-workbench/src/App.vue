<template>
  <a-config-provider :locale="locales.zh_CN" :getPopupContainer="getPopupContainer">
    <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </a-config-provider>
</template>

<script>
import Vue from 'vue'
import config from '@/../package.json'
import micro from '@/micro'
// eslint-disable-next-line camelcase
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',
  data () {
    return {
      locales: { zh_CN },
      // 是否完成路由渲染
      flag: false,
      appName: 'micro-' + config.name
    }
  },
  computed: {
    listenRoutes () {
      return this.$store.state.user.routes
    }
  },
  watch: {
    listenRoutes: {
      deep: true,
      immediate: true,
      handler: function (routes) {
        if (Object.keys(routes).length) {
          // 添加动态路由信息
          this.$router.addRoute(routes)
        }
      }
    }
  },
  created () {
    const self = this

    micro.actions.onGlobalStateChange(state => {
      if (!self.flag) {
        // 获取当前微应用应生成的路由
        const routes = state.routes[self.appName]
        if (!routes) return
        
        // 整理动态路由
        self.$store.dispatch('user/GenerateRoutes', routes)
        self.flag = true
      }
      // 获取当前微应用应该进行缓存的tab页
      const app = state.loadedApps[self.appName]
      if (app) {
        const keepAlive = app.routes
        self.$store.commit('micro/SET_KEEPALIVE', keepAlive)
      }
    })
  },
  methods: {
    getPopupContainer (el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap()
      } else {
        return document.body
      }
    }
  }
}
</script>

<style>

</style>
