import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import Account from '@/views/Account.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
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
      path: '/auth',
      name: 'auth',
      component: Auth,
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
      next({ name: 'auth' });
      return;
    }

    if (to.meta && to.name === 'auth' && user) {
      next({ name: 'home' });
      return;
    }

    next();
  });
});

export default router;
