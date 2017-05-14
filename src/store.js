export default {
  state: {
    connected: false,
    inspected: null,

    cards: []
  },

  setInspected (msg) {
    this.state.inspected = msg
  },

  addCard (card, byRef) {
    var orig = card
    card = JSON.parse(JSON.stringify(card))

    card.id = this.generateId()
    card.main_tile = card.main_tile || 'Preview'
    card.data = card.data || {}

    if (byRef) {
      card.data = orig.data
    } else if (card.data.msg && card.data.msg.p) {
      if (!card.data.payload) {
        card.data.payload = card.data.msg.p
      }
      delete card.data.msg.p
    }
    if (!('payload' in card.data)) {
      card.data.payload = null
    }
    this.state.cards.push(card)
  },

  removeCard (id) {
    for (var i = 0; i < this.state.cards.length; i++) {
      if (this.state.cards[i].id === id) {
        this.state.cards.splice(i, 1)
        break
      }
    }
  },

  generateId () {
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    var text = ''
    for (var i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }
}
