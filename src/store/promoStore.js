import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePromoStore = defineStore('promo', () => {

    // Default Promos
    const defaultPromos = [
        { id: 1, code: 'WELCOME10', discount: 10, name: 'New User Bonus', status: 'Active' },
        { id: 2, code: 'SUMMER25', discount: 25, name: 'Summer Sale', status: 'Active' }
    ]

    // Load from LocalStorage or use defaults
    const promos = ref(JSON.parse(localStorage.getItem('promosDB')) || defaultPromos)

    // Persistence: Watch for changes and save to browser storage
    watch(promos, (newVal) => {
        localStorage.setItem('promosDB', JSON.stringify(newVal))
    }, { deep: true })

    // --- ACTIONS ---

    // Generate a randomized code based on event name
    const generateCode = (name, percent) => {
        // Logic: First 3 letters of name + Percent + Random 3 chars
        const prefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase() || 'PRO'
        const suffix = Math.random().toString(36).substring(2, 5).toUpperCase()
        const code = `${prefix}${percent}-${suffix}`

        promos.value.unshift({
            id: Date.now(),
            code: code,
            discount: percent,
            name: name,
            status: 'Active'
        })
    }

    const deletePromo = (id) => {
        promos.value = promos.value.filter(p => p.id !== id)
    }

    const getPromo = (code) => {
        // Find code that matches and is Active
        return promos.value.find(p => p.code === code && p.status === 'Active')
    }

    return { promos, generateCode, deletePromo, getPromo }
})