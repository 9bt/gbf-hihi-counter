<template>
  <b-container fluid>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="auto">
        <b-button block variant="primary" @click="loginByGoogle">Google アカウントでログインする</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import useAuth from '@/composables/auth';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    return {
      ...useAuth(),
    };
  },
});
</script>
