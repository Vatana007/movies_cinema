import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

// --- LAYOUTS ---
import UserLayout from '@/layouts/UserLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// --- AUTH COMPONENTS (Direct Import) ---
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/SignupForm.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // ====================================================
        // 1. AUTH ROUTES (Wrapped in AuthLayout)
        // ====================================================
        {
            path: '/login',
            component: AuthLayout,
            children: [
                {
                    path: '',
                    name: 'Login',
                    component: LoginForm,
                    meta: { guestOnly: true }
                }
            ]
        },
        {
            path: '/register',
            component: AuthLayout,
            children: [
                {
                    path: '',
                    name: 'Register',
                    component: RegisterForm,
                    meta: { guestOnly: true }
                }
            ]
        },

        // ====================================================
        // 2. USER ROUTES (Wrapped in UserLayout)
        // ====================================================
        {
            path: '/',
            component: UserLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/user/HomeView.vue')
                },
                {
                    path: 'movies',
                    name: 'movies',
                    component: () => import('@/views/user/MoviesView.vue')
                },
                {
                    path: 'movie/:id',
                    name: 'movie-detail',
                    component: () => import('@/views/user/MovieDetailView.vue')
                },
                {
                    path: 'cinemas',
                    name: 'cinemas',
                    component: () => import('@/views/user/CinemasView.vue')
                },
                {
                    path: 'offers',
                    name: 'offers',
                    component: () => import('@/views/user/OffersView.vue')
                },
                // --- Protected User Routes ---
                {
                    path: 'booking/:id',
                    name: 'booking',
                    component: () => import('@/views/user/BookingView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: () => import('@/views/user/ProfileView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },

        // ====================================================
        // 3. ADMIN ROUTES (Wrapped in AdminLayout)
        // ====================================================
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAuth: true, adminOnly: true },
            children: [
                {
                    path: 'dashboard', // /admin
                    name: 'admin-dashboard',
                    component: () => import('@/views/admin/DashboardView.vue')
                },
                {
                    path: 'movies',
                    name: 'admin-movies',
                    component: () => import('@/views/admin/MoviesManagerView.vue')
                },
                {
                    path: 'bookings',
                    name: 'admin-bookings',
                    component: () => import('@/views/admin/BookingManagerView.vue')
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: () => import('@/views/admin/UserManagerView.vue')
                },
                {
                    path: 'promos',
                    name: 'admin-promos',
                    component: () => import('@/views/admin/PromoManagerView.vue')
                },
                {
                    path: 'screens',
                    name: 'admin-screens',
                    component: () => import('@/views/admin/ScreenManagerView.vue')
                },
                {
                    path: 'shows',
                    name: 'admin-shows',
                    component: () => import('@/views/admin/ShowManagerView.vue')
                },
                {
                    path: 'scan',
                    name: 'admin-scan',
                    component: () => import('@/views/admin/ScannerView.vue')
                }
            ]
        },

        // ====================================================
        // 4. FALLBACK (404)
        // ====================================================
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        return { top: 0 }
    }
})

// ====================================================
// NAVIGATION GUARDS (Security Logic)
// ====================================================
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isLoggedIn = !!authStore.user
    const isAdmin = authStore.user?.role === 'admin'

    // 1. Prevent Logged-in users from visiting Login/Register
    if (to.meta.guestOnly && isLoggedIn) {
        if (isAdmin) return next('/admin')
        return next('/')
    }

    // 2. Protect Routes that require Login
    if (to.meta.requiresAuth && !isLoggedIn) {
        // Optional: Show a toast message here if you want
        return next('/login')
    }

    // 3. Protect Admin Routes from regular users
    if (to.meta.adminOnly && !isAdmin) {
        return next('/')
    }

    next()
})

export default router