<template>
  <a-modal :visible="visible" @cancel="$emit('close')">
    <img :src="getSrc()">
    <span class="text">sample</span>
    <a-button @click="onRequest">请求</a-button>
    <a-button @click="onRoute">跳转</a-button>
    <a-button @click="onBroadcast">广播</a-button>
  </a-modal>
</template>

<script>
import { getMenu } from '@/api/auth'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getSrc () {
      return require('@/assets/logo.png')
    },
    async onRequest () {
      let data = await getMenu()

      console.log('onRequest', data)
    },
    onRoute () {
      window.microApp.$router.push({
        path: '/micro-sample/home',
        params: {
          msg: 'hello world'
        }
      }, this)
    },
    onBroadcast () {
      window.microApp.$broadcast.emit('boradcastFromHelloWorld', 'jinghaihan')
    }
  }
}
</script>

<style lang="less" scoped>
  .text{
    color: #1890ff;
  }
</style>
