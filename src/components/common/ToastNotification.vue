<template>
    <Transition name="slide-fade">
        <div v-if="authStore.toast.visible" class="toast-notification" :class="authStore.toast.type">
            <div class="icon-wrapper">
                <PhCheckCircle v-if="authStore.toast.type === 'success'" :size="24" weight="fill" />
                <PhWarningCircle v-if="authStore.toast.type === 'error'" :size="24" weight="fill" />
            </div>

            <div class="toast-content">
                <h4 class="toast-title">{{ authStore.toast.type === 'success' ? 'Success' : 'Error' }}</h4>
                <p class="toast-message">{{ authStore.toast.message }}</p>
            </div>

            <button class="btn-close" @click="authStore.toast.visible = false">
                <PhX :size="16" />
            </button>
        </div>
    </Transition>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
import { PhCheckCircle, PhWarningCircle, PhX } from '@phosphor-icons/vue'

const authStore = useAuthStore()
</script>

<style scoped>
.toast-notification {
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: rgba(20, 20, 25, 0.95);
    backdrop-filter: blur(10px);
    padding: 16px 20px;
    border-radius: 12px;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
}

/* Success Style */
.toast-notification.success {
    border-left: 4px solid #2ecc71;
}

.toast-notification.success .icon-wrapper {
    color: #2ecc71;
}

/* Error Style */
.toast-notification.error {
    border-left: 4px solid #e74c3c;
}

.toast-notification.error .icon-wrapper {
    color: #e74c3c;
}

.icon-wrapper {
    padding-top: 2px;
}

.toast-content {
    flex: 1;
}

.toast-title {
    margin: 0 0 4px 0;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: capitalize;
}

.toast-message {
    margin: 0;
    font-size: 0.85rem;
    color: #ccc;
    line-height: 1.4;
}

.btn-close {
    background: transparent;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
}

.btn-close:hover {
    color: white;
}

/* Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
}
</style>