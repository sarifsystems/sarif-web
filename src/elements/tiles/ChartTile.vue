<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <div v-else ref="chart"></div>

    <div>
      <input type="text" v-model="xAxis" placeholder="X-Axis" @blur="updateChart" />
      <input type="text" v-model="yAxis" placeholder="Y-Axis" @blur="updateChart" />
    </div>
  </div>
</template>

<script>
import vg from 'vega'

function findPoints (v, points, axes) {
  if (v instanceof Array) {
    for (var i = 0; i < v.length; i++) {
      findPoints(v[i], points, axes)
    }
    return
  }

  if (typeof v === 'object') {
    var p = {}
    var set = false
    for (var key in v) {
      var val = v[key]
      if (typeof val === 'object' && key !== 'vega') {
        findPoints(val, points, axes)
      } else if (key in axes) {
        p[key] = val
        axes[key]++
        set = true
      }
    }
    if (set) {
      points.push(p)
    }
  }
}

export default {
  props: ['data'],

  data () {
    return {
      error: null,
      xAxis: '',
      yAxis: ''
    }
  },

  events: {
    resize () {
      this.$nextTick(() => {
        // this.map.invalidateSize()
      })
    }
  },

  mounted () {
    this.updateChart()
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
      var axes = [ 'x', 'timestamp', 'time', 'value', 'count', 'y' ]
      if (this.xAxis && this.yAxis) {
        axes = [this.xAxis, this.yAxis]
      }

      var axesCount = {}
      for (var i = 0; i < axes.length; i++) {
        axesCount[axes[i]] = 0
      }

      // Find objects in payload that contain axes
      var points = []
      findPoints(this.data.payload, points, axesCount)
      if (points.length === 0) {
        return null
      }

      var vega = {
        data: [
          {
            name: 'main',
            values: points
          }
        ],
        axes: [
          {type: 'x', scale: 'x'},
          {type: 'y', scale: 'y'}
        ]
      }

      // Identify most frequent axes in dataset
      var xAxis = null
      var yAxis = null
      for (var ai in axes) {
        var axis = axes[ai]
        if (!axesCount[axis]) {
          continue
        }
        if (!xAxis || axesCount[xAxis] < axesCount[axis]) {
          xAxis = axis
        } else if (!yAxis || axesCount[yAxis] < axesCount[axis]) {
          yAxis = axis
        }
      }
      yAxis = yAxis || xAxis
      if (!xAxis || !yAxis) {
        return null
      }
      if (axes.indexOf(xAxis) > axes.indexOf(yAxis)) {
        [xAxis, yAxis] = [yAxis, xAxis]
      }
      this.xAxis = xAxis
      this.yAxis = yAxis

      var xscale = {name: 'x', type: 'ordinal', range: 'width', domain: {data: 'main', field: xAxis}}
      var yscale = {name: 'y', type: 'linear', range: 'height', domain: {data: 'main', field: yAxis}}
      vega.scales = [xscale, yscale]
      vega.data[0].transform = [{type: 'sort', 'by': xscale.domain.field}]

      if (xAxis === 'time' || xAxis === 'timestamp') {
        xscale.type = 'time'
        for (i = 0; i < points.length; i++) {
          if (typeof points[i][xAxis] === 'string') {
            points[i][xAxis] = Date.parse(points[i][xAxis])
          }
        }
      }
      if (yAxis === 'time' || yAxis === 'timestamp') {
        yscale.type = 'time'
        for (i = 0; i < points.length; i++) {
          if (typeof points[i][yAxis] === 'string') {
            points[i][yAxis] = Date.parse(points[i][yAxis])
          }
        }
      }

      var hist = {
        type: 'rect',
        from: {data: 'main'},
        properties: {
          enter: {
            x: {scale: xscale.name, field: xscale.domain.field},
            y: {scale: yscale.name, field: yscale.domain.field},
            width: {scale: xscale.name, band: true, offset: -1},
            y2: {scale: yscale.name, value: 0}
          },
          update: {
            fill: {value: 'steelblue'}
          },
          hover: {
            fill: {value: 'red'}
          }
        }
      }

      var scatter = {
        type: 'symbol',
        from: {data: 'main'},
        properties: {
          enter: {
            x: {scale: xscale.name, field: xscale.domain.field},
            y: {scale: yscale.name, field: yscale.domain.field},
            fill: {value: 'steelblue'}
          }
        }
      }

      var lines = {
        type: 'line',
        from: {data: 'main'},
        properties: {
          enter: {
            x: {scale: xscale.name, field: xscale.domain.field},
            y: {scale: yscale.name, field: yscale.domain.field},
            stroke: {value: 'steelblue'},
            strokeWidth: 2
          }
        }
      }
      if (points.length < 30) {
        if (xscale.type === 'time') {
          vega.marks = [scatter]
        } else {
          vega.marks = [scatter] || hist
        }
      } else {
        vega.marks = [lines]
      }

      console.log(vega)
      return vega
    },

    updateChart () {
      var spec = this.data.payload && this.data.payload.vega
      if (!spec) {
        spec = this.deriveSpec()
      }
      this.$nextTick(() => {
        vg.parse.spec(spec, (error, chart) => {
          if (error) {
            this.error = error
            return
          }
          this.chart = chart({
            el: this.$refs.chart
          })
          this.chart.update()
        })
      })
    }
  }
}
</script>
