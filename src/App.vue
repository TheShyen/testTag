<template>
  <main>
    <div class="page-container">
      <Navigation/>
      <h1 class="page-name">Комплекты стеллажных систем</h1>
      <section class="filters">
        <Filter :options="PriceOptionsArray"/>
        <Filter/>
      </section>
      <section class="products">
        <ProductCard v-for="product in store.state.products" :product="product" :key="product.id"/>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Navigation from "./components/Navigation.vue";
import ProductCard from "./components/ProductCard.vue";
import Filter from "./components/Filter.vue";
import {onMounted} from "vue";
import {useStore} from "./stores/AppStore.ts";
import {PriceOptionsArray} from "./constants/PriceSortOption.ts";


const store = useStore()
onMounted(() => {
  store.dispatch('getProducts')
})
</script>

<style scoped lang="sass">
.page-container
  width: 1400px
  margin: 0 auto
.page-name
  font-family: 'SF Pro Display', sans-serif
.filters
  max-width: 500px
  display: flex
  justify-content: space-between
.products
  display: flex
  flex-wrap: wrap
  gap: 20px 0px
  margin-top: 40px
  justify-content: space-around
</style>
