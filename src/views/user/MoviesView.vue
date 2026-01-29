<template>
    <div class="movies-view aurora-style">

        <div class="aurora-bg">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>

        <div class="container content-wrapper">

            <header class="page-header">
                <div class="header-text">
                    <span class="eyebrow">DISCOVER</span>
                    <h1 class="glow-title">Movies Catalogue</h1>
                </div>

                <div class="search-glass">
                    <PhMagnifyingGlass :size="20" class="search-icon" />
                    <input type="text" v-model="searchQuery" placeholder="Search movies, genres, or actors..." />
                </div>
            </header>

            <div class="filter-bar">
                <button v-for="cat in categories" :key="cat" class="filter-chip"
                    :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
                    {{ cat }}
                </button>
            </div>

            <div class="movies-grid">
                <div v-for="movie in filteredMovies" :key="movie.id" class="movie-glass-card"
                    @click="goToDetail(movie.id)">
                    <div class="poster-wrapper">
                        <img :src="movie.poster" :alt="movie.title" loading="lazy">
                        <div class="rating-badge">
                            <PhStar weight="fill" color="#ffd700" /> {{ movie.rating }}
                        </div>
                        <div class="overlay">
                            <button class="btn-play">
                                <PhPlayCircle :size="48" weight="fill" />
                            </button>
                        </div>
                    </div>

                    <div class="card-info">
                        <h3>{{ movie.title }}</h3>
                        <div class="meta-row">
                            <span class="genre">{{ movie.genre.split('/')[0] }}</span>
                            <span class="dot">•</span>
                            <span>{{ movie.duration }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredMovies.length === 0" class="empty-state">
                <PhFilmSlate :size="64" weight="thin" />
                <h3>No movies found</h3>
                <p>Try adjusting your search or filters</p>
                <button @click="resetFilters" class="btn-reset">Clear Filters</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router' // Import useRoute
import { useMovieStore } from '@/store/movieStore'
import {
    PhMagnifyingGlass, PhStar, PhPlayCircle, PhFilmSlate
} from '@phosphor-icons/vue'

const router = useRouter()
const route = useRoute() // Access current URL
const movieStore = useMovieStore()

const searchQuery = ref('')
const activeCategory = ref('All')
const categories = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Animation']

// NEW: Watch for URL changes (e.g., coming from Navbar)
watch(() => route.query.q, (newQuery) => {
    if (newQuery) {
        searchQuery.value = newQuery
    } else {
        searchQuery.value = ''
    }
}, { immediate: true }) // Run immediately on load

// Filter Logic
const filteredMovies = computed(() => {
    return movieStore.movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = activeCategory.value === 'All' || movie.genre.includes(activeCategory.value)
        return matchesSearch && matchesCategory
    })
})

const goToDetail = (id) => {
    router.push(`/movie/${id}`)
}

const resetFilters = () => {
    searchQuery.value = ''
    activeCategory.value = 'All'
    // Also clear the URL query so it looks clean
    router.replace({ query: null })
}
</script>

<style scoped>
/* --- 1. Background (Matches HomeView) --- */
.movies-view {
    position: relative;
    min-height: 100vh;
    background-color: #050510;
    overflow: hidden;
    padding-top: 100px;
    /* Navbar offset */
    padding-bottom: 60px;
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
    opacity: 0.5;
    animation: float 10s infinite alternate;
}

.blob-1 {
    top: -10%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: #4f46e5;
}

.blob-2 {
    bottom: -10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: #ec4899;
    animation-delay: -5s;
}

.blob-3 {
    top: 30%;
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

.content-wrapper {
    position: relative;
    z-index: 2;
}

/* --- 2. Header --- */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
}

.eyebrow {
    font-size: 0.8rem;
    color: var(--color-accent);
    letter-spacing: 2px;
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
}

.glow-title {
    font-size: 3rem;
    margin: 0;
    font-weight: 800;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.search-glass {
    position: relative;
    width: 300px;
}

.search-glass input {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 14px 14px 14px 45px;
    border-radius: 50px;
    color: white;
    outline: none;
    transition: 0.3s;
}

.search-glass input:focus {
    border-color: var(--color-accent);
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.2);
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
}

/* --- 3. Filters --- */
.filter-bar {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 20px;
    margin-bottom: 20px;
    scrollbar-width: none;
    /* Hide scrollbar */
}

.filter-chip {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    color: #ccc;
    padding: 10px 24px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
}

.filter-chip:hover,
.filter-chip.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.4);
    transform: translateY(-2px);
}

/* --- 4. Grid --- */
.movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 30px;
}

.movie-glass-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 10px;
}

.movie-glass-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.poster-wrapper {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 2/3;
    margin-bottom: 15px;
}

.poster-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
}

.movie-glass-card:hover img {
    transform: scale(1.05);
}

.rating-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    padding: 4px 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: bold;
    font-size: 0.8rem;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s;
}

.movie-glass-card:hover .overlay {
    opacity: 1;
}

.btn-play {
    background: white;
    color: black;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: scale(0.8);
    transition: 0.3s;
}

.card-info h3 {
    margin: 0 0 6px 0;
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta-row {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    gap: 8px;
}

.genre {
    color: var(--color-accent);
}

.dot {
    width: 4px;
    height: 4px;
    background: #555;
    border-radius: 50%;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 80px 0;
    color: var(--color-text-muted);
}

.btn-reset {
    margin-top: 20px;
    background: none;
    border: 1px solid var(--color-text-muted);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
}

.btn-reset:hover {
    background: white;
    color: black;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-glass {
        width: 100%;
    }

    .glow-title {
        font-size: 2.2rem;
    }
}
</style>