const appConfig = {
  name: 'main',
  remotes: ['sample'],
  exposes: {
    './menu-utils': './src/utils/menu.js'
  },
  shared: [
    'vue',
    'vuex',
    'vue-router',
    'ant-design-vue'
  ]
}

module.exports = appConfig
