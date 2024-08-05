<template>
    <div class="col-custom">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top" :src="product.image" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{ truncatedTitle }}</h5>
                <p class="card-text">
                    {{ truncatedDescription }}
                    <span v-if="isDescriptionLong" class="more" @click="toggleDescription">
                        {{ showFullDescription ? 'See less' : 'See more' }}
                    </span>
                </p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <small class="text-muted price">Price: ${{ product.price }}</small>
                    <div class="btn-group">
                        <button :class="{'btn-icon red': isInCart, 'btn-icon': !isInCart}" @click="toggleCart(product)">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button :class="{'btn-icon red': isInFavorites, 'btn-icon': !isInFavorites}" type="button"
                            @click="toggleFavorites(product)">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="rating mt-2">
                    <span v-for="star in 5" :key="star" class="fa fa-star"
                        :class="{'checked': star <= product.rating}"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['product'],
        data() {
            return {
                showFullDescription: false,
                isInCart: false,
                isInFavorites: false
            };
        },
        computed: {
            truncatedTitle() {
                const title = this.product.title || '';
                return title.length <= 19 ? title : title.slice(0, 19);
            },
            truncatedDescription() {
                const description = this.product.description || '';
                return this.showFullDescription || description.length <= 100 ? description : description.slice(0, 100) +
                    '...';
            },
            isDescriptionLong() {
                return this.product.description && this.product.description.length > 100;
            }
        },
        methods: {
            toggleCart(product) {
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

                if (this.isInCart) {
                    // Remove item from cart
                    cartItems = cartItems.filter(item => item.id !== product.id);
                    this.isInCart = false;
                } else {
                    // Add item to cart
                    product.quantity = 1;
                    cartItems.push(product);
                    this.isInCart = true;
                }

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                this.$root.$emit('update-cart', cartItems.length);
            },
            toggleFavorites(product) {
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

                if (this.isInFavorites) {
                    // Remove item from favorites
                    favorites = favorites.filter(item => item.id !== product.id);
                    this.isInFavorites = false;
                } else {
                    // Add item to favorites
                    favorites.push(product);
                    this.isInFavorites = true;
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));
                this.$root.$emit('update-favorites', favorites.length);
            },
            toggleDescription() {
                this.showFullDescription = !this.showFullDescription;
            }
        },
        created() {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            this.isInCart = cartItems.some(item => item.id === this.product.id);

            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            this.isInFavorites = favorites.some(item => item.id === this.product.id);
        }
    }
</script>

<style scoped>
    .col-custom {
        flex: 0 0 20%;
        max-width: 20%;
        padding: 0 5px;
    }

    .card {
        height: 520px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 2px;
        margin-bottom: 5px;
    }

    .card-img-top {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 200px);
        padding: 1rem;
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .card-text {
        font-size: 0.875rem;
        margin-bottom: 10px;
    }

    .btn-group {
        display: flex;
        gap: 0.5rem;
    }

    .btn-icon {
        border: none;
        background: none;
        font-size: 1.5rem;
        color: #007bff;
        /* Default color */
    }

    .btn-icon.red {
        color: red;
        /* Color when item is in cart or favorites */
    }

    .price {
        font-size: 1rem;
        font-weight: bold;
    }

    .rating .fa-star {
        font-size: 1rem;
        color: #e0e0e0;
    }

    .rating .fa-star.checked {
        color: orange;
    }

    .more {
        cursor: pointer;
        color: #007bff;
    }

    @media (max-width: 1200px) {
        .col-custom {
            flex: 0 0 33.33%;
            max-width: 33.33%;
        }
    }

    @media (max-width: 768px) {
        .col-custom {
            flex: 0 0 50%;
            max-width: 50%;
        }
    }

    @media (max-width: 576px) {
        .col-custom {
            flex: 0 0 100%;
            max-width: 100%;
        }
    }
</style>