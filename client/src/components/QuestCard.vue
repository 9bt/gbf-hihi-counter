<template>
  <b-card
    :header="quest.name"
    style="max-width: 30rem;"
    class="mb-2"
  >
    <template v-slot:header>
      <h6 class="card-handler mb-0">{{ quest.name }}</h6>
    </template>
    <QuestLapCounter
      v-for="(box, boxIndex) in quest.boxes"
      :quest_name="quest.name"
      :box="box"
      :key="boxIndex"
    ></QuestLapCounter>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';

import QuestLapCounter from '@/components/QuestLapCounter.vue';
import useUser from '@/composables/user.ts';
import { Quest } from '@/config/data.ts';

type Props = {
  quest: Quest;
};

export default defineComponent({
  props: {
    quest: {
      type: Object,
    },
  },
  components: {
    QuestLapCounter,
  },
  setup(props: Props, context: SetupContext) {},
});
</script>
