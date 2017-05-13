<template>
  <form-property :data="data.payload" :expanded="true"></form-property>
</template>

<script>
import FormProperty from '../FormProperty.vue'

export default {
  props: ['data'],

  methods: {
  },

  components: {
    FormProperty: FormProperty
  }
}
</script>
