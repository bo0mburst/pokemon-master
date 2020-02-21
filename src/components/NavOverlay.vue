<template>
  <div class="nav-overlay">
    <nav>
      <div class="controls">
        <div class="search-wrapper">
          <div class="search">
            <input
              type="text"
              placeholder="..."
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
      <ul class="controls">
        <li>
          <button>
            <img
              src="@/assets/img/ic_bulbasaur.svg"
              title="pokedex"
              class="icon"
            >
          </button>
        </li>

        <li>
          <button>
            <img
              src="@/assets/img/ic_charmander.svg"
              title="Team Draft"
              class="icon"
            >
          </button>
        </li>

        <li>
          <button>
            <img
              src="@/assets/img/ic_squirtle.svg"
              title="play"
              class="icon"
            >
          </button>
        </li>
      </ul>
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
      if (this.$route.name !== 'Pokemon Info') this.$router.push({ name: 'Pokemon Info' })

      await this.$store.dispatch('getPokemon', this.searchKey)
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
    background-color: #eee;
    box-shadow: 0 3px 6px #bbb;
    position: relative;
    flex: 1 1 auto;

    &:before {
        content:'';
        display: inline-block;
        position: absolute;
        height: 50px;
        width: 100%;
        background-color: #eee;
        border: none;
        box-shadow: -3px 3px 2px #bbb;
    }

    &:last-child {
        transform: scale(-1);
    }
  }

  .screen {
    width: 100vw;
    position: relative;
    transition: 0.5s;
    z-index: -1;
    height: 98vh;
  }

  button {
    border: none;
    background: none;
    border-radius: 50%;
    transition: 0.3s;

    .icon {
      border-radius: 50%;
      width: 30px;
      box-shadow: 0 5px 10px #888;
      transition: 0.3s;
    }

    &:hover {
      .icon {
        box-shadow: 0 5px 3px #aaa;
      }
    }
  }

  .controls {
    position: absolute;
    height: 50px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    pointer-events: all;

    .search-wrapper {
      flex: 1 1 auto;
      box-shadow: inset -1px 1px 2px #aaa;
      transform: skew(45deg);
      background-color: #fff;
      display: flex;
      padding: 2px 20px;

      .search {
        flex: 1 1 auto;
        display: flex;
        // padding: 2px;
        transform: skew(-45deg);

        input {
          display: block;
          width: 100%;
          margin: 5px;
          text-transform: uppercase;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }

  ul.controls {
    transform: scale(-1);
    list-style: none;
    display: flex;
    justify-content: space-evenly;

    li {
      button {
        margin: 0 10px;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}

@include for-desktop {
  nav {
    &:before {
      width: 40vw;
      height: 50px;
      min-width: 300px;
      max-width: 500px;
      transform: skew(45deg);
      bottom: -49px;
      right: -70px;
    }

    &:last-child {
      transform: scale(-1);
    }
  }

  .controls {
    bottom: -45px;
    right: 0;
    max-width: 430px;
    min-width: 190px;
  }
}
</style>
