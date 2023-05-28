<template>
  <div class="Role">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></PageSearch>
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></PageContent>
    <PageModal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
      /></template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/PageSearch.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'

import { mapMenuListTolds } from '@/utils/map-menus'

//setup相同的逻辑抽取:hooks
//点击search,content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

//点击了content组件，modal组件的操作
//获取modal组件
const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallBack,
  editCallback
)

//获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const treeRef = ref<InstanceType<typeof ElTree>>()
// 监听新建角色中的check
const otherInfo = ref({})

function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}

//新建回显
function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
//编辑回显
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListTolds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
