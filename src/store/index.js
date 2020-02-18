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
    loading: true,
    activeDataIndex: 0
  },

  mutations: {
    setPokemonInfo: (state, payload) => {
      state.pokemonInfo = payload
    },

    setLoading: (state, payload) => {
      state.loading = payload
    },

    setActiveDataIndex: (state, payload) => {
      state.activeDataIndex = payload
    }
  },

  actions: {
    /* eslint-disable camelcase */
    getPokemon: async ({ commit }, payload) => {
      commit('setLoading', true)
      commit('setActiveDataIndex', 0)

      let pokemon = null
      const res = await api.get(`/pokemon-species/${payload}`)

      if (res.status === 200) {
        pokemon = {}
        const { id, name, genera, flavor_text_entries, color, varieties } = res.data

        pokemon.id = id
        pokemon.name = name
        pokemon.genera = genera.filter(i => i.language.name === 'en')
        pokemon.description = flavor_text_entries.filter(i => i.language.name === 'en')
        pokemon.color = color.name
        pokemon.varieties = varieties
        pokemon.data = []
        pokemon.varieties.forEach(async i => {
          const res = await api.get(`/pokemon/${i.pokemon.name}`)
          if (res.status === 200) {
            const { name, height, weight, types, abilities, stats } = res.data
            let image = pokemon.id + (name.replace(pokemon.name, ''))
            image = `${imageSource}/${image}.png`
            pokemon.data.push({ name, height, weight, types, abilities, stats, image })
          }
        })
      }

      commit('setPokemonInfo', pokemon)
      commit('setLoading', false)
    },

    setActiveDataIndex: ({ commit }, payload) => {
      commit('setActiveDataIndex', payload)
    }
  }
})
