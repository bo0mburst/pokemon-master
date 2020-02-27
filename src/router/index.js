import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/pokemon-info',
    name: 'Pokemon Info',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonInfo.vue')
  },

  {
    path: '/pokemon-list',
    name: 'Pokemon List',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
