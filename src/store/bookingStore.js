import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {

    // State
    const currentSession = ref({
        movieId: null,
        movieTitle: '',
        cinema: '',
        date: '',
        time: '',
        hall: ''
    })

    const selectedSeats = ref([]) // Array of seat objects { id: 'A1', price: 10 }

    // Actions
    function initBooking(sessionData) {
        currentSession.value = sessionData
        selectedSeats.value = [] // Reset seats when starting new booking
    }

    function toggleSeat(seat) {
        const index = selectedSeats.value.findIndex(s => s.id === seat.id)
        if (index === -1) {
            selectedSeats.value.push(seat)
        } else {
            selectedSeats.value.splice(index, 1)
        }
    }

    function clearBooking() {
        selectedSeats.value = []
        currentSession.value = { movieId: null, movieTitle: '', cinema: '', date: '', time: '', hall: '' }
    }

    // Getters
    const totalAmount = computed(() => {
        return selectedSeats.value.reduce((total, seat) => total + seat.price, 0)
    })

    const seatLabels = computed(() => {
        return selectedSeats.value.map(s => s.id).join(', ')
    })

    return {
        currentSession,
        selectedSeats,
        totalAmount,
        seatLabels,
        initBooking,
        toggleSeat,
        clearBooking
    }
})