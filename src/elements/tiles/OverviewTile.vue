<template>
  <div class="tile">
    <property v-if="data.payload" :data="data.payload" :expanded="true"></property>
    <p v-else><i>No payload.</i></p>
  </div>
</template>

<script>
import Property from '../Property.vue'

export default {
  props: ['data'],

  methods: {
  },

  components: {
    property: Property
  }
}
</script>
