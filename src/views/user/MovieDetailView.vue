<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/store/movieStore' // Import Store
import { PhStar, PhTicket, PhPlayCircle } from '@phosphor-icons/vue'
import TrailerModal from '@/components/movie/TrailerModal.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore() // Init Store

const movie = ref(null)
const showTrailer = ref(false)

const openTrailer = () => { showTrailer.value = true }
const goToBooking = () => { router.push(`/booking/${movie.value.id}`) }

onMounted(() => {
    // 1. Get ID from URL (e.g., /movie/1 -> id=1)
    const movieId = route.params.id

    // 2. Fetch correct movie from Store
    movie.value = movieStore.getMovieById(movieId)

    // Safety: If movie not found, go back home
    if (!movie.value) {
        router.push('/')
    }
})
</script>

<template>
    <div class="movie-detail-view" v-if="movie">

        <div class="hero-backdrop" :style="{ backgroundImage: `url(${movie.backdrop})` }">
            <div class="gradient-overlay"></div>

            <div class="container hero-content">
                <div class="poster-frame">
                    <img :src="movie.poster" :alt="movie.title">
                </div>

                <div class="movie-info">
                    <h1 class="title">{{ movie.title }}</h1>

                    <div class="meta-row">
                        <span class="rating">
                            <PhStar weight="fill" color="#ffd700" /> {{ movie.rating }}
                        </span>
                        <span class="dot">•</span>
                        <span>{{ movie.duration }}</span>
                        <span class="dot">•</span>
                        <span>{{ movie.genre }}</span>
                        <span class="dot">•</span>
                        <span>{{ movie.year }}</span>
                    </div>

                    <p class="synopsis">{{ movie.synopsis }}</p>

                    <div class="action-buttons">
                        <button class="btn-primary" @click="goToBooking">
                            <PhTicket :size="24" weight="bold" />
                            Get Tickets
                        </button>
                        <button class="btn-secondary" @click="openTrailer">
                            <PhPlayCircle :size="24" weight="fill" />
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container section">
            <h3>Top Cast</h3>
            <div class="cast-grid">
                <div v-for="actor in movie.cast" :key="actor.name" class="cast-card">
                    <div class="actor-img" :style="{ backgroundImage: `url(${actor.image})` }"></div>
                    <p class="actor-name">{{ actor.name }}</p>
                    <p class="character-name">{{ actor.character }}</p>
                </div>
            </div>
        </div>

        <TrailerModal :visible="showTrailer" :videoUrl="movie.trailer" @close="showTrailer = false" />

    </div>
</template>

<style scoped>
.movie-detail-view {
    min-height: 100vh;
    padding-bottom: 60px;
}

.hero-backdrop {
    position: relative;
    height: 80vh;
    background-size: cover;
    background-position: center top;
    display: flex;
    align-items: flex-end;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, var(--color-bg-primary) 5%, rgba(15, 16, 20, 0.8) 60%, rgba(15, 16, 20, 0.4) 100%);
}

.hero-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    gap: 40px;
    padding-bottom: 60px;
}

.poster-frame {
    width: 250px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border: 4px solid white;
    flex-shrink: 0;
}

.poster-frame img {
    width: 100%;
    display: block;
}

.movie-info {
    color: white;
    max-width: 700px;
}

.title {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;
    color: #e5e5e5;
    margin-bottom: 24px;
}

.rating {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: bold;
    color: white;
}

.dot {
    color: #666;
}

.synopsis {
    font-size: 1rem;
    line-height: 1.7;
    color: #ccc;
    margin-bottom: 32px;
}

.action-buttons {
    display: flex;
    gap: 16px;
}

.btn-primary {
    padding: 14px 32px;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.2s;
}

.btn-primary:hover {
    background: #f40612;
    transform: translateY(-2px);
}

.btn-secondary {
    padding: 14px 32px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.2s;
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: white;
}

.cast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.cast-card {
    text-align: center;
}

.actor-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    margin: 0 auto 10px auto;
    border: 2px solid var(--color-bg-highlight);
}

.actor-name {
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0;
}

.character-name {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    margin: 4px 0 0 0;
}

@media (max-width: 768px) {
    .hero-backdrop {
        height: auto;
        padding-top: 100px;
    }

    .hero-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .poster-frame {
        width: 180px;
    }

    .title {
        font-size: 2rem;
    }

    .meta-row {
        justify-content: center;
        font-size: 0.9rem;
    }

    .action-buttons {
        justify-content: center;
    }
}
</style>