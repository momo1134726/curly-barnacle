import Phaser from 'phaser';
import { COLORS, SceneKey, FONT_HEADING, FONT_BODY, TEXT_RESOLUTION } from '../constants';
import { getMissionStatuses, claimMissionReward } from '../systems/MissionSystem';
import { getTickets } from '../systems/SaveSystem';

export class MissionScene extends Phaser.Scene {
  private listContainer?: Phaser.GameObjects.Container;
  private ticketText?: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKey.MISSION);
  }

  create() {
    const { width, height } = this.scale;
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BG);
    this.add.text(width / 2, height * 0.065, 'ミッション', {
      fontFamily: FONT_HEADING,
      fontSize: '28px',
      color: '#e94560',
      padding: { top: 8, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    this.ticketText = this.add.text(width / 2, height * 0.11, '', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '16px',
      color: '#ffd700',
      padding: { top: 4, bottom: 4 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5);

    this.listContainer = this.add.container(0, 0);
    this._refresh();
    this._backButton();
  }

  private _refresh() {
    this.ticketText?.setText(`🎫 ガチャチケット: ${getTickets()}枚`);
    this.listContainer?.removeAll(true);

    const { width, height } = this.scale;
    const statuses = getMissionStatuses();
    const rowH = 84;
    const startY = height * 0.18;

    statuses.forEach((status, i) => {
      const y = startY + i * rowH;
      const cardW = width * 0.88;

      const card = this.add.rectangle(width / 2, y, cardW, rowH - 10, 0x16213e).setStrokeStyle(
        2,
        status.isClaimed ? 0x444444 : status.isComplete ? 0xffd700 : 0x333333,
      );

      const title = this.add.text(width / 2 - cardW / 2 + 16, y - 18, status.def.title, {
        fontFamily: FONT_BODY,
        fontStyle: '700',
        fontSize: '15px',
        color: '#ffffff',
        padding: { top: 3, bottom: 3 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0, 0.5);

      const progress = this.add.text(width / 2 - cardW / 2 + 16, y + 10, `${status.progress} / ${status.def.target}　報酬: 🎫×${status.def.reward}`, {
        fontFamily: FONT_BODY,
        fontSize: '13px',
        color: '#888888',
        padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
      }).setOrigin(0, 0.5);

      const items: Phaser.GameObjects.GameObject[] = [card, title, progress];

      if (status.isClaimed) {
        const doneText = this.add.text(width / 2 + cardW / 2 - 16, y, '受取済み', {
          fontFamily: FONT_BODY,
          fontSize: '13px',
          color: '#555555',
          padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
        }).setOrigin(1, 0.5);
        items.push(doneText);
      } else if (status.isComplete) {
        const claimBtn = this.add.text(width / 2 + cardW / 2 - 16, y, '受け取る', {
          fontFamily: FONT_BODY,
          fontStyle: '700',
          fontSize: '14px',
          color: '#1a1a2e',
          backgroundColor: '#ffd700',
          padding: { x: 14, y: 8 },
      resolution: TEXT_RESOLUTION,
        }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true });
        claimBtn.on('pointerdown', () => {
          claimMissionReward(status.def.id);
          this._refresh();
        });
        items.push(claimBtn);
      } else {
        const lockedText = this.add.text(width / 2 + cardW / 2 - 16, y, '未達成', {
          fontFamily: FONT_BODY,
          fontSize: '13px',
          color: '#555555',
          padding: { top: 2, bottom: 2 },
      resolution: TEXT_RESOLUTION,
        }).setOrigin(1, 0.5);
        items.push(lockedText);
      }

      this.listContainer?.add(items);
    });
  }

  private _backButton() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height * 0.96, '← ホームへ', {
      fontFamily: FONT_BODY,
      fontStyle: '500',
      fontSize: '17px',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 },
      resolution: TEXT_RESOLUTION,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start(SceneKey.HOME));
  }
}
