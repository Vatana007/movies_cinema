import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePromoStore = defineStore('promo', () => {

    // --- STATE & INITIALIZATION ---

    // Default data to show if nothing is saved yet
    const defaultPromos = [
        { id: 1, code: 'WELCOME10', discount: 10, name: 'New User Bonus', status: 'Active' },
        { id: 2, code: 'SUMMER25', discount: 25, name: 'Summer Sale', status: 'Active' }
    ]

    // Load from LocalStorage OR fall back to defaults
    const promos = ref(JSON.parse(localStorage.getItem('promosDB')) || defaultPromos)

    // Persistence: Watch for ANY change in the list and save it immediately
    watch(promos, (newVal) => {
        localStorage.setItem('promosDB', JSON.stringify(newVal))
    }, { deep: true })

    // --- ACTIONS ---

    // 1. Generate a New Code
    const generateCode = (name, percent) => {
        // Create a code string: First 3 letters of name + Percent + Random Suffix
        // Example: "Summer Sale" 20% -> "SUM20-X9Z"
        const prefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() || 'PRO'
        const suffix = Math.random().toString(36).substring(2, 5).toUpperCase()
        const code = `${prefix}${percent}-${suffix}`

        // Add to the top of the list
        promos.value.unshift({
            id: Date.now(),
            code: code,
            discount: percent,
            name: name,
            status: 'Active'
        })
    }

    // 2. Update an Existing Code (For the Edit Feature)
    const updatePromo = (id, updates) => {
        const index = promos.value.findIndex(p => p.id === id)
        if (index !== -1) {
            // Merge existing data with new updates (e.g. change status to 'Inactive')
            promos.value[index] = { ...promos.value[index], ...updates }
        }
    }

    // 3. Delete a Code
    const deletePromo = (id) => {
        if (confirm("Are you sure you want to delete this coupon?")) {
            promos.value = promos.value.filter(p => p.id !== id)
        }
    }

    // 4. Validate/Get a Code (Used by TicketSummary.vue)
    const getPromo = (code) => {
        // Must match the code exactly AND be marked as 'Active'
        return promos.value.find(p => p.code === code && p.status === 'Active')
    }

    return {
        promos,
        generateCode,
        updatePromo,
        deletePromo,
        getPromo
    }
})