<template>
  <nav id="nav" class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a v-link="{ path: '/home' }" class="pure-menu-link">Home</a></li>
      <li class="pure-menu-item"><a v-link="{ path: '/daily' }" class="pure-menu-link">Daily</a></li>
    </ul>
  </nav>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #777;
  margin: 0 100px;
}

h1, h2 {
  color: #000;
}

#nav {
  width: auto;
  margin-bottom: 50px;
}

#app {
  flex: 1;
  width: 100%;
}

html, button, input, select, textarea,
.pure-g [class *= "pure-u"] {
    font-family: Helvetica, sans-serif;
}

.danger {
  color: #f81642;
}

.debug.inspect {
  color: #ccc;
  display: none;
  cursor: pointer;
}
*:hover > .debug.inspect {
  display: inline;
}
</style>

<script>
import Store from './store'

export default {
  events: {
    inspect (msg) {
      Store.setInspected(msg)
      this.$router.go({ path: '/debug' })
    }
  }
}
</script>
