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
import { defineComponent, SetupContext, ref, onMounted } from '@vue/composition-api';

import useAuth from '@/composables/auth';
import useUser from '@/composables/user';
import useAlert from '@/composables/alert';
import useOverlay from '@/composables/overlay';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { user } = useUser();

    const nickname = ref(user.value.displayName);

    return {
      nickname,
      console,
      ...useAuth(),
      ...useAlert(),
      ...useOverlay(),
    };
  },
});
</script>
