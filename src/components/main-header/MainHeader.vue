<template>
  <div class="MainHeader">
    <div class="menu-icon" @click="handleMenuIconClick()">
      <!-- <el-icon size="large" v-if="isFold === true"><Fold /></el-icon>
      <el-icon size="large" v-if="isFold === false"><Expand /></el-icon> -->
      <template v-if="isFold">
        <el-icon><Expand /></el-icon>
      </template>
      <template v-if="!isFold">
        <el-icon><Fold /></el-icon>
      </template>
      <!-- <el-icon>
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon> -->
    </div>
    <div class="content">
      <div class="breadcrumb"><HeaderCrumb></HeaderCrumb></div>
      <div class="info"><HeaderInfo></HeaderInfo></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/HeaderInfo.vue'
import HeaderCrumb from './c-cpns/HeaderCrumb.vue'
//内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick() {
  //内部改变状态
  isFold.value = !isFold.value
  //将我们状态传递出去
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.MainHeader {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
