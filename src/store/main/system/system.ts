import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUserListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    userTotalCount: 0,

    //page是通用代码片段
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    //针对用户管理
    async postUsersListAction(queryInfo: any) {
      const usersListResult: any = await postUserListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      //1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      //2.删除成功后重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newUserResult = await newUserData(userInfo)
      console.log(newUserResult)

      //新增用户成功后重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })

      //新增后重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editUserDataAction(id: number, userInfo: any) {
      //1.更新用户数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      //2.刷新数据
      this.postUsersListAction({ offset: 0, size: 10 })

      //更新后重新获取数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },

    // 针对页面的数据,进行增删改查
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult: any = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    //删除
    async deletePageByIdAction(pageName: string, id: number) {
      //1.删除数据操作
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)

      //2.删除成功后重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      //重新获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    //新建
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      //重新获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    //编辑
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      //重新获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
