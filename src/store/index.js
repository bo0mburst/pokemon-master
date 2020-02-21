import Vue from 'vue'
import Vuex from 'vuex'
import { setup } from 'axios-cache-adapter'

const api = setup({
  baseURL: 'https://pokeapi.co/api/v2',
  cache: {
    maxAge: 15 * 60 * 1000
  }
})

const imageSource = 'https://pokeres.bastionbot.org/images/pokemon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemonInfo: null,
    loading: true
  },

  mutations: {
    setPokemonInfo: (state, payload) => {
      state.pokemonInfo = payload
    },

    setLoading: (state, payload) => {
      state.loading = payload
    }
  },

  actions: {
    /* eslint-disable camelcase */
    getPokemon: async ({ commit }, payload) => {
      commit('setLoading', true)
      let pokemon = null

      try {
        const res = await api.get(`/pokemon-species/${payload}`)

        if (res.status === 200) {
          pokemon = {}
          const { id, name, names, genera, flavor_text_entries, color, varieties } = res.data

          pokemon.id = id
          pokemon.name = name
          pokemon.jname = names.filter(i => i.language.name === 'ja')[0] || pokemon.name
          pokemon.genera = genera.filter(i => i.language.name === 'en')
          pokemon.description = flavor_text_entries
            .filter(i => i.language.name === 'en')
            .map(i => i.flavor_text.replace(/[^\x20-\x7E]/g, ' '))
            .filter((value, index, self) => {
              return self.indexOf(value) === index
            })

          pokemon.color = color.name
          pokemon.varieties = varieties
          pokemon.data = []
          pokemon.defaultImage = `${imageSource}/${pokemon.id}.png`

          for (const variety of pokemon.varieties) {
            const res = await api.get(`/pokemon/${variety.pokemon.name}`)
            if (res.status === 200) {
              let { name, height, weight, types, abilities, stats } = res.data
              let image = pokemon.id + (name.replace(pokemon.name, ''))
              image = `${imageSource}/${image}.png`
              weight = `${(Number(weight) / 10).toFixed(2)} kg`
              height = `${(Number(height) * 10).toFixed(2)} cm`
              stats.reverse()
              pokemon.data.push({ name, height, weight, types, abilities, stats, image })
            }
          }
        }
      } catch {
        console.error('Pokemon Not Found.')
      }

      commit('setPokemonInfo', pokemon)
      commit('setLoading', false)
    }
  }
})
