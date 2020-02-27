import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyImageLoading from 'vue-lazy-image-loading'
require('@/assets/styles/index.scss')

Vue.use(VueLazyImageLoading, {
  placeholder: require('@/assets/img/pokeball_outline.svg'),
  fallback: require('@/assets/img/pokeball_outline.svg'),
  blur: 0
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
