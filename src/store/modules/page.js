import Page from '../../api/page'

const state = {
  page: null
}

const mutations = {
  SET_PAGE (state, page) {
    state.page = page
  }
}

const actions = {
  loadPage ({ commit, state, getters }) {
    console.log('loadPage = ', getters.isLoggedIn)
    if (getters.isLoggedIn) {
      Page.getSecretPage(getters.getToken)
        .then(response => {
          commit('SET_PAGE', response.data)
          console.log('SET PAGE')
        })
        .catch(err => {
          // commit('SET_ACCESS_TOKEN', null)
          console.log('------Secret Page Loading Error------')
          console.log(err)
        })
    }
  }
}

const getters = {
  getPage (state) {
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
