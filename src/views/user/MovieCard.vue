<template>
    <div class="movie-card" @click="goToDetail">

        <div class="poster-wrapper">
            <img :src="movie.poster" :alt="movie.title" loading="lazy">

            <div class="hall-badge" :class="hallDetails.style">
                <component :is="hallDetails.icon" weight="fill" />
                <span class="hall-name">{{ hallDetails.name }}</span>
            </div>

            <div class="rating-badge">
                <PhStar weight="fill" color="#fbbf24" />
                <span>{{ movie.rating }}</span>
            </div>

            <div class="overlay">
                <button class="btn-book">
                    <PhTicket class="icon" />
                    <span>Get Ticket</span>
                </button>
            </div>
        </div>

        <div class="card-info">
            <h3 class="title">{{ movie.title }}</h3>
            <div class="meta">
                <span class="genre">{{ formatGenre(movie.genre) }}</span>
                <span class="dot">•</span>
                <span class="duration">{{ movie.duration || '2h 15m' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    PhStar, PhTicket, PhMonitorPlay, PhCrown, PhArmchair
} from '@phosphor-icons/vue'

const props = defineProps({
    movie: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const goToDetail = () => {
    router.push(`/movie/${props.movie.id}`)
}

const formatGenre = (genre) => {
    return genre ? genre.split('/')[0].trim() : 'Movie'
}

// Logic to determine Hall Name & Style based on Movie ID
// (In a real app, this would come from your backend/database)
const hallDetails = computed(() => {
    const id = props.movie.id || 0

    // Logic: 
    // ID divisible by 3 -> IMAX
    // ID divisible by 4 -> VIP
    // All others -> Standard Halls (1, 2, 3...)

    if (id % 3 === 0) {
        return { name: 'IMAX 3D', style: 'hall-imax', icon: PhMonitorPlay }
    }
    else if (id % 4 === 0) {
        return { name: 'VIP GOLD', style: 'hall-vip', icon: PhCrown }
    }
    else {
        // Generate a random-looking Hall Number (1-5) based on ID
        const hallNum = (id % 5) + 1
        return { name: `Hall ${hallNum}`, style: 'hall-std', icon: PhArmchair }
    }
})
</script>

<style scoped>
.movie-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.movie-card:hover {
    transform: translateY(-8px);
}

/* --- POSTER & BADGES --- */
.poster-wrapper {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 2/3;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: #1f2937;
    /* Placeholder color */
}

.poster-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.movie-card:hover .poster-wrapper img {
    transform: scale(1.05);
}

/* Hall Badge Styles */
.hall-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(12px);
    /* Glassmorphism */
    z-index: 2;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.hall-name {
    margin-top: 1px;
}

/* Variant Colors */
.hall-imax {
    background: rgba(37, 99, 235, 0.85);
    /* Blue */
    color: white;
    border-color: rgba(96, 165, 250, 0.3);
}

.hall-vip {
    background: linear-gradient(135deg, #d97706, #fbbf24);
    /* Gold */
    color: black;
    border-color: rgba(255, 255, 255, 0.4);
}

.hall-std {
    background: rgba(31, 41, 55, 0.8);
    /* Dark */
    color: white;
}

/* Rating Badge */
.rating-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    color: #fbbf24;
    padding: 6px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    z-index: 2;
}

/* Hover Overlay */
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.movie-card:hover .overlay {
    opacity: 1;
}

.btn-book {
    background: #e11d48;
    /* Brand Accent Color */
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(225, 29, 72, 0.6);
}

.movie-card:hover .btn-book {
    transform: translateY(0);
}

/* --- INFO SECTION --- */
.card-info {
    padding: 0 4px;
}

.title {
    margin: 0 0 6px 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #9ca3af;
}

.genre {
    color: #d1d5db;
    font-weight: 500;
}

.dot {
    color: #4b5563;
}

.duration {
    font-feature-settings: "tnum";
}
</style>