import { reactive, computed, InjectionKey } from 'vue';

export default function useOverlay() {
  const state = reactive({
    disabledOverlay: true,
  });

  const disableOverlay = () => {
    state.disabledOverlay = true;
  };

  const enableOverlay = () => {
    state.disabledOverlay = false;
  };

  const disabledOverlay = computed(() => state.disabledOverlay);

  return {
    disableOverlay,
    enableOverlay,
    disabledOverlay,
  };
}

export type OverlayStore = ReturnType<typeof useOverlay>;
export const OverlayKey: InjectionKey<OverlayStore> = Symbol('OverlayStore');
