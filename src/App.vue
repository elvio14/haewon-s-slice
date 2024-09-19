<script setup>
import {ref, onMounted} from 'vue'
import HeaderVue from './components/HeaderVue.vue'
import Shop from './components/Shop.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Cart from './components/Cart.vue'

const activeTab = ref('home')

const setActive = (active) => {
  activeTab.value = active
}

const ids = ref({"cart_id": "default", "user_id": "default"})
const prices = ref([])
const products = ref([])

const getIDs = async () => {
    try {
        const response = await fetch('http://localhost:8080/ids', {
            method: 'GET'
        })
        ids.value= await response.json()
        console.log(ids.value)
    } catch (error) {
        console.error(error)
    }
}

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/products', {method: 'GET'})
        if (!response.ok){
            throw new Error('response error:' + response.statusText)
        }
        const data = await response.json()
        products.value = data
    } catch (error) {
        console.error('error fetching products', error)
    }

    try{
        const response = await fetch("http://localhost:8080/products/prices", {
            method: 'GET'
        })
        const data = await response.json()
        prices.value = data
    }catch(error){
        console.error(error)
    }
})

onMounted(async ()=>{
    getIDs()
})
</script>

<template>
  <div id="root">
    <div id="logo-corner">
      <img src="/haewon_logo.png" alt="brand logo" style="width: 5rem; margin-left: 1rem;">
      <span id="title" class="hand-font">Haewon's Slice</span>
    </div>

    <HeaderVue @getActive="(active) => {setActive(active)}"/>
    <Home v-if="activeTab == 'home'"></Home>
    <Shop v-if="activeTab == 'shop'" :ids="ids" :products="products" :prices="prices"></Shop>
    <About v-if="activeTab == 'about'"></About>
    <Cart v-if="activeTab == 'cart'" :ids="ids" :products="products"/>
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
