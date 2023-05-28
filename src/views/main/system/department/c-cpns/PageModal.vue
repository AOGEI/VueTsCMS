<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="formData.leader"
              placeholder="请输入部门领导"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
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
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

//判断是否modal是否是新增还是编辑，是否显示密码
const isNewRef = ref(true)
const editData = ref()

//获取角色,部门的数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

//使用systemStore,发送新增用户的aciton
const systemStore = useSystemStore()

//2.定义设置centerDialogVisible方法
function setCenterDialogVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    //编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    //新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

//3.对新建用户确定操作的处理
function handleConfirmClick() {
  centerDialogVisible.value = false

  //发送请求编辑用户
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    //创建用户
    systemStore.newPageDataAction('department', formData)
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
