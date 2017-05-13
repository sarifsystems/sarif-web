<template>
  <div>
    <h1>Debug</h1>
    <div class="pure-g">
      <div class="pure-u-24-24" v-if="state.inspected">
        <h2>Inspect message</h2>
        <pre class="code"><code>{{ state.inspected }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../store'

export default {
  data () {
    return {
      state: Store.state
    }
  }
}
</script>
