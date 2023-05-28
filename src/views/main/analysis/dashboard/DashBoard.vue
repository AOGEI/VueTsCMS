<template>
  <div class="DashBoard">
    <!-- 1.顶部数字的数据展示 -->
    <div>
      <el-row :gutter="10">
        <template v-for="item in amountList" :key="item.amount">
          <!-- v-bind直接把父组件数据绑定到子组件中,数据名要保持一致，不然手动一个个绑定对应属性 -->
          <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
            <CountCard v-bind="item"></CountCard>
          </el-col>
        </template>
      </el-row>
    </div>
    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7" :xs="24">
        <chart-card header="分类商品数量(饼图)">
          <PieEchart :pie-data="showGoodsCategoryCount"></PieEchart>
        </chart-card>
      </el-col>
      <el-col :span="10" :xs="24">
        <chart-card header="不同城市商品销量">
          <MapEchart :map-data="showGoodsAddressSale"></MapEchart>
        </chart-card>
      </el-col>
      <el-col :span="7" :xs="24">
        <chart-card header="分类商品数量(玫瑰图)">
          <RoseEchart :rose-data="showGoodsCategoryCount"></RoseEchart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12" :xs="24">
        <chart-card header="分类商品的销量">
          <LineEchart v-bind="showGoodsCategorySale"></LineEchart>
        </chart-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <chart-card header="分类商品的收藏">
          <BarEchart v-bind="showGoodsCategoryFavor"></BarEchart>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAanlysisStore from '@/store/main/analysis/analysis'
import CountCard from './c-cpns/count-card/CountCard.vue'
import ChartCard from './c-cpns/chart-card/ChartCard.vue'
import { storeToRefs } from 'pinia'
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/index'
import { computed } from 'vue'

//1.发起数据的请求
const analysisStore = useAanlysisStore()
analysisStore.fetchAnalysisDataAction()

//2.从sotore中获取数据（拿响应式数据）
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore)

//3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
.echart {
  height: 250px;
}
</style>
