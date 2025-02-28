import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'
import { useAuthStore } from './store/useAuthStore'


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.token) {
        next('/login')
    } else if (['/login', '/register-user', '/register-tatto'].includes(to.path) && authStore.token) {
        next('/')
    } else {
        next()
    }
})

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Vue3Toastify, {
        autoClose: 1500,
        position: 'top-right',
        theme: 'dark',
        clearOnUrlChange: false
    })
    .mount('#app')
