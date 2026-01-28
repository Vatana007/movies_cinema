<template>
    <div class="home-view aurora-style">

        <div class="aurora-bg">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <section class="container hero-container">
            <div class="glass-hero">
                <div class="hero-image-side" :style="{ backgroundImage: `url(${featuredMovie.poster})` }">
                    <div class="live-tag">
                        <div class="pulsing-dot"></div> Trending #1
                    </div>
                </div>

                <div class="hero-info-side">
                    <div class="top-badges">
                        <span class="badge-blur">{{ featuredMovie.genre }}</span>
                        <span class="badge-blur">
                            <PhClock :size="14" /> {{ featuredMovie.duration }}
                        </span>
                    </div>

                    <h1 class="hero-title">{{ featuredMovie.title }}</h1>
                    <p class="hero-desc">{{ featuredMovie.synopsis }}</p>

                    <div class="extra-row">
                        <div class="cast-stack">
                            <img v-for="n in 3" :key="n" :src="`https://i.pravatar.cc/100?img=${n + 10}`"
                                class="avatar" />
                            <span class="more-cast">+5</span>
                        </div>
                        <div class="score-ring">
                            <span class="score-text">9.8</span>
                        </div>
                    </div>

                    <div class="action-row">
                        <button class="btn-glow" @click="$router.push(`/booking/${featuredMovie.id}`)">
                            Book Ticket
                            <PhTicket class="icon-right" />
                        </button>
                        <button class="btn-circle" @click="openTrailer(featuredMovie.trailer)">
                            <PhPlay weight="fill" />
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section class="container category-section">
            <div class="scroll-row">
                <button v-for="cat in categories" :key="cat" class="cat-bubble"
                    :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
                    {{ cat }}
                </button>
            </div>
        </section>

        <section class="container section-spacer">
            <div class="section-header">
                <h2>Recommended For You</h2>
                <button class="btn-text" @click="$router.push('/movies')">See All</button>
            </div>

            <div class="soft-grid">
                <div v-for="movie in recommendedMovies" :key="movie.id" class="soft-card"
                    @click="$router.push(`/movie/${movie.id}`)">
                    <div class="card-image-box">
                        <img :src="movie.poster" loading="lazy" />
                        <div class="card-overlay">
                            <button class="mini-play" @click.stop="openTrailer(movie.trailer)">
                                <PhPlay weight="fill" />
                            </button>
                        </div>
                    </div>
                    <div class="card-details">
                        <h4>{{ movie.title }}</h4>
                        <div class="card-meta">
                            <span>{{ movie.year }}</span>
                            <div class="dot-sep"></div>
                            <span>{{ movie.rating }} ⭐</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="container section-spacer">
            <div class="section-header">
                <div class="title-group">
                    <h2>Coming Soon</h2>
                    <span class="subtitle-label">Don't miss the premiere</span>
                </div>
                <div class="header-line"></div>
                <div class="nav-arrows">
                    <PhCaretLeft class="arrow-icon" />
                    <PhCaretRight class="arrow-icon" />
                </div>
            </div>

            <div class="coming-soon-scroller">
                <div v-for="(movie, index) in comingSoonMovies" :key="movie.id" class="poster-card"
                    @click="$router.push(`/movie/${movie.id}`)">

                    <div class="poster-frame">
                        <img :src="movie.poster" :alt="movie.title">

                        <div class="release-date-badge">
                            <span>FEB</span>
                            <strong>{{ 14 + index }}</strong>
                        </div>
                    </div>

                    <div class="poster-info">
                        <h4 class="poster-title">{{ movie.title }}</h4>
                        <span class="poster-genre">{{ movie.genre ? movie.genre.split('/')[0] : 'Action' }}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="container stats-section">
            <div class="stat-glass">
                <h3>50+</h3>
                <p>Screens</p>
            </div>
            <div class="stat-glass">
                <h3>4K</h3>
                <p>Resolution</p>
            </div>
            <div class="stat-glass">
                <h3>24/7</h3>
                <p>Support</p>
            </div>
        </section>

        <TrailerModal :visible="showModal" :videoUrl="currentTrailer" @close="showModal = false" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import { useRouter } from 'vue-router'
import TrailerModal from '@/components/movie/TrailerModal.vue'
import { PhClock, PhTicket, PhPlay, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const router = useRouter()
const movieStore = useMovieStore()
const showModal = ref(false)
const currentTrailer = ref('')
const activeCategory = ref('All')
const categories = ['All', 'Action', 'Adventure', 'Comedy', 'Drama']

// 1. Feature Movie (First one)
const featuredMovie = computed(() => movieStore.movies[0] || {})

// 2. Recommended (First 8 matches)
const filteredMovies = computed(() => {
    if (activeCategory.value === 'All') return movieStore.movies
    return movieStore.movies.filter(m => m.genre.includes(activeCategory.value))
})
const recommendedMovies = computed(() => filteredMovies.value.slice(0, 8))

const comingSoonMovies = computed(() => {
    const all = [...movieStore.movies]
    // Get last 5 and reverse them to show newest addition first
    return all.slice(-5).reverse()
})

const openTrailer = (url) => {
    currentTrailer.value = url
    showModal.value = true
}
</script>

<style scoped>
/* Base Layout */
.aurora-style {
    background-color: #050510;
    min-height: 100vh;
    padding-top: 100px;
    padding-bottom: 60px;
    position: relative;
    overflow: hidden;
    color: white;
}

.aurora-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite alternate;
}

.blob-1 {
    top: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: #4f46e5;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: #ec4899;
    animation-delay: -5s;
}

.blob-3 {
    top: 40%;
    left: 40%;
    width: 400px;
    height: 400px;
    background: #06b6d4;
    animation-duration: 15s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) scale(1);
    }

    100% {
        transform: translate(30px, 50px) scale(1.1);
    }
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 2;
}

/* Hero */
.hero-container {
    margin-bottom: 60px;
}

.glass-hero {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 32px;
    padding: 20px;
    display: flex;
    gap: 40px;
    align-items: center;
}

.hero-image-side {
    width: 350px;
    height: 450px;
    background-size: cover;
    background-position: center;
    border-radius: 24px;
    position: relative;
    flex-shrink: 0;
}

.live-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    padding: 6px 12px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.pulsing-dot {
    width: 8px;
    height: 8px;
    background: #ff4757;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
}

.hero-info-side {
    padding: 20px;
    flex: 1;
}

.top-badges {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.badge-blur {
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 14px;
    border-radius: 12px;
    font-size: 0.85rem;
    color: #ddd;
    display: flex;
    align-items: center;
    gap: 6px;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    background: linear-gradient(to right, #fff, #aaa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-desc {
    font-size: 1.1rem;
    color: #aaa;
    margin-bottom: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.extra-row {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
}

.cast-stack {
    display: flex;
    align-items: center;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #1a1a1a;
    margin-left: -12px;
}

.more-cast {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #333;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border: 2px solid #1a1a1a;
    margin-left: -12px;
}

.score-text {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00f2ff;
}

.action-row {
    display: flex;
    gap: 16px;
}

.btn-glow {
    background: linear-gradient(135deg, #4f46e5, #ec4899);
    border: none;
    padding: 16px 32px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-circle {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
}

/* Categories */
.category-section {
    margin-bottom: 40px;
    overflow-x: auto;
    padding-bottom: 10px;
}

.scroll-row {
    display: flex;
    gap: 12px;
}

.cat-bubble {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 24px;
    border-radius: 50px;
    color: #ccc;
    cursor: pointer;
    white-space: nowrap;
}

.cat-bubble:hover,
.cat-bubble.active {
    background: white;
    color: black;
    font-weight: bold;
}

/* Recommended */
.section-spacer {
    margin-bottom: 80px;
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 20px;
}

.section-header h2 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 700;
    white-space: nowrap;
}

.title-group {
    display: flex;
    flex-direction: column;
}

.subtitle-label {
    font-size: 0.85rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.btn-text {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 0.9rem;
    margin-left: auto;
}

.soft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
}

.soft-card {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 24px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: 0.4s;
}

.soft-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
}

.card-image-box {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    aspect-ratio: 2/3;
    margin-bottom: 15px;
}

.card-image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s;
}

.soft-card:hover .card-overlay {
    opacity: 1;
}

.mini-play {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    color: black;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-details h4 {
    margin: 0 0 8px 0;
    font-size: 1rem;
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #888;
}

.dot-sep {
    width: 4px;
    height: 4px;
    background: #444;
    border-radius: 50%;
}

/* Coming Soon Horizontal Scroll */
.header-line {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
}

.nav-arrows {
    display: flex;
    gap: 10px;
}

.arrow-icon {
    font-size: 1.2rem;
    color: #aaa;
    cursor: pointer;
    transition: 0.2s;
}

.arrow-icon:hover {
    color: white;
}

.coming-soon-scroller {
    display: flex;
    gap: 30px;
    overflow-x: auto;
    padding-bottom: 20px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
}

.coming-soon-scroller::-webkit-scrollbar {
    display: none;
}

.poster-card {
    flex: 0 0 220px;
    cursor: pointer;
    transition: 0.3s;
    scroll-snap-align: start;
}

.poster-card:hover {
    transform: translateY(-10px);
}

.poster-frame {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 2/3;
    margin-bottom: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.poster-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
}

.poster-card:hover img {
    transform: scale(1.05);
}

.release-date-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    color: black;
    border-radius: 12px;
    padding: 8px 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    line-height: 1;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.release-date-badge strong {
    font-size: 1.2rem;
    font-weight: 900;
}

.poster-info {
    padding: 0 5px;
}

.poster-title {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
}

.poster-genre {
    font-size: 0.85rem;
    color: #888;
}

/* Stats */
.stats-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 80px;
}

.stat-glass {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 30px;
    text-align: center;
    backdrop-filter: blur(10px);
}

.stat-glass h3 {
    font-size: 2.5rem;
    margin: 0;
    color: #00f2ff;
    text-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
}

.stat-glass p {
    color: #aaa;
    margin: 5px 0 0 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

@media (max-width: 900px) {
    .glass-hero {
        flex-direction: column;
        text-align: center;
    }

    .hero-image-side {
        width: 100%;
        height: 300px;
    }

    .hero-info-side {
        padding: 0;
    }

    .top-badges,
    .extra-row,
    .action-row {
        justify-content: center;
    }

    .stats-section {
        grid-template-columns: 1fr;
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>