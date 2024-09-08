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

router.beforeEach(async (to, from, next) => {
    console.log('before each')
    const token = localStorage.getItem('token')
    if (token == null) {
        throw new Error('token is null')
    }
  
    if(to.meta.requiresAuth){
        if(token){
            try{
                const response = await fetch("http://localhost:8080/validate_admin", {
                    method: 'GET',
                    headers: {
                        token: token
                    }
                })
                if (!response.ok){
                    throw new Error('response not ok')
                }
                const isAdmin = await response.json()
                console.log(isAdmin.is_admin)
                if(isAdmin.is_admin){
                    next()
                }else{
                    //  window.location.replace('/login')
                     console.log('admin access only')
                }
            }catch(err){
                console.log(err)
                //  window.location.replace('/login')
            }
        }else {
            console.log('token invalid')
            //  window.location.replace('/login')
        }
    }else{
        next()
    }
})

export default router