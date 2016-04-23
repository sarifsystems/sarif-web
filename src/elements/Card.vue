<template>
  <div class="card" v-bind:class="[expanded ? 'pure-u-24-24' : 'pure-u-6-24', expanded ? 'expanded' : null]">
    <div class="card-header">
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list menu-flex">
          <li class="pure-menu-item menu-expand"><b class="pure-menu-heading">Card #{{ card.id }}</b></li>

          <li class="pure-menu-item pure-menu-allow-hover menu-small">
            <a href="javascript:void();" class="pure-menu-link"><i class="fa fa-paw"></i></a>
            <ul class="pure-menu-children">
              <li class="pure-menu-item"><a href="#" v-on:click.prevent="$dispatch('addCard', card)" class="pure-menu-link"><i class="fa fa-arrow-right"></i> Clone</a></li>
              <li class="pure-menu-item"><a href="#" v-on:click.prevent="$dispatch('addCard', card, true)" class="pure-menu-link"><i class="fa fa-link"></i> Reference</a></li>
            </ul>
          </li>

          <li class="pure-menu-item menu-small">
            <a href="#" v-on:click.prevent="toggleExpanded()" class="pure-menu-link"><i class="fa fa-expand"></i></a>
          </li>
          <li class="pure-menu-item menu-small">
            <a href="#" v-on:click.prevent="$dispatch('closeCard', card.id)" class="pure-menu-link"><i class="fa fa-close"></i></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="card-row" v-if="card.data.msg">
      <div class="tile">
        <p>{{ card.data.msg.text | prettyText }}</p>
      </div>
    </div>

    <div class="card-row">
      <component :is="card.main_tile" :data="card.data"></component>
    </div>

    <div class="card-row" v-if="sendTile">
      <send-tile :data="card.data"></send-tile>
    </div>

    <div class="card-row pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list menu-flex">
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="changeMainTile('OverviewTile')" class="pure-menu-link" title="Overview"><i class="fa fa-columns"></i></a></li>
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="changeMainTile('FormTile')" class="pure-menu-link" title="Edit"><i class="fa fa-pencil"></i></a></li>
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="changeMainTile('RawTile')" class="pure-menu-link" title="Raw JSON"><i class="fa fa-code"></i></a></li>
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="changeMainTile('MapsTile')" class="pure-menu-link" title="Maps"><i class="fa fa-map"></i></a></li>
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="changeMainTile('ChartTile')" class="pure-menu-link" title="Chart"><i class="fa fa-area-chart"></i></a></li>
        <li class="pure-menu-item"><a href="#" v-on:click.prevent="toggle('sendTile')" class="pure-menu-link" title="Send To"><i class="fa fa-share"></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import RawTile from './tiles/RawTile.vue'
import OverviewTile from './tiles/OverviewTile.vue'
import FormTile from './tiles/FormTile.vue'
import MapsTile from './tiles/MapsTile.vue'
import ChartTile from './tiles/ChartTile.vue'
import SendTile from './tiles/SendTile.vue'

export default {
  props: ['card'],

  data () {
    return {
      expanded: false,
      sendTile: false
    }
  },

  methods: {
    changeMainTile (type) {
      this.card.main_tile = type
    },

    toggleExpanded () {
      this.expanded = !this.expanded
      window.setTimeout(() => {
        this.$broadcast('resize')
      }, 300)
    },

    toggle (option) {
      this.$set(option, !this.$get(option))
    }
  },

  components: {
    RawTile: RawTile,
    OverviewTile: OverviewTile,
    FormTile: FormTile,
    MapsTile: MapsTile,
    ChartTile: ChartTile,
    SendTile: SendTile
  }
}
