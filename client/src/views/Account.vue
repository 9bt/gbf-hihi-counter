<template>
  <b-container>
    <h2>アカウント設定</h2>
    <dl>
      <dt>ニックネーム</dt>
      <dd><input placeholder="ニックネーム" v-model="nickname" required></dd>
    </dl>
    <b-button v-on:click.stop.prevent="updateProfile(nickname)">プロフィールを変更する</b-button>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, onMounted } from '@vue/composition-api';

import useAuth from '@/composables/auth';
import useUser from '@/composables/user';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { user } = useUser();

    const nickname = ref(user.value.displayName);

    return {
      nickname,
      ...useAuth(),
    };
  },
});
</script>
