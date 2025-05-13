import axios from 'axios'
import router from '@/router'
import store from '@/stores/index'

import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()
const token = JSON.parse(localStorage.getItem('auth'))
export const _axios = axios.create({
  timeout: 30000,
  baseURL: 'https://iapitest.eva.guru',
  headers: {
    Authorization: `Bearer ${token ? token.AccessToken : null}`,
  },
})

_axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
_axios.interceptors.response.use(
  (response) => {
    if (response.data.ApiStatusCode == 404) {
      notify({
        type: 'error',
        title: response.data.ApiStatusCode,
        text: response.data.ApiStatusMessage,
      })
    }
    return response
  },
  (error) => {
    notify({
      type: 'error',
      title: error.response?.data?.ApiStatusMessage,
    })

    return Promise.reject(error)
  },
)

export const endpoints = {
  async login(payload) {
    try {
      return await _axios.post('oauth/token', payload)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
  getUserInfo(payload) {
    try {
      return _axios.post('user/user-information', payload)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
  getDailySalesOverview(payload) {
    try {
      return _axios.post('data/daily-sales-overview', payload)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
  getDailySalesSkuList(payload) {
    try {
      return _axios.post('data/daily-sales-sku-list/', payload)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
  getSkuRefundRate(payload) {
    try {
      return _axios.post('data/get-sku-refund-rate/', payload)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  },
}
export default { _axios, endpoints }
