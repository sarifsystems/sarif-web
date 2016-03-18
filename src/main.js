import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Chat'
import Daily from './components/Daily'
import Debug from './components/Debug'

Vue.use(VueRouter)

Vue.filter('jsonFormat', function (v) {
  return JSON.stringify(v, null, 2)
})

export var router = new VueRouter()
router.map({
  '/home': {
    component: Home
  },
  '/daily': {
    component: Daily
  },
  '/debug': {
    component: Debug
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
