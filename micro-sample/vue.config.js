const { name } = require('./package')
const path = require('path')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
const htmlWebpackPlugin = require('html-webpack-plugin')
const NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin

const appConfig = require('./app.config.js')
const { initModuleFederationConfig, AddEntryAttributeWebpackPlugin, getNormalModuleReplacementPluginCallBack } = require('../plugin/mf-core')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: 'auto',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: config => {
    config.output.uniqueName = name
    config.output.library = name
    config.output.libraryTarget = 'umd'
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`

    config.plugins.push(new ModuleFederationPlugin(initModuleFederationConfig(appConfig)))
    config.plugins.push(new NormalModuleReplacementPlugin(/(.*)/, (resource) => getNormalModuleReplacementPluginCallBack(resource, appConfig)))
    config.plugins.push(new AddEntryAttributeWebpackPlugin(htmlWebpackPlugin))

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
    port: 8090,
    open: false,
    historyApiFallback: {
      index: '/index.html'
    },
    // 关闭主机检查，使微应用可以被 fetch
    allowedHosts: 'all',
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/mock/': {
        target: 'http://localhost:8080'
      }
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false
      }
    }
  }
}
