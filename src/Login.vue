<script setup>
import {ref} from 'vue'

const user = ref('')
const pass = ref('')

const login = async () =>{
    try {
        const response = await fetch("http://localhost:8080/login", {
            method: 'POST',
            body: JSON.stringify({
                username: user.value,
                password: pass.value
            })
        })
        
        const data = await response.json()
        
        localStorage.setItem('token',data.token)

        window.location.replace("/admin")
    } catch(err){
        console.error(err)
    }
}

</script>
<template>
    <div id="login">
        <h2>Hi Admin!</h2>
        <p>Please log in</p><br>
        <input v-model="user" placeholder="username" class="input"><br>
        <input v-model="pass" placeholder="password" class="input" type="password"><br>
        <button @click="login()">Login</button>
    </div>
</template>
<style scoped>
button{
    padding: 0.5rem;
    background-color: var(--main-color);
    border: none;
    cursor: pointer;
    margin: 1rem;
}
button:hover{
    color: white;
}
.input{
    margin: 0.5rem;
    padding: 0.2rem;
    border-radius: 0.5rem;
}
#login{
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%,-50%);
    text-align: center;
}
</style>