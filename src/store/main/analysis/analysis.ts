import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAanlysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      getAmountListData().then((res: any) => {
        this.amountList = res.data
      })
      getGoodsCategoryCount().then((res: any) => {
        this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res: any) => {
        this.goodsCategorySale = res.data
      })
      getGoodsCategoryFavor().then((res: any) => {
        this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSale().then((res: any) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAanlysisStore
