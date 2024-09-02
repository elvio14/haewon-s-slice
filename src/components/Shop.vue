<script setup>
import {ref, onMounted} from 'vue'

const products = ref([])

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
})

</script>
<template>
    <Header>SHOP</Header>
    <div v-for="product in products" :key="product.product_id">
        {{ product.ProductID}}
        {{ product.Name }}
        {{ product }}
    </div>
</template>