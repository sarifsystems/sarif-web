<template>
  <div class="chat">
    <div class="pure-u-12-24">
      <cat
        head-text="&bull;  &bull;"
        body-text="#"></cat>

      <ul v-el:messages class="messages">
        <li v-for="msg in history">
          <span v-if="msg.dir == 'in'" class="danger">&laquo;</span>
          <span v-else class="danger">&raquo;</span>
          {{ msg.text }}
          <a class="debug inspect" v-on:click="$dispatch('inspect', msg)"><i class="fa fa-gear"></i></a>
        </li>
      </ul>
      <h1 v-if="message">
        {{ message.text }}
          <a class="debug inspect" v-on:click="$dispatch('inspect', message)"><i class="fa fa-gear"></i></a>
      </h1>

      <form class="pure-form" v-on:submit.prevent="send">
        <input type="text" v-model="input.text" placeholder="Talk to me ..." />
        <button type="submit" class="pure-button pure-button-primary">Say</button>
      </form>
    </div>
  </div>
</template>

<style>
.chat {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  margin-top: -130px;
}

.chat .messages {
  height: 95px;
  text-align: left;
  overflow: auto;
}
.chat .messages li {
  list-style-type: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>

<script>
import Stark from '../stark/service'
import Cat from './Cat'

export default {
  components: {
    cat: Cat
  },

  data () {
    return {
      history: [],
      message: {text: 'Hello World!', dir: 'in'},

      input: {
        text: ''
      }
    }
  },

  methods: {
    send () {
      var msg = {
        action: 'natural/handle',
        text: this.input.text
      }

      this.input.text = ''
      Stark.request(msg, (reply) => {
        this.addMessage(reply, 'in')
      })

      if (this.message) {
        this.history.push(this.message)
      }
      this.addMessage(msg, 'out')
    },

    addMessage (msg, dir) {
      msg.dir = dir
      if (dir === 'in') {
        this.message = msg
      } else {
        this.history.push(msg)
      }

      this.$nextTick(() => {
        this.$els.messages.scrollTop = this.$els.messages.scrollHeight
      })
    }
  }
}
</script>
