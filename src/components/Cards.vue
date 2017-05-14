<template>
  <div>
    <form id="cards-form" class="pure-form pure-g" v-on:submit.prevent="send">
        <input class="pure-u-20-24" type="text" v-model="input.text" placeholder="Talk to me ..." />
        <button type="submit" class="pure-button pure-button-primary pure-u-4-24">Say</button>
    </form>

    <transition-group tag="div" name="fade" class="cards">
      <card v-for="(cardData, key) in state.cards" :key="key" :card="cardData"></card>
    </transition-group>
  </div>
</template>

<style>
#cards-form {
  padding: 10px;
}
</style>

<script>
import Sarif from '../sarif/service'
import Store from '../store'
import Card from '../elements/Card.vue'

export default {
  data () {
    return {
      state: Store.state,
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
      Sarif.client.request(msg, (reply) => {
        Store.addCard({
          data: {msg: reply}
        })
      })
    }
  },

  components: {
    card: Card
  }
}
</script>
