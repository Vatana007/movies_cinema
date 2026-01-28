<template>
    <div class="manager-view">
        <div class="page-header">
            <div class="header-content">
                <h2>User Directory</h2>
                <p class="subtitle">Manage user roles, points, and account status.</p>
            </div>

            <div class="controls">
                <div class="search-wrapper">
                    <PhMagnifyingGlass :size="18" class="search-icon" />
                    <input v-model="search" type="text" placeholder="Search users..." />
                </div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>User Profile</th>
                        <th>Role</th>
                        <th>Loyalty Points</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>
                            <div class="profile-cell">
                                <div class="avatar" :class="getAvatarColor(user.id)">
                                    {{ getInitials(user.name) }}
                                </div>
                                <div class="user-details">
                                    <span class="name">{{ user.name }}</span>
                                    <span class="email">{{ user.email }}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="role-wrapper">
                                <select :value="user.role" @change="updateRole(user, $event.target.value)"
                                    class="role-select" :class="user.role">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <PhCaretDown class="select-arrow" :size="12" />
                            </div>
                        </td>
                        <td>
                            <div class="points-badge">
                                <PhCoinVertical :size="16" weight="fill" />
                                <span>{{ user.points || 0 }} pts</span>
                            </div>
                        </td>
                        <td class="date-text">
                            {{ formatDate(user.id) }}
                        </td>
                        <td>
                            <div class="actions">
                                <button class="btn-icon history" @click="viewUserHistory(user)" title="View History">
                                    <PhClockCounterClockwise :size="18" />
                                </button>
                                <button class="btn-icon delete" @click="deleteUser(user.id)" title="Delete Account">
                                    <PhTrash :size="18" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="filteredUsers.length === 0" class="empty-state">
                <PhUsers :size="48" weight="duotone" />
                <p>No users found matching "{{ search }}"</p>
            </div>
        </div>

        <transition name="fade">
            <div v-if="selectedUser" class="modal-overlay" @click.self="selectedUser = null">
                <div class="modal-card slide-in">
                    <div class="modal-header">
                        <div class="header-left">
                            <div class="avatar small" :class="getAvatarColor(selectedUser.id)">
                                {{ getInitials(selectedUser.name) }}
                            </div>
                            <h3>{{ selectedUser.name }}'s Activity</h3>
                        </div>
                        <button class="btn-close" @click="selectedUser = null">
                            <PhX :size="20" />
                        </button>
                    </div>

                    <div class="history-content">
                        <table v-if="userBookings.length > 0" class="mini-table">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="booking in userBookings" :key="booking.id">
                                    <td class="movie-title">{{ booking.movie }}</td>
                                    <td class="date-cell">Today</td>
                                    <td class="amount-cell">${{ booking.total }}</td>
                                    <td>
                                        <span :class="['status-pill', booking.status.toLowerCase()]">
                                            {{ booking.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div v-else class="modal-empty">
                            <PhTicket :size="40" weight="duotone" />
                            <p>No booking history available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
    PhMagnifyingGlass, PhTrash, PhClockCounterClockwise,
    PhX, PhTicket, PhUsers, PhCoinVertical, PhCaretDown
} from '@phosphor-icons/vue'

const users = ref([])
const search = ref('')
const selectedUser = ref(null)
const allBookings = ref([])

// 1. Data Loading
const loadData = () => {
    users.value = JSON.parse(localStorage.getItem('usersDB')) || []
    allBookings.value = JSON.parse(localStorage.getItem('allBookings')) || []
}

// 2. Helpers
const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'

const getAvatarColor = (id) => {
    const colors = ['blue', 'purple', 'green', 'orange', 'pink']
    return `bg-${colors[id % colors.length]}`
}

const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// 3. Filtering
const filteredUsers = computed(() => {
    if (!search.value) return users.value
    const query = search.value.toLowerCase()
    return users.value.filter(u =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    )
})

const userBookings = computed(() => {
    if (!selectedUser.value) return []
    return allBookings.value.filter(b => b.user === selectedUser.value.name).reverse()
})

// 4. Actions
const updateRole = (user, newRole) => {
    user.role = newRole
    saveDB()
}

const deleteUser = (id) => {
    if (confirm("Are you sure you want to remove this user?")) {
        users.value = users.value.filter(u => u.id !== id)
        saveDB()
    }
}

const viewUserHistory = (user) => {
    selectedUser.value = user
}

const saveDB = () => {
    localStorage.setItem('usersDB', JSON.stringify(users.value))
}

onMounted(loadData)
</script>

<style scoped>
.manager-view {
    padding: 30px;
    color: #e4e4e7;
}

/* HEADER */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
}

.header-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin: 0 0 4px 0;
}

.subtitle {
    color: #888;
    font-size: 0.9rem;
    margin: 0;
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #12141a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 16px;
    border-radius: 12px;
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

/* TABLE CONTAINER */
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

/* User Profile Cell */
.profile-cell {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Avatar Gradients */
.bg-blue {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.bg-purple {
    background: linear-gradient(135deg, #a855f7, #7c3aed);
}

.bg-green {
    background: linear-gradient(135deg, #10b981, #059669);
}

.bg-orange {
    background: linear-gradient(135deg, #f97316, #ea580c);
}

.bg-pink {
    background: linear-gradient(135deg, #ec4899, #db2777);
}

.user-details {
    display: flex;
    flex-direction: column;
}

.name {
    color: white;
    font-weight: 600;
    font-size: 0.95rem;
}

.email {
    color: #888;
    font-size: 0.8rem;
}

/* Role Select */
.role-wrapper {
    position: relative;
    width: 100px;
}

.role-select {
    width: 100%;
    appearance: none;
    background: #1f2937;
    color: white;
    border: 1px solid #374151;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.select-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #aaa;
}

.role-select.admin {
    background: rgba(245, 158, 11, 0.1);
    color: #fbbf24;
    border-color: rgba(245, 158, 11, 0.3);
}

.role-select.user {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    border-color: rgba(59, 130, 246, 0.3);
}

/* Points */
.points-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #fbbf24;
    font-weight: 600;
    font-size: 0.9rem;
}

.date-text {
    color: #888;
    font-size: 0.85rem;
}

/* Actions */
.actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.btn-icon.history {
    background: rgba(255, 255, 255, 0.05);
    color: #ccc;
}

.btn-icon.history:hover {
    background: white;
    color: black;
}

.btn-icon.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.btn-icon.delete:hover {
    background: #ef4444;
    color: white;
}

.empty-state {
    padding: 60px;
    text-align: center;
    color: #555;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

/* MODAL */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
}

.modal-card {
    background: #18181b;
    width: 500px;
    max-height: 80vh;
    border-radius: 16px;
    border: 1px solid #333;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar.small {
    width: 32px;
    height: 32px;
    font-size: 0.75rem;
    border-radius: 8px;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
}

.btn-close {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    transition: 0.2s;
}

.btn-close:hover {
    color: white;
}

.history-content {
    padding: 0;
    overflow-y: auto;
}

.mini-table {
    width: 100%;
    border-collapse: collapse;
}

.mini-table th {
    padding: 12px 24px;
    font-size: 0.7rem;
    color: #666;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.02);
    text-align: left;
}

.mini-table td {
    padding: 12px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.85rem;
    color: #ccc;
}

.movie-title {
    font-weight: 500;
    color: white;
}

.amount-cell {
    font-family: monospace;
    color: #10b981;
}

.status-pill {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
}

.status-pill.confirmed {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
}

.status-pill.cancelled {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
}

.modal-empty {
    padding: 40px;
    text-align: center;
    color: #555;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

/* Transitions */
.slide-in {
    animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>