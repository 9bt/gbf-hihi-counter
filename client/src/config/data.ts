export enum BoxColor {
  RED = 'red',
  GOLD = 'gold',
  BLUE = 'blue',
}

export enum BoxType {
  HOST_RED = 'host_red',
  RANK_RED = 'rank_red',
  GOLD = 'gold',
  BLUE = 'blue',
}

export interface Box {
  name: string,
  color: BoxColor,
  type: BoxType,
};

export const box: { [key: string]: Box } = {
  HOST_RED: {
    name: '自発赤箱',
    color: BoxColor.RED,
    type: BoxType.HOST_RED,
  },
  RANK_RED: {
    name: '順位赤箱',
    color: BoxColor.RED,
    type: BoxType.RANK_RED,
  },
  GOLD: {
    name: '金箱',
    color: BoxColor.GOLD,
    type: BoxType.GOLD,
  },
  BLUE: {
    name: '青箱',
    color: BoxColor.BLUE,
    type: BoxType.BLUE,
  },
};

export interface Quest {
  name: string,
  boxes: Box[],
};

export const quest: { [key: string]: Quest } = {
  ultimate_bahamut_hl: {
    name: 'アルバハ HL',
    boxes: [box.HOST_RED, box.GOLD],
  },
  proto_bahamut_hl: {
    name: 'プロトバハムート HL',
    boxes: [box.HOST_RED, box.RANK_RED],
  },
  akasha_hl: {
    name: 'アーカーシャ HL',
    boxes: [box.BLUE],
  },
  grand_order_hl: {
    name: 'グランデ HL',
    boxes: [box.BLUE],
  },
  huanglong: {
    name: '黄龍',
    boxes: [box.HOST_RED],
  },
  qilin: {
    name: '黒麒麟',
    boxes: [box.HOST_RED],
  },
  huanglong_and_qilin_hl: {
    name: '黄龍・黒麒麟 HL',
    boxes: [box.HOST_RED],
  },
};

export const quests: Quest[] = [
  quest.ultimate_bahamut_hl,
  quest.proto_bahamut_hl,
  quest.akasha_hl,
  quest.grand_order_hl,
  quest.huanglong,
  quest.qilin,
  quest.huanglong_and_qilin_hl,
];
