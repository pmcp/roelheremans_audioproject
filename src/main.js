import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import { store } from './store.js';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import 'tachyons/css/tachyons.min.css';
import App from './App.vue';
import { firestorePlugin } from 'vuefire';

Vue.use(Vuex)
Vue.use(VuePlyr);
Vue.use(firestorePlugin)
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
