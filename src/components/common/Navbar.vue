<template>
    <nav class="navbar" :class="{ 'scrolled': isScrolled }">
        <div class="container navbar-content">

            <router-link to="/" class="brand">
                <div class="logo-icon">
                    <PhFilmStrip :size="28" weight="duotone" color="white" />
                </div>
                <span class="logo-text">CINE<span class="highlight">MAX</span></span>
            </router-link>

            <ul class="nav-links">
                <li><router-link to="/" exact-active-class="active">Home</router-link></li>
                <li><router-link to="/movies" active-class="active">Movies</router-link></li>
                <li><router-link to="/cinemas" active-class="active">Cinemas</router-link></li>
                <li><router-link to="/offers" active-class="active">Offers</router-link></li>
            </ul>

            <div class="nav-actions">

                <template v-if="!authStore.user">
                    <button class="btn-login" @click="$router.push('/login')">
                        Sign In
                    </button>
                    <button class="btn-signup" @click="$router.push('/signup')">
                        Join
                    </button>
                </template>

                <template v-else>
                    <div class="user-dropdown-container">

                        <div class="user-profile-trigger">
                            <div class="avatar-ring">
                                <div class="avatar">
                                    {{ getInitials(authStore.user.name) }}
                                </div>
                            </div>
                            <div class="user-meta">
                                <span class="username">{{ authStore.user.name }}</span>
                                <span class="user-role">{{ authStore.user.role }}</span>
                            </div>
                            <PhCaretDown :size="14" class="caret-icon" />
                        </div>

                        <div class="dropdown-menu">
                            <div class="dropdown-header">
                                <div class="header-info">
                                    <p class="greeting">Signed in as</p>
                                    <p class="email-text">{{ authStore.user.email }}</p>
                                </div>
                            </div>

                            <div class="dropdown-body">
                                <router-link to="/profile" class="dropdown-item">
                                    <div class="icon-box">
                                        <PhTicket :size="18" />
                                    </div>
                                    <span>My Tickets</span>
                                </router-link>

                                <router-link v-if="authStore.isAdmin" to="/admin" class="dropdown-item">
                                    <div class="icon-box">
                                        <PhSquaresFour :size="18" />
                                    </div>
                                    <span>Admin Dashboard</span>
                                </router-link>

                                <div class="dropdown-divider"></div>

                                <button class="dropdown-item logout" @click="handleLogout">
                                    <div class="icon-box">
                                        <PhSignOut :size="18" />
                                    </div>
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </template>

            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import {
    PhFilmStrip, PhTicket,
    PhSquaresFour, PhSignOut, PhCaretDown
} from '@phosphor-icons/vue'

const router = useRouter()
const authStore = useAuthStore()
const isScrolled = ref(false)

// Scroll Logic for Glass Effect
const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

const handleLogout = () => {
    authStore.logout()
    router.push('/login')
}

const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
/* --- Navbar Base --- */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 1000;
    transition: all 0.3s ease;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
}

/* Scrolled State (Glassmorphism) */
.navbar.scrolled {
    background: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    height: 70px;
}

.navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

/* --- Brand --- */
.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: var(--color-accent);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.4);
}

.logo-text {
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
    letter-spacing: -0.5px;
}

.highlight {
    color: var(--color-accent);
}

/* --- Navigation Links --- */
.nav-links {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: #a1a1aa;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    position: relative;
    padding: 5px 0;
    transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.active {
    color: white;
}

/* Animated Underline */
.nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--color-accent);
    transition: width 0.3s ease;
    box-shadow: 0 0 8px var(--color-accent);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

/* --- Actions --- */
.nav-actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Auth Buttons */
.btn-login {
    background: transparent;
    color: white;
    border: none;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.95rem;
}

.btn-signup {
    background: white;
    color: black;
    border: none;
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-signup:hover {
    transform: scale(1.05);
}

/* --- User Dropdown --- */
.user-dropdown-container {
    position: relative;
    padding: 10px 0;
    /* Extends hover area */
}

.user-profile-trigger {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 4px 12px 4px 4px;
    border-radius: 50px;
    transition: 0.3s;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.user-profile-trigger:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.avatar-ring {
    padding: 2px;
    border: 1px solid var(--color-accent);
    border-radius: 50%;
}

.avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #4f46e5, #ec4899);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: bold;
}

.user-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
}

.username {
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
}

.user-role {
    font-size: 0.7rem;
    color: #aaa;
    text-transform: uppercase;
}

.caret-icon {
    color: #666;
    transition: 0.3s;
}

.user-dropdown-container:hover .caret-icon {
    transform: rotate(180deg);
    color: white;
}

/* Dropdown Menu Panel */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    width: 260px;
    background: rgba(20, 20, 25, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px) scale(0.95);
    transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform-origin: top right;
    margin-top: 5px;
    overflow: hidden;
}

.user-dropdown-container:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
}

.dropdown-header {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.greeting {
    font-size: 0.75rem;
    color: #888;
    margin: 0 0 4px 0;
}

.email-text {
    margin: 0;
    color: white;
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-body {
    padding: 8px;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    color: #ccc;
    text-decoration: none;
    border-radius: 10px;
    transition: 0.2s;
    border: none;
    background: transparent;
    width: 100%;
    cursor: pointer;
    font-size: 0.95rem;
}

.dropdown-item .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    color: #888;
    transition: 0.2s;
}

.dropdown-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
}

.dropdown-item:hover .icon-box {
    background: var(--color-accent);
    color: white;
}

.dropdown-item.logout {
    color: #ff6b6b;
}

.dropdown-item.logout:hover {
    background: rgba(255, 107, 107, 0.1);
    color: #ff6b6b;
}

.dropdown-item.logout:hover .icon-box {
    background: #ff6b6b;
    color: white;
}

.dropdown-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 6px 12px;
}

/* Mobile Responsive */
@media (max-width: 900px) {

    .nav-links,
    .username,
    .user-role {
        display: none;
    }
}
</style>