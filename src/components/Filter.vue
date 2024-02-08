<template>
  <div class="select">
    <button @click="toggleDropdown" ref="selectElementRef" class="select__button">
      {{ props.modelValue }}
    </button>
    <transition name="fade">
      <ul v-if="isOpen" class="select__options">
        <li v-for="option in props.options" @click="handleOptionClick(option.id)">{{option.name}}</li>
      </ul>
    </transition>
    <div class="arrow" :class="{ 'arrow-up': isOpen }"></div>
    <button @click="handleClearFilter" class="cross" v-if="props.modelValue != defaultFilterValue">
      <img src="../assets/cross.svg" class="cross__img" alt="crossImage"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, VNodeRef} from 'vue';
import {OptionType} from "../types/OptionType.ts";
import {defaultFilterValue} from "../constants/DefaultFilterValue.ts";

const isOpen = ref(false);
const selectElementRef = ref<VNodeRef>('')

const props = defineProps<{
  options: OptionType[],
  modelValue: string
}>()
const emit = defineEmits(['onSelectOption', 'onClearValue'])

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleOptionClick(option: string) {
  emit('onSelectOption', option)
}
function handleClearFilter() {
  emit('onClearValue')
}
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function handleClickOutside (event: Event) {
  if(event.target !== selectElementRef.value) {
    closeDropdown()
  }
}


</script>

<style scoped lang="sass">
.select
  position: relative
  display: inline-block
  font-family: 'SF Pro Display', sans-serif !important
  &__button
    border: none
    width: 238px
    height: 42px
    background-color: #F2F2F2
    font-weight: 400
    font-size: 16px
    padding: 10px 10px
    cursor: pointer
    text-align: left
  &__options
    position: absolute
    top: 100%
    left: 0
    list-style: none
    margin: 0
    padding: 0
    background-color: #fff
    width: 100%
    z-index: 9999
li
  padding: 10px
  border-bottom: 1px solid #eee
  cursor: pointer
  transition: 0.5s all
  &:hover
    background: #F2F2F2

button
  font-family: inherit
a
  text-decoration: none
  color: #333
  display: block

.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0


.arrow
  position: absolute
  display: block
  content: ''
  width: 10px
  height: 10px
  top: 50%
  right: 25px
  margin-top: -3px
  border-bottom: 2px solid #111
  border-right: 2px solid #111
  transform: rotate(45deg) translateY(-50%)
  transition: all .4s ease-in-out
  transform-origin: 50% 0


.arrow-up
  margin-top: 3px
  transform: rotate(-135deg) translateY(-50%)


.cross
  position: absolute
  border: none
  cursor: pointer
  top: 50%
  right: 40px
  transform: translateY(-50%)
  margin-top: 1px
  &__img
    height: 12px
    width: 12px

</style>