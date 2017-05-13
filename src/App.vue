<template>
  <div id="app-container">
    <nav id="nav" class="pure-menu pure-menu-horizontal">
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
  color: #777;
  /* background: #EDDDCD; */
  background: #fff;
  /* background: linear-gradient(135deg, rgba(237,237,237,1) 0%, rgba(224,198,172,1) 100%); */
  /* background: linear-gradient(to bottom, #7E97A1 0%, #696F6A 100%); */
  /* background: linear-gradient(to right, rgba(244,225,205,1) 0%, rgba(225,235,224,1) 100%); */
}

h1, h2 {
  color: #000;
}

#app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin: 0 100px;
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

a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.pure-menu a:hover {
  text-decoration: none;
}

a {
  color: #42b983;
}

.pure-button-primary {
  background-color: #dd6267;
}

.danger {
  color: #dd6267;
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
  background: #fefefd;
  border: none;
  border-radius: 5px;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 50, 0.1), 0 0 0 1px rgba(0, 0, 50, 0.05);
  margin: 10px;
  width: 360px;
  transition: width 0.2s, height 0.2s, opacity 0.2s;
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

.card .card-row + .card-row {
  border-top: 1px solid #ddd;
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
.pure-menu-children {
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  font-size: 14px;
}

.code {
  font-family: monospace;
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
  events: {
    inspect (msg) {
      Store.setInspected(msg)
      this.$router.push({ path: '/debug' })
    }
  }
}
</script>
