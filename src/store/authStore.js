import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // Notification State
    const toast = ref({ visible: false, message: '', type: 'success' })

    const showToast = (message, type = 'success') => {
        toast.value = { visible: true, message, type }
        setTimeout(() => { toast.value.visible = false }, 3000)
    }

    // Getters
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    // NEW: Getters for tickets (used in ProfileView)
    const userTickets = ref([])

    // 1. Initialize Auth
    const initAuth = () => {
        // A. Check/Seed Database
        const storedDB = localStorage.getItem('usersDB')
        if (!storedDB) {
            const mockUsers = [
                { id: 1, name: 'Admin Staff', email: 'admin@cinema.com', password: '123', role: 'admin', points: 0, joinDate: new Date().toISOString() },
                { id: 2, name: 'Sokha Dara', email: 'user@cinema.com', password: '123', role: 'user', points: 50, joinDate: new Date().toISOString() }
            ]
            localStorage.setItem('usersDB', JSON.stringify(mockUsers))
        }

        // B. Check Current Session
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        }
    }

    // 2. Sign Up Action
    const signup = async (email, password, fullName) => {
        loading.value = true
        error.value = null

        const cleanEmail = email.trim().toLowerCase()
        const cleanName = fullName.trim()

        await new Promise(resolve => setTimeout(resolve, 800))

        try {
            const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []

            if (usersDB.find(u => u.email === cleanEmail)) {
                throw new Error("This email is already registered")
            }

            const newUser = {
                id: Date.now(),
                name: cleanName,
                email: cleanEmail,
                password: password,
                role: 'user',
                points: 0, // NEW: Start with 0 points
                rewards: [],
                joinDate: new Date().toISOString()
            }

            usersDB.push(newUser)
            localStorage.setItem('usersDB', JSON.stringify(usersDB))

            user.value = newUser
            localStorage.setItem('currentUser', JSON.stringify(newUser))

            showToast('Account created successfully!', 'success')

        } catch (err) {
            error.value = err.message
            showToast(err.message, 'error')
            throw err
        } finally {
            loading.value = false
        }
    }

    // 3. Login Action
    const login = async (email, password) => {
        loading.value = true
        error.value = null

        const cleanEmail = email.trim().toLowerCase()

        await new Promise(resolve => setTimeout(resolve, 800))

        try {
            const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []
            const foundUser = usersDB.find(u => u.email === cleanEmail && u.password === password)

            if (!foundUser) {
                throw new Error("Invalid email or password")
            }

            user.value = foundUser
            localStorage.setItem('currentUser', JSON.stringify(foundUser))

            showToast(`Welcome back, ${foundUser.name}!`, 'success')

        } catch (err) {
            error.value = err.message
            showToast(err.message, 'error')
            throw err
        } finally {
            loading.value = false
        }
    }

    // 4. Logout Action
    const logout = () => {
        user.value = null
        localStorage.removeItem('currentUser')
        showToast('You have logged out.', 'success')
    }

    // NEW: Action to add ticket
    const addTicket = (ticket) => {
        userTickets.value.unshift(ticket)
    }

    // NEW: Action to add Loyalty Points
    const addLoyaltyPoints = (amount) => {
        if (user.value) {
            user.value.points = (user.value.points || 0) + amount

            // Persist to session
            localStorage.setItem('currentUser', JSON.stringify(user.value))

            // Persist to "Database"
            const usersDB = JSON.parse(localStorage.getItem('usersDB')) || []
            const index = usersDB.findIndex(u => u.id === user.value.id)
            if (index !== -1) {
                usersDB[index].points = user.value.points
                localStorage.setItem('usersDB', JSON.stringify(usersDB))
            }
        }
    }

    return {
        user, isAuthenticated, isAdmin, loading, error,
        toast, showToast, userTickets,
        initAuth, signup, login, logout, addTicket, addLoyaltyPoints
    }
})