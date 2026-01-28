<template>
    <div class="movies-page">
        <div class="page-header">
            <div class="header-text">
                <h1>Now Showing</h1>
                <p>Discover the latest blockbusters.</p>
            </div>

            <div class="filter-bar">
                <div class="search-input">
                    <PhMagnifyingGlass class="icon" />
                    <input v-model="search" type="text" placeholder="Search movies..." />
                </div>
            </div>
        </div>

        <div class="movies-grid">
            <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
        </div>

        <div v-if="filteredMovies.length === 0" class="empty-state">
            <p>No movies found matching "{{ search }}".</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import MovieCard from '@/views/user/MovieCard.vue'
import { PhMagnifyingGlass } from '@phosphor-icons/vue'

const movieStore = useMovieStore()
const search = ref('')

const filteredMovies = computed(() => {
    if (!search.value) return movieStore.movies
    return movieStore.movies.filter(m =>
        m.title.toLowerCase().includes(search.value.toLowerCase())
    )
})
</script>

<style scoped>
.movies-page {
    /* Responsive Padding: Less on mobile, more on desktop */
    padding: 100px 20px 60px;
    min-height: 100vh;
    background-color: #0b0c10;
    color: white;
}

@media (min-width: 768px) {
    .movies-page {
        padding: 120px 5% 60px;
    }
}

/* Header */
.page-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 20px;
}

@media (min-width: 768px) {
    .page-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
    }
}

.header-text h1 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 4px 0;
    color: white;
}

.header-text p {
    color: #888;
    margin: 0;
    font-size: 0.9rem;
}

/* Search Input */
.search-input {
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    transition: 0.3s;
}

@media (min-width: 768px) {
    .search-input {
        width: 300px;
    }
}

.search-input:focus-within {
    border-color: #e11d48;
    box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.15);
}

.search-input input {
    background: transparent;
    border: none;
    color: white;
    outline: none;
    width: 100%;
    font-size: 1rem;
}

.search-input .icon {
    color: #666;
    font-size: 1.2rem;
}

/* Grid System */
.movies-grid {
    display: grid;
    /* Auto-fill ensures it responds to screen size naturally */
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
}

@media (min-width: 600px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 24px;
    }
}

@media (min-width: 1024px) {
    .movies-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 32px;
    }
}

.empty-state {
    padding: 60px;
    text-align: center;
    color: #555;
    font-size: 1.1rem;
}
</style>