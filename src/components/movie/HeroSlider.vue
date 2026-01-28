<template>
    <div class="hero-slider">
        <div v-for="(slide, index) in slides" :key="slide.id" class="slide"
            :class="{ 'active': currentSlide === index }" :style="{ backgroundImage: `url(${slide.backdrop})` }">
            <div class="gradient-overlay">
                <div class="container slide-content">
                    <span class="tag">Trending Now</span>

                    <h1 class="slide-title">{{ slide.title }}</h1>
                    <p class="slide-desc">{{ slide.synopsis }}</p>

                    <div class="slide-actions">
                        <button class="btn-primary" @click="$router.push(`/booking/${slide.id}`)">
                            Book Now
                        </button>

                        <button class="btn-outline" @click="$emit('play-trailer', slide.trailer)">
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="indicators">
            <span v-for="(slide, index) in slides" :key="index" :class="['dot', { active: currentSlide === index }]"
                @click="currentSlide = index"></span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMovieStore } from '@/store/movieStore' // 1. Import Store

const store = useMovieStore() // 2. Initialize Store
const currentSlide = ref(0)
const timer = ref(null)

// 3. Get Trending Movies from Store
const slides = computed(() => store.trendingMovies)

// Emits for Trailer
defineEmits(['play-trailer'])

const nextSlide = () => {
    if (slides.value.length > 0) {
        currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }
}

onMounted(() => {
    timer.value = setInterval(nextSlide, 5000) // Auto-rotate every 5s
})

onUnmounted(() => clearInterval(timer.value))
</script>

<style scoped>
.hero-slider {
    position: relative;
    height: 70vh;
    min-height: 500px;
    overflow: hidden;
    background: black;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center top;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    z-index: 1;
}

.slide.active {
    opacity: 1;
    z-index: 2;
}

.gradient-overlay {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
    display: flex;
    align-items: center;
}

.slide-content {
    color: white;
    max-width: 650px;
    padding-left: 20px;
    animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tag {
    background: var(--color-accent);
    color: white;
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 16px;
    display: inline-block;
}

.slide-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin: 10px 0 20px 0;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.slide-desc {
    font-size: 1.1rem;
    color: #e5e5e5;
    margin-bottom: 32px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.slide-actions {
    display: flex;
    gap: 16px;
}

.btn-primary {
    padding: 12px 32px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1rem;
}

.btn-primary:hover {
    background: #ff1f2d;
    transform: translateY(-2px);
}

.btn-outline {
    padding: 12px 32px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid white;
    color: white;
    border-radius: var(--radius-md);
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    font-size: 1rem;
}

.btn-outline:hover {
    background: white;
    color: black;
    transform: translateY(-2px);
}

.indicators {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    gap: 12px;
}

.dot {
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
}

.dot.active {
    background: var(--color-accent);
    transform: scale(1.2);
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .slide-title {
        font-size: 2rem;
    }

    .slide-desc {
        font-size: 1rem;
    }

    .slide-content {
        text-align: center;
        margin: 0 auto;
        padding: 0 20px;
    }

    .gradient-overlay {
        background: rgba(0, 0, 0, 0.6);
        justify-content: center;
    }

    .slide-actions {
        justify-content: center;
    }
}
</style>