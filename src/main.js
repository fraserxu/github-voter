import Vue from 'vue'
import Router from 'vue-router'
import VueAsyncData from 'vue-async-data'

import { domain, fromNow } from './filters'
import App from './components/App.vue'
import EventsView from './components/EventsView.vue'
import OauthView from './components/OauthView.vue'
import NotFoundView from './components/NotFoundView.vue'
import OauthError from './components/OauthError.vue'

// install router
Vue.use(Router)
Vue.use(VueAsyncData)

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
let router = new Router({
  hashbang: false
})

router.map({
  '/events': {
    component: EventsView
  },
  '/oauth': {
    component: OauthView
  },
  '/401': {
    component: OauthError
  },
  '/404': {
    component: NotFoundView
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/events'
})

router.start(App, '#app')
