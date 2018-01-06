<template>
  <div>
    <h1>Calendar</h1>
    <div id="calendar-heatmap"></div>
    <div class="daily-report" v-if="selectedReport">
      <h2>Day {{selectedReport.time | date}}</h2>
      <ul>
        <li v-for="(val, key) in selectedReport">
          <b>{{key}}:</b> {{val}}
        </li>
      </ul>
      <pre>{{selectedReport | jsonFormat}}</pre>
    </div>
  </div>
</template>

<style>
#calendar-heatmap svg {
  overflow: visible;
}

.daily-report b {
  display: inline-block;
  width: 200px;
}

text.month-name,
text.calendar-heatmap-legend-text,
text.day-initial {
  font-size: 14px;
  font-family: Helvetica, arial, 'Open Sans', sans-serif;
  fill: #aaa;
}
rect.day-cell:hover {
  stroke: #555555;
  stroke-width: 1px;
}
.day-cell-tooltip {
  position: absolute;
  z-index: 9999;
  padding: 5px 9px;
  color: #bbbbbb;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  text-align: center;
}
.day-cell-tooltip > span {
  font-family: Helvetica, arial, 'Open Sans', sans-serif
}
.calendar-heatmap {
  box-sizing: initial;
}
</style>

<script>
import Sarif from '../sarif/service'
import util from '../util.js'
import calendarHeatmap from '../modules/calendar-heatmap.js'
import moment from 'moment'

export default {
  data () {
    return {
      data: {},
      selectedReport: null
    }
  },

  activated () {
    this.init()
  },

  methods: {
    init () {
      Sarif.client.request({
        action: 'store/scan/report/daily',
        p: {
          start: 'daily/' + moment().startOf('day').subtract(1, 'year').toISOString(),
          end: 'daily/' + moment().endOf('day').toDate(),
          only: 'values',
          reverse: true,
          limit: 365
        }
      }, (reply) => {
        reply.p.map(report => {
          var d = moment(report.time).format('YYYY-MM-DD')
          this.data[d] = report
        })
        this.updateHeatmap(reply.p)
      })
    },

    updateHeatmap (data) {
      data = data.map(report => {
        return {
          date: moment(report.time).toDate(),
          count: report.review && (report.review.mood_score + 5) || 0,
          report: report
        }
      })

      var heatmap = calendarHeatmap()
        .data(data)
        .selector('#calendar-heatmap')
        .tooltipEnabled(true)
        .colorRange(['#1f3033', '#eff'])
        .onClick((data) => {
          this.select(data)
        })
      heatmap()
    },

    select (data) {
      var d = moment(data.date).format('YYYY-MM-DD')
      this.selectedReport = util.flattenObject(this.data[d])
    }
  }
}
</script>
