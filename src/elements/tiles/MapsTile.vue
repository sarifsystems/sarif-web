<template>
  <div v-el:map style="width: 100%; height: 300px;"></div>
</template>

<script>
import L from 'leaflet'

function findFeatures (v, group) {
  if (v instanceof Array) {
    for (var i = 0; i < v.length; i++) {
      findFeatures(v[i], group)
    }
    return
  }

  if (typeof v === 'object') {
    if (v.latitude && v.longitude) {
      var p = L.marker([v.latitude, v.longitude])
      group.addLayer(p)
    }
    for (var key in v) {
      findFeatures(v[key], group)
    }
  }
}

export default {
  props: ['data'],

  events: {
    resize () {
      this.$nextTick(() => {
        this.map.invalidateSize()
      })
    }
  },

  activate (done) {
    this.map = L.map(this.$els.map, {
      zoomControl: false,
      attributionControl: false
    })
    var mapUrl = 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'
    var mapSubdomains = ['otile1', 'otile2', 'otile3', 'otile4']
    var maplayer = new L.TileLayer(mapUrl, {attribution: '', subdomains: mapSubdomains})
    maplayer.addTo(this.map)
    this.features = L.featureGroup()
    this.map.addLayer(this.features)

    this.updateMap()
    this.$nextTick(() => {
      this.map.invalidateSize()
    })
    done()
  },

  methods: {
    updateMap () {
      console.log('yoah')
      this.features.clearLayers()
      findFeatures(this.data.payload, this.features)
      this.$nextTick(() => {
        if (this.features.getLayers().length > 0) {
          this.map.fitBounds(this.features.getBounds())
        } else {
          this.map.fitWorld()
        }
      })
    }
  },

  watch: {
    'data.payload': {
      handler: function () {
        this.updateMap()
      },
      deep: true
    }
  }
}
