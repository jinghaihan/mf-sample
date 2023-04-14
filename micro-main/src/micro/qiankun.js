import { addGlobalUncaughtErrorHandler, start, initGlobalState } from 'qiankun'
import apps from './apps'

addGlobalUncaughtErrorHandler((event) => {
  // const { message } = event

  // console.error(message)
})

class Actions {
  actions = {
    ...initGlobalState({})
  }
  setActions (actions) {
    this.actions = actions
  }
  onGlobalStateChange (...args) {
    return this.actions.onGlobalStateChange(...args)
  }
  setGlobalState (...args) {
    return this.actions.setGlobalState(...args)
  }
}

export const actions = new Actions()

export default {
  start,
  actions,
  apps
}
