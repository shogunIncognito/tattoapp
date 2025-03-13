import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { createPinia } from 'pinia'
import { clerkPlugin } from '@clerk/vue'

const pinia = createPinia()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
}

createApp(App)
    .use(router)
    .use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
    .use(pinia)
    .use(Vue3Toastify, {
        autoClose: 3000,
        position: 'top-right',
        theme: 'dark',
        clearOnUrlChange: false
    })
    .mount('#app')
