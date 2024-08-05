<template>
    <div class="container mt-4">
        <h2 class="mb-4">Your Cart</h2>
        <div v-if="cartItems.length === 0" class="text-center">
            <p>Your cart is empty</p>
        </div>
        <div v-else>
            <div class="card">
                <div class="card-body">
                    <ul class="list-unstyled">
                        <li v-for="item in cartItems" :key="item.id" class="cart-item d-flex align-items-center mb-3">
                            <img :src="item.image" alt="Product Image" class="cart-item-image">
                            <div class="cart-item-details flex-grow-1">
                                <h5 class="cart-item-title">{{ item.title }}</h5>
                                <p class="cart-item-description">{{ item.description }}</p>
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="quantity">
                                        <button @click="decrementQuantity(item)"
                                            class="btn btn-outline-secondary btn-sm">-</button>
                                        <span class="mx-2">{{ item.quantity }}</span>
                                        <button @click="incrementQuantity(item)"
                                            class="btn btn-outline-secondary btn-sm">+</button>
                                    </div>
                                    <p class="cart-item-price ml-4">${{ (item.price * item.quantity).toFixed(2) }}</p>
                                    <button @click="removeFromCart(item.id)"
                                        class="btn btn-danger btn-sm">Remove</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-4 text-right">
                <h4>Total: ${{ total }}</h4>
                <button @click="proceedToPayment" class="btn btn-primary">Proceed to Payment</button>
            </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import 'gasparesganga-jquery-loading-overlay/dist/loadingoverlay.min.js'; // Import LoadingOverlay JS

    export default {
        data() {
            return {
                cartItems: [],
                isLoading: false // Add loading state
            };
        },
        computed: {
            total() {
                return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
            }
        },
        created() {
            this.isLoading = true;
            $.LoadingOverlay("show");

            this.loadCart();

            // Simulate a delay to show the loading overlay
            setTimeout(() => {
                $.LoadingOverlay("hide");
                this.isLoading = false;
            }, 800); // Adjust this duration as needed

            this.$root.$on('update-cart', this.loadCart);
        },
        methods: {
            loadCart() {
                const cart = localStorage.getItem('cartItems');
                this.cartItems = cart ? JSON.parse(cart) : [];
            },
            saveCart() {
                localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
            },
            removeFromCart(id) {
                this.cartItems = this.cartItems.filter(item => item.id !== id);
                this.saveCart();
                this.$root.$emit('update-cart', this.cartItems.length);
            },
            incrementQuantity(item) {
                item.quantity++;
                this.saveCart();
                this.$root.$emit('update-cart', this.cartItems.length);
            },
            decrementQuantity(item) {
                if (item.quantity > 1) {
                    item.quantity--;
                    this.saveCart();
                    this.$root.$emit('update-cart', this.cartItems.length);
                }
            },
            proceedToPayment() {
                this.isLoading = true;
                $.LoadingOverlay("show");

                // Simulate loading time before navigating
                setTimeout(() => {
                    $.LoadingOverlay("hide");
                    this.isLoading = false;
                    this.$router.push('/payment'); // Navigate programmatically
                }, 800); // Adjust this duration as needed
            }
        },
        beforeDestroy() {
            this.$root.$off('update-cart', this.loadCart);
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .card-body {
        padding: 1.5rem;
    }

    .cart-item {
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1rem;
        background-color: #ffffff;
    }

    .cart-item-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
        margin-right: 20px;
    }

    .cart-item-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    .cart-item-description {
        font-size: 0.875rem;
        color: #6c757d;
        margin-bottom: 0.5rem;
    }

    .cart-item-price {
        font-size: 1rem;
        font-weight: 600;
    }

    .quantity {
        display: flex;
        align-items: center;
    }

    .quantity button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    .btn-danger {
        border-radius: 8px;
    }

    @media (max-width: 768px) {
        .cart-item-image {
            width: 80px;
            height: 80px;
        }
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
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>