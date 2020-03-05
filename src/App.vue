<template>
  <div id="app">
    <nav-overlay></nav-overlay>
    <main>
      <transition name="fade">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;
}

main {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #6d459b, #2aace0, #55a878);
}

</style>
