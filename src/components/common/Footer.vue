<template>
    <footer class="clean-footer">
        <div class="container">

            <div class="footer-grid">
                <div class="footer-col brand-col">
                    <div class="footer-brand">
                        <PhFilmStrip :size="28" weight="duotone" color="var(--color-accent)" />
                        <span class="logo-text">CINE<span class="highlight">MAX</span></span>
                    </div>
                    <p class="footer-desc">
                        The ultimate destination for movie lovers. Experience cinema with premium quality, comfort, and
                        style.
                    </p>
                    <div class="social-row">
                        <a href="#" class="social-link">
                            <PhFacebookLogo :size="22" />
                        </a>
                        <a href="#" class="social-link">
                            <PhInstagramLogo :size="22" />
                        </a>
                        <a href="#" class="social-link">
                            <PhTwitterLogo :size="22" />
                        </a>
                        <a href="#" class="social-link">
                            <PhYoutubeLogo :size="22" />
                        </a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4 class="col-title">Discover</h4>
                    <ul class="link-list">
                        <li><router-link to="/movies">Now Showing</router-link></li>
                        <li><router-link to="/movies">Coming Soon</router-link></li>
                        <li><router-link to="/cinemas">Cinemas</router-link></li>
                        <li><router-link to="/offers">Exclusive Offers</router-link></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4 class="col-title">Account</h4>
                    <ul class="link-list">
                        <li><router-link to="/profile">My Tickets</router-link></li>
                        <li><router-link to="/profile">Loyalty Points</router-link></li>
                        <li><router-link to="/login">Sign In</router-link></li>
                        <li><router-link to="/signup">Register</router-link></li>
                    </ul>
                </div>

                <div class="footer-col newsletter-col">
                    <h4 class="col-title">Stay Updated</h4>
                    <p class="news-text">Get the latest premieres and offers directly to your inbox.</p>
                    <div class="input-group">
                        <input type="email" placeholder="Your email address" />
                        <button class="btn-arrow">
                            <PhArrowRight :size="18" weight="bold" />
                        </button>
                    </div>
                    <span class="spam-note">No spam, unsubscribe anytime.</span>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">&copy; 2026 Cinemax Inc. All rights reserved.</p>
                <div class="legal-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Cookies</a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script setup>
import {
    PhFilmStrip, PhArrowRight,
    PhFacebookLogo, PhInstagramLogo, PhTwitterLogo, PhYoutubeLogo
} from '@phosphor-icons/vue'
</script>

<style scoped>
.clean-footer {
    background-color: #02040a;
    /* Deep black/blue */
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 80px;
    padding-bottom: 30px;
    color: #a1a1aa;
    font-size: 0.9rem;
    margin-top: auto;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: 40px;
    margin-bottom: 80px;
}

/* Brand Column */
.footer-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 16px;
}

.highlight {
    color: var(--color-accent);
}

.footer-desc {
    line-height: 1.6;
    margin-bottom: 24px;
    max-width: 300px;
}

.social-row {
    display: flex;
    gap: 16px;
}

.social-link {
    color: white;
    opacity: 0.6;
    transition: 0.2s;
    background: rgba(255, 255, 255, 0.05);
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.social-link:hover {
    opacity: 1;
    background: var(--color-accent);
    transform: translateY(-2px);
}

/* Links Columns */
.col-title {
    color: white;
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 24px;
    font-weight: 600;
}

.link-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link-list li {
    margin-bottom: 12px;
}

.link-list a {
    color: #a1a1aa;
    text-decoration: none;
    transition: 0.2s;
}

.link-list a:hover {
    color: white;
    padding-left: 5px;
}

/* Newsletter Column */
.news-text {
    margin-bottom: 16px;
    line-height: 1.5;
}

.input-group {
    display: flex;
    background: #111;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 6px;
    transition: 0.2s;
}

.input-group:focus-within {
    border-color: var(--color-accent);
}

.input-group input {
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    padding: 0 12px;
    outline: none;
}

.btn-arrow {
    background: var(--color-accent);
    color: white;
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
}

.btn-arrow:hover {
    background: white;
    color: black;
}

.spam-note {
    display: block;
    margin-top: 10px;
    font-size: 0.75rem;
    opacity: 0.5;
}

/* Bottom Bar */
.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legal-links {
    display: flex;
    gap: 24px;
}

.legal-links a {
    color: #a1a1aa;
    text-decoration: none;
    font-size: 0.85rem;
    transition: 0.2s;
}

.legal-links a:hover {
    color: white;
}

/* Responsive */
@media (max-width: 900px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 600px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
}
</style>