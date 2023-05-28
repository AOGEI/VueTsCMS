<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="
        isNewRef
          ? props.modalConfig.header.newTitle
          : props.modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItem" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input
              ></template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.label"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'
// import type { IModalProps } from './type'暂时不能对外部引用
interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItem: any[]
  }
  otherInfo?: any
}
//0.定义props
const props = defineProps<IModalProps>()

//1.定义内部的属性
const centerDialogVisible = ref(false)

const initialData: any = {}
for (const item of props.modalConfig.formItem) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)

//判断是否modal是否是新增还是编辑，是否显示密码
const isNewRef = ref(true)
const editData = ref()

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
      const item = props.modalConfig.formItem.find((item) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

//3.对新建用户确定操作的处理
function handleConfirmClick() {
  centerDialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  //发送请求编辑用户
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      formData
    )
  } else {
    //创建用户
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
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
