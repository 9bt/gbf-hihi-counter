<template>
  <b-container>
    <draggable
      tag="b-row"
      handle=".card-handler"
      v-model="questList"
    >
      <b-col md="4" v-for="(quest, questIndex) in questList" :key="quest.name" class="quest">
        <QuestCard :quest="quest"></QuestCard>
      </b-col>
    </draggable>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from 'vue';
import draggable from 'vuedraggable';

import QuestCard from '@/components/QuestCard.vue';
import { quests } from '@/config/data';

const CARD_ORDER_LOCAL_STORAGE_KEY = 'hihi-counter-card-order';

export default defineComponent({
  components: {
    draggable,
    QuestCard,
  },
  setup(props: {}, context: SetupContext) {
    const isGottenLocalStorageItem = ref(false);
    const questList = ref(quests);

    watch(questList, () => {
      if (!isGottenLocalStorageItem.value) {
        const order = localStorage.getItem(CARD_ORDER_LOCAL_STORAGE_KEY);
        if (!order) {
          isGottenLocalStorageItem.value = true;
          return;
        }

        const names = JSON.parse(order);
        questList.value = questList.value.sort((a, b) => {
          return names.indexOf(a.name) - names.indexOf(b.name);
        });

        isGottenLocalStorageItem.value = true;
        return;
      }

      localStorage.setItem(CARD_ORDER_LOCAL_STORAGE_KEY, JSON.stringify(questList.value.map(v => v.name)));
    });

    return {
      questList,
    };
  },
});
</script>
