<template>
  <div ref="map" style="width: 100%; height: 100%;"></div>
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
      var p
      if (v.accuracy) {
        p = L.circle([v.latitude, v.longitude], v.accuracy)
      } else {
        p = L.marker([v.latitude, v.longitude])
      }
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

  mounted () {
    this.map = L.mapbox.map(this.$refs.map, 'mapbox.streets', {
      zoomControl: false,
      attributionControl: false,
      accessToken: 'pk.eyJ1IjoieGNvbnN0cnVjdCIsImEiOiJjaXM1MG1odXMwMDE5MnRwMDA5YTU4aDhqIn0.5CSrIQYhTJjmfgQ4j9-LAg'
    })
    this.features = L.featureGroup()
    this.map.addLayer(this.features)

    this.updateMap()
    this.$nextTick(() => {
      this.map.invalidateSize()
    })
  },

  methods: {
    updateMap () {
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
</script>
