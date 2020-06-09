import firebase from 'firebase/app';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from '@/router';

import App from '@/App.vue';

const firebaseConfig = {
  apiKey: 'AIzaSyD45QkckcAgeOsbIKwIXhPLSG9DT151XRI',
  authDomain: 'gbf-hihi-counter.firebaseapp.com',
  databaseURL: 'https://gbf-hihi-counter.firebaseio.com',
  projectId: 'gbf-hihi-counter',
  storageBucket: 'gbf-hihi-counter.appspot.com',
  messagingSenderId: '240880825295',
  appId: '1:240880825295:web:0ab9d2561835b27f7558ba',
};

firebase.initializeApp(firebaseConfig);

Vue.use(VueCompositionApi);
Vue.use(BootstrapVue);

window.addEventListener('load', () => {
  new Vue({
    router,
    el: '#app',
    components: {
      App,
    },
    render: (h) => h('app'),
  });
});
