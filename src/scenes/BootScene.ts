import Phaser from 'phaser';
import { SceneKey, AssetKey } from '../constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.BOOT);
  }

  preload() {
    this.load.image(AssetKey.TITLE_BG, 'assets/images/ui/title_bg.png');
    this.load.image(AssetKey.TITLE_LOGO, 'assets/images/ui/title_logo.png');
  }

  create() {
    this.scene.start(SceneKey.TITLE);
  }
}
