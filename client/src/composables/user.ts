import { reactive, computed } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/auth';

let initialized = false;
let state = {
  user: {} as firebase.User,
};

export default function useUser() {
  if (!initialized) {
    state = reactive(state);
    initialized = true;
  }

  const setUser = (user: firebase.User | null) => {
    state.user = user ?? {} as firebase.User;
  };

  const getUser = () => {
    return state.user;
  };

  const user = computed(() => state.user);

  return {
    user,
    getUser,
    setUser,
  };
};
