<template>
  <div class="nav-overlay">
    <nav>
      <div class="trapezoid">
        <div class="control-wrapper">
          <div class="control search">
            <input
              type="text"
              placeholder="name or number"
              spellcheck="false"
              v-model="searchKey"
              @keyup.enter="searchPokemon"
            >
            <button @click="searchPokemon">
              <img
                src="@/assets/img/ic_pokeball.svg"
                class="icon"
                title="search"
              >
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="screen">
      <slot></slot>
    </div>
    <nav>
      <div class="trapezoid">
        <div class="control-wrapper">
          <div class="control">
            <router-link
              :to="{ name: 'home' }"
              class="router-link"
            >
              HOME
            </router-link>

            <router-link
              :to="{ name: 'pokemon-list' }"
              class="router-link"
            >
              <img src="@/assets/img/ic_dex.svg">
            </router-link>

            <a class="router-link" target="blank" href="https://github.com/billysillano/pokemon-master">
              ABOUT
            </a>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="$route.name === 'pokemon-info'">
        <button @click="prevPokemon()" :disabled="loading || prev < 1">
          Prev
        </button>

        <button @click="nextPokemon()" :disabled="loading || next > 807">
          Next
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchKey: ''
    }
  },

  computed: {
    loading () {
      return this.$store.state.loading
    },

    info () {
      return this.$store.state.pokemonInfo
    },

    next () {
      return this.info ? this.info.id + 1 : 1
    },

    prev () {
      return this.info ? this.info.id - 1 : 1
    }
  },

  methods: {
    nextPokemon () {
      if (this.next > 807) return
      this.$router.push({ name: 'pokemon-info', params: { pokemon: this.next } })
    },

    prevPokemon () {
      if (this.prev < 1) return
      this.$router.push({ name: 'pokemon-info', params: { pokemon: this.prev } })
    },

    async searchPokemon () {
      if (!this.searchKey) return
      this.$router.push({ name: 'pokemon-info', params: { pokemon: this.searchKey } })
      this.searchKey = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-overlay {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;

  nav {
    background-color: #f85353;
    box-shadow: 0 1px 2px #333;
    position: relative;
    flex: 1 1 auto;
    z-index: 999;

    .pagination {
      position: absolute;
      width: 100%;
      top: 100%;
      z-index: -1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background-color: #333;
        padding: 2px 20px;
        border: none;
        color: #fff;
        width: 50%;
        text-align: left;
        cursor: pointer;
        line-height: 2.5rem;

        &:last-child {
          text-align: right;
        }
      }
    }

    .trapezoid {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .trapezoid {
      height: 0;
      width: 90%;
      border-style: solid;
      border-width: 50px;
      border-color: #f85353 transparent transparent transparent;
      pointer-events: none;

      .control-wrapper {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        pointer-events: all;
        box-shadow: 0px 5px 3px -3px #333;

        .control {
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
        }

        .search {
          flex: 1 1 auto;
          border-radius: 20px;
          background-color: #fff;
          overflow: hidden;
          padding: 1px 3px;
          border: 3px solid #333;

          input, button {
            border: 0;
            background-color: #fff;
          }

          input {
            width: 100%;
            flex: 1 1 auto;
            padding: 0 10px;
            text-transform: uppercase;
            text-align: center;
          }

          .icon {
            width: 25px;
          }
        }

        .router-link {
          display: inline-block;
          border: none;
          background-color: #f85353;
          display: flex;
          align-items: center;
          justify-self: center;
          // text-decoration: none;
          // border: none;
          // color: #fff;
          // text-align: center;
          // font-weight: 600;
          // padding: 5px 10px;
          // border-radius: 10px;
          // width: 60px;
          // margin: 0 5px;
          // transition: 0.3s;

          // &:hover, &.router-link-exact-active {
          //   background-color: #fff;
          //   color: #f85353;
          // }
        }

        img {
          width: 40px;
          transition: 0.3s;

          &:hover {
            transform: rotateZ(45deg);
          }
        }

        a {
          text-decoration: none;
          color: #333;
          font-weight: 600;
          margin: 0 5px;
          transition: 0.3s;

          &:hover {
            color: #fff;
          }
        }
      }
    }

    &:last-child, &:last-child .control, .pagination {
      transform: scale(-1);
    }

    &:last-child {
      .trapezoid {
        width: 250px;
      }
    }
  }

  .screen {
    width: 100vw;
    height: 98vh;
    position: relative;
  }
}

@include for-desktop {
  .nav-overlay {
    nav {
      .pagination {
        justify-content: center;

        button {
          max-width: 250px;
          position: relative;
          line-height: 2rem;
          padding-left: 50px;

          &:last-child {
            padding-right: 50px;
          }

          &:before {
            content: '';
            display: inline-block;
            position: absolute;
            background-color: #333;
            width: 100px;
            height: 100%;
            z-index: -1;
          }

          &:first-child:before {
            top: 0;
            left: -20px;
            transform: skew(-45deg);
          }

          &:last-child:before {
            top: 0;
            right: -20px;
            transform: skew(45deg);
          }
        }
      }

      .trapezoid {
        max-width: 500px;
      }

      &:last-child {
        .trapezoid {
          width: 300px;
        }
      }
    }
  }
}
</style>
