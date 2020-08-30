<template>
  <b-container>
    <vue-good-table
      :columns="columns"
      :rows="convertDropList(dropList)"
      ref="dropListTable"
      @on-column-filter="onColumnFilter"
    >
      <div slot="table-actions-bottom" class="footer">
        <span class="mx-2">合計ドロップ数： {{ dropCount || '-' }} 個</span>
        <span class="mx-2">合計箱数： {{ count || '-' }} 個</span>
        <span class="mx-2">ドロップ率： {{ dropRate || '-' }} %</span>
      </div>
    </vue-good-table>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, computed } from '@vue/composition-api';
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

import { box } from '@/config/data.ts';
import useUser from '@/composables/user.ts';
import useDrop, { DropList } from '@/databases/drop';
import useAlert from '@/composables/alert';

type DropItem = {
  questName: string;
  boxName: string;
  droppedAt: string;
  count: number;
}

const convertDropList = (dropList: DropList): DropItem[] => {
  return Object.keys(dropList)
    .map((key) => {
      const drop = dropList[key];
      const boxKey = Object.keys(box).filter(k => box[k].type === drop.box_type)[0];
      const droppedAt = new Date(drop.dropped_at);

      return {
        questName: drop.quest_name,
        boxName: box[boxKey].name,
        droppedAt: `${droppedAt.getFullYear()}/${droppedAt.getMonth() + 1}/${droppedAt.getDate()}`,
        count: drop.count,
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
        label: '箱数',
        field: 'count',
        type: 'number',
      },
    ];

    const dropListTable = ref();

    const count = ref<number>();
    const dropCount = ref<number>();
    function onColumnFilter(params: any) {
      const drops: DropItem[] = ((dropListTable.value ?? { filteredRows: [] as any[] }).filteredRows[0] ?? { children: [] as DropItem[] }).children;
      dropCount.value = drops.length;
      count.value = drops.reduce((prev, current) => prev + current.count, 0);
    }
    const dropRate = computed(() => {
      return Math.round((dropCount.value || 0) / (count.value || 0) * 100 * 10000) / 10000;
    });

    const dropList = ref({} as DropList);
    Promise.resolve()
      .then(() => fetchDropList(user.value.uid, dropList))
      .then(() => {
        if (Object.keys(dropList.value).length === 0) {
          setAlert('warning', 'ドロップ履歴がありません');
          return;
        }

        onColumnFilter({ columnFilters: [] });
      })
      .catch(() => setAlert('danger', 'ドロップ履歴の取得に失敗しました'));

    return {
      dropListTable,
      dropList,
      columns,
      dropCount,
      count,
      dropRate,
      convertDropList,
      onColumnFilter,
    };
  },
});
</script>

<style scoped>
.footer {
  padding: .75em .75em .75em .75em;
  color: #606266;
}
</style>
