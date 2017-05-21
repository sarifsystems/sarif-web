<template>
  <div class="pure-g">
    <div class="pure-u-16-24">
      <h2>Top Tasks for {{ date | date('ll') }}</h2>
      Progressbar
    </div>
    <div class="pure-u-8-24">
      <h2 class="text-primary">{{ habits.balance }} Points</h2>
      Today: <span class="text-secondary">{{ habits.today }} / {{ habits.goal }}</span><br>
      Chain: <span class="text-secondary">{{ habits.chain }} days</span>
    </div>

    <div class="pure-u-24-24">
      <h2>Goals</h2>

      <div class="pure-g">
        <div class="pure-u-12-24">
          <h3>MAY 2017</h3>

          <editable-list :entries="goals.monthly" @save="v => onSave('monthly', v)" />
        </div>

        <div class="pure-u-12-24">
          <h3>2017</h3>

          <editable-list :entries="goals.yearly" @save="v => onSave('yearly', v)" />
        </div>
      </div>
    </div>

    <div class="pure-u-24-24">
      <h2>Ongoing Projects</h2>
    </div>

    <div class="pure-u-24-24">
      <h2>Habits</h2>
    </div>

    <div class="pure-u-12-24">
      <h2>Reading</h2>
    </div>

    <div class="pure-u-12-24">
      <h2>Daily Journal</h2>
    </div>
  </div>
</template>

<style>
</style>

<script>
import moment from 'moment'

import Sarif from '../sarif/service'
import EditableList from '../elements/EditableList'

var refresh

export default {
  data () {
    return {
      date: moment(),
      goals: {
        monthly: [],
        yearly: []
      },
      habits: {
        chain: 0,
        balance: 0,
        today: 0,
        goal: 0
      }
    }
  },

  mounted () {
    this.load('monthly')
    this.load('yearly')
  },

  activated () {
    this.loadHabits()
    if (refresh) {
      return
    }

    refresh = window.setInterval(() => {
      this.loadHabits()
    }, 5 * 60 * 1000)
  },

  deactivated () {
    window.clearInterval(refresh)
    refresh = null
  },

  methods: {
    load (span) {
      Sarif.client.request({
        action: 'store/get/goals/' + this.spanToDate(span)
      }, (reply) => {
        if (reply.p && reply.p.goals) {
          this.goals[span] = reply.p.goals.map(text => { return { text: text } })
        }
      })
    },

    loadHabits () {
      Sarif.client.request({
        action: 'habits/overview'
      }, (reply) => {
        this.habits = reply.p
      })
    },

    onSave (span, goals) {
      Sarif.client.request({
        action: 'store/put/goals/' + this.spanToDate(span),
        p: {
          goals: goals.map(g => g.text)
        }
      }, () => {
        this.goals[span] = goals
      })
    },

    spanToDate (span) {
      if (span === 'monthly') {
        return this.date.format('YYYY-MM')
      } else if (span === 'yearly') {
        return this.date.format('YYYY')
      }
    }
  },

  components: {
    EditableList: EditableList
  }
}
</script>
