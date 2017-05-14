<template>
  <div>
    <h1>Daily Overview for {{ date | date('LL') }}</h1>
    <svg ref="chart" class="timeline"></svg>
    <div class="pure-g">
      <div class="pure-u-24-24">
        <h2>Events</h2>
        <pre class="code"><code>{{ events }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style>
.timeline {
  font-size: 10px;
}

.timeline .axis path,
.timeline .axis line {
  fill: none;
  stroke: #777;
  shape-rendering: crispEdges;
}
.timeline .axis .tick {
  fill: #aaa;
}
.timeline .dot {
  opacity: 0.5;
}
</style>

<script>
import Sarif from '../sarif/service'
import util from '../util'
import d3 from 'd3'

export default {
  data () {
    return {
      date: new Date(),
      events: []
    }
  },

  mounted () {
    this.changeDate(new Date())
  },

  methods: {
    changeDate (date) {
      console.log('yes')
      this.date = date

      var dateStart = new Date(date.getTime())
      dateStart.setHours(4, 0, 0, 0)
      var dateEnd = new Date(dateStart.getTime())
      dateEnd.setHours(28)

      Sarif.client.request({
        action: 'event/list',
        p: {
          'time >': dateStart.toISOString(),
          'time <': dateEnd.toISOString()
        }
      }, (reply) => {
        this.events = reply.p.events
        this.drawTimeline(dateStart, dateEnd, this.events)
      })
    },

    drawTimeline (dateStart, dateEnd, events) {
      var aggregated = util.aggregateMessages(events)
      var data = d3.entries(aggregated)

      var margin = {top: 20, right: 20, bottom: 30, left: 200}
      var width = 960 - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom

      var x = d3.time.scale().range([0, width]).domain([dateStart, dateEnd])
      var y = d3.scale.ordinal().domain(d3.keys(aggregated)).rangePoints([height, 0], 0.5)

      var xAxis = d3.svg.axis().scale(x).orient('bottom')
      var yAxis = d3.svg.axis().scale(y).orient('left')

      var svg = d3.select(this.$refs.chart)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis)
      svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)

      svg.selectAll('.x.grid')
          .data(d3.merge([[new Date()], x.ticks()]))
        .enter().append('line')
          .attr('class', 'x grid')
          .attr('x1', function (d) { return x(d) })
          .attr('y1', 0)
          .attr('x2', function (d) { return x(d) })
          .attr('y2', height)
          .style('stroke-width', 1)
          .style('stroke', function (d, i) { return (i > 0 ? '#777' : '#7ce1ff') })

      var series = svg.selectAll('.series')
          .data(data)
        .enter().append('g')
          .attr('class', 'series')
          .attr('transform', function (d) { return 'translate(0,' + y(d.key) + ')' })

      series.selectAll('.dot')
          .data(function (d) { return d.value })
        .enter().append('circle')
          .attr('class', 'dot')
          .attr('r', 3.5)
          .attr('cx', function (d) { return x(new Date(d.time)) })
          .attr('cy', 0)
          .style('fill', '#7ce1ff')
    }
  }
}
</script>
