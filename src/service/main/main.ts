import { localCache } from '@/utils/cache'
import hyRequest from '..'

export function getEntirRoles() {
  return hyRequest.post({
    url: '/role/list',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function getEntirDepartments() {
  return hyRequest.post({
    url: '/department/list',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
