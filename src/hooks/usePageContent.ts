import { ref } from 'vue'
import type PageContent from '@/components/page-content/PageContent.vue'

function usePageContent() {
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
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageContent
