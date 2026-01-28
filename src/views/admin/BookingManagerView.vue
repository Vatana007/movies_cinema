<template>
    <div class="manager-view">

        <div class="dashboard-header">
            <div class="header-text">
                <h2>Transactions</h2>
                <p class="subtitle">Monitor ticket sales and refund requests.</p>
            </div>

            <div class="stats-row">
                <div class="stat-pill">
                    <div class="icon green">
                        <PhMoney :size="18" weight="bold" />
                    </div>
                    <div class="stat-info">
                        <span class="label">Revenue</span>
                        <span class="value">${{ (stats.revenue || 0).toFixed(2) }}</span>
                    </div>
                </div>
                <div class="stat-pill">
                    <div class="icon blue">
                        <PhTicket :size="18" weight="bold" />
                    </div>
                    <div class="stat-info">
                        <span class="label">Tickets</span>
                        <span class="value">{{ stats.tickets }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls-toolbar">
            <div class="filter-tabs">
                <button v-for="tab in ['All', 'Confirmed', 'Cancelled']" :key="tab"
                    :class="['tab-btn', { active: filter === tab }]" @click="filter = tab">
                    {{ tab }}
                </button>
            </div>

            <div class="search-wrapper">
                <PhMagnifyingGlass class="search-icon" />
                <input v-model="search" type="text" placeholder="Search Order ID or User..." />
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Movie Details</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in filteredBookings" :key="booking.id">
                        <td>
                            <div class="receipt-id">
                                <PhReceipt :size="14" />
                                <span>#{{ booking.id }}</span>
                            </div>
                        </td>

                        <td>
                            <div class="user-info">
                                <div class="avatar-tiny">{{ (booking.user || 'U').charAt(0) }}</div>
                                <span class="username">{{ booking.user || 'Unknown' }}</span>
                            </div>
                        </td>

                        <td>
                            <div class="movie-info">
                                <span class="movie-title">{{ booking.movie || 'Unknown Movie' }}</span>
                                <span class="seat-count">
                                    {{ Array.isArray(booking.seats) ? booking.seats.length : 1 }} Seats
                                </span>
                            </div>
                        </td>

                        <td class="date-cell">
                            <div class="date-wrapper">
                                <PhCalendarBlank :size="14" />
                                {{ formatDate(booking.id) }}
                            </div>
                        </td>

                        <td>
                            <span class="amount-text">${{ (Number(booking.total) || 0).toFixed(2) }}</span>
                        </td>

                        <td>
                            <div :class="['status-badge', (booking.status || 'pending').toLowerCase()]">
                                <component :is="booking.status === 'Confirmed' ? PhCheckCircle : PhXCircle"
                                    weight="fill" />
                                {{ booking.status || 'Pending' }}
                            </div>
                        </td>

                        <td>
                            <button v-if="booking.status === 'Confirmed'" class="btn-refund"
                                @click="cancelBooking(booking.id)" title="Process Refund">
                                Refund
                            </button>
                            <span v-else class="text-muted">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="filteredBookings.length === 0" class="empty-state">
                <div class="empty-icon">
                    <PhReceipt :size="48" weight="duotone" />
                </div>
                <h3>No bookings found</h3>
                <p>Try adjusting your filters or search query.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
    PhMagnifyingGlass, PhReceipt, PhMoney, PhTicket,
    PhCheckCircle, PhXCircle, PhCalendarBlank
} from '@phosphor-icons/vue'

const bookings = ref([])
const filter = ref('All')
const search = ref('')

// Load Data
const loadBookings = () => {
    try {
        const raw = localStorage.getItem('allBookings')
        bookings.value = raw ? JSON.parse(raw) : []
        // Sort by Newest
        bookings.value.sort((a, b) => String(b.id).localeCompare(String(a.id)))
    } catch (e) {
        console.error("Error loading bookings:", e)
        bookings.value = []
    }
}

// Statistics
const stats = computed(() => {
    const active = bookings.value.filter(b => b.status === 'Confirmed')
    return {
        // FIX: Ensure values are numbers before adding
        revenue: active.reduce((sum, b) => sum + (Number(b.total) || 0), 0),
        tickets: active.reduce((sum, b) => sum + (Array.isArray(b.seats) ? b.seats.length : 1), 0)
    }
})

// Formatting Helpers
const formatDate = (id) => {
    const date = new Date(parseInt(id) || Date.now())
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Filtering
const filteredBookings = computed(() => {
    return bookings.value.filter(b => {
        const status = b.status || ''
        const matchesStatus = filter.value === 'All' || status === filter.value

        const idStr = String(b.id || '')
        const userStr = (b.user || '').toLowerCase()
        const movieStr = (b.movie || '').toLowerCase()
        const searchStr = search.value.toLowerCase()

        const matchesSearch = idStr.includes(searchStr) ||
            userStr.includes(searchStr) ||
            movieStr.includes(searchStr)

        return matchesStatus && matchesSearch
    })
})

// Action
const cancelBooking = (id) => {
    if (confirm("Refund this order? This will return points/money to the user.")) {
        const index = bookings.value.findIndex(b => b.id === id)
        if (index !== -1) {
            bookings.value[index].status = 'Cancelled'
            localStorage.setItem('allBookings', JSON.stringify(bookings.value))
        }
    }
}

onMounted(loadBookings)
</script>

<style scoped>
.manager-view {
    padding: 30px;
    color: #e4e4e7;
    font-family: 'Inter', sans-serif;
}

/* 1. Header & Stats */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.header-text h2 {
    margin: 0 0 6px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

.subtitle {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
}

.stats-row {
    display: flex;
    gap: 16px;
}

.stat-pill {
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.stat-pill .icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon.green {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
}

.icon.blue {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
}

.stat-info {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.stat-info .label {
    font-size: 0.7rem;
    color: #888;
    text-transform: uppercase;
    font-weight: 600;
}

.stat-info .value {
    font-size: 1rem;
    font-weight: 700;
    color: white;
}

/* 2. Controls Toolbar */
.controls-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #12141a;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 24px;
}

.filter-tabs {
    display: flex;
    gap: 4px;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px;
    border-radius: 10px;
}

.tab-btn {
    background: transparent;
    border: none;
    color: #888;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.tab-btn:hover {
    color: white;
}

.tab-btn.active {
    background: #27272a;
    color: white;
    shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 10px;
    width: 280px;
    transition: 0.2s;
}

.search-wrapper:focus-within {
    border-color: var(--color-accent);
    background: #000;
}

.search-wrapper input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
}

.search-icon {
    color: #666;
}

/* 3. Table */
.table-container {
    background: #12141a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 16px 24px;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #666;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.02);
}

td {
    padding: 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
}

/* Table Content Styles */
.receipt-id {
    font-family: monospace;
    color: var(--color-accent);
    background: rgba(229, 9, 20, 0.1);
    padding: 4px 8px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar-tiny {
    width: 28px;
    height: 28px;
    background: #27272a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    color: #aaa;
}

.username {
    font-weight: 500;
    color: white;
}

.movie-info {
    display: flex;
    flex-direction: column;
}

.movie-title {
    font-weight: 600;
    color: #ddd;
    font-size: 0.95rem;
}

.seat-count {
    font-size: 0.8rem;
    color: #666;
}

.date-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #888;
    font-size: 0.9rem;
}

.amount-text {
    font-weight: 700;
    color: white;
    font-size: 1rem;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

.status-badge.confirmed {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
}

.status-badge.cancelled {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
}

.status-badge.pending {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
}

/* Buttons */
.btn-refund {
    background: transparent;
    border: 1px solid #333;
    color: #ef4444;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.2s;
    font-weight: 500;
}

.btn-refund:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
}

.text-muted {
    color: #444;
}

/* Empty State */
.empty-state {
    padding: 60px;
    text-align: center;
    color: #555;
}

.empty-icon {
    color: #333;
    margin-bottom: 10px;
}

.empty-state h3 {
    color: #888;
    margin: 0 0 4px 0;
}
</style>