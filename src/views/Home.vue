<template>
  <div class="home">
    <div>
      <img src="@/assets/img/pokemon_text.png" alt="pokemon">
      <p>
        Pokedex powered by <a href="https://pokeapi.co/">PokeApi</a>
      </p>
    </div>
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
  align-items: center;
  justify-content: center;

  img {
    width: 80vmin;
    position: relative;
    display: block;
  }

  p {
    color: #fff;
    position: relative;
    text-align: center;
    background-color: #ffffff50;

    a {
      color: #fff;

    }
  }
}
</style>
