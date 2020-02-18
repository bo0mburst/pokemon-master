<template>
  <div class="home">
    <ul>
      <li
        v-for="(bg, index) in background"
        :key="index"
        :class="{'active' : index === currentIndex}"
        :style="`background-image: url(${bg});`"
      >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      timer: null,
      currentIndex: 0,
      background: [
        'https://images.alphacoders.com/984/984501.jpg',
        'https://images7.alphacoders.com/592/592678.jpg',
        'https://images6.alphacoders.com/662/662180.png',
        'https://images6.alphacoders.com/613/613924.jpg',
        'https://images7.alphacoders.com/648/648581.jpg',
        'https://images4.alphacoders.com/661/661582.png'
      ]
    }
  },

  mounted () {
    this.startSlide()
  },

  activated () {
    this.startSlide()
  },

  deactivated () {
    this.stopSlide()
  },

  destroyed () {
    this.stopSlide()
  },

  methods: {
    startSlide () {
      this.timer = setInterval(this.next, 5000)
    },

    stopSlide () {
      clearInterval(this.timer)
      this.currentIndex = 0
    },

    next () {
      const index = (this.background.length - 1) === this.currentIndex ? 0 : this.currentIndex + 1
      this.currentIndex = index
    }
  }

}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;

  ul {
    width: 100vw;
    list-style: none;
    height: 100%;
    position: relative;

    li {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      transition: opacity 0.5s;

      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
