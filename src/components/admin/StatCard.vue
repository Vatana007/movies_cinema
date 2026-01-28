<template>
    <div class="stat-card">
        <div class="icon-wrapper" :style="{ backgroundColor: bgColor, color: iconColor }">
            <slot name="icon"></slot>
        </div>

        <div class="content">
            <h4 class="label">{{ label }}</h4>
            <div class="value">{{ value }}</div>

            <div class="trend" v-if="trend">
                <span :class="trend > 0 ? 'up' : 'down'">
                    {{ trend > 0 ? '+' : '' }}{{ trend }}%
                </span>
                <span class="since">vs last month</span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    value: String,
    trend: Number,
    bgColor: { type: String, default: 'rgba(255,255,255,0.05)' },
    iconColor: { type: String, default: 'white' }
})
</script>

<style scoped>
.stat-card {
    background: var(--color-bg-secondary);
    padding: 24px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-bg-highlight);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.2s;
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-text-muted);
}

.icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.content {
    flex: 1;
}

.label {
    margin: 0 0 4px 0;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    font-weight: 500;
}

.value {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--color-text-main);
    line-height: 1.2;
}

.trend {
    margin-top: 6px;
    font-size: 0.8rem;
    display: flex;
    gap: 6px;
}

.trend .up {
    color: #2ecc71;
    font-weight: bold;
}

.trend .down {
    color: #e74c3c;
    font-weight: bold;
}

.trend .since {
    color: var(--color-text-muted);
    opacity: 0.7;
}
</style>