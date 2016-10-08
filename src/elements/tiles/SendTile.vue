<template>
  <div class="tile">
    <form class="pure-form" v-on:submit.prevent="send">
      <input type="text" v-model="data.msg.action" placeholder="Action" />
      <input type="text" v-model="data.msg.dst" placeholder="Destination" />
      <input type="text" v-model="data.msg.text" placeholder="Text" />
      <input type="submit" value="Send" />
    </form>
  </div>
</template>

<script>
import Sarif from '../../sarif/service'
import Store from '../../store'

export default {
  props: ['data'],

  methods: {
    send () {
      var msg = JSON.parse(JSON.stringify(this.data.msg))
      delete msg.id
      delete msg.corr
      delete msg.src
      delete msg.dst
      if (this.data.payload) {
        msg.p = JSON.parse(JSON.stringify(this.data.payload))
      }

      Sarif.client.request(msg, (reply) => {
        Store.addCard({
          data: {msg: reply}
        })
      })
    }
  }
}
