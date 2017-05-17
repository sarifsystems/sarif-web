import Vue from 'vue'

var EventHub = new Vue({
  methods: {
    emit (key, value) {
      this.$emit(key, value)
    },

    on (key, listener) {
      this.$on(key, listener)
    },

    off (key, listener) {
      this.$off(key, listener)
    }
  }
})
export default EventHub
