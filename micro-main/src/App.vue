<template>
  <a-config-provider :locale="locales.zh_CN" :getPopupContainer="getPopupContainer">
    <div id="app">
      <!-- 全屏样式布局-登陆页/预加载遮罩蒙层 -->
      <view-layout v-if="isViewLayout"></view-layout>
      <!-- 系统内部布局 -->
      <app-layout v-if="!isViewLayout"></app-layout>
    </div>
  </a-config-provider>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import { ViewLayout, AppLayout } from '@comp/Layout'
import { loadMicroApp } from 'qiankun'
import micro from '@/micro'
// eslint-disable-next-line camelcase
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',
  components: { ViewLayout, AppLayout },
  data () {
    return {
      locales: { zh_CN },
      microApp: micro.microApp,
      // 当前已加载的微应用信息
      loadedApps: {},
      // 全部微应用路由信息
      routes: {},
      // 是否viewLayout展示
      isViewLayout: true,
      // 属于主应用viewLayout的路由名称
      viewLayoutList: ['login']
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
          this.routes = _.cloneDeep(routes)
        }
      }
    },
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        if (route.fullPath !== '/') {
          if (!this.viewLayoutList.includes(route.name)) {
            this.isViewLayout = false
            this.loadApp(route)
          } else {
            this.isViewLayout = true
          }
        }
      }
    }
  },
  created () {
    micro.actions.onGlobalStateChange(state => {
      
    })
  },
  mounted () {
    let self = this

    self.$bus.$on('onUpdateLoadedApps', function (tabs) {
      self.updateLoadedApps(tabs)
    })
  },
  beforeDestroy () {
    this.$bus.$off('onUpdateLoadedApps')
  },
  methods: {
    // 微应用加载
    async loadApp (route) {
      let self = this
      let microApp = this.microApp.getAppConfig().filter(app => route.fullPath.includes(app.activeRule))[0]
      if (!self.loadedApps[microApp.name]) {
        self.$store.commit('micro/SET_LOADING', true)
        // 如果当前未加载该应用
        let app = loadMicroApp(microApp)
        self.loadedApps[microApp.name] = {
          app,
          routes: []
        }
        await app.mountPromise
        self.$store.commit('micro/SET_LOADING', false)
        micro.actions.setGlobalState({ 'routes': self.routes })
      } else {
        // 如果该微应用已经被加载过
        let app = self.loadedApps[microApp.name].app
        // 获取当前该子应用状态，当状态为NOT_MOUNTED时，从新触发该子应用的mount生命周期
        if (app.getStatus() === 'NOT_MOUNTED') {
          await app.mount()
          micro.actions.setGlobalState({ 'routes': self.routes })
        }
      }
    },
    // 根据tab组件修改当前loadedApps中的routes，传递给微应用完成keepAlive的渲染
    updateLoadedApps (tabs) {
      let self = this
      let keys = Object.keys(self.loadedApps)
      if (!keys.length) return
      // 清空之前的路由缓存信息
      keys.forEach(key => {
        self.loadedApps[key].routes = []
      })
      // 根据当前key与传递的tab信息记录路由缓存记录
      tabs.forEach(tab => {
        let key = keys.filter(key => tab.path.includes(key))[0]
        self.loadedApps[key].routes.push(tab.path)
      })

      // 判断当前是否存在微应用已经关闭了所有tab页，如果存在则触发该微应用的unmount事件
      Promise.all(keys.map(key => {
        return new Promise(async (resolve, reject) => {
          if (!self.loadedApps[key].routes.length) {
            // 如果该微应用的状态为MOUNTED，则卸载改微应用，释放占用资源
            if (self.loadedApps[key].app.getStatus() === 'MOUNTED') {
              await self.loadedApps[key].app.unmount()
              resolve()
            } else {
              resolve()
            }
          } else {
            resolve()
          }
        })
      })).then(() => [
        // 更新loadedApps全局变量
        micro.actions.setGlobalState({ 'loadedApps': self.loadedApps })
      ])
    },
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
