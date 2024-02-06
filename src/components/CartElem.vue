<template>
  <button class="button">
    <img src="../assets/cart.svg"/>
  </button>
  <span class="count">{{store.state.shopCart.length}}</span>
</template>

<script lang="ts" setup>
import {useStore} from "../stores/AppStore";

const store = useStore()
</script>

<style lang="sass" scoped>
.button
  background-color: #ffffff
  border: none
  cursor: pointer
.count
  font-family: 'SF Pro Display', sans-serif
  font-size: 14px
</style>