import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    // --- STATE ---
    const user = ref(JSON.parse(localStorage.getItem('currentUser')) || null)
    const userTickets = ref(JSON.parse(localStorage.getItem('userTickets')) || [])

    // UI States
    const loading = ref(false)
    const error = ref(null)
    const toast = ref({ visible: false, message: '', type: 'success' })

    // --- GETTERS ---
    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    // --- ACTIONS ---

    // 1. INIT AUTH (The missing function causing the error)
    const initAuth = () => {
        // Check if we need to seed the mock database
        const storedDB = localStorage.getItem('usersDB')
        if (!storedDB) {
            const mockUsers = [
                { id: 1, name: 'Admin Staff', email: 'admin@cinema.com', password: '123', role: 'admin', points: 0 },
                { id: 2, name: 'Sokha Dara', email: 'user@cinema.com', password: '123', role: 'user', points: 120 }
            ]
            localStorage.setItem('usersDB', JSON.stringify(mockUsers))
        }
    }

    // 2. LOGIN ACTION
    const login = async ({ email, password }) => {
        loading.value = true
        error.value = null

        try {
            await new Promise(resolve => setTimeout(resolve, 800))

            const storedDB = JSON.parse(localStorage.getItem('usersDB')) || []
            // Always ensure Admin exists if localstorage was cleared
            const defaultUsers = [
                { id: 1, name: 'Admin Staff', email: 'admin@cinema.com', password: '123', role: 'admin', points: 0 }
            ]
            const allUsers = [...defaultUsers, ...storedDB]

            const foundUser = allUsers.find(u => u.email === email && u.password === password)

            if (!foundUser) throw new Error('Invalid email or password')

            user.value = foundUser
            localStorage.setItem('currentUser', JSON.stringify(foundUser))
            showToast(`Welcome back, ${foundUser.name}!`, 'success')

        } catch (err) {
            error.value = err.message
            showToast(err.message, 'error')
            throw err
        } finally {
            loading.value = false // This stops the spinner
        }
    }

    // 3. SIGNUP ACTION
    const signup = async ({ name, email, password }) => {
        loading.value = true
        error.value = null

        try {
            await new Promise(resolve => setTimeout(resolve, 800))

            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                role: 'user',
                points: 0,
                joinDate: new Date().toISOString()
            }

            const currentDB = JSON.parse(localStorage.getItem('usersDB')) || []
            currentDB.push(newUser)
            localStorage.setItem('usersDB', JSON.stringify(currentDB))

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

    // 4. LOGOUT
    const logout = () => {
        user.value = null
        localStorage.removeItem('currentUser')
        showToast('Logged out successfully', 'info')
    }

    // 5. HELPER ACTIONS
    const addTicket = (ticket) => {
        userTickets.value.unshift(ticket)
        localStorage.setItem('userTickets', JSON.stringify(userTickets.value))
    }

    const addLoyaltyPoints = (amount) => {
        if (user.value) {
            user.value.points = (user.value.points || 0) + amount
            localStorage.setItem('currentUser', JSON.stringify(user.value))
        }
    }

    const showToast = (msg, type = 'success') => {
        toast.value = { visible: true, message: msg, type }
        setTimeout(() => { toast.value.visible = false }, 3000)
    }

    // RETURN EVERYTHING
    return {
        user,
        userTickets,
        loading,
        error,
        toast,
        isAuthenticated,
        isAdmin,
        initAuth, // <--- MUST BE HERE
        login,
        signup,
        logout,
        addTicket,
        addLoyaltyPoints,
        showToast
    }
})