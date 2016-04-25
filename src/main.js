import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Stark from './stark/service'
import Connect from './components/Connect'
import Home from './components/Chat'
import Daily from './components/Daily'
import Cards from './components/Cards'
import Debug from './components/Debug'

Vue.use(VueRouter)

Vue.filter('jsonFormat', function (v) {
  return JSON.stringify(v, null, 2)
})

Vue.filter('prettyName', function (v) {
  if (!v) {
    return ''
  }
  return v.replace(/^([a-z])|_([a-z])/g, (g, p1, p2) => {
    if (p1) {
      return p1.toUpperCase()
    }
    return ' ' + p2.toUpperCase()
  })
})

Vue.filter('prettyText', function (v) {
  if (!v) {
    return ''
  }
  var nl = v.indexOf('\n')
  if (nl >= 0) {
    v = v.substring(0, nl) + ' [...]'
  }
  return v
})

Vue.filter('prettyObject', function (v) {
  if (!v) {
    return ''
  }
  if (v.text) {
    if (v.text.length > 30) {
      return '{ "' + v.text.substring(0, 26) + ' ..." }'
    }
    return '{ "' + v.text + '" }'
  }

  var keys = Object.keys(v)
  if (keys.length > 5) {
    return '{ ' + keys.slice(0, 5).join(', ') + ', [...] }'
  }
  return '{ ' + keys.join(', ') + ' }'
})

export var router = new VueRouter()
router.map({
  '/connect': {
    component: Connect,
    noAuth: true
  },
  '/home': {
    component: Home
  },
  '/daily': {
    component: Daily
  },
  '/cards': {
    component: Cards
  },
  '/debug': {
    component: Debug
  }
})

router.redirect({
  '*': '/home'
})

router.beforeEach((transition) => {
  if (transition.to.noAuth || Stark.isConnected()) {
    transition.next()
  } else {
    transition.redirect('/connect')
  }
})

router.start(App, '#app')
