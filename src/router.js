import Vue from 'vue';
import Router from 'vue-router';
import home from './views/home/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    home,
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/setting/setting.vue'),
      redirect: '/setting/create',
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (!token) {
          location.href = 'http://localhost:8080';
        } else {
          next();
        }
      },
      children: [
        {
          path: 'create',
          name: 'create',
          component: () => import('./views/setting/blog_create.vue')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('./views/setting/blog_list.vue')
        },
        {
          path: 'update/:id',
          name: 'update',
          component: () => import('./views/setting/blog_update.vue')
        }
      ]
    }
  ]
});
