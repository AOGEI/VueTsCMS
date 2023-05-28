import hyRequest from '@/service'
import { localCache } from '@/utils/cache'

export function getAmountListData() {
  return hyRequest.get({
    url: '/goods/amount/list',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
export function getGoodsCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}

export function getGoodsCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
export function getGoodsCategoryFavor() {
  return hyRequest.get({
    url: '/goods/category/favor',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
export function getGoodsAddressSale() {
  return hyRequest.get({
    url: '/goods/address/sale',
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
