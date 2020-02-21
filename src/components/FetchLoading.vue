<template>
  <div class="fetch-loading-wrapper">
    <div class="fetch-loading"></div>
  </div>
</template>

<style lang="scss" scoped>
  .fetch-loading-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .fetch-loading {
    border-radius: 50%;
    margin: 10px;
    height: 60vmin;
    width: 60vmin;
    box-shadow: 0 0 0 0 #505050;
    transform: scale(1);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95) rotateZ(0);
      box-shadow: 0 0 0 0 #505050b3;
    }

    70% {
      transform: scale(1) rotateZ(180deg);
      box-shadow: 0 0 0 20vmin #50505000;
    }

    100% {
      transform: scale(0.95) rotateZ(360deg);
      box-shadow: 0 0 0 0 #50505000;
    }
}
</style>
