import Phaser from 'phaser';
import { COLORS, SceneKey } from '../constants';
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

    this.add.text(width / 2, height * 0.08, 'おじさんゲーム', {
      fontSize: '28px',
      color: '#e94560',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.ticketText = this.add.text(width / 2, height * 0.13, '', {
      fontSize: '14px',
      color: '#ffd700',
    }).setOrigin(0.5);
    this._refreshTicketText();

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
    const box = this.add.rectangle(width / 2, height / 2, width * 0.8, 220, 0x16213e).setStrokeStyle(2, 0xe94560);

    const title = this.add.text(width / 2, height / 2 - 70, 'ログインボーナス！', {
      fontSize: '20px',
      color: '#e94560',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    const streakText = this.add.text(width / 2, height / 2 - 30, `${streak}日連続ログイン`, {
      fontSize: '16px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const rewardText = this.add.text(width / 2, height / 2 + 10, `🎫 ガチャチケット ×${reward}`, {
      fontSize: '18px',
      color: '#ffd700',
    }).setOrigin(0.5);

    const closeBtn = this.add.text(width / 2, height / 2 + 70, '受け取る', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#e94560',
      padding: { x: 24, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const elements = [overlay, box, title, streakText, rewardText, closeBtn];
    closeBtn.on('pointerdown', () => elements.forEach((e) => e.destroy()));
  }
}
