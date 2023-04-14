<template>
  <div ref="pie" class="pie" :id="'pie-' + key"></div>
</template>

<script>
import * as echarts from 'echarts'

const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}

function getUniqueKey (len) {
  len = len || 32
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = $chars.length
  let key = ''
  for (let i = 0; i < len; i++) {
    key += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return key
}

export default {
  name: 'pie',
  data () {
    return {
      key: getUniqueKey()
    }
  },
  mounted () {
    let _this = this
    _this.initChart()

    _this.observer = new ResizeObserver(function () {
      // 媒体查询
      _this.onResize()
    })
    _this.observer.observe(_this.$refs.pie)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('pie-' + this.key))
      this.chart.setOption(option)
    },
    async onResize () {
      await this.$nextTick()
      this.chart.resize()
    }
  }
}
</script>

<style lang="less" scoped>
  .pie{
    height: 100%;
    width: 100%;
  }
</style>
