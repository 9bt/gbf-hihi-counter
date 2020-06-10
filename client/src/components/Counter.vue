<template>
  <b-row class="my-1">
    <b-col cols="5">
      <b-img :src="`./img/box_${box.color}.png`" width="20px"></b-img>
      {{ box.name }}
    </b-col>
    <b-col cols="2">
      {{ count }}
    </b-col>
    <b-col cols="5">
      <b-button-group class="mx-1" size="sm">
        <b-button v-on:click="increment">＋</b-button>
        <b-button v-on:click="decrement">−</b-button>
        <b-dropdown right size="sm">
          <b-dropdown-item v-on:click="reset">Reset</b-dropdown-item>
          <b-dropdown-item v-on:click="drop">Drop</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';

import { Box, BoxType } from '@/config/data.ts';
import useUser from '@/composables/user.ts';
import useQuest from '@/composables/quest.ts';
import useDrop from '@/composables/drop.ts';

const useCounter = (questName: string, boxType: BoxType) => {
  const count = ref(0);

  const { user } = useUser();
  const { fetchQuestCount, setQuestCount, updateQuestCount } = useQuest();
  const { pushDrop } = useDrop();

  fetchQuestCount(user.value.uid, questName, boxType, count);

  const increment = () => {
    if (count.value === 0) {
      setQuestCount(user.value.uid, questName, boxType, count.value);
    }

    count.value++;
    updateQuestCount(user.value.uid, questName, boxType, count.value);
  };

  const decrement = () => {
    if (count.value < 1) {
      return;
    }

    count.value--;
    updateQuestCount(user.value.uid, questName, boxType, count.value);
  };

  const reset = () => {
    if (!window.confirm('本当にリセットしますか？')) {
      return;
    }

    count.value = 0;
    updateQuestCount(user.value.uid, questName, boxType, count.value);
  };

  const drop = () => {
    if (!window.confirm('本当にドロップしましたか？')) {
      return;
    }

    pushDrop(user.value.uid, questName, boxType, count.value);

    count.value = 0;
    updateQuestCount(user.value.uid, questName, boxType, count.value);
  };

  return {
    count,
    increment,
    decrement,
    reset,
    drop,
  };
};

type Props = {
  quest_name: string;
  box: Box;
};

export default defineComponent({
  props: {
    quest_name: {
      type: String,
    },
    box: {
      type: Object,
    },
  },
  setup(props: Props, context: SetupContext) {
    return {
      ...useCounter(props.quest_name, props.box.type),
    };
  },
});
</script>
