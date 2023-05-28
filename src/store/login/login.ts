import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenuListToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  //如何指定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.帐号登录，获取token等信息
      const loginResult: any = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      //提前设置token
      localCache.setCache('token', this.token)

      //2.获取登录用户的详细信息
      const userInfoResult: any = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      //3.根据角色请求用户权限(菜单menus)
      const userMenusResult: any = await getUserMenusByRoleId(
        this.userInfo.role.id
      )
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      //4.进行本地存储,使用localStorage或sessionStorage
      //localStorage.setItem('token', this.token)

      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //5.请求所有的用户和部门列表
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //重要：获取所有登录用户的所有按钮的权限
      const permissions = mapMenuListToPermissions(userMenus)
      this.permissions = permissions

      //重点:动态的添加路由 *router.addRoute('main',xxx)
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //5.页面跳转(main页面)
      router.push('/main')
    },
    loadLocalCacheAction() {
      //1.用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //5.1刷新时候请求所有的用户和部门列表
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //获取增删改查按钮的权限
        const permissions = mapMenuListToPermissions(userMenus)
        this.permissions = permissions

        //2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useLoginStore
