import Phaser from 'phaser';
import { COLORS, HEX, SceneKey, FONT_HEADING, FONT_BODY, TEXT_RESOLUTION } from '../constants';
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
    this.add.text(width / 2, height * 0.055, 'コレクション', {
      fontFamily: FONT_HEADING,
      fontSize: '28px',
      color: HEX.PINK,
      padding: { top: 8, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const owned = getAllOwnedCounts();
    const ownedTypeCount = OJISANS.filter((o) => (owned[o.id] ?? 0) > 0).length;
    this.add.text(width / 2, height * 0.1, `所持種類数: ${ownedTypeCount} / ${OJISANS.length}`, {
      fontFamily: FONT_BODY,
      fontStyle: '500',
      fontSize: '15px',
      color: '#cccccc',
      padding: { top: 3, bottom: 3 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const cols = 4;
    const cardW = 82;
    const cardH = 78;
    const gapX = 6;
    const gapY = 8;
    const totalRowWidth = cols * cardW + (cols - 1) * gapX;
    const startX = width / 2 - totalRowWidth / 2 + cardW / 2;
    const startY = height * 0.155;

    OJISANS.forEach((ojisan, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);
      const count = owned[ojisan.id] ?? 0;
      const isOwned = count > 0;

      const fillColor = isOwned ? COLORS.PANEL : COLORS.BG_DARK;
      const strokeColor = isOwned
        ? Phaser.Display.Color.HexStringToColor(RARITY_COLOR[ojisan.rarity]).color
        : COLORS.PANEL_BORDER;

      this.add.rectangle(x, y, cardW, cardH, fillColor).setStrokeStyle(2, strokeColor);

      this.add.text(x, y - cardH / 2 + 13, '★'.repeat(ojisan.rarity), {
        fontFamily: FONT_BODY,
        fontStyle: '700',
        fontSize: '10px',
        color: isOwned ? RARITY_COLOR[ojisan.rarity] : '#444444',
        padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);

      this.add.text(x, y - 4, isOwned ? ojisan.name : '？？？', {
        fontFamily: FONT_BODY,
        fontStyle: '500',
        fontSize: '11px',
        color: isOwned ? '#ffffff' : '#555555',
        align: 'center',
        wordWrap: { width: cardW - 8 },
        padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);

      this.add.text(x, y + cardH / 2 - 19, isOwned ? ojisan.type : '未所持', {
        fontFamily: FONT_BODY,
        fontSize: '9px',
        color: isOwned ? '#888888' : '#444444',
        padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);

      if (isOwned) {
        this.add.text(x, y + cardH / 2 - 8, `×${count}`, {
          fontFamily: FONT_BODY,
          fontStyle: '700',
          fontSize: '10px',
          color: HEX.GOLD,
          padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
        }).setOrigin(0.5);
      }
    });

    this._backButton();
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.975, '← ホームへ', {
      fontFamily: FONT_BODY,
      fontStyle: '500',
      fontSize: '17px',
      color: '#ffffff',
      backgroundColor: HEX.PANEL,
      padding: { x: 20, y: 10 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start(SceneKey.HOME));
  }
}
