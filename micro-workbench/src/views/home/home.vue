<template>
  <div class="grid-layout-container">
    <grid-layout></grid-layout>
  </div>
</template>

<script>
import gridLayout from '@/components/GridLayout'

export default {
  name: 'home',
  components: { gridLayout }
}
</script>

<style lang="less" scoped>
  .grid-layout-container{
    background: #fff;
  }
</style>
