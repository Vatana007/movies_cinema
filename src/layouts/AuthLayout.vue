<template>
    <div class="auth-layout">
        <div class="aurora-bg">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
        </div>

        <div class="grid-pattern"></div>

        <div class="auth-content">
            <div class="brand-header" @click="$router.push('/')">
                <div class="logo-icon">
                    <PhFilmStrip :size="28" weight="duotone" />
                </div>
                <span class="logo-text">CINE<span class="highlight">MAX</span></span>
            </div>

            <router-view />

            <div class="auth-footer">
                <a href="#">Privacy</a>
                <span class="dot">•</span>
                <a href="#">Terms</a>
                <span class="dot">•</span>
                <a href="#">Help</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhFilmStrip } from '@phosphor-icons/vue'
</script>

<style scoped>
.auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #050510;
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
}

/* Background Effects */
.aurora-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
}

.blob-1 {
    top: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: #4f46e5;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #e11d48;
}

.grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
    z-index: 1;
}

.auth-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Brand Header */
.brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
    cursor: pointer;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #e11d48, #4f46e5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 15px rgba(225, 29, 72, 0.4);
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.5px;
}

.highlight {
    color: #e11d48;
}

/* Footer */
.auth-footer {
    margin-top: 30px;
    display: flex;
    gap: 10px;
    color: #666;
    font-size: 0.85rem;
}

.auth-footer a {
    color: #888;
    text-decoration: none;
    transition: 0.2s;
}

.auth-footer a:hover {
    color: white;
}

.dot {
    color: #444;
}
</style>