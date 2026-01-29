<template>
    <div class="seat-map-container">

        <div class="screen-container">
            <div class="screen"></div>
            <p class="text-screen">SCREEN</p>
        </div>

        <div class="seats-grid">
            <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="seat-row">

                <span class="row-label">{{ row.label }}</span>

                <div class="row-seats">
                    <button v-for="seat in row.seats" :key="seat.id" class="seat" :class="{
                        'selected': selectedSeats.includes(seat.id),
                        'booked': seat.status === 'booked',
                        'vip': seat.type === 'vip'
                    }" :disabled="seat.status === 'booked'" @click="toggleSeat(seat)">
                        <span class="seat-num">{{ seat.number }}</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="legend">
            <div class="legend-item">
                <div class="seat-dot available"></div> Available
            </div>
            <div class="legend-item">
                <div class="seat-dot selected"></div> Selected
            </div>
            <div class="legend-item">
                <div class="seat-dot booked"></div> Sold
            </div>
            <div class="legend-item">
                <div class="seat-dot vip"></div> VIP ($12)
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['update:selection'])
const selectedSeats = ref([])

// Mock Data for Rows
const rows = ref([
    { label: 'A', seats: generateSeats('A', 10, 'standard') },
    { label: 'B', seats: generateSeats('B', 10, 'standard') },
    { label: 'C', seats: generateSeats('C', 10, 'standard') }, // Wider row
    { label: 'D', seats: generateSeats('D', 10, 'vip') },      // VIP Row
])

// Helper to generate seat objects
function generateSeats(rowLabel, count, type) {
    return Array.from({ length: count }, (_, i) => ({
        id: `${rowLabel}${i + 1}`,
        number: i + 1,
        type: type,
        status: Math.random() > 0.8 ? 'booked' : 'available' // Randomly book some
    }))
}

const toggleSeat = (seat) => {
    if (seat.status === 'booked') return

    if (selectedSeats.value.includes(seat.id)) {
        // Deselect
        selectedSeats.value = selectedSeats.value.filter(id => id !== seat.id)
    } else {
        // Select
        selectedSeats.value.push(seat.id)
    }

    // Notify parent component
    emit('update:selection', selectedSeats.value)
}
</script>

<style scoped>
.seat-map-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
}

/* Screen Visual */
.screen-container {
    margin-bottom: 40px;
    text-align: center;
    width: 100%;
}

.screen {
    height: 40px;
    width: 80%;
    margin: 0 auto;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
    border-top: 4px solid var(--color-accent);
    border-radius: 50% 50% 0 0 / 20px 20px 0 0;
    box-shadow: 0 -15px 30px rgba(255, 255, 255, 0.1);
    transform: rotateX(-30deg);
}

.text-screen {
    margin-top: 10px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    color: var(--color-text-muted);
}

/* Rows */
.seat-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 12px;
}

.row-label {
    color: var(--color-text-muted);
    width: 20px;
    font-weight: bold;
}

.row-seats {
    display: flex;
    gap: 8px;
}

/* Individual Seat */
.seat {
    width: 32px;
    height: 32px;
    border-radius: 8px 8px 4px 4px;
    border: none;
    background-color: #3f3f46;
    color: transparent;
    cursor: pointer;
    transition: var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
}

.seat:hover:not(:disabled) {
    background-color: var(--color-accent);
    transform: scale(1.1);
    color: white;
}

/* Seat States */
.seat.selected {
    background-color: var(--color-accent-gold);
    color: black;
    box-shadow: 0 0 10px var(--color-accent-gold);
}

.seat.booked {
    background-color: #27272a;
    opacity: 0.5;
    cursor: not-allowed;
    border: 1px solid #3f3f46;
}

.seat.vip {
    border-bottom: 3px solid var(--color-accent-gold);
}

/* Legend */
.legend {
    display: flex;
    gap: 24px;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--color-bg-highlight);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--color-text-muted);
}

.seat-dot {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

.seat-dot.available {
    background: #3f3f46;
}

.seat-dot.selected {
    background: var(--color-accent-gold);
}

.seat-dot.booked {
    background: #27272a;
    border: 1px solid #3f3f46;
}

.seat-dot.vip {
    background: #3f3f46;
    border-bottom: 2px solid var(--color-accent-gold);
}
</style>