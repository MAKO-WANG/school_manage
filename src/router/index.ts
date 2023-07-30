import { useUserStore } from '@/stores';
import Home from '@/views/Home.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user'),
    },
    {
      path: '/user-center',
      name: 'userCenter',
      component: () => import('@/views/user-center'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/grades',
      name: 'grades',
      component: () => import('@/views/grades'),
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/groups'),
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import('@/views/subjects'),
    },
    {
      path: '/teachers',
      name: 'teachers',
      component: () => import('@/views/teachers'),
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('@/views/students'),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  if (
    // 检查用户是否已登录
    !userStore.isLogin &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    // 将用户重定向到登录页面
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
