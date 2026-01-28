<template>
    <div class="ticket-summary">
        <h3>Booking Summary</h3>

        <div class="summary-row">
            <span class="label">Movie</span>
            <span class="value highlight">{{ movieTitle }}</span>
        </div>

        <div class="summary-row">
            <span class="label">Seats ({{ selectedSeats.length }})</span>
            <span class="value seats-list">{{ selectedSeats.join(', ') || '-' }}</span>
        </div>

        <div class="divider"></div>

        <div class="summary-row">
            <span class="label">Tickets</span>
            <span class="value">${{ subtotal.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
            <span class="label">Booking Fee</span>
            <span class="value">${{ bookingFee.toFixed(2) }}</span>
        </div>

        <div v-if="discountAmount > 0" class="summary-row discount">
            <span class="label">Discount ({{ appliedCode }})</span>
            <span class="value">-${{ discountAmount.toFixed(2) }}</span>
        </div>

        <div class="divider"></div>

        <div class="total-row">
            <span>Total</span>
            <span class="total-amount">${{ grandTotal.toFixed(2) }}</span>
        </div>

        <div class="promo-section">
            <div class="input-group" :class="{ disabled: discountAmount > 0 }">
                <div class="icon-wrapper">
                    <PhTag :size="18" />
                </div>
                <input v-model="promoInput" type="text" placeholder="Promo Code" @keyup.enter="applyPromo"
                    :disabled="discountAmount > 0" />

                <button v-if="!discountAmount" @click="applyPromo" class="btn-apply" :disabled="!promoInput">
                    Apply
                </button>
                <button v-else @click="removePromo" class="btn-remove">
                    <PhX :size="16" weight="bold" />
                </button>
            </div>

            <transition name="fade">
                <p v-if="message" :class="['promo-msg', messageType]">
                    <component :is="messageType === 'success' ? PhCheckCircle : PhWarningCircle" :size="16"
                        weight="fill" />
                    {{ message }}
                </p>
            </transition>
        </div>

        <button class="btn-checkout" :disabled="selectedSeats.length === 0" @click="handleCheckout">
            Confirm Payment
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePromoStore } from '@/store/promoStore'
import {
    PhTag, PhCheckCircle, PhWarningCircle, PhX
} from '@phosphor-icons/vue'

const props = defineProps({
    selectedSeats: {
        type: Array,
        default: () => []
    },
    ticketPrice: {
        type: Number,
        default: 12
    },
    movieTitle: {
        type: String,
        default: 'Unknown Movie'
    }
})

const emit = defineEmits(['proceed'])
const promoStore = usePromoStore()

// State
const promoInput = ref('')
const appliedCode = ref('')
const discountAmount = ref(0)
const message = ref('')
const messageType = ref('') // 'success' | 'error'

// Constants
const bookingFee = 1.50

// Computed Values
const subtotal = computed(() => props.selectedSeats.length * props.ticketPrice)

const grandTotal = computed(() => {
    const total = subtotal.value + bookingFee - discountAmount.value
    return Math.max(total, 0) // Ensure total never drops below zero
})

// Methods
const applyPromo = () => {
    // 1. Reset previous states
    message.value = ''
    messageType.value = ''

    const code = promoInput.value.trim().toUpperCase()

    if (!code) return

    // 2. Validate against Promo Store
    const promo = promoStore.getPromo(code)

    if (promo) {
        // Calculate Percentage Discount based on Subtotal
        const discountVal = subtotal.value * (promo.discount / 100)

        discountAmount.value = discountVal
        appliedCode.value = promo.code
        message.value = `${promo.name}: ${promo.discount}% Off Applied!`
        messageType.value = 'success'
    } else {
        message.value = "Invalid or expired code"
        messageType.value = 'error'
        discountAmount.value = 0
    }
}

const removePromo = () => {
    promoInput.value = ''
    appliedCode.value = ''
    discountAmount.value = 0
    message.value = ''
    messageType.value = ''
}

const handleCheckout = () => {
    // Send all final data to parent for processing
    emit('proceed', {
        seats: props.selectedSeats,
        subtotal: subtotal.value,
        fee: bookingFee,
        discount: discountAmount.value,
        total: grandTotal.value,
        promoCode: appliedCode.value
    })
}
</script>

<style scoped>
.ticket-summary {
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 24px;
    color: #e4e4e7;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    position: sticky;
    top: 20px;
}

h3 {
    margin: 0 0 24px 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.5px;
}

/* Rows */
.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 0.95rem;
    color: #a1a1aa;
}

.summary-row .value {
    color: white;
    font-weight: 500;
}

.summary-row .highlight {
    color: var(--color-accent);
    font-weight: 600;
}

.summary-row .seats-list {
    max-width: 150px;
    text-align: right;
}

.summary-row.discount {
    color: #10b981;
}

.summary-row.discount .value {
    color: #10b981;
    font-weight: 700;
}

.divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 16px 0;
}

/* Total */
.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 1.1rem;
    font-weight: 700;
}

.total-amount {
    font-size: 1.6rem;
    color: var(--color-accent);
    text-shadow: 0 0 20px rgba(229, 9, 20, 0.4);
}

/* Promo Section */
.promo-section {
    margin-bottom: 24px;
}

.input-group {
    display: flex;
    align-items: center;
    background: #09090b;
    border: 1px solid #27272a;
    border-radius: 10px;
    padding: 4px;
    transition: 0.2s;
}

.input-group:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.1);
}

.input-group.disabled {
    opacity: 0.8;
    background: #111;
}

.icon-wrapper {
    padding: 0 12px;
    color: #666;
    display: flex;
    align-items: center;
}

.input-group input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    padding: 12px 0;
    outline: none;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.input-group input:disabled {
    color: #888;
}

.input-group input::placeholder {
    color: #444;
    text-transform: none;
    font-weight: 400;
}

/* Promo Buttons */
.btn-apply {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
    margin-right: 4px;
}

.btn-apply:hover:not(:disabled) {
    background: var(--color-accent);
}

.btn-apply:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-remove {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 4px;
    transition: 0.2s;
}

.btn-remove:hover {
    background: #ef4444;
    color: white;
}

/* Feedback Messages */
.promo-msg {
    margin: 10px 0 0 0;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    font-weight: 500;
}

.promo-msg.success {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.promo-msg.error {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

/* Main Button */
.btn-checkout {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--color-accent), #f43f5e);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
}

.btn-checkout:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(229, 9, 20, 0.5);
    filter: brightness(1.1);
}

.btn-checkout:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
    box-shadow: none;
}

/* Vue Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>