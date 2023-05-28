<template>
  <div class="LoginPanel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 帐号登录的页面 -->
        <el-tab-pane label="帐号登录" name="account">
          <!-- Tab-pane 插槽 插入icon小图标-->
          <template #label>
            <div class="label">
              <el-icon><Avatar /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <LoginAccountPane ref="accountRef"></LoginAccountPane>
        </el-tab-pane>

        <!-- 手机登录的页面 -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <LoginPhonePane></LoginPhonePane>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import LoginAccountPane from './LoginAccountPane.vue'
import LoginPhonePane from './LoginPhonePane.vue'
import { ref, watch } from 'vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account') //选中帐号或手机状态
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false) //记住密码状态
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
//instanceType要传入构造器,获取构造器的返回实例
const accountRef = ref<InstanceType<typeof LoginAccountPane>>() //拿到子组件LoginAccountPane

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.LoginPanel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
