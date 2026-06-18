import Phaser from 'phaser';
import { SceneKey } from '../constants';

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.BOOT);
  }

  preload() {
    // TODO: アセット読み込み
  }

  create() {
    this.scene.start(SceneKey.TITLE);
  }
}
