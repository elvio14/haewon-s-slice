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
    <div id="products-grid">
        <div class="product hand-font" v-for="product in products" :key="product.product_id">
            <div class="product-img-div">
                <img class="product-img" :alt="product.Name" :src="`https://res.cloudinary.com/dy6sxilvq/image/upload/v1725293732/cakes/${product.Image}.png`" />
            </div>
            {{ product.Name }}
        </div>
    </div>
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