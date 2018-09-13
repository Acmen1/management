// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import iView from 'iview'
import http from '@/libs/axios'
import 'iview/dist/styles/iview.css'
import './assets/css/reset.css'
import axios from 'axios'

Vue.use(iView)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    login: ''
  },
  mutations: {
    UserLogin (state, login) {
      state.login = login
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
