import Phaser from 'phaser';
import { HEX, SceneKey, FONT_BODY, TEXT_RESOLUTION, AssetKey } from '../constants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super(SceneKey.TITLE);
  }

  create() {
    const { width, height } = this.scale;

    const bg = this.add.image(width / 2, height / 2, AssetKey.TITLE_BG);
    const bgScale = Math.max(width / bg.width, height / bg.height);
    bg.setScale(bgScale);

    // 黒背景の入った画像を加算合成し、黒い部分だけ透けて見えるようにする
    const logo = this.add.image(width / 2, height * 0.27, AssetKey.TITLE_LOGO);
    const logoScale = (width * 0.92) / logo.width;
    logo.setScale(logoScale);
    logo.setBlendMode(Phaser.BlendModes.ADD);

    const startBtn = this.add.text(width / 2, height * 0.85, 'タップしてはじめる', {
      fontFamily: FONT_BODY,
      fontStyle: '700',
      fontSize: '24px',
      color: HEX.BG_DARK,
      backgroundColor: HEX.GOLD,
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
