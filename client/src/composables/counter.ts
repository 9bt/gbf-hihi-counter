import { ref, onMounted, inject } from 'vue';

import { BoxType } from '@/config/data';
import useQuest from '@/databases/quest';
import useDrop from '@/databases/drop';
import { AlertKey, AlertStore } from '@/composables/alert';
import { OverlayKey, OverlayStore }from '@/composables/overlay';
import { UserKey, UserStore } from '@/composables/user';

export default function useCounter(questName: string, boxType: BoxType) {
  const { setAlert } = inject(AlertKey) as AlertStore;
  const { disableOverlay, enableOverlay } = inject(OverlayKey) as OverlayStore;
  const { user } = inject(UserKey) as UserStore;

  const didFailSync = (): void => {
    setAlert('danger', '同期に失敗しました。ページを再読込します');
    setTimeout(() => {
      location.reload(true);
    }, 1000 * 3);
  };

  const count = ref(0);

  const { fetchQuestCount, setQuestCount, updateQuestCount } = useQuest();
  const { pushDrop } = useDrop();

  onMounted(async () => {
    enableOverlay();
    await fetchQuestCount(user.value.uid, questName, boxType, count).catch(() => didFailSync());

    disableOverlay();
  });

  const increment = async (): Promise<void> => {
    if (count.value === 0) {
      enableOverlay();
      await setQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

      disableOverlay();
      return;
    }

    count.value++;

    enableOverlay();
    await updateQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    disableOverlay();
  };

  const decrement = async (): Promise<void> => {
    if (count.value < 1) {
      return;
    }

    count.value--;

    enableOverlay();
    await updateQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    disableOverlay();
  };

  const update = async (): Promise<void> => {
    count.value = count.value || 0;

    enableOverlay();
    await updateQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    disableOverlay();
  };

  const reset = async (): Promise<void> => {
    enableOverlay();
    await updateQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    disableOverlay();
  };

  const drop = async (): Promise<void> => {
    enableOverlay();
    await pushDrop(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    count.value = 0;
    await updateQuestCount(user.value.uid, questName, boxType, count.value).catch(() => didFailSync());

    disableOverlay();
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
