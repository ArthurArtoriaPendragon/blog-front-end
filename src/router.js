import Vue from 'vue';
import Router from 'vue-router';
import home from './views/home/router';
import setting from './views/setting/route';
import login from './views/login/route';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [home, setting, login]
});
