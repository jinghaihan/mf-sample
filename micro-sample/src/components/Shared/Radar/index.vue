<template>
  <div ref="radar" class="radar" :id="'radar-' + key"></div>
</template>

<script>
import * as echarts from 'echarts'

const option = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
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
  name: 'radar',
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
    _this.observer.observe(_this.$refs.radar)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('radar-' + this.key))
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
  .radar{
    height: 100%;
    width: 100%;
  }
</style>
