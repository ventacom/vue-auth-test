import Vue from 'vue'
import Validator from 'vuelidate'
import Meta from 'vue-meta'
import router from './system/router'
import store from './store/index'
import i18n from './lang/lang'
import App from './App.vue'

Vue.use(Validator)
Vue.use(Meta)

export const app = new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
