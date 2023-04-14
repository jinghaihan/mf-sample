const appConfig = {
  name: 'demo',
  remotes: ['main', 'sample'],
  exposes: {
    './Funnel': './src/components/Shared/Funnel',
    './Pie': './src/components/Shared/Pie',
    './Sunburst': './src/components/Shared/Sunburst'
  },
  shared: [
    'vue',
    'vuex',
    'vue-router',
    'ant-design-vue'
  ]
}

module.exports = appConfig
