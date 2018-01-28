<template>
  <div>
    <h1>Calendar</h1>
    <div id="calendar-heatmap"></div>

      <div class="pure-g">
        <div class="pure-u-16-24">
          <h2>Last entries</h2>
          <div v-for="entry in lastEntries">
            <a v-on:click="select(entry.time)">
              <b>{{entry.time | date('ddd, l')}}</b>
            </a>

            <span v-for="tag in entry.review.tags" class="badge">
              {{tag}}
            </span>

            <p>{{entry.review.summary}}</p>
            <ul class="tag-bar">
              <li>Mood: {{entry.review.mood_score}}</li>
              <li>Browsing: {{Math.round(entry.browsing.online*10)/10}}</li>
              <li>URLs: {{entry.browsing.urls}}</li>
            </ul>
            <hr>
          </div>
        </div>

        <div class="pure-u-8-24">
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

.badge {
  background: #5cc1df;
  border-radius: 10px;
  padding: 0px 6px;
  color: #000;
  margin-left: 5px;
  font-size: 0.9em;
}

.tag-bar {
  display: flex;
}
.tag-bar li {
  flex-grow: 1;
  list-style-type: none;
  padding: 0px 5px;
  font-weight: bold;
  font-size: 0.8em;
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
      selectedReport: null,
      lastEntries: []
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
        this.lastEntries = reply.p.slice(0, 14)
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
          this.select(data.date)
        })
      heatmap()
    },

    select (date) {
      var d = moment(date).format('YYYY-MM-DD')
      this.selectedReport = util.flattenObject(this.data[d])
    }
  }
}
</script>
