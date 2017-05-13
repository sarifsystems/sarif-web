<template>
  <div class="pure-g">
    <div class="pure-u-24-24">
      <h2>Top Tasks for {{ date | date('ll') }}</h2>
      Progressbar
    </div>

    <div class="pure-u-24-24">
      <h2>Goals</h2>

      <div class="pure-g">
        <div class="pure-u-12-24">
          <h3>MAY 2017</h3>

          <editable-list :entries="goals.monthly" />
        </div>

        <div class="pure-u-12-24">
          <h3>2017</h3>

          <editable-list :entries="goals.yearly" />
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
import Sarif from '../sarif/service'
import EditableList from '../elements/EditableList'

export default {
  data () {
    return {
      date: new Date(),
      goals: {
        monthly: [],
        yearly: []
      }
    }
  },

  mounted () {
    Sarif.client.request({
      action: 'store/get/goals/2017-05'
    }, (reply) => {
      if (reply.p && reply.p.goals) {
        this.goals.monthly = reply.p.goals.map(text => { return { text: text } })
      }
    })

    Sarif.client.request({
      action: 'store/get/goals/2017'
    }, (reply) => {
      if (reply.p && reply.p.goals) {
        this.goals.yearly = reply.p.goals.map(text => { return { text: text } })
      }
    })
  },

  methods: {
  },

  components: {
    EditableList: EditableList
  }
}
</script>
