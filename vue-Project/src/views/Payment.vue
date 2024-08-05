<template>
    <div class="container py-8 mt-5 p-5">
        <div class="row g-4">
            <!-- Product Information Section -->
            <div class="col-lg-6">
                <PaymentSummary :cart-items="cartItems" :shipping-fee="shippingFee" :tax-rate="taxRate" />
            </div>

            <!-- Payment Form Section -->
            <div class="col-lg-6">
                <PaymentForm @submitPayment="handleSubmit" @goBackToCart="goBackToCart" :loading="loading" />
            </div>
        </div>

        <!-- Loading overlay -->
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>

        <!-- Success Popup -->
        <div v-if="showSuccess" class="popup-overlay">
            <div class="popup-content">
                <div class="checkmark-wrapper">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
                    </svg>
                </div>
                <h3>Your order was successfully placed!</h3>
                <label>Thank you</label>
            </div>
        </div>
    </div>
</template>

<script>
    import PaymentSummary from '../components/PaymentSummary.vue';
    import PaymentForm from '../components/PaymentForm.vue';
    import axios from 'axios';

    export default {
        components: {
            PaymentSummary,
            PaymentForm
        },
        data() {
            return {
                cartItems: [],
                shippingFee: 5.00, // shipping fee
                taxRate: 0.1, // rate (10%)
                showSuccess: false,
                loading: false // loading state
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
            async handleSubmit(paymentInfo) {
                this.loading = true; // Start loading

                // Simulate a delay for the loading effect
                setTimeout(async () => {
                    // Show success popup
                    this.showSuccess = true;
                    this.loading = false; // Stop loading

                    // Send message to Telegram bot
                    await this.sendTelegramMessage(paymentInfo);

                    // Clear cart and redirect after a delay
                    setTimeout(() => {
                        this.clearCart();
                        this.$router.push('/');
                        window.location.href = '/'; // Redirect to home page
                        window.location.reload(); // Force reload to update cart icon
                    }, 3000); // Redirect to home page after 3 seconds
                }, 1000); // Simulated delay
            },
            async sendTelegramMessage(paymentInfo) {
                const message = `🛎 *New Order Confirmation* 🛎\n\n` +
                    `👤 *Name*: ${paymentInfo.name}\n` +
                    `📞 *Phone*: ${paymentInfo.contact}\n` +
                    `📧 *Email*: ${paymentInfo.email}\n` +
                    `🏠 *Address*: ${paymentInfo.address}\n\n` +
                    `--------------------------------------\n` +
                    `📅 *Booking Date*: ${new Date().toLocaleDateString()}\n` +
                    `--------------------------------------\n\n` +
                    `📦 *Items*:\n\n` +
                    this.cartItems.map(item => `${item.title} (Quantity: ${item.quantity}, Price: $${item.price})`)
                    .join('\n') + `\n\n` +
                    `💵 *Total Price*: $${this.orderTotal.toFixed(2)}\n\n` +
                    `🎉 Thank you for your support! 🎉`;

                const TELEGRAM_BOT_TOKEN = '6778669570:AAEgiXf2zmkd51BqR7q0ZBfaCIroB6uKXaY';
                const TELEGRAM_CHAT_ID = '942441972';

                const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

                await axios.post(url, {
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                });
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
    };
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

    /* Styles for the popup overlay */
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
        z-index: 9999;
    }

    .popup-content {
        background: white;
        width: 500px;
        height: 500px;
        border-radius: 10px;
        text-align: center;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }

    .checkmark-wrapper {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
    }

    .checkmark {
        width: 100%;
        height: 100%;
    }

    .checkmark-circle {
        stroke: #4CAF50;
        stroke-width: 2;
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-linecap: round;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
    }

    .checkmark-check {
        transform-origin: 50% 50%;
        stroke: #4CAF50;
        stroke-width: 2;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
    }

    .popup-content h3 {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .popup-content label {
        font-size: 18px;
    }

    /* Styles for the loading overlay */
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

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }
</style>