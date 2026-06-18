import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';

export class MissionScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.MISSION);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);
    this.add.text(width / 2, height * 0.1, 'ミッション', { fontSize: '32px', color: '#e94560', fontStyle: 'bold' }).setOrigin(0.5);
    this.add.text(width / 2, height * 0.5, '（ミッション実装予定）', { fontSize: '20px', color: '#888888' }).setOrigin(0.5);
    this._backButton();
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.88, '← ホームへ', {
      fontSize: '18px', color: '#ffffff', backgroundColor: '#333333', padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start(SceneKey.HOME));
  }
}
