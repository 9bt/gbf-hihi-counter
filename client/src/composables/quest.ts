import { Ref } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { BoxType } from '@/config/data.ts';

export default function useQuest() {
  const db = firebase.database();

  const fetchQuestCount = (
    uid: string,
    questName: string,
    boxType: BoxType,
    reference: Ref<number>
  ) => {
    return new Promise((resolve) => {
      db.ref(`quests/${uid}/${questName}/${boxType}`).once('value')
        .then((snapshot) => {
          reference.value = snapshot.val()?.count ?? 0;
          resolve();
        });
    });
  }

  const setQuestCount = (
    uid: string,
    questName: string,
    boxType: BoxType,
    count: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.ref(`quests/${uid}/${questName}/${boxType}`).set({ count }, (err) => {
        if (err) {
          reject();
        }

        resolve();
      });
    });
  };

  const updateQuestCount = (
    uid: string,
    questName: string,
    boxType: BoxType,
    count: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.ref(`quests/${uid}/${questName}/${boxType}`).update({ count }, (err) => {
        if (err) {
          reject();
        }

        resolve();
      });
    });
  };

  return {
    fetchQuestCount,
    setQuestCount,
    updateQuestCount,
  };
}
