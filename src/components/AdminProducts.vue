<script setup>
    import {onMounted, ref, computed} from 'vue'
    import convertTime from '../time.js'
    import formatPrice from '../price.js';
    import AdminAddProduct from './AdminAddProduct.vue';

    const products = ref()
    const prices = ref()
    const productShown = ref(null)
    const pricesShown = ref([])
    const editPrice = ref('')
    const inputPrice = ref(0)
    const inputSize = ref('')
    const inputActive = ref(false)
    const showAddProduct = ref(false)
    const changeImage = ref(false)
    const changeImageStatus = ref('')
    const imageFile = ref()

    const consoleResponses = ref('')
    const fetchAll = async () => {
        products.value = []
        prices.value = []
        pricesShown.value = []
        try {
            const response = await fetch("http://localhost:8080/products", {
                method: 'GET'
            })

            const data = await response.json()
            products.value = data
        } catch (error) {
            console.error(error)
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
        getPricesToRef(productShown.value.ProductID)
    }

    onMounted(fetchAll)

    const getPricesToRef = (id) => {
        const pricesFound = prices.value.filter(item => item.product_id == id)
        for(const price of pricesFound){
            pricesShown.value.push(price)
        }
    }

    const getDetailsClick = (id) => {
        const productFound = products.value.find(item => item.ProductID == id)
        productShown.value = productFound

        pricesShown.value = []

        getPricesToRef(id)

        editPrice.value = ''
    }

    const tableStyle = (id, index) => {
        const style = {}
        if(index % 2 == 0){
            style.backgroundColor = 'var(--main-mono-var)'
        }
        if(productShown.value != null && productShown.value.ProductID == id){
            style.border = 'solid 3px var(--accent-color)'
        }
        return style
    }

    const handleEditPrice = (size, price) => {
        inputSize.value = size
        inputPrice.value = price

        editPrice.value = size
    }

    const handlePriceVButton = async (size, price) => {
        const productID = productShown.value.ProductID
        const inputs = document.querySelectorAll('input-price')
        inputs.forEach(input => input.blur())
        try{
            const response = await fetch(`http://localhost:8080/products/price/ID/${productID}/${size}/${price}`, {
                method: 'PUT',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            const resJSON = await response.json()
            consoleResponses.value = resJSON.message
        }catch(error){
            console.error(error)
        }
        editPrice.value = ''
        fetchAll()
    }

    const handlePriceXButton = () => {
        editPrice.value = ''
    }

    const handleAddButton = () => {
        showAddProduct.value = true
    }

    const handleImageChange = () => {
        const input = document.getElementById('imageInput')
        imageFile.value = input.files
        console.log(imageFile.value)
    }

    const handleImageDelete = async (publicID) => {
        console.log(publicID)
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/destroy`

        const unixTimeNow = Math.floor(Date.now() / 1000)

        const signature = `public_id=${publicID}&timestamp=${unixTimeNow}${import.meta.env.VITE_CLOUDINARY_SECRET}`

        const buffer = new TextEncoder().encode(signature)

        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        const formData = new FormData()
        formData.append('public_id', publicID)
        formData.append('signature', hashSignature)
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
        formData.append('timestamp', unixTimeNow)

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })

            if(!response.ok){
                throw new Error('Response not ok')
            } else {
                const data = await response.json()
                console.log(data)
                consoleResponses.value = `deleted image ${publicID} from cloud storage.`
            }
        }catch(error){
            console.error(error)
        }
    }

    const handleChangeImage = async (publicID) => {
        handleImageDelete(publicID)
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`

        changeImageStatus.value = "uploading to cloud..."

        const formData = new FormData()
        formData.append('file', imageFile.value[0])
        formData.append('upload_preset', 'lqlbrv7e')
        formData.append('public_id', imageFile.value[0].name)
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })
        
            if(!response.ok){
                changeImageStatus.value = 'Error uploading image, response not ok.'
                throw new Error('response not ok')
            }else{
                const data = await response.json()
                console.log(data)
                changeImageStatus.value = 
                consoleResponses.value = `Image upload successful! `
            }
        }catch(error){
            console.error(error)
            changeImageStatus.value = 'Error uploading image.'
        }
    }

</script>
<template>
    <div id="container">
        <div id="product-grid-container" style="overflow-y: scroll;" v-if="!showAddProduct">
            <div id="product-grid" v-for="(product, index) in products" :key="index" @click="getDetailsClick(product.ProductID)" 
                :style="tableStyle(product.ProductID, index)">
                <div>{{ product.Name }}</div>
                <div style="text-align: center;">{{ product.ProductID }}</div>
                <div style="height: 2.8rem; overflow-y: hidden;">{{ product.Description }}</div>
            </div>
        </div>
        <div id="details" v-if="productShown != null && !showAddProduct">
            <div id="add-button" @click="handleAddButton" style="position: absolute; top: 50%; right: 2%; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 24 24" xml:space="preserve">
                    <g transform="matrix(1.1302774366 0 0 1.1302774366 12 12)" id="qhuVgXXD_wmZC5GNjSKhp"  >
                    <path style="stroke: rgb(255,255,255); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(27,139,37); fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -10.5 C 5.796 -10.5 10.5 -5.796 10.5 0 C 10.5 5.796 5.796 10.5 0 10.5 C -5.796 10.5 -10.5 5.796 -10.5 0 C -10.5 -5.796 -5.796 -10.5 0 -10.5 z" stroke-linecap="round" />
                    </g>
                    <g transform="matrix(1 0 0 1 12 12.0789473684)" id="RJPhWCxg9dEili2RGnAm8"  >
                    <path style="stroke: rgb(255,255,255); stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M 0 -9.11842 L 0 9.11842" stroke-linecap="round" />
                    </g>
                    <g transform="matrix(1 0 0 1 11.9407894737 12.0394736842)" id="XlutKR7M0MCIGka_KnvSW"  >
                    <path style="stroke: rgb(255,255,255); stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -8.64474 -0.03947 L 8.644730000000001 0.03948000000000001" stroke-linecap="round" />
                    </g>
                </svg>
            </div>
            <!-- IMAGE -->
            <div style="text-align: center;">
                <img @click="changeImage = !changeImage" class="product-img" :alt="productShown.Name" :src="`https://res.cloudinary.com/dy6sxilvq/image/upload/v1725293732/cakes/${productShown.Image}.png`" />
                <div v-if="changeImage">
                    <input type="file" id="new-image" v-on:change="handleImageChange"><br>
                    <button style="margin-top: 1rem;" class="default-button" @click="handleChangeImage">Change</button>
                    {{ changeImageStatus }}
                </div>
            </div>
            <!-- PRICE DETAILS -->
            <div>
                {{ productShown.Name }}<img src="/edit_icon.svg" alt="edit button" class="edit-button"></img>
                <br>
                <div id="price-container">
                    <div v-for="price in pricesShown" class="price" v-if="pricesShown != null">
                        <span v-if="editPrice != price.Size"  @click="handleEditPrice(price.Size, price.Price)">{{ price.Size }}: {{ formatPrice(price.Price) }}</span>
                        <span v-if="editPrice == price.Size">
                            <input class="input-price" v-model="inputSize" placeholder="size" style="margin-right: 1rem;">
                            <input class="input-price" v-model="inputPrice" placeholder="price in cents">
                            <!-- V button -->
                            <svg @click="handlePriceVButton(inputSize, inputPrice)" class="v-x" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24" xml:space="preserve">
                                <g transform="matrix(0.9755268483 0 0 0.9552998542 12 11.9531419605)" id="fwBXqe2hkyL4fQXEJWsVn"  >
                                <path class="v-x-path" style=" stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -10.51974 -0.33433 L -3.578150000000001 10.25257 C -3.550220000000001 10.29517 -3.5034400000000008 10.32086 -3.453240000000001 10.32117 C -3.403040000000001 10.321480000000001 -3.355960000000001 10.29637 -3.327520000000001 10.25412 L 10.51973 -10.321169999999999" stroke-linecap="round" />
                                </g>
                            </svg>
                            <!-- X button -->
                            <svg @click="handlePriceXButton" class="v-x" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24" xml:space="preserve">
                                <g transform="matrix(1 0 0 1 12.3247727194 11.7435969239)" id="MyW8uzUk_I0Xghx6xDSHA"  >
                                <path class="v-x-path" style=" stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -9.96728 -9.96728 L 9.96728 9.96728" stroke-linecap="round" />
                                </g>
                                <g transform="matrix(-1 0 0 1 12.3247738538 12)" id="qQ-lABN0jWOLKzn2C_Hp9"  >
                                <path class="v-x-path" style="stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -9.96728 -9.96728 L 9.96728 9.96728" stroke-linecap="round" />
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                <br>
                <span class="smaller"> Updated At:</span>
                <div class="smaller" style="overflow-y: hidden">{{ convertTime(productShown.UpdatedAt) }}</div>
                <span class="smaller"> Created At:</span>
                <div class="smaller" style="overflow-y: hidden">{{ convertTime(productShown.CreatedAt) }}</div>
                
            </div>
        </div>
        <AdminAddProduct v-if="showAddProduct" @close="(show) => showAddProduct = show"/>


        <div style="padding: 0.2rem; background-color: var(--main-color);font-size: smaller;">
            console:{{ consoleResponses }}
        </div>
    </div>
</template>
<style scoped>
#price-container {
    max-width: 25vw;
    overflow-x: scroll;
    scrollbar-width: none;
    display: grid;
    grid-template-rows: 1fr 1fr;
}
.v-x{
    margin-left: 0.4rem;
    cursor: pointer;
    stroke: var(--accent-color) !important;
    height: 1rem;
}

.v-x:hover{
    stroke: var(--main-color) !important;
}
.input-price{
    width: 4rem;
}
.product-img{
    border-radius: 1rem;
    cursor: pointer;
    border:solid 3px transparent;
}
.price:hover,.product-img:hover{
    border: solid 3px var(--main-color);
}
.price{
    background-color: var(--main-mono); color: var(--accent-mono); padding: 0.5rem; border-radius: 1rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    width: max-content;
    cursor: pointer;
    border:solid 3px transparent;
    font-weight: bold;
}
.smaller{
    font-size: x-small;
}

#details{
    background-color: var(--accent-mono);
    padding: 2rem;
    color: var(--main-mono);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.editable{
    display: grid;
    grid-template-columns: auto 1rem;
    gap: 0.2rem;
}
.edit-button{
    width: 0.8rem;
    cursor: pointer;
    padding-top: 0.4rem;
}
#product-grid{
    padding: 0.2rem;
    display: grid;
    grid-template-columns: 1fr 0.5fr 2fr;
    gap: 0px;
    background-color: var(--main-mono);
    cursor: pointer;
}
#container{
    display: grid;
    grid-template-rows: 5fr 3fr;
    max-height: 100vh;
    border: solid 10px var(--accent-mono);
}
</style>