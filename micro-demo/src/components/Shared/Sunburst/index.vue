<template>
  <div ref="sunburst" class="sunburst" :id="'sunburst-' + key"></div>
</template>

<script>
import * as echarts from 'echarts'

const data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
]
const option = {
  series: {
    type: 'sunburst',
    // emphasis: {
    //     focus: 'ancestor'
    // },
    data: data,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
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
  name: 'sunburst',
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
    _this.observer.observe(_this.$refs.sunburst)
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById('sunburst-' + this.key))
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
  .sunburst{
    height: 100%;
    width: 100%;
  }
</style>
