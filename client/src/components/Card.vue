<template>
  <b-card
    :header="quest.name"
    style="max-width: 30rem;"
    class="mb-2"
  >
    <Counter
      v-for="(box, boxIndex) in quest.boxes"
      :quest_name="quest.name"
      :box="box"
      :key="boxIndex"
    ></Counter>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';

import Counter from '@/components/Counter.vue';
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
    Counter,
  },
  setup(props: Props, context: SetupContext) {},
});
</script>
