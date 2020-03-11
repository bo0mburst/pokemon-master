<template>
  <div class="home">
    <header>
      <img src="@/assets/img/pokemon_text.png" alt="pokemon">
      <p>
        Pokedex powered by <a href="https://pokeapi.co/" target="blank">PokeApi</a>
      </p>
    </header>

    <footer>
      <p>
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }

  header {
    img {
      width: 80vmin;
      position: relative;
      display: block;
    }

    p {
      color: #fff;
      background-color: #ffffff50;

      a {
        color: #fff;
      }
    }
  }

  footer {
    margin-top: 5px;
    p {
      color: #333;
      line-height: 1rem;
    }
  }
}
</style>
