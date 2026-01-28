<template>
    <div class="dashboard-view">

        <div class="welcome-banner">
            <div class="welcome-text">
                <h1>Dashboard Overview</h1>
                <p>Welcome back, Administrator. Here is what's happening today.</p>
            </div>
            <div class="date-badge">
                <PhCalendarBlank :size="18" />
                <span>{{ currentDate }}</span>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon-wrapper gradient-green">
                    <PhCurrencyDollar :size="24" weight="fill" />
                </div>
                <div class="stat-content">
                    <span class="label">Total Revenue</span>
                    <h3 class="value">${{ stats.revenue.toFixed(2) }}</h3>
                    <span class="trend up">
                        <PhTrendUp :size="14" /> +12.5%
                    </span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon-wrapper gradient-blue">
                    <PhTicket :size="24" weight="fill" />
                </div>
                <div class="stat-content">
                    <span class="label">Tickets Sold</span>
                    <h3 class="value">{{ stats.tickets }}</h3>
                    <span class="trend up">
                        <PhTrendUp :size="14" /> +5.2%
                    </span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon-wrapper gradient-orange">
                    <PhUsers :size="24" weight="fill" />
                </div>
                <div class="stat-content">
                    <span class="label">Active Users</span>
                    <h3 class="value">{{ stats.users }}</h3>
                    <span class="trend down">
                        <PhTrendDown :size="14" /> -1.1%
                    </span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon-wrapper gradient-purple">
                    <PhFilmStrip :size="24" weight="fill" />
                </div>
                <div class="stat-content">
                    <span class="label">Total Movies</span>
                    <h3 class="value">{{ stats.movies }}</h3>
                    <span class="sub-label">Library Assets</span>
                </div>
            </div>
        </div>

        <div class="split-section">

            <div class="chart-panel">
                <div class="panel-header">
                    <h3>Revenue Analytics</h3>
                    <select class="chart-filter">
                        <option>This Week</option>
                        <option>Last Month</option>
                    </select>
                </div>

                <div class="bar-chart-container">
                    <div class="chart-grid-lines">
                        <span>$1k</span>
                        <span>$500</span>
                        <span>$0</span>
                    </div>
                    <div class="bars-wrapper">
                        <div v-for="(day, index) in chartData" :key="index" class="bar-group">
                            <div class="bar-track">
                                <div class="bar-fill" :style="{ height: day.percent + '%' }" :title="'$' + day.value">
                                </div>
                            </div>
                            <span class="bar-label">{{ day.label }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="activity-panel">
                <div class="panel-header">
                    <h3>Recent Bookings</h3>
                    <router-link to="/admin/bookings" class="view-all">View All</router-link>
                </div>

                <div class="activity-list">
                    <div v-for="t in recentTransactions" :key="t.id" class="activity-item">
                        <div class="item-icon">
                            <PhReceipt :size="20" />
                        </div>
                        <div class="item-details">
                            <span class="item-title">{{ t.movie }}</span>
                            <span class="item-meta">{{ t.user }} • {{ formatDate(t.id) }}</span>
                        </div>
                        <div class="item-amount">
                            +${{ (Number(t.total) || 0).toFixed(2) }}
                        </div>
                    </div>

                    <div v-if="recentTransactions.length === 0" class="empty-list">
                        <p>No recent activity.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import {
    PhCurrencyDollar, PhTicket, PhUsers, PhFilmStrip,
    PhCalendarBlank, PhTrendUp, PhTrendDown, PhReceipt
} from '@phosphor-icons/vue'

const movieStore = useMovieStore()
const stats = ref({ revenue: 0, tickets: 0, users: 0, movies: 0 })
const recentTransactions = ref([])
const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

// Mock Chart Data (Visual Only)
const chartData = [
    { label: 'Mon', value: 120, percent: 30 },
    { label: 'Tue', value: 210, percent: 50 },
    { label: 'Wed', value: 150, percent: 40 },
    { label: 'Thu', value: 320, percent: 75 },
    { label: 'Fri', value: 280, percent: 65 },
    { label: 'Sat', value: 450, percent: 95 },
    { label: 'Sun', value: 380, percent: 80 },
]

const loadDashboardData = () => {
    try {
        // 1. Load Data
        const bookingsRaw = localStorage.getItem('allBookings')
        const usersRaw = localStorage.getItem('usersDB')

        const bookings = bookingsRaw ? JSON.parse(bookingsRaw) : []
        const users = usersRaw ? JSON.parse(usersRaw) : []

        // 2. Calculate Stats
        stats.value.users = users.length
        stats.value.movies = movieStore.movies.length

        // Filter confirmed bookings only
        const confirmed = bookings.filter(b => b.status === 'Confirmed')

        stats.value.revenue = confirmed.reduce((sum, b) => sum + (Number(b.total) || 0), 0)
        stats.value.tickets = confirmed.reduce((sum, b) => sum + (Array.isArray(b.seats) ? b.seats.length : 1), 0)

        // 3. Get Recent (Last 5)
        // Sort descending by ID (assuming ID is timestamp or sequential)
        const sorted = [...bookings].sort((a, b) => String(b.id).localeCompare(String(a.id)))
        recentTransactions.value = sorted.slice(0, 5)

    } catch (e) {
        console.error("Dashboard Load Error:", e)
    }
}

const formatDate = (id) => {
    // Try to parse ID as date, else Today
    const d = new Date(parseInt(id) || Date.now())
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(loadDashboardData)
</script>

<style scoped>
.dashboard-view {
    padding: 30px;
    color: #e4e4e7;
    font-family: 'Inter', sans-serif;
}

/* 1. Welcome Section */
.welcome-banner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
}

.welcome-text h1 {
    margin: 0 0 8px 0;
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
}

.welcome-text p {
    margin: 0;
    color: #888;
}

.date-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    padding: 8px 16px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    color: #ccc;
}

/* 2. Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
}

.stat-card {
    background: #12141a;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: transform 0.2s;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.stat-card:hover {
    transform: translateY(-3px);
}

.stat-icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.gradient-green {
    background: linear-gradient(135deg, #10b981, #059669);
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

.gradient-blue {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.gradient-orange {
    background: linear-gradient(135deg, #f97316, #ea580c);
    box-shadow: 0 4px 10px rgba(249, 115, 22, 0.3);
}

.gradient-purple {
    background: linear-gradient(135deg, #a855f7, #7c3aed);
    box-shadow: 0 4px 10px rgba(168, 85, 247, 0.3);
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-content .label {
    font-size: 0.75rem;
    color: #888;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 4px;
}

.stat-content .value {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin: 0 0 4px 0;
}

.trend {
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
}

.trend.up {
    color: #10b981;
}

.trend.down {
    color: #ef4444;
}

.sub-label {
    font-size: 0.75rem;
    color: #555;
}

/* 3. Split Section */
.split-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
}

.chart-panel,
.activity-panel {
    background: #12141a;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.panel-header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
    font-weight: 600;
}

/* Chart Styling */
.chart-filter {
    background: #1f2229;
    color: #ccc;
    border: 1px solid #333;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
}

.bar-chart-container {
    display: flex;
    height: 200px;
    position: relative;
    padding-left: 40px;
}

.chart-grid-lines {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #555;
    font-size: 0.7rem;
}

.bars-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding-left: 20px;
}

.bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.bar-track {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.bar-fill {
    width: 14px;
    background: var(--color-accent);
    border-radius: 20px;
    transition: height 0.5s ease;
    opacity: 0.8;
}

.bar-fill:hover {
    opacity: 1;
    transform: scaleX(1.2);
    cursor: pointer;
}

.bar-label {
    font-size: 0.75rem;
    color: #666;
}

/* Activity List */
.view-all {
    font-size: 0.8rem;
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 500;
}

.activity-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.activity-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-item:last-child {
    border-bottom: none;
}

.item-icon {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
}

.item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.item-title {
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
}

.item-meta {
    font-size: 0.75rem;
    color: #666;
}

.item-amount {
    font-weight: 700;
    color: #10b981;
    font-size: 0.9rem;
}

.empty-list {
    text-align: center;
    color: #555;
    font-size: 0.9rem;
    padding: 20px;
}

/* Responsive */
@media (max-width: 1100px) {
    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }

    .split-section {
        grid-template-columns: 1fr;
    }
}
</style>