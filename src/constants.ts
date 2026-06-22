export const GAME_WIDTH = 390;
export const GAME_HEIGHT = 844;

export const COLORS = {
  BG: 0x1a1a2e,
  PRIMARY: 0xe94560,
  SECONDARY: 0x16213e,
  TEXT: 0xffffff,
} as const;

// 見出し：インパクト重視 / 本文：丸ゴシックで読みやすさ重視
export const FONT_HEADING = 'Mochiy Pop One';
export const FONT_BODY = 'Zen Maru Gothic';

// Phaser Text の上部見切れ防止の標準パディング
export const TEXT_PADDING = { top: 8, bottom: 4 };

// テキストのぼやけ防止（CSSで拡大表示される分、内部解像度を上げてシャープにする）
export const TEXT_RESOLUTION = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 3) * 1.5;

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
