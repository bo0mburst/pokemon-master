<template>
  <div>
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
</template>

<style lang="scss" scoped>
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
</style>
