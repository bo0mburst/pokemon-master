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
    box-shadow: 0 3px 6px #888;
    position: relative;
    flex: 1 1 auto;

    &:before {
        content:'';
        display: inline-block;
        position: absolute;
        width: 40vw;
        height: 50px;
        min-width: 300px;
        max-width: 500px;
        background-color: #eee;
        transform: skew(45deg);
        border: none;
        bottom: -49px;
        right: -70px;
        box-shadow: -3px 3px 2px #888;
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

    // &:hover {
    //     height: 90vh;
    //     background-color: transparent;
    // }
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
    bottom: -45px;
    right: 25px;
    width: 28vw;
    height: 50px;
    max-width: 380px;
    min-width: 190px;
    display: flex;
    align-items: center;
    pointer-events: all;

    .search-wrapper {
      flex: 1 1 auto;
      box-shadow: -5px 5px 5px #888;
      transform: skew(45deg);
      overflow: hidden;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      .search {
        display: flex;
        padding: 2px;
        width: 85%;
        height: 35px;
        transform: skew(-45deg);

        input {
          display: block;
          width: 100%;
          padding: 5px;
          margin: 5px 10px;
          border: none;
          background-color: transparent;
          border-bottom: 1px solid #ddd;
          color: #333;
          text-transform: uppercase;
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
</style>
