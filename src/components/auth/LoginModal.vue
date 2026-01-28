<template>
    <div class="auth-card">
        <h2>Welcome Back</h2>
        <form @submit.prevent="handleLogin">

            <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" placeholder="admin@cinema.com" required />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" placeholder="123" required />
            </div>

            <p v-if="authStore.error" class="error-msg">{{ authStore.error }}</p>

            <button type="submit" class="btn-submit" :disabled="authStore.loading">
                {{ authStore.loading ? 'Logging in...' : 'Login' }}
            </button>

            <div class="test-hints">
                <small><strong>Admin:</strong> admin@cinema.com / 123</small><br>
                <small><strong>User:</strong> user@cinema.com / 123</small>
            </div>

            <p class="switch-text">
                New here? <router-link to="/signup">Create Account</router-link>
            </p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        // 1. Perform Login
        await authStore.login(email.value, password.value)

        // 2. CHECK ROLE AND REDIRECT
        // If the logged-in user is an admin, go to /admin
        if (authStore.user && authStore.user.role === 'admin') {
            console.log('Redirecting to Admin Dashboard...')
            router.push('/admin')
        } else {
            // Otherwise, go to the Home page
            console.log('Redirecting to Home...')
            router.push('/')
        }

    } catch (e) {
        // Error is handled by the store and shown in the template
        console.error(e)
    }
}
</script>

<style scoped>
/* Keeping your existing styles */
.auth-card {
    background: var(--color-bg-secondary);
    padding: 30px;
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    /* Added margin to center it vertically if used as a page */
    border: 1px solid var(--color-bg-highlight);
}

.form-group {
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 12px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-bg-highlight);
    color: white;
    border-radius: 4px;
    outline: none;
}

input:focus {
    border-color: var(--color-accent);
}

.btn-submit {
    width: 100%;
    padding: 12px;
    background: var(--color-accent);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    margin-top: 10px;
}

.error-msg {
    color: #e74c3c;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.switch-text {
    margin-top: 20px;
    text-align: center;
    color: #aaa;
    font-size: 0.9rem;
}

.switch-text a {
    color: var(--color-accent);
    text-decoration: none;
}

.test-hints {
    margin-top: 15px;
    background: rgba(255, 255, 255, 0.05);
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    color: #aaa;
    font-size: 0.85rem;
}
</style>