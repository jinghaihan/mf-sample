import actions from './actions'
import { microApp } from '@/../../plugin/shared-core'

if (!window.__POWERED_BY_QIANKUN__) {
  microApp.setConfig(window.microConfig)
  window.microApp = microApp
}

export default {
  microApp,
  actions
}
