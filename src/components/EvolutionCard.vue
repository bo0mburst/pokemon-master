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

        <h4>{{ evo.species.name }}</h4>

          <!-- <p
            v-for="(detail, index) in evo.evolution_details"
            :key="index"
          >
            <span v-if="detail.gender">
              {{ gender[detail.gender - 1] }}
            </span>

            <span v-if="detail.held_item">
              {{ detail.held_item.name }}
            </span>

            <span v-if="detail.item">
              {{ detail.item.name }}
            </span>

            <span v-if="detail.known_move">
              {{ detail.known_move }}
            </span>

            <span v-if="detail.known_move_type">
              {{ detail.known_move_type }}
            </span>
            <span v-if="detail.location">
                {{ detail.location.name }}
            </span>
            <span v-if="detail.min_affection">
              {{ detail.min_affection }}
            </span>
            <span v-if="detail.min_beauty">
              {{ detail.min_beauty }}
            </span>
            <span v-if="detail.min_happiness">
              {{ detail.min_happiness }}
            </span>
            <span v-if="detail.min_level">
              {{ detail.min_level }}
            </span>
            <span v-if="detail.needs_overworld_rain">
              {{ detail.needs_overworld_rain }}
            </span>
            <span v-if="detail.party_species">
              {{ detail.party_species }}
            </span>
            <span v-if="detail.party_type">
              {{ detail.party_type }}
            </span>
            <span v-if="detail.relative_physical_stats">
              {{ detail.relative_physical_stats }}
            </span>
            <span v-if="detail.time_of_day">
              {{ detail.time_of_day }}
            </span>
            <span v-if="detail.trade_species">
              {{ detail.trade_species }}
            </span>
            <span v-if="detail.trigger">
              {{ detail.trigger.name }}
            </span>
            <span v-if="detail.turn_upside_down">
              {{ detail.turn_upside_down }}
            </span>
          </p> -->
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
  .evolution-detail {
    position: relative;
    display: flex;
    align-items: center;

    .thumbnail {
      background-color: #ddd;
      border-radius: 50%;
      z-index: 2;
      margin-right: 10px;
      cursor: pointer;

      .lazy-image {
        width: 80px;
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
      border-bottom: 2px dashed green;
      border-left: 2px dashed green;
      position: absolute;
      width: 25px;
      height: 100%;
      top: -50%;
      left: -30px;
    }
  }
}
</style>
