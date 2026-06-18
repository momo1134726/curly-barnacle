import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { HomeScene } from './scenes/HomeScene';
import { GachaScene } from './scenes/GachaScene';
import { CollectionScene } from './scenes/CollectionScene';
import { MissionScene } from './scenes/MissionScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1a1a2e',
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

const game = new Phaser.Game(config);

if (import.meta.env.DEV) {
  (window as unknown as { game: Phaser.Game }).game = game;
}
