import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
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
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
