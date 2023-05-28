<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="forData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="forData.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="forData.realname"
              placeholder="请输入真实姓名"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              type="pasword"
              show-password
              v-model="forData.password"
              placeholder="请输入用户密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="forData.cellphone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select
              v-model="forData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select
              v-model="forData.departmentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

//1.定义内部的属性
const centerDialogVisible = ref(false)
const forData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

//判断是否modal是否是新增还是编辑，是否显示密码
const isNewRef = ref(true)
const editData = ref()

//获取角色,部门的数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

//使用systemStore,发送新增用户的aciton
const systemStore = useSystemStore()

//2.定义设置centerDialogVisible方法
function setCenterDialogVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    //编辑数据
    for (const key in forData) {
      forData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    //新建数据
    for (const key in forData) {
      forData[key] = ''
    }
    editData.value = null
  }
}

//3.对新建用户确定操作的处理
function handleConfirmClick() {
  centerDialogVisible.value = false
  //发送请求编辑用户
  if (!isNewRef.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, forData)
  } else {
    //创建用户
    systemStore.newUserDataAction(forData)
  }
}

//把对应属性和方法暴露出去,以便User.vue使用
defineExpose({ setCenterDialogVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
