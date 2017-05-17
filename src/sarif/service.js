import SarifClient from './client'
import EventHub from '../EventHub'

var host = 'ws://' + window.location.hostname + ':5000/socket'
if (typeof window.SarifServer !== 'undefined') {
  host = 'local'
}

export default {
  host: host,
  deviceId: 'webui',
  token: null,
  client: null,

  connect (host, deviceId, token, cb) {
    this.host = host || this.host
    this.deviceId = deviceId || this.deviceId
    this.token = token || this.token

    host = this.host
    if (host === 'local') {
      host = window.SarifServer
    }
    this.client = new SarifClient(host, this.deviceId, this.token)

    var oneShot = true
    this.client.onOpen = (e) => {
      if (cb && oneShot) {
        cb()
        oneShot = false
      }
      EventHub.emit('sarif-connected')
    }
    this.client.onClose = (e) => {
      console.log(e)
      if (cb && oneShot) {
        cb('Unknown WebSocket error.')
        oneShot = false
      }
      EventHub.emit('sarif-disconnected')
    }
  },

  reconnect () {
    return this.connect(this.host, this.deviceId, this.token)
  },

  isConnected () {
    return this.client && this.client.isConnected()
  }
}
