import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONT_HEADING, FONT_BODY } from './constants';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { HomeScene } from './scenes/HomeScene';
import { GachaScene } from './scenes/GachaScene';
import { CollectionScene } from './scenes/CollectionScene';
import { MissionScene } from './scenes/MissionScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1a1a2e',
  render: {
    antialias: true,
    roundPixels: false,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  scene: [
    BootScene,
    TitleScene,
    HomeScene,
    GachaScene,
    CollectionScene,
    MissionScene,
  ],
};

function startGame() {
  const game = new Phaser.Game(config);
  if (import.meta.env.DEV) {
    (window as unknown as { game: Phaser.Game }).game = game;
  }
}

// Webフォントの読み込みを待ってから起動（先に起動するとCanvas描画がフォールバックフォントのまま固定される）
const fontsReady = Promise.all([
  document.fonts.load(`16px "${FONT_HEADING}"`),
  document.fonts.load(`16px "${FONT_BODY}"`),
  document.fonts.load(`bold 16px "${FONT_BODY}"`),
]).catch(() => {
  // フォント読み込み失敗時もフォールバックフォントで起動する
});

Promise.race([
  fontsReady,
  new Promise((resolve) => setTimeout(resolve, 1500)),
]).then(startGame);
