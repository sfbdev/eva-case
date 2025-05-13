import store from '@/stores/index'
import router from '@/router'

export default function auth(to, from, next) {
  const isAuthenticated = store.state.user.userInfo !== null
  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
}
