<script setup>
import { ref } from 'vue'

const props = defineProps({active: String})

const container = ref(null)
const home = ref('home')
const shop = ref('shop')
const about = ref('about')
const cart = ref('cart')

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
    <button id="cart" ref="cart" class="nav-button hand-font" @click="handleClick(cart)" 
      style="padding-top: 0.43rem; padding-left: 1.5rem; padding-right: 1.5rem; ">
      <svg id="cart-icon"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24" xml:space="preserve">
        <g transform="matrix(1 0 0 1 11.3958533238 9.4260869565)" id="aXB97Pb9chazpi9HF3hID"  >
        <path class="cart-path" style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -10.0998 -6.46957 L -7.77846 -6.46957 L -5.86542 6.46956 L 8.84762 6.46956 L 10.099789999999999 -2.8521799999999997 L -4.7871700000000015 -2.8521799999999997" stroke-linecap="round" />
        </g>
        <g transform="matrix(0.7629298031 0 0 0.7629298031 6.3079439409 18.6117396774)" id="0qWoh2Vu8YwkIxzLhoB-V"  >
        <path class="cart-path"  style="stroke: rgb(84,31,69); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -2.29565 C 1.2672 -2.29565 2.29565 -1.2672 2.29565 0 C 2.29565 1.2672 1.2672 2.29565 0 2.29565 C -1.2672 2.29565 -2.29565 1.2672 -2.29565 0 C -2.29565 -1.2672 -1.2672 -2.29565 0 -2.29565 z" stroke-linecap="round" />
        </g>
        <g transform="matrix(0.7629298031 0 0 0.7629298031 18.1969818221 18.6117414226)" id="Uj7NOG7dgSbJxCZoXoTiL"  >
        <path style="stroke: rgb(84,31,69); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -2.29565 C 1.2672 -2.29565 2.29565 -1.2672 2.29565 0 C 2.29565 1.2672 1.2672 2.29565 0 2.29565 C -1.2672 2.29565 -2.29565 1.2672 -2.29565 0 C -2.29565 -1.2672 -1.2672 -2.29565 0 -2.29565 z" stroke-linecap="round" />
        </g>
        <g transform="matrix(1 0 0 1 12.8675107485 9.4260869565)" id="lZE6st-eJU8oHNbeik25a"  >
        <path class="cart-path"  style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -6.10435 0 L 6.10435 0" stroke-linecap="round" />
        </g>
        <g transform="matrix(1 0 0 1 12.8849020528 12)" id="97Bg0Gg6cexRTnM1rrs7v"  >
        <path class="cart-path"  style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -5.87826 0 L 5.87826 0" stroke-linecap="round" />
        </g>
      </svg>
    </button>
    
  </div>
  
</template>

<style scoped>



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
#cart-icon{
  cursor: pointer;
}

.cart-path{
  stroke: var(--accent-color) !important;
}

.active{
  background-image: linear-gradient(to bottom, var(--main-color), white);
  color:var(--accent-color);
}
</style>
