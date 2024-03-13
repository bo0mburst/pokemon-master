<template>
  <div id="app">
    <nav-overlay>
      <main>
        <transition name="fade">
          <keep-alive>
            <router-view class="view"/>
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
  height: 100vh;
  height: 100dvh;
}

main {
  height: 100vh;
  height: 100dvh;
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

@include for-desktop {
  .view {
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track { // track
      background : transparent;
    }

    &::-webkit-scrollbar-thumb { // thumb
      background : #333;
      border-radius: 10px;
    }

    // firefox
    scrollbar-color: #3333 transparent;
    scrollbar-width: thin;
  }
}
</style>
