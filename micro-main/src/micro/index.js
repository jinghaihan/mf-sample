import apps from './apps'
import qiankun from './qiankun'
import { microApp } from '@/../../plugin/shared-core'

microApp.setApp(apps)
microApp.setConfig(window.microConfig)

window.microApp = microApp

export default {
  microApp,
  ...qiankun
}
