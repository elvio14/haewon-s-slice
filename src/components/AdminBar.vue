<script setup>
import {ref} from 'vue'

const activeTab = ref()

const emit = defineEmits(['getActive'])

const logout_pop = ref(false)

const barClick = (bar) => {
    emit('getActive', bar)
    activeTab.value = bar
}

const logout = () => {
    
}

const styleBarButton = (bar) => {
    console.log(activeTab.value)
    return {color: activeTab.value == bar ? 'white' : 'var(--accent-mono)'}
}


</script>
<template>
    <div id="bar">
        <img src="/haewon_logo.png" alt="brand logo" style="width: 5rem; margin-left: 1rem;">
        <div ref="products" class="bar-button" @click="barClick('products')" :style="styleBarButton('products')">Products</div>
        <div class="bar-button" @click="barClick('orders')" :style="styleBarButton('orders')">Orders</div>
        <div class="bar-button" @click="barClick('admin')" :style="styleBarButton('admin')">Admin</div>
        <div class="bar-button logout" @click="logout_pop = !logout_pop" style="color: var(--accent-mono);">Log Out </div>
        <div id="logout-pop" v-if="logout_pop">
            <div style="grid-column: span 2; text-align: center;">Sure to log out?</div>
            <div class="logout-pop-button" style="background-color: lightseagreen;">yes</div>
            <div class="logout-pop-button" style="background-color:lightcoral;" @click="logout_pop = !logout_pop">no</div>
        </div>
        
    </div>
</template>
<style>
#logout-pop{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.logout-pop-button{
    width: 3rem;
    padding: 0.5rem;
    margin: 1rem;
    cursor: pointer;
    border: transparent;
    border-radius: 0.5rem;
    text-align: center;
    z-index: 1;
}
#bar{
    position: fixed;
    height: 100%;
    background-color: var(--main-mono);
    margin: none;
    width: 14vw;
}

.bar-button{
    font-weight: bold;
    justify-self: stretch;
    background-color:var(--main-color);
    padding: 0.5rem;
    cursor: pointer;
}

</style>