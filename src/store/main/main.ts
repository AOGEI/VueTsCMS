import {
  getEntirDepartments,
  getEntireMenus,
  getEntirRoles
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  getters: {},
  actions: {
    async fetchEntireDataAction() {
      const rolesResult: any = await getEntirRoles()
      const deparmentsResult: any = await getEntirDepartments()
      const menuResult: any = await getEntireMenus()

      //保存请求的用户和部门数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = deparmentsResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
