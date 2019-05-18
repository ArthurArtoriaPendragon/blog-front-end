import Home from './home.vue';

export default {
  path: '/',
  component: Home,
  children: [
    {
      path: '/',
      name: 'homeList',
      component: () => import('./blog_list.vue')
    },
    {
      path: 'detail/:id',
      name: 'detail',
      component: () => import('./blog_detail.vue')
    }
  ]
};
