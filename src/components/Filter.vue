<template>
  <div class="dropdown">
    <button @click="toggleDropdown" :ref="(el) => { dropdownMen = el }" class="dropdown-toggle">
      {{ selectValue }}
    </button>
    <transition name="fade">
      <ul v-if="isOpen" class="dropdown-menu">
        <li v-for="option.name in props.options" @click="handleOptionClick(option.name)">{{option.name}}</li>
      </ul>
    </transition>
    <div class="arrow" :class="{ 'arrow-up': isOpen }"></div>
    <button @click="selectValue='Выберите значение'" class="cross" v-if="selectValue != 'Выберите значение'">
      <img src="../assets/cross.svg" style="height: 12px; width: 12px"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {OptionType} from "../types/OptionType.ts";
const isOpen = ref(false);
const dropdownMen = ref<Element | null>(null)
const selectValue = ref('Выберите значение')

const props = defineProps<{
  options: OptionType[]
}>()

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleOptionClick(option: string) {
  selectValue.value = option
  
}
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if(event.target !== dropdownMen.value) {
    closeDropdown()
  }
};


</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  border: none;
  width: 238px;
  height: 42px;
  background-color: rgba(242, 242, 242, 1);
  font-family: 'SF Pro Display', sans-serif;
  font-weight: 400;
  font-size: 16px;
  padding: 10px 10px;
  cursor: pointer;
  text-align: left;
}
li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-family: 'SF Pro Display', sans-serif;
  &:hover {
    background: #cdd2d9;
    transition: 0.5s all;
  }
}
a {
  text-decoration: none;
  color: #333;
  display: block;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  width: 100%;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.arrow {
  position: absolute;
  display: block;
  content: '';
  width: 10px;
  height: 10px;
  top: 50%;
  right: 25px;
  margin-top: -3px;
  border-bottom: 2px solid #111;
  border-right: 2px solid #111;
  transform: rotate(45deg) translateY(-50%);
  transition: all .4s ease-in-out;
  transform-origin: 50% 0;
}

.arrow-up {
  margin-top: 3px;
  transform: rotate(-135deg) translateY(-50%);
}

.cross {
  position: absolute;
  background-color: rgba(255,255,255,0.0);
  border: none;
  cursor: pointer;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  margin-top: 3px;
}
</style>