<script setup>
import {onMounted, ref, watch } from 'vue'
import formatPrice from '../price.js';

const props = defineProps(
    {
        product: Object,
        prices: Array
    }
)

const priceContainer = ref(null)

const emit = defineEmits(['back'])

console.log(props.product)
console.log(props.prices)

const quanitity = ref(1)

watch(()=> {
    if (quanitity.value <= 1){
        quanitity.value = 1
    }
    if (quanitity.value >= 4){
        quanitity.value = 4
    }
})

const selectPrice = (id) => {
    console.log('price id =' + id)
    const active = priceContainer.value.querySelector('.selected')
    if (active != null){
        active.classList.remove("selected")
    }
    console.log(document.getElementById(id).classList)
    document.getElementById(id).classList.add("selected")
    console.log(document.getElementById(id).classList)
}
</script>
<template>
    <div class="hand-font" id="container">
        
        <div style="text-align: left;">
            <button class="default-button" style="margin-bottom: 3rem;" @click="emit('back', false)">< Back</button>
            <div class="product-img-div"> 
                <img v-if="product != null" class="product-img" :alt="product.Name" :src="`https://res.cloudinary.com/dy6sxilvq/image/upload/v1725293732/cakes/${product.Image}.png`" />
            </div>
            {{ product.Name }}<br><br>
            {{ product.Description }}
        </div>
        <div style="text-align: left; padding: 2rem;">
            <div id="price-container" ref="priceContainer">
                Sizes:
                <div v-for="(price, index) in prices" :key="index" :id="'price-' + index" class="price default-button" v-if="prices != null">
                    <span  @click="selectPrice('price-' + index)">{{ price.Size }}: {{ formatPrice(price.Price) }}</span>
                </div>
            </div>
            <div style="border: solid 2px var(--main-mono);
             width: 2rem; display: inline-block; text-align: center; margin-left: 1rem; margin-right: 1rem;
             border-radius: 0.5rem;">
                {{ quanitity }}
            </div>
            <button class="default-button qty-button" id="min-button" @click="quanitity--">−</button>
             <button class="default-button qty-button" id="plus-button" @click="quanitity++">+</button><br>
            
            <p>Notes:</p>
            <textarea class="hand-font" placeholder="Request birthday notes, etc."  style="height: 6rem; width: 40vw ; padding: 1rem;"></textarea>
            <button class="default-button" style="margin: 1rem; width: 6rem;">Add to Cart</button>
        </div>

    </div>
</template>
<style scoped>

#price-container{
    margin-bottom: 1rem;
}
.price{
    background-color: var(--main-mono);
    margin-right: 1rem;
    display: inline;
    cursor: pointer;
}
.qty-button{
    padding: 0.4rem;
    background-color: var(--main-mono);
    margin-right: 0.5rem;
}
#container{
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 70vw;
    margin-top: 3rem;
}

.selected{
    background-color: var(--accent-color);
}
</style>