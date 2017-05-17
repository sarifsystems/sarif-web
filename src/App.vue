<template>
  <div id="app-container">
    <nav v-if="state.connected" id="nav" class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/overview"
            class="pure-menu-link">Overview</router-link></li>
        <li class="pure-menu-item"><router-link to="/chat"
            class="pure-menu-link">Chat</router-link></li>
        <li class="pure-menu-item"><router-link to="/daily" class="pure-menu-link">Daily</router-link></li>
        <li class="pure-menu-item"><router-link to="/cards" class="pure-menu-link">Cards</router-link></li>
      </ul>
    </nav>

    <div id="app">
      <div v-if="state.connecting" class="connecting">
        Connecting ...
      </div>
      <div v-else-if="reconnect.try" class="connecting">
        Reconnecting in {{ reconnect.timer }}<br>
        <a @click="doReconnect()">Reconnect now</a>
      </div>
      <div v-else>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 15vw;
}

#app .connecting {
  margin-top: 150px;
  text-align: center;
  font-size: 48px;
}

#nav {
	width: 100%;
  margin-bottom: 50px;
}

#nav .pure-menu-link {
  padding: 20px 20px;
}

#app {
  flex: 1;
  width: 100%;
}

.debug.inspect {
  color: #ccc;
  display: none;
  cursor: pointer;
}
*:hover > .debug.inspect {
  display: inline;
}

.cards {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 360px;
}

.cards .card.expanded {
  min-width: 45%;
  flex-grow: 1;
  min-height: 600px;
}

.card .card-row-expand {
  min-height: 200px;
  flex-grow: 1;
}

.card .tile {
  padding: 15px;
}

.card .tile.fullsize {
  padding-left: 0px;
  padding-right: 0px;
}

.pure-menu-list.menu-flex {
  display: inline-flex;
  width: 100%;
}
.menu-expand {
  flex-grow: 1;
}
.menu-small {
  font-size: 12px;
}

.pure-table .table-collapse {
  border-bottom: 0;
}

.prop-object {
  width: 100%;
}

.prop-object th {
  white-space: nowrap;
  text-align: left;
}
.prop-object td {
  width: 100%;
}

.prop-object .prop-item-complex {
  padding-left: 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.card textarea.fullsize {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  white-space: pre;
  overflow: auto;
  border: 0;
  padding: 15px;
}

</style>

<script>
import Sarif from './sarif/service'
import EventHub from './EventHub'
import Store from './store'

export default {
  data () {
    return {
      state: Store.state,
      reconnect: {
        timer: 10,
        try: 0,
        active: null
      }
    }
  },

  mounted () {
    EventHub.on('sarif-connected', () => {
      this.reconnect.try = 0
      this.state.connected = true
      Sarif.client.onMessage = (msg) => {
        this.notify(msg)
      }
    })
    EventHub.on('sarif-disconnected', () => {
      this.state.connected = false
      if (this.reconnect.active) {
        return
      }

      this.reconnect.try++
      if (this.reconnect.try <= 5) {
        this.reconnect.timer = 10
      } else if (this.reconnect.try <= 10) {
        this.reconnect.timer = 30
      } else {
        this.reconnect.timer = 60
      }

      this.reconnect.active = window.setInterval(() => {
        this.reconnect.timer--
        if (this.reconnect.timer <= 0) {
          this.doReconnect()
        }
      }, 1000)
    })

    if (window.Notification && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  },

  methods: {
    notify (msg) {
      if (window.Notification && Notification.permission === 'granted') {
        var n = new Notification('Sarif message', {body: msg.text})
        n.eslint_no_new = true
      }
    },

    doReconnect () {
      if (this.reconnect.active) {
        window.clearInterval(this.reconnect.active)
        this.reconnect.active = null
      }
      Sarif.reconnect()
    }
  }
}
</script>
