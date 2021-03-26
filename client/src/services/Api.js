import axios from 'axios'
import ConfigApi from './ConfigApi'
import store from '@/store/store'

export default() => {
  return axios.create({
    baseURL: ConfigApi.connection.link + ":" + ConfigApi.connection.port,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
