<template>
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
                </dt>
                <dd class="text-sm font-medium text-gray-900">${{ shippingFee.toFixed(2) }}</dd>
            </div>
            <div class="d-flex justify-content-between border-top pt-2">
                <dt class="d-flex align-items-center text-sm text-gray-600">
                    <span>Tax estimate</span>
                </dt>
                <dd class="text-sm font-medium text-gray-900">${{ tax.toFixed(2) }}</dd>
            </div>
            <div class="d-flex justify-content-between border-top pt-2 text-base font-medium text-gray-900">
                <dt>Order total</dt>
                <dd>${{ orderTotal.toFixed(2) }}</dd>
            </div>
        </dl>
    </section>
</template>

<script>
    export default {
        props: {
            cartItems: {
                type: Array,
                required: true
            },
            shippingFee: {
                type: Number,
                required: true
            },
            taxRate: {
                type: Number,
                required: true
            }
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

    .d-flex {
        display: flex;
    }

    .justify-content-between {
        justify-content: space-between;
    }

    .border-top {
        border-top: 1px solid #dee2e6;
    }

    .pt-2 {
        padding-top: 0.5rem;
    }

    .mt-4 {
        margin-top: 1rem;
    }

    .text-base {
        font-size: 1rem;
    }

    .text-sm {
        font-size: 0.875rem;
    }

    .text-gray-600 {
        color: #6b7280;
    }

    .text-gray-700 {
        color: #4b5563;
    }

    .text-gray-900 {
        color: #111827;
    }

    .font-medium {
        font-weight: 500;
    }

    .font-base {
        font-weight: 400;
    }
</style>