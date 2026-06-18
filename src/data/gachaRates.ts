import type { Rarity } from '../types/ojisan';

// 排出率（やさしめ設定）
export const GACHA_RATES: Record<Rarity, number> = {
  5: 0.08,
  4: 0.32,
  3: 0.60,
};
