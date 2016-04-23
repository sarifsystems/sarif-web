<template>
  <template v-if="dataType === 'object'">
    <table v-if="expanded" class="prop-object pure-table pure-table-horizontal">
      <template class="prop-object-item" v-for="value in data">
        <tr v-if="isPrimitive(value)">
          <th>{{ $key | prettyName }}</th>
          <td>{{ value }}</td>
        </tr>
        <template v-else>
          <tr><th colspan="2" class="table-collapse">
            <b>{{ $key | prettyName }}</b>
          </th></tr>
          <tr><td colspan="2" class="prop-item-complex">
            <property :data="value"></property>
          </td></tr>
        </template>
      </template>
    </table>
    <div v-else>
      <a href="#" v-on:click.prevent="toggleExpanded()">{{ data | prettyObject }}</a>
      <a href="#" v-on:click.prevent="$dispatch('addCard', {data: {payload: data}})"><i class="fa fa-arrow-right"></i></a>
    </div>
  </template>

  <template v-if="dataType === 'array'">
    <table v-if="expanded" class="prop-list">
      <tr v-for="value in data">
        <td v-if="isPrimitive(value)">{{ value }}</td>
        <td v-else>
          <property :data="value"></property>
        </td>
      </tr>
    </table>
    <div v-else>
      <a href="#" v-on:click.prevent="toggleExpanded()">{{ data.length }} items</a>
      <a href="#" v-on:click.prevent="$dispatch('addCard', {data: {payload: data}})"><i class="fa fa-arrow-right"></i></a>
    </div>
  </template>

  <div class="prop-primitive" v-if="dataType === 'primitive'">{{data}}</div>
</template>

<script>
export default {
  name: 'property',
  props: {
    data: { default: null },
    expanded: { default: false }
  },

  methods: {
    isPrimitive (v) {
      var t = typeof v
      return t !== 'object' && t !== 'array'
    },

    toggleExpanded () {
      this.expanded = !this.expanded
    }
  },

  computed: {
    dataType () {
      if (this.data instanceof Array) {
        return 'array'
      }
      if (typeof this.data === 'object') {
        return 'object'
      }
      return 'primitive'
    }
  }
}
