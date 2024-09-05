import { createRouter,createWebHistory } from "vue-router";
import App from './App.vue'
import Admin from './Admin.vue'
import Login from './Login.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: App
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: { requiresAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log('before each')
    const token = localStorage.getItem('token')
  
    if(to.meta.requiresAuth){
        if(token){
            try{
                const isAdmin = fetch("http://localhost:8080/validate_admin", {
                    method: 'GET'
                })
                console.log(isAdmin)
                if(isAdmin){
                    next()
                }else{
                     window.location.replace('/login')
                }
            }catch(err){
                console.log(err)
                 window.location.replace('/login')
            }
        }else {
            console.log('token invalid')
             window.location.replace('/login')
        }
    }else{
        next()
    }
})

export default router