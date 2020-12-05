import * as firebase from 'firebase/app';
import 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import History from '@/views/History.vue';
import Login from '@/views/Login.vue';
import Account from '@/views/Account.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        requireLogin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requireLogin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (to.meta && to.meta.requireLogin && !user) {
      next({ name: 'login' });
      return;
    }

    if (to.meta && to.name === 'login' && user) {
      next({ name: 'home' });
      return;
    }

    next();
  });
});

export default router;
