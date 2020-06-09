import { toRefs, reactive, computed } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import useUser from '@/composables/user';

export default function useAuth() {
  const { setUser } = useUser();

  const loginByGoogle = (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      lang: 'ja',
    });

    return firebase.auth().signInWithRedirect(provider)
      .then(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
      });
  }

  const logout = (): Promise<void> => {
    return firebase.auth().signOut()
      .then(() => {
        setUser({} as firebase.User);
      });
  }

  const updateProfile = (name: string): Promise<void> => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return Promise.reject(new Error('not logged in'));
    }

    return user.updateProfile({
      displayName: name,
    })
      .then(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
      });
  }

  return {
    loginByGoogle,
    logout,
    updateProfile,
  };
};
