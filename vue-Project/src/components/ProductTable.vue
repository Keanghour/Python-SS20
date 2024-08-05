<template>
    <div class="album py-5 bg-light">
        <div class="container">
            <div class="row">
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
    import ProductCard from './ProductCard.vue';
    

    export default {
        components: {
            ProductCard
        },
        props: ['products']
    };
</script>

<style scoped>
    .row {
        display: flex;
        flex-wrap: wrap;
    }
</style>