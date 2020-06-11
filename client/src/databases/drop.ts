import { Ref } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { BoxType } from '@/config/data.ts';

export type Drop = {
  quest_name: string;
  box_type: BoxType;
  dropped_at: number;
  count: number;
};

export type DropList = {
  [key: string]: Drop;
};

export default function useDrop() {
  const db = firebase.database();

  const fetchDropList = (
    uid: string,
    reference: Ref<DropList>
  ): Promise<void> => {
    return new Promise((resolve) => {
      db.ref(`drops/${uid}`).once('value')
        .then((snapshot) => {
          reference.value = snapshot.val() || {} as DropList;
          resolve();
        });
    });
  };

  const pushDrop = (
    uid: string,
    questName: string,
    boxType: BoxType,
    count: number
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.ref(`drops/${uid}`).push({
        quest_name: questName,
        box_type: boxType,
        dropped_at: new Date().getTime(),
        count: count,
      }, (err) => {
        if (err) {
          reject();
          return;
        }

        resolve();
      });
    });
  };

  return {
    fetchDropList,
    pushDrop,
  };
}
