import { reactive, computed } from '@vue/composition-api';

type Alert = {
  message: string,
  variant: string,
};

let initialized = false;
let state = {
  alerts: {} as { [key: string]: Alert },
};

export default function useAlert() {
  if (!initialized) {
    state = reactive(state);
    initialized = true;
  }

  const setAlert = (variant: string, message: string) => {
    const alertId = window.setTimeout(() => {
      clearAlert(alertId);
    }, 1000 * 10);
    state.alerts = Object.assign({}, state.alerts, {
      [alertId]: { variant, message },
    });
  };

  const clearAlert = (alertId: number) => {
    state.alerts[alertId] = {} as Alert;
  };

  const clearAllAlerts = () => {
    state.alerts = {} as { [key: string]: Alert };
  };

  const alerts = computed(() => state.alerts);

  return {
    alerts,
    setAlert,
    clearAllAlerts,
  };
};
