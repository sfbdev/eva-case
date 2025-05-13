import { createStore } from 'vuex'
import { endpoints } from '@/services'
import router from '@/router'

const data = {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    getDailySalesOverview({ rootState, commit }, day = 7) {
      const userInfo = rootState?.user.userInfo
      console.log('userInfo,', userInfo)
      const payload = {
        marketplace: userInfo.user.store[0].marketplaceName,
        sellerId: userInfo.user.store[0].storeId,
        requestStatus: 0,
        day: day,
        excludeYoYData: true,
      }
      return endpoints.getDailySalesOverview(payload).then((response) => {
        console.log('response', response)
        return response.data.Data
      })
    },
    getDailySalesSkuList({ rootState, commit }, data) {
      const userInfo = rootState?.user.userInfo
      console.log('data,', data)
      const payload = {
        marketplace: userInfo?.user.store[0].marketplaceName,
        sellerId: userInfo?.user.store[0].storeId,
        salesDate: data.category,
        salesDate2: data.category,
        pageSize: 1000,
        pageNumber: data.pagination.current,
        isDaysCompare: 0,
      }
      return endpoints.getDailySalesSkuList(payload).then((response) => {
        console.log('getDailySalesSkuList', response)
        // commit('setDailySalesOverview', response.data.Data)
        return response.data.Data
      })
    },

    getSkuRefundRate({ rootState, commit }, skuList) {
      const userInfo = rootState?.user.userInfo
      console.log('data,', data)
      const payload = {
        marketplace: userInfo?.user.store[0].marketplaceName,
        sellerId: userInfo?.user.store[0].storeId,
        // pageNumber: data.pagination.current,
        skuList: skuList,
        requestedDay: 60,
      }
      return endpoints.getSkuRefundRate(payload).then((response) => {
        return response.data.Data
      })
    },
  },
}

export default data
