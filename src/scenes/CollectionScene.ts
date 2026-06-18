import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';
import { OJISANS } from '../data/ojisans';
import { getAllOwnedCounts } from '../systems/SaveSystem';
import type { Rarity } from '../types/ojisan';

const RARITY_COLOR: Record<Rarity, string> = {
  5: '#ffd700',
  4: '#c084fc',
  3: '#9ca3af',
};

export class CollectionScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.COLLECTION);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);
    this.add.text(width / 2, height * 0.06, 'コレクション', { fontSize: '28px', color: '#e94560', fontStyle: 'bold' }).setOrigin(0.5);

    const owned = getAllOwnedCounts();
    const ownedTypeCount = OJISANS.filter((o) => (owned[o.id] ?? 0) > 0).length;
    this.add.text(width / 2, height * 0.105, `所持種類数: ${ownedTypeCount} / ${OJISANS.length}`, {
      fontSize: '14px',
      color: '#cccccc',
    }).setOrigin(0.5);

    const cols = 4;
    const cardW = 80;
    const cardH = 66;
    const gapX = 8;
    const gapY = 6;
    const totalRowWidth = cols * cardW + (cols - 1) * gapX;
    const startX = width / 2 - totalRowWidth / 2 + cardW / 2;
    const startY = height * 0.16;

    OJISANS.forEach((ojisan, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);
      const count = owned[ojisan.id] ?? 0;
      const isOwned = count > 0;

      const fillColor = isOwned ? 0x16213e : 0x111111;
      const strokeColor = isOwned
        ? Phaser.Display.Color.HexStringToColor(RARITY_COLOR[ojisan.rarity]).color
        : 0x333333;

      this.add.rectangle(x, y, cardW, cardH, fillColor).setStrokeStyle(2, strokeColor);

      this.add.text(x, y - cardH / 2 + 10, '★'.repeat(ojisan.rarity), {
        fontSize: '9px',
        color: isOwned ? RARITY_COLOR[ojisan.rarity] : '#444444',
      }).setOrigin(0.5);

      this.add.text(x, y - 4, isOwned ? ojisan.name : '？？？', {
        fontSize: '10px',
        color: isOwned ? '#ffffff' : '#555555',
        align: 'center',
        wordWrap: { width: cardW - 8 },
      }).setOrigin(0.5);

      this.add.text(x, y + cardH / 2 - 16, isOwned ? ojisan.type : '未所持', {
        fontSize: '8px',
        color: isOwned ? '#888888' : '#444444',
      }).setOrigin(0.5);

      if (isOwned) {
        this.add.text(x, y + cardH / 2 - 6, `×${count}`, {
          fontSize: '9px',
          color: '#ffd700',
        }).setOrigin(0.5);
      }
    });

    this._backButton();
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.97, '← ホームへ', {
      fontSize: '18px', color: '#ffffff', backgroundColor: '#333333', padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start(SceneKey.HOME));
  }
}
