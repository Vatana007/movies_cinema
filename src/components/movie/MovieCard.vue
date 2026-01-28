<template>
    <div class="movie-card" @click="goToDetail">
        <div class="poster-wrapper">
            <img :src="movie.poster" :alt="movie.title" class="poster-img" loading="lazy">

            <div class="overlay">
                <button class="btn-book" @click.stop="goToBooking">
                    <PhTicket :size="20" weight="bold" />
                    Book Now
                </button>

                <button class="btn-trailer" @click.stop="$emit('play-trailer', movie.trailer)">
                    <PhPlayCircle :size="32" weight="fill" />
                </button>
            </div>

            <div class="rating-badge">
                <PhStar :size="12" weight="fill" />
                <span>{{ movie.rating }}</span>
            </div>
        </div>

        <div class="info">
            <h3 class="title">{{ movie.title }}</h3>
            <div class="meta">
                <span class="genre">{{ movie.genre }}</span>
                <span class="duration">{{ movie.duration }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { PhTicket, PhPlayCircle, PhStar } from '@phosphor-icons/vue'

const props = defineProps({
    movie: { type: Object, required: true }
})

defineEmits(['play-trailer'])

const router = useRouter()

// Navigate to Detail Page
const goToDetail = () => {
    router.push(`/movie/${props.movie.id}`)
}

// Navigate directly to Booking
const goToBooking = () => {
    router.push(`/booking/${props.movie.id}`)
}
</script>

<style scoped>
/* Use the same styles as before */
.movie-card {
    width: 100%;
    cursor: pointer;
    transition: transform 0.2s;
}

.movie-card:hover .poster-wrapper {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    transform: translateY(-5px);
}

.poster-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-bg-highlight);
    margin-bottom: 12px;
}

.poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.movie-card:hover .poster-img {
    transform: scale(1.05);
    filter: brightness(0.6);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.movie-card:hover .overlay {
    opacity: 1;
}

.btn-book {
    background: var(--color-accent);
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transform: translateY(10px);
    transition: all 0.3s;
}

.btn-book:hover {
    background: #f40612;
}

.movie-card:hover .btn-book {
    transform: translateY(0);
}

.btn-trailer {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: 2px solid white;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateY(10px);
    transition: all 0.3s 0.1s;
}

.btn-trailer:hover {
    background: white;
    color: var(--color-accent);
    border-color: white;
}

.movie-card:hover .btn-trailer {
    transform: translateY(0);
}

.rating-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--color-accent-gold);
    color: black;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 4px;
}

.info .title {
    font-size: 1rem;
    color: white;
    margin: 0 0 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.info .meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--color-text-muted);
}
</style>