<template>
  <div id="app">
    <Header></Header>
    <template v-for="(value, key) in alerts">
      <b-alert
        show
        v-if="value.variant && value.message"
        :class="['alert', `alert-${value.variant}`]"
        :key="key"
        role="alert"
        class="my-1"
      >
        {{ value.message }}
      </b-alert>
    </template>
    <b-overlay :show="!disabledOverlay" rounded="sm">
      <router-view class="mt-2"></router-view>
    </b-overlay>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { defineComponent, SetupContext, onMounted, provide, inject } from '@vue/composition-api';

import Header from '@/components/Header.vue';
import useAlert, { AlertKey, AlertStore } from '@/composables/alert';
import useUser, { UserKey, UserStore } from '@/composables/user';
import useOverlay, { OverlayKey, OverlayStore } from '@/composables/overlay';

export default defineComponent({
  components: {
    Header,
  },
  setup(props: {}, context: SetupContext) {
    provide(AlertKey, useAlert());
    provide(UserKey, useUser());
    provide(OverlayKey, useOverlay());

    const { setUser } = inject(UserKey) as UserStore;
    const { disabledOverlay } = inject(OverlayKey) as OverlayStore;
    const { clearAllAlerts, alerts } = inject(AlertKey) as AlertStore;

    context.root.$router.afterEach(() => {
      clearAllAlerts();
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return {
      disabledOverlay,
      alerts,
    };
  },
});
</script>

<style scoped>
.disalbe-click {
  pointer-events: none;
}
</style>
