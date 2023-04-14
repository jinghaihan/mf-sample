<template>
  <div ref="gauge" class="gauge" :id="'gauge-' + key"></div>
</template>

<script>
import * as echarts from 'echarts'

const option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: 'SCORE'
        }
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
  name: 'gauge',
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
    _this.observer.observe(_this.$refs.gauge)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('gauge-' + this.key))
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
  .gauge{
    height: 100%;
    width: 100%;
  }
</style>
