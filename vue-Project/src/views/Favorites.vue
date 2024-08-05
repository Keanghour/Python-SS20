<template>
    <div class="container-md">
    <div class="favorites-wrapper">
        <h1 class="text-center mb-4">Favorites</h1>
        <div class="favorites-grid">
            <div class="product-card" v-for="product in favorites" :key="product.id">
                <img class="product-image" :src="product.image" alt="Product image">
                <div class="product-info">
                    <h5 class="product-title">{{ truncatedTitle(product) }}</h5>
                    <p class="product-description">{{ truncatedDescription(product) }}</p>
                    <div class="product-footer">
                        <span class="product-price">${{ product.price }}</span>
                        <div class="button-group">
                            <button
                                :class="{'button-icon active': isInCart(product), 'button-icon': !isInCart(product)}"
                                @click="toggleCart(product)">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button
                                :class="{'button-icon active': isInFavorites(product), 'button-icon': !isInFavorites(product)}"
                                @click="toggleFavorites(product)">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-rating">
                        <span v-for="star in 5" :key="star" class="fa fa-star"
                            :class="{'filled': star <= product.rating}"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                favorites: [] // List of favorite products
            };
        },
        created() {
            this.loadFavorites();
        },
        methods: {
            loadFavorites() {
                this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            },
            truncatedTitle(product) {
                const title = product.title || '';
                return title.length <= 20 ? title : title.slice(0, 20) + '...';
            },
            truncatedDescription(product) {
                const description = product.description || '';
                return description.length <= 100 ? description : description.slice(0, 100) + '...';
            },
            isInCart(product) {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                return cartItems.some(item => item.id === product.id);
            },
            toggleCart(product) {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                if (this.isInCart(product)) {
                    cartItems = cartItems.filter(item => item.id !== product.id);
                } else {
                    product.quantity = 1;
                    cartItems.push(product);
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                this.$root.$emit('update-cart', cartItems.length);
            },
            isInFavorites(product) {
                return this.favorites.some(item => item.id === product.id);
            },
            toggleFavorites(product) {
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (this.isInFavorites(product)) {
                    favorites = favorites.filter(item => item.id !== product.id);
                } else {
                    favorites.push(product);
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
                this.$root.$emit('update-favorites', favorites.length);
                this.loadFavorites(); // Refresh favorites list
            }
        }
    };
</script>

<style scoped>
    .favorites-wrapper {
        padding: 20px;
    }

    .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }

    .product-card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }

    .product-card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .product-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .product-info {
        padding: 15px;
    }

    .product-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 10px;
    }

    .product-description {
        font-size: 0.875rem;
        margin: 0 0 10px;
    }

    .product-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .product-price {
        font-size: 1rem;
        font-weight: 600;
    }

    .button-group {
        display: flex;
        gap: 10px;
    }

    .button-icon {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #007bff;
        cursor: pointer;
    }

    .button-icon.active {
        color: red;
    }

    .product-rating {
        margin-top: 10px;
    }

    .product-rating .fa-star {
        font-size: 1rem;
        color: #e0e0e0;
    }

    .product-rating .fa-star.filled {
        color: #f5c518;
    }
</style>