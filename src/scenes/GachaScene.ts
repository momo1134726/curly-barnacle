import Phaser from 'phaser';
import { COLORS, HEX, SceneKey, FONT_HEADING, FONT_BODY, TEXT_RESOLUTION } from '../constants';
import { drawGacha } from '../systems/GachaSystem';
import { addOjisan, getTickets, useTicket } from '../systems/SaveSystem';
import type { OjisanBase, Rarity } from '../types/ojisan';

const RARITY_COLOR: Record<Rarity, string> = {
  5: '#ffd700',
  4: '#c084fc',
  3: '#9ca3af',
};

export class GachaScene extends Phaser.Scene {
  private resultContainer?: Phaser.GameObjects.Container;
  private ticketText?: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKey.GACHA);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);
    this.add.text(width / 2, height * 0.07, 'ガチャ', {
      fontFamily: FONT_HEADING,
      fontSize: '34px',
      color: HEX.PINK,
      padding: { top: 10, bottom: 6 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    this.ticketText = this.add.text(width / 2, height * 0.12, '', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '16px',
      color: HEX.GOLD,
      padding: { top: 4, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);
    this._refreshTicketText();

    this.resultContainer = this.add.container(0, 0);

    this._drawButton('🎫 チケットで1回引く', height * 0.7, COLORS.MINT, () => this._doTicketDraw());
    this._drawButton('1回引く', height * 0.78, COLORS.GOLD, () => this._doDraw(1));
    this._drawButton('10回引く', height * 0.85, COLORS.GOLD, () => this._doDraw(10));
    this._backButton();
  }

  private _refreshTicketText() {
    this.ticketText?.setText(`🎫 ガチャチケット: ${getTickets()}枚`);
  }

  private _doTicketDraw() {
    if (!useTicket()) return;
    this._doDraw(1);
    this._refreshTicketText();
  }

  private _doDraw(count: 1 | 10) {
    const results = drawGacha(count);
    results.forEach((ojisan) => addOjisan(ojisan.id));
    this._showResults(results);
  }

  private _showResults(results: OjisanBase[]) {
    this.resultContainer?.removeAll(true);
    const { width, height } = this.scale;

    const cols = results.length > 1 ? 3 : 1;
    const cardW = results.length > 1 ? 100 : 200;
    const cardH = results.length > 1 ? 76 : 130;
    const startY = height * 0.25;
    const gapX = cardW + 12;
    const gapY = cardH + 12;
    const totalRowWidth = cols * gapX - 12;
    const startX = width / 2 - totalRowWidth / 2 + cardW / 2;

    results.forEach((ojisan, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * gapX;
      const y = startY + row * gapY;

      const card = this.add.rectangle(x, y, cardW, cardH, COLORS.PANEL).setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(RARITY_COLOR[ojisan.rarity]).color);
      const stars = this.add.text(x, y - cardH / 2 + 16, '★'.repeat(ojisan.rarity), {
        fontFamily: FONT_BODY,
        fontStyle: '700',
        fontSize: results.length > 1 ? '13px' : '18px',
        color: RARITY_COLOR[ojisan.rarity],
        padding: { top: 3, bottom: 3 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);
      const name = this.add.text(x, y + 10, ojisan.name, {
        fontFamily: FONT_BODY,
        fontStyle: '700',
        fontSize: results.length > 1 ? '13px' : '18px',
        color: '#ffffff',
        padding: { top: 3, bottom: 3 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);
      const type = this.add.text(x, y + cardH / 2 - 16, ojisan.type, {
        fontFamily: FONT_BODY,
        fontSize: '12px',
        color: '#888888',
        padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5);

      this.resultContainer?.add([card, stars, name, type]);
    });
  }

  private _drawButton(label: string, y: number, color: number, onClick: () => void) {
    const { width } = this.scale;
    const hexColor = `#${color.toString(16).padStart(6, '0')}`;
    const btn = this.add.text(width / 2, y, label, {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '19px',
      color: HEX.BG_DARK,
      backgroundColor: hexColor,
      padding: { x: 24, y: 12 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setAlpha(0.8));
    btn.on('pointerout', () => btn.setAlpha(1));
    btn.on('pointerdown', onClick);
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.93, '← ホームへ', {
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
