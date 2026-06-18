import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.HOME);
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);

    this.add.text(width / 2, height * 0.1, 'おじさんゲーム', {
      fontSize: '28px',
      color: '#e94560',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    const buttons = [
      { label: 'ガチャ', scene: SceneKey.GACHA, y: 0.35 },
      { label: 'コレクション', scene: SceneKey.COLLECTION, y: 0.5 },
      { label: 'ミッション', scene: SceneKey.MISSION, y: 0.65 },
    ];

    for (const btn of buttons) {
      const b = this.add.text(width / 2, height * btn.y, btn.label, {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#16213e',
        padding: { x: 40, y: 16 },
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      b.on('pointerover', () => b.setStyle({ backgroundColor: '#e94560' }));
      b.on('pointerout', () => b.setStyle({ backgroundColor: '#16213e' }));
      b.on('pointerdown', () => this.scene.start(btn.scene));
    }
  }
}
