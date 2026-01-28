<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <div class="brand">
                <PhFilmStrip :size="28" weight="duotone" color="var(--color-accent)" />
                <span>CINE<span class="highlight">MAX</span></span>
            </div>

            <nav class="nav-menu">
                <p class="menu-label">Overview</p>
                <router-link to="/admin/dashboard" active-class="active">
                    <PhSquaresFour :size="20" /> Dashboard
                </router-link>

                <p class="menu-label">Management</p>
                <router-link to="/admin/movies" active-class="active">
                    <PhFilmReel :size="20" /> Movies
                </router-link>
                <router-link to="/admin/bookings" active-class="active">
                    <PhTicket :size="20" /> Bookings
                </router-link>
                <router-link to="/admin/users" active-class="active">
                    <PhUsers :size="20" /> Users
                </router-link>
                <router-link to="/admin/promos" active-class="active">
                    <PhTag :size="20" /> Promo Codes
                </router-link>

                <div class="spacer"></div>

                <button class="btn-logout" @click="handleLogout">
                    <PhSignOut :size="20" /> Logout
                </button>
            </nav>
        </aside>

        <main class="main-content">
            <header class="top-bar">
                <h2 class="page-title">{{ $route.name }}</h2>
                <div class="admin-profile">
                    <div class="avatar">AD</div>
                    <span>Administrator</span>
                </div>
            </header>

            <div class="content-wrapper">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import {
    PhSquaresFour, PhFilmReel, PhTicket, PhUsers,
    PhFilmStrip, PhSignOut
} from '@phosphor-icons/vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background-color: #0b0c10;
    color: #e4e4e7;
    font-family: 'Inter', sans-serif;
}

/* Sidebar Styles */
.sidebar {
    width: 260px;
    background: #12141a;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    padding: 24px;
    flex-shrink: 0;
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 40px;
    color: white;
}

.highlight {
    color: var(--color-accent);
}

.nav-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
}

.menu-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #555;
    margin: 16px 0 8px 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.nav-menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 10px;
    color: #888;
    text-decoration: none;
    transition: 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
}

.nav-menu a:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
}

.nav-menu a.active {
    background: var(--color-accent);
    color: white;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
}

.spacer {
    flex: 1;
}

.btn-logout {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: transparent;
    border: 1px solid #333;
    color: #ef4444;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
}

.btn-logout:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.top-bar {
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background: rgba(18, 20, 26, 0.8);
    backdrop-filter: blur(10px);
}

.page-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    text-transform: capitalize;
}

.admin-profile {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
    color: white;
}

.content-wrapper {
    padding: 32px;
    overflow-y: auto;
    height: calc(100vh - 70px);
}

/* Transition for pages */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>