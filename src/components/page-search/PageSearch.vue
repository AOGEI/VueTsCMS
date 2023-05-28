<template>
  <div class="search" v-if="isQuery">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input
              ></template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
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
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

//定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    pageName: string
    formItem: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

//判断是否有查询权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

//定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItem) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

//重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  //1.重置form中的数据
  formRef.value?.resetFields()

  //2.将事件传递出去，content内部重新发送网络请求
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: white;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0px;
  }
}
.btns {
  text-align: right;
  padding: 0 50px 10px 0;
  .el-button {
    height: 36px;
  }
}
</style>
