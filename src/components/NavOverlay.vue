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
    <div class="screen"></div>
    <nav>
      <div class="trapezoid">
        <div class="control-wrapper">
          <ul class="control">
            <li>
              <router-link
                :to="{ name: 'Home' }"
                class="router-link "
              >
                Home
              </router-link>
            </li>

            <li>
              <router-link
                :to="{ name: 'pokemon-list' }"
                class="router-link "
              >
                List
              </router-link>
            </li>

            <li>
              <router-link
                :to="{ name: 'pokemon-team' }"
                class="router-link "
              >
                Team
              </router-link>
            </li>
          </ul>
        </div>
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

  methods: {
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
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: transparent;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;

  nav {
    background-color: #f85353;
    box-shadow: 0 1px 2px #333;
    position: relative;
    flex: 1 1 auto;

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
          color: #fff;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          padding: 5px 10px;
          border: none;
          border-radius: 10px;
          margin: 0 5px;
          width: 60px;
          transition: 0.3s;

          &:hover, &.router-link-exact-active {
            background-color: #fff;
            color: #f85353;
          }
        }
      }
    }

    &:last-child, &:last-child .control {
      transform: scale(-1);
    }
  }

  .screen {
    width: 100vw;
    height: 98vh;
    position: relative;
    transition: 0.5s;
    z-index: -1;
  }
}

@include for-desktop {
  .nav-overlay {
    nav {
      .trapezoid {
        max-width: 500px;

        .control-wrapper {
          .router-link  {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
