<template>
    <div class="manager-view">
        <div class="page-header">
            <h2>Booking Transactions</h2>

            <div class="controls">
                <div class="tabs">
                    <button :class="{ active: filter === 'All' }" @click="filter = 'All'">All</button>
                    <button :class="{ active: filter === 'Confirmed' }" @click="filter = 'Confirmed'">Active</button>
                    <button :class="{ active: filter === 'Cancelled' }" @click="filter = 'Cancelled'">Cancelled</button>
                </div>
                <div class="search-box">
                    <PhMagnifyingGlass :size="16" />
                    <input v-model="search" placeholder="Search ID or User..." />
                </div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Movie</th>
                        <th>Details</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in filteredBookings" :key="booking.id">
                        <td class="mono-text">#{{ booking.id }}</td>
                        <td class="primary-text">{{ booking.user }}</td>
                        <td>{{ booking.movie }}</td>
                        <td class="sub-text">{{ Array.isArray(booking.seats) ? booking.seats.length : 1 }} Seat(s)</td>
                        <td class="amount">${{ booking.total }}</td>
                        <td>
                            <span :class="['status-badge', booking.status.toLowerCase()]">
                                {{ booking.status }}
                            </span>
                        </td>
                        <td>
                            <button v-if="booking.status === 'Confirmed'" class="btn-cancel"
                                @click="cancelBooking(booking.id)">
                                Refund
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="filteredBookings.length === 0" class="empty-state">
                <p>No bookings found matching your criteria.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const bookings = ref([])
const filter = ref('All')
const search = ref('')

const loadBookings = () => {
    bookings.value = JSON.parse(localStorage.getItem('allBookings')) || []
    // Ensure newest first
    bookings.value.sort((a, b) => b.id.localeCompare(a.id))
}

const filteredBookings = computed(() => {
    return bookings.value.filter(b => {
        const matchesStatus = filter.value === 'All' || b.status === filter.value
        const matchesSearch = b.id.toLowerCase().includes(search.value.toLowerCase()) ||
            b.user.toLowerCase().includes(search.value.toLowerCase())
        return matchesStatus && matchesSearch
    })
})

const cancelBooking = (id) => {
    if (confirm("Are you sure you want to refund this order?")) {
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
}

.page-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tabs {
    display: flex;
    gap: 4px;
    background: #1f2229;
    padding: 4px;
    border-radius: 8px;
    border: 1px solid #333;
}

.tabs button {
    background: transparent;
    border: none;
    color: #888;
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: 0.2s;
}

.tabs button.active {
    background: #333;
    color: white;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1f2229;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #333;
    color: #aaa;
    width: 220px;
}

.search-box input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
}

.table-container {
    background: #12141a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #aaa;
}

.mono-text {
    font-family: monospace;
    color: var(--color-accent);
}

.primary-text {
    color: white;
    font-weight: 500;
}

.amount {
    color: #10b981;
    font-weight: bold;
}

.status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
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

.btn-cancel {
    background: transparent;
    border: 1px solid #ef4444;
    color: #ef4444;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: 0.2s;
}

.btn-cancel:hover {
    background: #ef4444;
    color: white;
}

.empty-state {
    padding: 40px;
    text-align: center;
    color: #555;
}
</style>