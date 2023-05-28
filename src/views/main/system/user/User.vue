<template>
  <div class="User">
    <UserSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></UserSearch>
    <UserContent
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    ></UserContent>
    <UserModal ref="modalRef"></UserModal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/UserSearch.vue'
import UserContent from './c-cpns/UserContent.vue'
import UserModal from './c-cpns/UserModal.vue'
import { ref } from 'vue'

//对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()

function handleQueryClick(forData: any) {
  contentRef.value?.fetchUserListData(forData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

//对UserModal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewBtnClick() {
  modalRef.value?.setCenterDialogVisible()
}

function handleEditBtnClick(itemData: any) {
  modalRef.value?.setCenterDialogVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.User {
  border: 2px solid blanchedalmond;
  border-radius: 20px;
  overflow: hidden;
}
</style>
