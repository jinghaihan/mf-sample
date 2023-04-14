const { name } = require('./package')
const path = require('path')
var webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin

const appConfig = require('./app.config.js')
const { initModuleFederationConfig, getNormalModuleReplacementPluginCallBack } = require('../plugin/mf-core')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: 'auto',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: config => {
    config.output.uniqueName = name
    
    config.plugins.push(new ModuleFederationPlugin(initModuleFederationConfig(appConfig)))
    // config.plugins.push(new NormalModuleReplacementPlugin(/(.*)/, (resource) => getNormalModuleReplacementPluginCallBack(resource, appConfig)))

    config.experiments = {
      topLevelAwait: true
    }
  },

  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: {
      index: '/index.html'
    },
    proxy: {},
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  }
}
