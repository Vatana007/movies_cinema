<template>
    <div class="user-layout">
        <nav class="navbar" :class="{ scrolled: isScrolled }">
            <div class="nav-container">
                <router-link to="/" class="brand">
                    <PhFilmStrip :size="28" weight="duotone" color="#e11d48" />
                    <span>CINE<span class="highlight">MAX</span></span>
                </router-link>

                <div class="nav-links desktop-only">
                    <router-link to="/">Home</router-link>
                    <router-link to="/movies">Movies</router-link>
                    <router-link to="/cinemas">Cinemas</router-link>
                    <router-link to="/offers">Offers</router-link>
                </div>

                <div class="nav-actions desktop-only">

                    <router-link v-if="isAdmin" to="/admin/dashboard" class="btn-admin-panel">
                        <PhSquaresFour :size="18" weight="fill" />
                        <span>Admin Panel</span>
                    </router-link>

                    <router-link to="/profile" class="btn-icon">
                        <PhUser :size="20" />
                    </router-link>
                </div>

                <button class="menu-toggle mobile-only" @click="mobileMenuOpen = !mobileMenuOpen">
                    <component :is="mobileMenuOpen ? PhX : PhList" :size="28" />
                </button>
            </div>

            <transition name="slide-down">
                <div v-if="mobileMenuOpen" class="mobile-menu">
                    <router-link v-if="isAdmin" to="/admin/dashboard" class="mobile-admin-link"
                        @click="mobileMenuOpen = false">
                        <PhSquaresFour :size="18" /> Go to Admin Dashboard
                    </router-link>

                    <router-link to="/" @click="mobileMenuOpen = false">Home</router-link>
                    <router-link to="/movies" @click="mobileMenuOpen = false">Movies</router-link>
                    <router-link to="/cinemas" @click="mobileMenuOpen = false">Cinemas</router-link>
                    <router-link to="/offers" @click="mobileMenuOpen = false">Offers</router-link>

                    <div class="divider"></div>

                    <router-link to="/profile" @click="mobileMenuOpen = false" class="profile-link">
                        <PhUser :size="18" /> My Profile
                    </router-link>
                </div>
            </transition>
        </nav>

        <main>
            <router-view />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '@/store/authStore' // Import Auth Store
import Footer from '@/components/common/Footer.vue'
import {
    PhFilmStrip, PhUser, PhList, PhX, PhSquaresFour
} from '@phosphor-icons/vue'

const authStore = useAuthStore()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

// Check if user is admin
const isAdmin = computed(() => {
    return authStore.user && authStore.user.role === 'admin'
})

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.user-layout {
    min-height: 100vh;
    background: #0b0c10;
    color: white;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}

/* Navbar */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
}

.navbar.scrolled {
    background: rgba(11, 12, 16, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    text-decoration: none;
}

.highlight {
    color: #e11d48;
}

.nav-links {
    display: flex;
    gap: 32px;
}

.nav-links a {
    color: #ccc;
    text-decoration: none;
    font-weight: 500;
    transition: 0.2s;
    font-size: 0.95rem;
}

.nav-links a:hover,
.nav-links a.router-link-active {
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

/* --- 🌟 MODERN ADMIN BUTTON --- */
.btn-admin-panel {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    /* Blue Gradient */
    color: white;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-admin-panel:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
    filter: brightness(1.1);
}

/* Mobile Admin Link */
.mobile-admin-link {
    color: #60a5fa !important;
    /* Light Blue text */
    font-weight: 700 !important;
    background: rgba(37, 99, 235, 0.1);
    border-radius: 8px;
    padding: 10px 12px !important;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Mobile Menu */
.menu-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

.mobile-menu {
    background: #12141a;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu a {
    color: #ccc;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.mobile-menu a.router-link-active {
    color: #e11d48;
    font-weight: 700;
}

.profile-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white !important;
}

.desktop-only {
    display: flex;
}

.mobile-only {
    display: none;
}

@media (max-width: 768px) {
    .desktop-only {
        display: none;
    }

    .mobile-only {
        display: block;
    }

    .nav-container {
        padding: 15px 20px;
    }
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>