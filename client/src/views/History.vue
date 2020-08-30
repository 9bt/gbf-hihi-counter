<template>
  <b-container>
    <vue-good-table :columns="columns" :rows="convertDropList(dropList)" />
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref } from '@vue/composition-api';
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

import { box } from '@/config/data.ts';
import useUser from '@/composables/user.ts';
import useDrop, { DropList } from '@/databases/drop';
import useAlert from '@/composables/alert';

const convertDropList = (dropList: DropList): any[] => {
  return Object.keys(dropList)
    .map((key) => {
      const drop = dropList[key];
      const boxKey = Object.keys(box).filter(k => box[k].type === drop.box_type)[0];
      const droppedAt = new Date(drop.dropped_at);

      return {
        questName: drop.quest_name,
        boxName: box[boxKey].name,
        droppedAt: `${droppedAt.getFullYear()}/${droppedAt.getMonth() + 1}/${droppedAt.getDate()}`,
        dropCount: drop.count,
      };
    });
};

export default defineComponent({
  components: {
    'vue-good-table': VueGoodTable,
  },
  setup(props: {}, context: SetupContext) {
    const { user } = useUser();
    const { setAlert } = useAlert();
    const { fetchDropList } = useDrop();

    const columns = [
      {
        label: 'クエスト',
        field: 'questName',
        filterOptions: {
          placeholder: 'クエストを絞り込む',
          enabled: true,
        },
      },
      {
        label: '箱',
        field: 'boxName',
      },
      {
        label: '日付',
        field: 'droppedAt',
        type: 'date',
        dateInputFormat: 'yyyy/M/d',
        dateOutputFormat: 'yyyy-MM-dd',
      },
      {
        label: '周回数',
        field: 'dropCount',
        type: 'number',
      },
    ];

    const dropList = ref({} as DropList);
    Promise.resolve()
      .then(() => fetchDropList(user.value.uid, dropList))
      .then(() => {
        if (Object.keys(dropList.value).length === 0) {
          setAlert('warning', 'ドロップ履歴がありません');
        }
      })
      .catch(() => setAlert('danger', 'ドロップ履歴の取得に失敗しました'));

    return {
      dropList,
      columns,
      convertDropList,
    };
  },
});
</script>
