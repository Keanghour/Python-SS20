// vue-ProjectCrud/src/main.js
import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import $ from 'jquery';
import 'gasparesganga-jquery-loading-overlay/dist/loadingoverlay.min.js';

Vue.config.productionTip = false

new Vue({
  data: {
    cartCount: 0,
    favoriteCount: 0
  },
  router,
  render: h => h(App),
}).$mount('#app')
