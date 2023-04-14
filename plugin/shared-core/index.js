const Router = require('./router')
const BroadCast = require('./broadcast')
const Actions = require('./actions')
const core = require('./core')

class MicroApp {
  constructor () {
    let app = []
    let config = {}

    this.$router = new Router()
    this.$broadcast = new BroadCast()
    this.core = core
    this.Actions = Actions

    this.setApp = (data) => {
      app = data
    }
    this.setConfig = (data) => {
      config = data
    }
    this.getConfig = () => {
      return config
    }
    this.getAppConfig = () => {
      return app || []
    }
    this.getApiConfig = (key) => {
      return key ? config.api[key] : config.api
    }
    this.getCustomConfig = (key) => {
      return key ? config.custom[key] : config.custom
    }
    this.getModuleConfig = (app) => {
      return config.custom[app + 'Config']
    }
  }
  setAttribute (data) {
    Object.keys(data).forEach(key => {
      this[key] = data[key]
    })
  }
  getSecurity () {
    return this.security || {}
  }
  getStyleConfig () {
    return this.styleConfig || {}
  }
}

const microApp = new MicroApp()

module.exports = { microApp }
