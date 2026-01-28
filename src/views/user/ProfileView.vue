<template>
    <div class="profile-view aurora-style">

        <div class="aurora-bg">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <div class="container content-wrapper">

            <header class="profile-header">
                <div class="user-welcome">
                    <div class="avatar-lg">
                        {{ getInitials(authStore.user?.name) }}
                    </div>
                    <div>
                        <h1 class="glow-title">{{ authStore.user?.name }}</h1>
                        <p class="email">{{ authStore.user?.email }}</p>
                    </div>
                </div>

                <div class="loyalty-glass-card">
                    <div class="loyalty-info">
                        <span class="status-badge">
                            <PhCrown weight="fill" color="#ffd700" /> {{ userLevel }} Member
                        </span>
                        <div class="points-wrap">
                            <span class="big-points">{{ authStore.user?.points || 0 }}</span>
                            <span class="pts-label">PTS</span>
                        </div>
                        <p class="next-reward">
                            {{ pointsToNextReward }} pts until next reward
                        </p>
                    </div>

                    <div class="progress-ring-container">
                        <svg class="progress-ring" width="120" height="120">
                            <circle class="progress-ring__circle-bg" stroke="rgba(255,255,255,0.1)" stroke-width="8"
                                fill="transparent" r="52" cx="60" cy="60" />
                            <circle class="progress-ring__circle" stroke="#ffd700" stroke-width="8" fill="transparent"
                                r="52" cx="60" cy="60" :stroke-dasharray="circumference + ' ' + circumference"
                                :stroke-dashoffset="strokeDashoffset" />
                        </svg>
                        <PhGift :size="32" weight="duotone" class="center-icon" />
                    </div>
                </div>
            </header>

            <section class="tickets-section">
                <div class="section-header">
                    <h2>My Bookings</h2>
                    <div class="tabs">
                        <button class="tab active">Upcoming</button>
                        <button class="tab">History</button>
                    </div>
                </div>

                <div v-if="activeTickets.length === 0" class="empty-state">
                    <PhTicket :size="64" weight="thin" />
                    <h3>No tickets yet</h3>
                    <p>Your movie journey starts here.</p>
                    <button class="btn-explore" @click="$router.push('/movies')">Browse Movies</button>
                </div>

                <div class="tickets-grid">
                    <div v-for="ticket in activeTickets" :key="ticket.id" class="ticket-pass">
                        <div class="ticket-left">
                            <img :src="ticket.poster" class="ticket-poster" loading="lazy">
                        </div>

                        <div class="ticket-center">
                            <h3>{{ ticket.title }}</h3>
                            <div class="ticket-meta">
                                <div class="meta-item">
                                    <span class="label">Cinema</span>
                                    <span class="val">{{ ticket.cinema }}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="label">Date</span>
                                    <span class="val">{{ ticket.date }}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="label">Time</span>
                                    <span class="val">{{ ticket.time }}</span>
                                </div>
                                <div class="meta-item">
                                    <span class="label">Seats</span>
                                    <span class="val highlight">{{ Array.isArray(ticket.seats) ? ticket.seats.join(', ')
                                        : ticket.seats }}</span>
                                </div>
                            </div>
                            <div v-if="ticket.extras && ticket.extras !== 'None'" class="extras-tag">
                                <PhPopcorn :size="14" /> {{ ticket.extras }}
                            </div>
                        </div>

                        <div class="ticket-right">
                            <div class="qr-box">
                                <PhQrCode :size="80" />
                            </div>
                            <span class="ticket-id">#{{ ticket.id }}</span>
                        </div>

                        <div class="rip-circle top"></div>
                        <div class="rip-circle bottom"></div>
                    </div>
                </div>
            </section>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { PhCrown, PhGift, PhTicket, PhQrCode, PhPopcorn } from '@phosphor-icons/vue'

const authStore = useAuthStore()
const activeTickets = computed(() => authStore.userTickets)

// --- HELPERS ---
const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'

// --- LOYALTY LOGIC ---
const userPoints = computed(() => authStore.user?.points || 0)
const maxPoints = 200 // Threshold for next reward
const radius = 52
const circumference = 2 * Math.PI * radius

const strokeDashoffset = computed(() => {
    const progress = Math.min(userPoints.value / maxPoints, 1)
    return circumference - (progress * circumference)
})

const userLevel = computed(() => {
    if (userPoints.value > 500) return 'Platinum'
    if (userPoints.value > 200) return 'Gold'
    return 'Silver'
})

const pointsToNextReward = computed(() => {
    const remainder = userPoints.value % 200
    return 200 - remainder
})
</script>

<style scoped>
/* --- 1. Background (Matches Home) --- */
.profile-view {
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
    right: -10%;
    width: 600px;
    height: 600px;
    background: #4f46e5;
}

.blob-2 {
    bottom: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: #ec4899;
    animation-delay: -5s;
}

.blob-3 {
    top: 40%;
    left: 30%;
    width: 300px;
    height: 300px;
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

/* --- 2. Header & Loyalty --- */
.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
    flex-wrap: wrap;
    gap: 30px;
}

.user-welcome {
    display: flex;
    align-items: center;
    gap: 20px;
}

.avatar-lg {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #4f46e5, #ec4899);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.glow-title {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 800;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.email {
    color: #aaa;
    margin: 0;
}

/* Loyalty Card (Glass) */
.loyalty-glass-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    gap: 30px;
    min-width: 350px;
}

.loyalty-info {
    flex: 1;
}

.status-badge {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;
    padding: 4px 10px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    border: 1px solid rgba(255, 215, 0, 0.2);
}

.points-wrap {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.big-points {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
    color: white;
}

.pts-label {
    font-size: 0.9rem;
    font-weight: 700;
    color: #aaa;
}

.next-reward {
    margin: 4px 0 0 0;
    font-size: 0.8rem;
    color: #888;
}

/* Progress Ring */
.progress-ring-container {
    position: relative;
    width: 120px;
    height: 120px;
}

.progress-ring {
    transform: rotate(-90deg);
}

.progress-ring__circle {
    transition: stroke-dashoffset 0.5s ease-in-out;
    stroke-linecap: round;
}

.center-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.5);
}

/* --- 3. Tickets --- */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.section-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.tabs {
    background: rgba(255, 255, 255, 0.05);
    padding: 4px;
    border-radius: 50px;
    display: flex;
    gap: 4px;
}

.tab {
    background: transparent;
    border: none;
    color: #aaa;
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.tab.active {
    background: var(--color-accent);
    color: white;
}

.tickets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 30px;
}

/* Ticket Pass Style */
.ticket-pass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    height: 180px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
}

.ticket-pass:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
}

.ticket-left {
    width: 120px;
    flex-shrink: 0;
}

.ticket-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ticket-center {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 2px dashed rgba(255, 255, 255, 0.1);
}

.ticket-center h3 {
    margin: 0 0 12px 0;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ticket-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.meta-item {
    display: flex;
    flex-direction: column;
}

.meta-item .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    color: #777;
}

.meta-item .val {
    font-size: 0.85rem;
    font-weight: 500;
    color: #ddd;
}

.meta-item .val.highlight {
    color: var(--color-accent);
    font-weight: 700;
}

.extras-tag {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    width: fit-content;
}

.ticket-right {
    width: 100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
}

.qr-box {
    background: white;
    padding: 6px;
    border-radius: 8px;
    margin-bottom: 6px;
    color: black;
    display: flex;
}

.ticket-id {
    font-family: monospace;
    font-size: 0.75rem;
    color: #777;
}

/* Rip Circles */
.rip-circle {
    position: absolute;
    right: 90px;
    width: 20px;
    height: 20px;
    background: #050510;
    /* Match background */
    border-radius: 50%;
}

.rip-circle.top {
    top: -10px;
}

.rip-circle.bottom {
    bottom: -10px;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px;
    color: #555;
}

.btn-explore {
    margin-top: 20px;
    background: var(--color-accent);
    border: none;
    padding: 10px 24px;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

@media (max-width: 900px) {
    .profile-header {
        flex-direction: column;
        text-align: center;
    }

    .loyalty-glass-card {
        width: 100%;
        justify-content: space-between;
    }

    .tickets-grid {
        grid-template-columns: 1fr;
    }

    .user-welcome {
        flex-direction: column;
    }
}
</style>