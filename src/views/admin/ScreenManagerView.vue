<template>
    <div class="manager-view">
        <div class="page-header">
            <h2>Theater Screens</h2>
            <button class="btn-primary">Add Screen</button>
        </div>

        <div class="screens-grid">

            <div v-for="screen in screens" :key="screen.id" class="screen-card">
                <div class="card-header">
                    <h3>{{ screen.name }}</h3>
                    <span class="badge">{{ screen.type }}</span>
                </div>

                <div class="screen-stats">
                    <div class="stat">
                        <span class="label">Capacity</span>
                        <span class="value">{{ screen.capacity }} Seats</span>
                    </div>
                    <div class="stat">
                        <span class="label">Sound</span>
                        <span class="value">{{ screen.sound }}</span>
                    </div>
                </div>

                <div class="pricing-section">
                    <h4>Base Pricing</h4>
                    <div class="price-row">
                        <span>Standard</span>
                        <span class="price-tag">${{ screen.price.standard }}</span>
                    </div>
                    <div class="price-row">
                        <span>VIP</span>
                        <span class="price-tag">${{ screen.price.vip }}</span>
                    </div>
                </div>

                <div class="card-actions">
                    <button class="btn-edit">Edit Config</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const screens = ref([
    {
        id: 1,
        name: 'Hall 1 - Titan',
        type: 'IMAX',
        capacity: 240,
        sound: 'Dolby Atmos',
        price: { standard: 12.00, vip: 18.00 }
    },
    {
        id: 2,
        name: 'Hall 2',
        type: 'Standard',
        capacity: 120,
        sound: 'Dolby 7.1',
        price: { standard: 8.00, vip: 12.00 }
    },
    {
        id: 3,
        name: 'Hall 3 - Gold Class',
        type: 'VIP',
        capacity: 40,
        sound: 'THX',
        price: { standard: 25.00, vip: 25.00 }
    },
])
</script>

<style scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.screens-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

.screen-card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-bg-highlight);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: transform 0.2s;
}

.screen-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-card);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 20px;
}

.card-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.badge {
    background: var(--color-accent);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
}

.screen-stats {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.stat {
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
}

.value {
    font-weight: 500;
}

.pricing-section {
    background: var(--color-bg-primary);
    padding: 16px;
    border-radius: var(--radius-md);
    margin-bottom: 20px;
}

.pricing-section h4 {
    margin: 0 0 10px 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

.price-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 0.9rem;
}

.price-tag {
    color: var(--color-accent-gold);
    font-weight: bold;
}

.card-actions .btn-edit {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid var(--color-bg-highlight);
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
    cursor: pointer;
}

.card-actions .btn-edit:hover {
    background: var(--color-bg-highlight);
    color: white;
}
</style>