import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Cart from '../components/Cart.vue';
import Payment from '../views/Payment.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/payment', name: 'Payment', component: Payment },
  { path: '/favorites', name: 'Favorites', component: Favorites } 

];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
