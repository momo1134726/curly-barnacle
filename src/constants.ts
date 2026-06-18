export const GAME_WIDTH = 390;
export const GAME_HEIGHT = 844;

export const COLORS = {
  BG: 0x1a1a2e,
  PRIMARY: 0xe94560,
  SECONDARY: 0x16213e,
  TEXT: 0xffffff,
} as const;

export const SceneKey = {
  BOOT: 'BootScene',
  TITLE: 'TitleScene',
  HOME: 'HomeScene',
  GACHA: 'GachaScene',
  COLLECTION: 'CollectionScene',
  DETAIL: 'DetailScene',
  MISSION: 'MissionScene',
} as const;

export type SceneKey = (typeof SceneKey)[keyof typeof SceneKey];
