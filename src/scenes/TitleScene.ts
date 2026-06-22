import Phaser from 'phaser';
import { COLORS, SceneKey, FONT_HEADING, FONT_BODY, TEXT_RESOLUTION } from '../constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.TITLE);
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);

    this.add.text(width / 2, height * 0.35, 'おじさんゲーム', {
      fontFamily: FONT_HEADING,
      fontSize: '52px',
      color: '#e94560',
      padding: { top: 14, bottom: 8 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.5, '〜俺たちの戦場〜', {
      fontFamily: FONT_BODY,
      fontSize: '22px',
      color: '#ffffff',
      padding: { top: 8, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height * 0.68, 'タップしてはじめる', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#e94560',
      padding: { x: 28, y: 16 },
      resolution: TEXT_RESOLUTION,
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
