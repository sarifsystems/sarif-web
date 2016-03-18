import StarkClient from './client'

var host = window.location.hostname + ':5000'
if (typeof window.StarkServer !== 'undefined') {
  host = window.StarkServer
}

var client = new StarkClient(host, 'vue')

export default client
