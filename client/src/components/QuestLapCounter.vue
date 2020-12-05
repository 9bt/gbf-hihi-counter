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
import { defineComponent, SetupContext, ref } from 'vue';

import { Box, BoxType } from '@/config/data';
import useCounter from '@/composables/counter';

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
  setup(props: any, context: SetupContext) {
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
