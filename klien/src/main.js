import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Register from './components/Register.vue'
import HighChart from './components/HighChart.vue'
import PageNotFound from './components/PageNotFound.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Register },
  { path: '/hello', component: HelloWorld },
  { path: '/highchart', component: HighChart },
  { path: "*", component: PageNotFound }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
