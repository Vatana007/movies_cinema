<template>
    <div class="auth-layout minimal-style">
        <div class="grid-bg"></div>

        <div class="auth-container">
            <div class="brand-header">
                <PhFilmStrip :size="32" weight="duotone" color="var(--color-accent)" />
                <span class="logo-text">CINE<span class="highlight">MAX</span></span>
            </div>

            <slot />

            <div class="auth-footer">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
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
    background-color: #09090b;
    /* Deep black-gray */
    color: #e4e4e7;
    position: relative;
    font-family: 'Inter', sans-serif;
}

/* Grid Pattern Background */
.grid-bg {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
    pointer-events: none;
}

.auth-container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 380px;
    /* Smaller container width */
    display: flex;
    flex-direction: column;
}

.brand-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: white;
}

.highlight {
    color: var(--color-accent);
}

.auth-footer {
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 20px;
    font-size: 0.75rem;
    color: #71717a;
}

.auth-footer a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
}

.auth-footer a:hover {
    color: var(--color-accent);
}
</style>