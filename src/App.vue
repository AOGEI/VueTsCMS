<template>
  <div class="App">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style scoped>
.App {
  height: 100vh;
  width: 100vw;
}
</style>
