import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Admin from './Admin.vue'
import Login from './Login.vue'
import router from './Router.js'

createApp(App).use(router).mount('#app')
createApp(Admin).mount('#admin')
createApp(Login).mount('#login')
