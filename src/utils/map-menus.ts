import type { RouteRecord, RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  //1.动态获取所有的路由对象，放到数组当中
  //*路由对象都在独立的文件中
  //*从文件中将所有的路由对象先读取数组中
  const localRoutes: RouteRecord[] = []

  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  //将加载的对象路由对象放在localRoutes里
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //加载本地路由
  const localRoutes = loadLocalRoutes()

  //2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === submenu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //2.将二级路由对应路径
        routes.push(route)
      }
      //记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
  //使用添加路由
  // const routes = mapMenusToRoutes(userMenus)
  // routes.forEach((route) => router.addRoute('main', route))
}

/**
 *  根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  //1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  //2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
export function mapMenuListTolds(menuList: any[]) {
  const ids: number[] = []
  //多重for循环可以使用函数递归
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

//映射用户的增删改查按钮权限
/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 返回权限的数组
 */
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: any[] = []
  function recurseGetPermissions(menus: any) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermissions(item.children ?? [])
      }
    }
  }
  recurseGetPermissions(menuList)
  return permissions
}
