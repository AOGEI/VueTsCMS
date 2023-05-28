import hyRequest from '@/service'
import { localCache } from '@/utils/cache'

/**针对查询用户列表的网络请求 */
export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    headers: {
      Authorization: localCache.getCache('token')
    },
    data: queryInfo
  })
}

//删除用户
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

//新增用户
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

//修改角色
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

/**针对页面的网络请求:增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
