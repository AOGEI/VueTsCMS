import { ref } from 'vue'
import type PageModal from '@/components/page-modal/PageModal.vue'

type callBackFnType = (data?: any) => void
function usePageModal(
  newCallBack?: callBackFnType,
  editCallback?: callBackFnType
) {
  //点击了content组件，modal组件的操作
  //获取modal组件
  const modalRef = ref<InstanceType<typeof PageModal>>()
  //新建操作
  function handleNewClick() {
    modalRef.value?.setCenterDialogVisible()
    if (newCallBack) newCallBack()
  }
  //编辑操作
  function handleEditClick(itemData: any) {
    modalRef.value?.setCenterDialogVisible(false, itemData)
    if (editCallback) {
      editCallback(itemData)
    }
  }
  return {
    modalRef,
    handleNewClick,
    handleEditClick
  }
}
export default usePageModal
