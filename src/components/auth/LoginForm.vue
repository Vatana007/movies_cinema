<template>
    <div class="auth-form-container fade-in">
        <div class="form-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your account.</p>
        </div>

        <form @submit.prevent="handleLogin">
            <div class="input-group" :class="{ focused: activeField === 'email' }">
                <label>Email Address</label>
                <div class="input-wrapper">
                    <PhEnvelopeSimple :size="20" class="field-icon" />
                    <input v-model="email" type="email" placeholder="user@cinema.com" required
                        @focus="activeField = 'email'" @blur="activeField = null" />
                </div>
            </div>

            <div class="input-group" :class="{ focused: activeField === 'password' }">
                <div class="label-row">
                    <label>Password</label>
                    <a href="#" class="forgot-link">Forgot?</a>
                </div>
                <div class="input-wrapper">
                    <PhLockKey :size="20" class="field-icon" />
                    <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required
                        @focus="activeField = 'password'" @blur="activeField = null" />
                    <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
                        <component :is="showPassword ? PhEyeSlash : PhEye" :size="18" />
                    </button>
                </div>
            </div>

            <button type="submit" class="btn-primary" :disabled="authStore.loading">
                <span v-if="!authStore.loading">Sign In</span>
                <div v-else class="spinner"></div>
            </button>
        </form>

        <div class="divider">
            <span>Or continue with</span>
        </div>

        <div class="social-row">
            <button class="btn-social">
                <PhGoogleLogo :size="20" weight="bold" /> Google
            </button>
            <button class="btn-social">
                <PhFacebookLogo :size="20" weight="bold" /> Facebook
            </button>
        </div>

        <p class="switch-auth">
            Don't have an account?
            <router-link to="/register" class="link-accent">Sign up</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import {
    PhEnvelopeSimple, PhLockKey, PhEye, PhEyeSlash,
    PhGoogleLogo, PhFacebookLogo
} from '@phosphor-icons/vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const activeField = ref(null)

const handleLogin = async () => {
    try {
        await authStore.login({ email: email.value, password: password.value })
        // Redirect based on role
        if (authStore.user?.role === 'admin') {
            router.push('/admin')
        } else {
            router.push('/')
        }
    } catch (e) {
        // Errors are handled by authStore.showToast
        console.error("Login failed", e)
    }
}
</script>

<style scoped>
/* --- Container --- */
.auth-form-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    /* Glass Effect */
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* --- Headers --- */
.form-header {
    text-align: center;
    margin-bottom: 24px;
}

.form-header h2 {
    margin: 0 0 8px 0;
    font-size: 1.75rem;
    color: white;
    font-weight: 700;
}

.form-header p {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
}

/* --- Inputs --- */
.input-group {
    margin-bottom: 20px;
}

.label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

label {
    display: block;
    font-size: 0.85rem;
    color: #ccc;
    font-weight: 500;
    margin-bottom: 8px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    transition: 0.2s;
}

.input-group.focused .input-wrapper {
    border-color: #e11d48;
    /* Accent Color */
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 0 4px rgba(225, 29, 72, 0.1);
}

.field-icon {
    position: absolute;
    left: 14px;
    color: #666;
    transition: 0.2s;
}

.input-group.focused .field-icon {
    color: #e11d48;
}

input {
    width: 100%;
    padding: 12px 12px 12px 44px;
    background: transparent;
    border: none;
    color: white;
    outline: none;
    font-size: 0.95rem;
}

.toggle-pass {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.toggle-pass:hover {
    color: white;
}

/* --- Buttons --- */
.btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #e11d48, #be123c);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: 0 4px 15px rgba(225, 29, 72, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

.btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* --- Divider & Social --- */
.divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 24px 0;
    color: #555;
    font-size: 0.8rem;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
}

.social-row {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
}

.btn-social {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
    font-size: 0.9rem;
}

.btn-social:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: white;
}

/* --- Links --- */
.forgot-link {
    color: #e11d48;
    font-size: 0.85rem;
    text-decoration: none;
}

.forgot-link:hover {
    text-decoration: underline;
}

.switch-auth {
    text-align: center;
    font-size: 0.9rem;
    color: #888;
    margin: 0;
}

.link-accent {
    color: white;
    font-weight: bold;
    text-decoration: none;
    margin-left: 5px;
}

.link-accent:hover {
    color: #e11d48;
}

/* --- Animation --- */
.fade-in {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>