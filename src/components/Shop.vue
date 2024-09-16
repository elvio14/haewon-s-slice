<script setup>
import {ref, onMounted, computed} from 'vue'
import Product from './Product.vue';

const currentProduct = ref({})
const products = ref([])
const prices = ref([])
const currentPrices = ref([])
const showProduct = ref(false)

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:8080/products', {method: 'GET'})
        if (!response.ok){
            throw new Error('response error:' + response.statusText)
        }
        const data = await response.json()
        products.value = data
        currentProduct.value = data[0]
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

const handleProductClick = (product) => {
    currentProduct.value = product
    console.log(currentProduct.value)
    getPricesToRef(product.ProductID)
    console.log(currentPrices.value)
    showProduct.value = true
}
const getPricesToRef = (id) => {
    const pricesFound = prices.value.filter(item => item.product_id == id)
    for(const price of pricesFound){
        currentPrices.value.push(price)
    }
}

</script>
<template>
    <div id="products-grid" v-if="!showProduct">
        <div class="product hand-font" v-for="product in products" :key="product.ProductID" @click="handleProductClick(product)">
            <div class="product-img-div">
                <img class="product-img" :alt="product.Name" :src="`https://res.cloudinary.com/dy6sxilvq/image/upload/v1725293732/cakes/${product.Image}.png`" />
            </div>
            {{ product.Name }}
        </div>
    </div>
    <Product :product="currentProduct" :prices="currentPrices" @back="(value) => showProduct = value" v-if="showProduct"/>
</template>
<style>
#products-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 60vw;
}

.product-img{
    object-fit: cover;
    width: 15vw;
    height: 11.25vw;
}

.product-img-div{
    width: 15vw;
    height: 11.25vw;
    overflow: hidden;
}

.product:hover{
    .product-img{
        transform: scale(1.1);
    }
}

.product{
    margin: 1rem;
    cursor: pointer;
}

</style>