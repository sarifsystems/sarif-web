<template>
  <p v-if="error">{{ error }}</p>
  <div v-el:chart></div>
</template>

<script>
import vg from 'vega'

/* function findPoints(v, points, axes) { */
/*   if (v instanceof Array) { */
/*     for (var i = 0; i < v.length; i++) { */
/*       findPoints(v, points, axes) */
/*     } */
/*     return */
/*   } */

/*   if (typeof v === 'object') { */
/*     var p = {}, set = false */
/*     for (var key in v) { */
/*       var val = v[key] */
/*       if (typeof val === 'object') { */
/*         findPoints(val, points, axes) */
/*       } else if (axes.indexOf(key) >= 0) { */
/*         p[key] = val */
/*         set = true */
/*       } */
/*     } */
/*     if (set) { */
/*       points.push(p) */
/*     } */
/*   } */
/* } */

export default {
  props: ['data'],

  data () {
    return {
      error: null
    }
  },

  events: {
    resize () {
      this.$nextTick(() => {
        // this.map.invalidateSize()
      })
    }
  },

  activate (done) {
    this.updateChart()
    done()
  },

  watch: {
    'data.payload': {
      handler: function () {
        this.updateChart()
      },
      deep: true
    }
  },

  methods: {
    deriveSpec () {
      return null
    },

    updateChart () {
      this.$nextTick(() => {
        var spec = this.data.payload && this.data.payload.vega
        if (!spec) {
          spec = this.deriveSpec()
        }
        vg.parse.spec(spec, (error, chart) => {
          if (error) {
            this.error = error
            return
          }
          this.chart = chart({
            el: this.$els.chart
          })
          this.chart.update()
        })
      })
    }
  }
}
