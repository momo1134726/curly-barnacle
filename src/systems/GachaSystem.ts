import { OJISANS } from '../data/ojisans';
import { GACHA_RATES } from '../data/gachaRates';
import type { OjisanBase, Rarity } from '../types/ojisan';

function drawRarity(): Rarity {
  const roll = Math.random();
  let cumulative = 0;
  for (const rarity of [5, 4, 3] as const) {
    cumulative += GACHA_RATES[rarity];
    if (roll < cumulative) return rarity;
  }
  return 3;
}

function pickOjisanByRarity(rarity: Rarity): OjisanBase {
  const pool = OJISANS.filter((o) => o.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function drawGacha(count: 1 | 10 = 1): OjisanBase[] {
  return Array.from({ length: count }, () => pickOjisanByRarity(drawRarity()));
}
