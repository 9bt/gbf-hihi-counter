import { reactive, computed, InjectionKey } from 'vue';

interface Alert {
  message: string;
  variant: string;
}

export default function useAlert() {
  const state = reactive({
    alerts: {} as { [key: string]: Alert },
  });

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

export type AlertStore = ReturnType<typeof useAlert>;
export const AlertKey: InjectionKey<AlertStore> = Symbol('AlertStore');
