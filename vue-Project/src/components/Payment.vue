<template>
    <div class="container py-8 mt-5 p-5">
        <div class="row g-4">
            <!-- Product Information Section -->
            <div class="col-lg-6">
                <section class="rounded bg-white p-4 shadow-lg">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                    <table class="table">
                        <thead>
                            <tr class="text-gray-700">
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in cartItems" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item.title }}</td>
                                <td>${{ item.price.toFixed(2) }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <dl class="mt-4">
                        <div class="d-flex justify-content-between">
                            <dt class="text-sm text-gray-600">Subtotal</dt>
                            <dd class="text-sm font-medium text-gray-900">${{ subtotal.toFixed(2) }}</dd>
                        </div>
                        <div class="d-flex justify-content-between border-top pt-2">
                            <dt class="d-flex align-items-center text-sm text-gray-600">
                                <span>Shipping estimate</span>
                                <a href="#" class="ms-2 text-gray-400 hover:text-gray-500"></a>
                            </dt>
                            <dd class="text-sm font-medium text-gray-900">${{ shippingFee.toFixed(2) }}</dd>
                        </div>
                        <div class="d-flex justify-content-between border-top pt-2">
                            <dt class="d-flex align-items-center text-sm text-gray-600">
                                <span>Tax estimate</span>
                                <a href="#" class="ms-2 text-gray-400 hover:text-gray-500"></a>
                            </dt>
                            <dd class="text-sm font-medium text-gray-900">${{ tax.toFixed(2) }}</dd>
                        </div>
                        <div class="d-flex justify-content-between border-top pt-2 text-base font-medium text-gray-900">
                            <dt>Order total</dt>
                            <dd>${{ orderTotal.toFixed(2) }}</dd>
                        </div>
                    </dl>
                </section>
            </div>

            <!-- Payment Form Section -->
            <div class="col-lg-6">
                <section class="rounded bg-white p-4 shadow-lg">
                    <h2 class="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-4">
                            <label for="name" class="form-label">Name on Card</label>
                            <input type="text" id="name" v-model="name" class="form-control" required>
                        </div>
                        <div class="mb-4">
                            <label for="cardNumber" class="form-label">Card Number</label>
                            <input type="text" id="cardNumber" v-model="cardNumber" class="form-control" required>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <label for="expiryDate" class="form-label">Expiry Date</label>
                                <input type="text" id="expiryDate" v-model="expiryDate" class="form-control" required>
                            </div>
                            <div class="col-md-6 mb-4">
                                <label for="cvv" class="form-label">CVV</label>
                                <input type="text" id="cvv" v-model="cvv" class="form-control" required>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" @click="goBackToCart">
                                Back to Cart
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="loading">
                                <span v-if="loading">
                                    <i class="fas fa-spinner fa-spin"></i> Processing...
                                </span>
                                <span v-else>
                                    Pay Now
                                </span>
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>

        <!-- Success Popup -->
        <div v-if="showSuccess" class="popup-overlay">
            <div class="popup-content">
                <h3>Your order was successfully placed!</h3>
                <label>Thank you</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cartItems: [],
                name: '',
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                shippingFee: 5.00, // Example shipping fee
                taxRate: 0.07, // Example tax rate (7%)
                showSuccess: false,
                loading: false // Added loading state
            };
        },
        computed: {
            subtotal() {
                return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            },
            tax() {
                return this.subtotal * this.taxRate;
            },
            orderTotal() {
                return this.subtotal + this.shippingFee + this.tax;
            }
        },
        created() {
            this.loadCart();
        },
        methods: {
            loadCart() {
                const cart = localStorage.getItem('cartItems');
                this.cartItems = cart ? JSON.parse(cart) : [];
            },
            handleSubmit() {
                this.loading = true; // Start loading
                setTimeout(() => {
                    this.clearCart();
                    this.showSuccess = true;
                    setTimeout(() => {
                        this.$router.push('/');
                        window.location.href = '/'; // Redirect to home page
                        window.location.reload(); // Force reload to update cart icon
                    }, 800); // Redirect to home page after 1.5 seconds
                    this.loading = false; // Stop loading
                }, 2000); // Simulate payment processing delay
            },
            clearCart() {
                localStorage.removeItem('cartItems');
                this.cartItems = [];
            },
            goBackToCart() {
                this.$router.push('/cart');
            },
            closePopup() {
                this.showSuccess = false;
            }
        }
    }
</script>

<style scoped>

    .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
    }

    .table th,
    .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }

    .table thead th {
        vertical-align: bottom;
    }

    .table tbody+tbody {
        border-top: 2px solid #dee2e6;
    }

    .table .table {
        background-color: #fff;
    }

    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-content {
        background: white;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
    }

    .popup-content h3 {
        margin-bottom: 1rem;
    }

    /* Add some style for the spinner */
    .fas.fa-spinner {
        margin-right: 0.5rem;
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