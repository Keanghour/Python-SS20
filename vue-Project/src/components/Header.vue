<template>
    <div class="sticky-top">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand me-4" href="#">SS20 LOGO</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link">About</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/contact" class="nav-link">Contact</router-link>
                        </li>
                    </ul>
                    <div class="d-flex flex-nowrap align-items-center">
                        <router-link to="/cart" class="nav-link position-relative me-3" @click.native="showLoading">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="badge badge-pill badge-secondary position-absolute"
                                style="top: -5px; right: -10px;">
                                {{ cartCount }}
                            </span>
                        </router-link>
                        <router-link to="/favorites" class="nav-link position-relative me-3">
                            <i class="fas fa-heart"></i>
                            <span class="badge badge-pill badge-secondary position-absolute"
                                style="top: -5px; right: -10px;">
                                {{ favoriteCount }}
                            </span>
                        </router-link>
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-user"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                                <li><a class="dropdown-item" href="#">Manage Account</a></li>
                                <li><a class="dropdown-item" href="#">Help Center</a></li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#" @click="toggleDarkMode">
                                        {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'gasparesganga-jquery-loading-overlay/dist/loadingoverlay.min.js';

export default {
    data() {
        return {
            cartCount: 0,
            favoriteCount: 0,
            darkMode: false, // Default mode
            isLoading: false // Loading state
        };
    },
    created() {
        // Listen for cart and favorite updates
        this.$root.$on('update-cart', this.updateCartCount);
        this.$root.$on('update-favorites', this.updateFavoriteCount);

        // Load initial cart count from localStorage
        this.loadInitialCartCount();

        // Load dark mode preference from localStorage
        this.darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
        this.applyDarkMode();
    },
    methods: {
        updateCartCount(count) {
            this.cartCount = count;
        },
        updateFavoriteCount(count) {
            this.favoriteCount = count;
        },
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
            this.applyDarkMode();
        },
        applyDarkMode() {
            if (this.darkMode) {
                document.body.classList.add('bg-dark', 'text-light');
            } else {
                document.body.classList.remove('bg-dark', 'text-light');
            }
        },
        logout() {
            // Implement logout functionality
            alert('Logged out');
        },
        loadInitialCartCount() {
            const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
            this.cartCount = cart.length;
        },
        showLoading() {
            this.isLoading = true;
            $.LoadingOverlay("show");

            // Hide loading overlay after 3 seconds
            setTimeout(() => {
                $.LoadingOverlay("hide");
                this.isLoading = false;
            }, 500); // Adjust this duration as needed
        }
    }
};
</script>

<style scoped>
.header {
    margin-bottom: 20px;
}

.badge {
    margin-left: 5px;
}

.nav-link.position-relative {
    padding-right: 1.5rem;
    /* Ensure the badge doesn't overlap the icon */
}

.dropdown-menu {
    min-width: 150px;
    /* Optional: adjust to fit content */
}

/* Add styles for loading overlay */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #000;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
