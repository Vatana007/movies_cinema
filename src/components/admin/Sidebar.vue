<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="brand">
                <PhFilmStrip :size="32" weight="duotone" color="var(--color-accent)" />
                <span class="logo-text">ADMIN adfafad</span>
            </div>
        </div>

        <nav class="sidebar-nav">

            <div class="nav-group">
                <span class="group-label">Overview</span>
                <router-link to="/admin" exact-active-class="active" class="nav-item">
                    <PhSquaresFour :size="20" /> Dashboard
                </router-link>
            </div>

            <div class="nav-group">
                <span class="group-label">Management</span>
                <router-link to="/admin/movies" active-class="active" class="nav-item">
                    <PhFilmReel :size="20" /> Movies
                </router-link>
                <router-link to="/admin/shows" active-class="active" class="nav-item">
                    <PhCalendarPlus :size="20" /> Schedule
                </router-link>
                <router-link to="/admin/screens" active-class="active" class="nav-item">
                    <PhMonitorPlay :size="20" /> Screens
                </router-link>
            </div>

            <div class="nav-group">
                <span class="group-label">Operations</span>
                <router-link to="/admin/bookings" active-class="active" class="nav-item">
                    <PhTicket :size="20" /> Bookings
                </router-link>
                <router-link to="/admin/users" active-class="active" class="nav-item">
                    <PhUsers :size="20" /> Users
                </router-link>
                <router-link to="/admin/scanner" active-class="active" class="nav-item">
                    <PhQrCode :size="20" /> Scanner
                </router-link>
            </div>

        </nav>

        <div class="sidebar-footer">
            <button class="btn-logout">
                <PhSignOut :size="20" /> Logout
            </button>
        </div>
    </aside>
</template>

<script setup>
import {
    PhFilmStrip, PhSquaresFour, PhFilmReel, PhCalendarPlus,
    PhMonitorPlay, PhTicket, PhUsers, PhQrCode, PhSignOut
} from '@phosphor-icons/vue'
</script>

<style scoped>
.sidebar {
    width: 260px;
    height: calc(100vh - 48px);
    background-color: var(--color-bg-secondary);
    border-right: 1px solid var(--color-bg-highlight);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    background-color: azure;
}

.sidebar-header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid var(--color-bg-highlight);
}

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: white;
    font-weight: 800;
    font-size: 1.4rem;
    letter-spacing: 1px;
}

.sidebar-nav {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

.nav-group {
    margin-bottom: 24px;
}

.group-label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-text-muted);
    margin-bottom: 8px;
    font-weight: 600;
    padding-left: 12px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    color: #a1a1aa;
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all 0.2s;
    font-size: 0.95rem;
    margin-bottom: 4px;
}

.nav-item:hover {
    background-color: var(--color-bg-primary);
    color: white;
}

.nav-item.active {
    background-color: var(--color-accent);
    color: white;
    box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
}

.sidebar-footer {
    padding: 24px;
    border-top: 1px solid var(--color-bg-highlight);
}

.btn-logout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: transparent;
    border: 1px solid var(--color-bg-highlight);
    color: var(--color-text-muted);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: 0.2s;
}

.btn-logout:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border-color: white;
}
</style>