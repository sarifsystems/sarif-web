<template>
  <h1>Daily Overview for {{ date }}</h1>
  <div class="pure-g">
    <div class="pure-u-24-24">
      <h2>Events</h2>
      <input type="text" v-model="eventFilter" placeholder="Filter events ..." />
      <ul>
        <li v-for="e in events | filterBy eventFilter | orderBy 'time' -1">
          [ {{ e.time }} ]
          <span class="danger">{{ e.action }}</span>
          {{ e.text }}
          <a class="debug inspect" v-on:click="$dispatch('inspect', e)"><i class="fa fa-gear"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Stark from '../stark/service'

export default {
  data () {
    return {
      date: new Date(),
      events: []
    }
  },

  ready () {
    this.changeDate(new Date())
  },

  methods: {
    changeDate (date) {
      this.date = date

      var dateStart = new Date(date.getTime())
      dateStart.setHours(4, 0, 0, 0)
      var dateEnd = new Date(dateStart.getTime())
      dateEnd.setHours(28)

      Stark.request({
        action: 'event/list',
        p: {
          after: dateStart.toISOString(),
          before: dateEnd.toISOString()
        }
      }, (reply) => {
        this.events = reply.p.events
      })
    }
  }
}
