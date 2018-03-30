import User from '../../api/user'
import { host } from '../../system/constants'
import defaultImg from '../../assets/img/user-photo.png'

const state = {
  user: {
    email: null,
    username: null,
    id: null,
    avatar: null
  },
  token: null,
  isLoggedIn: false
}

const mutations = {
  SET_ACCESS_TOKEN (state, token) {
    state.isLoggedIn = !(token === null)
    state.token = token
    state.isLoggedIn ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  },
  SET_USER_DATA (state, userData) {
    state.user.email = userData && userData.email || null
    state.user.username = userData && userData.username || null
    state.user.id = userData && userData.id || null
    state.user.avatar = userData && userData.avatar || null
    state.user.password = userData && userData.password || null
  },
  SET_USER_AVATAR (state, avatar) {
    state.user.avatar = avatar || null
  }
}

const actions = {
  async singUp ({ commit }, { email, username, password, repassword }) {
    await User.postNewUser({ email, username, password, repassword })
      .then(response => {
        return response
      })
      .catch(err => {
        throw err
      })
  },
  async login ({ commit, dispatch }, { username, password }) {
    await User.postUserToken({ username, password })
      .then(async response => {
        await dispatch('loadUserData', response.data.access_token)
          .then(() => {
            commit('SET_ACCESS_TOKEN', response.data.access_token)
          })
      })
      .catch(err => {
        throw err
      })
  },
  logout ({ commit }) {
    commit('SET_ACCESS_TOKEN', null)
    commit('SET_USER_DATA', null)
  },
  async loadUserData ({ commit, state }, token) {
    await User.getCurrentUser(token)
      .then(response => {
        commit('SET_USER_DATA', response.data)
      })
      .catch(err => {
        console.log('error get request:' + err)
        commit('SET_USER_DATA', null)
        throw err
      })
  },
  async uploadUserAvatar ({ commit, state }, { id, formData, progress }) {
    console.log('f = ', formData)
    await User.postUserAvatar(id, state.token, formData, progress)
      .then(response => {
        commit('SET_USER_AVATAR', response.data.avatar)
        console.log(state.user)
      })
      .catch(err => {
        throw err
      })
  },
  async check ({ commit, state, dispatch }, param) {
    const isInLocalStorage = localStorage.getItem('token')
    switch (param) {
      case '401':
        dispatch('logout')
        throw new Error('Please, login first')
      case 'full':
        break
      default:
        if (isInLocalStorage) {
          if (!state.isLoggedIn) {
            await dispatch('loadUserData', isInLocalStorage)
              .then(() => {
                commit('SET_ACCESS_TOKEN', isInLocalStorage)
              })
              .catch(() => {
                commit('SET_ACCESS_TOKEN', null)
                throw new Error('Access Token not valid')
              })
          }
        } else {
          throw new Error('Access Token not exist yet')
        }
        break
    }
  }
}

const getters = {
  isLoggedIn (state) {
    return state.isLoggedIn
  },
  getToken (state) {
    return state.token
  },
  getUser (state) {
    return state.user
  },
  getAvatar (state) {
    const imagePath = state.user.avatar
    let loadedImage = ''
    if (imagePath) {
      loadedImage = host + imagePath.path
    } else {
      loadedImage = defaultImg
    }
    return loadedImage
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
