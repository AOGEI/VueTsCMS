import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系 path => commponents
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/notfound/NotFound.vue')
    }
  ]
})

//导航守卫
//参数to(前往的路径) from(来自哪的路径)
//返回值:返回值决定导航的路径(不返回或者返回undefined,默认跳转)
router.beforeEach((to) => {
  if (to.path === '/main') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }

    //如果是进入到main
    if (to.path === '/main') {
      return firstMenu.url
    }
  }
})
export default router
