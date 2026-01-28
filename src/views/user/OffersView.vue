<template>
    <div class="offers-view aurora-style">

        <div class="aurora-bg">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <div class="container content-wrapper">

            <header class="page-header">
                <div class="header-text">
                    <span class="eyebrow">EXCLUSIVE DEALS</span>
                    <h1 class="glow-title">Special Offers</h1>
                </div>
            </header>

            <div class="offers-grid">

                <div class="offer-card featured-card">
                    <div class="card-content">
                        <div class="badge-row">
                            <span class="badge limited">LIMITED TIME</span>
                            <span class="badge vip">VIP MEMBERS</span>
                        </div>
                        <h2>Family Sunday Bundle</h2>
                        <p class="desc">Buy 4 tickets and get 2 large popcorn buckets + 4 drinks for free! Perfect for a
                            family getaway.</p>

                        <div class="action-row">
                            <div class="code-box" @click="copyCode('FAMSUNDAY')">
                                <span class="code-label">CODE:</span>
                                <span class="code-text">FAMSUNDAY</span>
                                <PhCopy :size="18" class="copy-icon" />
                            </div>
                            <span class="expiry">Expires: Sunday 11:59 PM</span>
                        </div>
                    </div>
                    <div class="card-visual">
                        <PhTicket :size="140" weight="duotone" class="visual-icon" />
                        <div class="visual-glow"></div>
                    </div>
                </div>

                <div v-for="offer in offers" :key="offer.id" class="offer-card glass-card">
                    <div class="card-icon-wrapper" :style="{ color: offer.color }">
                        <component :is="offer.icon" :size="32" weight="fill" />
                    </div>

                    <div class="card-content-sm">
                        <span class="offer-tag">{{ offer.tag }}</span>
                        <h3>{{ offer.title }}</h3>
                        <p>{{ offer.desc }}</p>

                        <button v-if="offer.action === 'copy'" class="btn-glass-sm" @click="copyCode(offer.code)">
                            <PhCopy :size="16" /> {{ offer.code }}
                        </button>
                        <button v-else class="btn-glass-sm" @click="$router.push('/movies')">
                            Book Now
                        </button>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import {
    PhTicket, PhCopy, PhStudent, PhCreditCard, PhPopcorn
} from '@phosphor-icons/vue'

const authStore = useAuthStore()

const offers = ref([
    {
        id: 2,
        title: 'Student Wednesday',
        desc: 'Show your student ID for a flat 30% discount on all 2D movies.',
        tag: 'STUDENTS',
        icon: PhStudent,
        color: '#4f46e5',
        action: 'book',
        code: ''
    },
    {
        id: 3,
        title: 'Visa Weekend',
        desc: 'Get 1 Free Ticket when you buy 2 using your Visa Infinite card.',
        tag: 'PARTNER',
        icon: PhCreditCard,
        color: '#06b6d4',
        action: 'copy',
        code: 'VISAWO'
    },
    {
        id: 4,
        title: 'Snack Attack',
        desc: '50% off on all heavy combos when booking online.',
        tag: 'FOOD & BEVERAGE',
        icon: PhPopcorn,
        color: '#f59e0b',
        action: 'copy',
        code: 'YUMMY50'
    }
])

const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    authStore.showToast(`Code ${code} copied to clipboard!`, 'success')
}
</script>

<style scoped>
/* --- 1. Background (Matches Other Views) --- */
.offers-view {
    position: relative;
    min-height: 100vh;
    background-color: #050510;
    overflow: hidden;
    padding-top: 100px;
    padding-bottom: 60px;
    color: white;
}

.aurora-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 10s infinite alternate;
}

.blob-1 {
    top: -10%;
    left: 20%;
    width: 600px;
    height: 600px;
    background: #4f46e5;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #ec4899;
    animation-delay: -5s;
}

.blob-3 {
    top: 40%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: #06b6d4;
    animation-duration: 15s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) scale(1);
    }

    100% {
        transform: translate(30px, 50px) scale(1.1);
    }
}

.content-wrapper {
    position: relative;
    z-index: 2;
}

/* --- 2. Header --- */
.page-header {
    margin-bottom: 50px;
    text-align: center;
}

.eyebrow {
    font-size: 0.8rem;
    color: var(--color-accent);
    letter-spacing: 3px;
    font-weight: 700;
    display: block;
    margin-bottom: 8px;
}

.glow-title {
    font-size: 3rem;
    margin: 0;
    font-weight: 800;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
}

/* --- 3. Grid Layout --- */
.offers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

/* Featured Card (Spans Full Row on Mobile, 2 cols on Desktop) */
.featured-card {
    grid-column: span 3;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(236, 72, 153, 0.9));
    border-radius: 24px;
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(79, 70, 229, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-content {
    z-index: 2;
    max-width: 60%;
}

.badge-row {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}

.badge {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
}

.badge.limited {
    background: white;
    color: black;
}

.badge.vip {
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.featured-card h2 {
    font-size: 2.2rem;
    margin: 0 0 12px 0;
    line-height: 1.1;
}

.desc {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 24px;
    line-height: 1.6;
}

.action-row {
    display: flex;
    align-items: center;
    gap: 20px;
}

.code-box {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    border: 1px dashed rgba(255, 255, 255, 0.4);
    transition: 0.2s;
}

.code-box:hover {
    background: white;
    color: black;
    border-color: white;
}

.code-label {
    font-size: 0.8rem;
    opacity: 0.7;
}

.code-text {
    font-weight: 800;
    font-family: monospace;
    font-size: 1.2rem;
}

.expiry {
    font-size: 0.85rem;
    opacity: 0.7;
}

/* Visual Side of Featured Card */
.card-visual {
    position: absolute;
    right: -20px;
    bottom: -40px;
    z-index: 1;
    transform: rotate(-15deg);
}

.visual-icon {
    color: rgba(255, 255, 255, 0.15);
}

/* --- 4. Standard Glass Cards --- */
.glass-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: 0.3s;
}

.glass-card:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.card-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
}

.offer-tag {
    font-size: 0.7rem;
    font-weight: 700;
    color: #888;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 6px;
}

.glass-card h3 {
    margin: 0 0 8px 0;
    font-size: 1.4rem;
}

.glass-card p {
    margin: 0 0 20px 0;
    color: #aaa;
    font-size: 0.95rem;
    line-height: 1.5;
    flex: 1;
}

.btn-glass-sm {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: 0.2s;
}

.btn-glass-sm:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
}

/* Responsive */
@media (max-width: 900px) {
    .offers-grid {
        grid-template-columns: 1fr;
    }

    .featured-card {
        grid-column: span 1;
        flex-direction: column;
        text-align: center;
    }

    .card-content {
        max-width: 100%;
    }

    .action-row {
        flex-direction: column;
        width: 100%;
    }

    .badge-row {
        justify-content: center;
    }

    .card-visual {
        display: none;
    }
}
</style>