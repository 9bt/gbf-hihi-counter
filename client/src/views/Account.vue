<template>
  <b-container>
    <h2>アカウント設定</h2>
    <dl>
      <dt>ニックネーム</dt>
      <dd><input placeholder="ニックネーム" v-model="nickname" required></dd>
    </dl>
    <b-button @click.stop.prevent="
      () => {
        updateProfile(nickname)
          .then(() => enableOverlay())
          .then(() => setAlert('success', 'プロフィールの変更に成功しました'))
          .catch(() => setAlert('danger', 'プロフィールの変更に失敗しました'))
          .finally(() => disableOverlay());
      }"
    >プロフィールを変更する</b-button>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, inject } from 'vue';

import useAuth from '@/composables/auth';
import { AlertKey, AlertStore } from '@/composables/alert';
import { OverlayKey, OverlayStore } from '@/composables/overlay';
import { UserKey, UserStore } from '@/composables/user';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { user } = inject(UserKey) as UserStore;
    const { enableOverlay, disableOverlay } = inject(OverlayKey) as OverlayStore;
    const { setAlert } = inject(AlertKey) as AlertStore;

    const nickname = ref(user.value.displayName);

    return {
      nickname,
      ...useAuth(),
      enableOverlay,
      disableOverlay,
      setAlert,
    };
  },
});
</script>
