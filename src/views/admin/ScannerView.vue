<template>
    <div class="scanner-container">
        <div class="scanner-frame">
            <h3>Ticket Validator</h3>
            <p>Align QR code within the frame</p>

            <div class="camera-viewport">
                <div class="scan-line"></div>
                <PhCamera :size="48" class="camera-icon" />
            </div>

            <div class="controls">
                <input type="text" v-model="manualCode" placeholder="Enter Ticket ID Manually" class="manual-input">
                <button class="btn-verify" @click="validateTicket">Verify</button>
            </div>

            <div v-if="message" :class="['result-msg', status]">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { PhCamera } from '@phosphor-icons/vue'

const manualCode = ref('')
const message = ref('')
const status = ref('')

const validateTicket = () => {
    // Mock validation logic
    if (manualCode.value === 'BK-7829') {
        status.value = 'success'
        message.value = 'Ticket Valid! Access Granted.'
    } else {
        status.value = 'error'
        message.value = 'Invalid Ticket or Already Used.'
    }
}
</script>

<style scoped>
.scanner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* Fills admin content area */
}

.scanner-frame {
    width: 100%;
    max-width: 400px;
    background: var(--color-bg-secondary);
    padding: 32px;
    border-radius: var(--radius-lg);
    text-align: center;
    box-shadow: var(--shadow-card);
}

.camera-viewport {
    width: 100%;
    height: 300px;
    background: black;
    margin: 24px 0;
    border-radius: var(--radius-md);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 2px solid var(--color-bg-highlight);
}

.camera-icon {
    color: #555;
}

/* Animation for scanning line */
.scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--color-accent);
    box-shadow: 0 0 10px var(--color-accent);
    animation: scan 2s infinite linear;
}

@keyframes scan {
    0% {
        top: 10%;
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    80% {
        opacity: 1;
    }

    100% {
        top: 90%;
        opacity: 0;
    }
}

.controls {
    display: flex;
    gap: 12px;
}

.manual-input {
    flex: 1;
    padding: 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-bg-highlight);
    background: var(--color-bg-primary);
    color: white;
    outline: none;
}

.btn-verify {
    padding: 0 24px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
    cursor: pointer;
}

.result-msg {
    margin-top: 20px;
    padding: 12px;
    border-radius: var(--radius-sm);
    font-weight: bold;
}

.result-msg.success {
    background: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
}

.result-msg.error {
    background: rgba(231, 76, 60, 0.2);
    color: #e74c3c;
}
</style>