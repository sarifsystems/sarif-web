import StarkClient from './client'

var host = 'ws://' + window.location.hostname + ':5000/stream/stark'
if (typeof window.StarkServer !== 'undefined') {
  host = 'local'
}

export default {
  host: host,
  client: null,

  connect (host, deviceId, token, cb) {
    if (!host) {
      host = this.host
    } else {
      this.host = host
    }

    if (host === 'local') {
      host = window.StarkServer
    }
    this.client = new StarkClient(host, deviceId || 'webui', token)

    var oneShot = true
    this.client.onOpen = (e) => {
      if (cb && oneShot) {
        cb()
        oneShot = false
      }
    }
    this.client.onClose = (e) => {
      console.log(e)
      if (cb && oneShot) {
        cb('Unknown WebSocket error.')
        oneShot = false
      }
    }
  },

  isConnected () {
    return this.client && this.client.isConnected()
  }
}
