// 7日サイクルのログインボーナス（チケット枚数）
export const LOGIN_BONUS_TABLE: number[] = [1, 1, 2, 1, 2, 3, 5];

export function getLoginBonusReward(streak: number): number {
  const index = (streak - 1) % LOGIN_BONUS_TABLE.length;
  return LOGIN_BONUS_TABLE[index];
}
