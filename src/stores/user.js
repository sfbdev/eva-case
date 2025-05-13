import { createStore } from 'vuex'
import { endpoints } from '@/services'
import router from '@/router'
import { useNotification } from '@kyvg/vue3-notification'

const { notify } = useNotification()

const user = {
  namespaced: true,
  state: () => ({
    userInfo: null,
  }),
  getters: {
    // isLoggedIn(state) {
    //   return !!state.user
    // },
  },
  mutations: {
    SET_USER_INFO(state, user) {
      state.userInfo = user
    },
    setDailySalesOverview(state, payload) {
      state.dailySalesOverview = payload
    },
  },
  actions: {
    login({ commit, dispatch }, payload) {
      return endpoints.login(payload).then((res) => {
        localStorage.setItem('auth', JSON.stringify({ email: payload.Email, ...res.data.Data }))
        dispatch('getUserInfo')
        notify({
          title: `Welcome ${payload.Email}`,
        })
      })
    },
    async getUserInfo({ state, commit }) {
      try {
        const auth = JSON.parse(localStorage.getItem('auth'))
        return endpoints
          .getUserInfo({ email: auth.email })
          .then((response) => {
            commit('SET_USER_INFO', response.data.Data)
            router.push({ name: 'home' })
          })
          .catch((err) => {
            router.push({ name: 'login' })
          })
      } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
      }
    },

    logout() {
      localStorage.clear()
      router.push({ name: 'login' })
    },
  },
}

export default user
