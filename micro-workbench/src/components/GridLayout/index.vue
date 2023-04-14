<template>
  <div class="grid-layout-wrapper">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdate"
    >
      <grid-item v-for="(item, index) in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="index"
                 @move="callback(index, 'move')"
                 @resized="callback(index, 'resized')">
        <a-card class="shared-card">
          <template slot="title">
            <a-tooltip>
              <template slot="title">
                <div><label>子应用：</label>{{item.app}}</div>
                <div><label>组件名称：</label>{{item.component}}</div>
              </template>
              {{getCardTitle(item)}}
            </a-tooltip>
          </template>
          <template slot="extra">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon class="extra-icon" type="more" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item><a href="javascript:;">1st menu item</a></a-menu-item>
                <a-menu-item><a href="javascript:;">2nd menu item</a></a-menu-item>
                <a-menu-item><a href="javascript:;">3rd menu item</a></a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <GirdContent :data="item"></GirdContent>
        </a-card>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import _ from 'lodash'
import VueGridLayout from 'vue-grid-layout'
import GirdContent from './GirdContent.vue'
import { getLayout } from '@/api/layout'

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    GirdContent
  },
  data () {
    return {
      layout: [],
      event: null
    }
  },
  created () {
    this.getLayout()
    _.debounce(this.callback, 0)
    _.debounce(this.mediaSearch, 50)
  },
  mounted () {
    let self = this
    window.addEventListener('resize', function () {
      self.mediaSearch()
    })
  },
  beforeDestroy () {

  },
  methods: {
    async mediaSearch () {
      await this.$nextTick()
      this.layout.forEach((item, index) => {
        this.callback(index, 'resized')
      })
    },
    async getLayout () {
      let res = await getLayout()
      this.layout = res.data
    },
    callback (index, event) {
      this.event = event
      // let container = this.$refs.container[index]

      switch (event) {
        case 'resized':
          // container.onResize()
          break
        default:
          break
      }
    },
    layoutUpdate (layout) {
      // console.log(layout)
    },
    getCardTitle (data) {
      return data.app + '-' + data.component
    }
  }
}
</script>

<style lang="less" scoped>
  .grid-layout-wrapper{
    height: 100%;
    width: 100%;
  }
  .shared-card{
    height: 100%;
    /deep/.ant-card-body{
      height: calc(~"100% - 58px");
      padding: 12px;
    }
    .extra-icon{
      font-size: 18px;
    }
  }
</style>
