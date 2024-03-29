<template>
  <div class="pokemon-list">
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
          <span>
            {{ item.name }}
          </span>
        </p>
      </li>
    </ul>

    <div class="loading-wrapper" v-show="loading">
      <loading-indicator></loading-indicator>
    </div>

    <div class="loading-wrapper" v-show="!loading && pokeList">
      <button @click="getPokemonList">Load more</button>
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
    async getPokemonList () {
      await this.$store.dispatch('getPokemonList')
    },

    async viewPokemon (name) {
      this.$router.push({ name: 'pokemon-info', params: { pokemon: name } })
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
      background-color: #33333390;
      color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 5px 20px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.5s;

      .display-image {
        min-width: 60px;
        margin-right: 15px;
        transition: 1s;
      }

      p {
        margin-right: 15px;
        pointer-events: none;
      }
    }
  }

  .loading-wrapper {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;

    button {
      color: #333;
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 1.5rem;
      box-shadow: 0 2px 4px #333;
      transition: background .3s;

      &:hover {
        background-color: #33333390;
        color: #fff;
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

        &:hover {
          background-color: #fff;
          color: #777;

          .display-image {
            transform: scale(1.2) translateY(-10px);
          }
        }

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
      margin: 50px 0;

      img {
        width: 50px;
      }
    }
  }
}
</style>
