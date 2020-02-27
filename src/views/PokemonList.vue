<template>
  <div class="pokemon-list" @scroll="handleScroll($event)">
    <ul v-if="pokeList">
      <li
        v-for="(item, index) in pokeList"
        :key="item.name"
        @click="viewPokemon(item.name)"
      >
        <div class="display-image">
          <lazy-img
            :src="item.image"
            :aspect-ratio="1"
          />
        </div>
        <p>
          {{ `#${String(index + 1).padStart(3, '0')}` }}
        </p>

        <p>
          {{ item.name }}
        </p>
      </li>
    </ul>
    <div class="loading-wrapper" v-show="loading">
      <loading-indicator></loading-indicator>
    </div>
    <div class="loading-wrapper" v-show="!loading">
      <img src="@/assets/img/ic_down.svg">
      <p>Load more</p>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  async mounted () {
    this.getPokemonList()
  },

  methods: {
    handleScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (this.loading) return

      if (scrollTop + clientHeight >= scrollHeight) {
        this.getPokemonList()
      }
    },

    async getPokemonList () {
      await this.$store.dispatch('getPokemonList')
    },

    async viewPokemon (name) {
      if (this.$route.name !== 'Pokemon Info') this.$router.push({ name: 'Pokemon Info' })
      await this.$store.dispatch('getPokemon', name)
    }
  },

  computed: {
    pokeList () {
      return this.$store.state.pokemonList
    },

    loading () {
      return this.$store.state.loading
    }
  },

  components: {
    LoadingIndicator
  }
}
</script>

<style lang="scss" scoped>
.pokemon-list {
  height: 100%;
  padding: 80px 0;
  background-image: linear-gradient(to bottom right, #6d459b, #2aace0, #55a878);
  overflow-y: auto;

  ul {
    max-width: 80vw;
    min-width: 320px;
    margin: 0 auto;
    padding: 0 10px;

    li {
      margin: 10px 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 5px 20px;
      font-size: 1.2rem;

      .display-image {
        cursor: pointer;
        min-width: 60px;
        margin-right: 15px;
      }

      p {
        margin-right: 15px;
      }
    }
  }

  .loading-wrapper {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    p {
      color: #fff;
    }

    img {
      width: 30px;
      animation: up-down 1s infinite;

      @keyframes up-down {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(10px);
        }

        100% {
          transform: translateY(0px);
        }
      }
    }
  }
}

@include for-desktop {
  .pokemon-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      min-width: 720px;
      padding: 0;
      margin: 0 auto;

      li {
        flex-basis: 15%;
        width: 15%;
        padding: 10px;
        margin: .8%;
        flex-direction: column;
        justify-content: center;
        font-size: 0.9rem;

        .display-image {
          width: 100%;
          margin-right: 0;
          margin-bottom: 10px;
        }

        p {
          margin: 0;
        }
      }
    }

    .loading-wrapper {
      img {
        width: 50px;
      }
    }
  }
}
</style>
