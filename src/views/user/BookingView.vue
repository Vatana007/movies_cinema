<template>
    <div class="booking-view container section">
        <div class="page-header" v-if="movie">
            <button class="btn-back" @click="$router.back()">
                <PhCaretLeft /> Back
            </button>
            <div class="header-text">
                <h2>Select Seats</h2>
                <p class="subtitle">{{ movie.title }} • {{ movie.duration }}</p>
            </div>
        </div>

        <div class="booking-layout">
            <SeatMap @update:selection="handleSeatSelection" />

            <div class="summary-sidebar">
                <TicketSummary :movieTitle="movie?.title" cinemaName="Cinemax Phnom Penh" date="Today" time="19:30"
                    :selectedSeats="selectedSeats" :ticketPrice="ticketPrice" :userPoints="userPoints"
                    @update:discount="handleDiscountUpdate" @update:extras="handleExtrasUpdate"
                    @proceed="openPayment" />
            </div>
        </div>

        <PaymentModal :visible="showPayment" :total="currentTotal" @close="showPayment = false"
            @payment-success="handleSuccess" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { useMovieStore } from '@/store/movieStore'
import { PhCaretLeft } from '@phosphor-icons/vue'

import SeatMap from '@/components/booking/SeatMap.vue'
import TicketSummary from '@/components/booking/TicketSummary.vue'
import PaymentModal from '@/components/booking/PaymentModal.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const movieStore = useMovieStore()

// State
const movie = ref(null)
const selectedSeats = ref([])
const showPayment = ref(false)
const ticketPrice = 10.00
const bookingFee = 1.50

// New: State to hold values from Summary component
const discountAmount = ref(0)
const extras = ref({
    popcornQty: 0,
    popcornPrice: 0,
    isFreeEligible: false
})

const userPoints = computed(() => authStore.user?.points || 0)

// --- ACTIONS ---

const handleSeatSelection = (newSelection) => {
    selectedSeats.value = newSelection
}

// Receive Discount from Child
const handleDiscountUpdate = (amount) => {
    discountAmount.value = amount
}

// Receive Extras (Popcorn) from Child
const handleExtrasUpdate = (extrasData) => {
    extras.value = extrasData
}

// Calculate FINAL TOTAL
const currentTotal = computed(() => {
    if (selectedSeats.value.length === 0) return 0

    // 1. Calculate Subtotal
    const subtotal = (selectedSeats.value.length * ticketPrice) + bookingFee + extras.value.popcornPrice

    // 2. Subtract Discount (prevent negative)
    return Math.max(0, subtotal - discountAmount.value)
})

const openPayment = () => {
    if (selectedSeats.value.length > 0) {
        showPayment.value = true
    }
}

const handleSuccess = () => {
    showPayment.value = false

    const pointsEarned = selectedSeats.value.length * 10
    const finalTotal = currentTotal.value

    authStore.addLoyaltyPoints(pointsEarned)

    // Format Extras String for Ticket history
    let extrasString = 'None'
    if (extras.value.popcornQty > 0) {
        extrasString = `Popcorn x${extras.value.popcornQty}`
        if (extras.value.isFreeEligible) {
            extrasString += ' (1 Free)'
        }
    }

    const ticket = {
        id: `BK-${Math.floor(Math.random() * 9000) + 1000}`,
        title: movie.value.title,
        cinema: 'Cinemax Phnom Penh',
        date: 'Today',
        time: '19:30',
        seats: selectedSeats.value,
        poster: movie.value.poster,
        price: finalTotal,
        total: finalTotal,
        discount: discountAmount.value,
        extras: extrasString
    }

    authStore.addTicket(ticket)
    authStore.showToast(`Success! You earned ${pointsEarned} points.`, 'success')

    setTimeout(() => {
        router.push('/profile')
    }, 1500)
}

onMounted(() => {
    const movieId = route.params.id
    movie.value = movieStore.getMovieById(movieId)
    if (!movie.value) router.push('/')
})
</script>

<style scoped>
.booking-view {
    padding-top: 100px;
    padding-bottom: 50px;
}

.page-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.btn-back {
    background: none;
    border: 1px solid #555;
    color: white;
    padding: 8px 16px;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}

.btn-back:hover {
    border-color: white;
}

.subtitle {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    margin: 0;
}

.booking-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 40px;
    align-items: start;
}

@media (max-width: 900px) {
    .booking-layout {
        grid-template-columns: 1fr;
    }
}
</style>