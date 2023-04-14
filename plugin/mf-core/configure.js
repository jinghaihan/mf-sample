const moduleResolver = require('./resolver')

function initModuleFederationConfig (config) {
  return new AppConfig(config)
}

class AppConfig {
  constructor (config) {
    this.name = 'micro_' + config.name
    this.filename = 'remoteEntry.js'
    this.remotes = {}
    this.exposes = {}
    // this.shared = {}
    this.remoteType = 'script'
    // this.library = { type: 'umd', name: this.name }
    this.library = { type: 'window', name: this.name }

    this.init(config)
  }
  init (config) {
    // remotes
    config.remotes.forEach(app => {
      // this.remotes['micro_' + app] = `micro_${app}@/micro-${app}/remoteEntry.js`
      this.remotes['micro_' + app] = `promise new Promise(resolve => {
        let address = window.microConfig.app['${app}'] || window.microConfig.remote['${app}']
        let url = address + '/remoteEntry.js'

        const element = document.createElement('script')
        element.src = url
        element.type = 'text/javascript'
        element.async = true

        element.onload = () => {
          document.head.removeChild(element)
          const proxy = {
            get: (request) => {
              try {
                return window['micro_${app}'].get(request)
              } catch (e) {
                // console.log(e)
              }
            },
            init: (arg) => {
              try {
                return window['micro_${app}'].init(arg)
              } catch (e) {
                // console.log('remote container already initialized')
              }
            }
          }
          resolve(proxy)
        }

        element.onerror = () => {
          console.error('useDynamicScript: ' + url + ' Error')
        }

        document.head.appendChild(element)
      })`
    })

    // exposes
    this.exposes = { ...config.exposes }

    // shared
    config.shared.forEach(pkg => {
      this.exposes['./' + pkg] = moduleResolver.resolveSync({}, './', pkg)
    })
  }
}

function getNormalModuleReplacementPluginCallBack (resource, config) {
  if (config.shared.includes(resource.request)) {
    resource.request = `micro_main/${resource.request}`
  }
}

module.exports = {
  initModuleFederationConfig,
  getNormalModuleReplacementPluginCallBack
}
