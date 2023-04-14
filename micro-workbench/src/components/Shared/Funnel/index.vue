<template>
  <div ref="funnel" class="funnel" :id="'funnel-' + key"></div>
</template>

<script>
import * as echarts from 'echarts'

const option = {
  title: {
    text: 'Funnel'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 40, name: 'Inquiry' },
        { value: 20, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
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
  name: 'funnel',
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
    _this.observer.observe(_this.$refs.funnel)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('funnel-' + this.key))
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
  .funnel{
    height: 100%;
    width: 100%;
  }
</style>
