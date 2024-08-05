<template>
    <div>
        <h1>Welcome to the SS20 Store</h1>
        <!-- <div v-if="loading">Loading products...</div> -->
        <div v-if="error" class="error">Error fetching products: {{ error }}</div>
        <ProductTable v-if="!loading && !error" :products="products" />
    </div>
</template>

<script>
    import axios from 'axios';
    import ProductTable from '../components/ProductTable.vue';
    import $ from 'jquery';

    export default {
        name: 'App',
        components: {
            ProductTable
        },
        data() {
            return {
                products: [],
                loading: false,
                error: null
            };
        },
        created() {
            this.fetchProducts();
        },
        methods: {
            async fetchProducts() {
                // this.loading = true;
                this.error = null;

                try {
                    $.LoadingOverlay("show"); // Show loading overlay
                    const response = await axios.get('https://fakestoreapi.com/products');
                    this.products = response.data;
                } catch (error) {
                    this.error = 'Failed to load products.';
                    console.error('Error fetching products:', error);
                } finally {
                    this.loading = false;
                    setTimeout(() => {
                        $.LoadingOverlay("hide"); // Hide loading overlay
                    }, 1000); // Hide after 3 seconds
                }
            }
        }
    };
</script>

<style scoped>

    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }

    .error {
        color: red;
        text-align: center;
    }

    div {
        padding: 1rem;
    }

</style>