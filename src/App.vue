<template>
  <main>
    <div class="page-container">
      <header>
        <Navigation :routes="routes"/>
        <h1 class="page-name">Комплекты стеллажных систем</h1>
      </header>
      <div class="cart-favorites-container">
        <CartElem/>
        <FavoriteElem/>
      </div>
      <section class="filters">
        <div>
          <div class="filters__label">Сортировать по:</div>
          <Filter
            :options="PriceOptionsArray"
            v-model="priceFilterValue"
            @on-select-option="filterByPrice"
            @on-clear-value="clearPriceFilter"
          />
        </div>
        <div>
          <div class="filters__label">Материал:</div>
          <Filter
            :options="MaterialsFilterOptions"
            v-model="materialFilterValue"
            @on-select-option="filterByMaterial"
            @on-clear-value="clearMaterialFilter"
          />
        </div>
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
import CartElem from "./components/CartElem.vue";
import FavoriteElem from "./components/FavoriteElem.vue";


const store = useStore()
const routes = ['Главная', 'Система хранения', 'Комплекты стелажных систем']
const priceFilterValue = ref(defaultFilterValue)
const materialFilterValue = ref(defaultFilterValue)

onMounted(() => {
  store.dispatch('getProducts')
  store.state.shopCart = JSON.parse(localStorage.getItem('shopCart') || '[]')
  store.state.favorite = JSON.parse(localStorage.getItem('favorite') || '[]')
})


function filterByPrice(option: string) {
  priceFilterValue.value = (PriceOptionsArray.find(elem => elem.id == option) || {name: defaultFilterValue}).name
  if(materialFilterValue.value == defaultFilterValue) {
    store.dispatch('getProducts')
  }
  store.dispatch('sortProductsByPrice', {value: option})
}

function filterByMaterial(option: string) {
  materialFilterValue.value = (MaterialsFilterOptions.find(elem => elem.id == option) || {name: defaultFilterValue}).name
  if(priceFilterValue.value == defaultFilterValue) {
    store.dispatch('getProducts')
  }
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
  max-width: 1400px
  margin: 0 auto
.page-name
  font-family: 'SF Pro Display', sans-serif
.filters
  max-width: 500px
  display: flex
  justify-content: space-between
  &__label
    font-family: 'SF Pro Display', sans-serif
    font-size: 12px
    color: #4F4F4F
    padding: 6px 10px
.products
  display: flex
  flex-wrap: wrap
  gap: 20px 0px
  margin-top: 40px
  justify-content: space-around
  
.cart-favorites-container
  position: absolute
  top: 20px
  right: 40px
  display: flex
  flex-wrap: wrap
  align-content: flex-end
  z-index: -9999

@media (max-width: 575px)
  .filters
    flex-wrap: wrap
  .cart-favorites-container
    top: 30px
@media (max-width: 768px)
  .cart-favorites-container
    top: 30px
</style>
