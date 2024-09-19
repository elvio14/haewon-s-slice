<script setup>
import { ref, onMounted } from 'vue'
import formatPrice from '../price'

const props = defineProps({
    ids: Object,
    products: Array
})

const items = ref()

const getCart = async () => {
    try {
        const response = await fetch(`http://localhost:8080/cart_items/${props.ids.cart_id}`, {
            method: 'GET'
        })
        if(!response.ok){
            throw new Error("response not ok" + response.json())
        }
        items.value = await response.json()
        console.log(items.value)
    } catch (error) {
        console.error(error)
    }
}

const getProductInCart = (productID) => {
    const product = props.products.find(item => item.ProductID == productID)
    console.log(product)
    return product
}

onMounted(getCart)

</script>
<template>
<div id="container" class="hand-font">
   <span style="color: var(--accent-color);">CART</span> 
<br>
<span v-if="items == null" >Your cart is empty!</span>
<div class="cart-item" style="color: var(--accent-color);">
    <span>Image</span>
    <span>Name</span>
    <span>Notes</span>
    <span>Qty.</span>
    <span>Size</span>
    <span>Price</span>
    <span></span>
</div>
<div v-for="item in items" :key="item.CartItemID" class="cart-item">
    <img class="product-img" :alt="getProductInCart(item.product_id).Name" :src="`https://res.cloudinary.com/dy6sxilvq/image/upload/v1725293732/cakes/${getProductInCart(item.product_id).Image}.png`" />
    <div>{{ getProductInCart(item.product_id).Name }}</div>
    <div class="placeholder" style="overflow-y: auto;">{{ item.Notes}} </div> 
    <div>{{ item.Quantity }} </div>
    <div>{{item.Size}}</div> 
    <div>{{ formatPrice(item.Price) }}</div>
    <div style="cursor: pointer;">
        <svg id="trash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" xml:space="preserve">
            <g transform="matrix(1.0839428372 0 0 1.0839428372 12.3247727194 5.5825036808)" id="wshyW0qI_tDK8KSv9FuIv"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -8.28724 1.25217 L 8.28725 1.25217 L 8.28725 -1.25218 L -8.28724 -1.25218 z" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.0839428372 12.2396317857 2.8796129546)" id="Arw8m8BVt0e6OfB2ABzfI"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -3.88336 0.96321 L -3.88336 -1.17191 L 3.88336 -1.17191 L 3.88336 1.17191" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.0839428372 12.2396317857 14.7441770527)" id="Tb2BghP7BdB8ot7-d-wrJ"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -7.02609 -7.2 L -6.40001 7.2 L 6.61436 7.2 L 7.02607 -7.2" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.0839428372 7.5519398008 14.4048558167)" id="4QHxkq0bZM9Ll9gikgJKp"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -0.30142 -5.6 L 0.30142 5.6" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.0839428372 10.2885333784 14.4048558167)" id="hLQApZGZLMvtAWv2-vEK5"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -0.21739 -5.46087 L 0.21739 5.46087" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.0839428372 12.6289271638 14.4802605358)" id="gq--3j9lQg4Hv7HWecy7E"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -0.00097 -5.35652 L 0.00097 5.35652" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0832825285 -0.0378290595 0.0387585086 1.1098984696 15.2423790804 14.5598068824)" id="_PkGFwJfaTh3gLcaqDufF"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0.26087 -5.32174 L -0.26087 5.32174" stroke-linecap="round" />
            </g>
            <g transform="matrix(1.0839428372 0 0 1.1168144926 17.4991096433 14.6122187943)" id="3Frev3XN2uVXKJkbhQRHz"  >
            <path style="stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0.29565 -5.23478 L -0.29565 5.234789999999999" stroke-linecap="round" />
            </g>
        </svg>
    </div>
</div>
<button class="default-button" style="position: relative; left: 50%; margin-top: 2rem">Checkout</button>
</div>
</template>
<style scoped>
path{
    stroke: var(--main-color) !important;
}
.placeholder::before{
    content: "No notes added.";
    color: var(--main-mono-var)
}

.placeholder:not(:empty)::before{
    display: none;
}
.cart-item{
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1fr;
    border-bottom: solid 1px var(--main-mono);
    width: 85vw;
    align-items: center;
}

</style>