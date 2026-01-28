<template>
    <div class="manager-view">
        <div class="page-header">
            <h2>Showtime Scheduling</h2>
            <button class="btn-primary">Create Schedule</button>
        </div>

        <div class="halls-container">
            <div v-for="hall in halls" :key="hall.id" class="hall-row">
                <div class="hall-info">
                    <h3>{{ hall.name }}</h3>
                    <span class="hall-type">{{ hall.type }}</span>
                </div>

                <div class="timeline">
                    <div v-for="show in hall.shows" :key="show.id" class="show-block"
                        :style="{ left: show.startPercent + '%', width: show.durationPercent + '%' }">
                        <span class="show-title">{{ show.movie }}</span>
                        <span class="show-time">{{ show.time }}</span>
                    </div>

                    <div class="time-marker" style="left: 0%">10:00</div>
                    <div class="time-marker" style="left: 50%">16:00</div>
                    <div class="time-marker" style="left: 100%">22:00</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const halls = ref([
    {
        id: 1, name: 'Hall 1', type: 'IMAX',
        shows: [
            { id: 101, movie: 'Avatar 2', time: '10:00 - 13:30', startPercent: 0, durationPercent: 30 },
            { id: 102, movie: 'Avatar 2', time: '14:00 - 17:30', startPercent: 35, durationPercent: 30 },
            { id: 103, movie: 'Top Gun', time: '19:00 - 21:00', startPercent: 75, durationPercent: 20 }
        ]
    },
    {
        id: 2, name: 'Hall 2', type: 'Standard',
        shows: [
            { id: 201, movie: 'Barbie', time: '12:00 - 14:00', startPercent: 15, durationPercent: 20 },
            { id: 202, movie: 'Oppenheimer', time: '15:00 - 18:00', startPercent: 45, durationPercent: 25 }
        ]
    }
])
</script>

<style scoped>
.manager-view {
    padding-bottom: 50px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.halls-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.hall-row {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-bg-highlight);
    border-radius: var(--radius-md);
    padding: 20px;
}

.hall-info {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.hall-info h3 {
    margin: 0;
    color: white;
}

.hall-type {
    font-size: 0.8rem;
    background: #333;
    color: #aaa;
    padding: 2px 8px;
    border-radius: 4px;
}

.timeline {
    position: relative;
    height: 60px;
    background: #252830;
    border-radius: var(--radius-sm);
    width: 100%;
}

.show-block {
    position: absolute;
    top: 5px;
    bottom: 5px;
    background: var(--color-accent);
    border-radius: 4px;
    padding: 4px 8px;
    color: white;
    font-size: 0.75rem;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border-left: 2px solid rgba(255, 255, 255, 0.3);
}

.show-title {
    font-weight: bold;
}

.show-time {
    font-size: 0.7rem;
    opacity: 0.8;
}

.time-marker {
    position: absolute;
    bottom: -20px;
    font-size: 0.7rem;
    color: var(--color-text-muted);
    transform: translateX(-50%);
}
</style>