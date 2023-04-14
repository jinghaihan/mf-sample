const appConfig = {
  name: 'sample',
  remotes: ['main'],
  exposes: {
    './HelloWorld': './src/components/Shared/HelloWorld/index.vue',
    './Gauge': './src/components/Shared/Gauge/index.vue',
    './Radar': './src/components/Shared/Radar/index.vue'
  },
  shared: [
    'vue',
    'vuex',
    'vue-router',
    'ant-design-vue'
  ]
}

module.exports = appConfig
