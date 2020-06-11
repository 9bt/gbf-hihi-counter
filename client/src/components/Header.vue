<template>
  <header>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-bind:to="{name: 'home'}">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item v-bind:to="{name: 'history'}">History</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-if="$route.meta.requireLogin">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <b-avatar class="mr-2" variant="info" v-bind:src="user.photoURL || null" size="2em"></b-avatar>
            {{ user.displayName }}
          </template>
          <b-dropdown-item v-bind:to="{name: 'account'}">Account</b-dropdown-item>
          <b-dropdown-item v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import useAuth from '@/composables/auth';
import useUser from '@/composables/user';

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    return {
      ...useUser(),
      ...useAuth(),
    };
  },
});
</script>
