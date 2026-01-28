<template>
    <div class="manager-view">

        <div class="dashboard-header">
            <div class="header-text">
                <h2>Movie Library</h2>
                <p class="subtitle">Manage your catalog, update metadata, and curate content.</p>
            </div>

            <div class="stats-row">
                <div class="stat-pill">
                    <div class="icon purple">
                        <PhFilmStrip :size="20" weight="fill" />
                    </div>
                    <div class="stat-info">
                        <span class="label">Total Titles</span>
                        <span class="value">{{ movieStore.movies.length }}</span>
                    </div>
                </div>
                <div class="stat-pill">
                    <div class="icon yellow">
                        <PhStar :size="20" weight="fill" />
                    </div>
                    <div class="stat-info">
                        <span class="label">Avg Rating</span>
                        <span class="value">{{ averageRating }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="controls-toolbar">
            <div class="search-wrapper">
                <PhMagnifyingGlass class="search-icon" />
                <input v-model="search" type="text" placeholder="Search by title, genre, or year..." />
            </div>

            <button class="btn-modern-add" @click="openAddModal">
                <div class="icon-wrapper">
                    <PhPlus :size="16" weight="bold" />
                </div>
                <span>Add Movie</span>
            </button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th width="80">Poster</th>
                        <th>Movie Details</th>
                        <th>Genre</th>
                        <th>Release</th>
                        <th>Rating</th>
                        <th width="140">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movie in filteredMovies" :key="movie.id" class="movie-row">
                        <td>
                            <div class="poster-preview">
                                <img :src="movie.poster" alt="poster" loading="lazy">
                            </div>
                        </td>
                        <td>
                            <div class="movie-info">
                                <span class="title">{{ movie.title }}</span>
                                <span class="duration">{{ movie.duration || 'N/A' }}</span>
                            </div>
                        </td>
                        <td><span class="genre-tag">{{ movie.genre }}</span></td>
                        <td class="year-text">{{ movie.year }}</td>
                        <td>
                            <div class="rating-badge">
                                <PhStar weight="fill" color="#fbbf24" :size="14" />
                                <span>{{ movie.rating }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="actions">
                                <button class="btn-icon stats" @click="viewStats(movie)">
                                    <PhChartBar :size="18" />
                                </button>
                                <button class="btn-icon edit" @click="openEditModal(movie)">
                                    <PhPencilSimple :size="18" />
                                </button>
                                <button class="btn-icon delete" @click="deleteMovie(movie.id)">
                                    <PhTrash :size="18" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="filteredMovies.length === 0" class="empty-state">
                <div class="empty-icon">
                    <PhFilmStrip :size="48" weight="duotone" />
                </div>
                <h3>No movies found</h3>
            </div>
        </div>

        <transition name="modal-fade">
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal-card modern-modal">

                    <div class="modal-header">
                        <div class="header-title">
                            <h3>{{ isEditing ? 'Edit Movie' : 'New Release' }}</h3>
                            <p>Fill in the metadata to update your catalog.</p>
                        </div>
                        <button class="close-btn" @click="closeModal">
                            <PhX :size="20" />
                        </button>
                    </div>

                    <form @submit.prevent="saveMovie" class="modern-form">

                        <div class="form-section">
                            <h4 class="section-title">Basic Information</h4>

                            <div class="form-group full-width">
                                <label>Movie Title</label>
                                <div class="input-wrapper">
                                    <PhFilmStrip class="input-icon" />
                                    <input v-model="form.title" type="text" placeholder="e.g. Inception" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Genre</label>
                                    <div class="input-wrapper">
                                        <PhTag class="input-icon" />
                                        <input v-model="form.genre" type="text" placeholder="Sci-Fi / Action">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Year</label>
                                    <div class="input-wrapper">
                                        <PhCalendarBlank class="input-icon" />
                                        <input v-model="form.year" type="text" placeholder="2010">
                                    </div>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Duration</label>
                                    <div class="input-wrapper">
                                        <PhClock class="input-icon" />
                                        <input v-model="form.duration" type="text" placeholder="2h 28m">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Rating (0-10)</label>
                                    <div class="input-wrapper">
                                        <PhStar class="input-icon" />
                                        <input v-model="form.rating" type="number" step="0.1" max="10"
                                            placeholder="8.8">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h4 class="section-title">Media & Story</h4>

                            <div class="form-group">
                                <label>Poster URL</label>
                                <div class="input-wrapper">
                                    <PhImage class="input-icon" />
                                    <input v-model="form.poster" type="url" placeholder="https://image.tmdb.org...">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Backdrop URL</label>
                                <div class="input-wrapper">
                                    <PhImageSquare class="input-icon" />
                                    <input v-model="form.backdrop" type="url" placeholder="https://image.tmdb.org...">
                                </div>
                            </div>

                            <div class="form-group full-width">
                                <label>Synopsis</label>
                                <div class="input-wrapper textarea-wrapper">
                                    <PhTextAlignLeft class="input-icon top-align" />
                                    <textarea v-model="form.synopsis" rows="3"
                                        placeholder="Enter plot summary..."></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn-cancel" @click="closeModal">Discard</button>
                            <button type="submit" class="btn-confirm">
                                <PhCheck :size="18" weight="bold" />
                                {{ isEditing ? 'Save Changes' : 'Add to Library' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="statsMovie" class="modal-overlay" @click.self="statsMovie = null">
                <div class="modal-card small-stats">
                    <div class="stats-header" :style="{ backgroundImage: `url(${statsMovie.backdrop})` }">
                        <div class="overlay"></div>
                        <div class="stats-title">
                            <h3>{{ statsMovie.title }}</h3>
                        </div>
                    </div>
                    <div class="stats-body">
                        <div class="stat-row">
                            <span>Total Bookings</span>
                            <strong>{{ movieAnalytics.count }}</strong>
                        </div>
                        <div class="stat-row">
                            <span>Revenue</span>
                            <strong class="money">${{ movieAnalytics.revenue.toFixed(2) }}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import {
    PhFilmStrip, PhStar, PhMagnifyingGlass, PhPlus,
    PhPencilSimple, PhTrash, PhChartBar, PhX,
    PhCalendarBlank, PhClock, PhTag, PhImage,
    PhImageSquare, PhTextAlignLeft, PhCheck
} from '@phosphor-icons/vue'

const movieStore = useMovieStore()
const search = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const statsMovie = ref(null)

const form = reactive({
    id: null, title: '', genre: '', year: '', duration: '',
    rating: 0, poster: '', backdrop: '', synopsis: ''
})

const averageRating = computed(() => {
    if (!movieStore.movies.length) return 0
    const sum = movieStore.movies.reduce((acc, m) => acc + (Number(m.rating) || 0), 0)
    return (sum / movieStore.movies.length).toFixed(1)
})

const filteredMovies = computed(() => {
    if (!search.value) return movieStore.movies
    const query = search.value.toLowerCase()
    return movieStore.movies.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.genre.toLowerCase().includes(query) ||
        String(m.year).includes(query)
    )
})

const movieAnalytics = computed(() => {
    if (!statsMovie.value) return { count: 0, revenue: 0 }
    const allBookings = JSON.parse(localStorage.getItem('allBookings')) || []
    const relevant = allBookings.filter(b => b.movie === statsMovie.value.title && b.status !== 'Cancelled')
    return {
        count: relevant.length,
        revenue: relevant.reduce((sum, b) => sum + (Number(b.total) || 0), 0)
    }
})

const openAddModal = () => { isEditing.value = false; resetForm(); showModal.value = true }
const openEditModal = (movie) => { isEditing.value = true; Object.assign(form, movie); showModal.value = true }
const closeModal = () => { showModal.value = false }
const saveMovie = () => {
    if (isEditing.value) {
        const index = movieStore.movies.findIndex(m => m.id === form.id)
        if (index !== -1) Object.assign(movieStore.movies[index], form)
    } else {
        const newMovie = { ...form, id: Date.now(), cast: [] }
        movieStore.movies.unshift(newMovie)
    }
    closeModal()
}
const deleteMovie = (id) => {
    if (confirm("Delete this movie?")) {
        const index = movieStore.movies.findIndex(m => m.id === id)
        if (index !== -1) movieStore.movies.splice(index, 1)
    }
}
const viewStats = (movie) => { statsMovie.value = movie }
const resetForm = () => { Object.assign(form, { id: null, title: '', genre: '', year: '', duration: '', rating: 0, poster: '', backdrop: '', synopsis: '' }) }
</script>

<style scoped>
/* Reuse base styles */
.manager-view {
    padding: 30px;
    color: #e4e4e7;
    font-family: 'Inter', sans-serif;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.header-text h2 {
    margin: 0 0 6px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
}

.subtitle {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
}

.stats-row {
    display: flex;
    gap: 16px;
}

.stat-pill {
    background: #18181b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.stat-pill .icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon.purple {
    background: rgba(168, 85, 247, 0.15);
    color: #a855f7;
}

.icon.yellow {
    background: rgba(251, 191, 36, 0.15);
    color: #fbbf24;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-info .label {
    font-size: 0.7rem;
    color: #888;
    text-transform: uppercase;
    font-weight: 600;
}

.stat-info .value {
    font-size: 1rem;
    font-weight: 700;
    color: white;
}

.controls-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #12141a;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 24px;
}

.search-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 16px;
    border-radius: 10px;
    width: 350px;
}

.search-wrapper input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
}

.btn-modern-add {
    background: linear-gradient(135deg, var(--color-accent), #f43f5e);
    border: none;
    border-radius: 10px;
    padding: 8px 20px 8px 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
}

.icon-wrapper {
    background: rgba(255, 255, 255, 0.2);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table-container {
    background: #12141a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 16px 24px;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #666;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.02);
}

td {
    padding: 12px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
}

.poster-preview {
    width: 48px;
    height: 72px;
    border-radius: 6px;
    overflow: hidden;
}

.poster-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.movie-info {
    display: flex;
    flex-direction: column;
}

.title {
    font-weight: 600;
    color: white;
    font-size: 0.95rem;
}

.duration {
    color: #666;
    font-size: 0.8rem;
}

.genre-tag {
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #ccc;
}

.year-text {
    font-family: monospace;
    color: #888;
}

.rating-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #fbbf24;
}

.actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.btn-icon.stats {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.btn-icon.edit {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.btn-icon.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.empty-state {
    padding: 60px;
    text-align: center;
    color: #555;
}

/* === MODERN MODAL STYLES === */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modern-modal {
    background: #18181b;
    width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: 24px 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #18181b;
    position: sticky;
    top: 0;
    z-index: 10;
}

.header-title h3 {
    margin: 0 0 4px 0;
    color: white;
    font-size: 1.25rem;
}

.header-title p {
    margin: 0;
    color: #888;
    font-size: 0.9rem;
}

.close-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    transition: 0.2s;
}

.close-btn:hover {
    color: white;
    transform: rotate(90deg);
}

.modern-form {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-title {
    margin: 0 0 8px 0;
    font-size: 0.75rem;
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    border-left: 3px solid var(--color-accent);
    padding-left: 10px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #a1a1aa;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #09090b;
    border: 1px solid #27272a;
    border-radius: 10px;
    transition: all 0.2s ease;
}

.input-wrapper:focus-within {
    border-color: var(--color-accent);
    background: #000;
    box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);
}

.input-icon {
    position: absolute;
    left: 14px;
    color: #52525b;
    font-size: 1.1rem;
}

.input-icon.top-align {
    top: 14px;
}

.input-wrapper input,
.input-wrapper textarea {
    width: 100%;
    background: transparent;
    border: none;
    padding: 12px 16px 12px 42px;
    color: white;
    font-size: 0.95rem;
    outline: none;
}

.textarea-wrapper {
    align-items: flex-start;
}

.modal-footer {
    padding: 24px 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #18181b;
    position: sticky;
    bottom: 0;
}

.btn-cancel {
    background: transparent;
    border: 1px solid #3f3f46;
    color: #a1a1aa;
    padding: 10px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
}

.btn-cancel:hover {
    background: #27272a;
    color: white;
}

.btn-confirm {
    background: linear-gradient(135deg, var(--color-accent), #f43f5e);
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
    transition: 0.2s;
}

.btn-confirm:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .modal-card {
    animation: slideUp 0.3s ease;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Stats Modal Specific */
.small-stats {
    width: 380px;
}

.stats-header {
    height: 140px;
    position: relative;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 20px;
}

.stats-header .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #18181b, transparent);
}

.stats-title {
    position: relative;
    z-index: 2;
    color: white;
    text-shadow: 0 2px 4px black;
}

.stats-body {
    padding: 24px;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 0.95rem;
    color: #ccc;
}

.money {
    color: #10b981;
}
</style>