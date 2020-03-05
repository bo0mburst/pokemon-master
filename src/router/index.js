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
    path: '/pokemon-info/:pokemon',
    name: 'pokemon-info',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonInfo.vue'),
    props: true
  },

  {
    path: '/pokemon-list',
    name: 'pokemon-list',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonList.vue')
  },

  {
    path: '/pokemon-team',
    name: 'pokemon-team',
    component: () => import(/* webpackChunkName: "about" */ '../views/PokemonList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
