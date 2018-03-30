import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import page from './modules/page'
import lang from './modules/lang'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    page,
    lang
  }
})

export default store
