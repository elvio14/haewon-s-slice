<script setup>
    import {ref} from 'vue'

    const imageUpdloadStatus = ref('')
    const imageFile = ref()

    const emit = defineEmits(['close'])

    const handleBackButton = () => {
        emit('close', false)
    }

    const form = ref({
        Name: '',
        Image: '',
        Name: '',
        Description: '',
        Category: '',
        CreatedAt: '',
        UpdatedAt: ''
    })

    const submitForm = () => {

    }

    const handleImageChange = () => {
        const input = document.getElementById('imageInput')
        imageFile.value = input.files
        console.log(imageFile.value)
    }

    const handleImageUpload = async () => {
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`

        imageUpdloadStatus.value = "uploading to cloud..."

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
                imageUpdloadStatus.value = 'Error uploading image, response not ok.'
                throw new Error('response not ok')
            }else{
                const data = await response.json()
                console.log(data)
                imageUpdloadStatus.value = 'Image upload successful!'
            }
        }catch(error){
            console.error(error)
            imageUpdloadStatus.value = 'Error uploading image.'
        }
    }

</script>
<template>
    <div id="container">
        <svg id="back-button" @click="handleBackButton" class="v-x" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="18" height="18" viewBox="0 0 24 24" xml:space="preserve">
            <g transform="matrix(1 0 0 1 12.3247727194 11.7435969239)" id="MyW8uzUk_I0Xghx6xDSHA"  >
            <path class="v-x-path" style=" stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -9.96728 -9.96728 L 9.96728 9.96728" stroke-linecap="round" />
            </g>
            <g transform="matrix(-1 0 0 1 12.3247738538 12)" id="qQ-lABN0jWOLKzn2C_Hp9"  >
            <path class="v-x-path" style="stroke-width: 4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;"  transform=" translate(0, 0)" d="M -9.96728 -9.96728 L 9.96728 9.96728" stroke-linecap="round" />
            </g>
        </svg>
        <form @submit.prevent="submitForm">
            <div id="form-grid">
                <input v-model="form.Name" placeholder="Product Name">
                <div>
                    <input v-on:change="handleImageChange" type="file" id="imageInput">
                    <button @click="handleImageUpload" class="default-button" style="margin-left: 1rem;">Upload</button>
                    {{ imageUpdloadStatus }}
                </div>
                
            </div>
        </form>
    </div>
</template>
<style scoped>
#form-grid{
    display: grid; 
    grid-template-rows: auto;
    gap: 1rem;
    padding: 4rem;
    text-align: center;
}
.v-x-path{
    stroke: var(--accent-mono);
}
#back-button{
    position: absolute;
    top: 5%;
    right: 4%;
    cursor: pointer;
}
#container{
    height: 90vh;
}
</style>