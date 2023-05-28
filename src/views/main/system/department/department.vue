<template>
  <div class="department">
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
    >
      <template #leader="scope">
        <span class="leader">哈哈哈:{{ scope.row[scope.prop] }}</span>
        <span>{{ scope.age }}</span>
      </template>
      <template #parent="scope">{{ scope.row.parentId }}</template>
    </PageContent>
    <PageModal ref="modalRef" :modal-config="modalConfigRef"></PageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import { computed } from 'vue'

//导入配置文件
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//对modalConfig进行操作，拿到选择部门的options
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItem.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

//setup相同的逻辑抽取:hooks
//点击search,content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

//点击了content组件，modal组件的操作
//获取modal组件
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped></style>
