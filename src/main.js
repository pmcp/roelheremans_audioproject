import Vue from 'vue';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import 'tachyons/css/tachyons.min.css';
import App from './App.vue';
import { firestorePlugin } from 'vuefire'

Vue.use(VuePlyr);
Vue.use(firestorePlugin)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
