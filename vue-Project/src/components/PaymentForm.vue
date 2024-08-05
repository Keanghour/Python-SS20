<template>
    <section class="rounded bg-white p-4 shadow-lg">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
        <form @submit.prevent="submitPayment">
            <!-- Name on Card -->
            <div class="mb-4">
                <label for="name" class="form-label">Name on Card</label>
                <input type="text" id="name" v-model="name" class="form-control" required>
            </div>

            <!-- Card Number -->
            <div class="mb-4">
                <label for="cardNumber" class="form-label">Card Number</label>
                <input type="text" id="cardNumber" v-model="cardNumber" class="form-control" required>
            </div>

            <!-- Expiry Date and CVV -->
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

            <!-- Contact Information -->
            <div class="mb-4">
                <label for="contact" class="form-label">Contact Number</label>
                <input type="text" id="contact" v-model="contact" class="form-control" required>
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="email" class="form-control" required>
            </div>

            <!-- Address -->
            <div class="mb-4">
                <label for="address" class="form-label">Address</label>
                <input type="text" id="address" v-model="address" class="form-control" required>
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
</template>

<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                name: '',
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                contact: '', // New field for contact number
                email: '', // New field for email
                address: '' // New field for address
            };
        },
        methods: {
            submitPayment() {
                const paymentInfo = {
                    name: this.name,
                    cardNumber: this.cardNumber,
                    expiryDate: this.expiryDate,
                    cvv: this.cvv,
                    contact: this.contact, // Include contact in payment info
                    email: this.email, // Include email in payment info
                    address: this.address // Include address in payment info
                };
                this.$emit('submitPayment', paymentInfo);
            },
            goBackToCart() {
                this.$emit('goBackToCart');
            }
        }
    };
</script>

<style scoped>

</style>