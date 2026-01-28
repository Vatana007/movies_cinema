<template>
    <div class="manager-view">
        <div class="page-header">
            <div class="header-content">
                <h2>Promotion Hub</h2>
                <p class="subtitle">Create and track discount campaigns.</p>
            </div>
        </div>

        <div class="promo-grid">

            <div class="panel create-panel">
                <div class="panel-header">
                    <div class="icon-badge">
                        <PhMagicWand weight="fill" />
                    </div>
                    <h3>Generate Code</h3>
                </div>

                <form @submit.prevent="handleGenerate" class="modern-form">

                    <div class="form-group">
                        <label>Campaign Name</label>
                        <div class="input-wrapper">
                            <PhTag class="input-icon" />
                            <input v-model="eventName" type="text" placeholder="e.g. Summer Sale" required />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Discount Value</label>
                        <div class="input-wrapper">
                            <PhPercent class="input-icon" />
                            <input v-model="discount" type="number" min="1" max="100" placeholder="20" required />
                        </div>
                    </div>

                    <button type="submit" class="btn-generate">
                        <span>Create Voucher</span>
                        <PhArrowRight weight="bold" />
                    </button>
                </form>

                <transition name="slide-up">
                    <div v-if="lastGenerated" class="coupon-ticket">
                        <div class="ticket-left">
                            <span class="ticket-label">CODE</span>
                            <strong class="ticket-code">{{ lastGenerated.code }}</strong>
                        </div>
                        <div class="ticket-right" @click="copyCode(lastGenerated.code)">
                            <PhCopy :size="20" />
                            <span>Copy</span>
                        </div>
                        <div class="ticket-rip"></div>
                    </div>
                </transition>
            </div>

            <div class="panel list-panel">
                <div class="panel-header">
                    <h3>Active Coupons</h3>
                    <div class="count-badge">{{ promoStore.promos.length }} Active</div>
                </div>

                <div class="table-wrapper">
                    <table class="promo-table">
                        <thead>
                            <tr>
                                <th>Campaign</th>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="promo in promoStore.promos" :key="promo.id">
                                <td>
                                    <span class="campaign-name">{{ promo.name }}</span>
                                </td>
                                <td>
                                    <button class="code-chip" @click="copyCode(promo.code)">
                                        {{ promo.code }}
                                        <PhCopy :size="12" class="copy-icon" />
                                    </button>
                                </td>
                                <td>
                                    <span class="discount-tag">{{ promo.discount }}% OFF</span>
                                </td>
                                <td>
                                    <span class="status-dot active">Active</span>
                                </td>
                                <td>
                                    <button class="btn-delete" @click="promoStore.deletePromo(promo.id)">
                                        <PhTrash :size="16" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="promoStore.promos.length === 0" class="empty-state">
                        <PhTicket :size="48" weight="duotone" />
                        <p>No active coupons yet.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePromoStore } from '@/store/promoStore'
import {
    PhMagicWand, PhTag, PhPercent, PhArrowRight,
    PhCopy, PhTrash, PhTicket
} from '@phosphor-icons/vue'

const promoStore = usePromoStore()
const eventName = ref('')
const discount = ref('')
const lastGenerated = ref(null)

const handleGenerate = () => {
    promoStore.generateCode(eventName.value, discount.value)
    // Get the newly created promo (first in list)
    lastGenerated.value = promoStore.promos[0]

    // Reset inputs
    eventName.value = ''
    discount.value = ''

    // Auto-hide ticket preview after 5 seconds
    setTimeout(() => { lastGenerated.value = null }, 8000)
}

const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    // Optional: Add a toast notification here
    alert(`Copied: ${code}`)
}
</script>

<style scoped>
.manager-view {
    padding: 30px;
    color: #e4e4e7;
}

/* HEADER */
.page-header {
    margin-bottom: 32px;
}

.header-content h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin: 0 0 4px 0;
}

.subtitle {
    color: #888;
    margin: 0;
    font-size: 0.9rem;
}

/* GRID LAYOUT */
.promo-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 24px;
    align-items: start;
}

/* PANELS SHARED STYLES */
.panel {
    background: #12141a;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.panel-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.panel-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
}

/* LEFT PANEL: GENERATOR */
.icon-badge {
    width: 36px;
    height: 36px;
    background: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 1.2rem;
}

.modern-form {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 14px;
    color: #555;
    font-size: 1.1rem;
}

.input-wrapper input {
    width: 100%;
    background: #09090b;
    border: 1px solid #27272a;
    padding: 12px 12px 12px 42px;
    border-radius: 10px;
    color: white;
    font-size: 0.95rem;
    outline: none;
    transition: 0.3s;
}

.input-wrapper input:focus {
    border-color: var(--color-accent);
    background: #000;
}

.btn-generate {
    background: linear-gradient(135deg, var(--color-accent), #f43f5e);
    border: none;
    padding: 14px;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
}

.btn-generate:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(229, 9, 20, 0.5);
}

/* COUPON TICKET */
.coupon-ticket {
    margin: 0 24px 24px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 12px;
    display: flex;
    position: relative;
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
    overflow: hidden;
}

.ticket-left {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.ticket-label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 700;
    letter-spacing: 1px;
}

.ticket-code {
    font-family: monospace;
    font-size: 1.4rem;
    color: white;
    letter-spacing: 1px;
    margin-top: 4px;
}

.ticket-right {
    width: 80px;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-left: 2px dashed rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.ticket-right:hover {
    background: rgba(0, 0, 0, 0.2);
}

/* RIGHT PANEL: LIST */
.count-badge {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 10px;
    border-radius: 50px;
    color: #ccc;
}

.table-wrapper {
    padding: 0;
}

.promo-table {
    width: 100%;
    border-collapse: collapse;
}

.promo-table th {
    text-align: left;
    padding: 16px 24px;
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    background: rgba(255, 255, 255, 0.02);
}

.promo-table td {
    padding: 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
}

.campaign-name {
    font-weight: 600;
    color: white;
}

.code-chip {
    background: #1f2937;
    border: 1px solid #374151;
    color: var(--color-accent);
    font-family: monospace;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
}

.code-chip:hover {
    border-color: var(--color-accent);
    background: rgba(229, 9, 20, 0.1);
}

.copy-icon {
    opacity: 0.5;
}

.discount-tag {
    color: #10b981;
    font-weight: 700;
    background: rgba(16, 185, 129, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
}

.status-dot {
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ccc;
}

.status-dot::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ccc;
}

.status-dot.active {
    color: #10b981;
}

.status-dot.active::before {
    background: #10b981;
}

.btn-delete {
    background: transparent;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: 0.2s;
}

.btn-delete:hover {
    background: rgba(239, 68, 68, 0.15);
}

.empty-state {
    padding: 40px;
    text-align: center;
    color: #555;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@media (max-width: 900px) {
    .promo-grid {
        grid-template-columns: 1fr;
    }
}
</style>