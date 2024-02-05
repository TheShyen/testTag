<template>
  <main>
    <div class="page-container">
      <Navigation/>
      <h1 class="page-name">Комплекты стеллажных систем</h1>
      <section class="filters">
        <Filter :options="PriceOptionsArray" v-model="priceFilterValue" @on-select-option="filterByPrice" @on-clear-value="clearPriceFilter"/>
        <Filter :options="MaterialsFilterOptions" v-model="materialFilterValue" @on-select-option="filterByMaterial" @on-clear-value="clearMaterialFilter"/>
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
import {onMounted, ref} from "vue";
import {useStore} from "./stores/AppStore.ts";
import {PriceOptionsArray} from "./constants/PriceSortOption.ts";
import {MaterialsFilterOptions} from "./constants/MaterialsFilterOption.ts";
import {defaultFilterValue} from "./constants/DefaultFilterValue.ts";


const store = useStore()

const priceFilterValue = ref(defaultFilterValue)
const materialFilterValue = ref(defaultFilterValue)

onMounted(() => {
  store.dispatch('getProducts')
})

function filterByPrice(option: string) {
  priceFilterValue.value = (PriceOptionsArray.find(elem => elem.id == option) || {name: defaultFilterValue}).name
  store.dispatch('sortProductsByPrice', {value: option})
}

function filterByMaterial(option: string) {
  materialFilterValue.value = (MaterialsFilterOptions.find(elem => elem.id == option) || {name: defaultFilterValue}).name
  store.dispatch('filterProductsByMaterial', {value: option})
}

function clearPriceFilter() {
  const idOption = (MaterialsFilterOptions.find(elem => elem.name == materialFilterValue.value) || {id: 0}).id
  if(materialFilterValue.value != defaultFilterValue) {
    store.dispatch('getProducts')
    store.dispatch('filterProductsByMaterial', {value: idOption})
  } else {
    store.dispatch('getProducts')
  }
  priceFilterValue.value = defaultFilterValue
}

function clearMaterialFilter() {
  const idOption = (PriceOptionsArray.find(elem => elem.name == priceFilterValue.value) || {id: 0}).id
  if(priceFilterValue.value != defaultFilterValue) {
    store.dispatch('getProducts')
    store.dispatch('sortProductsByPrice', {value: idOption})
  } else {
    store.dispatch('getProducts')
  }
  materialFilterValue.value = defaultFilterValue
}
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
