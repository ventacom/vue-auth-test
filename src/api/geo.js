import axios from 'axios'
import { geoApiHost } from '../system/constants'

export default {
  getGeoInfo () {
    return axios.get(geoApiHost)
  }
}
