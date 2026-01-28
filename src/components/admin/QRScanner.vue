<template>
    <div class="scanner-wrapper">
        <div class="scanner-frame">
            <div class="scanner-header">
                <h3>Ticket Validator</h3>
                <p>Align the QR code within the frame to scan.</p>
            </div>

            <div class="camera-viewport">
                <div class="scan-laser"></div>
                <PhCornersOut :size="200" weight="thin" class="overlay-guide" />
                <div class="live-indicator">
                    <span class="dot"></span> LIVE CAMERA
                </div>
            </div>

            <div class="scanner-controls">
                <input type="text" v-model="manualInput" placeholder="Enter Booking ID manually..."
                    @keyup.enter="handleScan(manualInput)" />
                <button class="btn-scan" @click="handleScan(manualInput)">
                    <PhCheckCircle :size="20" weight="bold" />
                    Validate
                </button>
            </div>

            <transition name="fade">
                <div v-if="scanResult" :class="['scan-feedback', scanResult.status]">
                    <PhCheckCircle v-if="scanResult.status === 'success'" :size="24" weight="fill" />
                    <PhXCircle v-else :size="24" weight="fill" />

                    <div class="feedback-text">
                        <strong>{{ scanResult.title }}</strong>
                        <span>{{ scanResult.message }}</span>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { PhCornersOut, PhCheckCircle, PhXCircle } from '@phosphor-icons/vue'

const manualInput = ref('')
const scanResult = ref(null)

const handleScan = (code) => {
    if (!code) return

    // Mock Validation Logic
    if (code === 'VALID123') {
        scanResult.value = {
            status: 'success',
            title: 'Access Granted',
            message: 'Ticket for "Avatar 2" is valid.'
        }
    } else {
        scanResult.value = {
            status: 'error',
            title: 'Access Denied',
            message: 'Invalid code or ticket already used.'
        }
    }

    // Clear result after 3 seconds
    setTimeout(() => {
        scanResult.value = null
        manualInput.value = ''
    }, 3000)
}
</script>

<style scoped>
.scanner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.scanner-frame {
    background: var(--color-bg-secondary);
    width: 100%;
    max-width: 450px;
    padding: 32px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-bg-highlight);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.scanner-header h3 {
    margin: 0 0 8px 0;
}

.scanner-header p {
    margin: 0 0 24px 0;
    color: var(--color-text-muted);
    font-size: 0.9rem;
}

.camera-viewport {
    position: relative;
    width: 100%;
    height: 300px;
    background: #000;
    border-radius: var(--radius-md);
    margin-bottom: 24px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #333;
}

.overlay-guide {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    z-index: 10;
}

.scan-laser {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-accent);
    box-shadow: 0 0 10px var(--color-accent);
    animation: scanDown 2s infinite linear;
    z-index: 5;
}

@keyframes scanDown {
    0% {
        top: 10%;
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        top: 90%;
        opacity: 0;
    }
}

.live-indicator {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.6);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: bold;
    color: #e74c3c;
    display: flex;
    align-items: center;
    gap: 6px;
}

.live-indicator .dot {
    width: 8px;
    height: 8px;
    background: #e74c3c;
    border-radius: 50%;
}

.scanner-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.scanner-controls input {
    flex: 1;
    padding: 12px;
    background: var(--color-bg-primary);
    border: 1px solid var(--color-bg-highlight);
    color: white;
    border-radius: var(--radius-md);
    outline: none;
}

.btn-scan {
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
}

.scan-feedback {
    padding: 16px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
}

.scan-feedback.success {
    background: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
    border: 1px solid rgba(46, 204, 113, 0.3);
}

.scan-feedback.error {
    background: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
    border: 1px solid rgba(231, 76, 60, 0.3);
}

.feedback-text {
    display: flex;
    flex-direction: column;
}

.feedback-text strong {
    font-size: 0.95rem;
}

.feedback-text span {
    font-size: 0.85rem;
    opacity: 0.9;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>