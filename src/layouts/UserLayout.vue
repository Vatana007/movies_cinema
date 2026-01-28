<template>
    <div class="layout-wrapper">
        <Navbar />

        <main class="content-area">
            <router-view />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/Footer.vue' // Placeholder for now
</script>

<style scoped>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-bg-primary);
}

.content-area {
    flex: 1;
    /* Pushes footer to bottom */
    padding-top: 80px;
    /* Offset for fixed navbar */
}
</style>