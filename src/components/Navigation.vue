<template>
  <nav>
    <a href="#" v-for="(route, index) in props.routes" :key="index" class="routes" :class="{'routes_black' : index == props.routes.length - 1}">
      {{ route }}
      <span v-if="index !== props.routes.length - 1" class="routes__divider"> / </span>
    </a>
  </nav>
</template>

<script setup lang="ts">

const props = defineProps<{
  routes: string[]
}>()
</script>

<style scoped lang="sass">
.routes
  font-family: 'SF Pro Display', sans-serif
  font-size: 16px
  font-weight: 400
  text-decoration-line: none
  color: #828282
  &_black
    color: #111111
  &__divider
    margin: 0 5px

</style>