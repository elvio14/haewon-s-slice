<script setup>
import {onMounted, ref} from 'vue'
import convertTime from '../time.js'

const products = ref()

onMounted(async () => {
    try {
        const response = await fetch("http://localhost:8080/products", {
            method: 'GET'
        })

        const data = await response.json()
        products.value = data
    } catch (error) {
        
    }
})
</script>
<template>
    <h2>Admin Products</h2>
    <div id="container" v-for="product in products" :key="product.ProductID" 
    style="">
        <div>{{ product.Name }}<div class="small-button"></div></div>
        <div>{{ product.ProductID }}</div>
        <div style="height: 3rem; overflow-y: hidden;">{{ product.Description }}</div>
        <div style="overflow-y: hidden">{{ convertTime(product.CreatedAt) }}</div>
        <div style="overflow-y: hidden">{{ convertTime(product.UpdatedAt) }}</div>
    </div>
</template>
<style scoped>
.small-button{

}
#container{
    margin: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 0.5fr 2fr 1fr 1fr;
}
</style>