<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="12">
        <b-img class="logo" src="./img/icon.svg" center />
      </b-col>
    </b-row>

    <b-row class="justify-content-md-center">
      <b-col cols="12" md="auto">
        <template v-if="!isNotRecommendedUserAgent">
          <b-button block variant="primary" @click="login">Google アカウントでログインする</b-button>
        </template>
        <template v-else>
          <p>Google Chrome または Apple Safari を利用してください</p>
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api';

import useAuth from '@/composables/auth';
import useUserAgent from '@/composables/user-agent';
import useOverlay from '@/composables/overlay';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { loginByGoogle } = useAuth();
    const { disableOverlay, enableOverlay } = useOverlay();

    const login = () => {
      Promise.resolve()
        .then(() => enableOverlay())
        .then(() => loginByGoogle())
        .then(() => disableOverlay());
    };

    return {
      login,
      ...useUserAgent(),
    };
  },
});
</script>

<style scoped>
.logo {
  max-width: 400px;
}
</style>
