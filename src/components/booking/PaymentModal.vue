<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Secure Payment</h3>
                <button class="btn-close" @click="$emit('close')">
                    <PhX :size="20" />
                </button>
            </div>

            <div class="modal-body">
                <div class="amount-display">
                    <span>Total Amount</span>
                    <span class="amount">${{ total.toFixed(2) }}</span>
                </div>

                <form @submit.prevent="processPayment">
                    <div class="form-group">
                        <label>Card Number</label>
                        <div class="input-wrapper">
                            <PhCreditCard :size="20" class="icon" />
                            <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" required />
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group">
                            <label>Expiry</label>
                            <input type="text" placeholder="MM/YY" maxlength="5" required />
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="password" placeholder="123" maxlength="3" required />
                        </div>
                    </div>

                    <button type="submit" class="btn-pay" :disabled="processing">
                        <PhLockKey :size="20" weight="fill" />
                        {{ processing ? 'Processing...' : `Pay $${total.toFixed(2)}` }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { PhX, PhCreditCard, PhLockKey } from '@phosphor-icons/vue'

const props = defineProps({
    visible: Boolean,
    total: Number
})

const emit = defineEmits(['close', 'payment-success'])

const processing = ref(false)

const processPayment = async () => {
    processing.value = true

    // Simulate network delay (Fake Payment)
    await new Promise(resolve => setTimeout(resolve, 2000))

    processing.value = false
    emit('payment-success') // Tell parent that payment worked
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: var(--color-bg-secondary);
    width: 90%;
    max-width: 400px;
    border-radius: 16px;
    border: 1px solid var(--color-bg-highlight);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-bg-highlight);
    background: rgba(255, 255, 255, 0.02);
}

.modal-header h3 {
    margin: 0;
    font-size: 1.1rem;
}

.btn-close {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
}

.btn-close:hover {
    color: white;
}

.modal-body {
    padding: 20px;
}

.amount-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 12px;
    background: rgba(46, 204, 113, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(46, 204, 113, 0.2);
}

.amount-display .amount {
    font-weight: 800;
    color: #2ecc71;
    font-size: 1.2rem;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-size: 0.85rem;
    color: #aaa;
    margin-bottom: 6px;
}

.input-wrapper {
    position: relative;
}

.input-wrapper .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

input {
    width: 100%;
    padding: 10px 12px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-bg-highlight);
    border-radius: 6px;
    color: white;
    outline: none;
    font-family: monospace;
}

.input-wrapper input {
    padding-left: 40px;
}

input:focus {
    border-color: var(--color-accent);
}

.row {
    display: flex;
    gap: 12px;
}

.row .form-group {
    flex: 1;
}

.btn-pay {
    width: 100%;
    padding: 14px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-pay:disabled {
    background: #555;
    cursor: not-allowed;
}

.btn-pay:hover:not(:disabled) {
    background: #f40612;
}
</style>