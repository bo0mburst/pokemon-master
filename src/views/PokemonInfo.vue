<template>
  <div class="pokemon-info">
    <loading-indicator
      class="empty"
      v-if="loading"
    ></loading-indicator>

    <div
      class="info"
      v-else-if="!loading && info"
    >
      <header>
        <h1>{{ info.name }}</h1>

        <span class="large-name" :style="`color: ${info.color}`">
          {{ info.jname.name || info.name }}
        </span>

        <ul v-if="info.data.length > 1">
          <li
            v-for="(pokemon, index) in info.data"
            :key="index"
            :class="{'active' : index === activeData}"
            @click="changeActiveData(index)"
          >
            <span v-if="pokemon.name === info.name">
              Original
            </span>

            <span v-else>
              {{ pokemon.name.replace(`${info.name}-`, '') }}
            </span>
          </li>
        </ul>
      </header>

      <div class="display-image">
        <div
          class="image-wrapper"
          v-for="({formName, image}, index) in info.data[activeData].images"
          :key="index"
        >
          <lazy-img
            :src="image"
            :aspect-ratio="1"
            :key="activeData"
          />

          <p v-if="info.data[activeData].images.length > 1">
            <span>
              {{ formName.replace(/-/g, ' ')  || info.name }}
            </span>
          </p>
        </div>
      </div>

      <div
        class="detail"
      >
        <h4>
          Dex Entry:

          <img
            src="@/assets/img/ic_sound.svg"
            @click="readDexEntry(info.description[activeEntry - 1])"
          >
        </h4>

        <p>
          {{ info.description[activeEntry - 1] }}
        </p>

        <div class="entry-nav">
          <button
            @click="changeActiveEntry(-1)"
            :disabled="activeEntry === 1"
          >
            《
          </button>

          <span>
            {{`${activeEntry} of ${info.description.length}`}}
          </span>

          <button
            @click="changeActiveEntry(1)"
            :disabled="activeEntry === info.description.length"
          >
            》
          </button>
        </div>
      </div>

      <div
        class="detail"
      >
        <h4>
          Base Stats
        </h4>

        <table>
          <tr v-for="({stat, base_stat}, index) in info.data[activeData].stats" :key="index">
            <td>
              <p>
                <span>
                  {{ stat.name }}
                </span>
              </p>
            </td>
            <td class="stat">
              {{ base_stat }}
              <p :style="`width: ${base_stat}px;`"></p>
            </td>
          </tr>
        </table>
      </div>

      <div
        class="detail"
      >
        <h4>
          About
        </h4>

        <table>
          <tr>
            <td>
              Number:
            </td>

            <td>
              {{ `#${String(info.id).padStart(3, '0')}` }}
            </td>
          </tr>

          <tr>
            <td>
              Type(s):
            </td>

            <td>
              <p>
                <span
                  v-for="({type}, index) in info.data[activeData].types"
                  :key="index"
                  :class="type.name"
                >
                  {{ type.name }}
                </span>
              </p>
            </td>
          </tr>

          <tr>
            <td>
              Category:
            </td>

            <td>
              <p>
                {{ info.genera.genus }}
              </p>
            </td>
          </tr>

          <tr>
            <td>
              Abilities:
            </td>

            <td>
              <p>
                <span>
                  {{ info.data[activeData].abilities }}
                </span>
              </p>
            </td>
          </tr>

          <tr>
            <td>
              Height:
            </td>

            <td>
              {{ info.data[activeData].height }}
            </td>
          </tr>

          <tr>
            <td>
              Weight:
            </td>

            <td>
              {{ info.data[activeData].weight }}
            </td>
          </tr>
        </table>
      </div>

      <div
        class="detail"
        v-if="info.evo.evolves_to.length"
      >
        <h4>
          Evolution
        </h4>

        <evolution-card :evo="info.evo"></evolution-card>
      </div>
    </div>

    <no-result
      class="empty"
      v-else
    ></no-result>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NoResult from '@/components/NoResult.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import EvolutionCard from '@/components/EvolutionCard.vue'

export default {
  data () {
    return {
      activeData: 0,
      activeDetail: 0,
      activeEntry: 1,
      imgLoading: false
    }
  },

  created () {
    if (!this.utter) {
      const voices = window.speechSynthesis.getVoices()
      const englishVoice = voices.filter(i => i.lang === 'en-GB')[0] || voices[0]
      this.utter = new SpeechSynthesisUtterance()
      this.utter.rate = 1
      this.utter.pitch = 1
      this.utter.voice = englishVoice
    }
  },

  deactivated () {
    window.speechSynthesis.cancel()
  },

  destroyed () {
    window.speechSynthesis.cancel()
  },

  methods: {
    readDexEntry (text) {
      window.speechSynthesis.cancel()
      this.utter.text = text
      setTimeout(window.speechSynthesis.speak(this.utter), 2000)
    },

    changeActiveData (index) {
      window.speechSynthesis.cancel()
      this.activeData = index
    },

    changeActiveDetail (index) {
      window.speechSynthesis.cancel()
      this.activeDetail = index
    },

    changeActiveEntry (val) {
      window.speechSynthesis.cancel()
      this.activeEntry = Math.min(this.info.description.length, Math.max(1, this.activeEntry + val))
    },

    error (e) {
      console.log(e)
    }
  },

  watch: {
    info () {
      this.activeData = 0
      this.activeDetail = 0
      this.activeEntry = 1
      window.speechSynthesis.cancel()
    }
  },

  computed: {
    ...mapState({
      loading: 'loading',
      info: 'pokemonInfo'
    })
  },

  components: {
    LoadingIndicator,
    NoResult,
    EvolutionCard
  }
}

</script>

<style lang="scss" scoped>
  .pokemon-info {
    height: 100%;
    overflow-y: auto;
    padding: 60px 20px;

    .info {
      padding: 20px;
      position: relative;
      background-color:#fff;
      border-radius: 10px;
      border: 5px solid #ddd;

      header {
        margin-bottom: 10px;

        .large-name {
          opacity: 0.2;
          font-size: 2rem;
          position: absolute;
          top: 50px;
          right: 30px;
          pointer-events: none;
        }
      }

      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;

        li {
          border-radius: 5px;
          margin-bottom: 5px;
          padding: 2px 5px;
          text-transform: capitalize;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 5px;
          }

          &.active {
            background-color: #bbb;
            color: #fff;
          }
        }
      }

      .display-image {
        margin: 30px auto;
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        flex-wrap: wrap;

        .image-wrapper {
          flex-basis: 100px;
          margin-bottom: 10px;

          &:only-child {
            flex: 1 1 auto;
            margin-bottom: 0;
          }

          p {
            font-size: 0.8rem;
            line-height: 1rem;
            text-align: center;
          }
        }
      }

      .detail {
        margin: 20px 0;
        user-select: text;
        overflow: hidden;

        > * {
          padding: 0 5px;
        }

        h4 {
          margin-bottom: 10px;
          background-color: #eee;
          border-radius: 5px;

          img {
            width: 0.85rem;
            margin: 0 5px;
            display: inline-block;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
              transform: scale(1.2);
            }
          }
        }

        table {
          table-layout: fixed;

          td:first-child {
            padding-right: 20px;
          }

          .stat {
            display: flex;
            align-items: center;
            color: #a1ddb6;

            p {
              display: inline-block;
              margin-left: 10px;
              background-color: #a1ddb6;
              text-align: right;
              padding: 10px;
              border-radius: 10px;
            }
          }
        }

        .entry-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 5px;
          position: relative;
          user-select: none;

          span {
            display: inline-block;
            margin: 0 10px;
          }

          button {
            border: none;
            background: none;
            transition: 0.3s;
          }
        }
      }

    }

    .empty {
      height: 100%;
      width: 100%;
      padding: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  @include for-desktop {
    .pokemon-info {
      padding: 80px 20px;

      .info {
        max-width: 100vmin;
        margin: 0 auto;
        padding: 50px;
        display: flex;
        flex-wrap: wrap;

        header {
          width: 100%;

          .large-name {
            font-size: 7rem;
            top: 150px;
            right: 50px;
          }
        }

        .detail {
          flex: 1 1 auto;
          border: 1px solid #ccc;
          padding: 0;
          margin: 10px;

          h4 {
            margin: 0;

            & + * {
              padding: 10px;
            }
          }
        }

        .display-image {
          flex: 1 1 auto;
          padding-right: 20px;
          max-width: 500px;

          .image-wrapper {
            flex-basis: 150px;
          }
        }
      }
    }
  }
</style>
