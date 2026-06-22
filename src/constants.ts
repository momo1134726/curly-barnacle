export const GAME_WIDTH = 390;
export const GAME_HEIGHT = 844;

// 紫紺ベース×ゴールド×ネオンピンクの配色（カジノ／パチンコ的な目を引くトーン）
export const COLORS = {
  BG: 0x14122b,
  BG_DARK: 0x0d0c1d,
  PANEL: 0x221f3d,
  PANEL_BORDER: 0x3a3560,
  GOLD: 0xffb627,
  GOLD_DARK: 0xe09a14,
  PINK: 0xff3864,
  MINT: 0x3ee6c4,
  TEXT: 0xffffff,
  TEXT_MUTED: 0x9d97c2,
} as const;

// 16進カラー文字列版（Phaser Text の color/backgroundColor 用）
export const HEX = {
  BG: '#14122b',
  BG_DARK: '#0d0c1d',
  PANEL: '#221f3d',
  PANEL_BORDER: '#3a3560',
  GOLD: '#ffb627',
  GOLD_DARK: '#e09a14',
  PINK: '#ff3864',
  MINT: '#3ee6c4',
  TEXT: '#ffffff',
  TEXT_MUTED: '#9d97c2',
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
