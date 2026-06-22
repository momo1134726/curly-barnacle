import Phaser from 'phaser';
import { COLORS, HEX, SceneKey, FONT_HEADING, FONT_BODY, TEXT_RESOLUTION } from '../constants';
import { checkAndApplyDailyLogin, getTickets, addTickets } from '../systems/SaveSystem';
import { getLoginBonusReward } from '../data/loginBonus';

export class HomeScene extends Phaser.Scene {
  private ticketText?: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKey.HOME);
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);

    this.add.text(width / 2, height * 0.09, 'おじさんゲーム', {
      fontFamily: FONT_HEADING,
      fontSize: '32px',
      color: HEX.PINK,
      padding: { top: 10, bottom: 6 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    this.ticketText = this.add.text(width / 2, height * 0.145, '', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '17px',
      color: HEX.GOLD,
      padding: { top: 4, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);
    this._refreshTicketText();

    const buttons = [
      { label: 'ガチャ', scene: SceneKey.GACHA, y: 0.36 },
      { label: 'コレクション', scene: SceneKey.COLLECTION, y: 0.51 },
      { label: 'ミッション', scene: SceneKey.MISSION, y: 0.66 },
    ];

    for (const btn of buttons) {
      const b = this.add.text(width / 2, height * btn.y, btn.label, {
        fontFamily: FONT_BODY,
        fontStyle: '700',
        fontSize: '26px',
        color: '#ffffff',
        backgroundColor: HEX.PANEL,
        padding: { x: 40, y: 18 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      b.on('pointerover', () => b.setStyle({ backgroundColor: HEX.PINK }));
      b.on('pointerout', () => b.setStyle({ backgroundColor: HEX.PANEL }));
      b.on('pointerdown', () => this.scene.start(btn.scene));
    }

    this._checkLoginBonus();
  }

  private _refreshTicketText() {
    this.ticketText?.setText(`🎫 ガチャチケット: ${getTickets()}枚`);
  }

  private _checkLoginBonus() {
    const result = checkAndApplyDailyLogin();
    if (!result.isNewLogin) return;

    const reward = getLoginBonusReward(result.streak);
    addTickets(reward);
    this._refreshTicketText();
    this._showLoginDialog(result.streak, reward);
  }

  private _showLoginDialog(streak: number, reward: number) {
    const { width, height } = this.scale;

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7).setInteractive();
    const box = this.add.rectangle(width / 2, height / 2, width * 0.8, 230, COLORS.PANEL).setStrokeStyle(2, COLORS.GOLD);

    const title = this.add.text(width / 2, height / 2 - 72, 'ログインボーナス！', {
      fontFamily: FONT_HEADING,
      fontSize: '22px',
      color: HEX.PINK,
      padding: { top: 8, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const streakText = this.add.text(width / 2, height / 2 - 28, `${streak}日連続ログイン`, {
      fontFamily: FONT_BODY,
      fontStyle: '500',
      fontSize: '17px',
      color: '#ffffff',
      padding: { top: 4, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const rewardText = this.add.text(width / 2, height / 2 + 14, `🎫 ガチャチケット ×${reward}`, {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '20px',
      color: HEX.GOLD,
      padding: { top: 4, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    const closeBtn = this.add.text(width / 2, height / 2 + 74, '受け取る', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '17px',
      color: HEX.BG_DARK,
      backgroundColor: HEX.GOLD,
      padding: { x: 26, y: 12 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const elements = [overlay, box, title, streakText, rewardText, closeBtn];
    closeBtn.on('pointerdown', () => elements.forEach((e) => e.destroy()));
  }
}
