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
    name: 'pokemon-info',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonInfo.vue')
  },

  {
    path: '/pokemon-list',
    name: 'pokemon-list',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
