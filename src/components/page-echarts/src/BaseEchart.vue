<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import chinaJSON from '../data/china.json'
//注册我们大中国地图
echarts.registerMap('china', chinaJSON as any)

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  //3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.echart {
  height: 250px;
}
</style>
