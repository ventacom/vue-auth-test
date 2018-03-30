import axios from 'axios'
import { endpoint } from '../system/constants'
import { secretData } from '../system/secret'

export default {
  getAllUsers () {
    return axios.get(endpoint + 'api/users')
  },
  getCurrentUser (token) {
    const getParam = {
      headers: {
        Authorization: `Bearer ` + token
      }
    }
    return axios.get(endpoint + 'api/users/current', getParam)
    // return axios.get(endpoint + 'api/users/current' + '?access_token=' + token)
  },
  postNewUser ({ email, username, password, repassword }) {
    axios.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    })

    axios.interceptors.response.use(response => {
      console.log('Response:', response)
      return response
    })
    const postData = {
      email: email,
      username: username,
      plainPassword: {
        'first': password,
        'second': repassword
      }
    }
    const postParam = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return axios.post(endpoint + 'api/users/new', postData, postParam)
  },
  postUserAvatar (id, token, postData, progress) {
    axios.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    })

    axios.interceptors.response.use(response => {
      console.log('Response:', response)
      return response
    })
    const postParam = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        access_token: token
      },
      onUploadProgress: progress
    }
    // console.log(endpoint + 'api/users/' + id + '/avatars' + '?access_token=' + token)
    return axios.post(endpoint + 'api/users/' + id + '/avatars', postData, postParam)
  },
  getUserToken ({ username, password }) {
    const getParam = {
      params: {
        grant_type: 'password',
        client_id: secretData.client_id,
        client_secret: secretData.client_secret,
        username: username,
        password: password
      }
    }
    return axios.get(endpoint + 'oauth/v2/token', getParam)
  },
  postUserToken ({ username, password }) {
    const postData = {
      grant_type: 'password',
      client_id: secretData.client_id,
      client_secret: secretData.client_secret,
      username: username,
      password: password
    }
    return axios.post(endpoint + 'oauth/v2/token', postData)
  },
  getUserAuth (token) {
    return axios.get(endpoint + 'oauth/v2/auth', token)
  },
  postUserAuth (token) {
    return axios.post(endpoint + 'oauth/v2/auth', token)
  }
}
