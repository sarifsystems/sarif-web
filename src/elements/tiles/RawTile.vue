<template>
  <textarea v-model="textData" class="code fullsize"></textarea>
</template>

<script>
export default {
  props: ['data'],

  methods: {
  },

  computed: {
    textData: {
      get () {
        return JSON.stringify(this.data.payload, null, 2)
      },
      set (v) {
        try {
          this.data.payload = JSON.parse(v)
        } catch (e) {
        }
      }
    }
  }
}
