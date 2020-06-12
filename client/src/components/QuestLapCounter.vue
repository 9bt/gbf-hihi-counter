<template>
  <div>
    <b-row class="my-2">
      <b-col cols="10" size="md" class="my-1">
        <b-img class="box-icon" :src="`./img/box_${box.color}.png`" width="20px"></b-img>
        {{ box.name }}
      </b-col>
      <b-col cols="12">
        <b-input-group size="md">
          <template v-slot:prepend>
            <b-button class="increment-button" variant="primary" @click="decrement">-</b-button>
          </template>
          <b-form-input
            type="number"
            v-model.number="count"
            class="text-center"
            @compositionstart="isUsingIME = true"
            @compositionend="isUsingIME = false"
            @keydown.enter="() => !isUsingIME ? update() : undefined"
          ></b-form-input>
          <template v-slot:append>
            <b-dropdown right size="md">
              <b-dropdown-item
                @click="() => $bvModal.show(countResetModalId)"
              >リセット</b-dropdown-item>
              <b-dropdown-item
                @click="() => $bvModal.show(pushDropConfirmModalId)"
              >ドロップ</b-dropdown-item>
            </b-dropdown>
            <b-button class="decrement-button" variant="primary" @click="increment">+</b-button>
          </template>
        </b-input-group>
      </b-col>
    </b-row>
    <b-modal
      :id="countResetModalId"
      title="リセット"
      @ok="reset"
    >
      <p>周回数をリセットします。</p>
      <p>本当にリセットしても良いですか？</p>
    </b-modal>
    <b-modal
      :id="pushDropConfirmModalId"
      title="ドロップ"
      @ok="drop"
    >
      <p>ドロップ履歴に反映し、周回数をリセットします。</p>
      <p>本当にドロップしましたか？</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';

import { Box, BoxType } from '@/config/data';
import useUser from '@/composables/user';
import useQuest from '@/databases/quest';
import useDrop from '@/databases/drop';
import useAlert from '@/composables/alert';
import useOverlay from '@/composables/overlay';

const useCounter = (questName: string, boxType: BoxType) => {
  const { setAlert } = useAlert();
  const { disableOverlay, enableOverlay } = useOverlay();

  const didFailSync = () => {
    setAlert('danger', '同期に失敗しました。ページを再読込します');
    setTimeout(() => {
      location.reload(true);
    }, 1000 * 3);
  };

  const count = ref(0);

  const { user } = useUser();
  const { fetchQuestCount, setQuestCount, updateQuestCount } = useQuest();
  const { pushDrop } = useDrop();

  Promise.resolve()
    .then(() => enableOverlay())
    .then(() => fetchQuestCount(user.value.uid, questName, boxType, count))
    .then(() => disableOverlay())
    .catch(() => didFailSync());

  const increment = () => {
    if (count.value === 0) {
      Promise.resolve()
        .then(() => enableOverlay())
        .then(() => setQuestCount(user.value.uid, questName, boxType, count.value))
        .then(() => disableOverlay())
        .catch(() => didFailSync());
    }

    Promise.resolve()
      .then(() => {
        count.value++;
      })
      .then(() => enableOverlay())
      .then(() => updateQuestCount(user.value.uid, questName, boxType, count.value))
      .then(() => disableOverlay())
      .catch(() => didFailSync());
  };

  const decrement = () => {
    if (count.value < 1) {
      return;
    }

    Promise.resolve()
      .then(() => enableOverlay())
      .then(() => {
        count.value--;
      })
      .then(() => updateQuestCount(user.value.uid, questName, boxType, count.value))
      .then(() => disableOverlay())
      .catch(() => didFailSync());
  };

  const update = () => {
    Promise.resolve()
      .then(() => enableOverlay())
      .then(() => {
        count.value = count.value || 0;
      })
      .then(() => updateQuestCount(user.value.uid, questName, boxType, count.value))
      .then(() => disableOverlay())
      .catch(() => didFailSync());
  };

  const reset = () => {
    Promise.resolve()
      .then(() => enableOverlay())
      .then(() => updateQuestCount(user.value.uid, questName, boxType, count.value))
      .then(() => disableOverlay())
      .catch(() => didFailSync());
  };

  const drop = () => {
    Promise.resolve()
      .then(() => enableOverlay())
      .then(() => pushDrop(user.value.uid, questName, boxType, count.value))
      .then(() => {
        count.value = 0;
      })
      .then(() => updateQuestCount(user.value.uid, questName, boxType, count.value))
      .then(() => disableOverlay())
      .catch(() => didFailSync());
  };

  return {
    count,
    increment,
    decrement,
    update,
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
    const isUsingIME = ref(false);

    return {
      countResetModalId: `reset_confirm-modal__${props.quest_name}_${props.box.type}`,
      pushDropConfirmModalId: `drop_confirm-modal__${props.quest_name}_${props.box.type}`,
      isUsingIME,
      ...useCounter(props.quest_name, props.box.type),
    };
  },
});
</script>

<style scoped>
.box-icon {
  vertical-align: text-top;
}

.increment-button, .decrement-button {
  min-width: 32px;
}
</style>
