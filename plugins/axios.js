import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
const ONE_HOUR = 1000 * 60 * 60

const defaultCache = new LRUCache({ maxAge: ONE_HOUR })
export default function ({ $axios, redirect }) {
  const defaults = $axios.defaults
  // https://github.com/kuitos/axios-extensions
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache
  })

  $axios.setHeader('Access-Control-Allow-Origin', '*')
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    console.log(error)
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/400')
    // }
    // if (code === 401 || code === 403) {
    //   redirect('/login')
    // }
  })
}
