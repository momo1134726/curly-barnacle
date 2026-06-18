import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';
import { drawGacha } from '../systems/GachaSystem';
import type { OjisanBase, Rarity } from '../types/ojisan';

const RARITY_COLOR: Record<Rarity, string> = {
  5: '#ffd700',
  4: '#c084fc',
  3: '#9ca3af',
};

export class GachaScene extends Phaser.Scene {
  private resultContainer?: Phaser.GameObjects.Container;

  constructor() {
    super(SceneKey.GACHA);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);
    this.add.text(width / 2, height * 0.08, 'ガチャ', { fontSize: '32px', color: '#e94560', fontStyle: 'bold' }).setOrigin(0.5);

    this.resultContainer = this.add.container(0, 0);

    this._drawButton('1回引く', height * 0.78, () => this._doDraw(1));
    this._drawButton('10回引く', height * 0.85, () => this._doDraw(10));
    this._backButton();
  }

  private _doDraw(count: 1 | 10) {
    const results = drawGacha(count);
    this._showResults(results);
  }

  private _showResults(results: OjisanBase[]) {
    this.resultContainer?.removeAll(true);
    const { width, height } = this.scale;

    const cols = results.length > 1 ? 3 : 1;
    const cardW = results.length > 1 ? 100 : 200;
    const cardH = results.length > 1 ? 70 : 120;
    const startY = height * 0.22;
    const gapX = cardW + 12;
    const gapY = cardH + 12;
    const totalRowWidth = cols * gapX - 12;
    const startX = width / 2 - totalRowWidth / 2 + cardW / 2;

    results.forEach((ojisan, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * gapX;
      const y = startY + row * gapY;

      const card = this.add.rectangle(x, y, cardW, cardH, 0x16213e).setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(RARITY_COLOR[ojisan.rarity]).color);
      const stars = this.add.text(x, y - cardH / 2 + 14, '★'.repeat(ojisan.rarity), {
        fontSize: results.length > 1 ? '12px' : '16px',
        color: RARITY_COLOR[ojisan.rarity],
      }).setOrigin(0.5);
      const name = this.add.text(x, y + 8, ojisan.name, {
        fontSize: results.length > 1 ? '12px' : '16px',
        color: '#ffffff',
      }).setOrigin(0.5);
      const type = this.add.text(x, y + cardH / 2 - 14, ojisan.type, {
        fontSize: '11px',
        color: '#888888',
      }).setOrigin(0.5);

      this.resultContainer?.add([card, stars, name, type]);
    });
  }

  private _drawButton(label: string, y: number, onClick: () => void) {
    const { width } = this.scale;
    const btn = this.add.text(width / 2, y, label, {
      fontSize: '20px',
      color: '#ffffff',
      backgroundColor: '#e94560',
      padding: { x: 30, y: 12 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#c43450' }));
    btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#e94560' }));
    btn.on('pointerdown', onClick);
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.93, '← ホームへ', {
      fontSize: '18px', color: '#ffffff', backgroundColor: '#333333', padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start(SceneKey.HOME));
  }
}
