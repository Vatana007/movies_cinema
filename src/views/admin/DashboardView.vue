<template>
    <div class="dashboard-grid">

        <div class="stat-card">
            <div class="stat-icon revenue">
                <PhCurrencyDollar :size="24" />
            </div>
            <div>
                <p class="stat-label">Total Revenue</p>
                <h3>${{ stats.revenue.toFixed(2) }}</h3>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon bookings">
                <PhTicket :size="24" />
            </div>
            <div>
                <p class="stat-label">Total Bookings</p>
                <h3>{{ stats.bookings }}</h3>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon users">
                <PhUsers :size="24" />
            </div>
            <div>
                <p class="stat-label">Active Users</p>
                <h3>{{ stats.users }}</h3>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon movies">
                <PhFilmStrip :size="24" />
            </div>
            <div>
                <p class="stat-label">Movies Listed</p>
                <h3>{{ stats.movies }}</h3>
            </div>
        </div>

        <div class="chart-section">
            <div class="section-header">
                <h3>Revenue Overview</h3>
                <select class="chart-filter">
                    <option>This Week</option>
                </select>
            </div>
            <div class="bar-chart">
                <div v-for="(bar, index) in chartData" :key="index" class="bar-col">
                    <div class="bar-track">
                        <div class="bar-fill" :style="{ height: bar.percent + '%' }">
                            <span class="tooltip">${{ bar.value }}</span>
                        </div>
                    </div>
                    <span class="bar-label">{{ bar.day }}</span>
                </div>
            </div>
        </div>

        <div class="table-section">
            <div class="section-header">
                <h3>Recent Transactions</h3>
                <router-link to="/admin/bookings" class="view-all">View All</router-link>
            </div>
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="t in recentTransactions" :key="t.id">
                        <td>
                            <div class="user-cell">
                                <div class="mini-avatar">{{ t.user.charAt(0) }}</div>
                                {{ t.user }}
                            </div>
                        </td>
                        <td class="movie-cell">{{ t.movie }}</td>
                        <td>{{ formatDate(t.id) }}</td>
                        <td class="amount">+${{ t.total }}</td>
                        <td><span class="status-dot"></span> Confirmed</td>
                    </tr>
                    <tr v-if="recentTransactions.length === 0">
                        <td colspan="5" class="empty-msg">No transactions yet.</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import {
    PhCurrencyDollar, PhTicket, PhUsers, PhFilmStrip
} from '@phosphor-icons/vue'

const movieStore = useMovieStore()

const stats = ref({
    revenue: 0,
    bookings: 0,
    users: 0,
    movies: 0
})

const recentTransactions = ref([])

// Load Data from LocalStorage (Simulating Backend)
const loadDashboardData = () => {
    const bookings = JSON.parse(localStorage.getItem('allBookings')) || []
    const users = JSON.parse(localStorage.getItem('usersDB')) || []

    // Calculate Stats
    stats.value.bookings = bookings.length
    stats.value.users = users.length
    stats.value.movies = movieStore.movies.length

    // Sum Revenue (Filtering out cancelled if you implemented that status)
    stats.value.revenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0)

    // Get Last 5 Transactions
    recentTransactions.value = bookings.slice(-5).reverse()
}

// Mock Chart Data (Since we don't have real historical dates for all)
const chartData = [
    { day: 'Mon', value: 120, percent: 30 },
    { day: 'Tue', value: 200, percent: 50 },
    { day: 'Wed', value: 150, percent: 40 },
    { day: 'Thu', value: 300, percent: 75 },
    { day: 'Fri', value: 250, percent: 60 },
    { day: 'Sat', value: 400, percent: 100 },
    { day: 'Sun', value: 350, percent: 85 },
]

const formatDate = (timestamp) => {
    // timestamp is likely part of ID like BK-1234, so we just return Today for demo
    return 'Today'
}

onMounted(loadDashboardData)
</script>

<style scoped>
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr;
    gap: 24px;
}

/* 1. Stat Cards */
.stat-card {
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: 0.2s;
}

.stat-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.stat-icon.revenue {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.stat-icon.bookings {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.stat-icon.users {
    background: rgba(249, 115, 22, 0.1);
    color: #f97316;
}

.stat-icon.movies {
    background: rgba(236, 72, 153, 0.1);
    color: #ec4899;
}

.stat-label {
    margin: 0 0 4px 0;
    font-size: 0.85rem;
    color: #888;
}

.stat-card h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

/* 2. Chart Section */
.chart-section {
    grid-column: span 2;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h3 {
    margin: 0;
    font-size: 1.1rem;
}

.chart-filter {
    background: #27272a;
    border: none;
    color: #aaa;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
}

.bar-chart {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 200px;
    padding-top: 20px;
}

.bar-col {
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
    width: 12px;
    background: linear-gradient(to top, var(--color-accent), #ff6b6b);
    border-radius: 20px;
    position: relative;
    transition: height 0.5s ease;
    cursor: pointer;
}

.bar-fill:hover {
    width: 16px;
    filter: brightness(1.2);
}

.bar-fill:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-10px);
}

.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: black;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    white-space: nowrap;
}

.bar-label {
    font-size: 0.75rem;
    color: #666;
}

/* 3. Table Section */
.table-section {
    grid-column: span 2;
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
}

.view-all {
    font-size: 0.85rem;
    color: var(--color-accent);
    text-decoration: none;
}

.dashboard-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.dashboard-table th {
    text-align: left;
    font-size: 0.75rem;
    color: #666;
    padding-bottom: 12px;
    text-transform: uppercase;
}

.dashboard-table td {
    padding: 12px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.9rem;
    color: #ddd;
}

.user-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.mini-avatar {
    width: 24px;
    height: 24px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: #aaa;
}

.amount {
    color: #10b981;
    font-weight: 600;
}

.status-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    margin-right: 6px;
}

.movie-cell {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.empty-msg {
    text-align: center;
    color: #555;
    padding: 20px;
}

/* Responsive */
@media (max-width: 1100px) {
    .dashboard-grid {
        grid-template-columns: 1fr 1fr;
    }

    .stat-card {
        grid-column: span 1;
    }

    .chart-section,
    .table-section {
        grid-column: span 2;
    }
}
</style>