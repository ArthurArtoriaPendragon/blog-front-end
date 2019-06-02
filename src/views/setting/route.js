export default {
  path: '/setting',
  name: 'setting',
  component: () => import('./setting.vue'),
  redirect: '/setting/create',
  beforeEnter: (to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token) {
      location.href = `${location.origin}/login?reject_url=${to.path}`;
    } else {
      next();
    }
  },
  children: [
    {
      path: 'create',
      name: 'create',
      component: () => import('./blog_create.vue')
    },
    {
      path: 'list',
      name: 'list',
      component: () => import('./blog_list.vue')
    },
    {
      path: 'update/:id',
      name: 'update',
      component: () => import('./blog_update.vue')
    }
  ]
};
