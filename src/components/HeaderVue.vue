<script setup>
import { ref } from 'vue'

const props = defineProps({active: String})

const container = ref(null)
const home = ref('home')
const shop = ref('shop')
const about = ref('about')

const emit = defineEmits(['getActive'])

const handleClick = (tab) => {
  const activeElement = container.value.querySelector(".active")
  activeElement.classList.remove("active")
  tab.classList.add("active")

  emit('getActive', tab.id)
}

</script>

<template>
  <div ref="container">
    <button id="home" ref="home" class="nav-button hand-font active" @click="handleClick(home)">Home</button>
    <button id="shop" ref="shop" class="nav-button hand-font" @click="handleClick(shop)">Shop</button>
    <button id="about" ref="about" class="nav-button hand-font" @click="handleClick(about)">About</button>
  </div>

</template>

<style scoped>
.active{
  background-image: linear-gradient(to bottom, var(--main-color), white);
  border: 1px transparent;
  color:var(--accent-color);
}

.nav-button{
  border: 2px solid var(--main-color);
  border-bottom: none;
  padding: 1rem;
  padding-bottom: 0.5rem;
  background-color: white;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  margin: 1rem;
  cursor: pointer;
}

.nav-button:hover{
  color: var(--accent-color);
}
</style>
