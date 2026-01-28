<template>
    <div class="manager-view">
        <div class="page-header">
            <h2>User Management</h2>
            <div class="search-box">
                <PhMagnifyingGlass :size="18" />
                <input v-model="search" type="text" placeholder="Find user..." />
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>
                            <div class="user-info">
                                <div class="avatar-small">{{ user.name.charAt(0) }}</div>
                                <span class="primary-text">{{ user.name }}</span>
                            </div>
                        </td>
                        <td class="sub-text">{{ user.email }}</td>
                        <td>
                            <select :value="user.role" @change="updateRole(user, $event.target.value)"
                                class="role-select" :class="user.role">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td class="highlight-text">{{ user.points || 0 }} pts</td>
                        <td>
                            <div class="actions">
                                <button class="btn-icon history" @click="viewUserHistory(user)" title="View Orders">
                                    <PhClockCounterClockwise :size="18" />
                                </button>
                                <button class="btn-icon delete" @click="deleteUser(user.id)" title="Delete User">
                                    <PhTrash :size="18" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="selectedUser" class="modal-overlay" @click.self="selectedUser = null">
            <div class="modal-card wide">
                <div class="modal-header">
                    <h3>{{ selectedUser.name }}'s History</h3>
                    <button class="btn-close" @click="selectedUser = null">
                        <PhX :size="20" />
                    </button>
                </div>

                <div class="history-list">
                    <table v-if="userBookings.length > 0">
                        <thead>
                            <tr>
                                <th>Movie</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="booking in userBookings" :key="booking.id">
                                <td class="primary-text">{{ booking.movie }}</td>
                                <td>{{ booking.date }}</td>
                                <td class="amount">${{ booking.total }}</td>
                                <td>
                                    <span :class="['status-dot', booking.status.toLowerCase()]"></span>
                                    {{ booking.status }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="empty-state">
                        <PhTicket :size="48" weight="duotone" />
                        <p>No bookings found for this user.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
    PhMagnifyingGlass, PhTrash, PhClockCounterClockwise,
    PhX, PhTicket
} from '@phosphor-icons/vue'

const users = ref([])
const search = ref('')
const selectedUser = ref(null)
const allBookings = ref([])

// 1. Load Data
const loadData = () => {
    users.value = JSON.parse(localStorage.getItem('usersDB')) || []
    allBookings.value = JSON.parse(localStorage.getItem('allBookings')) || []
}

// 2. Filter Users
const filteredUsers = computed(() => {
    return users.value.filter(u =>
        u.name.toLowerCase().includes(search.value.toLowerCase()) ||
        u.email.toLowerCase().includes(search.value.toLowerCase())
    )
})

// 3. User History Logic
const userBookings = computed(() => {
    if (!selectedUser.value) return []
    // Filter bookings matching the selected user's name or ID
    return allBookings.value.filter(b => b.user === selectedUser.value.name)
})

const viewUserHistory = (user) => {
    selectedUser.value = user
}

// 4. CRUD Actions
const updateRole = (user, newRole) => {
    user.role = newRole
    saveDB()
}

const deleteUser = (id) => {
    if (confirm("Delete this user?")) {
        users.value = users.value.filter(u => u.id !== id)
        saveDB()
    }
}

const saveDB = () => {
    localStorage.setItem('usersDB', JSON.stringify(users.value))
}

onMounted(loadData)
</script>

<style scoped>
/* Modern Table Styles */
.manager-view {
    padding: 30px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}

.search-box {
    display: flex;
    align-items: center;
    background: #1f2229;
    padding: 10px 16px;
    border-radius: 50px;
    border: 1px solid #333;
    color: #aaa;
    gap: 10px;
    width: 300px;
}

.search-box input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
}

.table-container {
    background: #12141a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 16px;
    background: rgba(255, 255, 255, 0.03);
    color: #888;
    font-size: 0.8rem;
    text-transform: uppercase;
}

td {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    color: #ccc;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar-small {
    width: 32px;
    height: 32px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: white;
    font-weight: bold;
}

.primary-text {
    color: white;
    font-weight: 500;
}

.sub-text {
    color: #666;
    font-size: 0.9rem;
}

.highlight-text {
    color: var(--color-accent);
    font-weight: bold;
}

.role-select {
    background: #000;
    color: white;
    border: 1px solid #333;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.85rem;
}

.role-select.admin {
    border-color: #f59e0b;
    color: #f59e0b;
}

.actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}

.btn-icon.history {
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
}

.btn-icon.delete {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
}

.btn-icon:hover {
    transform: translateY(-2px);
    filter: brightness(1.2);
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.modal-card {
    background: #18181b;
    width: 600px;
    max-height: 80vh;
    border-radius: 20px;
    border: 1px solid #333;
    padding: 24px;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    color: white;
}

.btn-close {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
}

.history-list {
    overflow-y: auto;
}

.amount {
    color: #10b981;
    font-weight: bold;
}

.status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
}

.status-dot.confirmed {
    background: #10b981;
}

.status-dot.cancelled {
    background: #ef4444;
}

.empty-state {
    text-align: center;
    color: #555;
    padding: 40px;
}
</style>