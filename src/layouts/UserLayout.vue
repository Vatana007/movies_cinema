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
import { ref, onMounted, onUnmounted } from 'vue'
import { PhFilmStrip, PhUser, PhList, PhX } from '@phosphor-icons/vue'

// 1. IMPORT YOUR FOOTER COMPONENT
// Make sure the path matches where you saved Footer.vue
// Usually it is in @/components/user/Footer.vue or @/components/Footer.vue
import Footer from '@/components/common/Footer.vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

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
    /* This ensures footer stays at bottom */
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

.menu-toggle {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

/* Mobile Menu */
.mobile-menu {
    background: #12141a;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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

/* Responsive */
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

/* Main Content grows to push footer down */
main {
    flex: 1;
}
</style>