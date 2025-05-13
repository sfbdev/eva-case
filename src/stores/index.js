import { createStore } from 'vuex'
import user from '@/stores/user'
import data from '@/stores/data'
const store = createStore({
  modules: {
    user,
    data,
  },
})

export default store
