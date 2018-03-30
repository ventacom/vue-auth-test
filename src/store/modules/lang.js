import { app } from '../../main'
import Geo from '../../api/geo'

const state = {
  lang: 'en',
  geoInfo: {
    ip: null,
    country: null,
    countryCode: null,
    region: null,
    regionName: null,
    city: null
  },
  browserInfo: {
    language: null,
    languages: null
  }
}

const mutations = {
  SET_LANG (state, lang) {
    app.$i18n.locale = lang
    state.lang = lang
  },
  SET_GEO_INFO (state, geoData) {
    state.geoInfo.ip = geoData && geoData.ip || null
    state.geoInfo.country = geoData && geoData.country || null
    state.geoInfo.countryCode = geoData && geoData.countryCode || null
    state.geoInfo.region = geoData && geoData.region || null
    state.geoInfo.regionName = geoData && geoData.regionName || null
    state.geoInfo.city = geoData && geoData.city || null
  },
  SET_BROWSER_INFO (state, browserData) {
    state.browserInfo.language = browserData && browserData.language || null
    state.browserInfo.languages = browserData && browserData.languages || null
  }
}

const actions = {
  changeLang ({ state, commit }, lang) {
    commit('SET_LANG', lang)
  },
  loadGeoInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      Geo.getGeoInfo()
        .then(response => {
          commit('SET_GEO_INFO', response.data)
          resolve()
        })
        .catch(err => {
          console.log('error get request:', err)
          commit('SET_GEO_INFO', null)
          reject(err)
        })
    })
  },
  applyGeoLang ({ commit, state }, rawLang) {
    if (rawLang) {
      const lang = rawLang.toLowerCase().slice(0, 2)
      switch (lang) {
        case 'ru' || 'ua':
          commit('SET_LANG', 'ru')
          break
        default:
          console.log('Lang is: ', lang)
        // commit('SET_LANG', 'en')
      }
    }
  },
  async checkGeo ({ state, commit, dispatch }) {
    const localGeoData = navigator
    if (!state.geoInfo.countryCode) {
      if (localGeoData.language) {
        commit('SET_BROWSER_INFO', localGeoData)
        dispatch('applyGeoLang', state.browserInfo.language)
      } else {
        await dispatch('loadGeoInfo')
          .then(() => {
            dispatch('applyGeoLang', state.geoInfo.countryCode)
          })
          .catch(() => {
            console.log('ERROR loading data from open-geo services')
          })
      }
    } else {
      dispatch('applyGeoLang', state.geoInfo.countryCode)
    }
  }
}

const getters = {
  getLang (state) {
    return state.lang
  },
  getGeoData (state) {
    return state.geoInfo
  },
  getBrowserData (state) {
    return state.browserInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
