<template>
  <div class="grid-content">
    <a-spin v-show="loading"></a-spin>
    <component v-show="!loading"
               ref="component"
               v-bind:is="app + '-' + componentName"
               v-bind="props"
               v-on="events">
    </component>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      app: this.data.app,
      componentName: this.data.component,
      props: this.data.props || {},
      events: this.data.events || {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let _this = this

      // 注册全局组件
      Vue.component(_this.app + '-' + _this.componentName, async () => {
        const component = await window.microApp.core.getRemoteModule(_this.app, `./${_this.componentName}`)
        _this.loading = false
        return component
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .grid-content{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/.ant-spin .ant-spin-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -10px;
    }
  }
</style>
