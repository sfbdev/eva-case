import store from '@/stores/index'
import router from '@/router'

export default function auth(to, from, next) {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const isAuthenticated = !!auth?.AccessToken
  if (!isAuthenticated && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
}
