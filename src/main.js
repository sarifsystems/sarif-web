import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import App from './App'
import Sarif from './sarif/service'
import Connect from './components/Connect'
import Overview from './components/Overview'
import Chat from './components/Chat'
import Daily from './components/Daily'
import Cards from './components/Cards'
import Debug from './components/Debug'

import './assets/css/dark.theme.css'

Vue.use(VueRouter)
Vue.config.productionTip = false

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

Vue.filter('date', function (value, format) {
  if (value) {
    return moment(value).format(format || 'l')
  }
})

Vue.filter('time', function (value, format) {
  if (value) {
    return moment(String(value)).format(format || 'llll')
  }
})

var router = new VueRouter({
  routes: [
    { path: '/connect/:host*', component: Connect },
    { path: '/overview', component: Overview },
    { path: '/chat', component: Chat },
    { path: '/daily', component: Daily },
    { path: '/cards', component: Cards },
    { path: '/debug', component: Debug },
    { path: '*', redirect: '/overview' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/connect') || Sarif.isConnected()) {
    next()
  } else {
    next('/connect')
  }
})

var app = new Vue({
  el: '#app-container',
  router,
  render: h => h(App)
})
app.eslint_no_new = true
