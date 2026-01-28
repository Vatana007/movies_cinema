import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Import CSS
import './assets/styles/variables.css'
import './assets/styles/base.css'
import './assets/styles/main.css'

import { useAuthStore } from '@/store/authStore' // Import the store

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // 1. Install Pinia first
app.use(router)

// 2. Initialize Auth Check (Must happen after Pinia is installed)
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')