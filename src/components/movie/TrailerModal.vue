<template>
    <Transition name="fade">
        <div v-if="visible" class="modal-overlay" @click="$emit('close')">
            <div class="modal-content">
                <button class="btn-close" @click="$emit('close')">
                    <PhX :size="24" />
                </button>

                <div class="video-wrapper" v-if="videoUrl">
                    <iframe :src="embedUrl" title="Movie Trailer" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { PhX } from '@phosphor-icons/vue'

const props = defineProps({
    visible: Boolean,
    videoUrl: String
})

defineEmits(['close'])

// Helper to convert standard YouTube URL to Embed URL
const embedUrl = computed(() => {
    if (!props.videoUrl) return ''
    // Handle "watch?v=" format vs "embed" format
    const videoId = props.videoUrl.split('v=')[1] || props.videoUrl.split('/').pop()
    // Clean up ID if it has extra params (like &t=...)
    const cleanId = videoId ? videoId.split('&')[0] : ''
    return `https://www.youtube.com/embed/${cleanId}?autoplay=1`
})
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    /* Higher than Navbar */
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    position: relative;
    width: 90%;
    max-width: 900px;
    background: black;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
}

.btn-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
}

.btn-close:hover {
    transform: scale(1.2);
    color: var(--color-accent);
}

.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 Aspect Ratio */
    height: 0;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>