<template>
    <Transition name="modal-fade">
        <div v-if="visible" class="modal-overlay">
            <div class="modal-panel">

                <div class="panel-sidebar">
                    <div class="sidebar-content">
                        <h3>Order Summary</h3>
                        <div class="summary-row">
                            <span>Ticket Order</span>
                            <span>${{ total.toFixed(2) }}</span>
                        </div>
                        <div class="summary-row text-muted">
                            <span>Tax & Fees</span>
                            <span>$0.00</span>
                        </div>
                        <div class="total-row">
                            <span>Total due</span>
                            <span class="total-amount">${{ total.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="secure-footer">
                        <PhShieldCheck :size="16" weight="fill" class="secure-icon" />
                        <span>Payment is encrypted and secure.</span>
                    </div>
                </div>

                <div class="panel-main">
                    <button class="btn-close" @click="$emit('close')">
                        <PhX :size="20" />
                    </button>

                    <h2 class="form-title">Payment Details</h2>

                    <div class="payment-methods">
                        <button class="method-tab" :class="{ active: selectedMethod === 'card' }"
                            @click="selectedMethod = 'card'">
                            <PhCreditCard :size="20" />
                            <span>Card</span>
                        </button>
                        <button class="method-tab" :class="{ active: selectedMethod === 'apple' }"
                            @click="selectedMethod = 'apple'">
                            <PhAppleLogo :size="20" />
                            <span>Pay</span>
                        </button>
                        <button class="method-tab" :class="{ active: selectedMethod === 'paypal' }"
                            @click="selectedMethod = 'paypal'">
                            <PhPaypalLogo :size="20" />
                            <span>PayPal</span>
                        </button>
                    </div>

                    <form v-if="selectedMethod === 'card'" @submit.prevent="processPayment" class="checkout-form">

                        <div class="input-group">
                            <label>Card Number</label>
                            <div class="input-field-wrapper" :class="{ 'has-brand': cardBrand !== 'Unknown' }">
                                <input class="card-number" type="text" v-model="cardNumber" @input="formatCardNumber"
                                    placeholder="0000 0000 0000 0000" maxlength="19" :disabled="processing" required />
                                <div class="brand-icon-slot">
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="input-group">
                                <label>Expiry</label>
                                <input type="text" v-model="cardExpiry" @input="formatExpiry" placeholder="MM/YY"
                                    maxlength="5" :disabled="processing" required />
                            </div>
                            <div class="input-group">
                                <label>CVC</label>
                                <div class="input-field-wrapper">
                                    <input type="password" v-model="cardCvc" placeholder="123" maxlength="4"
                                        :disabled="processing" required />
                                </div>
                            </div>
                        </div>

                        <div class="input-group">
                            <label>Cardholder Name</label>
                            <input type="text" v-model="cardName" placeholder="Name on card" :disabled="processing"
                                required />
                        </div>

                        <button type="submit" class="btn-submit" :disabled="processing">
                            <span v-if="!processing">Pay ${{ total.toFixed(2) }}</span>
                            <div v-else class="spinner"></div>
                        </button>

                    </form>

                    <div v-else class="alt-payment-msg">
                        <p>Redirecting to {{ selectedMethod === 'apple' ? 'Apple Pay' : 'PayPal' }}...</p>
                        <div class="spinner"></div>
                    </div>

                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue'
import {
    PhX, PhCreditCard, PhLockKey, PhShieldCheck,
    PhAppleLogo, PhPaypalLogo
} from '@phosphor-icons/vue'

const props = defineProps(['visible', 'total'])
const emit = defineEmits(['close', 'payment-success'])

const selectedMethod = ref('card')
const cardNumber = ref('')
const cardName = ref('')
const cardExpiry = ref('')
const cardCvc = ref('')
const cardBrand = ref('Unknown')
const processing = ref(false)

// 1. Logic for Brand Detection
const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.startsWith('4')) cardBrand.value = 'Visa'
    else if (value.startsWith('5')) cardBrand.value = 'Mastercard'
    else cardBrand.value = 'Unknown'

    value = value.substring(0, 16)
    const formatted = value.match(/.{1,4}/g)?.join(' ') || ''
    cardNumber.value = formatted
}

const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    cardExpiry.value = value
}

const processPayment = () => {
    if (processing.value) return
    processing.value = true

    setTimeout(() => {
        processing.value = false
        emit('payment-success')
        resetForm()
    }, 2000)
}

const resetForm = () => {
    cardNumber.value = ''
    cardName.value = ''
    cardExpiry.value = ''
    cardCvc.value = ''
    cardBrand.value = 'Unknown'
}
</script>

<style scoped>
/* Overlay */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.card-number {
    width: 100%;
    max-width: 450px;
}

/* Main Panel - Split Layout */
.modal-panel {
    display: flex;
    width: 100%;
    max-width: 800px;
    background: #09090b;
    border: 1px solid #27272a;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

/* Sidebar (Left) */
.panel-sidebar {
    width: 280px;
    background: #18181b;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #27272a;
}

.panel-sidebar h3 {
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: white;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 0.9rem;
    color: #a1a1aa;
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #27272a;
    font-weight: 700;
    color: white;
}

.total-amount {
    font-size: 1.25rem;
}

.secure-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    color: #10b981;
    opacity: 0.8;
}

/* Main Form (Right) */
.panel-main {
    flex: 1;
    padding: 30px 40px;
    position: relative;
    background: #09090b;
}

.btn-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: #71717a;
    cursor: pointer;
    transition: 0.2s;
}

.btn-close:hover {
    color: white;
}

.form-title {
    font-size: 1.5rem;
    margin-bottom: 24px;
    color: white;
}

/* Payment Methods Tabs */
.payment-methods {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 30px;
}

.method-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    color: #a1a1aa;
    cursor: pointer;
    transition: 0.2s;
}

.method-tab:hover {
    background: #27272a;
    color: white;
}

.method-tab.active {
    background: #18181b;
    border-color: #e11d48;
    color: #e11d48;
    box-shadow: 0 0 0 1px #e11d48;
}

/* Form Inputs */
.checkout-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
}

.input-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.input-group label {
    font-size: 0.85rem;
    color: #a1a1aa;
    margin-bottom: 8px;
    font-weight: 500;
}

.input-field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

input {
    padding: 12px 16px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    color: white;
    font-size: 0.95rem;
    outline: none;
    transition: 0.2s;
}

input:focus {
    border-color: #e11d48;
    background: #09090b;
}

/* Icon placement */
.brand-icon-slot {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.field-icon-right {
    position: absolute;
    right: 12px;
    color: #52525b;
}

.default-icon {
    color: #52525b;
}

/* Submit Button */
.btn-submit {
    margin-top: 10px;
    padding: 14px;
    background: #e11d48;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.btn-submit:hover:not(:disabled) {
    background: #be123c;
}

.alt-payment-msg {
    text-align: center;
    padding: 40px;
    color: #a1a1aa;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Mobile Responsive */
@media (max-width: 650px) {
    .modal-panel {
        flex-direction: column;
        max-width: 95%;
    }

    .panel-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #27272a;
        padding: 20px;
    }

    .panel-main {
        padding: 20px;
    }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>