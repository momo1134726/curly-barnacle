export const GAME_WIDTH = 390;
export const GAME_HEIGHT = 844;

// 鮮烈レッド×ゴールド×シアン/マゼンタの配色（パチンコ演出を参考にした目を引くトーン）
export const COLORS = {
  BG: 0x4a0a14,
  BG_DARK: 0x2e060d,
  PANEL: 0x6b0f1f,
  PANEL_BORDER: 0xa31530,
  GOLD: 0xffb627,
  GOLD_DARK: 0xe09a14,
  PINK: 0xff2e7a,
  CYAN: 0x29d8ff,
  TEXT: 0xffffff,
  TEXT_MUTED: 0xe0a8b3,
} as const;

// 16進カラー文字列版（Phaser Text の color/backgroundColor 用）
export const HEX = {
  BG: '#4a0a14',
  BG_DARK: '#2e060d',
  PANEL: '#6b0f1f',
  PANEL_BORDER: '#a31530',
  GOLD: '#ffb627',
  GOLD_DARK: '#e09a14',
  PINK: '#ff2e7a',
  CYAN: '#29d8ff',
  TEXT: '#ffffff',
  TEXT_MUTED: '#e0a8b3',
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
