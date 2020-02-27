<template>
  <div class="pokemon-info">
    <div class="empty" v-if="loading">
      <loading-indicator></loading-indicator>
    </div>

    <div
      class="info"
      v-else-if="!loading && info"
    >
      <header>
        <h1>{{ info.name }}</h1>

        <span class="large-name" :style="`color: ${info.color}`">
          {{ info.jname.name || info.name }}
        </span>
      </header>

      <ul v-if="info.data.length > 1">
        <li
          v-for="(data, index) in info.data"
          :key="index"
        >
          <a
            :class="{'active' : index === activeData}"
            @click="changeActiveData(index)"
          >
            <span v-if="data.name === info.name">
              Original
            </span>

            <span v-else>
              {{ data.name.replace(`${info.name}-`, '') }}
            </span>
          </a>
        </li>
      </ul>

      <div
        class="details"
        v-for="(data, index) in info.data"
        :key="index"
        v-show="index === activeData"
      >
        <div class="display-image">
          <lazy-img
            v-for="(img, index) in data.images"
            :key="index"
            :src="img"
            :aspect-ratio="1"
            :fallback="info.defaultImage"
          />
        </div>

        <div
          class="detail"
          :class="{'show' : activeDetail === 0}"
        >
          <h4>
            Dex Entry:
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
          :class="{'show' : activeDetail === 1}"
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
                    v-for="({type}, index) in data.types"
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
                    {{ data.abilities }}
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
        </div>

        <div
          class="detail"
          :class="{'show' : activeDetail === 2}"
        >
          <h4>
            Base Stats:
          </h4>

          <table>
            <tr v-for="({stat, base_stat}, index) in data.stats" :key="index">
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
      </div>

      <ul class="detail-nav">
        <li
          v-for="(item, index) in ['dex entry',  'about', 'stats']"
          :key="index"
        >
          <a
            :class="{ 'active' : index === activeDetail }"
            @click="changeActiveDetail(index)"
          >
            {{ item }}
          </a>
        </li>
      </ul>
    </div>

    <div class="empty" v-else>
      <div class="images">
        <img src="@/assets/img/ic_pikachu.svg">
        <img src="@/assets/img/ic_bulbasaur.svg">
        <img src="@/assets/img/ic_charmander.svg">
        <img src="@/assets/img/ic_squirtle.svg">
      </div>

      <p>
        Oops looks like this pokemon have not yet been seen!
      </p>

      <router-link
        to="/pokemon-list"
        class="router-link "
      >
        View List
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  data () {
    return {
      activeData: 0,
      activeDetail: 0,
      activeEntry: 1,
      imgLoading: false
    }
  },

  methods: {
    changeActiveData (index) {
      this.activeData = index
    },

    changeActiveDetail (index) {
      this.activeDetail = index
    },

    changeActiveEntry (val) {
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
    }
  },

  computed: {
    ...mapState({
      loading: 'loading',
      info: 'pokemonInfo'
    })
  },

  components: {
    LoadingIndicator
  }
}

</script>
<style lang="scss" scoped>
  .pokemon-info {
    height: 100%;
    overflow-y: auto;
    background-color: #fff;

    .info {
      min-height: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 100px 20px;
      position: relative;

      header {
        margin-bottom: 10px;

        .large-name {
          opacity: 0.2;
          font-size: 2rem;
          position: absolute;
          top: 150px;
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
          &:not(:last-child) {
            margin-right: 10px;
          }

          a {
            display: inline-block;
            padding-left: 5px;
            border-left: 5px double #aaa;

            &.active {
              font-weight: 600;
            }
          }
        }

        &.detail-nav {
          margin-top: 0;
          display: none;
        }
      }

      .details {
        .display-image {
          margin: 30px 0;
          width: 100%;
          max-width: 300px;
          display: flex;
          justify-content: center;
          position: relative;
          flex-wrap: wrap;

          .lazy-image {
            flex-basis: 100px;
            margin-bottom: 10px;

            &:only-child {
              flex: 1 1 auto;
              margin-bottom: 0;
            }
          }
        }

        .detail {
          padding: 20px 0;
          border-top: 1px solid #ccc;

          h4 {
            margin-bottom: 10px;
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
    }

    .empty {
      height: 100%;
      width: 100%;
      padding: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .images, p {
        margin-bottom: 10px;
      }

      .images {
        display: flex;

        img {
          width: 30px;
          margin: 5px;
          position: relative;
          border-radius: 50%;

          &:nth-child(1) {
            animation: go-up 1s 0s infinite alternate;
          }

          &:nth-child(2) {
            animation: go-up 1s 0.5s infinite alternate;
          }

          &:nth-child(3) {
            animation: go-up 1s 1s infinite alternate;
          }

          &:nth-child(4) {
            animation: go-up 1s 1.5s infinite alternate;
          }
        }

        @keyframes go-up {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
            box-shadow: 0px 37px 20px -15px  #aaa;
          }

          100% {
            transform: translateY(0px);
          }
        }
      }

      p {
        text-align: center;
        line-height: 1rem;
      }

      .router-link {
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #aaa;
        box-shadow: 0 2px 5px #aaa;
        border-radius: 5px;
        padding: 5px 10px;
        margin-top: 10px;
        color: #777;
      }
    }
  }

  @include for-desktop {
    .pokemon-info {
      .empty {
        .images, p {
          margin-bottom: 15px;
        }

        .images {
          img {
            width: 50px;
          }
        }
      }

      .info {
        max-width: 100vmin;

        header {
          h1 {
            font-size: 3rem;
            letter-spacing: .5rem;
          }

          .large-name {
            font-size: 5rem;
            top: 100px;
          }
        }

        ul {
          li {
            &:not(:last-child) {
              margin-right: 20px;
            }
          }

          &.detail-nav {
            display: flex;
            justify-content: flex-end;
          }
        }

        .details {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          font-size: 1.2rem;
          line-height: 1.5rem;

          .display-image {
            flex: 1 1 400px;
            max-width: 500px;

            .lazy-image {
              flex-basis: 200px;
              width: 200px;
              margin-bottom: 10px;

              &:only-child {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;
                margin-bottom: 0;
              }
            }
          }

          .detail {
            display: none;

            &.show {
              flex: 1 1 300px;
              display: block;
              opacity: 0;
              margin-left: 50px;
              animation: fade-to-right 1s forwards;
              padding: 0;
              border: 0;
            }

            table {
              tr {
                td {
                  padding: 10px 0;
                }
              }
            }

            .entry-nav {
              justify-content: flex-start;
              margin-top: 10px;

              button {
                font-size: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
</style>
