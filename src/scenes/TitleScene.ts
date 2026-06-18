import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.TITLE);
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);

    this.add.text(width / 2, height * 0.35, 'おじさんゲーム', {
      fontSize: '48px',
      color: '#e94560',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.5, '〜俺たちの戦場〜', {
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height * 0.68, 'タップしてはじめる', {
      fontSize: '22px',
      color: '#ffffff',
      backgroundColor: '#e94560',
      padding: { x: 24, y: 12 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.tweens.add({
      targets: startBtn,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    startBtn.on('pointerdown', () => {
      this.scene.start(SceneKey.HOME);
    });
  }
}
