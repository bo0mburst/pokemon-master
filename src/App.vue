<template>
  <div id="app">
    <nav-overlay></nav-overlay>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavOverlay from '@/components/NavOverlay.vue'

export default {
  components: {
    NavOverlay
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  position: relative;
}

main {
  height: 100vh;
}

</style>
