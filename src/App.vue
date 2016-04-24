<template>
  <nav id="nav" class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a v-link="{ path: '/home' }" class="pure-menu-link">Home</a></li>
      <li class="pure-menu-item"><a v-link="{ path: '/daily' }" class="pure-menu-link">Daily</a></li>
      <li class="pure-menu-item"><a v-link="{ path: '/cards' }" class="pure-menu-link">Cards</a></li>
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
  background: #eceef2;
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

.cards {
  display: flex;
}

.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 7px 15px 0 rgba(0, 0, 50, 0.1), 0 0 0 1px rgba(0, 0, 50, 0.05);
  margin: 10px;
  min-width: 360px;
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

.fade-transition {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave {
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
      this.$router.go({ path: '/debug' })
    }
  }
}
</script>
