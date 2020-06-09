<template>
  <div id="app">
    <Header></Header>
    <router-view class="mt-2"></router-view>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api';

import Header from '@/components/Header.vue';

import useUser from '@/composables/user';

export default defineComponent({
  components: {
    Header,
  },
  setup(props: {}, context: SetupContext) {
    const { setUser } = useUser();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  },
});
</script>
