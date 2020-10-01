<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item :to="{name: 'history'}">History</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="$route.meta.requireLogin">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <b-avatar class="mr-2" variant="info" :src="user.photoURL || null" size="2em"></b-avatar>
            {{ user.displayName }}
          </template>
          <b-dropdown-item :to="{name: 'account'}">Account</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { defineComponent, SetupContext, inject } from '@vue/composition-api';

import useAuth from '@/composables/auth';
import { UserKey, UserStore } from '@/composables/user';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { user } = inject(UserKey) as UserStore;

    return {
      user,
      ...useAuth(),
    };
  },
});
</script>
