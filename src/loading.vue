<template>
  <view class="loading">
    <image :source="require('../assets/loading.gif')" />
  </view>
</template>



<style scoped>
  .loading {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 150%;
    left: 40%;
  }
</style>
