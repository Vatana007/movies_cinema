<template>
    <div class="page-container">
        <section class="container header-section">
            <div class="header-content">
                <h1 class="page-title">Our Locations</h1>
                <p class="subtitle">Experience movies at the finest theaters near you.</p>
            </div>

            <div class="search-wrapper">
                <PhMagnifyingGlass :size="20" class="search-icon" />
                <input type="text" v-model="searchQuery" placeholder="Search by location or name..." />
            </div>
        </section>

        <section class="container section">
            <div class="cinemas-grid">
                <div v-for="cinema in filteredCinemas" :key="cinema.id" class="cinema-card">
                    <div class="card-image" :style="{ backgroundImage: `url(${cinema.image})` }">
                        <div class="distance-badge">
                            <PhMapPin :size="14" weight="fill" />
                            {{ cinema.distance }} km
                        </div>
                    </div>

                    <div class="card-content">
                        <div class="card-header">
                            <h3>{{ cinema.name }}</h3>
                            <span class="status open">Open Now</span>
                        </div>

                        <p class="address">{{ cinema.address }}</p>

                        <div class="amenities-list">
                            <div v-for="feature in cinema.features" :key="feature" class="amenity-badge">
                                <component :is="getFeatureIcon(feature)" :size="14" />
                                <span>{{ feature }}</span>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="card-actions">
                            <button class="btn-map">
                                <PhNavigationArrow :size="20" />
                            </button>
                            <button class="btn-showtimes" @click="goToShowtimes(cinema.id)">
                                View Showtimes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredCinemas.length === 0" class="empty-state">
                <p>No cinemas found matching "{{ searchQuery }}"</p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    PhMagnifyingGlass, PhMapPin, PhNavigationArrow,
    PhSpeakerHigh, PhMonitor, PhArmchair, PhPopcorn, PhCar
} from '@phosphor-icons/vue'

const router = useRouter()
const searchQuery = ref('')

// Mock Data with "Real" Images
const cinemas = ref([
    {
        id: 1,
        name: 'CineMax Downtown',
        address: '123 Vision Street, Suite 400',
        distance: 2.5,
        image: 'https://images.unsplash.com/photo-1517604931442-710c8ef5ad25?q=80&w=800&auto=format&fit=crop',
        features: ['IMAX', 'Dolby Atmos', 'Recliners']
    },
    {
        id: 2,
        name: 'CineMax Riverside',
        address: '45 River Walk, North End',
        distance: 5.8,
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
        features: ['Standard', 'Parking', 'Food Court']
    },
    {
        id: 3,
        name: 'CineMax Gold Class',
        address: '88 Luxury Lane, Westside',
        distance: 12.0,
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
        features: ['VIP Service', 'Recliners', 'Bar']
    }
])

// Filter Logic
const filteredCinemas = computed(() => {
    return cinemas.value.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const goToShowtimes = (id) => {
    // In a real app, you might route to /cinemas/:id
    console.log("Navigating to cinema", id)
    router.push('/movies') // For now, just go to movies page
}

// Helper to pick icon based on feature name
const getFeatureIcon = (feature) => {
    if (feature.includes('IMAX') || feature.includes('VIP')) return PhMonitor
    if (feature.includes('Atmos')) return PhSpeakerHigh
    if (feature.includes('Recliners')) return PhArmchair
    if (feature.includes('Food') || feature.includes('Bar')) return PhPopcorn
    if (feature.includes('Parking')) return PhCar
    return PhMonitor
}
</script>

<style scoped>
.page-container {
    padding-top: 100px;
    /* Offset for fixed navbar */
    min-height: 100vh;
}

/* --- Header --- */
.header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    color: white;
}

.subtitle {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    margin: 0;
}

/* Search Bar */
.search-wrapper {
    position: relative;
    width: 300px;
}

.search-wrapper input {
    width: 100%;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-bg-highlight);
    padding: 12px 12px 12px 40px;
    border-radius: 50px;
    color: white;
    outline: none;
    transition: 0.2s;
}

.search-wrapper input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.2);
}

.search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-muted);
}

/* --- Grid & Cards --- */
.cinemas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 30px;
}

.cinema-card {
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-bg-highlight);
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cinema-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
}

.card-image {
    height: 180px;
    background-size: cover;
    background-position: center;
    position: relative;
}

.distance-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 6px;
}

.card-content {
    padding: 24px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.card-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: white;
}

.status {
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
}

.status.open {
    background: rgba(46, 204, 113, 0.15);
    color: #2ecc71;
}

.address {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin: 0 0 16px 0;
}

/* Amenities */
.amenities-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.amenity-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--color-bg-highlight);
    color: #ccc;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.8rem;
    transition: 0.2s;
}

.cinema-card:hover .amenity-badge {
    background: #333;
    color: white;
}

.divider {
    height: 1px;
    background: var(--color-bg-highlight);
    margin-bottom: 20px;
}

/* Actions */
.card-actions {
    display: flex;
    gap: 12px;
}

.btn-map {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--color-bg-highlight);
    color: var(--color-text-muted);
    border-radius: 12px;
    cursor: pointer;
    transition: 0.2s;
}

.btn-map:hover {
    background: white;
    color: black;
    border-color: white;
}

.btn-showtimes {
    flex: 1;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.btn-showtimes:hover {
    background: #f40612;
}

.empty-state {
    text-align: center;
    color: var(--color-text-muted);
    padding: 60px;
    font-size: 1.1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .header-section {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-wrapper {
        width: 100%;
    }
}
</style>