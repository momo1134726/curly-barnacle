export type OjisanType =
  | '無職'
  | '会社員'
  | '職人'
  | '芸能系'
  | '自営業'
  | 'ヤンキー'
  | '体育会系'
  | 'インテリ';

export type Rarity = 3 | 4 | 5;

export interface OjisanBase {
  id: string;
  name: string;
  rarity: Rarity;
  type: OjisanType;
  // TODO: 固有スキル・見た目アセットキーは後で追加
}
