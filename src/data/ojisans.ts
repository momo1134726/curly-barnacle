import type { OjisanBase, OjisanType } from '../types/ojisan';

// プレースホルダーデータ：名前・固有スキル・見た目は後で差し替え予定
// タイプは8種を順番に割り当て、レアリティは ★3:15 / ★4:10 / ★5:5 の30体

const TYPES: OjisanType[] = [
  '無職',
  '会社員',
  '職人',
  '芸能系',
  '自営業',
  'ヤンキー',
  '体育会系',
  'インテリ',
];

function buildPlaceholders(count: number, rarity: 3 | 4 | 5, startIndex: number): OjisanBase[] {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    return {
      id: `ojisan_${String(index).padStart(2, '0')}`,
      name: `おじさんNo.${String(index).padStart(2, '0')}`,
      rarity,
      type: TYPES[index % TYPES.length],
    };
  });
}

export const OJISANS: OjisanBase[] = [
  ...buildPlaceholders(15, 3, 1),
  ...buildPlaceholders(10, 4, 16),
  ...buildPlaceholders(5, 5, 26),
];
