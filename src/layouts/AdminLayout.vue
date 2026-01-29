<template>
    <div class="admin-layout">
        <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

        <aside class="sidebar" :class="{ 'is-open': sidebarOpen }">
            <div class="brand">
                <div class="brand-logo">
                    <PhFilmStrip :size="28" weight="duotone" color="#e11d48" />
                    <span>ADMIN</span>
                </div>
                <button class="close-sidebar mobile-only" @click="sidebarOpen = false">
                    <PhX :size="24" />
                </button>
            </div>

            <nav class="nav-menu">
                <p class="menu-label">Menu</p>
                <router-link to="/admin/dashboard" @click="closeOnMobile">
                    <PhSquaresFour :size="20" /> Dashboard
                </router-link>
                <router-link to="/admin/movies" @click="closeOnMobile">
                    <PhFilmReel :size="20" /> Movies
                </router-link>
                <router-link to="/admin/bookings" @click="closeOnMobile">
                    <PhTicket :size="20" /> Bookings
                </router-link>
                <router-link to="/admin/users" @click="closeOnMobile">
                    <PhUsers :size="20" /> Users
                </router-link>
                <router-link to="/admin/promos" @click="closeOnMobile">
                    <PhTag :size="20" /> Promos
                </router-link>

                <div class="spacer"></div>
                <router-link to="/" class="nav-link-website">
                    <PhGlobe :size="20" /> Website
                </router-link>
                <button class="btn-logout" @click="handleLogout">
                    <PhSignOut :size="20" /> Logout
                </button>
            </nav>
        </aside>

        <main class="main-content">
            <header class="top-bar">
                <div class="left-bar">
                    <button class="menu-btn mobile-only" @click="sidebarOpen = true">
                        <PhList :size="28" />
                    </button>
                    <h2 class="page-title">{{ $route.name }}</h2>
                </div>
                <div class="admin-profile">
                    <div class="avatar">AD</div>
                </div>
            </header>

            <div class="content-wrapper">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import {
    PhSquaresFour, PhFilmReel, PhTicket, PhUsers, PhTag,
    PhFilmStrip, PhSignOut, PhGlobe, PhList, PhX
} from '@phosphor-icons/vue'

const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

const closeOnMobile = () => { sidebarOpen.value = false }
const handleLogout = () => { authStore.logout(); router.push('/login') }
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background-color: #0b0c10;
    color: #e4e4e7;
}

/* Sidebar Base */
.sidebar {
    width: 260px;
    background: #12141a;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    height: 95vh;
    padding: 24px;
    position: sticky;
    top: 0;
    transition: transform 0.3s ease;
    z-index: 50;
    flex-shrink: 0;
}

.brand {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    color: white;
}

.brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.4rem;
    font-weight: 800;
}

.close-sidebar {
    background: none;
    border: none;
    color: #ccc;
    cursor: pointer;
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
}

.top-bar {
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    background: rgba(18, 20, 26, 0.95);
    position: sticky;
    top: 0;
    z-index: 40;
}

.left-bar {
    display: flex;
    align-items: center;
    gap: 16px;
}

.menu-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
}

.page-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: capitalize;
}

.content-wrapper {
    padding: 32px;
    flex: 1;
    overflow-y: auto;
}

/* Admin Profile */
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

/* Nav Menu Styles */
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
    margin: 0 0 8px 12px;
    font-weight: 600;
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
    font-weight: 500;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
    background: rgba(255, 255, 255, 0.05);
    color: white;
}

.nav-link-website {
    margin-top: auto;
    color: #60a5fa !important;
    background: rgba(37, 99, 235, 0.1);
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
    font-weight: 500;
    margin-top: 10px;
    width: 100%;
}

/* --- RESPONSIVE MEDIA QUERIES --- */
@media (max-width: 900px) {

    /* Hide Sidebar by default */
    .sidebar {
        position: fixed;
        left: 0;
        transform: translateX(-100%);
        width: 280px;
        box-shadow: 5px 0 20px rgba(0, 0, 0, 0.5);
    }

    /* Show when open */
    .sidebar.is-open {
        transform: translateX(0);
    }

    .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 45;
        backdrop-filter: blur(2px);
    }

    .top-bar {
        padding: 0 20px;
    }

    .content-wrapper {
        padding: 20px;
    }

    .mobile-only {
        display: block;
    }
}

@media (min-width: 901px) {
    .mobile-only {
        display: none;
    }
}
</style>