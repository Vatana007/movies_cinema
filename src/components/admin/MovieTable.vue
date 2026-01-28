<template>
    <div class="table-wrapper">
        <table class="movie-table">
            <thead>
                <tr>
                    <th>Poster</th>
                    <th>Details</th>
                    <th>Genre</th>
                    <th>Release Date</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movie in movies" :key="movie.id">
                    <td class="col-poster">
                        <div class="poster-frame">
                            <img :src="movie.poster" :alt="movie.title">
                        </div>
                    </td>

                    <td>
                        <div class="movie-details">
                            <span class="title">{{ movie.title }}</span>
                            <span class="duration">{{ movie.duration }}</span>
                        </div>
                    </td>

                    <td>
                        <span class="badge-genre">{{ movie.genre }}</span>
                    </td>

                    <td class="text-muted">{{ movie.releaseDate || '2025-12-01' }}</td>

                    <td>
                        <div class="rating-cell">
                            <PhStar weight="fill" color="var(--color-accent-gold)" />
                            <span>{{ movie.rating }}</span>
                        </div>
                    </td>

                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon edit" @click="$emit('edit', movie.id)" title="Edit">
                                <PhPencilSimple :size="18" />
                            </button>
                            <button class="btn-icon delete" @click="$emit('delete', movie.id)" title="Delete">
                                <PhTrash :size="18" />
                            </button>
                        </div>
                    </td>
                </tr>

                <tr v-if="movies.length === 0">
                    <td colspan="6" class="empty-state">
                        No movies found. Add a new movie to get started.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { PhStar, PhPencilSimple, PhTrash } from '@phosphor-icons/vue'

defineProps({
    movies: {
        type: Array,
        required: true
    }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.table-wrapper {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-bg-highlight);
    overflow: hidden;
    /* Ensures rounded corners work on table */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.movie-table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #20232a;
    color: var(--color-text-muted);
    font-weight: 600;
    text-align: left;
    padding: 16px;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    padding: 16px;
    border-bottom: 1px solid var(--color-bg-highlight);
    vertical-align: middle;
    color: var(--color-text-main);
}

tr:last-child td {
    border-bottom: none;
}

tr:hover {
    background-color: rgba(255, 255, 255, 0.02);
}

/* Poster Styling */
.col-poster {
    width: 80px;
}

.poster-frame {
    width: 50px;
    height: 75px;
    border-radius: 4px;
    overflow: hidden;
    background: var(--color-bg-highlight);
}

.poster-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Text Styling */
.movie-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.title {
    font-weight: 600;
    font-size: 1rem;
}

.duration {
    font-size: 0.8rem;
    color: var(--color-text-muted);
}

.text-muted {
    color: var(--color-text-muted);
    font-size: 0.9rem;
}

/* Badges */
.badge-genre {
    background: var(--color-bg-highlight);
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: white;
}

.rating-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: bold;
}

/* Actions */
.action-buttons {
    display: flex;
    gap: 10px;
}

.btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-icon.edit {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
}

.btn-icon.edit:hover {
    background: #3498db;
    color: white;
}

.btn-icon.delete {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
}

.btn-icon.delete:hover {
    background: #e74c3c;
    color: white;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: var(--color-text-muted);
    font-style: italic;
}
</style>