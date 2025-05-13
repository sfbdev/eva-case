import './assets/styles/_main.scss'
import './assets/styles/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/stores/index'
import auth from '@/middleware/auth'
import Notifications from '@kyvg/vue3-notification'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import { Table } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const app = createApp(App)
app.use(Table)
Highcharts.setOptions({
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
  },
})
const authInfo = JSON.parse(localStorage.getItem('auth'))
if (authInfo?.email) {
  store.dispatch('user/getUserInfo')
}
app.use(router)
app.use(store)
app.use(Notifications)
app.use(HighchartsVue)
// router.beforeEach(auth)

app.mount('#app')
