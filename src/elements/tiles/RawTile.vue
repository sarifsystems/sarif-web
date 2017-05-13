<template>
  <textarea v-model="textData" class="code fullsize" v-bind:class="{ 'danger': error }"></textarea>
</template>

<script>
export default {
  props: ['data'],

  data () {
    return {
      error: false
    }
  },

  computed: {
    textData: {
      get () {
        this.error = false
        return JSON.stringify(this.data.payload, null, 2)
      },
      set (v) {
        try {
          this.data.payload = JSON.parse(v)
          this.error = false
        } catch (e) {
          this.error = true
        }
      }
    }
  }
}
</script>
