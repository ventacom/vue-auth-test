import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import Login from '../pages/login'
import Singup from '../pages/singup'
import Page from '../pages/page'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/singup',
      name: 'singup',
      component: Singup
    },
    {
      path: '/page',
      name: 'page',
      component: Page
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('check')
    .then(() => {
      switch (to.name) {
        case 'root':
          next({ name: 'page' })
          break
        default:
          next()
      }
    })
    .catch(() => {
      switch (to.name) {
        case 'singup':
          next()
          break
        case 'login':
          next()
          break
        default:
          next({ name: 'login' })
      }
    })
})
export default router
