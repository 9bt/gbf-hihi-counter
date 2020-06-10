<template>
  <b-container>
    <b-table :items="convertDropList(dropList)"></b-table>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';

import useUser from '@/composables/user.ts';
import useDrop, { DropList } from '@/composables/drop';
import { box } from '@/config/data.ts';

const convertDropList = (dropList: DropList): any[] => {
  return Object.keys(dropList)
    .map((key) => {
      const drop = dropList[key];
      const boxKey = Object.keys(box).filter(k => box[k].type === drop.box_type)[0];
      const droppedAt = new Date(drop.dropped_at);

      return {
        クエスト: drop.quest_name,
        箱: box[boxKey].name,
        日付: `${droppedAt.getFullYear()}/${droppedAt.getMonth() + 1}/${droppedAt.getDate()}`,
        周回数: drop.count,
      };
    });
};

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const { user } = useUser();
    const { fetchDropList } = useDrop();

    const dropList = ref({} as DropList);
    fetchDropList(user.value.uid, dropList);

    return {
      dropList,
      convertDropList,
    };
  },
});
</script>
