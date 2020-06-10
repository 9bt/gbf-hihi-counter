<template>
  <b-container>
    <draggable tag="b-row">
      <b-col md="4" v-for="(quest, questIndex) in quests" :key="questIndex">
        <Card :quest="quest"></Card>
      </b-col>
    </draggable>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import draggable from 'vuedraggable';

import Card from '@/components/card.vue';
import { quests } from '@/config/data';

export default defineComponent({
  components: {
    draggable,
    Card,
  },
  setup(props: {}, context: SetupContext) {
    return {
      quests,
    };
  },
});
</script>
