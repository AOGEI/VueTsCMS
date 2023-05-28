<template>
  <div class="LoginAccountPane">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
      ref="elfromRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
//定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})
//定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}
//执行帐号的登录逻辑
const elfromRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  elfromRef.value?.validate((valid) => {
    if (valid) {
      //1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      //2.向服务器发送网络请求(附带帐号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, this is a error message.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
