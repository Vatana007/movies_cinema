<template>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h2>Create Account</h2>
                <p>Join CineMax for exclusive rewards</p>
            </div>

            <form @submit.prevent="handleSignup" class="auth-form">

                <div class="form-group">
                    <label>Full Name</label>
                    <div class="input-wrapper">
                        <PhUser :size="20" />
                        <input type="text" placeholder="John Doe" required />
                    </div>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <div class="input-wrapper">
                        <PhEnvelopeSimple :size="20" />
                        <input type="email" placeholder="user@example.com" required />
                    </div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <div class="input-wrapper">
                        <PhLockKey :size="20" />
                        <input type="password" placeholder="Create a password" required />
                    </div>
                </div>

                <button type="submit" class="btn-submit">Sign Up</button>
            </form>

            <div class="auth-footer">
                <p>Already have an account? <router-link to="/login">Sign In</router-link></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { PhUser, PhEnvelopeSimple, PhLockKey } from '@phosphor-icons/vue'

const router = useRouter()

const handleSignup = () => {
    // Logic to call authStore.signup() would go here
    alert("Account Created!")
    router.push('/')
}
</script>

<style scoped>
/* Reusing the same auth styles for consistency */
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at center, #1f232e 0%, var(--color-bg-primary) 100%);
}

.auth-card {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-bg-highlight);
    box-shadow: var(--shadow-card);
}

.auth-header {
    text-align: center;
    margin-bottom: 32px;
}

.auth-header h2 {
    font-size: 1.8rem;
    margin-bottom: 8px;
}

.auth-header p {
    color: var(--color-text-muted);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

.input-wrapper {
    display: flex;
    align-items: center;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-bg-highlight);
    border-radius: var(--radius-md);
    padding: 10px 14px;
    gap: 12px;
    color: var(--color-text-muted);
}

.input-wrapper input {
    background: transparent;
    border: none;
    outline: none;
    color: var(--color-text-main);
    flex: 1;
    font-size: 1rem;
}

.btn-submit {
    width: 100%;
    padding: 14px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
}

.btn-submit:hover {
    background: #f40612;
}

.auth-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

.auth-footer a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
}
</style>