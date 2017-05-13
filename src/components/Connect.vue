<template>
  <div id="connect">
      <cat
        head-text="&bull;  &bull;"
        body-text="#"></cat>

    <div v-if="connecting" class="connecting">Connecting ...</div>
    <form v-else class="pure-form pure-form-aligned" v-on:submit.prevent="connect">
      <fieldset>
        <div class="pure-control-group">
          <label for="host">Host</label>
          <input id="host" type="text" v-model="host" placeholder="Host" />
        </div>
        <div class="pure-control-group">
          <label for="device_id">Device ID</label>
          <input id="device_id" type="text" v-model="device_id" placeholder="Device ID" />
        </div>
        <div class="pure-control-group">
          <label for="auth_token">Auth Token</label>
          <input id="auth_token" type="text" v-model="auth_token" v-bind:placeholder="auth_hint" />
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Connect</button>

          <p v-if="error" class="danger">Could not connect: {{error}}</p>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style>
#connect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#connect .connecting {
  margin-top: 50px;
  text-align: center;
  font-size: 24px;
}
#connect form {
  margin-top: 50px;
}
</style>

<script>
import Sarif from '../sarif/service'
import Cat from './Cat'

export default {
  data () {
    return {
      host: Sarif.host,
      device_id: 'webui',
      auth_token: '',

      connecting: false,
      error: null
    }
  },

  computed: {
    auth_hint () {
      if (this.host === 'local') {
        return 'Not required'
      } else {
        return 'Auth Token'
      }
    }
  },

  mounted () {
    console.log(this.$route.query)
    console.log(this.$route.params)
    if (this.$route.query.auth) {
      this.auth_token = this.$route.query.auth
    }
    if (this.$route.query.device_id) {
      this.device_id = this.$route.query.device_id
    }
    if (this.$route.params.host) {
      this.host = this.$route.params.host
      this.connect()
    }
  },

  methods: {
    connect () {
      this.connecting = true
      Sarif.connect(this.host, this.device_id, this.auth_token, (error) => {
        this.connecting = false
        this.error = error
        if (!error) {
          this.$router.push('/home')
        }
      })
    }
  },

  components: {
    cat: Cat
  }
}
</script>
