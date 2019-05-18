import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mavonEditor from 'mavon-editor';
import '@/assets/css/reset.css';
import 'typeface-roboto';
import 'mavon-editor/dist/css/index.css';
import '@/assets/scss/reset_editor.scss';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
// import theme from './plugins/theme';
import message from './components/$message/main';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;
Vue.use(Vuetify, { iconfont: 'mdi' });
Vue.use(mavonEditor);
Vue.prototype.$http = axios;
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
