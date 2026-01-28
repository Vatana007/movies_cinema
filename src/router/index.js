import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// --- LAYOUTS ---
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes = [
    // ====================================================
    // 1. PUBLIC & USER ROUTES (Wrapped in UserLayout)
    // ====================================================
    {
        path: '/',
        component: UserLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/user/HomeView.vue')
            },
            {
                path: 'movies',
                name: 'Movies',
                component: () => import('@/views/user/MoviesView.vue')
            },
            {
                path: 'cinemas',
                name: 'Cinemas',
                component: () => import('@/views/user/CinemasView.vue')
            },
            {
                path: 'offers',
                name: 'Offers',
                component: () => import('@/views/user/OffersView.vue')
            },
            {
                path: 'movie/:id',
                name: 'MovieDetail',
                component: () => import('@/views/user/MovieDetailView.vue')
            },
            // --- Protected User Routes ---
            {
                path: 'booking/:id',
                name: 'Booking',
                meta: { requiresAuth: true },
                component: () => import('@/views/user/BookingView.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                meta: { requiresAuth: true },
                component: () => import('@/views/user/ProfileView.vue')
            }
        ]
    },

    // ====================================================
    // 2. AUTH ROUTES (Login / Signup)
    // ====================================================
    {
        path: '/login',
        name: 'Login',
        meta: { guestOnly: true },
        component: () => import('@/components/auth/LoginModal.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        meta: { guestOnly: true },
        component: () => import('@/components/auth/SignupForm.vue')
    },

    // ====================================================
    // 3. ADMIN PANEL ROUTES (Wrapped in AdminLayout)
    // ====================================================
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, adminOnly: true }, // Strict Admin Protection
        children: [
            {
                path: '',
                redirect: { name: 'AdminDashboard' }
            },
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: () => import('@/views/admin/DashboardView.vue')
            },
            {
                path: 'movies',
                name: 'AdminMovies',
                component: () => import('@/views/admin/MoviesManagerView.vue')
            },
            {
                path: 'bookings',
                name: 'AdminBookings',
                component: () => import('@/views/admin/BookingManagerView.vue')
            },
            {
                path: 'users',
                name: 'AdminUsers',
                component: () => import('@/views/admin/UserManagerView.vue')
            },
            // FIX: Added the missing Promo route here
            {
                path: 'promos',
                name: 'AdminPromos',
                component: () => import('@/views/admin/PromoManagerView.vue')
            }
        ]
    },

    // ====================================================
    // 4. FALLBACK (404)
    // ====================================================
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})

// ====================================================
// NAVIGATION GUARDS
// ====================================================
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // 1. Initialize Auth if needed (optional based on your store setup)
    if (!authStore.user) {
        // authStore.initAuth() // Uncomment if you have persistence initialization
    }

    const isLoggedIn = !!authStore.user
    const isAdmin = authStore.user?.role === 'admin'

    // 2. Check for Protected Routes
    if (to.meta.requiresAuth && !isLoggedIn) {
        // authStore.showToast('Please sign in', 'error')
        return next({ name: 'Login' })
    }

    // 3. Check for Admin Only Routes
    if (to.meta.adminOnly && !isAdmin) {
        // authStore.showToast('Access Denied', 'error')
        return next({ name: 'Home' })
    }

    // 4. Check for Guest Only Routes
    if (to.meta.guestOnly && isLoggedIn) {
        return next({ name: 'Home' })
    }

    next()
})

export default router