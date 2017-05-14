<template>
  <div id="app-container">
    <nav v-if="state.connected" id="nav" class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><router-link to="/overview"
            class="pure-menu-link">Overview</router-link></li>
        <li class="pure-menu-item"><router-link to="/chat"
            class="pure-menu-link">Chat</router-link></li>
        <li class="pure-menu-item"><router-link to="/daily" class="pure-menu-link">Daily</router-link></li>
        <li class="pure-menu-item"><router-link to="/cards" class="pure-menu-link">Cards</router-link></li>
      </ul>
    </nav>

    <div id="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 15vw;
}

#nav {
	width: 100%;
  margin-bottom: 50px;
}

#nav .pure-menu-link {
  padding: 20px 20px;
}

#app {
  flex: 1;
  width: 100%;
}

.debug.inspect {
  color: #ccc;
  display: none;
  cursor: pointer;
}
*:hover > .debug.inspect {
  display: inline;
}

.cards {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 360px;
}

.cards .card.expanded {
  min-width: 45%;
  flex-grow: 1;
  min-height: 600px;
}

.card .card-row-expand {
  min-height: 200px;
  flex-grow: 1;
}

.card .tile {
  padding: 15px;
}

.card .tile.fullsize {
  padding-left: 0px;
  padding-right: 0px;
}

.pure-menu-list.menu-flex {
  display: inline-flex;
  width: 100%;
}
.menu-expand {
  flex-grow: 1;
}
.menu-small {
  font-size: 12px;
}

.pure-table .table-collapse {
  border-bottom: 0;
}

.prop-object {
  width: 100%;
}

.prop-object th {
  white-space: nowrap;
  text-align: left;
}
.prop-object td {
  width: 100%;
}

.prop-object .prop-item-complex {
  padding-left: 40px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.card textarea.fullsize {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  white-space: pre;
  overflow: auto;
  border: 0;
  padding: 15px;
}

</style>

<script>
import Store from './store'

export default {
  data () {
    return {
      state: Store.state
    }
  },

  events: {
    inspect (msg) {
      Store.setInspected(msg)
      this.$router.push({ path: '/debug' })
    }
  }
}
</script>
