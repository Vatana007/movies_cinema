<template>
    <div class="pearl-page">
        <section class="container explorer-section">

            <header class="explorer-header">
                <div class="title-group">
                    <span class="eyebrow">PREMIUM SELECTION</span>
                    <h1 class="serif-title">Now Showing</h1>
                    <p class="description">Explore the finest cinematic experiences currently playing.</p>
                </div>

                <div class="search-container">
                    <div class="search-input-wrapper">
                        <PhMagnifyingGlass :size="20" weight="light" />
                        <input v-model="searchQuery" type="text" placeholder="Search by title, director or genre..." />
                    </div>
                </div>
            </header>

            <div class="filter-wrapper">
                <div class="chip-container">
                    <button v-for="cat in categories" :key="cat" class="filter-chip"
                        :class="{ active: activeCategory === cat }" @click="activeCategory = cat">
                        {{ cat }}
                    </button>
                </div>
                <div class="results-info">
                    Found <span>{{ filteredMovies.length }}</span> titles
                </div>
            </div>

            <div class="movies-gallery">
                <div v-for="movie in filteredMovies" :key="movie.id" class="pearl-card" @click="goToDetail(movie.id)">
                    <div class="poster-area">
                        <img :src="movie.poster" :alt="movie.title" loading="lazy">
                        <div class="hover-overlay">
                            <button class="btn-icon">
                                <PhPlayCircle :size="48" weight="fill" />
                            </button>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3 class="movie-title">{{ movie.title }}</h3>
                        <div class="meta-row">
                            <span class="genre">{{ movie.genre.split('/')[0] }}</span>
                            <span class="dot"></span>
                            <div class="duration">
                                <PhClock :size="14" /> {{ movie.duration }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredMovies.length === 0" class="empty-gallery">
                <PhFilmSlate :size="64" weight="thin" />
                <h3>No movies found</h3>
                <p>Try adjusting your search or filters</p>
                <button @click="resetFilters" class="btn-reset">Clear Filters</button>
            </div>

        </section>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMovieStore } from '@/store/movieStore'
import {
    PhMagnifyingGlass, PhClock, PhPlayCircle, PhFilmSlate
} from '@phosphor-icons/vue'

const router = useRouter()
const route = useRoute()
const movieStore = useMovieStore()

const searchQuery = ref('')
const activeCategory = ref('All')
const categories = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Animation']

// --- NEW LOGIC START ---

// 1. Define "Now Showing" as everything EXCEPT the last 5 (Coming Soon)
const nowShowingMovies = computed(() => {
    const all = movieStore.movies
    if (all.length <= 5) return [] // Safety check
    return all.slice(0, -5) // Exclude the last 5
})

// 2. Filter based on the "Now Showing" list only
const filteredMovies = computed(() => {
    return nowShowingMovies.value.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = activeCategory.value === 'All' || movie.genre.includes(activeCategory.value)
        return matchesSearch && matchesCategory
    })
})

// --- NEW LOGIC END ---

// Watch for URL search params (from Navbar)
watch(() => route.query.q, (newQuery) => {
    if (newQuery) searchQuery.value = newQuery
    else searchQuery.value = ''
}, { immediate: true })

const goToDetail = (id) => {
    router.push(`/movie/${id}`)
}

const resetFilters = () => {
    searchQuery.value = ''
    activeCategory.value = 'All'
    router.replace({ query: null })
}
</script>

<style scoped>
.pearl-page {
    background-color: #fcfcfc;
    /* Or keep dark theme if preferred: #050510 */
    min-height: 100vh;
    color: #1a1a1a;
}

/* Dark Mode Override (Matches HomeView Aurora Style) */
.pearl-page {
    background-color: #050510;
    color: white;
}

.explorer-section {
    padding-top: 40px;
    padding-bottom: 80px;
}

.explorer-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 60px;
    flex-wrap: wrap;
    gap: 30px;
}

.eyebrow {
    font-size: 0.8rem;
    letter-spacing: 2px;
    font-weight: 700;
    color: var(--color-accent);
    display: block;
    margin-bottom: 10px;
}

.serif-title {
    font-size: 3rem;
    margin: 0 0 10px 0;
    font-weight: 800;
    /* Adjusted for Sans-serif if needed */
    line-height: 1;
}

.description {
    color: #888;
    font-size: 1.1rem;
    margin: 0;
    max-width: 400px;
}

/* Search */
.search-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 20px;
    border-radius: 50px;
    width: 350px;
    transition: 0.3s;
}

.search-input-wrapper:focus-within {
    border-color: var(--color-accent);
    background: rgba(0, 0, 0, 0.3);
}

.search-input-wrapper input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    color: white;
    font-size: 0.95rem;
}

/* Filters */
.filter-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 20px;
}

.chip-container {
    display: flex;
    gap: 10px;
    overflow-x: auto;
}

.filter-chip {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #aaa;
    padding: 8px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.2s;
    white-space: nowrap;
}

.filter-chip:hover,
.filter-chip.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
}

.results-info {
    color: #666;
    font-size: 0.9rem;
}

.results-info span {
    color: white;
    font-weight: bold;
}

/* Grid */
.movies-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 40px 30px;
}

.pearl-card {
    cursor: pointer;
    transition: 0.3s;
}

.pearl-card:hover {
    transform: translateY(-8px);
}

.poster-area {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 2/3;
    margin-bottom: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.poster-area img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
}

.pearl-card:hover img {
    transform: scale(1.05);
}

.hover-overlay {
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

.pearl-card:hover .hover-overlay {
    opacity: 1;
}

.btn-icon {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transform: scale(0.8);
    transition: 0.3s;
}

.pearl-card:hover .btn-icon {
    transform: scale(1);
}

.movie-title {
    font-size: 1.2rem;
    margin: 0 0 6px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
}

.meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #888;
}

.genre {
    color: var(--color-accent);
    font-weight: 600;
}

.dot {
    width: 4px;
    height: 4px;
    background: #444;
    border-radius: 50%;
}

.duration {
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Empty State */
.empty-gallery {
    text-align: center;
    padding: 80px 0;
    color: #555;
}

.btn-reset {
    margin-top: 15px;
    background: transparent;
    border: 1px solid #555;
    color: #aaa;
    padding: 8px 20px;
    border-radius: 20px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .explorer-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-input-wrapper {
        width: 100%;
    }

    .filter-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
}
</style>