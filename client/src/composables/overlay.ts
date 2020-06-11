import { reactive, computed } from '@vue/composition-api';

let initialized = false;
let state = {
  disabledOverlay: true,
};

export default function useOverlay() {
  if (!initialized) {
    state = reactive(state);
    initialized = true;
  }

  const disableOverlay = () => {
    state.disabledOverlay = true;
  }

  const enableOverlay = () => {
    state.disabledOverlay = false;
  }

  const disabledOverlay = computed(() => state.disabledOverlay);

  return {
    disableOverlay,
    enableOverlay,
    disabledOverlay,
  };
}
