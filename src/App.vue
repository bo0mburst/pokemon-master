<template>
  <div id="app">
    <nav-overlay>
      <main>
        <transition name="fade">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </main>
    </nav-overlay>
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
  background-size: 200% 200%;
  background-image: linear-gradient(to bottom right, #333, #6d459b, #2aace0, #55a878, #333);
  animation: move 15s infinite linear forwards;

  @keyframes move {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 100% 100%;
    }

    100% {
      background-position: 0 0;
    }
  }
}

</style>
