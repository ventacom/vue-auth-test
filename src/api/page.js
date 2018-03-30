import axios from 'axios'
import { endpoint } from '../system/constants'

export default {
  getIndexPage () {
    return axios.get(endpoint + 'api/index')
  },
  getSecretPage (token) {
    return axios.get(endpoint + 'api/secret_page/' + '?access_token=' + token)
  }
}
