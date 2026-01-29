<template>
    <div class="summary-card fade-in">
        <div class="card-header">
            <div class="poster-thumb">
                <PhFilmStrip :size="24" weight="duotone" />
            </div>
            <div class="header-text">
                <h3>{{ movieTitle }}</h3>
                <p class="cinema-name">
                    <PhMapPin :size="14" weight="fill" /> {{ cinemaName }}
                </p>
            </div>
        </div>

        <div class="divider"></div>

        <div class="details-grid">
            <div class="detail-item">
                <span class="label">Date</span>
                <span class="value">{{ date }}</span>
            </div>
            <div class="detail-item">
                <span class="label">Time</span>
                <span class="value">{{ time }}</span>
            </div>
            <div class="detail-item full-width">
                <span class="label">Selected Seats <span class="count">({{ selectedSeats.length }})</span></span>
                <div class="seats-pill-list">
                    <span v-if="selectedSeats.length === 0" class="placeholder">-</span>
                    <span v-for="seat in selectedSeats" :key="seat" class="seat-badge">{{ seat }}</span>
                </div>
            </div>
        </div>

        <div class="section-title">Extras</div>
        <div class="extras-container">
            <div class="extra-row">
                <div class="extra-info">
                    <span class="extra-name">Large Popcorn</span>
                    <span class="extra-price">$8.00</span>
                </div>
                <div class="stepper">
                    <button @click="updatePopcorn(-1)" :disabled="popcornQty === 0">
                        <PhMinus :size="14" />
                    </button>
                    <span class="qty">{{ popcornQty }}</span>
                    <button @click="updatePopcorn(1)">
                        <PhPlus :size="14" />
                    </button>
                </div>
            </div>
        </div>

        <div class="promo-section">
            <div class="input-group" :class="{ 'success': promoApplied }">
                <div class="icon-box">
                    <PhTag :size="18" />
                </div>
                <input v-model="promoCode" type="text" placeholder="Promo Code" :disabled="promoApplied"
                    @keyup.enter="applyPromo" />
                <button v-if="!promoApplied" class="btn-apply" @click="applyPromo" :disabled="!promoCode">
                    Apply
                </button>
                <button v-else class="btn-remove" @click="removePromo">
                    <PhX :size="14" />
                </button>
            </div>
            <p v-if="promoMessage" class="promo-feedback" :class="promoStatus">{{ promoMessage }}</p>
        </div>

        <div class="divider"></div>

        <div class="price-breakdown">
            <div class="price-row">
                <span>Tickets ({{ selectedSeats.length }})</span>
                <span>${{ (selectedSeats.length * ticketPrice).toFixed(2) }}</span>
            </div>
            <div class="price-row">
                <span>Booking Fee</span>
                <span>$1.50</span>
            </div>
            <div class="price-row" v-if="popcornQty > 0">
                <span>Add-ons</span>
                <span>${{ (popcornQty * 8).toFixed(2) }}</span>
            </div>
            <div class="price-row discount" v-if="discountValue > 0">
                <span>Discount</span>
                <span>-${{ discountValue.toFixed(2) }}</span>
            </div>
        </div>

        <div class="total-section">
            <div class="total-row">
                <span>Total Amount</span>
                <span class="final-price">${{ calculateTotal.toFixed(2) }}</span>
            </div>

            <button class="btn-proceed" :disabled="selectedSeats.length === 0" @click="$emit('proceed')">
                <span>Confirm Booking</span>
                <PhArrowRight :size="18" weight="bold" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePromoStore } from '@/store/promoStore'
import {
    PhFilmStrip, PhMapPin, PhTag, PhMinus, PhPlus, PhX, PhArrowRight
} from '@phosphor-icons/vue'

const props = defineProps(['movieTitle', 'cinemaName', 'date', 'time', 'selectedSeats', 'ticketPrice', 'userPoints'])
const emit = defineEmits(['update:discount', 'update:extras', 'proceed'])

const promoStore = usePromoStore()

// State
const popcornQty = ref(0)
const promoCode = ref('')
const promoApplied = ref(false)
const appliedPromoData = ref(null)
const promoMessage = ref('')
const promoStatus = ref('')

// Computed
const discountValue = computed(() => {
    if (!appliedPromoData.value) return 0
    const subtotal = (props.selectedSeats.length * props.ticketPrice)
    return (subtotal * appliedPromoData.value.discount) / 100
})

const calculateTotal = computed(() => {
    const subtotal = (props.selectedSeats.length * props.ticketPrice) + 1.50 + (popcornQty.value * 8)
    return Math.max(0, subtotal - discountValue.value)
})

// Actions
const updatePopcorn = (delta) => {
    if (popcornQty.value + delta >= 0) {
        popcornQty.value += delta
        emit('update:extras', { popcornQty: popcornQty.value, popcornPrice: popcornQty.value * 8 })
    }
}

const applyPromo = () => {
    if (!promoCode.value) return
    const promo = promoStore.promos.find(p => p.code === promoCode.value && p.status === 'Active')

    if (promo) {
        promoApplied.value = true
        appliedPromoData.value = promo
        promoMessage.value = `Success! ${promo.discount}% discount applied.`
        promoStatus.value = 'success'
        emit('update:discount', discountValue.value)
    } else {
        promoMessage.value = 'Invalid or expired code'
        promoStatus.value = 'error'
    }
}

const removePromo = () => {
    promoApplied.value = false
    promoCode.value = ''
    appliedPromoData.value = null
    promoMessage.value = ''
    discountValue.value = 0
    emit('update:discount', 0)
}

// Recalculate discount if seats change while promo is active
watch(() => props.selectedSeats.length, () => {
    if (promoApplied.value) {
        emit('update:discount', discountValue.value)
    }
})
</script>

<style scoped>
/* Glass Card Container */
.summary-card {
    background: rgba(30, 30, 35, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
}

/* Header */
.card-header {
    display: flex;
    gap: 16px;
    align-items: center;
}

.poster-thumb {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--color-accent), #4f46e5);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
}

.header-text h3 {
    margin: 0 0 4px 0;
    font-size: 1.1rem;
    font-weight: 700;
}

.cinema-name {
    margin: 0;
    font-size: 0.85rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 4px;
}

.divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    width: 100%;
}

/* Details Grid */
.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-item.full-width {
    grid-column: span 2;
}

.label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #6b7280;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.value {
    font-size: 0.95rem;
    font-weight: 600;
    color: #e5e7eb;
}

.count {
    color: var(--color-accent);
}

.seats-pill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
}

.seat-badge {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-accent-gold);
}

.placeholder {
    font-size: 0.9rem;
    color: #555;
}

/* Extras */
.section-title {
    font-size: 0.85rem;
    text-transform: uppercase;
    color: #6b7280;
    font-weight: 600;
    margin-bottom: -10px;
}

.extras-container {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.extra-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.extra-info {
    display: flex;
    flex-direction: column;
}

.extra-name {
    font-size: 0.9rem;
    font-weight: 500;
}

.extra-price {
    font-size: 0.8rem;
    color: #9ca3af;
}

.stepper {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px;
    border-radius: 8px;
}

.stepper button {
    width: 28px;
    height: 28px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}

.stepper button:hover:not(:disabled) {
    background: var(--color-accent);
}

.stepper button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.qty {
    font-weight: bold;
    width: 20px;
    text-align: center;
}

/* Promo Section */
.input-group {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 4px;
    transition: 0.3s;
}

.input-group:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(225, 29, 72, 0.2);
}

.input-group.success {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.05);
}

.icon-box {
    padding: 0 10px;
    color: #6b7280;
    display: flex;
}

.input-group input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    padding: 10px 0;
    font-size: 0.9rem;
    outline: none;
    min-width: 0;
}

.btn-apply {
    background: white;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.85rem;
    margin-right: 2px;
}

.btn-remove {
    background: rgba(255, 255, 255, 0.1);
    color: #ef4444;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
}

.promo-feedback {
    font-size: 0.8rem;
    margin: 8px 0 0 4px;
}

.promo-feedback.success {
    color: #10b981;
}

.promo-feedback.error {
    color: #ef4444;
}

/* Price Breakdown */
.price-breakdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.price-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #d1d5db;
}

.price-row.discount {
    color: #10b981;
}

/* Total & Action */
.total-section {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: 10px;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
}

.total-row span:first-child {
    color: #9ca3af;
    font-size: 0.9rem;
}

.final-price {
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
    line-height: 1;
}

.btn-proceed {
    width: 100%;
    background: var(--color-accent);
    color: white;
    border: none;
    padding: 16px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(225, 29, 72, 0.4);
}

.btn-proceed:hover:not(:disabled) {
    background: #be123c;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(225, 29, 72, 0.5);
}

.btn-proceed:disabled {
    background: #374151;
    color: #6b7280;
    cursor: not-allowed;
    box-shadow: none;
}

.fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>