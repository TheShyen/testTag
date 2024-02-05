<template>
  <div class="product-card">
    <div class="image">
      <img :src="getImagePath(props.product.image.url)" alt="Product 1" class="product-card__img">
    </div>
    <div class="product-info">
      <div class="product-description">
        <div class="product-description__code">{{props.product.code}}</div>
        <h3 class="product-description__name">{{props.product.name}}</h3>
        <div class="price">
          <div class="price__old" v-if="props.product.price.old_price">{{priceFormatter(props.product.price.old_price)}}</div>
          <div class="price__current">{{priceFormatter(props.product.price.current_price)}}</div>
        </div>
      </div>
      <div class="product-actions">
        <button class="product-actions__button">
          <img src="../assets/cart.svg"/>
        </button>
        <button class="product-actions__button">
          <img src="../assets/heart.svg"/>
        </button>
      </div>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import getImagePath from "../utils/getImagePath.ts";
import {ProductType} from "../types/ProductType.ts";
import {priceFormatter} from "../utils/priceFormatter.ts";

const props = defineProps<{
  product: ProductType
}>()

</script>

<style scoped lang="sass">
.product-card
  width: 320px
  height: 380px
  border: 1px solid #EEEEEE
  display: flex
  flex-direction: column
  justify-content: space-between
  &__img
    width: 240px
.image
  justify-content: center
  display: flex
.product-info
  display: flex
  flex-direction: row
  justify-content: space-between
  padding-top: 15px
.product-description
  font-family: 'SF Pro Display', sans-serif
  padding: 20px 0px 10px 12px
  &__code
    font-weight: 200px
    font-size: 10px
    opacity: 0.5
    text-transform: uppercase
  &__name
    margin: 10px 0px
.price
  display: flex
  flex-direction: row
  justify-content: flex-start
  font-size: 16px
  font-weight: 400
  &__old
    margin-right: 10px
    text-decoration-line: line-through
    color: #888888
.product-actions
  display: flex
  flex-wrap: wrap
  align-content: flex-end
  &__button
    background-color: #ffffff
    border: none
    cursor: pointer
</style>