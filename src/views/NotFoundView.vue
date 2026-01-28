<template>
    <div class="not-found-container">
        <h1 class="error-code">404</h1>
        <h2 class="message">Scene Not Found</h2>
        <p class="sub-message">The movie you are looking for is not playing in this theater.</p>

        <router-link to="/" class="btn-home">
            Back to Home
        </router-link>
    </div>
</template>

<style scoped>
.not-found-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bg-primary);
    text-align: center;
    padding: 20px;
}

.error-code {
    font-size: 8rem;
    font-weight: 900;
    color: var(--color-bg-highlight);
    margin: 0;
    line-height: 1;
}

.message {
    font-size: 2rem;
    color: var(--color-text-main);
    margin: 10px 0;
}

.sub-message {
    color: var(--color-text-muted);
    margin-bottom: 30px;
}

.btn-home {
    padding: 12px 30px;
    background: var(--color-accent);
    color: white;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-weight: bold;
    transition: 0.2s;
}

.btn-home:hover {
    background: white;
    color: black;
}
</style>