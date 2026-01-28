<template>
    <div class="manager-view">
        <div class="page-header">
            <div class="header-content">
                <h2>Movie Library</h2>
                <p class="subtitle">Manage your catalog, edit details, and update schedules.</p>
            </div>

            <button class="btn-modern-add" @click="openAddModal">
                <div class="icon-wrapper">
                    <PhPlus :size="18" weight="bold" />
                </div>
                <span>Add Movie</span>
            </button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movie in movieStore.movies" :key="movie.id">
                        <td>
                            <div class="poster-wrapper">
                                <img :src="movie.poster" class="table-poster" loading="lazy">
                            </div>
                        </td>
                        <td>
                            <span class="primary-text">{{ movie.title }}</span>
                            <span class="year-tag">{{ movie.year }}</span>
                        </td>
                        <td class="sub-text">{{ movie.genre }}</td>
                        <td>
                            <div class="rating-badge">
                                <PhStar weight="fill" color="#fbbf24" />
                                <span>{{ movie.rating }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="actions">
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
        </div>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-card">
                <div class="modal-header">
                    <h3>{{ isEditing ? 'Edit Movie' : 'Add New Movie' }}</h3>
                    <button class="close-btn" @click="closeModal">
                        <PhX :size="20" />
                    </button>
                </div>

                <form @submit.prevent="saveMovie" class="modal-form">

                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="form.title" type="text" placeholder="Movie Title" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Genre</label>
                            <input v-model="form.genre" type="text" placeholder="Action / Drama">
                        </div>
                        <div class="form-group">
                            <label>Year</label>
                            <input v-model="form.year" type="text" placeholder="2024">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Duration</label>
                            <input v-model="form.duration" type="text" placeholder="2h 30m">
                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <input v-model="form.rating" type="number" step="0.1" max="10">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Poster URL</label>
                        <input v-model="form.poster" type="url" placeholder="https://image.tmdb.org...">
                    </div>

                    <div class="form-group">
                        <label>Backdrop URL</label>
                        <input v-model="form.backdrop" type="url" placeholder="https://image.tmdb.org...">
                    </div>

                    <div class="form-group">
                        <label>Synopsis</label>
                        <textarea v-model="form.synopsis" rows="3" placeholder="Enter plot summary..."></textarea>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn-ghost" @click="closeModal">Cancel</button>
                        <button type="submit" class="btn-save">
                            {{ isEditing ? 'Save Changes' : 'Create Movie' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMovieStore } from '@/store/movieStore'
import { PhPlus, PhPencilSimple, PhTrash, PhStar, PhX } from '@phosphor-icons/vue'

const movieStore = useMovieStore()
const showModal = ref(false)
const isEditing = ref(false)

// Form State
const form = reactive({
    id: null,
    title: '',
    genre: '',
    year: '',
    duration: '',
    rating: 0,
    poster: '',
    backdrop: '',
    synopsis: ''
})

// ACTIONS
const openAddModal = () => {
    isEditing.value = false
    resetForm()
    showModal.value = true
}

const openEditModal = (movie) => {
    isEditing.value = true
    Object.assign(form, movie)
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const saveMovie = () => {
    if (isEditing.value) {
        const index = movieStore.movies.findIndex(m => m.id === form.id)
        if (index !== -1) {
            Object.assign(movieStore.movies[index], form)
        }
    } else {
        const newMovie = {
            ...form,
            id: Date.now(),
            cast: []
        }
        movieStore.movies.unshift(newMovie)
    }
    closeModal()
}

const deleteMovie = (id) => {
    if (confirm("Are you sure you want to delete this movie?")) {
        const index = movieStore.movies.findIndex(m => m.id === id)
        if (index !== -1) {
            movieStore.movies.splice(index, 1)
        }
    }
}

const resetForm = () => {
    Object.assign(form, {
        id: null, title: '', genre: '', year: '', duration: '',
        rating: 0, poster: '', backdrop: '', synopsis: ''
    })
}
</script>

<style scoped>
.manager-view {
    padding: 30px;
}

/* --- HEADER DESIGN --- */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.header-content h2 {
    font-size: 1.5rem;
    margin: 0 0 4px 0;
    font-weight: 700;
    color: white;
}

.subtitle {
    color: #888;
    font-size: 0.9rem;
    margin: 0;
}

/* --- MODERN ADD BUTTON --- */
.btn-modern-add {
    /* Gradient Background */
    background: linear-gradient(135deg, var(--color-accent), #f43f5e);
    border: none;
    border-radius: 12px;
    padding: 6px 20px 6px 6px;
    /* Optimized padding for icon layout */
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    /* Soft Colored Shadow */
    box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-modern-add:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(229, 9, 20, 0.6);
    filter: brightness(1.1);
}

.btn-modern-add:active {
    transform: translateY(0);
}

.icon-wrapper {
    background: rgba(255, 255, 255, 0.2);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
}

/* --- TABLE DESIGN --- */
.table-container {
    background: #12141a;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    padding: 16px 24px;
    text-align: left;
    background: rgba(255, 255, 255, 0.02);
    color: #666;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

td {
    padding: 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
}

.poster-wrapper {
    width: 48px;
    height: 72px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.table-poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.primary-text {
    display: block;
    font-weight: 600;
    color: white;
    font-size: 0.95rem;
}

.year-tag {
    font-size: 0.75rem;
    color: #666;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    margin-top: 4px;
    display: inline-block;
}

.sub-text {
    color: #888;
    font-size: 0.9rem;
}

.rating-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: bold;
    color: #fbbf24;
    font-size: 0.9rem;
}

/* Actions */
.actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.btn-icon.edit {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.btn-icon.edit:hover {
    background: #3b82f6;
    color: white;
}

.btn-icon.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.btn-icon.delete:hover {
    background: #ef4444;
    color: white;
}

/* --- MODAL --- */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-card {
    background: #18181b;
    padding: 0;
    width: 500px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
    color: white;
    font-size: 1.1rem;
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
}

.modal-form {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #ccc;
    font-size: 0.85rem;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    background: #09090b;
    border: 1px solid #27272a;
    color: white;
    border-radius: 8px;
    outline: none;
    transition: 0.2s;
    font-size: 0.9rem;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--color-accent);
    background: #000;
}

.modal-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn-ghost {
    background: transparent;
    color: #888;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: 500;
}

.btn-ghost:hover {
    color: white;
}

.btn-save {
    background: white;
    color: black;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.btn-save:hover {
    background: #e4e4e7;
    transform: translateY(-1px);
}
</style>