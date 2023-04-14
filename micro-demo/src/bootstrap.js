import Vue from 'vue'
import App from './App.vue'
// 自定义插件
import './plugins'
// vue-x
import { store, initStore } from './store/index'
// vue-router
import { initRouter } from './router/index'
// 全局样式
import '@/styles/global.less'

import micro from '@/micro'

Vue.config.productionTip = false

export let instance = null
export let router = null

export function render (props) {
  router = initRouter()

  if (props) {
    // 注入 actions 实例
    micro.actions.setActions(props)
  }
  instance = new Vue({
    store,
    router,
    render: h => h(App),
    created () {
      // 初始化vuex存储空间
      initStore()
      // 根据配置进行渲染
      initRender()
    }
  })
  if (window.__POWERED_BY_QIANKUN__) {
    const { container } = props
    instance.$mount(container ? container.querySelector('#app') : '#app')
  } else {
    instance.$mount('#app')
  }
}

function initRender () {
  if (!window.__POWERED_BY_QIANKUN__) {
    // 如果不存在登录页面，直接加载页面
    if (!window.microApp.getCustomConfig('needToLogin')) {
      store.dispatch('user/Navigation')
    }
  }
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export function onDestroy () {
  instance.$destroy()
  instance = null
  router = null
}
