<template>
  <div
    class="pokemon-info"
  >
    <div
      class="container flex-center"
      v-if="!loading && info"
    >
      <div
        class="info-wrapper"
        v-for="(data, index) in info.data"
        :key="index"
        v-show="index === activeData"
      >

        <p class="large-name" :style="`color: ${info.color}`">
          {{ info.jname.name || info.name }}
        </p>

        <h1>
          {{ info.name }}
        </h1>

        <div class="info flex-center">

          <div class="display-image-wrapper">
            <lazy-img
              class="display-image"
              :src="data.image"
              :fallback="info.defaultImage"
            />
          </div>

          <div class="details">
            <div class="toggle">
              <button @click="isStats = false" :class="{'active' : !isStats}">
                About
              </button>
              <button @click="isStats = true" :class="{'active' : isStats}">
                Base Stats
              </button>
            </div>

            <table v-if="isStats">
              <tr v-for="({stat, base_stat}, index) in data.stats" :key="index">
                <td>
                  <p>
                    {{ stat.name }}
                  </p>
                </td>
                <td>
                  <p class="stat" :style="`width: ${base_stat}px;`">
                    {{ base_stat }}
                  </p>
                </td>
              </tr>
            </table>

            <table v-if="!isStats">
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
                      v-for="({type}, index) in data.types"
                      :key="index"
                    >
                      {{ type.name }}
                    </span>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  Abilities:
                </td>

                <td>
                  <p>
                    <span
                      v-for="({ability, is_hidden}, index) in data.abilities"
                      :key="index"
                    >
                      {{ ability.name }}
                    </span>
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  Height:
                </td>

                <td>
                  {{ data.height }}
                </td>
              </tr>

              <tr>
                <td>
                  Weight:
                </td>

                <td>
                  {{ data.weight }}
                </td>
              </tr>
            </table>

            <div class="description" v-if="!isStats">
              <h4>
                Dex Entry:
              </h4>

              <p>
                {{ info.description[0].flavor_text }}
              </p>
            </div>
          </div>

          <ul class="forms" v-if="info.data.length > 1">
            <li
              v-for="(data, index) in info.data"
              :key="index"
            >
              <button
                :class="{'active' : index === activeData}"
                @click="changeActiveData(index)"
              >
                <p>
                  {{ data.name }}
                </p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      empty
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      activeData: 0,
      isStats: true
    }
  },

  methods: {
    changeActiveData (index) {
      this.activeData = index
    }
  },

  watch: {
    info () {
      this.activeData = 0
      this.isStats = false
    }
  },

  computed: {
    ...mapState({
      loading: 'loading',
      info: 'pokemonInfo'
    })
  }
}

</script>
<style lang="scss" scoped>
  .pokemon-info {
    height: 100%;
    background-color: #fff;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;

    .container {
      height: 100%;
      padding: 20px;
    }

    .info-wrapper {
      position: relative;
      margin: 80px 0;

      .large-name {
        opacity: 0.20;
        margin-bottom: 30px;
        font-size: 3rem;
        position: absolute;
        font-weight: 600;
        top: 20px;
        left: 30px;
        pointer-events: none;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 20px;
      }

      .info {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .display-image-wrapper {
          width: 80%;
          margin: 20px;
          pointer-events: none;
        }

        .details {
          position: relative;
          width: 100%;

          .toggle {
            display: flex;
            margin-bottom: 20px;

            button {
              flex: 1 1 auto;
              background-color: #fff;
              border: 1px solid #ccc;
              padding: 5px;
              transition: 0.3s;

              &:hover, &.active {
                background-color: #777;
                border-color: #777;
                color: #fff;
              }
            }
          }

          table {
            margin-bottom: 20px;
            border-collapse: collapse;
            table-layout: fixed;

            tr {
              td {
                padding: 3px;
                vertical-align: top;

                &:first-child {
                  font-weight: 600;
                  padding-right: 20px;
                }

                .stat {
                  background-color: #bbddc7;
                  text-align: right;
                  padding: 2px 5px;
                  border-radius: 10px;
                  color: #fff;
                }
              }
            }
          }

          .description {
            padding: 5px;
            margin-bottom: 20px;

            h4 {
              margin: 5px 0;
            }
          }

        }
      }
    }
  }

  @media only screen and (min-width: 750px) {
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .info-wrapper {
        width: 100vmin;
        margin: 0;
        padding: 50px;

        h1 {
          font-size: 4rem;
          margin-bottom: 50px;
        }

        .large-name {
          font-size: 15vmin;
          top: 100px;
          left: 100px;
        }

        .info {
          flex-direction: row;
          flex-wrap: wrap;

          .display-image-wrapper {
            width: 50%;
            margin: 20px;
          }

          .details {
            flex: 1 1 300px;
          }
        }
      }
    }
  }
</style>
