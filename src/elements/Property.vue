<template>
  <div>
    <div v-if="dataType === 'object'">
      <table v-if="expanded" class="prop-object pure-table pure-table-horizontal">
        <div class="prop-object-item" v-for="(value, key) in data">
          <tr v-if="isPrimitive(value)">
            <th>{{ key | prettyName }}</th>
            <td>{{ value }}</td>
          </tr>
          <div v-else>
            <tr><th colspan="2" class="table-collapse">
              <b>{{ key | prettyName }}</b>
            </th></tr>
            <tr><td colspan="2" class="prop-item-complex">
              <property :data="value"></property>
            </td></tr>
          </div>
        </div>
      </table>
      <div v-else>
        <a href="#" v-on:click.prevent="toggleExpanded()">{{ data | prettyObject }}</a>
        <a href="#" v-on:click.prevent="addCard({data: {payload: data}})"><i class="fa fa-arrow-right"></i></a>
      </div>
    </div>

    <div v-if="dataType === 'array'">
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
        <a href="#" v-on:click.prevent="addCard({data: {payload: data}})"><i class="fa fa-arrow-right"></i></a>
      </div>
    </div>

    <div class="prop-primitive" v-if="dataType === 'primitive'">{{data}}</div>
  </div>
</template>

<script>
import Store from '../store'

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
    },

    addCard (card) {
      Store.addCard(card)
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
</script>
