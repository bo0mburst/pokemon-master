<template>
  <ul class="evolution">
    <li>
      <div class="evolution-detail">
        <div
          class="thumbnail"
          @click="view()"
        >
          <lazy-img
            :src="thumbnail"
            :aspect-ratio="1"
          />
        </div>

        <div class="evolution-info">
          <h4>{{ evo.species.name }}</h4>
          <ul>
            <li
              v-for="(detail, index) in evo.evolution_details"
              :key="index"
            >
              <span v-if="detail.trigger">
                {{ detail.trigger.name }}
              </span>
              <span v-if="detail.trade_species">
                trade with {{ detail.trade_species }}
              </span>
              <span v-if="detail.gender">
                {{ `a ${gender[detail.gender - 1]} ${evo.species.name}` }}
              </span>
              <span v-if="detail.held_item">
                holding {{ detail.held_item.name }}
              </span>
              <span v-if="detail.item">
                {{ detail.item.name }}
              </span>
              <span v-if="detail.known_move">
                knowing {{ detail.known_move.name }}
              </span>
              <span v-if="detail.known_move_type">
                knowing {{ detail.known_move_type.name }} type move
              </span>
              <span v-if="detail.location">
                on {{ detail.location.name }}
              </span>
              <span v-if="detail.min_affection">
                with atleast {{ detail.min_affection }} affection
              </span>
              <span v-if="detail.min_beauty">
                with atleast {{ detail.min_beauty }} beauty
              </span>
              <span v-if="detail.min_happiness">
                with atleast {{ detail.min_happiness }} happiness
              </span>
              <span v-if="detail.min_level">
                at level {{ detail.min_level }}
              </span>
              <span v-if="detail.needs_overworld_rain">
                Raining
              </span>
              <span v-if="detail.party_species">
                with {{ detail.party_species }} on party
              </span>
              <span v-if="detail.party_type">
                with {{ detail.party_type }} type on party
              </span>
              <span v-if="detail.relative_physical_stats">
                with {{ detail.relative_physical_stats }} physical stats
              </span>
              <span v-if="detail.turn_upside_down">
                while device is upside-down
              </span>
              <span v-if="detail.time_of_day">
                at {{ detail.time_of_day }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <evolution-card
        class="chain"
        v-for="(nextEvo, index) in evo.evolves_to"
        :key="index"
        :evo="nextEvo"
      ></evolution-card>
    </li>
  </ul>
</template>

<script>
import EvolutionCard from '@/components/EvolutionCard.vue'

export default {
  name: 'evolution-card',

  props: ['evo'],

  data () {
    return {
      gender: ['Female', 'Male']
    }
  },

  computed: {
    thumbnail () {
      const imgUrl = 'https://raw.github.com/billysillano/pokemon-assets/master/images'
      const imgName = this.evo.species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '')
      return `${imgUrl}/${imgName}.png`
    }
  },

  methods: {
    view () {
      this.$store.dispatch('getPokemon', this.evo.species.name)
    }
  },

  components: {
    EvolutionCard
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 0 auto;

  .evolution-detail {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .evolution-info {
      flex: 1 1 100px;
      background-color: #fff;
      z-index: 2;

      h4 {
        margin-left: 20px;
      }

      ul {
        list-style-position: inside;
      }
    }

    .thumbnail {
      z-index: 2;
      cursor: pointer;
      border-radius: 50%;
      transition: 0.3s;
      z-index: 3;
      background-color: #eee;

      .lazy-image {
        width: 80px;
        transition: 0.3s;

        @include for-desktop {
          width: 150px;
        }
      }

      &:hover {
        z-index: 99;
        background-color: #a1ddb6;

        .lazy-image {
          transform: scale(1.3);
        }
      }
    }
  }
}

.chain {
  margin-left: 60px;
  padding: 5px;

  .evolution-detail {
    &:before {
      content: '';
      display: inline-block;
      border-bottom: 2px dashed #a1ddb6;
      border-left: 2px dashed #a1ddb6;
      position: absolute;
      width: 25px;
      height: 100%;
      top: -50%;
      left: -30px;

    }

    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      color: #a1ddb6;
      left: -15px;
      border: 10px solid;
      width: 0;
      height: 0;
      border-color: transparent transparent transparent #a1ddb6;
    }

    ul {
      list-style-type: circle;
      margin-left: 20px;
    }
  }
}
</style>
