<template>
  <div class="department">
    <PageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></PageSearch>
    <PageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></PageContent>
    <PageModal ref="modalRef"></PageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/PageSearch.vue'
import PageContent from './c-cpns/PageContent.vue'
import PageModal from './c-cpns/PageModal.vue'
import { ref } from 'vue'

//点击search搜索，content的操作
const contentRef = ref<InstanceType<typeof PageContent>>()
//查询操作
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
//重置操作
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

//点击了content组件，modal组件的操作
//获取modal组件
const modalRef = ref<InstanceType<typeof PageModal>>()
//新建操作
function handleNewClick() {
  modalRef.value?.setCenterDialogVisible()
}
//编辑操作
function handleEditClick(itemData: any) {
  modalRef.value?.setCenterDialogVisible(false, itemData)
}
</script>

<style scoped></style>
