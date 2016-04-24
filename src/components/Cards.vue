<template>
  <form id="cards-form" class="pure-form pure-g" v-on:submit.prevent="send">
      <input class="pure-u-20-24" type="text" v-model="input.text" placeholder="Talk to me ..." />
      <button type="submit" class="pure-button pure-button-primary pure-u-4-24">Say</button>
    </div>
  </form>

  <div class="cards">
    <card v-for="cardData in state.cards" :card="cardData" transition="fade"></card>
  </div>
</template>

<style>
#cards-form {
  padding: 10px;
}
</style>

<script>
import Stark from '../stark/service'
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
      Stark.request(msg, (reply) => {
        Store.addCard({
          data: {msg: reply}
        })
      })
    }
  },

  events: {
    closeCard (id) {
      Store.removeCard(id)
    },

    addCard (card, byRef) {
      Store.addCard(card, byRef)
    }
  },

  components: {
    card: Card
  }
}
