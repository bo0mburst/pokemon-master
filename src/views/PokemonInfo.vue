<template>
  <div
    class="pokemon-info"
  >
    <div
      class="info-wrapper"
      v-if="!loading"
    >
      <div v-if="info">
        <div
          v-for="(data, index) in info.data"
          :key="index"
          v-show="index === active"
        >
          <h1 :style="`color: ${info.color}`">{{ data.name }}</h1>

          <div class="info">
            <lazy-img
              class="display-image"
              :src="data.image"
              :fallback="info.data[0].image"
            />

            <table>
              <tr>
                <td>
                  Number:
                </td>

                <td>
                  {{ info.id }}
                </td>
              </tr>

              <tr>
                <td>
                  Type(s):
                </td>

                <td>
                  <span
                    v-for="({type}, index) in data.types"
                    :key="index"
                  >
                    {{ type.name }}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  Abilities:
                </td>

                <td>
                  <span
                    v-for="({ability, is_hidden}, index) in data.abilities"
                    :key="index"
                  >
                    {{ ability.name }}
                  </span>
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

              <tr>
                <td>
                  Description
                </td>

                <td>
                  <!-- <p
                    v-for="({ flavor_text },index) in info.description"
                    :key="index"
                  >
                    {{ flavor_text }}
                  </p> -->
                  <p>{{ info.description[0].flavor_text }}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <ul>
          <li
            v-for="(data, index) in info.data"
            :key="index"
          >
            <button @click="changeActiveData(index)">
              {{ data.name }}
            </button>
          </li>
        </ul>
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
  methods: {
    changeActiveData (index) {
      this.$store.dispatch('setActiveDataIndex', index)
    }
  },

  computed: {
    ...mapState({
      loading: 'loading',
      info: 'pokemonInfo',
      active: 'activeDataIndex'
    })
  }
}

</script>
<style lang="scss" scoped>
  .pokemon-info {
    height: 100%;
    width: 100%;
    // background-size: 200% 200%;
    // animation: gradient 10s ease infinite;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-transform: capitalize;
    overflow-x: hidden;
    overflow-y: auto;

    .info-wrapper  {
      flex: 1 1 auto;
      max-width: 1033px;
      // border: 1px solid #eee;
    }

    .info {
      height: auto;
      padding: 20px;
      display: flex;
      align-items: center;
      // box-shadow: 0 5px 10px #aaa;

      .display-image {
        width: 90vmax;
        margin: 10px;
      }

      table {
        border-collapse: collapse;
        table-layout: fixed;

        tr {
          td {
            padding: 10px;
            vertical-align: top;

            &:first-child {
              color: #555;
            }
          }
        }
      }
    }
  }
</style>
