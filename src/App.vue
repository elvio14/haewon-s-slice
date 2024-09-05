<script setup>
import {ref} from 'vue'
import HeaderVue from './components/HeaderVue.vue'
import Shop from './components/Shop.vue'
import Home from './components/Home.vue'

const activeTab = ref('home')

const setActive = (active) => {
  activeTab.value = active
}

</script>

<template>
  <div id="root">
    <div id="logo-corner">
      <img src="/haewon_logo.png" alt="brand logo" style="width: 5rem; margin-left: 1rem;">
      <span id="title" class="hand-font">Haewon's Slice</span>
    </div>
    <HeaderVue @getActive="(active) => setActive(active)"/>
    <Home v-if="activeTab == 'home'"></Home>
    <Shop v-if="activeTab == 'shop'"></Shop>

  </div>
</template>

<style scoped>
#logo-corner{
  position: absolute;
  align-items: center;
  left: 0;
  top: 0;
  height: 6rem;
  width: 16rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
}

#title{
  font-size: x-large;
  transform: translate(-14%,14%);
  color: var(--accent-color);
}
</style>
